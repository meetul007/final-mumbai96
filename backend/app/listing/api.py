from flask import abort

from .models import Location, Listing, Category, Business
from app.public.routes import public_bp


@public_bp.route("/<location_slug>/<category_slug>", methods=["GET"])
def listing_category_page(location_slug, category_slug):
    location = Location.query.filter_by(slug=location_slug, is_active=True).first()
    category = Category.query.filter_by(slug=category_slug, is_active=True).first()

    if not location or not category:
        abort(404)

    listings = (
        Listing.query
        .join(Business)
        .filter(
            Listing.location_id == location.id,
            Business.category_id == category.id,
            Listing.is_published.is_(True),
            Business.is_active.is_(True)
        )
        .all()
    )

    return {
        "location": {
            "name": location.name,
            "slug": location.slug,
            "image": location.image_path
        },
        "category": {
            "name": category.name,
            "slug": category.slug,
            "emoji": category.emoji
        },
        "listings": [
            {
                "business_name": l.business.name,
                "business_slug": l.business.slug,
                "address": l.address,
                "featured_image": l.featured_image
            }
            for l in listings
        ]
    }


@public_bp.route(
    "/<location_slug>/<category_slug>/<business_slug>",
    methods=["GET"]
)
def listing_detail(location_slug, category_slug, business_slug):
    location = Location.query.filter_by(slug=location_slug, is_active=True).first()
    category = Category.query.filter_by(slug=category_slug, is_active=True).first()
    business = Business.query.filter_by(slug=business_slug, is_active=True).first()

    if not location or not category or not business:
        abort(404)

    if business.category_id != category.id:
        abort(404)

    listing = Listing.query.filter_by(
        business_id=business.id,
        location_id=location.id,
        is_published=True
    ).first()

    if not listing:
        abort(404)

    return {
        "location": {
            "name": location.name,
            "slug": location.slug
        },
        "category": {
            "name": category.name,
            "slug": category.slug,
            "emoji": category.emoji
        },
        "business": {
            "name": business.name,
            "slug": business.slug,
            "description": business.description,
            "website": business.website_url,
            "logo": business.logo_image,
            "social_links": business.social_links,
            "rating": business.average_rating,
            "review_count": business.review_count,
        },
        "listing": {
            "title": listing.title,
            "address": listing.address,
            "phone": listing.phone,
            "email": listing.email,
            "lat": listing.lat,
            "lng": listing.lng,
            "featured_image": listing.featured_image,
            "gallery": listing.gallery_images,
            "opening_hours": listing.opening_hours,
            "services": listing.services,
            "amenities": listing.amenities,
            "price_range": listing.price_range,
            "seo": {
                "title": listing.seo_title,
                "description": listing.seo_description
            },
            "banner_image": listing.banner_image
        }
    }
