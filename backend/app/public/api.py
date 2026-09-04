from datetime import datetime, date
import random
from flask import abort, request, current_app
from sqlalchemy import desc, func, or_, literal

from app.listing.models import (
    Location,
    Category,
    Listing,
    Business,
    BusinessImage,
    SeoAliasSlug,
    LocationCategory,
    Blog,
    LostFoundListing,
    NewsletterSubscriber,
    Review,
    VoiceTopic,
    VoiceComment,
    PollOption,
    ForumQuestion,
    ForumAnswer,
)
from app import db
from app.helper.url import build_public_file_url
from app.admin.utils import get_top_blog
from app.public.category_groups import get_group_for_slug, get_group_label, get_group_icon, get_visible_groups


def get_trending_categories_by_location(location_id, limit=10):

    # ---------- 1️⃣ QUERY BY ACTUAL LISTINGS ----------
    rows = (
        db.session.query(
            Category.id,
            Category.slug,
            Category.name,
            Category.image_path,
            Category.emoji,

            # 👇 actual business activity
            func.count(Listing.id).label("listing_count"),

            Category.trending_score,
            Category.hot_score,
            Category.seo_description,
            LocationCategory.image_path.label("location_image")
        )
        .join(Business, Business.category_id == Category.id)
        .join(Listing, Listing.business_id == Business.id)
        .outerjoin(
            LocationCategory,
            (LocationCategory.category_id == Category.id) &
            (LocationCategory.location_id == location_id)
        )

        .filter(
            Listing.location_id == location_id,
            Listing.is_published.is_(True),
            Business.is_active.is_(True),
            Category.is_active.is_(True)
        )

        .group_by(
            Category.id,
            Category.slug,
            Category.name,
            Category.image_path,
            Category.trending_score,
            Category.hot_score,
            LocationCategory.image_path
        )

        # 🔥 smart ranking
        .order_by(
            (
                func.count(Listing.id) * 2 +   # real demand
                Category.trending_score +     # trending boost
                Category.hot_score           # hot boost
            ).desc()
        )

        .limit(limit)
        .all()
    )

    # ---------- 2️⃣ FALLBACK: no listings yet → show trending categories ----------
    if not rows:
        rows = (
            db.session.query(
                Category.id,
                Category.slug,
                Category.name,
                Category.image_path,
                Category.emoji,
                literal(0).label("listing_count"),
                Category.trending_score,
                Category.hot_score,
                Category.seo_description,
                LocationCategory.image_path.label("location_image")
            )
            .outerjoin(
                LocationCategory,
                (LocationCategory.category_id == Category.id) &
                (LocationCategory.location_id == location_id)
            )
            .filter(Category.is_active.is_(True))
            .order_by(
                (Category.trending_score + Category.hot_score).desc()
            )
            .limit(limit)
            .all()
        )

    return rows


def resolve_location_from_tokens(tokens):
    """
    Resolve location from token list.
    Supports:
    - borivali
    - borivali west -> borivali-west
    - andheri east / west
    """

    tokens_set = set(tokens)

    # ---------- 1️⃣ EXACT SLUG MATCH ----------
    location = Location.query.filter(
        Location.slug.in_(tokens_set),
        Location.is_active.is_(True)
    ).first()

    if location:
        return location

    # ---------- 2️⃣ COMPOUND SLUG MATCH ----------
    joined = "-".join(tokens)
    location = Location.query.filter_by(
        slug=joined,
        is_active=True
    ).first()

    if location:
        return location

    # ---------- 3️⃣ PARENT → CHILD OR PARENT ----------
    parents = Location.query.filter_by(
        parent_id=None,
        is_active=True
    ).all()

    for parent in parents:
        if parent.slug in tokens_set:
            # Prefer child match
            for child in parent.children:
                child_tokens = set(child.slug.split("-"))
                if child_tokens.issubset(tokens_set):
                    return child

            # Parent matched but no child specified
            return parent

    return None


def build_response(canonical, level):
    return {
        "canonical_url": canonical,
        "fallback_level": level,
        "indexable": False
    }


def resolve_seo_slug(slug):
    slug = slug.lower().strip()

    # ---------- 1️⃣ EXACT ALIAS MATCH ----------
    alias = SeoAliasSlug.query.filter_by(
        slug=slug,
        is_active=True
    ).first()

    if alias:
        return build_response(
            canonical=f"/{alias.canonical_location.slug}/{alias.canonical_category.slug}",
            level="exact"
        )

    # ---------- 2️⃣ TOKENIZE ----------
    tokens = slug.replace("-", " ").split()
    STOP_WORDS = {"in", "near", "best", "top", "cheap"}
    tokens = [t for t in tokens if t not in STOP_WORDS]

    # ---------- 3️⃣ CATEGORY ----------
    category = Category.query.filter(
        Category.slug.in_(tokens)
    ).first()

    # ---------- 4️⃣ LOCATION ----------
    location = resolve_location_from_tokens(tokens)

    # ---------- 5️⃣ CONFIDENT MATCH ----------
    if category and location:
        alias = SeoAliasSlug.query.filter_by(
            category_id=category.id,
            location_id=location.id,
            is_active=True
        ).first()

        if alias:
            return build_response(
                canonical=f"/{location.slug}/{category.slug}",
                level="exact"
            )

    # ---------- 6️⃣ PARTIAL FALLBACK ----------
    if category:
        return build_response(
            canonical=f"/mumbai/{category.slug}",
            level="partial"
        )

    # ---------- 7️⃣ GENERIC FALLBACK ----------
    return build_response(
        canonical="/top-listings",
        level="generic"
    )



def get_location_name_variants(name):
    """
    Build address-matching variants for a location name, e.g. for
    "Virar East" -> ["Virar East", "Virar (E)", "Virar(E)", "Virar E", "Virar-East"].
    Handles the common ways scraped addresses abbreviate East/West suffixes.
    Locations without an East/West suffix return just their own name.
    """
    parts = name.rsplit(" ", 1)
    if len(parts) == 2 and parts[1] in ("East", "West"):
        base, direction = parts
        d = direction[0]
        return [
            name,
            f"{base} ({d})",
            f"{base}({d})",
            f"{base} {d}",
            f"{base}-{direction}",
        ]
    return [name]


def get_all_descendant_location_ids(location):
    ids = [location.id]
    for child in location.children:
        ids.extend(get_all_descendant_location_ids(child))
    return ids


def fetch_listings(location_ids, category_id):
    return (
        Listing.query
        .join(Business)
        .filter(
            Listing.location_id.in_(location_ids),
            Listing.is_published.is_(True),
            Business.category_id == category_id,
            Business.is_active.is_(True)
        )
        .all()
    )


def get_listing_by_location_and_category(location_slug, category_slug):

    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))
    search = request.args.get("search", "").strip()
    rating_min = request.args.get("rating_min", type=float)
    tag = request.args.get("tag", "").strip()

    location = Location.query.filter_by(
        slug=location_slug,
        is_active=True
    ).first_or_404()

    category = Category.query.filter_by(
        slug=category_slug,
        is_active=True
    ).first_or_404()

    # ---------- 1️⃣ LOCATION SCOPE ----------
    # Only the requested location and its own descendants belong here.
    # Sibling locations (e.g. Virar East, Nalasopara West when the page is
    # Virar West) must NOT be folded in at this step — that was happening
    # unconditionally before, which meant every "exact match" page was
    # silently mixing in neighbouring suburbs' businesses and presenting them
    # as if they belonged to the requested location. Broadening to nearby
    # locations is already handled properly, as an explicit fallback, in
    # step 3️⃣ below — which only runs when the exact match for THIS location
    # comes back empty.
    location_ids = list(set(get_all_descendant_location_ids(location)))

    # ---------- 2️⃣ BASE QUERY (EXACT) ----------
    fallback_level = "exact"

    base_filters = [
        Listing.location_id.in_(location_ids),
        Listing.is_published.is_(True),
        Business.is_active.is_(True),
        db.or_(*[
            Listing.address.ilike(f"%{v}%")
            for v in get_location_name_variants(location.name)
        ])
    ]

    # Fix - when the user is actively searching, look across every
    # category in this location instead of staying locked to the
    # current category page.
    if not search:
        base_filters.append(Business.category_id == category.id)

    query = Listing.query.join(Business).filter(*base_filters)

    if search:
        query = query.filter(
            or_(
                Business.name.ilike(f"%{search}%"),
                Listing.address.ilike(f"%{search}%")
            )
        )

    # ---------- 3️⃣ FALLBACK: NEARBY LOCATIONS ----------
    # DISABLED — showing another location's businesses on this location's
    # page was misleading (no distinguishing label), so an exact-match
    # miss now returns an honest empty result instead of borrowed data.
    if False and query.count() == 0:
        fallback_level = "nearby_location"

        nearby_ids = []
        if location.parent:
            nearby_ids = [
                c.id for c in location.parent.children
                if c.id != location.id
            ]

        query = (
            Listing.query
            .join(Business)
            .filter(
                Listing.location_id.in_(nearby_ids),
                Listing.is_published.is_(True),
                Business.category_id == category.id,
                Business.is_active.is_(True)
            )
        )

    # ---------- 4️⃣ FALLBACK: SIMILAR CATEGORIES ----------
    # DISABLED — same reason as tier 3.
    if False and query.count() == 0:
        fallback_level = "similar_category"

        base_token = category.slug.split("-")[0]

        similar_categories = (
            Category.query
            .filter(
                Category.id != category.id,
                Category.slug.ilike(f"%{base_token}%"),
                Category.is_active.is_(True)
            )
            .limit(3)
            .all()
        )

        similar_ids = [c.id for c in similar_categories]

        if similar_ids:
            query = (
                Listing.query
                .join(Business)
                .filter(
                    Listing.location_id.in_(location_ids),
                    Business.category_id.in_(similar_ids),
                    Listing.is_published.is_(True),
                    Business.is_active.is_(True)
                )
            )

    # ---------- 5️⃣ FALLBACK: TOP LISTINGS IN THIS CATEGORY (ANY LOCATION) ----------
    # Previously this dropped the category filter too, which meant a page could show
    # completely unrelated businesses (e.g. pest control under "street food") and its
    # listing count would include every published listing on the entire site. This
    # version still relaxes the location, but never shows a business from the wrong
    # category under this page.
    # DISABLED — same reason as tiers 3 and 4: showing unrelated businesses
    # from other locations was misleading. An honest empty result is correct
    # when a location genuinely has no verified data for this category.
    if False and query.count() == 0:
        fallback_level = "trending"

        query = (
            Listing.query
            .join(Business)
            .filter(
                Listing.is_published.is_(True),
                Business.is_active.is_(True),
                Business.category_id == category.id
            )
            .order_by(
                desc(Business.rating),
                desc(Business.review_count)
            )
        )

    # ---------- 6️⃣ FILTERS (rating_min, tag) ----------
    if rating_min:
        query = query.filter(Business.rating >= rating_min)

    if tag:
        from sqlalchemy.dialects.postgresql import JSONB
        from sqlalchemy import cast

        # Support comma-separated tags (AND logic)
        tag_list = [t.strip() for t in tag.split(",") if t.strip()]
        for t in tag_list:
            query = query.filter(
                cast(Listing.services, JSONB).contains([t])
            )

    # ---------- 7️⃣ PAGINATION ----------
    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    listings = pagination.items
    base_url = request.host_url.rstrip("/")
    now = datetime.now()

    month_name = now.strftime("%B")  # Full month name
    year = now.strftime("%Y")

    # ---------- 8️⃣ ENRICHED LISTING DATA ----------
    enriched_listings = []
    for l in listings:
        images = get_business_images(l.business, base_url=base_url)
        enriched_listings.append({
            "business_name": l.business.name,
            "business_slug": l.business.slug,
            "rating": l.business.rating,
            "review_count": l.business.review_count,
            "address": l.address,
            "phone": l.phone,
            "description": l.business.description,
            "tags": l.services if l.services else [],
            "open_now": None,
            "distance": None,
            "featured": False,
            "verified": False,
            "experience": None,
            "google_map_url": l.google_map_url,
            "images": images,
        })

    # ---------- 9️⃣ FILTERS FROM ACTUAL DATA ----------
    filters = generate_listing_filters(enriched_listings)

    # ---------- 🔟 NEARBY / OTHER CATEGORIES ----------
    nearby_locations = get_nearby_locations_for_category(location.id, category.id)
    other_categories = get_other_categories(location.id, category.id)

    # ---------- 1️⃣1️⃣ RESPONSE ----------
    return {
        "fallback_level": fallback_level,
        "seo": {
            "title": f"{category.name} in {location.name} | Mumbai96",
            "description": (
                category.seo_description
                or f"Find best {category.name.lower()} in {location.name}"
            )
        },
        "location": {
            "name": location.name,
            "slug": location.slug
        },
        "category": {
            "name": category.name,
            "slug": category.slug,
            "emoji": category.emoji
        },
        "listings": enriched_listings,
        "filters": filters,
        "nearby_locations": nearby_locations,
        "other_categories": other_categories,
        "promoted_listings": [],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages
        },
        "lastUpdated": "{} {}".format(month_name, year)
    }


def get_business_images(business, base_url, gallery_limit=5):
    primary = None
    gallery = []

    for img in business.images:
        url = f"{base_url}/static/uploads/{img.image_path}"

        if img.is_primary and not primary:
            primary = url
        else:
            gallery.append(url)

    return {
        "primary": primary,
        "gallery": gallery[:gallery_limit]
    }


def get_top_listings():
    limit = 10

    listings = (
        Listing.query
        .join(Business)
        .join(Location)
        .join(Category)
        .filter(
            Listing.is_published.is_(True),
            Business.is_active.is_(True)
        )
        .order_by(
            desc(Business.rating),
            desc(Business.review_count)
        )
        .limit(limit)
        .all()
    )

    base_url = request.host_url.rstrip("/")

    return {
        "seo": {
            "title": "Top Businesses in Mumbai | Mumbai96",
            "description": "Explore top-rated businesses across Mumbai"
        },
        "canonical_url": "/top-listings",
        "indexable": False,
        "listings": [
            {
                "business": {
                    "name": l.business.name,
                    "slug": l.business.slug,
                    "rating": l.business.rating,
                    "review_count": l.business.review_count,
                    "description": l.business.description,
                    "phone": l.phone,
                    "opening_hours": l.opening_hours,
                    "images": get_business_images(
                        l.business,
                        base_url=base_url
                    ),
                    "banner_image": l.banner_image
                },
                "category": {
                    "name": l.business.category.name,
                    "slug": l.business.category.slug,
                    "emoji": l.business.category.emoji,
                    "image": (
                        f"{base_url}/static/uploads/{l.business.category.image_path}"
                        if l.business.category.image_path
                        else None
                    )
                },
                "location": {
                    "name": l.location.name,
                    "slug": l.location.slug,
                }
            }
            for l in listings
        ]
    }


def get_business_detail(location_slug, category_slug, business_slug):
    """
    Business entity page with fallback-safe resolution.
    """

    # ---------- 1️⃣ LOCATION ----------
    location = Location.query.filter_by(
        slug=location_slug,
        is_active=True
    ).first_or_404()

    # ---------- 2️⃣ BUSINESS (GLOBAL LOOKUP) ----------
    business = Business.query.filter_by(
        slug=business_slug,
        is_active=True
    ).first_or_404()

    # ---------- 3️⃣ CATEGORY (OPTIONAL / SEO) ----------
    category = Category.query.filter_by(
        slug=category_slug,
        is_active=True
    ).first()

    # ---------- 4️⃣ LOCATION SCOPE (SAME AS LISTING PAGE) ----------
    location_ids = get_all_descendant_location_ids(location)

    if location.parent:
        siblings = Location.query.filter_by(
            parent_id=location.parent_id,
            is_active=True
        ).all()
        location_ids.extend([s.id for s in siblings])

    location_ids = list(set(location_ids))

    # ---------- 5️⃣ LISTING (FALLBACK SAFE) ----------
    listing = (
        Listing.query
        .filter(
            Listing.business_id == business.id,
            Listing.is_published.is_(True)
        )
        .first()
    )

    if not listing:
        abort(404)

    actual_location = listing.location
    actual_category = business.category
    base_url = request.host_url.rstrip("/")

    # ---------- 6️⃣ REVIEWS (approved, entity match) ----------
    review_rows = (
        Review.query
        .filter(
            Review.is_approved.is_(True),
            Review.is_active.is_(True),
            Review.entity.ilike(business.name)
        )
        .order_by(Review.created_at.desc())
        .limit(5)
        .all()
    )

    reviews = []
    for r in review_rows:
        reviews.append({
            "name": r.reviewer_name,
            "rating": r.rating,
            "comment": r.review,
            "title": r.title,
            "date": (
                r.created_at.isoformat()
                if r.created_at else None
            ),
            "area": r.area,
        })

    # ---------- 7️⃣ SIMILAR (same category, same location scope) ----------
    # Fix #9 — "Similar in <location>" must only ever show businesses
    # from that exact same location, not the whole zone. This previously
    # used location_ids (which includes zone-wide siblings), pulling in
    # unrelated, far-away areas.
    similar_rows = (
        Listing.query
        .join(Business)
        .filter(
            Listing.location_id == listing.location_id,
            Listing.is_published.is_(True),
            Business.category_id == business.category_id,
            Business.id != business.id,
            Business.is_active.is_(True)
        )
        .order_by(
            desc(Business.rating),
            desc(Business.review_count)
        )
        .limit(4)
        .all()
    )

    similar = [
        {
            "name": l.business.name,
            "slug": l.business.slug,
            "rating": l.business.rating,
            "review_count": l.business.review_count,
            "category_name": actual_category.name,
            "category_slug": actual_category.slug,
            "location_name": l.location.name,
            "location_slug": l.location.slug,
        }
        for l in similar_rows
    ]

    # ---------- 8️⃣ RESPONSE ----------
    return {
        "seo": {
            "title": (
                f"{business.name} {actual_location.name} | "
                f"{actual_category.name} in {actual_location.name} | Mumbai96"
            ),
            "description": (
                business.description
                or f"{business.name} in {actual_location.name} offering "
                   f"{actual_category.name.lower()} services."
            ),
            "canonical": (
                f"/{actual_location.slug}/"
                f"{actual_category.slug}/"
                f"{business.slug}"
            ),
            "indexable": True
        },
        "business": {
            "id": business.id,
            "name": business.name,
            "slug": business.slug,
            "description": business.description,
            "website": business.website,
            "rating": business.rating,
            "review_count": business.review_count,
            "logo": build_public_file_url(business.logo),
            "gallery": get_business_images(business, base_url=base_url, gallery_limit=10),
            "social_links": business.social_links or []
        },
        "category": {
            "name": actual_category.name,
            "slug": actual_category.slug,
            "emoji": actual_category.emoji
        },
        "location": {
            "name": actual_location.name,
            "slug": actual_location.slug
        },
        "listing": {
            "address": listing.address,
            "phone": listing.phone,
            "email": listing.email,
            "gallery": listing.gallery,
            "opening_hours": listing.opening_hours,
            "services": listing.services if listing.services else [],
            "features": listing.features if listing.features else [],
            "about": listing.about if listing.about else [],
            "banner_image": build_public_file_url(listing.banner_image),
            "google_map_url": listing.google_map_url
        },
        "reviews": reviews,
        "similar": similar,
    }


def get_nearby_businesses(location_slug, category_slug, business_slug, limit=6):
    """
    Nearby businesses in same category & nearby locations.
    """

    # ---------- 1️⃣ LOCATION ----------
    location = Location.query.filter_by(
        slug=location_slug,
        is_active=True
    ).first_or_404()

    # ---------- 2️⃣ CATEGORY ----------
    category = Category.query.filter_by(
        slug=category_slug,
        is_active=True
    ).first_or_404()

    # ---------- 3️⃣ BUSINESS ----------
    business = Business.query.filter_by(
        slug=business_slug,
        category_id=category.id,
        is_active=True
    ).first_or_404()

    # ---------- 4️⃣ LOCATION SCOPE ----------
    location_ids = get_all_descendant_location_ids(location)

    if location.parent:
        siblings = Location.query.filter_by(
            parent_id=location.parent_id,
            is_active=True
        ).all()
        location_ids.extend([s.id for s in siblings])

    location_ids = list(set(location_ids))

    # ---------- 5️⃣ QUERY ----------
    listings = (
        Listing.query
        .join(Business)
        .filter(
            Listing.location_id.in_(location_ids),
            Listing.is_published.is_(True),
            Business.category_id == category.id,
            Business.id != business.id,
            Business.is_active.is_(True)
        )
        .order_by(
            desc(Business.rating),
            desc(Business.review_count)
        )
        .limit(limit)
        .all()
    )

    # ---------- 6️⃣ RESPONSE ----------
    return {
        "nearby_businesses": [
            {
                "name": l.business.name,
                "slug": l.business.slug,
                "location": l.location.name,
                "location_slug": l.location.slug,
                "rating": l.business.rating,
                "review_count": l.business.review_count
            }
            for l in listings
        ]
    }


def get_trending_categories():
    limit = int(request.args.get("limit", 10))
    type_ = request.args.get("type", "all")

    query = db.session.query(
        Category.id,
        Category.slug,
        Category.name,
        Category.trending_score,
        Category.hot_score
    ).filter(Category.is_active == True)

    if type_ == "hot":
        query = query.order_by(Category.hot_score.desc())
    elif type_ == "trending":
        query = query.order_by(Category.trending_score.desc())
    else:
        query = query.order_by(
            (Category.trending_score + Category.hot_score).desc()
        )

    categories = query.limit(limit).all()

    result = []

    for idx, c in enumerate(categories):
        # 🔥 Get random LocationCategory image
        random_image = (
            db.session.query(LocationCategory.image_path)
            .filter(
                LocationCategory.category_id == c.id,
                LocationCategory.image_path.isnot(None)
            )
            .order_by(func.random())
            .first()
        )

        # Fallback to category image if no location image
        icon_path = None
        if random_image and random_image[0]:
            icon_path = random_image[0]
        else:
            icon_path = Category.query.get(c.id).image_path

        result.append({
            "id": c.id,
            "slug": c.slug,
            "name": c.name,
            "icon": build_public_file_url(icon_path),
            "score": round(
                (c.trending_score or 0)
                if type_ == "trending"
                else (c.hot_score or 0)
                if type_ == "hot"
                else ((c.trending_score or 0) + (c.hot_score or 0)),
                2
            ),
            "rank": idx + 1
        })

    return {
        "success": True,
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "categories": result
    }


STOP_WORDS = {"in", "near", "best", "top", "cheap", "classes", "class"}


def extract_category_from_keyword(keyword):
    """
    event-organisers-in-mumbai -> event-organisers
    gym-in-borivali-west -> gym
    zumba-classes-in-mumbai -> zumba-classes
    """
    if "-in-" in keyword:
        return keyword.split("-in-")[0]
    return keyword


def resolve_category_from_keyword(keyword):
    """
    Try to resolve category from keyword.
    Falls back to similar categories.
    """

    raw_slug = extract_category_from_keyword(keyword)

    # ---------- 1️⃣ EXACT MATCH ----------
    category = Category.query.filter_by(
        slug=raw_slug,
        is_active=True
    ).first()

    if category:
        return category

    # ---------- 2️⃣ PARTIAL MATCH (LIKE) ----------
    parts = raw_slug.split("-")

    query = Category.query.filter(Category.is_active == True)

    for part in parts:
        if len(part) >= 3:
            query = query.filter(Category.slug.ilike(f"%{part}%"))

    candidates = query.all()

    if candidates:
        # pick best candidate (longest slug match)
        candidates.sort(
            key=lambda c: len(set(c.slug.split("-")) & set(parts)),
            reverse=True
        )
        return candidates[0]

    # ---------- 3️⃣ TRENDING FALLBACK ----------
    trending = (
        Category.query
        .filter(Category.is_active == True)
        .order_by(
            (Category.trending_score + Category.hot_score).desc()
        )
        .first()
    )

    return trending


def get_locations_for_keyword(keyword):
    """
    event-organisers-in-mumbai
    zumba-classes-in-mumbai
    gym-in-mumbai
    """

    # ---------- 1️⃣ CATEGORY ----------
    category = resolve_category_from_keyword(keyword)
    if not category:
        abort(404, "Category not found")

    # ---------- 2️⃣ BASE LOCATION ----------
    base_location = Location.query.filter_by(
        slug="mumbai",
        is_active=True
    ).first_or_404()

    # ---------- 3️⃣ CATEGORY-SPECIFIC LOCATIONS ----------
    rows = (
        db.session.query(
            Location.id,
            Location.name,
            Location.slug,
            LocationCategory.image_path.label("location_image"),

            # Count only listings of this category
            db.func.count(
                db.case(
                    (
                        (Business.category_id == category.id) &
                        (Business.is_active == True) &
                        (Listing.is_published == True),
                        Listing.id
                    )
                )
            ).label("count")
        )

        # OUTER JOIN listing
        .outerjoin(Listing, Listing.location_id == Location.id)

        # OUTER JOIN business
        .outerjoin(Business, Business.id == Listing.business_id)

        # OUTER JOIN location-category image
        .outerjoin(
            LocationCategory,
            (LocationCategory.location_id == Location.id) &
            (LocationCategory.category_id == category.id)
        )

        .filter(Location.is_active == True)

        .group_by(
            Location.id,
            Location.name,
            Location.slug,
            LocationCategory.image_path
        )

        .order_by(
            db.func.count(
                db.case(
                    (
                        (Business.category_id == category.id) &
                        (Business.is_active == True) &
                        (Listing.is_published == True),
                        Listing.id
                    )
                )
            ).desc()
        )

        .all()
    )

    # ---------- 4️⃣ FALLBACK (still category aware) ----------
    if not rows:
        rows = (
            db.session.query(
                Location.id,
                Location.name,
                Location.slug,
                LocationCategory.image_path.label("location_image"),
                db.func.count(Listing.id).label("count")
            )
            .join(Listing, Listing.location_id == Location.id)
            .join(Business, Business.id == Listing.business_id)

            .outerjoin(
                LocationCategory,
                (LocationCategory.location_id == Location.id) &
                (LocationCategory.category_id == category.id)
            )

            .filter(
                Business.category_id == category.id,   # 🔥 keep category filter
                Business.is_active.is_(True),
                Listing.is_published.is_(True),
                Location.is_active.is_(True)
            )

            .group_by(
                Location.id,
                Location.name,
                Location.slug,
                LocationCategory.image_path
            )

            .order_by(db.func.count(Listing.id).desc())
            .limit(12)
            .all()
        )

    # ---------- 5️⃣ RESPONSE ----------
    return {
        "category": {
            "name": category.name,
            "slug": category.slug,
            "emoji": category.emoji,
            "image": build_public_file_url(category.image_path)
        },
        "base_location": {
            "name": base_location.name,
            "slug": base_location.slug
        },
        "locations": [
            {
                "name": r.name,
                "slug": r.slug,
                "count": int(r.count or 0),
                "image": build_public_file_url(
                    r.location_image or category.image_path
                )
            }
            for r in rows
        ]
    }


def get_categories_by_location(location_slug):
    """
    Returns all categories available in a location
    Prefers LocationCategory image over Category image
    """

    # ---------- 1️⃣ LOCATION ----------
    location = Location.query.filter_by(
        slug=location_slug,
        is_active=True
    ).first_or_404()

    # ---------- 2️⃣ CATEGORY AGGREGATION ----------
    rows = (
        db.session.query(
            Category.id,
            Category.name,
            Category.slug,
            Category.emoji,
            Category.image_path.label("category_image"),
            LocationCategory.image_path.label("location_image"),
            func.count(Listing.id).label("count")
        )
        .join(Business, Business.category_id == Category.id)
        .join(Listing, Listing.business_id == Business.id)
        .outerjoin(
            LocationCategory,
            (LocationCategory.category_id == Category.id) &
            (LocationCategory.location_id == location.id)
        )
        .filter(
            Listing.location_id == location.id,
            Listing.is_published.is_(True),
            Business.is_active.is_(True),
            Category.is_active.is_(True)
        )
        .group_by(
            Category.id,
            Category.name,
            Category.slug,
            Category.image_path,
            LocationCategory.image_path
        )
        .order_by(func.count(Listing.id).desc())
        .all()
    )

    # ---------- 3️⃣ FALLBACK ----------
    if not rows:
        rows = (
            db.session.query(
                Category.id,
                Category.name,
                Category.slug,
                Category.emoji,
                Category.image_path.label("category_image"),
                LocationCategory.image_path.label("location_image"),
                Category.trending_score.label("count")
            )
            .outerjoin(
                LocationCategory,
                (LocationCategory.category_id == Category.id) &
                (LocationCategory.location_id == location.id)
            )
            .filter(Category.is_active == True)
            .order_by(
                (Category.trending_score + Category.hot_score).desc()
            )
            .limit(50)
            .all()
        )

    # ---------- 4️⃣ RESPONSE ----------
    return {
        "location": {
            "name": location.name,
            "slug": location.slug
        },
        "categories": [
            {
                "name": c.name,
                "slug": c.slug,
                "emoji": c.emoji,
                "image": build_public_file_url(
                    c.location_image or c.category_image
                ),
                "count": int(c.count or 0)
            }
            for c in rows
        ]
    }


def public_search():
    """
    Resolves user search intent:
    - business
    - category + location
    - category only
    - similar category
    - trending fallback
    """

    q = request.args.get("q", "").strip().lower()
    if not q:
        abort(400, "Search query is required")

    base_url = request.host_url.rstrip("/")

    # -----------------------------------------------------
    # 1️⃣ EXACT BUSINESS MATCH (HIGHEST INTENT)
    # -----------------------------------------------------
    business = (
        Business.query
        .filter(
            Business.is_active.is_(True),
            or_(
                Business.slug == q.replace(" ", "-"),
                Business.name.ilike(f"%{q}%")
            )
        )
        .first()
    )

    if business:
        listing = (
            Listing.query
            .filter(
                Listing.business_id == business.id,
                Listing.is_published.is_(True)
            )
            .first()
        )

        if listing:
            return {
                "type": "business",
                "redirect": (
                    f"/{listing.location.slug}/"
                    f"{business.category.slug}/"
                ),
                "fallback_level": "exact",
                "seo": {
                    "title": f"{business.name} | Mumbai96",
                    "description": business.description
                }
            }

    # -----------------------------------------------------
    # 2️⃣ CATEGORY + LOCATION MATCH
    # -----------------------------------------------------
    tokens = q.replace("-", " ").split()
    STOP_WORDS = {"in", "near", "best", "top", "cheap"}
    tokens = [t for t in tokens if t not in STOP_WORDS]

    # category
    category = (
        Category.query
        .filter(Category.slug.in_(tokens), Category.is_active.is_(True))
        .first()
    )

    # location
    location = resolve_location_from_tokens(tokens)

    if category and location:
        return {
            "type": "listing",
            "redirect": f"/{location.slug}/{category.slug}",
            "fallback_level": "exact",
            "seo": {
                "title": f"{category.name} in {location.name} | Mumbai96",
                "description": (
                    category.seo_description
                    or f"Find best {category.name.lower()} in {location.name}"
                )
            }
        }

    # -----------------------------------------------------
    # 3️⃣ CATEGORY ONLY → MUMBAI
    # -----------------------------------------------------
    if category:
        return {
            "type": "listing",
            "redirect": f"/mumbai/{category.slug}",
            "fallback_level": "partial",
            "seo": {
                "title": f"{category.name} in Mumbai | Mumbai96",
                "description": (
                    category.seo_description
                    or f"Find best {category.name.lower()} in Mumbai"
                )
            }
        }

    # -----------------------------------------------------
    # 4️⃣ SIMILAR CATEGORY FALLBACK
    # -----------------------------------------------------
    raw_slug = q.replace(" ", "-")
    parts = raw_slug.split("-")

    similar_categories = (
        Category.query
        .filter(Category.is_active.is_(True))
        .all()
    )

    if similar_categories:
        similar_categories.sort(
            key=lambda c: len(set(c.slug.split("-")) & set(parts)),
            reverse=True
        )

        best = similar_categories[0]

        return {
            "type": "listing",
            "redirect": f"/mumbai/{best.slug}",
            "fallback_level": "similar_category",
            "seo": {
                "title": f"{best.name} in Mumbai | Mumbai96",
                "description": (
                    best.seo_description
                    or f"Explore top {best.name.lower()} services in Mumbai"
                )
            }
        }

    # -----------------------------------------------------
    # 5️⃣ TRENDING FALLBACK (LAST RESORT)
    # -----------------------------------------------------
    return {
        "type": "listing",
        "redirect": "/top-listings",
        "fallback_level": "trending",
        "seo": {
            "title": "Top Businesses in Mumbai | Mumbai96",
            "description": "Explore top-rated businesses across Mumbai"
        }
    }


def get_grouped_listings_by_location(location_id):
    """
    Return listings for a location grouped by category group.

    Returns a dict like:
    {
        "schools": {
            "label": "Schools & Education",
            "icon": "🏫",
            "listings": [ {business info}, ... ]
        },
        ...
    }
    Only groups with at least one listing are included.
    """
    # Load listings with business + category, then load images separately
    listings = (
        Listing.query
        .options(
            db.joinedload(Listing.business).joinedload(Business.category),
        )
        .filter(
            Listing.location_id == location_id,
            Listing.is_published.is_(True),
        )
        .all()
    )

    # Filter to active businesses
    active_listings = [l for l in listings if l.business and l.business.is_active]

    # Load images for all active businesses in one query
    if active_listings:
        business_ids = [l.business_id for l in active_listings]
        images = (
            BusinessImage.query
            .filter(
                BusinessImage.business_id.in_(business_ids),
            )
            .order_by(BusinessImage.business_id, BusinessImage.is_primary.desc(), BusinessImage.sort_order)
            .all()
        )
        # Group images by business_id
        image_map: dict[int, list[BusinessImage]] = {}
        for img in images:
            image_map.setdefault(img.business_id, []).append(img)
        for listing in active_listings:
            listing._preloaded_images = image_map.get(listing.business_id, [])
    else:
        for listing in active_listings:
            listing._preloaded_images = []

    listings = active_listings

    grouped: dict[str, dict] = {}
    for listing in listings:
        business = listing.business
        cat_slug = business.category.slug if business.category else None
        if not cat_slug:
            continue

        group_key = get_group_for_slug(cat_slug)
        if not group_key:
            continue

        if group_key not in grouped:
            grouped[group_key] = {
                "label": get_group_label(group_key),
                "icon": get_group_icon(group_key),
                "listings": [],
            }

        primary_image = None
        # Use preloaded images attached during query
        preloaded = getattr(listing, "_preloaded_images", [])
        if preloaded:
            primary_image = build_public_file_url(preloaded[0].image_path)

        grouped[group_key]["listings"].append({
            "id": business.id,
            "name": business.name,
            "slug": business.slug,
            "description": business.description,
            "rating": business.rating,
            "review_count": business.review_count,
            "address": listing.address,
            "phone": listing.phone,
            "image": primary_image,
            "website": business.website,
        })

    # Show 5 listings per group, randomly picked from the top 10.
    # Seeded by date so the selection changes daily but stays
    # consistent within a single day.
    TOP_N = 10
    SHOW_N = 5
    today_seed = date.today().isoformat()
    for gk in grouped:
        pool = grouped[gk]["listings"]
        # Sort by rating desc, then review_count desc
        pool.sort(
            key=lambda l: (l["rating"], l["review_count"] or 0),
            reverse=True,
        )
        # Take top N, then pick SHOW_N randomly with a daily seed
        candidates = pool[:TOP_N]
        if len(candidates) > SHOW_N:
            rng = random.Random(today_seed + gk)
            grouped[gk]["listings"] = rng.sample(candidates, SHOW_N)
        else:
            grouped[gk]["listings"] = candidates

    # Sort groups in the order defined by get_visible_groups()
    ordered = {}
    for gk in get_visible_groups():
        if gk in grouped:
            ordered[gk] = grouped[gk]

    return ordered


def get_location_detail(location_slug):
    """
    Returns full location detail by slug
    """

    # ---------- 1️⃣ FETCH LOCATION ----------
    location = Location.query.filter_by(
        slug=location_slug,
        is_active=True
    ).first()

    if not location:
        abort(404, "Location not found")

    nearby = []
    if location.nearby_locations:
        nearby_locations = Location.query.filter(
            Location.id.in_(location.nearby_locations),
            Location.is_active.is_(True)
        ).all()

        nearby = [
            {
                "name": loc.name,
                "slug": loc.slug
            }
            for loc in nearby_locations
        ]

    categories = get_trending_categories_by_location(location_id=location.id, limit=200)

    # ---------- 2️⃣ GROUPED LISTINGS ----------
    grouped_listings = get_grouped_listings_by_location(location.id)

    # ---------- 3️⃣ CATEGORY GROUPS ----------
    # Query ALL active categories (not filtered by location) so that
    # every category group appears on every location page.
    # Outerjoin with LocationCategory so location_image is available
    all_categories = (
        db.session.query(
            Category.id,
            Category.slug,
            Category.name,
            Category.image_path,
            Category.emoji,
            Category.trending_score,
            Category.seo_description,
            LocationCategory.image_path.label("location_image")
        )
        .outerjoin(
            LocationCategory,
            (LocationCategory.category_id == Category.id) &
            (LocationCategory.location_id == location.id)
        )
        .filter(Category.is_active.is_(True))
        .order_by(Category.trending_score.desc())
        .all()
    )

    category_groups_dict = {}
    for cat in all_categories:
        group_key = get_group_for_slug(cat.slug)
        if group_key:
            if group_key not in category_groups_dict:
                category_groups_dict[group_key] = {
                    "key": group_key,
                    "label": get_group_label(group_key),
                    "icon": get_group_icon(group_key),
                    "categories": []
                }
            category_groups_dict[group_key]["categories"].append({
                "slug": cat.slug,
                "name": cat.name,
                "emoji": cat.emoji,
                "image": build_public_file_url(
                    cat.location_image or cat.image_path
                ),
                "listing_count": 0,
                "description": cat.seo_description
            })

    # Sort groups in visible order
    ordered_category_groups = []
    for gk in get_visible_groups():
        if gk in category_groups_dict:
            ordered_category_groups.append(category_groups_dict[gk])

    # ---------- 4️⃣ BUILD RESPONSE ----------
    return {
        "name": location.name,
        "slug": location.slug,
        "about": location.about,
        "population": location.population,
        "municipal_body": location.municipal_body,
        "image": build_public_file_url(location.location_image),
        "location_icon": build_public_file_url(location.location_icon),
        "travelling_connectivity": location.travelling_connectivity or [],
        "living_style": location.living_style or [],
        "nearby_locations": nearby,
        "best_services": location.best_services or [],
        "food": location.food or [],
        "places_to_visit": location.places_to_visit or [],
        "night_life": location.night_life or [],
        "categories": [
            {
                "id": c.id,
                "slug": c.slug,
                "name": c.name,
                "emoji": c.emoji,
                "image": build_public_file_url(
                    c.location_image or c.image_path
                ),
                "listing_count": int(c.listing_count or 0),
                "description": c.seo_description
            }
            for c in categories
        ],
        # ---- CATEGORY GROUPS (themed sections) ----
        "category_groups": ordered_category_groups,
        # ---- NEW GUIDE FIELDS ----
        "seo_keywords": location.seo_keywords,
        "character_vibe": location.character_vibe,
        "resident_profile": location.resident_profile,
        "sub_areas": location.sub_areas or [],
        "property_prices": location.property_prices or [],
        "schools": location.schools or [],
        "hospitals": location.hospitals or [],
        "major_employers": location.major_employers or [],
        "food_tags": location.food_tags,
        "local_events": location.local_events or [],
        "upcoming_projects": location.upcoming_projects or [],
        "residential_societies": location.residential_societies or [],
        "faq": location.faq or [],
        "civic_data": location.civic_data,
        "area_report_card": location.area_report_card,
        # ---- GROUPED LISTINGS (from DB) ----
        "grouped_listings": grouped_listings,
    }


def get_blogs():

    # ---------- 1️⃣ PAGINATION ----------
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))

    # ---------- 2️⃣ BASE QUERY ----------
    query = Blog.query.filter_by(
        is_published=True
    ).order_by(Blog.created_at.desc())

    # ---------- 3️⃣ PAGINATION ----------
    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    blogs = pagination.items
    top_blog = get_top_blog()

    # ---------- 4️⃣ RESPONSE ----------
    return {
        "top_blog": {
            "title": top_blog.title,
            "slug": top_blog.slug,
            "excerpt": top_blog.excerpt,
            "image": build_public_file_url(top_blog.featured_image),
            "reading_time": top_blog.reading_time,
            "total_views": top_blog.total_views,
            "created_at": top_blog.created_at.strftime("%d %b %Y")
        } if top_blog else None,
        "blogs": [
            {
                "title": b.title,
                "slug": b.slug,
                "excerpt": b.excerpt,
                "image": build_public_file_url(b.featured_image),

                "reading_time": b.reading_time,
                "total_views": b.total_views,

                "created_at": b.created_at.strftime("%d %b %Y"),

                "author": {
                    "name": b.author_name,
                    "tagline": b.author_tagline
                },

                "hashtags": b.hashtags or []
            }
            for b in blogs
        ],

        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev
        }
    }


def get_blog_detail(slug):

    blog = Blog.query.filter_by(
        slug=slug,
        is_published=True
    ).first()

    if not blog:
        abort(404, "Blog not found")

    # ---------- VIEWS ----------
    blog.total_views = (blog.total_views or 0) + 1
    db.session.commit()

    # 🔥 Use hashtags for similarity (BEST fallback)
    all_blogs = (
        Blog.query
        .filter(
            Blog.id != blog.id,
            Blog.is_published.is_(True)
        )
        .order_by(desc(Blog.created_at))
        .limit(20)  # fetch more to filter
        .all()
    )

    def has_common_tags(b1, b2):
        if not b1 or not b2:
            return False
        return bool(set(b1) & set(b2))

    related_blogs = [b for b in all_blogs if has_common_tags(blog.hashtags, b.hashtags)][:4]

    # ---------- RESPONSE ----------
    return {
        "title": blog.title,
        "slug": blog.slug,
        "content": blog.content,
        "excerpt": blog.excerpt,

        "image": build_public_file_url(blog.featured_image),

        "reading_time": blog.reading_time,
        "total_views": blog.total_views,
        "created_at": blog.created_at.strftime("%d %B %Y"),

        "hashtags": blog.hashtags or [],
        "toc": blog.toc or [],

        "author": {
            "name": blog.author_name,
            "bio": blog.author_bio,
            "tagline": blog.author_tagline,
            "image": build_public_file_url(blog.author_image)
        },

        "seo": {
            "title": blog.seo_title or blog.title,
            "description": blog.seo_description or blog.excerpt
        },
        "related_blogs": [
            {
                "title": b.title,
                "slug": b.slug,
                "image": build_public_file_url(b.featured_image),
                "created_at": b.created_at.strftime("%d %b %Y"),
                "reading_time": b.reading_time
            }
            for b in related_blogs
        ]
    }


def get_lost_found_listings():
    """
    GET /api/public/lost-found
    Query params: type, area, category, page, per_page
    """
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 20))
    type_filter = request.args.get("type", "").strip().lower()
    area_filter = request.args.get("area", "").strip()
    cat_filter = request.args.get("category", "").strip()

    query = LostFoundListing.query.filter(LostFoundListing.is_active.is_(True))

    if type_filter in ("lost", "found"):
        query = query.filter(LostFoundListing.type == type_filter)
    if area_filter:
        query = query.filter(LostFoundListing.area.ilike(f"%{area_filter}%"))
    if cat_filter:
        query = query.filter(LostFoundListing.category.ilike(f"%{cat_filter}%"))

    query = query.order_by(LostFoundListing.created_at.desc())

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "success": True,
        "listings": [l.to_dict(include_contact=False) for l in pagination.items],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
        },
    }


def create_lost_found_listing():
    """
    POST /api/public/lost-found
    Body: { type, item_name, category, area, date_lost_found, description,
            reporter_name, contact_info, handover, handover_location }
    """
    data = request.get_json()
    if not data:
        return {"error": "Request body is required"}, 400

    errors = {}
    item_type = (data.get("type") or "").strip().lower()
    item_name = (data.get("item_name") or "").strip()
    category = (data.get("category") or "").strip()
    area = (data.get("area") or "").strip()
    reporter_name = (data.get("reporter_name") or "").strip()
    contact_info = (data.get("contact_info") or "").strip()

    if item_type not in ("lost", "found"):
        errors["type"] = "Type must be 'lost' or 'found'"
    if not item_name:
        errors["item_name"] = "Item name is required"
    if not category:
        errors["category"] = "Category is required"
    if not area:
        errors["area"] = "Area is required"
    if not reporter_name:
        errors["reporter_name"] = "Your name is required"
    if not contact_info:
        errors["contact_info"] = "Contact info is required"

    if errors:
        return {"error": "Validation failed", "fields": errors}, 400

    date_str = (data.get("date_lost_found") or "").strip()
    parsed_date = None
    if date_str:
        try:
            parsed_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            pass

    handover = (data.get("handover") or "").strip().lower() or None
    handover_location = (data.get("handover_location") or "").strip() or None

    if item_type == "found" and handover and handover not in ("self", "police", "security"):
        handover = "self"

    listing = LostFoundListing(
        type=item_type,
        item_name=item_name,
        category=category,
        area=area,
        date_lost_found=parsed_date,
        description=(data.get("description") or "").strip() or None,
        reporter_name=reporter_name,
        contact_info=contact_info,
        handover=handover,
        handover_location=handover_location,
    )

    db.session.add(listing)
    db.session.commit()

    return {
        "success": True,
        "listing": listing.to_dict(include_contact=True),
    }, 201


# ===================================================================
# REVIEWS (public API)
# ===================================================================

def get_reviews():
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 20))
    category = request.args.get("category", "").strip()
    area = request.args.get("area", "").strip()
    rating = request.args.get("rating", "").strip()
    sort = request.args.get("sort", "newest").strip()
    search = request.args.get("q", "").strip()

    query = Review.query.filter(Review.is_approved.is_(True), Review.is_active.is_(True))

    if category:
        query = query.filter(Review.category == category)
    if area:
        query = query.filter(Review.area.ilike(f"%{area}%"))
    if rating:
        try:
            query = query.filter(Review.rating == int(rating))
        except ValueError:
            pass
    if search:
        query = query.filter(
            db.or_(
                Review.entity.ilike(f"%{search}%"),
                Review.review.ilike(f"%{search}%"),
                Review.title.ilike(f"%{search}%"),
                Review.area.ilike(f"%{search}%"),
            )
        )

    if sort == "newest":
        query = query.order_by(Review.created_at.desc())
    elif sort == "oldest":
        query = query.order_by(Review.created_at.asc())
    elif sort == "helpful":
        query = query.order_by(Review.helpful_count.desc(), Review.created_at.desc())
    elif sort == "highest":
        query = query.order_by(Review.rating.desc(), Review.created_at.desc())
    elif sort == "lowest":
        query = query.order_by(Review.rating.asc(), Review.created_at.desc())
    else:
        query = query.order_by(Review.created_at.desc())

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "success": True,
        "reviews": [r.to_dict() for r in pagination.items],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
        },
        "stats": {
            "total": Review.query.filter(Review.is_approved.is_(True), Review.is_active.is_(True)).count(),
            "avg_rating": db.session.query(db.func.avg(Review.rating)).filter(
                Review.is_approved.is_(True), Review.is_active.is_(True)
            ).scalar() or 0,
        },
    }


def create_review():
    data = request.get_json()
    if not data:
        return {"error": "Request body is required"}, 400

    errors = {}
    entity = (data.get("entity") or "").strip()
    category = (data.get("category") or "").strip()
    area = (data.get("area") or "").strip()
    rating = data.get("rating")
    title = (data.get("title") or "").strip()
    review = (data.get("review") or "").strip()
    reviewer_name = (data.get("reviewer_name") or "").strip()
    amount = (data.get("amount") or "").strip()

    if not entity:
        errors["entity"] = "Entity name is required"
    if not category:
        errors["category"] = "Category is required"
    if not area:
        errors["area"] = "Area is required"
    if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
        errors["rating"] = "Rating must be 1-5"
    if not title:
        errors["title"] = "Title is required"
    if not review or len(review) < 50:
        errors["review"] = "Review must be at least 50 characters"
    if not reviewer_name:
        errors["reviewer_name"] = "Reviewer name is required"

    if errors:
        return {"error": "Validation failed", "fields": errors}, 400

    rv = Review(
        entity=entity,
        category=category,
        area=area,
        rating=int(rating),
        title=title,
        review=review,
        reviewer_name=reviewer_name,
        contact=(data.get("contact") or "").strip() or None,
        amount=amount or None,
        image_url=(data.get("image_url") or "").strip() or None,
    )

    db.session.add(rv)
    db.session.commit()

    return {"success": True, "review": rv.to_dict()}, 201


def mark_review_helpful(review_id):
    review = Review.query.get_or_404(review_id)
    review.helpful_count = (review.helpful_count or 0) + 1
    db.session.commit()
    return {"success": True, "helpful_count": review.helpful_count}


# ===================================================================
# VOICE TOPICS (public API)
# ===================================================================

def get_voice_topics():
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 20))
    type_filter = request.args.get("type", "").strip()
    category_filter = request.args.get("category", "").strip()
    area_filter = request.args.get("area", "").strip()
    sort = request.args.get("sort", "newest").strip()
    search = request.args.get("q", "").strip()

    query = VoiceTopic.query.filter(VoiceTopic.is_active.is_(True))

    if type_filter:
        query = query.filter(VoiceTopic.type == type_filter)
    if category_filter:
        query = query.filter(VoiceTopic.category == category_filter)
    if area_filter:
        query = query.filter(VoiceTopic.area.ilike(f"%{area_filter}%"))
    if search:
        query = query.filter(
            db.or_(
                VoiceTopic.title.ilike(f"%{search}%"),
                VoiceTopic.description.ilike(f"%{search}%"),
            )
        )

    if sort == "newest":
        query = query.order_by(VoiceTopic.created_at.desc())
    elif sort == "oldest":
        query = query.order_by(VoiceTopic.created_at.asc())
    elif sort == "votes":
        query = query.order_by(VoiceTopic.upvotes.desc(), VoiceTopic.created_at.desc())
    elif sort == "views":
        query = query.order_by(VoiceTopic.views.desc(), VoiceTopic.created_at.desc())
    else:
        query = query.order_by(VoiceTopic.created_at.desc())

    # Pinned topics first
    query = query.order_by(VoiceTopic.is_pinned.desc())

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "success": True,
        "topics": [t.to_dict() for t in pagination.items],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
        },
    }


def create_voice_topic():
    data = request.get_json()
    if not data:
        return {"error": "Request body is required"}, 400

    errors = {}
    topic_type = (data.get("type") or "").strip()
    title = (data.get("title") or "").strip()
    area = (data.get("area") or "").strip()

    if topic_type not in ("poll", "complaint", "discussion", "win"):
        errors["type"] = "Type must be poll, complaint, discussion, or win"
    if not title:
        errors["title"] = "Title is required"
    if not area:
        errors["area"] = "Area is required"

    if errors:
        return {"error": "Validation failed", "fields": errors}, 400

    poll_options_data = data.get("poll_options", [])

    topic = VoiceTopic(
        type=topic_type,
        title=title,
        description=(data.get("description") or "").strip() or None,
        area=area,
        category=(data.get("category") or "").strip() or None,
        bmc_subcategory=(data.get("bmc_subcategory") or "").strip() or None,
        image_url=(data.get("image_url") or "").strip() or None,
        urgency=bool(data.get("urgency")),
        reporter_name=(data.get("reporter_name") or "").strip() or None,
    )

    db.session.add(topic)
    db.session.flush()

    # Add poll options if this is a poll
    if topic_type == "poll" and poll_options_data:
        emojis = ["✅", "😐", "😤", "🚨", "😊", "🤔"]
        for idx, opt_data in enumerate(poll_options_data):
            label = (opt_data.get("label") or "").strip()
            if label:
                option = PollOption(
                    topic_id=topic.id,
                    emoji=opt_data.get("emoji") or (emojis[idx] if idx < len(emojis) else "•"),
                    label=label,
                )
                db.session.add(option)

    db.session.commit()

    return {"success": True, "topic": topic.to_dict()}, 201


def upvote_voice_topic(topic_id):
    topic = VoiceTopic.query.get_or_404(topic_id)
    topic.upvotes = (topic.upvotes or 0) + 1
    db.session.commit()
    return {"success": True, "upvotes": topic.upvotes}


def increment_voice_topic_views(topic_id):
    topic = VoiceTopic.query.get_or_404(topic_id)
    topic.views = (topic.views or 0) + 1
    db.session.commit()
    return {"success": True, "views": topic.views}


def vote_poll_option(option_id):
    option = PollOption.query.get_or_404(option_id)
    option.votes = (option.votes or 0) + 1
    db.session.commit()
    return {
        "success": True,
        "option": option.to_dict(),
        "poll_results": [o.to_dict() for o in option.topic.poll_options.all()],
    }


def get_voice_topic_comments(topic_id):
    topic = VoiceTopic.query.get_or_404(topic_id)
    comments = topic.comments.order_by(VoiceComment.created_at.desc()).all()
    return {
        "success": True,
        "comments": [c.to_dict() for c in comments],
    }


def create_voice_comment(topic_id):
    data = request.get_json()
    if not data:
        return {"error": "Request body is required"}, 400

    text = (data.get("text") or "").strip()
    if not text:
        return {"error": "Comment text is required"}, 400

    topic = VoiceTopic.query.get_or_404(topic_id)

    comment = VoiceComment(
        topic_id=topic.id,
        author_name=(data.get("author_name") or "").strip() or None,
        text=text,
    )

    db.session.add(comment)
    db.session.commit()

    return {"success": True, "comment": comment.to_dict()}, 201


def subscribe():

    if not email:
        return {"error": "Email is required"}

    # Check duplicate
    existing = NewsletterSubscriber.query.filter_by(email=email).first()
    if existing:
        return {"error": "Email already subscribed"}

    subscriber = NewsletterSubscriber(email=email)
    db.session.add(subscriber)
    db.session.commit()

    return {"message": "Subscribed successfully"}


# ===================================================================
# FORUM (public API)
# ===================================================================

def get_forum_questions():
    """
    GET /api/public/forum
    Query params: category, page, per_page
    """
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 20))
    category = request.args.get("category", "").strip()

    query = ForumQuestion.query.filter(
        ForumQuestion.is_approved.is_(True),
        ForumQuestion.is_active.is_(True),
    )

    if category:
        query = query.filter(ForumQuestion.category == category)

    query = query.order_by(ForumQuestion.created_at.desc())

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "success": True,
        "questions": [q.to_dict() for q in pagination.items],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
        },
    }


def create_forum_question():
    """
    POST /api/public/forum
    Body: { title, category, area, author_name, body }
    """
    data = request.get_json()
    if not data:
        return {"error": "Request body is required"}, 400

    errors = {}
    title = (data.get("title") or "").strip()
    category = (data.get("category") or "").strip()
    area = (data.get("area") or "").strip()
    author_name = (data.get("author_name") or "").strip() or None
    body = (data.get("body") or "").strip() or None

    if not title:
        errors["title"] = "Question title is required"

    if errors:
        return {"error": "Validation failed", "fields": errors}, 400

    question = ForumQuestion(
        title=title,
        category=category or None,
        area=area or None,
        author_name=author_name,
        body=body,
    )

    db.session.add(question)
    db.session.commit()

    return {"success": True, "question": question.to_dict()}, 201


def mark_forum_answer_helpful(question_id, answer_id):
    """
    POST /api/public/forum/<question_id>/answers/<answer_id>/helpful
    """
    answer = ForumAnswer.query.filter_by(id=answer_id, question_id=question_id).first_or_404()
    answer.helpful_count = (answer.helpful_count or 0) + 1
    db.session.commit()
    return {"success": True, "helpful_count": answer.helpful_count}


def create_forum_answer(question_id):
    """
    POST /api/public/forum/<question_id>/answers
    Body: { author_name, text }
    """
    question = ForumQuestion.query.get_or_404(question_id)

    data = request.get_json()
    if not data:
        return {"error": "Request body is required"}, 400

    text = (data.get("text") or "").strip()
    if not text:
        return {"error": "Answer text is required"}, 400

    author_name = (data.get("author_name") or "").strip() or None

    answer = ForumAnswer(
        question_id=question.id,
        author_name=author_name,
        text=text,
    )

    db.session.add(answer)
    db.session.commit()

    return {"success": True, "answer": answer.to_dict()}, 201


# ═════════════════════════════════════════════════════════════════
# HELPERS FOR CATEGORY LISTING PAGE
# ═════════════════════════════════════════════════════════════════

def generate_listing_filters(listings):
    """
    Build filter data from the actual listing dataset.
    Returns:
    {
        "rating": [{"stars": "★★★★★", "label": "5.0", "count": N}, ...],
        "sections": [
            {"title": "Services", "options": [{"label": "Root Canal", "count": N}, ...]}
        ],
        "tags": ["Root Canal", "Implants", ...]
    }
    """
    # ── Rating brackets ──
    rating_buckets = [5.0, 4.0, 3.0]
    rating_labels = {5.0: ("★★★★★", "5.0"), 4.0: ("★★★★☆", "4.0+"), 3.0: ("★★★☆☆", "3.0+")}

    rating_filters = []
    for bucket in rating_buckets:
        count = sum(
            1 for l in listings
            if (l.get("rating") or 0) >= bucket
        )
        stars, label = rating_labels[bucket]
        rating_filters.append({
            "stars": stars,
            "label": label,
            "count": count
        })

    # ── Tags / Services ──
    tag_counter = {}
    for l in listings:
        for tag in (l.get("tags") or []):
            tag_counter[tag] = tag_counter.get(tag, 0) + 1

    sorted_tags = sorted(tag_counter.items(), key=lambda x: -x[1])

    service_options = [
        {"label": label, "count": count}
        for label, count in sorted_tags
    ]

    return {
        "rating": rating_filters,
        # sections reserved for structured filter groups (Status, Speciality, etc.)
        # when data becomes available. Services are rendered as tags below.
        "sections": [],
        "tags": [label for label, _ in sorted_tags],
    }


def get_nearby_locations_for_category(location_id, category_id):
    """
    Return sibling locations (same parent) that have listings
    in this category, with listing counts.
    """
    location = Location.query.get(location_id)
    if not location or not location.parent:
        return []

    siblings = Location.query.filter_by(
        parent_id=location.parent_id,
        is_active=True
    ).all()

    nearby = []
    for sib in siblings:
        if sib.id == location_id:
            continue

        count = (
            db.session.query(func.count(Listing.id))
            .join(Business)
            .filter(
                Listing.location_id == sib.id,
                Listing.is_published.is_(True),
                Business.category_id == category_id,
                Business.is_active.is_(True)
            )
            .scalar()
        ) or 0

        if count > 0:
            nearby.append({
                "name": sib.name,
                "slug": sib.slug,
                "count": count,
            })

    return nearby


def get_other_categories(location_id, category_id):
    """
    Return other categories in the same location with listing counts,
    excluding the current category.
    """
    rows = (
        db.session.query(
            Category.id,
            Category.name,
            Category.slug,
            Category.emoji,
            func.count(Listing.id).label("count")
        )
        .join(Business, Business.category_id == Category.id)
        .join(Listing, Listing.business_id == Business.id)
        .filter(
            Listing.location_id == location_id,
            Listing.is_published.is_(True),
            Business.is_active.is_(True),
            Category.is_active.is_(True),
            Category.id != category_id
        )
        .group_by(Category.id, Category.name, Category.slug, Category.emoji)
        .order_by(func.count(Listing.id).desc())
        .limit(8)
        .all()
    )

    return [
        {
            "name": r.name,
            "slug": r.slug,
            "emoji": r.emoji,
            "count": int(r.count or 0),
        }
        for r in rows
    ]
