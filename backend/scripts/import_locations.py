import os
import re
from slugify import slugify
from werkzeug.datastructures import FileStorage

from app import create_app
from app.extensions import db
from app.listing.models import Location, Category, LocationCategory
from app.helper.file import upload_single_image

LEGACY_BASE_DIR = "locations"

# 🔑 Explicit parent mapping
LOCATION_PARENT_MAP = {
    "altamount-road": "south-mumbai",
}


def extract_category_slug(filename, location_slug):
    name = os.path.splitext(filename)[0]
    name = re.sub(r"-\d+$", "", name)
    suffix = f"-in-{location_slug}"
    if suffix in name:
        return name.replace(suffix, "")
    return name.replace(location_slug, "")


def titleize(slug):
    return slug.replace("-", " ").title()


def get_or_create_location(name, slug, parent=None):
    location = Location.query.filter_by(slug=slug).first()
    if location:
        location.parent_id=parent.id if parent else None
        db.session.commit()
        return location

    location = Location(
        name=name,
        slug=slug,
        parent_id=parent.id if parent else None,
        is_active=True
    )
    db.session.add(location)
    db.session.flush()

    print(
        f"🆕 Location created: {location.name} "
        f"(parent={parent.name if parent else 'ROOT'})"
    )
    return location


def run():
    app = create_app()
    app.app_context().push()

    for location_folder in os.listdir(LEGACY_BASE_DIR):
        location_path = os.path.join(LEGACY_BASE_DIR, location_folder)

        if not os.path.isdir(location_path):
            continue

        location_slug = slugify(location_folder)

        # ---------- PARENT LOCATION ----------
        parent_slug = LOCATION_PARENT_MAP.get(location_slug, "Mumbai")
        parent = None

        if parent_slug:
            parent = Location.query.filter_by(
                slug=parent_slug,
                is_active=True
            ).first()

            if not parent:
                parent = get_or_create_location(
                    name=titleize(parent_slug),
                    slug=parent_slug
                )

        # ---------- LOCATION ----------
        location = get_or_create_location(
            name=location_folder,
            slug=location_slug,
            parent=parent
        )

        # ---------- CATEGORY IMAGES ----------
        for filename in os.listdir(location_path):
            if not filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                continue

            category_slug = extract_category_slug(filename, location_slug)
            category_name = titleize(category_slug)

            category = Category.query.filter_by(slug=category_slug).first()
            if not category:
                category = Category(
                    name=category_name,
                    slug=category_slug,
                    is_active=True
                )
                db.session.add(category)
                db.session.flush()

            legacy_file_path = os.path.join(location_path, filename)

            with open(legacy_file_path, "rb") as f:
                fs = FileStorage(
                    stream=f,
                    filename=filename,
                    content_type="image/jpeg"
                )

                relative_path = upload_single_image(
                    fs,
                    folder="location-categories"
                )

                if category.image_path:
                    category.image_path = relative_path

                location_category = LocationCategory.query.filter_by(location=location, category=category).first()
                if not location_category:
                    location_category_name = "{} {}".format(category_name, location.name)
                    location_category_slug = slugify(location_category_name)
                    location_category = LocationCategory(
                        location=location, category=category, name=location_category_name,
                        description=location_category_name, seo_description=location_category_name,
                        seo_slug=location_category_slug
                    )
                    location_category.image_path = relative_path
                    db.session.add(location_category)

                print(f"🖼️ Imported image for category: {category.slug}")

        db.session.commit()

    print("✅ Location & category import completed")


if __name__ == "__main__":
    run()
