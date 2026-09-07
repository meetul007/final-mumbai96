"""
Repair mojibake (double-encoded UTF-8) text in the locations table.

Root cause: text was written to Postgres through a connection that did not
declare client_encoding=utf8 (or the server/cluster encoding was not UTF8).
Multi-byte UTF-8 characters (₹, –, →, ★, emoji, etc.) got stored as if each
raw byte were a separate Latin-1 character, producing sequences like
"Ã¢â‚¬" / "ðŸŒ®" instead of the real character.

This script detects that specific corruption pattern and reverses it by
re-encoding the string as Latin-1 (to recover the original UTF-8 bytes) and
decoding those bytes as UTF-8. It only touches values where the corruption
markers are present, so already-correct text is left untouched.

Usage:
    cd backend
    python scripts/fix_mojibake.py            # dry run, prints what would change
    python scripts/fix_mojibake.py --write     # applies the fix and commits
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from app.extensions import db
from app.listing.models import Location

JSON_FIELDS = [
    "travelling_connectivity",
    "living_style",
    "nearby_locations",
    "best_services",
    "food",
    "places_to_visit",
    "night_life",
    "character_vibe",
    "resident_profile",
    "sub_areas",
    "property_prices",
    "schools",
    "hospitals",
    "major_employers",
    "local_events",
    "upcoming_projects",
    "residential_societies",
    "faq",
    "civic_data",
    "area_report_card",
]

TEXT_FIELDS = [
    "seo_title",
    "seo_description",
    "seo_keywords",
    "about",
    "municipal_body",
    "food_tags",
]

MOJIBAKE_MARKERS = ("Ã", "Â", "â€", "ð")


def looks_like_mojibake(value):
    return isinstance(value, str) and any(m in value for m in MOJIBAKE_MARKERS)


def try_fix_once(value):
    try:
        fixed = value.encode("latin1").decode("utf-8")
    except (UnicodeDecodeError, UnicodeEncodeError):
        return value, False
    if fixed == value:
        return value, False
    return fixed, True


def fix_string(value, max_passes=3):
    changed = False
    for _ in range(max_passes):
        if not looks_like_mojibake(value):
            break
        fixed, ok = try_fix_once(value)
        if not ok:
            break
        value = fixed
        changed = True
    return value, changed


def fix_value(value):
    """Recursively walk dict/list/str structures, fixing mojibake strings."""
    if isinstance(value, str):
        return fix_string(value)
    if isinstance(value, list):
        changed = False
        new_list = []
        for item in value:
            new_item, item_changed = fix_value(item)
            new_list.append(new_item)
            changed = changed or item_changed
        return new_list, changed
    if isinstance(value, dict):
        changed = False
        new_dict = {}
        for k, v in value.items():
            new_v, v_changed = fix_value(v)
            new_dict[k] = new_v
            changed = changed or v_changed
        return new_dict, changed
    return value, False


def main():
    write_mode = "--write" in sys.argv

    app = create_app()
    with app.app_context():
        locations = Location.query.all()

        total_rows_changed = 0
        total_fields_changed = 0

        for loc in locations:
            row_changed = False

            for field in JSON_FIELDS:
                current = getattr(loc, field)
                if current is None:
                    continue
                new_value, changed = fix_value(current)
                if changed:
                    print(f"[{loc.slug}] {field}: fixed mojibake")
                    if write_mode:
                        setattr(loc, field, new_value)
                    row_changed = True
                    total_fields_changed += 1

            for field in TEXT_FIELDS:
                current = getattr(loc, field)
                if current is None:
                    continue
                new_value, changed = fix_string(current)
                if changed:
                    print(f"[{loc.slug}] {field}: fixed mojibake")
                    if write_mode:
                        setattr(loc, field, new_value)
                    row_changed = True
                    total_fields_changed += 1

            if row_changed:
                total_rows_changed += 1

        if write_mode:
            db.session.commit()
            print(f"\nDone. Rows changed: {total_rows_changed}, fields fixed: {total_fields_changed}")
        else:
            print(f"\nDry run. Rows that would change: {total_rows_changed}, fields: {total_fields_changed}")
            print("Run with --write to apply and commit these fixes.")


if __name__ == "__main__":
    main()
