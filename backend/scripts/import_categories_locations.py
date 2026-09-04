#!/usr/bin/env python3
"""
Import only categories and locations from JSON data (no business/listing creation).

Reads _state.json files from locations_data/<zone>/batch-*/_state.json to create
sub-locations, and extracts category slugs from the state file and JSON filenames
to create categories and LocationCategory junction records.

Usage:
    cd backend
    python scripts/import_categories_locations.py
    python scripts/import_categories_locations.py --zone "north mumbai"
    python scripts/import_categories_locations.py --zone "north mumbai" --dry-run
    python scripts/import_categories_locations.py --data-dir /path/to/locations_data
"""

import os
import sys
import json
import glob
import argparse
import traceback

from slugify import slugify

from app import create_app
from app.extensions import db
from app.listing.models import Location, Category, LocationCategory


# ------------------------------------------------
# Configuration
# ------------------------------------------------

DATA_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "locations_data"
)

ZONE_DIR_MAP = {
    "central mumbai": "central mumbai",
    "north mumbai": "north mumbai",
    "south mumbai": "south mumbai",
    "western mumbai": "western mumbai",
}

ZONE_DISPLAY = {
    "central-mumbai": "Central Mumbai",
    "north-mumbai": "North Mumbai",
    "south-mumbai": "South Mumbai",
    "western-mumbai": "Western Mumbai",
}


# ------------------------------------------------
# Utility Functions
# ------------------------------------------------

def titleize_slug(slug):
    """Convert a slug like 'gyms' to 'Gyms'."""
    return slug.replace("-", " ").title()


def unique_slug(model, base_slug):
    """Generate a unique slug for a model, appending -N if needed."""
    slug = base_slug
    counter = 1
    while model.query.filter_by(slug=slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


# ------------------------------------------------
# DB Helpers (skip-if-exists pattern)
# ------------------------------------------------

def get_or_create_root():
    """Get or create the Mumbai root location. Returns (location, is_new)."""
    mumbai = Location.query.filter_by(slug="mumbai").first()
    if mumbai:
        return mumbai, False

    mumbai = Location(name="Mumbai", slug="mumbai", is_active=True)
    db.session.add(mumbai)
    db.session.flush()
    return mumbai, True


def get_or_create_zone(zone_slug, zone_name, parent_id):
    """Get or create a zone-level location (e.g. north-mumbai). Returns (location, is_new)."""
    zone = Location.query.filter_by(slug=zone_slug).first()
    if zone:
        return zone, False

    zone = Location(
        name=zone_name,
        slug=zone_slug,
        parent_id=parent_id,
        is_active=True,
    )
    db.session.add(zone)
    db.session.flush()
    return zone, True


def get_or_create_sub_location(zone_location, sub_location_slug):
    """Get or create a sub-location under a zone. Returns (location, is_new)."""
    if not sub_location_slug:
        return None, False

    # Check if location already exists by slug
    location = Location.query.filter_by(slug=sub_location_slug).first()
    if location:
        return location, False

    # Create new sub-location
    name = titleize_slug(sub_location_slug)

    location = Location(
        name=name,
        slug=sub_location_slug,
        parent_id=zone_location.id,
        is_active=True,
    )
    db.session.add(location)
    db.session.flush()
    return location, True


def get_or_create_category(category_slug):
    """Get or create a category from a slug. Returns (category, is_new)."""
    if not category_slug or not category_slug.strip():
        return None, False

    category_slug = category_slug.strip().lower()
    name = titleize_slug(category_slug)

    category = Category.query.filter_by(slug=category_slug).first()
    if category:
        return category, False

    category = Category(
        name=name,
        slug=category_slug,
        is_active=True,
    )
    db.session.add(category)
    db.session.flush()
    return category, True


def ensure_location_category(location, category):
    """Ensure a LocationCategory junction record exists. Returns (junction, is_new)."""
    existing = LocationCategory.query.filter_by(
        location_id=location.id,
        category_id=category.id,
    ).first()

    if existing:
        return existing, False

    seo_slug = slugify(f"{category.slug}-in-{location.slug}")

    # Ensure uniqueness
    counter = 1
    base_slug = seo_slug
    while LocationCategory.query.filter_by(seo_slug=seo_slug).first():
        seo_slug = f"{base_slug}-{counter}"
        counter += 1

    name = f"{category.name} in {location.name}"

    new_entry = LocationCategory(
        location_id=location.id,
        category_id=category.id,
        seo_slug=seo_slug,
        name=name,
        description=f"Explore the best {category.name} services in {location.name}. "
                    f"Verified and trusted businesses listed on Mumbai96.",
        seo_description=f"Find top-rated {category.name.lower()} in {location.name}. "
                       f"Compare services, reviews, and connect with trusted professionals "
                       f"in your area.",
    )

    db.session.add(new_entry)
    return new_entry, True


# ------------------------------------------------
# Core Import Logic
# ------------------------------------------------

def extract_category_slugs_from_batch(batch_dir):
    """
    Extract category slugs from a batch directory.
    Sources:
        1. _state.json 'categories' array (preferred)
        2. JSON filenames as fallback
    Returns a deduplicated list of category slugs.
    """
    slugs = set()

    # Source 1: _state.json
    state_path = os.path.join(batch_dir, "_state.json")
    if os.path.exists(state_path):
        try:
            with open(state_path, "r", encoding="utf-8") as f:
                state = json.load(f)
            for cat in state.get("categories", []):
                slug = cat.get("slug")
                if slug:
                    slugs.add(slug.strip().lower())
        except (json.JSONDecodeError, IOError) as e:
            print(f"  ⚠️  Error reading _state.json: {e}")

    # Source 2: JSON filenames (fallback)
    for json_file in glob.glob(os.path.join(batch_dir, "*.json")):
        basename = os.path.basename(json_file)
        if basename == "_state.json":
            continue
        filename_slug = os.path.splitext(basename)[0].strip().lower()
        if filename_slug:
            slugs.add(filename_slug)

    return sorted(slugs)


def read_state_file(batch_dir):
    """Read and return the _state.json content, or None on error."""
    state_path = os.path.join(batch_dir, "_state.json")
    if not os.path.exists(state_path):
        return None

    try:
        with open(state_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"  ❌ Error reading _state.json in {batch_dir}: {e}")
        return None


def import_batch(batch_dir, zone_location, dry_run=False):
    """
    Import categories and locations from a single batch directory.
    Returns a stats dict.
    """
    stats = {
        "locations_created": 0,
        "locations_skipped": 0,
        "categories_created": 0,
        "categories_skipped": 0,
        "junctions_created": 0,
        "junctions_skipped": 0,
        "errors": 0,
    }

    # Read _state.json for sub-location
    state = read_state_file(batch_dir)
    if not state:
        print(f"  ❌ No _state.json found in {batch_dir}")
        stats["errors"] += 1
        return stats

    sub_location_slug = state.get("location")
    batch_id = state.get("batchId", "unknown")
    is_complete = state.get("isComplete", False)
    total_businesses = state.get("totalBusinessesFound", 0)

    if not sub_location_slug:
        print(f"  ❌ No 'location' in _state.json for {batch_dir}")
        stats["errors"] += 1
        return stats

    if not is_complete:
        print(f"  ⚠️  Batch {batch_id} is INCOMPLETE ({total_businesses} businesses)")

    # Get or create sub-location
    location, loc_new = get_or_create_sub_location(zone_location, sub_location_slug)
    if not location:
        print(f"  ❌ Failed to create location: {sub_location_slug}")
        stats["errors"] += 1
        return stats

    if loc_new:
        print(f"  🆕 Location created: {location.name} ({sub_location_slug})")
        stats["locations_created"] += 1
    else:
        print(f"  ⏭️  Location already exists: {location.name} ({sub_location_slug})")
        stats["locations_skipped"] += 1

    # Extract category slugs
    category_slugs = extract_category_slugs_from_batch(batch_dir)

    print(f"  📦 Batch: {batch_id}")
    print(f"     Categories found: {len(category_slugs)}")

    for cat_slug in category_slugs:
        # Skip if dry run for category creation
        if dry_run:
            # Check existence only
            existing = Category.query.filter_by(slug=cat_slug).first()
            if existing:
                stats["categories_skipped"] += 1
            else:
                stats["categories_created"] += 1

            existing_jc = LocationCategory.query.filter_by(
                location_id=location.id,
                category_id=existing.id if existing else 0
            ).first()
            if existing_jc:
                stats["junctions_skipped"] += 1
            else:
                stats["junctions_created"] += 1
            continue

        try:
            # Create category
            category, cat_new = get_or_create_category(cat_slug)
            if not category:
                print(f"  ⚠️  Failed to create category: {cat_slug}")
                stats["errors"] += 1
                continue

            if cat_new:
                stats["categories_created"] += 1
            else:
                stats["categories_skipped"] += 1

            # Create LocationCategory junction
            junction, jc_new = ensure_location_category(location, category)
            if jc_new:
                stats["junctions_created"] += 1
            else:
                stats["junctions_skipped"] += 1

        except Exception as e:
            stats["errors"] += 1
            print(f"  ⚠️  Error processing category '{cat_slug}': {e}")
            db.session.rollback()

    return stats


# ------------------------------------------------
# Main Entry Point
# ------------------------------------------------

def run():
    parser = argparse.ArgumentParser(
        description="Import categories and locations from JSON data (no businesses)"
    )
    parser.add_argument(
        "--zone",
        help='Zone name, e.g., "north mumbai". Imports all zones if omitted.',
    )
    parser.add_argument(
        "--data-dir",
        help="Path to locations_data directory (default: ../locations_data relative to script)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview import without writing to database",
    )
    args = parser.parse_args()

    # Override DATA_DIR from CLI
    data_dir = args.data_dir or DATA_DIR

    # Build zone list
    if args.zone:
        zone_name = args.zone.strip().lower()
        if zone_name not in ZONE_DIR_MAP:
            print(f"❌ Unknown zone: {zone_name}")
            print(f"   Available zones: {', '.join(ZONE_DIR_MAP.keys())}")
            sys.exit(1)
        zones_to_process = [zone_name]
    else:
        zones_to_process = list(ZONE_DIR_MAP.keys())

    # Validate data directory
    if not os.path.exists(data_dir):
        print(f"❌ Data directory not found: {data_dir}")
        sys.exit(1)

    # Initialize Flask app
    app = create_app()
    app.app_context().push()

    # Ensure root location exists
    root, root_new = get_or_create_root()
    if root_new:
        print("🆕 Created root location: Mumbai")
    else:
        print("⏭️  Root location already exists: Mumbai")

    grand_stats = {
        "zones_processed": 0,
        "locations_created": 0,
        "locations_skipped": 0,
        "categories_created": 0,
        "categories_skipped": 0,
        "junctions_created": 0,
        "junctions_skipped": 0,
        "errors": 0,
    }

    print("\n" + "=" * 60)
    print("🚀 Categories & Locations Import")
    print(f"   Data dir: {data_dir}")
    print(f"   Zones: {len(zones_to_process)}")
    print(f"   Dry run: {args.dry_run}")
    print("=" * 60)

    for zone_name in zones_to_process:
        zone_dir = ZONE_DIR_MAP[zone_name]
        zone_path = os.path.join(data_dir, zone_dir)

        if not os.path.exists(zone_path):
            print(f"\n❌ Zone directory not found: {zone_path}")
            grand_stats["errors"] += 1
            continue

        # Find batch directories
        batch_dirs = sorted(glob.glob(os.path.join(zone_path, "batch-*")))

        if not batch_dirs:
            print(f"\n❌ No batch directories found in {zone_path}")
            grand_stats["errors"] += 1
            continue

        # Get or create zone location
        zone_slug = zone_name.replace(" ", "-")
        zone_display = ZONE_DISPLAY.get(zone_slug, zone_name.title())

        zone_location, zone_new = get_or_create_zone(zone_slug, zone_display, root.id)
        if zone_new:
            print(f"\n🆕 Zone created: {zone_display} ({zone_slug})")
        else:
            print(f"\n⏭️  Zone already exists: {zone_display} ({zone_slug})")

        print(f"   Batches: {len(batch_dirs)}")
        print("-" * 60)

        grand_stats["zones_processed"] += 1
        batch_num = 0

        for batch_dir in batch_dirs:
            batch_num += 1
            print(f"\n[{batch_num}/{len(batch_dirs)}] {os.path.basename(batch_dir)}...")

            try:
                batch_stats = import_batch(
                    batch_dir, zone_location,
                    dry_run=args.dry_run,
                )

                # Accumulate stats
                for key in batch_stats:
                    grand_stats[key] += batch_stats[key]

                # Commit after each batch (unless dry run)
                if not args.dry_run:
                    try:
                        db.session.commit()
                        print(f"  💾 Batch committed")
                    except Exception as e:
                        db.session.rollback()
                        print(f"  ❌ Batch commit failed: {e}")
                        traceback.print_exc()
                        grand_stats["errors"] += 1

            except Exception as e:
                print(f"  ❌ Batch failed: {e}")
                traceback.print_exc()
                db.session.rollback()
                grand_stats["errors"] += 1

    # Summary
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print(f"   Zones processed:     {grand_stats['zones_processed']}")
    print(f"   Locations created:   {grand_stats['locations_created']}")
    print(f"   Locations skipped:   {grand_stats['locations_skipped']}")
    print(f"   Categories created:  {grand_stats['categories_created']}")
    print(f"   Categories skipped:  {grand_stats['categories_skipped']}")
    print(f"   Junctions created:   {grand_stats['junctions_created']}")
    print(f"   Junctions skipped:   {grand_stats['junctions_skipped']}")
    print(f"   Errors:              {grand_stats['errors']}")
    print("=" * 60)


if __name__ == "__main__":
    run()
