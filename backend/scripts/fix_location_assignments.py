#!/usr/bin/env python3
"""
Fix listings whose own scraped address indicates they actually belong to a
different (usually neighboring) location than the one they were imported
under.

Background: when the scraper searched for businesses "near" a given
location, Google Places sometimes returned a few results just outside that
area's boundary too — perfectly normal behavior for a radius-based search.
The import script trusted the batch's stated location for every business in
it, rather than checking each business's own scraped address, so a handful
of businesses ended up filed under the wrong location — most often a
neighboring one that shares the same parent region.

This script re-reads each Listing's own `address` field, checks it against
the names of sibling locations (same parent region), and if the address
clearly names a different location than the one currently assigned — and
does NOT also mention the currently-assigned one — proposes fixing it.
Addresses that mention more than one location name are left untouched and
flagged for manual review, rather than guessed at.

Some businesses already have a separate, correct listing at the target
location (the same business can legitimately appear in more than one
place). Moving a mislabeled listing on top of that would violate the
database's one-listing-per-business-per-location rule, so these are
reported as conflicts and, by default, left untouched. Pass
--unpublish-conflicts to additionally hide (not delete) the redundant
duplicate once its correct counterpart is confirmed to exist.

SAFE BY DEFAULT: without --apply, this script only PRINTS a report. Nothing
is written to the database. Review the report, then re-run with --apply
once you're happy with it.

Usage:
    # Step 1 — preview ONE location, changes nothing:
    python scripts/fix_location_assignments.py --location "virar-east"

    # Step 2 — apply for that one location:
    python scripts/fix_location_assignments.py --location "virar-east" --apply

    # Preview EVERY location in one run (summary view):
    python scripts/fix_location_assignments.py

    # Apply for every location, and unpublish redundant conflicting duplicates:
    python scripts/fix_location_assignments.py --apply --unpublish-conflicts
"""

import os
import sys
import argparse

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from app.extensions import db
from app.listing.models import Location, Listing, Business


def find_location_mentions(address, candidate_locations):
    """Return candidate Locations whose name appears in the address (case-insensitive)."""
    if not address:
        return []
    addr_lower = address.lower()
    return [loc for loc in candidate_locations if loc.name.lower() in addr_lower]


def process_location(location, dry_run, unpublish_conflicts):
    """Check one location's listings against its siblings. Returns a results dict."""
    siblings = (
        Location.query
        .filter(
            Location.parent_id == location.parent_id,
            Location.id != location.id,
            Location.is_active.is_(True),
        )
        .all()
        if location.parent_id else []
    )

    results = {
        "location": location,
        "siblings": siblings,
        "changes": [],
        "conflicts": [],
        "needs_review": [],
        "ambiguous": [],
        "unpublished": 0,
    }

    if not siblings:
        return results

    listings = (
        Listing.query
        .join(Business)
        .filter(
            Listing.location_id == location.id,
            Listing.is_published.is_(True),
            Business.is_active.is_(True),
        )
        .all()
    )

    claimed_pairs = set()

    for listing in listings:
        address = listing.address or ""
        current_mentioned = location.name.lower() in address.lower()
        sibling_matches = find_location_mentions(address, siblings)

        if not sibling_matches:
            continue

        if current_mentioned or len(sibling_matches) > 1:
            results["ambiguous"].append((listing, sibling_matches, address))
            continue

        new_location = sibling_matches[0]
        pair = (listing.business_id, new_location.id)

        if pair in claimed_pairs:
            results["conflicts"].append((listing, new_location, address))
            continue

        existing = (
            Listing.query
            .filter(
                Listing.business_id == listing.business_id,
                Listing.location_id == new_location.id,
                Listing.id != listing.id,
            )
            .first()
        )
        if existing:
            # Don't just trust the existing listing because it got there
            # first — confirm ITS OWN address actually supports its own
            # assigned location before treating it as authoritative.
            existing_address = (existing.address or "").lower()
            existing_confirmed = new_location.name.lower() in existing_address

            if existing_confirmed:
                results["conflicts"].append((listing, new_location, address))
                if not dry_run and unpublish_conflicts:
                    listing.is_published = False
                    results["unpublished"] += 1
            else:
                # Neither listing is clearly the correct one — duplication
                # runs deeper here than a simple address check can resolve.
                # Leave both untouched and flag for a human to look at.
                results["needs_review"].append((listing, new_location, address, existing))
            continue

        claimed_pairs.add(pair)
        results["changes"].append((listing, new_location, address))

        if not dry_run:
            listing.location_id = new_location.id

    return results


def print_detail(results):
    location = results["location"]
    changes = results["changes"]
    print(f"\n   Siblings checked: {', '.join(s.name for s in results['siblings']) or '(none)'}")
    print(f"   Fixed/would fix: {len(changes)}")
    for listing, new_location, address in changes[:30]:
        print(f"     • {listing.business.name}: {location.name} → {new_location.name}")
        print(f"         {address}")
    if len(changes) > 30:
        print(f"     ... and {len(changes) - 30} more")

    if results["conflicts"]:
        note = "unpublished" if results["unpublished"] else "left untouched"
        print(f"\n   ⚠ {len(results['conflicts'])} conflict(s) — business already has a VERIFIED "
              f"listing at the target location ({note}):")
        for listing, new_location, address in results["conflicts"][:15]:
            print(f"     • {listing.business.name}: {location.name} → {new_location.name}")

    if results["needs_review"]:
        print(f"\n   ⚠️⚠️ {len(results['needs_review'])} NEEDS REVIEW — the existing listing at the "
              "target location doesn't match its own address either. Neither side was touched:")
        for listing, new_location, address, existing in results["needs_review"][:15]:
            print(f"     • {listing.business.name}")
            print(f"         at {location.name}: {address}")
            print(f"         vs {new_location.name}: {existing.address}")

    if results["ambiguous"]:
        print(f"\n   ⚠ {len(results['ambiguous'])} ambiguous — address mentions multiple "
              "locations, left untouched for manual review:")
        for listing, matches, address in results["ambiguous"][:15]:
            names = ", ".join(m.name for m in matches)
            print(f"     • {listing.business.name}: also mentions {names}")


def run():
    parser = argparse.ArgumentParser(
        description="Fix listings whose address indicates they belong to a sibling location"
    )
    parser.add_argument(
        "--location",
        help='One location slug, e.g. "virar-east". Omit to process every location in one run.',
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually write the changes. Without this flag, nothing is written — preview only.",
    )
    parser.add_argument(
        "--unpublish-conflicts",
        action="store_true",
        help="When a conflict is found (business already has a listing at the target location), "
             "unpublish the redundant duplicate instead of just leaving it untouched. Nothing is "
             "ever deleted — this can be undone by republishing.",
    )
    args = parser.parse_args()

    app = create_app()
    app.app_context().push()

    dry_run = not args.apply

    if args.location:
        location = Location.query.filter_by(slug=args.location, is_active=True).first()
        if not location:
            print(f"❌ Location not found: {args.location}")
            sys.exit(1)
        locations = [location]
        verbose = True
    else:
        locations = (
            Location.query
            .filter(Location.parent_id.isnot(None), Location.is_active.is_(True))
            .order_by(Location.name)
            .all()
        )
        verbose = False

    print("=" * 70)
    if dry_run:
        print("🔍 PREVIEW MODE — nothing will be changed.")
    else:
        print("✏️  APPLY MODE — changes below are being written to the database.")
    print(f"   Locations to check: {len(locations)}")
    if args.unpublish_conflicts:
        print("   Conflicting duplicates will be UNPUBLISHED (not deleted)")
    print("=" * 70)

    total_changes = total_conflicts = total_ambiguous = total_unpublished = total_needs_review = 0

    for location in locations:
        results = process_location(location, dry_run, args.unpublish_conflicts)
        total_changes += len(results["changes"])
        total_conflicts += len(results["conflicts"])
        total_ambiguous += len(results["ambiguous"])
        total_unpublished += results["unpublished"]
        total_needs_review += len(results["needs_review"])

        if not results["siblings"]:
            continue  # nothing to report for a location with no siblings

        if verbose:
            print(f"\n[{location.name}]")
            print_detail(results)
        elif results["changes"] or results["conflicts"] or results["ambiguous"] or results["needs_review"]:
            print(f"   {location.name:22s} fix={len(results['changes']):5d}   "
                  f"conflicts={len(results['conflicts']):4d}   "
                  f"needs_review={len(results['needs_review']):4d}   "
                  f"ambiguous={len(results['ambiguous']):3d}")

        if not dry_run:
            db.session.commit()  # save this location's changes before moving to the next

    print("\n" + "=" * 70)
    print(f"TOTAL — {'would fix' if dry_run else 'fixed'}: {total_changes}   "
          f"verified conflicts: {total_conflicts}"
          + (f" ({total_unpublished} unpublished)" if total_unpublished else "")
          + f"   needs_review: {total_needs_review}"
          + f"   ambiguous: {total_ambiguous}")
    print("=" * 70)

    if dry_run and total_changes:
        print(f"\nNothing was changed. Re-run with --apply to write these {total_changes} fixes.")
        if total_conflicts and not args.unpublish_conflicts:
            print(f"Add --unpublish-conflicts to also hide the {total_conflicts} redundant duplicates.")


if __name__ == "__main__":
    run()
