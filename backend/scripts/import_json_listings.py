#!/usr/bin/env python3
"""
Import businesses from Google Places JSON data into the database.

Reads JSON files from locations_data/<zone>/batch-*/<category>.json,
creates Business, Listing, Category, Location, and BusinessImage records.

Usage:
    python scripts/import_json_listings.py --zone "central mumbai" --dry-run
    python scripts/import_json_listings.py --zone "central mumbai" --skip-images
    python scripts/scripts/import_json_listings.py --zone "central mumbai"
    python scripts/import_json_listings.py --zone "central mumbai" --batch-id batch-1783016959967
    python scripts/import_json_listings.py --zone "central mumbai" --data-dir /path/to/locations_data
    python scripts/import_json_listings.py --zone "central mumbai" --upload-folder /path/to/uploads/business
    python scripts/import_json_listings.py --zone "central mumbai" --images-only
"""

import os
import sys
import json
import glob
import math
import re
import time
import argparse
import requests
import traceback
from datetime import datetime
from urllib.parse import urlparse

from slugify import slugify

from app import create_app
from app.extensions import db
from app.listing.models import (
    Business,
    Listing,
    Location,
    Category,
    BusinessImage,
    LocationCategory,
)


# ------------------------------------------------
# Configuration
# ------------------------------------------------

DATA_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "locations_data"
)
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "static", "uploads", "business"
)

ZONE_DIR_MAP = {
    "central mumbai": "central mumbai",
    "north mumbai": "north mumbai",
    "south mumbai": "south mumbai",
    "western mumbai": "western mumbai",
}

DAY_MAP = {
    "Monday": "Mon",
    "Tuesday": "Tue",
    "Wednesday": "Wed",
    "Thursday": "Thu",
    "Friday": "Fri",
    "Saturday": "Sat",
    "Sunday": "Sun",
}


# ------------------------------------------------
# Utility Functions
# ------------------------------------------------

def unique_slug(model, base_slug):
    """Generate a unique slug for a model."""
    slug = base_slug
    counter = 1
    while model.query.filter_by(slug=slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


def safe_float(val):
    """Safely convert to float."""
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return 0.0
    try:
        return float(val)
    except (ValueError, TypeError):
        return 0.0


def safe_int(val):
    """Safely convert to int."""
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return 0
    try:
        return int(val)
    except (ValueError, TypeError):
        return 0


def sanitize_json(obj):
    """Remove None and NaN values from JSON structures."""
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


# ------------------------------------------------
# Opening Hours
# ------------------------------------------------

def parse_time_string(time_str):
    """Parse '10 am' or '5 pm' to '10:00' or '17:00'."""
    try:
        time_str = time_str.strip().lower()
        return datetime.strptime(time_str, "%I %p").strftime("%H:%M")
    except (ValueError, AttributeError):
        return None


def convert_opening_hours(hours_json):
    """
    Convert JSON hours array to our opening_hours format.
    Input: [{"day": "Monday", "times": ["10 am–5 pm"]}, ...]
    Output: {"Mon": {"open": "10:00", "close": "17:00"}, ...}
    """
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

        # Handle "Open 24 hours"
        if times and "24 hours" in times[0].lower():
            result[short_day] = {"open": "00:00", "close": "23:59", "open_24h": True}
            continue

        # Handle "Closed"
        if not times or "closed" in times[0].lower():
            result[short_day] = {"closed": True}
            continue

        time_range = times[0]
        # Normalize dashes
        time_range = re.sub(r"\u2013|\u2014", "-", time_range)

        if "-" not in time_range:
            result[short_day] = {"closed": True}
            continue

        open_str, close_str = time_range.split("-", 1)
        open_time = parse_time_string(open_str)
        close_time = parse_time_string(close_str)

        if open_time and close_time:
            result[short_day] = {"open": open_time, "close": close_time}
        else:
            result[short_day] = {"closed": True}

    return result if result else None


def add_hours_metadata(hours, workday_timing, closed_on):
    """Add summary and closed_on metadata to opening_hours dict."""
    if hours is None:
        hours = {}

    if workday_timing:
        hours["summary"] = workday_timing

    if closed_on:
        hours["closed_on"] = closed_on

    return hours if hours else None


# ------------------------------------------------
# Services & Features from 'about' sections
# ------------------------------------------------

def extract_from_about(about_array):
    """
    Extract services and features from the 'about' JSON array.
    Same logic as import_google_listings.py extract_from_about_column
    but works with a Python list directly (not JSON string).
    """
    if not about_array:
        return [], []

    services = set()
    features = set()

    for section in about_array:
        section_id = section.get("id")
        options = section.get("options", [])

        for option in options:
            if not option.get("enabled"):
                continue

            name = option.get("name")
            if not name:
                continue

            name = name.strip()

            if section_id in ["service_options"]:
                services.add(name)
            elif section_id in ["accessibility", "amenities", "payments"]:
                features.add(name)
            else:
                # offerings, crowd, etc. -> treat as features
                features.add(name)

    return list(services), list(features)


# ------------------------------------------------
# Image Download
# ------------------------------------------------

def download_image(url, business_slug, index, dry_run=False):
    """Download an image and return the relative storage path."""
    if not url:
        return None

    if dry_run:
        return f"business/{business_slug}-{index}.jpg"

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=15)

            # Rate limited — back off and retry
            if response.status_code == 429:
                wait = 2 ** (attempt + 1)  # 2s, 4s, 8s
                print(f"  ⏳ Rate limited (429), retrying in {wait}s...")
                time.sleep(wait)
                continue

            if response.status_code != 200:
                return None

            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

            # Determine extension from URL
            ext = os.path.splitext(urlparse(url).path)[1]
            if not ext or len(ext) > 6:
                ext = ".jpg"

            # Clean extension
            ext = ext.split("?")[0]

            filename = f"{business_slug}-{index}{ext}"
            file_path = os.path.join(UPLOAD_FOLDER, filename)

            with open(file_path, "wb") as f:
                f.write(response.content)

            # Small delay to avoid rate limiting
            time.sleep(0.1)

            return f"business/{filename}"

        except requests.exceptions.ConnectionError:
            wait = 2 ** attempt  # 1s, 2s, 4s
            print(f"  ⏳ Connection error, retrying in {wait}s...")
            time.sleep(wait)
        except requests.exceptions.Timeout:
            wait = 2 ** attempt
            print(f"  ⏳ Timeout, retrying in {wait}s...")
            time.sleep(wait)
        except Exception as e:
            print(f"  ⚠ Failed to download image: {e}")
            return None

    print(f"  ❌ Failed to download after {max_retries} retries: {url[:80]}")
    return None


# ------------------------------------------------
# DB Helpers
# ------------------------------------------------

def get_or_create_category(name):
    """Get existing category or create new one."""
    if not name or not name.strip():
        return None

    name = name.strip()
    cat_slug = slugify(name)

    category = Category.query.filter_by(slug=cat_slug).first()
    if category:
        return category

    category = Category(
        name=name.title(),
        slug=cat_slug,
        is_active=True,
    )
    db.session.add(category)
    db.session.flush()
    print(f"  🆕 Category created: {category.name}")
    return category


def get_or_create_sub_location(zone_location, sub_location_slug):
    """Get or create a sub-location under a zone."""
    if not sub_location_slug:
        return None

    # Check if location already exists by slug
    location = Location.query.filter_by(slug=sub_location_slug).first()
    if location:
        return location

    # Create new sub-location
    name = sub_location_slug.replace("-", " ").title()

    location = Location(
        name=name,
        slug=sub_location_slug,
        parent_id=zone_location.id,
        is_active=True,
    )
    db.session.add(location)
    db.session.flush()
    print(f"  🆕 Location created: {location.name} (under {zone_location.name})")
    return location


def ensure_location_category(location, category):
    """Ensure a LocationCategory junction record exists."""
    existing = LocationCategory.query.filter_by(
        location_id=location.id,
        category_id=category.id,
    ).first()

    if existing:
        return existing

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
        description=(
            f"Explore the best {category.name} services in {location.name}. "
            f"Verified and trusted businesses listed on Mumbai96."
        ),
        seo_description=(
            f"Find top-rated {category.name.lower()} in {location.name}. "
            f"Compare services, reviews, and connect with trusted professionals "
            f"in your area."
        ),
    )

    db.session.add(new_entry)
    return new_entry


def check_duplicate(business_name, location_id):
    """Check if a Business with this name already has a Listing at this location."""
    existing = (
        db.session.query(Business)
        .join(Listing)
        .filter(
            Business.name == business_name,
            Listing.location_id == location_id,
        )
        .first()
    )
    return existing


def find_existing_business(business_name):
    """Find an existing Business by name (for reuse across locations)."""
    return Business.query.filter_by(name=business_name).first()


# ------------------------------------------------
# Core Import Logic
# ------------------------------------------------

def import_business(biz_data, location, category, skip_images=False, dry_run=False, images_only=False):
    """
    Import a single business from JSON data.
    Returns (business, listing, skip_reason).
    - skip_reason is None when the business was imported.
    - skip_reason is a string explaining why the business was skipped.
    - (None, None, reason) means it was skipped.

    images_only=True: skip business/listing creation, only backfill images
    for existing businesses that have no images yet.
    """
    name = biz_data.get("name", "").strip()
    if not name:
        return None, None, "no name in data"

    # Truncate name to fit VARCHAR(255)
    name = name[:255]

    place_id = biz_data.get("place_id")
    if not place_id:
        return None, None, "no place_id"

    # Check if business already exists at this location
    existing = check_duplicate(name, location.id)

    # --- IMAGES ONLY MODE ---
    # Find existing business and backfill images
    if images_only:
        if not existing:
            return None, None, "images-only: business not in DB"

        business = existing

        # Check if business already has images
        has_images = BusinessImage.query.filter_by(business_id=business.id).first()
        if has_images:
            return None, None, "images-only: business already has images"

        # Download images for existing business
        images_data = biz_data.get("images", [])
        featured_image_url = biz_data.get("featured_image")
        downloaded_first = None

        if not skip_images and images_data:
            for idx, img in enumerate(images_data):
                img_url = img.get("link") if isinstance(img, dict) else img
                if not img_url or not isinstance(img_url, str):
                    continue

                saved_path = download_image(img_url, business.slug, idx, dry_run=dry_run)
                if saved_path:
                    if idx == 0:
                        downloaded_first = saved_path
                    if not dry_run:
                        db.session.add(
                            BusinessImage(
                                business_id=business.id,
                                image_path=saved_path,
                                caption=img.get("about") if isinstance(img, dict) else None,
                                is_primary=(idx == 0),
                                sort_order=idx,
                            )
                        )

        if not skip_images and not downloaded_first and featured_image_url:
            saved_path = download_image(
                featured_image_url, business.slug, "featured", dry_run=dry_run
            )
            if saved_path:
                downloaded_first = saved_path

        if downloaded_first:
            if not business.logo:
                business.logo = downloaded_first
            listing = Listing.query.filter_by(
                business_id=business.id, location_id=location.id
            ).first()
            if listing and not listing.banner_image:
                listing.banner_image = downloaded_first

        return business, existing, None

    # --- NORMAL IMPORT MODE ---
    if existing:
        existing_cat = existing.category.name if existing.category else "unknown category"
        return (
            None,
            None,
            f"duplicate — already imported at this location (category: {existing_cat})",
        )

    # Check if business already exists (different location)
    business = find_existing_business(name)

    # Clean website URL - filter out Google search/redirect URLs, truncate to 255
    website_url = biz_data.get("website")
    if website_url:
        # Skip Google search URLs masquerading as websites
        if "google.com/search" in website_url or "google.com/url" in website_url:
            website_url = None
        elif len(website_url) > 255:
            website_url = website_url[:255]

    # Build social_links
    social_links = {}
    if biz_data.get("link"):
        social_links["google_maps"] = biz_data["link"]
    if biz_data.get("reviews_link"):
        social_links["reviews"] = biz_data["reviews_link"]
    if website_url:
        social_links["website"] = website_url

    if not business:
        # Create new business
        business_slug = unique_slug(Business, slugify(name))

        business = Business(
            name=name,
            slug=business_slug,
            category_id=category.id,
            description=biz_data.get("description"),
            website=website_url,
            rating=safe_float(biz_data.get("rating")),
            review_count=safe_int(biz_data.get("reviews")),
            social_links=social_links if social_links else None,
            is_active=True,
        )

        if not dry_run:
            db.session.add(business)
            db.session.flush()
    else:
        # Business exists - update rating/review_count if higher
        new_rating = safe_float(biz_data.get("rating"))
        new_reviews = safe_int(biz_data.get("reviews"))
        if new_rating > business.rating:
            business.rating = new_rating
        if new_reviews > business.review_count:
            business.review_count = new_reviews
        # Merge social links
        if social_links:
            existing_links = business.social_links or {}
            existing_links.update(social_links)
            business.social_links = existing_links

    # Extract services and features from 'about' sections
    services, features = extract_from_about(biz_data.get("about", []))

    # Add price_range as feature if present
    price_range = biz_data.get("price_range")
    if price_range:
        features.append(f"Price: {price_range}")

    # Convert opening hours
    hours = convert_opening_hours(biz_data.get("hours", []))
    hours = add_hours_metadata(
        hours,
        biz_data.get("workday_timing"),
        biz_data.get("closed_on"),
    )

    # Google maps URL - generate short embed URL from coordinates
    # The full Google Maps link is too long for VARCHAR(500), store in social_links
    coords = biz_data.get("coordinates", {})
    lat = coords.get("latitude")
    lng = coords.get("longitude")
    if lat and lng:
        google_map_url = f"https://www.google.com/maps?q={lat},{lng}&z=15&output=embed"
    else:
        google_map_url = None

    # Truncate address to fit VARCHAR(255)
    address = biz_data.get("address")
    if address and len(address) > 255:
        address = address[:255]

    # Create listing
    listing = Listing(
        business_id=business.id,
        location_id=location.id,
        address=address,
        phone=biz_data.get("phone"),
        opening_hours=hours,
        about=biz_data.get("description"),
        services=services if services else None,
        features=features if features else None,
        google_map_url=google_map_url,
        is_published=True,
    )

    if not dry_run:
        db.session.add(listing)
        db.session.flush()

    # Handle images
    images_data = biz_data.get("images", [])
    featured_image_url = biz_data.get("featured_image")
    downloaded_first = None

    if not skip_images and images_data:
        for idx, img in enumerate(images_data):
            img_url = img.get("link") if isinstance(img, dict) else img
            if not img_url or not isinstance(img_url, str):
                continue

            saved_path = download_image(img_url, business.slug, idx, dry_run=dry_run)
            if saved_path:
                if idx == 0:
                    downloaded_first = saved_path

                if not dry_run:
                    db.session.add(
                        BusinessImage(
                            business_id=business.id,
                            image_path=saved_path,
                            caption=img.get("about") if isinstance(img, dict) else None,
                            is_primary=(idx == 0),
                            sort_order=idx,
                        )
                    )

    # Also try featured_image if no gallery images
    if not skip_images and not downloaded_first and featured_image_url:
        saved_path = download_image(
            featured_image_url, business.slug, "featured", dry_run=dry_run
        )
        if saved_path:
            downloaded_first = saved_path

    # Set logo and banner from first downloaded image
    if downloaded_first:
        if not business.logo:
            business.logo = downloaded_first
        listing.banner_image = downloaded_first

    return business, listing, None


def import_category_file(json_path, location, dry_run=False, skip_images=False, images_only=False, zone_location=None):
    """
    Import all businesses from a single category JSON file.
    Returns (imported_count, skipped_count).
    """
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            businesses_data = json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"  ❌ Error reading {json_path}: {e}")
        return 0, 0

    if not isinstance(businesses_data, list):
        print(f"  ⚠ Skipping {os.path.basename(json_path)}: not a business list")
        return 0, 0

    if not businesses_data:
        return 0, 0

    # Get category name from main_category of first business
    category_name = businesses_data[0].get("main_category")
    if not category_name:
        category_name = os.path.splitext(os.path.basename(json_path))[0].replace("-", " ").title()

    category = get_or_create_category(category_name)
    if not category:
        return 0, 0

    # Ensure LocationCategory junction exists
    if not dry_run:
        ensure_location_category(location, category)

    imported = 0
    skipped = 0
    skip_reasons = []

    for biz_data in businesses_data:
        biz_name = biz_data.get("name", "unknown")
        # Skip competitor entries (they don't have place_id at top level)
        if "place_id" not in biz_data:
            skipped += 1
            skip_reasons.append((biz_name, "no place_id (competitor entry)"))
            continue

        try:
            business, listing, skip_reason = import_business(
                biz_data, location, category,
                skip_images=skip_images,
                dry_run=dry_run,
                images_only=images_only,
            )

            if business:
                imported += 1
            else:
                skipped += 1
                skip_reasons.append((biz_name, skip_reason or "unknown"))
        except Exception as e:
            skipped += 1
            skip_reasons.append((biz_name, f"error: {e}"))
            print(f"  ⚠ Error importing '{biz_name}': {e}")
            if not dry_run:
                db.session.rollback()
                # The rollback discarded any pending inserts for this file,
                # including a freshly created sub-location/category. Re-fetch
                # (or re-create) them so remaining rows insert against valid
                # FK targets instead of a stale location id.
                location = (
                    db.session.get(Location, location.id)
                    or get_or_create_sub_location(zone_location, location.slug)
                )
                category = (
                    Category.query.filter_by(slug=category.slug).first()
                    or get_or_create_category(category.name)
                )
                ensure_location_category(location, category)

    # Log why each entry was skipped so future runs are self-explanatory
    if skip_reasons:
        reason_counts = {}
        for name, reason in skip_reasons:
            reason_counts[reason] = reason_counts.get(reason, 0) + 1
        for name, reason in skip_reasons:
            print(f"   ⚠ Skipped '{name}': {reason}")
        for reason, count in sorted(reason_counts.items()):
            print(f"     ({count}x) {reason}")

    return imported, skipped


def import_batch(batch_dir, zone_location, dry_run=False, skip_images=False, images_only=False):
    """
    Import all category files from a single batch directory.
    """
    # Read _state.json for sub-location
    state_path = os.path.join(batch_dir, "_state.json")
    if not os.path.exists(state_path):
        print(f"  ❌ No _state.json found in {batch_dir}")
        return 0, 0

    try:
        with open(state_path, "r", encoding="utf-8") as f:
            state = json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"  ❌ Error reading _state.json: {e}")
        return 0, 0

    sub_location_slug = state.get("location")
    batch_id = state.get("batchId", "unknown")
    is_complete = state.get("isComplete", False)
    total_businesses = state.get("totalBusinessesFound", 0)

    if not sub_location_slug:
        print(f"  ❌ No 'location' in _state.json for {batch_dir}")
        return 0, 0

    if not is_complete:
        print(f"  ⚠ Batch {batch_id} is INCOMPLETE ({total_businesses} businesses)")

    # Get or create sub-location
    location = get_or_create_sub_location(zone_location, sub_location_slug)
    if not location:
        return 0, 0

    # Persist the sub-location immediately so a later mid-batch rollback
    # cannot orphan it (which would break FK checks for the rest of the batch).
    if not dry_run:
        db.session.commit()

    # Find all category JSON files (exclude _state.json)
    json_files = sorted(
        glob.glob(os.path.join(batch_dir, "*.json"))
    )
    json_files = [f for f in json_files if not f.endswith("_state.json") and not f.endswith(".error.json")]

    print(f"\n📦 Batch: {batch_id}")
    print(f"   Location: {location.name} ({sub_location_slug})")
    print(f"   Category files: {len(json_files)}")
    print(f"   Total businesses in data: {total_businesses}")

    total_imported = 0
    total_skipped = 0

    for json_path in json_files:
        cat_name = os.path.splitext(os.path.basename(json_path))[0]
        imported, skipped = import_category_file(
            json_path, location,
            dry_run=dry_run,
            skip_images=skip_images,
            images_only=images_only,
            zone_location=zone_location,
        )
        total_imported += imported
        total_skipped += skipped

        if imported > 0:
            print(f"   ✅ {cat_name}: +{imported} imported, {skipped} skipped")

        # Commit after each category file so a single bad row can't roll back
        # work already imported in earlier files of this batch.
        if not dry_run:
            db.session.commit()

    return total_imported, total_skipped


# ------------------------------------------------
# Main Entry Point
# ------------------------------------------------

def run():
    parser = argparse.ArgumentParser(
        description="Import Google Places JSON data into the database"
    )
    parser.add_argument(
        "--zone",
        required=True,
        help='Zone name, e.g., "central mumbai"',
    )
    parser.add_argument(
        "--data-dir",
        help="Path to locations_data directory (default: ../locations_data relative to script)",
    )
    parser.add_argument(
        "--upload-folder",
        help="Path to image upload folder (default: backend/static/uploads/business)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview import without writing to database or downloading images",
    )
    parser.add_argument(
        "--skip-images",
        action="store_true",
        help="Skip image downloads (faster import)",
    )
    parser.add_argument(
        "--images-only",
        action="store_true",
        help="Backfill images for existing businesses that have no images (skip business/listing creation)",
    )
    parser.add_argument(
        "--batch-id",
        help="Import only a specific batch (e.g., batch-1783016959967)",
    )
    args = parser.parse_args()

    # Override globals from CLI args
    global DATA_DIR, UPLOAD_FOLDER
    if args.data_dir:
        DATA_DIR = args.data_dir
    if args.upload_folder:
        UPLOAD_FOLDER = args.upload_folder

    zone_name = args.zone.strip().lower()

    if zone_name not in ZONE_DIR_MAP:
        print(f"❌ Unknown zone: {zone_name}")
        print(f"   Available zones: {', '.join(ZONE_DIR_MAP.keys())}")
        sys.exit(1)

    zone_dir = ZONE_DIR_MAP[zone_name]
    zone_path = os.path.join(DATA_DIR, zone_dir)

    if not os.path.exists(zone_path):
        print(f"❌ Zone directory not found: {zone_path}")
        sys.exit(1)

    # Find batch directories
    batch_dirs = sorted(glob.glob(os.path.join(zone_path, "batch-*")))

    if not batch_dirs:
        print(f"❌ No batch directories found in {zone_path}")
        sys.exit(1)

    # Filter to specific batch if requested
    if args.batch_id:
        batch_dirs = [d for d in batch_dirs if os.path.basename(d) == args.batch_id]
        if not batch_dirs:
            print(f"❌ Batch not found: {args.batch_id}")
            sys.exit(1)

    # Initialize Flask app
    app = create_app()
    app.app_context().push()

    # Find or create zone location (top-level parent)
    zone_slug = zone_name.replace(" ", "-")
    zone_location = Location.query.filter_by(slug=zone_slug).first()

    if not zone_location:
        zone_location = Location(
            name=zone_name.title(),
            slug=zone_slug,
            is_active=True,
        )
        db.session.add(zone_location)
        db.session.flush()
        print(f"🆕 Zone location created: {zone_location.name}")

    print("=" * 60)
    print(f"🚀 JSON Import: {zone_name.upper()}")
    print(f"   Data dir: {DATA_DIR}")
    print(f"   Upload folder: {UPLOAD_FOLDER}")
    print(f"   Batches: {len(batch_dirs)}")
    print(f"   Dry run: {args.dry_run}")
    print(f"   Skip images: {args.skip_images}")
    print(f"   Images only: {args.images_only}")
    print("=" * 60)

    grand_imported = 0
    grand_skipped = 0
    batch_num = 0

    for batch_dir in batch_dirs:
        batch_num += 1
        print(f"\n[{batch_num}/{len(batch_dirs)}] Processing {os.path.basename(batch_dir)}...")

        imported, skipped = import_batch(
            batch_dir, zone_location,
            dry_run=args.dry_run,
            skip_images=args.skip_images,
            images_only=args.images_only,
        )

        grand_imported += imported
        grand_skipped += skipped

        # Commit after each batch (unless dry run)
        if not args.dry_run:
            try:
                db.session.commit()
                print(f"   💾 Batch committed")
            except Exception as e:
                db.session.rollback()
                print(f"   ❌ Batch commit failed: {e}")
                traceback.print_exc()

    print("\n" + "=" * 60)
    print(f"🎉 Import Complete!")
    print(f"   Zone: {zone_name}")
    print(f"   Batches processed: {batch_num}")
    print(f"   Imported: {grand_imported}")
    print(f"   Skipped: {grand_skipped}")
    print(f"   Total: {grand_imported + grand_skipped}")
    print("=" * 60)


if __name__ == "__main__":
    run()
