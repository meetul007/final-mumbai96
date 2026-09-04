import os
import math
import json
import re
import requests
import pandas as pd
from slugify import slugify
from urllib.parse import urlparse
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from app import create_app
from app.extensions import db
from app.listing.models import (
    Business,
    Listing,
    Location,
    Category,
    BusinessImage,
    LocationCategory
)

CSV_PATH = "static/cas-in-borivali-west - cas-in-borivali-west.csv"
UPLOAD_FOLDER = "static/uploads/business"

DAY_MAP = {
    "Monday": "Mon",
    "Tuesday": "Tue",
    "Wednesday": "Wed",
    "Thursday": "Thu",
    "Friday": "Fri",
    "Saturday": "Sat",
    "Sunday": "Sun",
}


def generate_google_embed_url(lat, lng):
    if not lat or not lng:
        return None

    try:
        lat = float(lat)
        lng = float(lng)
    except Exception:
        return None

    return f"https://www.google.com/maps?q={lat},{lng}&z=15&output=embed"


def extract_from_about_column(raw_value):
    """
    Extract services & features from CSV about column.
    - Map known values
    - Keep unknown values
    - No data loss
    """

    if not raw_value:
        return [], []

    try:
        data = json.loads(raw_value)
    except Exception:
        return [], []

    services = set()
    features = set()

    for section in data:
        section_id = section.get("id")
        options = section.get("options", [])

        for option in options:
            if not option.get("enabled"):
                continue

            name = option.get("name")
            if not name:
                continue

            name = name.strip()

            # ---- SERVICE SECTION ----
            if section_id in ["service_options"]:
                services.add(name)

            # ---- FEATURE SECTIONS ----
            elif section_id in ["accessibility", "amenities", "payments"]:
                features.add(name)

            # ---- UNKNOWN SECTION ----
            else:
                # Default: treat as feature
                features.add(name)

    return list(services), list(features)


def clean_json_value(value, empty_as=None):
    """
    Converts NaN / 'NaN' / empty string to None or given empty structure.
    """

    if value is None:
        return empty_as

    if isinstance(value, float) and math.isnan(value):
        return empty_as

    if value in ["", "NaN"]:
        return empty_as

    return value

# ------------------------------------------------
# Utility Helpers
# ------------------------------------------------

def unique_slug(model, base_slug):
    slug = base_slug
    counter = 1
    while model.query.filter_by(slug=slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


def safe_float(val):
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return 0
    try:
        return float(val)
    except:
        return 0


def safe_int(val):
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return 0
    try:
        return int(val)
    except:
        return 0


def sanitize_json(obj):
    if isinstance(obj, dict):
        return {
            k: sanitize_json(v)
            for k, v in obj.items()
            if v is not None and not (isinstance(v, float) and math.isnan(v))
        }
    if isinstance(obj, list):
        return [
            sanitize_json(v)
            for v in obj
            if v is not None and not (isinstance(v, float) and math.isnan(v))
        ]
    if isinstance(obj, float) and math.isnan(obj):
        return None
    return obj


def parse_json(value):
    if value is None:
        return None

    if isinstance(value, float) and math.isnan(value):
        return None

    if value in ["", "NaN"]:
        return None

    try:
        parsed = json.loads(value)
        return sanitize_json(parsed)
    except:
        return None


# ------------------------------------------------
# Opening Hours Converter
# ------------------------------------------------

def parse_time_string(time_str):
    try:
        time_str = time_str.strip().lower()
        return datetime.strptime(time_str, "%I %p").strftime("%H:%M")
    except:
        return None


def convert_opening_hours(hours_json):
    if not hours_json:
        return None

    result = {}

    for entry in hours_json:
        day_full = entry.get("day")
        times = entry.get("times", [])

        if not day_full:
            continue

        short_day = DAY_MAP.get(day_full)
        if not short_day:
            continue

        if not times or "closed" in times[0].lower():
            result[short_day] = {"closed": True}
            continue

        time_range = times[0]
        time_range = re.sub(r"[–—]", "-", time_range)

        if "-" not in time_range:
            result[short_day] = {"closed": True}
            continue

        open_str, close_str = time_range.split("-", 1)

        open_time = parse_time_string(open_str)
        close_time = parse_time_string(close_str)

        if open_time and close_time:
            result[short_day] = {
                "open": open_time,
                "close": close_time
            }
        else:
            result[short_day] = {"closed": True}

    return result if result else None


# ------------------------------------------------
# DB Helpers
# ------------------------------------------------

def get_or_create_category(name):
    slug = slugify(name)
    category = Category.query.filter_by(slug=slug).first()

    if category:
        return category

    category = Category(
        name=name.strip().title(),
        slug=slug,
        is_active=True
    )

    db.session.add(category)
    db.session.flush()
    print(f"🆕 Category created: {category.name}")
    return category


def get_or_create_location(query):
    if not query or " in " not in query:
        return None

    location_part = query.split(" in ", 1)[1]
    slug = slugify(location_part)

    location = Location.query.filter_by(slug=slug).first()
    if location:
        return location

    location = Location(
        name=location_part.title(),
        slug=slug,
        is_active=True
    )

    db.session.add(location)
    db.session.flush()
    print(f"🆕 Location created: {location.name}")
    return location


def download_image(url, business_slug, index):
    if not url:
        return None

    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return None

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        ext = os.path.splitext(urlparse(url).path)[1]
        if not ext:
            ext = ".jpg"

        filename = f"{business_slug}-{index}{ext}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        with open(file_path, "wb") as f:
            f.write(response.content)

        return f"business/{filename}"

    except Exception as e:
        print(f"❌ Failed to download image: {e}")
        return None


def ensure_location_category(location, category):
    existing = LocationCategory.query.filter_by(
        location_id=location.id,
        category_id=category.id
    ).first()

    if existing:
        return existing

    # Generate SEO slug like:
    # ac-service-in-borivali-west
    seo_slug = slugify(f"{category.slug}-in-{location.slug}")

    # Ensure uniqueness
    counter = 1
    base_slug = seo_slug
    while LocationCategory.query.filter_by(seo_slug=seo_slug).first():
        seo_slug = f"{base_slug}-{counter}"
        counter += 1

    new_entry = LocationCategory(
        location_id=location.id,
        category_id=category.id,
        seo_slug=seo_slug,
        name=f"{category.name} in {location.name}",
        description=f"Explore the best {category.name} services in {location.name}. Verified and trusted businesses listed on Mumbai96.",
        seo_description=f"Find top-rated {category.name.lower()} in {location.name}. Compare services, reviews, and connect with trusted professionals in your area.",
        image_path=category.image_path  # optional
    )

    db.session.add(new_entry)
    return new_entry


def run():
    app = create_app()
    app.app_context().push()

    df = pd.read_csv(CSV_PATH)
    df = df.where(pd.notnull(df), None)

    imported = 0
    skipped = 0

    for _, row in df.iterrows():

        place_id = row.get("place_id")
        name = row.get("name")

        location = get_or_create_location(row.get("query"))

        if not location:
            skipped += 1
            continue

        if not place_id or not name:
            skipped += 1
            continue

        existing = (
            db.session.query(Business)
            .join(Listing)
            .filter(
                Business.name == row["name"],
                Listing.location_id == location.id
            )
            .first()
        )
        if existing:
            skipped += 1
            continue

        category_name = row.get("main_category")
        if not category_name:
            skipped += 1
            continue

        category = get_or_create_category(category_name)

        ensure_location_category(location, category)

        business_slug = unique_slug(Business, slugify(name))

        business = Business(
            name=name,
            slug=business_slug,
            category_id=category.id,
            description=row.get("description"),
            website=row.get("website"),
            logo=None,
            rating=safe_float(row.get("rating")),
            review_count=safe_int(row.get("reviews")),
            is_active=True
        )

        db.session.add(business)
        db.session.flush()

        raw_hours = parse_json(row.get("hours"))
        converted_hours = convert_opening_hours(raw_hours)
        description = clean_json_value(row.get("description"))
        raw_about = clean_json_value(row.get("about"))

        services, features = extract_from_about_column(raw_about)

        google_map_url = generate_google_embed_url(
            row.get("latitude"),
            row.get("longitude")
        )

        listing = Listing(
            business_id=business.id,
            location_id=location.id,
            address=row.get("address"),
            phone=row.get("phone"),
            opening_hours=converted_hours,
            about=description,
            banner_image=None,
            google_map_url=google_map_url,
            is_published=True,
            services=services,
            features=features
        )

        db.session.add(listing)

        images = parse_json(row.get("images")) or []
        downloaded_images = []

        for index, img in enumerate(images):

            if isinstance(img, dict):
                img_url = img.get("link")
            else:
                img_url = img

            if not img_url or not isinstance(img_url, str):
                continue

            saved_path = download_image(img_url, business_slug, index)
            if saved_path:
                downloaded_images.append(saved_path)

                db.session.add(
                    BusinessImage(
                        business_id=business.id,
                        image_path=saved_path,
                        is_primary=(index == 0),
                        sort_order=index
                    )
                )

        if downloaded_images:
            business.logo = downloaded_images[0]
            listing.banner_image = downloaded_images[0]

        try:
            db.session.commit()
            imported += 1
            print(f"✅ Imported: {business.name}")
        except IntegrityError as e:
            db.session.rollback()
            skipped += 1
            print(f"⚠ Skipped: {business.name} {e}")

    print("------------------------------------------------")
    print("🎉 Import Completed")
    print(f"Imported: {imported}")
    print(f"Skipped: {skipped}")
    print("------------------------------------------------")


if __name__ == "__main__":
    run()
