#!/usr/bin/env python3
"""
Reassign Listings to the correct Location based on the location name
found in Listing.address text, using the known 75-location list.
Run --dry-run first. Never touches Business rows themselves.
"""
import argparse
import re
from sqlalchemy.orm import joinedload
from app import create_app
from app.extensions import db
from app.listing.models import Location, Listing, LocationCategory, Business, Category
from slugify import slugify

KNOWN_LOCATIONS = [
    "Virar West","Virar East","Nalasopara West","Nalasopara East","Vasai West","Vasai East",
    "Naigaon West","Naigaon East","Bhayandar West","Bhayandar East","Mira Road East","Uttan",
    "Gorai","Dahisar West","Dahisar East","Borivali West","Borivali East","Kandivali West",
    "Kandivali East","Malad West","Malad East","Madh/Marve","Goregaon West","Goregaon East",
    "Jogeshwari West","Jogeshwari East","Andheri West","Andheri East","Juhu","Versova",
    "Vile Parle West","Vile Parle East","Santacruz West","Santacruz East","Khar West","Khar East",
    "Bandra West","Bandra East","Pali Hill","Mahim","Mulund West","Mulund East","Bhandup",
    "Vikhroli","Powai","Chembur","Ghatkopar West","Ghatkopar East","Kurla","Sion","Wadala",
    "BKC","Matunga","Dadar West","Dadar East","Prabhadevi","Lower Parel West","Lower Parel East",
    "Worli","Mahalaxmi","Marine Lines","Mumbai Central","Grant Road","Charni Road","Byculla",
    "Pedder Road","Altamount Road","Tardeo","Breach Candy","Malabar Hill","Kalbadevi","Churchgate",
    "Fort","Cuffe Parade","Colaba",
]
KNOWN_LOCATIONS.sort(key=len, reverse=True)
PATTERNS = [(name, re.compile(r'\b' + re.escape(name) + r'\b', re.IGNORECASE)) for name in KNOWN_LOCATIONS]

def find_location_in_address(address):
    if not address:
        return None
    for name, pat in PATTERNS:
        if pat.search(address):
            return name
    return None

def run(dry_run):
    app = create_app()
    app.app_context().push()

    name_to_location = {loc.name.lower(): loc for loc in Location.query.all()}

    print("Loading listings (single batch query)...", flush=True)
    listings = (
        Listing.query
        .options(joinedload(Listing.business).joinedload(Business.category))
        .all()
    )
    print(f"Total listings: {len(listings)}", flush=True)

    existing_pairs = set(db.session.query(Listing.business_id, Listing.location_id).all())
    existing_lc = set(db.session.query(LocationCategory.location_id, LocationCategory.category_id).all())

    reassigned = 0
    already_correct = 0
    no_match = 0
    conflicts = 0
    conflict_log = []
    nomatch_log = []
    reassign_log = []
    new_lc_pairs = set()

    for i, listing in enumerate(listings):
        if i and i % 10000 == 0:
            print(f"  ...processed {i}/{len(listings)}", flush=True)

        biz_name = listing.business.name if listing.business else "?"
        matched_name = find_location_in_address(listing.address)
        if not matched_name:
            no_match += 1
            nomatch_log.append((listing.id, biz_name, listing.address))
            continue

        target_location = name_to_location.get(matched_name.lower())
        if not target_location:
            no_match += 1
            continue

        if listing.location_id == target_location.id:
            already_correct += 1
            continue

        if (listing.business_id, target_location.id) in existing_pairs:
            conflicts += 1
            conflict_log.append((listing.id, biz_name, listing.location_id, target_location.id))
            continue

        reassign_log.append((listing.id, biz_name, listing.location_id, target_location.id, target_location.name, listing.address))

        if not dry_run:
            existing_pairs.discard((listing.business_id, listing.location_id))
            listing.location_id = target_location.id
            existing_pairs.add((listing.business_id, target_location.id))

            if listing.business and listing.business.category:
                cat = listing.business.category
                key = (target_location.id, cat.id)
                if key not in existing_lc and key not in new_lc_pairs:
                    seo_slug = slugify(f"{cat.slug}-in-{target_location.slug}")
                    db.session.add(LocationCategory(
                        location_id=target_location.id, category_id=cat.id,
                        seo_slug=seo_slug, name=f"{cat.name} in {target_location.name}",
                        description=f"Explore the best {cat.name} services in {target_location.name}.",
                        seo_description=f"Find top-rated {cat.name.lower()} in {target_location.name}.",
                    ))
                    new_lc_pairs.add(key)

        reassigned += 1

    if not dry_run:
        print("Committing...", flush=True)
        db.session.commit()

    print("\n" + "=" * 60, flush=True)
    print(f"Reassigned:      {reassigned}", flush=True)
    print(f"Already correct: {already_correct}", flush=True)
    print(f"No location match in address: {no_match}", flush=True)
    print(f"Conflicts (skipped): {conflicts}", flush=True)
    print("=" * 60, flush=True)

    print(f"\n--- REASSIGN SAMPLE (first 30 of {len(reassign_log)}) ---", flush=True)
    for lid, bname, cur, tgt, tgt_name, addr in reassign_log[:30]:
        print(f"  [{lid}] '{bname}': {cur} -> {tgt} ({tgt_name}) | {addr}", flush=True)

    if conflict_log:
        print(f"\n--- CONFLICTS (first 20 of {len(conflict_log)}) ---", flush=True)
        for lid, bname, cur, tgt in conflict_log[:20]:
            print(f"  listing {lid} '{bname}': at loc {cur}, wants loc {tgt}", flush=True)

    if nomatch_log:
        print(f"\n--- NO-MATCH SAMPLE (first 15 of {len(nomatch_log)}) ---", flush=True)
        for lid, bname, addr in nomatch_log[:15]:
            print(f"  listing {lid} '{bname}': {addr}", flush=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    run(args.dry_run)
