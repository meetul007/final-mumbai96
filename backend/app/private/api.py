import json
from datetime import datetime
from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required
)

from app.extensions import db
from app.listing.models import Business, Listing, BusinessUser, Category, Location
from app.helper.file import (
    upload_single_image,
    upload_multiple_images,
    has_uploaded_images,
    delete_uploaded_file
)
from app.helper.url import build_public_file_url

from app.listing.models import BusinessImage
from app.helper.email import send_verification_email

owner_bp = Blueprint("owner", __name__, url_prefix="/owner")


@owner_bp.route("/locations", methods=["GET"])
@jwt_required()
def owner_list_locations():
    locations = (
        Location.query
        .filter(Location.is_active == True)
        .order_by(Location.name.asc())
        .all()
    )

    return jsonify([
        {
            "id": loc.id,
            "name": loc.name,
            "slug": loc.slug
        }
        for loc in locations
    ])


@owner_bp.route("/categories", methods=["GET"])
@jwt_required()
def owner_categories():
    categories = Category.query.filter_by(is_active=True).order_by(Category.name).all()

    return jsonify([
        {
            "id": c.id,
            "name": c.name,
            "slug": c.slug
        }
        for c in categories
    ])


# --------------------------------------------------
# PROFILE
# --------------------------------------------------
@owner_bp.route("/profile")
@jwt_required()
def owner_profile():
    owner_id = get_jwt_identity()
    user = BusinessUser.query.get_or_404(owner_id)

    return jsonify({
        "id": user.id,
        "fname": user.fname,
        "lname": user.lname,
        "email": user.email
    })


# --------------------------------------------------
# CREATE BUSINESS
# --------------------------------------------------
@owner_bp.route("/business", methods=["POST"])
@jwt_required()
def create_business():
    owner_id = get_jwt_identity()

    # Support multipart/form-data or JSON
    if request.content_type and "multipart/form-data" in request.content_type:
        data = request.form
    else:
        data = request.json or {}

    name = data.get("name")
    slug = data.get("slug")
    category_id = data.get("category_id")

    if not name or not slug or not category_id:
        return jsonify({"error": "name, slug and category_id are required"}), 400

    # Prevent duplicate slug
    existing = Business.query.filter_by(slug=slug).first()
    if existing:
        return jsonify({"error": "Slug already exists"}), 400

    # Parse social links safely
    social_links = data.get("social_links")
    if isinstance(social_links, str):
        try:
            import json
            social_links = json.loads(social_links)
        except Exception:
            social_links = {}

    business = Business(
        name=name,
        slug=slug,
        description=data.get("description"),
        website=data.get("website"),
        category_id=category_id,
        social_links=social_links or {},
        owner_id=owner_id,
        is_active=True
    )

    db.session.add(business)
    db.session.commit()

    files = request.files.getlist("images")

    logo_file = request.files.get("logo")

    if logo_file and has_uploaded_images(request, field_name="logo"):
        business.logo = upload_single_image(
            logo_file,
            folder=f"businesses/{business.slug}/logo"
        )

    db.session.add(business)
    db.session.flush()

    if has_uploaded_images(request, field_name="images"):
        paths = upload_multiple_images(
            files,
            folder=f"businesses/{business.slug}"
        )

        for index, path in enumerate(paths):
            db.session.add(
                BusinessImage(
                    business_id=business.id,
                    image_path=path,
                    is_primary=(index == 0),
                    sort_order=index
                )
            )

    db.session.commit()

    return jsonify({
        "message": "Business created successfully",
        "id": business.id
    }), 201

# --------------------------------------------------
# OWNER BUSINESSES
# --------------------------------------------------
@owner_bp.route("/businesses")
@jwt_required()
def owner_businesses():
    owner_id = get_jwt_identity()

    businesses = Business.query.filter_by(owner_id=owner_id).all()

    return jsonify([
        {
            "id": b.id,
            "name": b.name,
            "slug": b.slug,
            "description": b.description,
            "website": b.website,
            "logo":  build_public_file_url(b.logo),
            "social_links": b.social_links,
            "category_id": b.category_id,
            "category": b.category.name if b.category else None,
            "rating": b.rating,
            "review_count": b.review_count,
            "is_active": b.is_active
        }
        for b in businesses
    ])


# --------------------------------------------------
# UPDATE BUSINESS
# --------------------------------------------------
@owner_bp.route("/business/<int:business_id>", methods=["PUT"])
@jwt_required()
def update_business(business_id):
    owner_id = get_jwt_identity()
    business = Business.query.get_or_404(business_id)

    if str(business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    data = request.form or {}

    # ---------- BASIC FIELDS ----------
    business.name = data.get("name", business.name)
    business.slug = data.get("slug", business.slug)
    business.description = data.get("description", business.description)
    business.website = data.get("website", business.website)
    business.category_id = data.get("category_id", business.category_id)

    # ---------- SOCIAL LINKS ----------
    social_links = data.get("social_links")
    if social_links:
        import json
        business.social_links = json.loads(social_links)

    # ---------- STATUS ----------
    is_active = data.get("is_active")
    if is_active is not None:
        business.is_active = str(is_active).lower() == "true"

    # ---------- LOGO ----------
    logo_file = request.files.get("logo")
    if logo_file:
        # optional: delete old logo
        if business.logo:
            delete_uploaded_file(business.logo)

        business.logo = upload_single_image(
            logo_file,
            folder=f"businesses/{business.slug}/logo"
        )

    db.session.add(business)
    db.session.flush()

    # ---------- GALLERY ----------
    files = request.files.getlist("images")

    if files and has_uploaded_images(request, field_name="images"):
        paths = upload_multiple_images(
            files,
            folder=f"businesses/{business.slug}"
        )

        for index, path in enumerate(paths):
            db.session.add(
                BusinessImage(
                    business_id=business.id,
                    image_path=path,
                    is_primary=False,
                    sort_order=index
                )
            )

    db.session.commit()

    return jsonify({
        "message": "Business updated successfully",
        "business_id": business.id
    })


# --------------------------------------------------
# DELETE BUSINESS
# --------------------------------------------------
@owner_bp.route("/business/<int:business_id>", methods=["DELETE"])
@jwt_required()
def delete_business(business_id):
    owner_id = get_jwt_identity()
    business = Business.query.get_or_404(business_id)

    if str(business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    db.session.delete(business)
    db.session.commit()

    return jsonify({"message": "Business deleted successfully"})


# --------------------------------------------------
# OWNER LISTINGS
# --------------------------------------------------
@owner_bp.route("/listings")
@jwt_required()
def owner_listings():
    owner_id = get_jwt_identity()

    listings = (
        Listing.query
        .join(Business)
        .filter(Business.owner_id == owner_id)
        .all()
    )

    return jsonify([
        {
            "id": l.id,
            "business_id": l.business_id,
            "business": l.business.name,
            "location_id": l.location_id,
            "location": l.location.name,
            "phone": l.phone,
            "email": l.email,
            "address": l.address,
            "services": l.services,
            "features": l.features,
            "opening_hours": l.opening_hours,
            "about": l.about,
            "google_map_url": l.google_map_url,
            "banner_image": build_public_file_url(l.banner_image),
            "is_published": l.is_published
        }
        for l in listings
    ])


# --------------------------------------------------
# UPDATE LISTING
# --------------------------------------------------
@owner_bp.route("/listing/<int:listing_id>", methods=["PUT"])
@jwt_required()
def update_listing(listing_id):
    owner_id = get_jwt_identity()
    listing = Listing.query.get_or_404(listing_id)

    if str(listing.business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    data = request.json or {}

    listing.phone = data.get("phone", listing.phone)
    listing.email = data.get("email", listing.email)
    listing.address = data.get("address", listing.address)
    listing.services = data.get("services", listing.services)
    listing.features = data.get("features", listing.features)
    listing.opening_hours = data.get("opening_hours", listing.opening_hours)
    listing.about = data.get("about", listing.about)
    listing.gallery = data.get("gallery", listing.gallery)
    listing.google_map_url = data.get("google_map_url", listing.google_map_url)
    listing.banner_image = data.get("banner_image", listing.banner_image)
    listing.is_published = data.get("is_published", listing.is_published)

    db.session.commit()

    return jsonify({"message": "Listing updated successfully"})


# --------------------------------------------------
# DELETE LISTING
# --------------------------------------------------
@owner_bp.route("/listing/<int:listing_id>", methods=["DELETE"])
@jwt_required()
def delete_listing(listing_id):
    owner_id = get_jwt_identity()
    listing = Listing.query.get_or_404(listing_id)

    if str(listing.business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    db.session.delete(listing)
    db.session.commit()

    return jsonify({"message": "Listing deleted successfully"})


@owner_bp.route("/business/<int:business_id>/upload-logo", methods=["POST"])
@jwt_required()
def upload_business_logo(business_id):
    owner_id = get_jwt_identity()

    business = Business.query.get_or_404(business_id)

    if str(business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    file = request.files.get("logo")

    if not file:
        return jsonify({"error": "No file provided"}), 400

    if has_uploaded_images(request):
        file_path = upload_single_image(file, folder=f"businesses/{business.slug}/logo")
        business.logo = file_path
        db.session.commit()

        return jsonify({
            "message": "Logo uploaded successfully",
            "logo": file_path
        })

    return jsonify({"error": "Invalid file"}), 400


@owner_bp.route("/business/<int:business_id>/upload-gallery", methods=["POST"])
@jwt_required()
def upload_business_gallery(business_id):
    owner_id = get_jwt_identity()

    business = Business.query.get_or_404(business_id)

    if str(business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    files = request.files.getlist("images")

    if not files:
        return jsonify({"error": "No images provided"}), 400

    paths = upload_multiple_images(
        files,
        folder=f"businesses/{business.slug}"
    )

    images = []

    for index, path in enumerate(paths):
        img = BusinessImage(
            business_id=business.id,
            image_path=path,
            is_primary=False,
            sort_order=index
        )
        db.session.add(img)
        images.append(path)

    db.session.commit()

    return jsonify({
        "message": "Images uploaded successfully",
        "images": images
    })


@owner_bp.route("/listing/<int:listing_id>/upload-banner", methods=["POST"])
@jwt_required()
def upload_listing_banner(listing_id):
    owner_id = get_jwt_identity()

    listing = Listing.query.get_or_404(listing_id)

    if str(listing.business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    file = request.files.get("banner")

    if not file:
        return jsonify({"error": "No file provided"}), 400

    if has_uploaded_images(request):
        file_path = upload_single_image(
            file,
            folder=f"businesses/{listing.business.slug}/banners"
        )

        listing.banner_image = file_path
        db.session.commit()

        return jsonify({
            "message": "Banner uploaded successfully",
            "banner": file_path
        })

    return jsonify({"error": "Invalid file"}), 400


@owner_bp.route("/business/image/<int:image_id>", methods=["DELETE"])
@jwt_required()
def delete_business_image_owner(image_id):
    owner_id = get_jwt_identity()

    image = BusinessImage.query.get_or_404(image_id)

    if str(image.business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    delete_uploaded_file(image.image_path)

    db.session.delete(image)
    db.session.commit()

    return jsonify({"message": "Image deleted"})


@owner_bp.route("/business/image/<int:image_id>/primary", methods=["POST"])
@jwt_required()
def set_primary_image_owner(image_id):
    owner_id = get_jwt_identity()

    image = BusinessImage.query.get_or_404(image_id)

    if str(image.business.owner_id) != owner_id:
        abort(403, "Unauthorized")

    BusinessImage.query.filter_by(
        business_id=image.business_id
    ).update({"is_primary": False})

    image.is_primary = True
    db.session.commit()

    return jsonify({"message": "Primary image updated"})


@owner_bp.route("/listing", methods=["POST"])
@jwt_required()
def create_listing():
    owner_id = get_jwt_identity()

    try:
        business_id = request.form.get("business_id")
        location_id = request.form.get("location_id")

        if not business_id or not location_id:
            return jsonify({"message": "Business and Location are required"}), 400

        # Validate business ownership
        business = Business.query.filter_by(
            id=business_id,
            owner_id=owner_id
        ).first()

        if not business:
            return jsonify({"message": "Invalid business"}), 403

        # Validate location
        location = Location.query.get(location_id)
        if not location:
            return jsonify({"message": "Invalid location"}), 404

        # Prevent duplicate listing
        existing = Listing.query.filter_by(
            business_id=business_id,
            location_id=location_id
        ).first()

        if existing:
            return jsonify({"message": "Listing already exists for this location"}), 400

        listing = Listing(
            business_id=business_id,
            location_id=location_id,
            address=request.form.get("address"),
            phone=request.form.get("phone"),
            email=request.form.get("email"),
            google_map_url=request.form.get("google_map_url"),
            is_published=request.form.get("is_published") == "true"
        )

        # JSON fields
        if request.form.get("opening_hours"):
            listing.opening_hours = json.loads(request.form.get("opening_hours"))

        if request.form.get("services"):
            listing.services = json.loads(request.form.get("services"))

        if request.form.get("features"):
            listing.features = json.loads(request.form.get("features"))

        if request.form.get("about"):
            listing.about = request.form.get("about")

        # Banner Image Upload
        if has_uploaded_images(request, "banner_image"):
            banner_path = upload_single_image(
                request.files.get("banner_image"),
                folder=f"listings/{business.slug}/banner"
            )
            listing.banner_image = banner_path

        # Gallery Upload
        if has_uploaded_images(request, "gallery"):
            gallery_paths = upload_multiple_images(
                request.files.getlist("gallery"),
                folder=f"listings/{business.slug}/gallery"
            )
            listing.gallery = gallery_paths

        db.session.add(listing)
        db.session.commit()

        return jsonify({
            "message": "Listing created successfully",
            "listing_id": listing.id
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


@owner_bp.route("/business/<int:business_id>", methods=["GET"])
@jwt_required()
def get_business_detail(business_id):
    owner_id = get_jwt_identity()

    business = Business.query.filter_by(
        id=business_id,
        owner_id=owner_id
    ).first()

    if not business:
        return jsonify({"error": "Business not found"}), 404

    images = BusinessImage.query.filter_by(business_id=business.id).all()

    gallery = [
        {
            "id": img.id,
            "image": build_public_file_url(img.image_path),
            "is_primary": img.is_primary
        }
        for img in images
    ]

    return jsonify({
        "id": business.id,
        "name": business.name,
        "slug": business.slug,
        "description": business.description,
        "website": business.website,
        "logo": build_public_file_url(business.logo),
        "category_id": business.category_id,
        "category": business.category.name if business.category else None,
        "social_links": business.social_links or {},
        "gallery": gallery,
        "rating": business.rating,
        "review_count": business.review_count,
        "is_active": business.is_active
    })
