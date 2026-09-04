from flask import request, abort
from app.extensions import db
from app.listing.models import Business


def create_business():
    data = request.json

    business = Business(
        name=data["name"],
        slug=data["slug"],
        category_id=data["category_id"],
        owner_id=data["owner_id"],  # later: current_user.id
        description=data.get("description"),
        website_url=data.get("website_url"),
        logo_image=data.get("logo_image"),
        social_links=data.get("social_links"),
        is_active=True
    )

    db.session.add(business)
    db.session.commit()

    return {"id": business.id}, 201


def update_business(business_id):
    data = request.json

    business = Business.query.get_or_404(business_id)

    # Ownership check (IMPORTANT)
    if business.owner_id != data.get("owner_id"):
        abort(403, "Not allowed to update this business")

    for key, value in data.items():
        if hasattr(business, key):
            setattr(business, key, value)

    db.session.commit()
    return {"status": "updated"}


def get_business(business_id):
    owner_id = request.args.get("owner_id", type=int)

    business = Business.query.get_or_404(business_id)

    if business.owner_id != owner_id:
        abort(403, "Not allowed to access this business")

    return {
        "id": business.id,
        "name": business.name,
        "slug": business.slug,
        "category_id": business.category_id,
        "description": business.description,
        "website_url": business.website_url,
        "logo_image": business.logo,
        "social_links": business.social_links,
        "is_active": business.is_active,
    }
