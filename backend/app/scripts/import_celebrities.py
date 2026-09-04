"""
Script to import celebrity data from Excel into the database.
Run from the backend directory:
    python -m app.scripts.import_celebrities
"""
import os
import sys
import re
import requests
import pandas as pd

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app import create_app
from app.extensions import db
from app.listing.models import Celebrity


# Excel file is located in the backend root directory
EXCEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "../../mumbai96_celebrities_database.xlsx"
)

# Resolve to absolute path
EXCEL_PATH = os.path.abspath(EXCEL_PATH)


def clean_val(val):
    if pd.isna(val):
        return None
    if isinstance(val, float) and val != val:  # NaN check
        return None
    return val


def clean_int(val):
    if pd.isna(val):
        return None
    try:
        return int(float(val))
    except (ValueError, TypeError):
        return None


def fetch_wikipedia_image(full_name, wikipedia_url):
    """
    Fetch the celebrity image from the Wikipedia API.

    Derives the Wikipedia page title from the wikipedia_url (preferred)
    or falls back to full_name with spaces replaced by underscores.
    Returns the image URL string or None.
    """
    # Extract title from wikipedia_url if available
    title = None
    if wikipedia_url:
        match = re.search(r"/wiki/([^#?]+)", wikipedia_url)
        if match:
            title = match.group(1)

    # Fallback: derive from full_name
    if not title and full_name:
        title = full_name.strip().replace(" ", "_")

    if not title:
        return None

    url = (
        "https://en.wikipedia.org/w/api.php"
        f"?action=query&titles={title}"
        "&prop=pageimages&format=json&pithumbsize=500"
        "&redirects=1&origin=*"
    )

    headers = {
        "User-Agent": "Mumbai96/1.0 (https://mumbai96.com; contact@mumbai96.com)"
    }

    try:
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
        data = resp.json()

        pages = data.get("query", {}).get("pages", {})
        for page_id, page in pages.items():
            if page_id == "-1":
                continue
            thumbnail = page.get("thumbnail", {})
            source = thumbnail.get("source")
            if source:
                return source
    except Exception as exc:
        print(f"  WARNING: Failed to fetch image for '{full_name}': {exc}")

    return None


def import_celebrities():
    app = create_app()

    with app.app_context():
        if not os.path.exists(EXCEL_PATH):
            print(f"ERROR: Excel file not found at {EXCEL_PATH}")
            sys.exit(1)

        print(f"Reading Excel from: {EXCEL_PATH}")

        # Create table if it doesn't exist
        Celebrity.__table__.create(db.engine, checkfirst=True)
        print("Ensured celebrities table exists")

        df = pd.read_excel(EXCEL_PATH, sheet_name="Celebrities Data")
        print(f"Found {len(df)} rows")

        # Clear existing data
        count = Celebrity.query.count()
        if count > 0:
            print(f"Deleting {count} existing celebrity records...")
            Celebrity.query.delete()
            db.session.commit()

        created = 0
        for _, row in df.iterrows():
            c = Celebrity(
                slug=clean_val(row.get("slug")),
                full_name=clean_val(row.get("full_name")),
                first_name=clean_val(row.get("first_name")),
                last_name=clean_val(row.get("last_name")),
                category=clean_val(row.get("category")),
                subcategory=clean_val(row.get("subcategory")),
                emoji=clean_val(row.get("emoji")),
                page_title=clean_val(row.get("page_title")),
                meta_description=clean_val(row.get("meta_description")),
                meta_keywords=clean_val(row.get("meta_keywords")),
                og_title=clean_val(row.get("og_title")),
                og_description=clean_val(row.get("og_description")),
                canonical_url=clean_val(row.get("canonical_url")),
                schema_alternate_names=clean_val(row.get("schema_alternate_names")),
                hero_tag=clean_val(row.get("hero_tag")),
                name_line1=clean_val(row.get("name_line1")),
                name_line2=clean_val(row.get("name_line2")),
                subtitle=clean_val(row.get("subtitle")),
                date_of_birth=clean_val(row.get("date_of_birth")),
                age=clean_int(row.get("age")),
                gender=clean_val(row.get("gender")),
                birth_city=clean_val(row.get("birth_city")),
                nationality=clean_val(row.get("nationality")),
                religion=clean_val(row.get("religion")),
                marital_status=clean_val(row.get("marital_status")),
                spouse=clean_val(row.get("spouse")),
                children_count=clean_int(row.get("children_count")),
                children_names=clean_val(row.get("children_names")),
                profession=clean_val(row.get("profession")),
                net_worth=clean_val(row.get("net_worth")),
                debut_work=clean_val(row.get("debut_work")),
                total_works=clean_val(row.get("total_works")),
                awards_count_label=clean_val(row.get("awards_count_label")),
                mumbai_neighbourhood=clean_val(row.get("mumbai_neighbourhood")),
                mumbai_area_detail=clean_val(row.get("mumbai_area_detail")),
                mumbai_home_name=clean_val(row.get("mumbai_home_name")),
                neighbourhood_slug=clean_val(row.get("neighbourhood_slug")),
                neighbourhood_desc=clean_val(row.get("neighbourhood_desc")),
                bio_para_1=clean_val(row.get("bio_para_1")),
                bio_para_2=clean_val(row.get("bio_para_2")),
                bio_para_3=clean_val(row.get("bio_para_3")),
                work1_year=clean_int(row.get("work1_year")),
                work1_title=clean_val(row.get("work1_title")),
                work1_role=clean_val(row.get("work1_role")),
                work1_badge=clean_val(row.get("work1_badge")),
                work2_year=clean_int(row.get("work2_year")),
                work2_title=clean_val(row.get("work2_title")),
                work2_role=clean_val(row.get("work2_role")),
                work2_badge=clean_val(row.get("work2_badge")),
                work3_year=clean_int(row.get("work3_year")),
                work3_title=clean_val(row.get("work3_title")),
                work3_role=clean_val(row.get("work3_role")),
                work3_badge=clean_val(row.get("work3_badge")),
                work4_year=clean_int(row.get("work4_year")),
                work4_title=clean_val(row.get("work4_title")),
                work4_role=clean_val(row.get("work4_role")),
                work4_badge=clean_val(row.get("work4_badge")),
                work5_year=clean_int(row.get("work5_year")),
                work5_title=clean_val(row.get("work5_title")),
                work5_role=clean_val(row.get("work5_role")),
                work5_badge=clean_val(row.get("work5_badge")),
                work6_year=clean_int(row.get("work6_year")),
                work6_title=clean_val(row.get("work6_title")),
                work6_role=clean_val(row.get("work6_role")),
                work6_badge=clean_val(row.get("work6_badge")),
                award1=clean_val(row.get("award1")),
                award2=clean_val(row.get("award2")),
                award3=clean_val(row.get("award3")),
                award4=clean_val(row.get("award4")),
                award5=clean_val(row.get("award5")),
                faq1_q=clean_val(row.get("faq1_q")),
                faq1_a=clean_val(row.get("faq1_a")),
                faq2_q=clean_val(row.get("faq2_q")),
                faq2_a=clean_val(row.get("faq2_a")),
                faq3_q=clean_val(row.get("faq3_q")),
                faq3_a=clean_val(row.get("faq3_a")),
                faq4_q=clean_val(row.get("faq4_q")),
                faq4_a=clean_val(row.get("faq4_a")),
                faq5_q=clean_val(row.get("faq5_q")),
                faq5_a=clean_val(row.get("faq5_a")),
                related1_name=clean_val(row.get("related1_name")),
                related1_slug=clean_val(row.get("related1_slug")),
                related1_emoji=clean_val(row.get("related1_emoji")),
                related1_area=clean_val(row.get("related1_area")),
                related2_name=clean_val(row.get("related2_name")),
                related2_slug=clean_val(row.get("related2_slug")),
                related2_emoji=clean_val(row.get("related2_emoji")),
                related2_area=clean_val(row.get("related2_area")),
                related3_name=clean_val(row.get("related3_name")),
                related3_slug=clean_val(row.get("related3_slug")),
                related3_emoji=clean_val(row.get("related3_emoji")),
                related3_area=clean_val(row.get("related3_area")),
                related4_name=clean_val(row.get("related4_name")),
                related4_slug=clean_val(row.get("related4_slug")),
                related4_emoji=clean_val(row.get("related4_emoji")),
                related4_area=clean_val(row.get("related4_area")),
                wikipedia_url=clean_val(row.get("wikipedia_url")),
                wikipedia_image_url=clean_val(row.get("wikipedia_image_url")),
                instagram_handle=clean_val(row.get("instagram_handle")),
                twitter_handle=clean_val(row.get("twitter_handle")),
            )

            if not c.slug or not c.full_name:
                print(f"  SKIPPING row with missing slug or full_name")
                continue

            # Fetch Wikipedia image (always re-fetch to ensure a valid thumbnail size)
            if c.wikipedia_url:
                print(f"  Fetching image for {c.full_name}...")
                c.wikipedia_image_url = fetch_wikipedia_image(
                    c.full_name, c.wikipedia_url
                )
                if c.wikipedia_image_url:
                    print(f"    Got image: {c.wikipedia_image_url}")
                else:
                    print(f"    No image found via Wikipedia API")

            db.session.add(c)
            created += 1

        db.session.commit()
        print(f"Successfully imported {created} celebrities into the database.")


if __name__ == "__main__":
    import_celebrities()
