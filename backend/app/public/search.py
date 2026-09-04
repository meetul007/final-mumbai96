from flask import request, abort
from sqlalchemy import or_
from app.listing.models import Business, Category, Listing


def search_intent():
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
                    f"{business.slug}"
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
