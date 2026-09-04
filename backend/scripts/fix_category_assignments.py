#!/usr/bin/env python3
"""
Fix already-imported businesses that were filed under the wrong category.

Background: the original import script derived a whole category file's
category from the FIRST business's Google "main_category" label, instead of
from the filename. That has since been fixed in import_json_listings.py, but
businesses imported BEFORE that fix are still sitting under the wrong
category in the database. This script repairs those existing rows.

It re-reads the same scraped JSON files (locations_data/<zone>/batch-*/<category>.json)
used by the original import, and for each business already in the database,
compares its current category against the CORRECT category (taken from the
JSON filename — the same source of truth the fixed import script now uses).

SAFE BY DEFAULT: without --apply, this script only PRINTS what it would
change. Nothing is written to the database. Review the report, then re-run
with --apply once you're happy with what it's about to do.

Usage:
    # Step 1 — preview only, changes nothing (recommended first run):
    python scripts/fix_category_assignments.py --zone "north mumbai"

    # Step 2 — after reviewing the preview, actually apply the fix:
    python scripts/fix_category_assignments.py --zone "north mumbai" --apply

    # Optional: limit to one batch, or point at a different data folder
    python scripts/fix_category_assignments.py --zone "north mumbai" --batch-id batch-1783016959967
    python scripts/fix_category_assignments.py --zone "north mumbai" --data-dir /path/to/locations_data
"""

import os
import sys
import json
import glob
import argparse

from slugify import slugify

# Make sure Python can find the 'app' package (in backend/) no matter how
# this script is invoked — e.g. `python scripts/fix_category_assignments.py`
# run from inside backend/ only puts the scripts/ folder itself on the
# import path, not its parent, so `from app import ...` would otherwise fail.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from app.extensions import db
from app.listing.models import Business, Category, Location, LocationCategory

# Reuse the exact same helpers the (now-fixed) import script uses, so the
# category names/slugs this script creates are guaranteed to match what a
# fresh import would produce.
from import_json_listings import (
    get_or_create_category,
    ensure_location_category,
    ZONE_DIR_MAP,
)


DATA_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "locations_data"
)


def correct_category_name_for_file(json_path, businesses_data):
    """Same rule as the fixed import script: filename is the source of truth."""
    name = os.path.splitext(os.path.basename(json_path))[0].replace("-", " ").title()
    if not name and businesses_data:
        name = businesses_data[0].get("main_category")
    return name


def process_batch(batch_dir, dry_run=True):
    state_path = os.path.join(batch_dir, "_state.json")
    if not os.path.exists(state_path):
        print(f"  ❌ No _state.json found in {batch_dir}, skipping")
        return []

    try:
        with open(state_path, "r", encoding="utf-8") as f:
            state = json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"  ❌ Error reading _state.json: {e}")
        return []

    sub_location_slug = state.get("location")
    if not sub_location_slug:
        print(f"  ❌ No 'location' in _state.json for {batch_dir}, skipping")
        return []

    location = Location.query.filter_by(slug=sub_location_slug).first()
    if not location:
        print(f"  ⚠ Location '{sub_location_slug}' not found in DB yet — skipping batch")
        return []

    json_files = sorted(glob.glob(os.path.join(batch_dir, "*.json")))
    json_files = [
        f for f in json_files
        if not f.endswith("_state.json") and not f.endswith(".error.json")
    ]

    batch_changes = []

    for json_path in json_files:
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                businesses_data = json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            print(f"  ❌ Error reading {json_path}: {e}")
            continue

        if not isinstance(businesses_data, list) or not businesses_data:
            continue

        correct_name = correct_category_name_for_file(json_path, businesses_data)
        if not correct_name:
            continue

        correct_slug = slugify(correct_name)
        # Read-only lookup in dry-run — never creates a Category row just to preview.
        correct_category = Category.query.filter_by(slug=correct_slug).first()

        for biz_data in businesses_data:
            if "place_id" not in biz_data:
                continue  # competitor entry, not a real scraped business

            name = (biz_data.get("name") or "").strip()[:255]
            if not name:
                continue

            business = Business.query.filter_by(name=name).first()
            if not business:
                # Not in the DB yet — out of scope here; a normal import will
                # pick it up correctly now that the import script is fixed.
                continue

            current_category_name = business.category.name if business.category else "None"
            already_correct = (
                correct_category is not None
                and business.category_id == correct_category.id
            )
            # Even if the category doesn't exist yet (correct_category is None),
            # we still know its NAME is different from what's currently set.
            if already_correct:
                continue
            if current_category_name == correct_name:
                continue

            batch_changes.append({
                "business_name": name,
                "business_id": business.id,
                "location": location.name,
                "old_category": current_category_name,
                "new_category": correct_name,
            })

            if not dry_run:
                category = get_or_create_category(correct_name)
                business.category_id = category.id
                ensure_location_category(location, category)

        if not dry_run:
            db.session.commit()

    return batch_changes


def run():
    parser = argparse.ArgumentParser(
        description="Fix mis-categorized businesses using the original scraped JSON as source of truth"
    )
    parser.add_argument("--zone", required=True, help='Zone name, e.g., "north mumbai"')
    parser.add_argument("--data-dir", help="Path to locations_data directory")
    parser.add_argument("--batch-id", help="Only process a specific batch")
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually write the changes. Without this flag, nothing is written — preview only.",
    )
    args = parser.parse_args()

    global DATA_DIR
    if args.data_dir:
        DATA_DIR = args.data_dir

    zone_name = args.zone.strip().lower()
    if zone_name not in ZONE_DIR_MAP:
        print(f"❌ Unknown zone: {zone_name}")
        print(f"   Available zones: {', '.join(ZONE_DIR_MAP.keys())}")
        sys.exit(1)

    zone_path = os.path.join(DATA_DIR, ZONE_DIR_MAP[zone_name])
    if not os.path.exists(zone_path):
        print(f"❌ Zone directory not found: {zone_path}")
        sys.exit(1)

    batch_dirs = sorted(glob.glob(os.path.join(zone_path, "batch-*")))
    if args.batch_id:
        batch_dirs = [d for d in batch_dirs if os.path.basename(d) == args.batch_id]

    if not batch_dirs:
        print(f"❌ No batch directories found in {zone_path}")
        sys.exit(1)

    app = create_app()
    app.app_context().push()

    dry_run = not args.apply

    print("=" * 70)
    if dry_run:
        print("🔍 PREVIEW MODE — nothing will be changed. Review the list below,")
        print("   then re-run with --apply once you're happy with it.")
    else:
        print("✏️  APPLY MODE — changes below are being written to the database.")
    print(f"   Zone: {zone_name}")
    print(f"   Batches: {len(batch_dirs)}")
    print("=" * 70)

    all_changes = []
    for i, batch_dir in enumerate(batch_dirs, 1):
        print(f"\n[{i}/{len(batch_dirs)}] {os.path.basename(batch_dir)}")
        changes = process_batch(batch_dir, dry_run=dry_run)
        all_changes.extend(changes)

    print("\n" + "=" * 70)
    print(f"{'Would fix' if dry_run else 'Fixed'}: {len(all_changes)} business(es)")
    print("=" * 70)

    # Group by old → new category pair, for a readable summary
    pair_counts = {}
    for c in all_changes:
        key = (c["old_category"], c["new_category"])
        pair_counts[key] = pair_counts.get(key, 0) + 1

    for (old, new), count in sorted(pair_counts.items(), key=lambda x: -x[1]):
        print(f"   {count:4d}x  '{old}'  →  '{new}'")

    # Sample of individual businesses, so you can spot-check specific names
    if all_changes:
        print("\nSample of individual changes (first 20):")
        for c in all_changes[:20]:
            print(f"   • {c['business_name']} ({c['location']}): '{c['old_category']}' → '{c['new_category']}'")

    if dry_run and all_changes:
        print(f"\nNothing was changed. Re-run with --apply to write these {len(all_changes)} fixes.")


if __name__ == "__main__":
    run()
