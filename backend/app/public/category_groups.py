"""
Category group definitions for grouping the flat 202 categories into
logical sections used by the location detail API and UI.

Each group has a key (slug-safe), a display label, and a list of category
slug patterns (exact matches or prefix matches with trailing hyphen).

Usage:
    from app.public.category_groups import CATEGORY_GROUPS, get_group_for_slug

    group = get_group_for_slug("dentists")       # → "health"
    group = get_group_for_slug("schools")         # → "education"

If a slug matches multiple groups, the first match wins.
"""

# ---------------------------------------------------------------------------
# Groups and their member category slugs
# ---------------------------------------------------------------------------

CATEGORY_GROUPS = {
    "schools": {
        "label": "Schools & Education",
        "icon": "🏫",
        "slugs": [
            "schools",
            "playschools",
            "colleges",
            "educational-institution",
        ],
    },
    "coaching": {
        "label": "Coaching & Tutoring",
        "icon": "📚",
        "slugs": [
            "coaching-center",
            "jee-classes",
            "neet-tutorials",
            "mht-cet-classes",
            "ielts-classes",
            "gmat-classes",
            "gre-classes",
            "science-classes",
            "maths-tutorials",
            "physics-tutorials",
            "chemistry-tutorials",
            "spoken-english-classes",
            "computer-classes",
            "swimming-classes",
            "music-classes",
            "dance-classes",
            "drawing-classes",
            "driving-schools",
            "language-classes",
        ],
    },
    "hospitals": {
        "label": "Hospitals & Clinics",
        "icon": "🏥",
        "slugs": [
            "hospitals",
            "maternity-hospitals",
            "blood-banks",
            "diagnostic-centres",
            "medical-pathology-labs",
            "xray-sonography-centres",
            "ambulance-services",
        ],
    },
    "doctors": {
        "label": "Doctors & Specialists",
        "icon": "🩺",
        "slugs": [
            "dentists",
            "dental-clinics",
            "eye-doctors",
            "ent-doctors",
            "heart-doctors",
            "ortho-doctors",
            "skin-doctors",
            "spine-doctors",
            "pet-doctors",
            "gynecologist-obstetricians",
            "pediatrician-child-doctors",
            "ayurvedic-doctors",
            "homeopathy-doctors",
            "physiotherapists",
            "psychiatrists",
            "psychologists",
            "dietitians-nutritionists",
        ],
    },
    "fitness": {
        "label": "Fitness & Wellness",
        "icon": "💪",
        "slugs": [
            "gyms",
            "gyms-",
            "personal-trainers",
            "personal-trainers-",
            "yoga-classes",
            "zumba-classes",
            "elders-care",
        ],
    },
    "spa_beauty": {
        "label": "Spa & Beauty",
        "icon": "💇",
        "slugs": [
            "salons",
            "beauty-parlours",
            "spas",
            "bridal-makeup-artists",
            "groom-makeup-artists",
            "makeover-artists",
            "tatoo-artists",
            "tattoo-artists",
        ],
    },
    "home_services": {
        "label": "Home Services",
        "icon": "🔧",
        "slugs": [
            "plumbers",
            "electricians",
            "carpenters",
            "painters",
            "pest-control",
            "packers-and-movers",
            "home-cleaning-services",
            "laundry-dry-cleaners",
            "water-purifier-services",
            "cctv-installation",
            "false-ceiling-contractors",
            "sofa-repair-services",
            "furniture-on-rent",
        ],
    },
    "electronics_repair": {
        "label": "Electronics & Repair",
        "icon": "💻",
        "slugs": [
            "laptop-repair-service-experts",
            "mobile-phone-repair-experts",
            "ac-service-and-repair-experts",
        ],
    },
    "health_wellness": {
        "label": "Health & Wellness",
        "icon": "🧘",
        "slugs": [
            "pharmacies",
            "medical-tourism",
            "ivf-centers",
            "deaddiction-centres",
            "women-care-centres",
        ],
    },
    "banks_finance": {
        "label": "Banks & Finance",
        "icon": "🏦",
        "slugs": [
            "financial-advisors",
            "accountant",
            "accounting-firm",
            "auditor",
            "chartered-accountant",
            "chartered-accountants-ca",
            "certified-public-accountant",
            "tax-consultant",
            "income-tax-consultants",
            "stock-brokers",
            "real-estate-attorney",
            "consultant",
            "corporate-office",
            "home-loan-providers",
            "personal-loan-providers",
            "business-loan-providers",
            "auto-loan-providers",
            "gold-loan-providers",
            "loan-against-property",
            "health-insurance-providers",
            "car-insurance-providers",
            "bike-insurance-providers",
            "term-life-insurance-providers",
        ],
    },
    "restaurants": {
        "label": "Restaurants & Food",
        "icon": "🍽️",
        "slugs": [
            "restaurants",
            "vegetarian-restaurants",
            "biryani-restaurants",
            "chinese-restaurants",
            "south-indian-restaurants",
            "seafood-restaurants",
            "fast-food-restaurants",
            "street-food",
            "cafes-coffee-shops",
            "bakeries",
            "cake-shops",
            "ice-cream-shops",
            "juice-shops",
            "sweet-shops",
            "tiffin-services",
            "caterers",
            "dabbawalas",
        ],
    },
    "shopping": {
        "label": "Shopping",
        "icon": "🛍️",
        "slugs": [
            "clothing-stores",
            "jewellery-shops",
            "shoe-stores",
            "electronics-stores",
            "mobile-phone-shops",
            "grocery-stores",
            "gift-shops",
            "book-stores",
            "stationery-stores",
            "hardware-stores",
            "sports-goods-stores",
            "baby-products-stores",
            "furniture-and-decor-stores",
            "optical-shops",
            "pet-food-shops",
            "artifact-shops",
            "light-decor-shops",
        ],
    },
    "automotive": {
        "label": "Automotive",
        "icon": "🚗",
        "slugs": [
            "car-dealers",
            "bike-dealers",
            "car-repair-shops",
            "bike-repair-shops",
            "car-wash-services",
            "cars-on-rent",
            "auto-parts-stores",
            "second-hand-cars",
            "petrol-pumps",
            "ev-charging-stations",
        ],
    },
    "real_estate": {
        "label": "Real Estate",
        "icon": "🏠",
        "slugs": [
            "real-estate-agents",
            "flats-for-rent",
            "flats-for-sale",
            "office-space-for-rent",
            "paying-guest-accommodation",
            "property-management",
            "boys-hostel-pg",
            "girls-hostel-pg",
            "architects",
            "interior-designers",
        ],
    },
    "entertainment": {
        "label": "Entertainment",
        "icon": "🎬",
        "slugs": [
            "movie-theatres",
            "gaming-zones",
            "bowling-alleys",
            "escape-rooms",
            "stand-up-comedy-shows",
            "bollywood-studios",
            "heritage-walks",
            "slum-tours",
            "photo-studios",
            "photographers",
            "event-photographers",
            "videographers",
        ],
    },
    "wedding_events": {
        "label": "Wedding & Events",
        "icon": "💍",
        "slugs": [
            "wedding-planners",
            "banquet-halls",
            "destination-wedding-planners",
            "anniversary-event-planners",
            "birthday-event-planners",
            "baby-shower-planners",
            "caterers",
            "costumes-on-rent",
        ],
    },
    "professional_services": {
        "label": "Professional Services",
        "icon": "💼",
        "slugs": [
            "lawyers-and-advocates",
            "notary-public",
            "passport-agents",
            "visa-consultants",
            "travel-agents",
            "digital-marketing-agencies",
            "web-designers",
            "security-services",
            "detective-agencies-spy-agents",
            "vastu-consultants",
            "astrologers",
            "relationship-councellor",
            "relationship-counsellor",
            "packers-and-movers",
        ],
    },
    "religion_community": {
        "label": "Religion & Community",
        "icon": "🛕",
        "slugs": [
            "temples",
            "churches",
            "mosques",
            "gurudwaras",
            "ngos",
            "animal-shelters",
            "fishing-community",
        ],
    },
    "sports": {
        "label": "Sports & Recreation",
        "icon": "⚽",
        "slugs": [
            "sports-complex",
            "swimming-classes",
            "dance-classes",
            "yoga-classes",
            "zumba-classes",
        ],
    },
    "courier_delivery": {
        "label": "Courier & Delivery",
        "icon": "📦",
        "slugs": [
            "courier-services",
            "packers-and-movers",
        ],
    },
    "childcare": {
        "label": "Childcare & Daycare",
        "icon": "👶",
        "slugs": [
            "creches-daycare",
            "playschools",
        ],
    },
    "miscellaneous": {
        "label": "Other Services",
        "icon": "📌",
        "slugs": [
            "printing-shops",
            "co-working-spaces",
            "music-classes",
            "dance-classes",
            "drawing-classes",
        ],
    },
}

# ---------------------------------------------------------------------------
# Build a reverse lookup: slug → group_key
# ---------------------------------------------------------------------------

_SLUG_TO_GROUP: dict[str, str] = {}

for group_key, group_data in CATEGORY_GROUPS.items():
    for slug in group_data["slugs"]:
        _SLUG_TO_GROUP[slug] = group_key


def get_group_for_slug(slug: str) -> str | None:
    """Return the group key for a category slug, or None if not mapped."""
    return _SLUG_TO_GROUP.get(slug)


def get_group_label(group_key: str) -> str:
    """Return the human-readable label for a group key."""
    group = CATEGORY_GROUPS.get(group_key)
    return group["label"] if group else group_key


def get_group_icon(group_key: str) -> str:
    """Return the emoji icon for a group key."""
    group = CATEGORY_GROUPS.get(group_key)
    return group["icon"] if group else "📌"


def get_visible_groups():
    """
    Return the ordered list of group keys that should be shown as
    separate sections in the location UI (excludes misc/internal groups).
    """
    # These groups appear as distinct sections on the location page
    return [
        "schools",
        "coaching",
        "hospitals",
        "doctors",
        "fitness",
        "spa_beauty",
        "home_services",
        "electronics_repair",
        "banks_finance",
        "restaurants",
        "shopping",
        "automotive",
        "real_estate",
        "entertainment",
        "wedding_events",
        "professional_services",
        "religion_community",
        "sports",
        "childcare",
        "miscellaneous",
    ]
