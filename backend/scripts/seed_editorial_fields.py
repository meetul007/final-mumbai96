"""
Seed editorial-only fields for locations.

These fields are NOT in the Excel import and must be set via admin UI
or this script. Fields: character_vibe, resident_profile, local_events,
upcoming_projects, residential_societies, area_report_card.

Usage:
    cd backend
    python scripts/seed_editorial_fields.py
"""

import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from app.extensions import db
from app.listing.models import Location


# ---------------------------------------------------------------------------
# Seed data — keyed by location slug
# ---------------------------------------------------------------------------

SEED_DATA = {
    "dadar-east": {
        "character_vibe": [
            {"keyword": "Maharashtrian Heartland", "description": "Strong Marathi cultural identity with historic roots."},
            {"keyword": "Commercial & Residential Mix", "description": "Busy commercial corridors alongside dense residential chawls and societies."},
            {"keyword": "Working-class Spirit", "description": "Grounded, community-oriented neighbourhood with a vibrant street life."},
        ],
        "resident_profile": [
            {"segment": "Maharashtrian Families", "percentage": 60, "description": "Multi-generational Maharashtrian families in chawls and societies."},
            {"segment": "Working Professionals", "percentage": 25, "description": "Young professionals working in Parel, Lower Parel and BKC."},
            {"segment": "Students", "percentage": 10, "description": "Students attending nearby colleges and coaching classes."},
            {"segment": "Elderly Residents", "percentage": 5, "description": "Long-time residents in older housing stock."},
        ],
        "local_events": [
            {"name": "Ganesh Chaturthi Celebrations", "date": "August-September", "description": "Elaborate Ganesh pandals and community celebrations across Naigaum and TT Circle."},
            {"name": "Dahi Handi (Janmashtami)", "date": "August", "description": "Traditional Dahi Handi events in the chawls of Dadar East."},
            {"name": "Navratri Garba", "date": "September-October", "description": "Community garba events in local society grounds."},
            {"name": "Mumbai Marathon", "date": "January", "description": "Route passes through key Dadar East junctions annually."},
        ],
        "upcoming_projects": [
            {"name": "Dadar TT Circle Redevelopment", "developer": "BMC", "status": "Planning", "description": "Proposed redevelopment of the historic TT circle area to improve traffic flow and pedestrian amenities."},
            {"name": "Coastal Road (Phase 2)", "developer": "BMC / MMRDA", "status": "Ongoing", "description": "Extended coastal road connectivity from Marine Drive to Kandivali, benefiting Dadar East commuters."},
            {"name": "Building Redevelopment Projects", "developer": "Private Developers", "status": "Ongoing", "description": "Multiple old building redevelopment projects in Naigaum and Hindmata areas under new DCPR norms."},
        ],
        "residential_societies": [
            {"name": "Naigaum CHS", "type": "Co-operative Housing Society", "description": "Well-established co-operative housing society in the heart of Naigaum."},
            {"name": "Dadar East Premises Co-op Society", "type": "Co-operative Housing Society", "description": "Large society complex near Dadar station east exit."},
            {"name": "Hindmata Area Apartments", "type": "Mixed Apartments", "description": "Mix of old and redeveloped apartments around Hindmata cinema junction."},
        ],
        "area_report_card": {
            "safety": 3,
            "cleanliness": 2,
            "green": 2,
            "transit": 5,
            "overall": 3.2,
        },
    },
    "dadar-west": {
        "character_vibe": [
            {"keyword": "Marathi Cultural Capital", "description": "Home to Shivaji Park, political rallies and Maharashtrian cultural identity."},
            {"keyword": "Prestigious Residential", "description": "One of Mumbai's most desirable addresses with heritage buildings and sea-link access."},
            {"keyword": "Heritage & Modern Blend", "description": "Portuguese-era churches alongside modern high-rises."},
        ],
        "resident_profile": [
            {"segment": "Affluent Families", "percentage": 45, "description": "Established families in premium apartments near Shivaji Park."},
            {"segment": "Professionals", "percentage": 30, "description": "Doctors, lawyers and business professionals."},
            {"segment": "Elderly Residents", "percentage": 15, "description": "Long-standing residents in heritage buildings."},
            {"segment": "Students & Youth", "percentage": 10, "description": "Students at nearby colleges and coaching institutes."},
        ],
        "local_events": [
            {"name": "Shivaji Park Dussehra Melava", "date": "October", "description": "Annual Dussehra rally at Shivaji Park — one of Mumbai's largest political gatherings."},
            {"name": "Ganesh Chaturthi", "date": "August-September", "description": "Grand celebrations at Shivaji Park and surrounding areas."},
            {"name": "Shivaji Park Cricket Coaching", "date": "Year-round", "description": "Famous cricket coaching nets at Shivaji Park — a Mumbai cricketing institution."},
        ],
        "upcoming_projects": [
            {"name": "Bandra-Worli Sea Link Phase 2", "developer": "MSRDC", "status": "Ongoing", "description": "Extended sea link connectivity improving access to Western suburbs."},
            {"name": "Dadar West Redevelopment", "developer": "BMC & Private", "status": "Ongoing", "description": "Multiple redevelopment projects along Ranade Road and surrounding areas."},
        ],
        "residential_societies": [
            {"name": "Shivaji Park Residency", "type": "Premium Apartments", "description": "High-end apartments facing Shivaji Park with sea views."},
            {"name": "Ranade Road Heritage Buildings", "type": "Heritage Apartments", "description": "Pre-war heritage buildings along the commercial strip."},
            {"name": "Portuguese Church Area Societies", "type": "Co-operative Societies", "description": "Well-established societies in the heritage church neighbourhood."},
        ],
        "area_report_card": {
            "safety": 4,
            "cleanliness": 3,
            "green": 3,
            "transit": 5,
            "overall": 3.8,
        },
    },
}


def main():
    app = create_app()

    with app.app_context():
        updated = 0
        skipped = 0

        for slug, seed in SEED_DATA.items():
            location = Location.query.filter_by(slug=slug).first()
            if not location:
                print(f"  ⏭️  {slug} — not found in DB, skipping")
                skipped += 1
                continue

            for field, value in seed.items():
                setattr(location, field, value)

            db.session.flush()
            updated += 1
            print(f"  ✅ {slug} — editorial fields seeded")

        db.session.commit()

        print(f"\n  Summary: {updated} updated, {skipped} skipped")


if __name__ == "__main__":
    main()
