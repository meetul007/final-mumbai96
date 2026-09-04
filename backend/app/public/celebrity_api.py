from flask import request, abort
from app.listing.models import Celebrity


def get_celebrities():
    """
    GET /api/public/celebrities
    Query params: page, per_page, category, search
    """
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 20))
    category = request.args.get("category", "").strip().lower()
    search = request.args.get("search", "").strip().lower()

    query = Celebrity.query

    if category:
        query = query.filter(Celebrity.category == category)

    if search:
        query = query.filter(
            Celebrity.full_name.ilike(f"%{search}%")
            | Celebrity.slug.ilike(f"%{search}%")
            | Celebrity.profession.ilike(f"%{search}%")
            | Celebrity.mumbai_neighbourhood.ilike(f"%{search}%")
        )

    query = query.order_by(Celebrity.full_name)

    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False,
    )

    return {
        "success": True,
        "celebrities": [c.to_dict() for c in pagination.items],
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
        },
        "categories": get_all_categories(),
    }


def get_celebrity_by_slug(slug):
    """
    GET /api/public/celebrities/<slug>
    """
    celebrity = Celebrity.query.filter_by(slug=slug).first()
    if not celebrity:
        abort(404, "Celebrity not found")

    return {
        "success": True,
        "celebrity": celebrity.to_dict(
            include_bio=True,
            include_works=True,
            include_faqs=True,
        ),
    }


def get_celebrity_categories():
    """
    GET /api/public/celebrities/categories
    """
    return {
        "success": True,
        "categories": get_all_categories(),
    }


def get_all_categories():
    """Helper: get distinct categories with counts."""
    results = (
        Celebrity.query
        .with_entities(Celebrity.category)
        .group_by(Celebrity.category)
        .all()
    )

    categories = []
    for row in results:
        count = Celebrity.query.filter_by(category=row.category).count()
        categories.append({
            "name": row.category,
            "slug": row.category,
            "count": count,
        })

    return categories
