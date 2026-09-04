import json
import time
from flask import request, session, redirect, url_for, render_template, Blueprint
from app.admin.models import AdminUser, AdminAuditLog
from app.listing.models import (
    Location, Business, Category, Listing, SeoAliasSlug, BusinessImage, Blog, NewsletterSubscriber, Celebrity,
    LostFoundListing, Review, VoiceTopic, VoiceComment, PollOption,
    ForumQuestion, ForumAnswer, EmailLog
)
from app.admin.decorators import admin_login_required
from app import db
from app.helper.pagination import paginate
from app.helper.file import upload_single_image, upload_multiple_images, delete_uploaded_file, has_uploaded_images, upload_celebrity_image
from app.admin.constants import OPENING_HOURS_TEMPLATE, FEATURES_OPTIONS, SERVICES_OPTIONS
from app.helper.url import extract_social_links
from app.admin.utils import save_blog

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")


@admin_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        admin = AdminUser.query.filter_by(
            email=email,
            is_active=True
        ).first()

        if admin and admin.check_password(password):
            session["admin_id"] = admin.id
            return redirect(url_for("admin.dashboard"))

        return render_template(
            "admin/login.html",
            error="Invalid credentials"
        )

    return render_template("admin/login.html")


@admin_bp.route("/logout")
def logout():
    session.pop("admin_id", None)
    return redirect(url_for("admin.login"))


@admin_bp.route("/")
@admin_login_required
def dashboard():
    stats = {
        "businesses": Business.query.count(),
        "categories": Category.query.count(),
        "locations": Location.query.count(),
    }

    return render_template("admin/dashboard.html", stats=stats)


@admin_bp.route("/categories")
@admin_login_required
def categories():
    q = Category.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(Category.name.ilike(f"%{search}%"))

    q = q.order_by(Category.name)

    pagination = paginate(q)
    return render_template(
        "admin/categories/list.html",
        categories=pagination.items,
        pagination=pagination,
        search=search
    )


@admin_bp.route("/categories/create", methods=["GET", "POST"])
@admin_login_required
def create_category():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        slug = request.form.get("slug", "").strip()
        seo_description = request.form.get("seo_description", "").strip()
        is_active = bool(request.form.get("is_active"))

        errors = {}

        if not name:
            errors["name"] = "Name is required"
        if not slug:
            errors["slug"] = "Slug is required"

        if Category.query.filter_by(slug=slug).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template(
                "admin/categories/form.html",
                errors=errors,
                data=request.form
            )

        category = Category(
            name=name,
            slug=slug,
            seo_description=seo_description,
            is_active=is_active
        )

        file = request.files.get("image")

        if file and has_uploaded_images(request):
            file_path = upload_single_image(file, folder="categories")

            category.image_path = file_path

        db.session.add(category)
        db.session.commit()

        return redirect(url_for("admin.categories"))

    return render_template("admin/categories/form.html")


@admin_bp.route("/categories/<int:category_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_category(category_id):
    category = Category.query.get_or_404(category_id)

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        slug = request.form.get("slug", "").strip()
        seo_description = request.form.get("seo_description", "").strip()
        is_active = bool(request.form.get("is_active"))

        errors = {}

        if not name:
            errors["name"] = "Name is required"
        if not slug:
            errors["slug"] = "Slug is required"

        if Category.query.filter(
            Category.slug == slug,
            Category.id != category.id
        ).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template(
                "admin/categories/form.html",
                errors=errors,
                category=category
            )

        category.name = name
        category.slug = slug
        category.seo_description = seo_description
        category.is_active = is_active

        file = request.files.get("image")
        if file and has_uploaded_images(request):
            file_path = upload_single_image(file, folder="categories")

            category.image_path = file_path

        db.session.commit()
        return redirect(url_for("admin.categories"))

    return render_template(
        "admin/categories/form.html",
        category=category
    )


@admin_bp.route("/categories/<int:category_id>/delete", methods=["POST"])
@admin_login_required
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    category.is_active = False
    db.session.commit()
    return redirect(url_for("admin.categories"))


@admin_bp.route("/businesses")
@admin_login_required
def businesses():
    q = Business.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(Business.name.ilike(f"%{search}%"))

    q = q.order_by(Business.name)

    pagination = paginate(q)
    return render_template(
        "admin/businesses/list.html",
        businesses=pagination.items,
        pagination=pagination,
        search=search
    )


@admin_bp.route("/businesses/create", methods=["GET", "POST"])
@admin_login_required
def create_business():
    categories = Category.query.filter_by(is_active=True).all()

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        slug = request.form.get("slug", "").strip()
        category_id = request.form.get("category_id")
        description = request.form.get("description", "").strip()
        website = request.form.get("website", "").strip()
        is_active = bool(request.form.get("is_active"))

        errors = {}

        if not name:
            errors["name"] = "Name is required"
        if not slug:
            errors["slug"] = "Slug is required"
        if not category_id:
            errors["category_id"] = "Category is required"

        if Business.query.filter_by(slug=slug).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template(
                "admin/businesses/form.html",
                errors=errors,
                data=request.form,
                categories=categories
            )

        social_links = extract_social_links(request.form)

        business = Business(
            name=name,
            slug=slug,
            category_id=category_id,
            description=description,
            website=website,
            is_active=is_active,
            social_links=social_links,
        )


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

        return redirect(url_for("admin.businesses"))

    return render_template(
        "admin/businesses/form.html",
        categories=categories
    )


@admin_bp.route("/businesses/<int:business_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_business(business_id):
    business = Business.query.get_or_404(business_id)
    categories = Category.query.filter_by(is_active=True).all()

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        slug = request.form.get("slug", "").strip()
        category_id = request.form.get("category_id")
        description = request.form.get("description", "").strip()
        website = request.form.get("website", "").strip()
        is_active = bool(request.form.get("is_active"))

        errors = {}

        if not name:
            errors["name"] = "Name is required"
        if not slug:
            errors["slug"] = "Slug is required"

        if Business.query.filter(
            Business.slug == slug,
            Business.id != business.id
        ).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template(
                "admin/businesses/form.html",
                business=business,
                categories=categories,
                errors=errors
            )

        business.name = name
        business.slug = slug
        business.category_id = category_id
        business.description = description
        business.website = website
        business.is_active = is_active
        business.social_links = extract_social_links(request.form)

        logo_file = request.files.get("logo")

        if logo_file and has_uploaded_images(request, field_name="logo"):
            business.logo = upload_single_image(
                logo_file,
                folder=f"businesses/{business.slug}/logo"
            )

        files = request.files.getlist("images")

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
        return redirect(url_for("admin.businesses"))

    return render_template(
        "admin/businesses/form.html",
        business=business,
        categories=categories
    )


@admin_bp.route("/listings/create", methods=["GET", "POST"])
@admin_login_required
def create_listing():
    businesses = Business.query.filter_by(is_active=True).all()
    locations = Location.query.filter_by(is_active=True).all()

    if request.method == "POST":
        business_id = request.form.get("business_id")
        location_id = request.form.get("location_id")
        address = request.form.get("address", "").strip()
        is_published = bool(request.form.get("is_published"))

        errors = {}
        if not business_id:
            errors["business_id"] = "Business required"
        if not location_id:
            errors["location_id"] = "Location required"

        exists = Listing.query.filter_by(
            business_id=business_id,
            location_id=location_id
        ).first()
        if exists:
            errors["duplicate"] = "Listing already exists for this location"

        if errors:
            return render_template(
                "admin/listings/form.html",
                errors=errors,
                businesses=businesses,
                locations=locations
            )

        listing = Listing(
            business_id=business_id,
            location_id=location_id,
            address=address,
            phone=request.form.get("phone"),
            email=request.form.get("email"),
            about=request.form.get("about"),
            is_published=is_published,
            google_map_url=request.form.get("google_map_url"),
        )

        listing.services = json.loads(request.form.get("services") or "[]")
        listing.features = json.loads(request.form.get("features") or "[]")
        listing.opening_hours = json.loads(request.form.get("opening_hours") or "{}")

        banner_image_file = request.files.get("banner_image")

        if banner_image_file and has_uploaded_images(request):
            file_path = upload_single_image(banner_image_file, folder="business")

            listing.banner_image = file_path

        db.session.add(listing)

        # 🔥 AUTO CREATE BASE SEO ALIAS
        if is_published:
            business = Business.query.get(business_id)
            location = Location.query.get(location_id)

            base_slug = f"{business.category.slug}-in-{location.slug}"
            exists = SeoAliasSlug.query.filter_by(slug=base_slug).first()

            if not exists:
                db.session.add(
                    SeoAliasSlug(
                        slug=base_slug,
                        category=business.category,
                        location=location,
                        canonical_category=business.category,
                        canonical_location=location
                    )
                )

        db.session.commit()
        return redirect(url_for("admin.dashboard"))

    return render_template(
        "admin/listings/form.html",
        businesses=businesses,
        locations=locations,
        services_options=SERVICES_OPTIONS,
        features_options=FEATURES_OPTIONS,
        opening_template=OPENING_HOURS_TEMPLATE,
    )


@admin_bp.route("/seo-aliases")
@admin_login_required
def seo_aliases():
    q = SeoAliasSlug.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(SeoAliasSlug.slug.ilike(f"%{search}%"))
    q = q.order_by(SeoAliasSlug.id)
    pagination = paginate(q)
    return render_template(
        "admin/seo_aliases/list.html",
        aliases=pagination.items,
        pagination=pagination,
        search=search
    )


@admin_bp.route("/seo-aliases/create", methods=["GET", "POST"])
@admin_login_required
def create_seo_alias():
    categories = Category.query.all()
    locations = Location.query.all()

    if request.method == "POST":
        slug = request.form.get("slug", "").strip()
        category_id = request.form.get("category_id")
        location_id = request.form.get("location_id")

        errors = {}
        if not slug:
            errors["slug"] = "Slug required"

        if SeoAliasSlug.query.filter_by(slug=slug).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template(
                "admin/seo_aliases/form.html",
                errors=errors,
                categories=categories,
                locations=locations
            )

        alias = SeoAliasSlug(
            slug=slug,
            category_id=category_id,
            location_id=location_id,
            canonical_category_id=category_id,
            canonical_location_id=location_id,
            is_active=True
        )

        db.session.add(alias)
        db.session.commit()
        return redirect(url_for("admin.seo_aliases"))

    return render_template(
        "admin/seo_aliases/form.html",
        categories=categories,
        locations=locations
    )


@admin_bp.route("/listings")
@admin_login_required
def listings():
    q = Listing.query.join(Business).join(Location)

    if request.args.get("location_id"):
        q = q.filter(Listing.location_id == request.args["location_id"])

    if request.args.get("category_id"):
        q = q.filter(Business.category_id == request.args["category_id"])

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(Business.name.ilike(f"%{search}%"))

    pagination = paginate(q)
    return render_template(
        "admin/listings/list.html",
        listings=pagination.items,
        locations=Location.query.all(),
        categories=Category.query.all(),
        pagination=pagination,
        search=search
    )


@admin_bp.route("/listings/<int:listing_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    businesses = Business.query.filter_by(is_active=True).all()
    locations = Location.query.filter_by(is_active=True).all()

    if request.method == "POST":
        listing.address = request.form.get("address")
        listing.phone = request.form.get("phone")
        listing.email = request.form.get("email")
        listing.services = json.loads(request.form.get("services") or "[]")
        listing.features = json.loads(request.form.get("features") or "[]")
        listing.opening_hours = json.loads(request.form.get("opening_hours") or "{}")
        listing.about = request.form.get("about")
        listing.is_published = bool(request.form.get("is_published"))
        listing.google_map_url = request.form.get("google_map_url")

        banner_image_file = request.files.get("banner_image")

        if banner_image_file and has_uploaded_images(request, field_name="banner_image"):
            file_path = upload_single_image(banner_image_file, folder="listing")

            listing.banner_image = file_path

        db.session.commit()
        return redirect(url_for("admin.listings"))

    return render_template(
        "admin/listings/form.html",
        listing=listing,
        businesses=businesses,
        locations=locations,
        services_options=SERVICES_OPTIONS,
        features_options=FEATURES_OPTIONS,
        opening_template=OPENING_HOURS_TEMPLATE,
    )


@admin_bp.route("/listings/<int:listing_id>/deactivate", methods=["POST"])
@admin_login_required
def deactivate_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    listing.is_published = False
    db.session.commit()
    return redirect(url_for("admin.listings"))


@admin_bp.route("/seo-aliases/<int:alias_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_seo_alias(alias_id):
    alias = SeoAliasSlug.query.get_or_404(alias_id)
    categories = Category.query.all()
    locations = Location.query.all()

    if request.method == "POST":
        alias.slug = request.form.get("slug").strip()
        alias.category_id = request.form.get("category_id")
        alias.location_id = request.form.get("location_id")
        alias.is_active = bool(request.form.get("is_active"))

        db.session.commit()
        return redirect(url_for("admin.seo_aliases"))

    return render_template(
        "admin/seo_aliases/form.html",
        alias=alias,
        categories=categories,
        locations=locations
    )


@admin_bp.route("/seo-aliases/<int:alias_id>/deactivate", methods=["POST"])
@admin_login_required
def deactivate_seo_alias(alias_id):
    alias = SeoAliasSlug.query.get_or_404(alias_id)
    alias.is_active = False
    db.session.commit()
    return redirect(url_for("admin.seo_aliases"))


@admin_bp.route("/locations")
@admin_login_required
def locations():
    q = Location.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(Location.name.ilike(f"%{search}%"))
    q = q.order_by(Location.parent_id, Location.name)
    pagination = paginate(q)
    return render_template(
        "admin/locations/list.html",
        locations=pagination.items,
        pagination=pagination,
        search=search
    )


@admin_bp.route("/locations/create", methods=["GET", "POST"])
@admin_login_required
def create_location():
    parents = Location.query.filter_by(parent_id=None).all()
    all_locations = Location.query.filter(Location.id != 0).all()

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        slug = request.form.get("slug", "").strip()
        parent_id = request.form.get("parent_id") or None
        is_active = bool(request.form.get("is_active"))
        about = request.form.get("about")
        population = request.form.get("population")
        municipal_body = request.form.get("municipal_body")

        errors = {}

        if not name:
            errors["name"] = "Name is required"
        if not slug:
            errors["slug"] = "Slug is required"

        if Location.query.filter_by(slug=slug).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template(
                "admin/locations/form.html",
                errors=errors,
                data=request.form,
                parents=parents,
                all_locations=all_locations
            )

        location = Location(
            name=name,
            slug=slug,
            parent_id=parent_id,
            is_active=is_active
        )

        save_location_meta_data(about, location, municipal_body, population)

        db.session.add(location)
        db.session.commit()

        return redirect(url_for("admin.locations"))

    return render_template(
        "admin/locations/form.html",
        parents=parents,
        all_locations=all_locations
    )


@admin_bp.route("/locations/<int:location_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_location(location_id):
    location = Location.query.get_or_404(location_id)
    parents = Location.query.filter(
        Location.parent_id.is_(None),
        Location.id != location.id
    ).all()
    all_locations = Location.query.filter(
        Location.id != location.id
    ).all()

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        slug = request.form.get("slug", "").strip()
        parent_id = request.form.get("parent_id") or None
        is_active = bool(request.form.get("is_active"))
        about = request.form.get("about")
        population = request.form.get("population")
        municipal_body = request.form.get("municipal_body")

        errors = {}

        if not name:
            errors["name"] = "Name is required"
        if not slug:
            errors["slug"] = "Slug is required"

        if Location.query.filter(
            Location.slug == slug,
            Location.id != location.id
        ).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template(
                "admin/locations/form.html",
                location=location,
                errors=errors,
                parents=parents
            )

        location.name = name
        location.slug = slug
        location.parent_id = parent_id
        location.is_active = is_active
        save_location_meta_data(about, location, municipal_body, population)

        db.session.commit()
        return redirect(url_for("admin.locations"))

    return render_template(
        "admin/locations/form.html",
        location=location,
        parents=parents,
        all_locations=all_locations
    )


def save_location_meta_data(about, location, municipal_body, population):
    location.about = about
    location.population = population
    location.municipal_body = municipal_body
    file = request.files.get("location_image")
    if file and has_uploaded_images(request, "location_image"):
        file_path = upload_single_image(file, folder="location")
        location.location_image = file_path

    file = request.files.get("location_icon")
    if file and has_uploaded_images(request, "location_icon"):
        file_path = upload_single_image(file, folder="location")
        location.location_icon = file_path

    location.travelling_connectivity = json.loads(request.form.get("travelling_connectivity", "[]"))
    location.living_style = json.loads(request.form.get("living_style", "[]"))
    location.best_services = json.loads(request.form.get("best_services", "[]"))
    location.food = json.loads(request.form.get("food", "[]"))
    location.places_to_visit = json.loads(request.form.get("places_to_visit", "[]"))
    location.night_life = json.loads(request.form.get("night_life", "[]"))
    location.nearby_locations = [
        int(i) for i in request.form.getlist("nearby_locations") if i
    ]

    # ---- NEW FIELDS ----
    location.seo_keywords = request.form.get("seo_keywords", "").strip() or None

    # JSON fields
    _parse_and_set_json(location, "character_vibe")
    _parse_and_set_json(location, "resident_profile")
    _parse_and_set_json(location, "sub_areas")
    _parse_and_set_json(location, "property_prices")
    _parse_and_set_json(location, "schools")
    _parse_and_set_json(location, "hospitals")
    _parse_and_set_json(location, "major_employers")
    _parse_and_set_json(location, "local_events")
    _parse_and_set_json(location, "upcoming_projects")
    _parse_and_set_json(location, "residential_societies")
    _parse_and_set_json(location, "faq")
    _parse_and_set_json(location, "area_report_card")

    # food_tags is plain text
    location.food_tags = request.form.get("food_tags", "").strip() or None

    # civic_data is a JSON object
    civic = {}
    for key in ("ward", "assembly_constituency", "lok_sabha", "police_station"):
        val = request.form.get(f"civic_{key}", "").strip()
        if val:
            civic[key] = val
    location.civic_data = civic if civic else None


def _parse_and_set_json(location, field_name):
    """Parse a JSON form field and set it on the location object."""
    raw = request.form.get(field_name, "").strip()
    if raw:
        try:
            val = json.loads(raw)
            setattr(location, field_name, val)
        except json.JSONDecodeError:
            print(f"  ⚠️  Invalid JSON for {field_name}, skipping")
            setattr(location, field_name, None)
    else:
        setattr(location, field_name, None)


@admin_bp.route("/locations/<int:location_id>/deactivate", methods=["POST"])
@admin_login_required
def deactivate_location(location_id):
    location = Location.query.get_or_404(location_id)
    location.is_active = False
    db.session.commit()
    return redirect(url_for("admin.locations"))



@admin_bp.route("/audit-logs")
@admin_login_required
def audit_logs():
    q = AdminAuditLog.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(
            AdminAuditLog.action.ilike(f"%{search}%") |
            AdminAuditLog.entity.ilike(f"%{search}%") |
            AdminAuditLog.ip_address.ilike(f"%{search}%")
        )

    q = q.order_by(AdminAuditLog.created_at.desc())

    pagination = paginate(q)

    return render_template(
        "admin/audit_logs/list.html",
        logs=pagination.items,
        pagination=pagination,
        search=search
    )


@admin_bp.route("/business-images/<int:image_id>/primary", methods=["POST"])
@admin_login_required
def set_primary_image(image_id):
    image = BusinessImage.query.get_or_404(image_id)

    BusinessImage.query.filter_by(
        business_id=image.business_id
    ).update({"is_primary": False})

    image.is_primary = True
    db.session.commit()

    return redirect(request.referrer)


@admin_bp.route("/business-images/<int:image_id>/delete", methods=["POST"])
@admin_login_required
def delete_business_image(image_id):
    image = BusinessImage.query.get_or_404(image_id)
    business_id = image.business_id
    was_primary = image.is_primary

    delete_uploaded_file(image.image_path)

    db.session.delete(image)
    db.session.commit()

    # If primary deleted → promote next image
    if was_primary:
        next_image = (
            BusinessImage.query
            .filter_by(business_id=business_id)
            .order_by(BusinessImage.sort_order)
            .first()
        )
        if next_image:
            next_image.is_primary = True
            db.session.commit()

    return redirect(request.referrer)


@admin_bp.route("/businesses/<int:business_id>/delete", methods=["POST"])
@admin_login_required
def delete_business(business_id):
    business = Business.query.get_or_404(business_id)

    # Delete images from storage
    for img in business.images:
        delete_uploaded_file(img.image_path)

    # Listings will auto-delete if FK cascade is set
    db.session.delete(business)
    db.session.commit()

    return redirect(url_for("admin.businesses"))


@admin_bp.route("/listings/<int:listing_id>/delete", methods=["POST"])
@admin_login_required
def delete_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)

    # Delete banner image
    if listing.banner_image:
        delete_uploaded_file(listing.banner_image)

    db.session.delete(listing)
    db.session.commit()

    return redirect(url_for("admin.listings"))


@admin_bp.route("/blogs")
def blogs():
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()
    return render_template("admin/blogs/list.html", blogs=blogs)


@admin_bp.route("/blogs/create", methods=["GET", "POST"])
def create_blog():
    if request.method == "POST":
        save_blog()
        return redirect(url_for("admin.blogs"))
    return render_template("admin/blogs/form.html", blog=None)


@admin_bp.route("/blogs/edit/<int:id>", methods=["GET", "POST"])
def edit_blog(id):
    blog = Blog.query.get_or_404(id)

    if request.method == "POST":
        save_blog(blog)
        return redirect(url_for("admin.blogs"))

    return render_template("admin/blogs/form.html", blog=blog)


@admin_bp.route("/blogs/delete/<int:id>")
def delete_blog(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return redirect(url_for("admin.blogs"))


@admin_bp.route('/newsletter')
def newsletter():
    search = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)

    query = NewsletterSubscriber.query

    if search:
        query = query.filter(
            NewsletterSubscriber.email.ilike(f"%{search}%")
        )

    pagination = query.order_by(
        NewsletterSubscriber.subscribed_at.desc()
    ).paginate(page=page, per_page=20)

    return render_template(
        "admin/newsletter/list.html",
        subscribers=pagination.items,   # ✅ FIXED
        pagination=pagination,
        search=search
    )


@admin_bp.route('/newsletter/<int:id>/delete', methods=['POST'])
def delete_subscriber(id):

    sub = NewsletterSubscriber.query.get_or_404(id)

    db.session.delete(sub)
    db.session.commit()

    return redirect(url_for('admin.newsletter'))


# ==================== CELEBRITIES CRUD ====================

@admin_bp.route("/celebrities")
@admin_login_required
def celebrities():
    q = Celebrity.query
    search = request.args.get("q", "").strip()
    category_filter = request.args.get("category", "").strip()

    if search:
        q = q.filter(
            db.or_(
                Celebrity.full_name.ilike(f"%{search}%"),
                Celebrity.slug.ilike(f"%{search}%"),
            )
        )
    if category_filter:
        q = q.filter(Celebrity.category == category_filter)

    q = q.order_by(Celebrity.full_name)
    pagination = paginate(q)

    categories = db.session.query(Celebrity.category).distinct().order_by(Celebrity.category).all()
    categories = [c[0] for c in categories]

    return render_template(
        "admin/celebrities/list.html",
        celebrities=pagination.items,
        pagination=pagination,
        search=search,
        category_filter=category_filter,
        categories=categories,
    )


@admin_bp.route("/celebrities/create", methods=["GET", "POST"])
@admin_login_required
def create_celebrity():
    if request.method == "POST":
        slug = request.form.get("slug", "").strip()
        full_name = request.form.get("full_name", "").strip()
        first_name = request.form.get("first_name", "").strip()
        last_name = request.form.get("last_name", "").strip()
        emoji = request.form.get("emoji", "").strip()
        category = request.form.get("category", "").strip()
        subcategory = request.form.get("subcategory", "").strip()

        uploaded_celebrity_image = None
        celebrity_image_file = request.files.get("celebrity_image_file")
        if celebrity_image_file and has_uploaded_images(request, field_name="celebrity_image_file"):
            uploaded_celebrity_image = upload_celebrity_image(celebrity_image_file, slug) + f"?v={int(time.time())}"

        errors = {}
        if not full_name:
            errors["full_name"] = "Full name is required"
        if not slug:
            errors["slug"] = "Slug is required"
        if not category:
            errors["category"] = "Category is required"

        if slug and Celebrity.query.filter(Celebrity.slug == slug).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template("admin/celebrities/form.html", errors=errors, data=request.form)

        celebrity = Celebrity(
            slug=slug,
            full_name=full_name,
            first_name=first_name,
            last_name=last_name,
            emoji=emoji or None,
            category=category,
            subcategory=subcategory or None,
            page_title=request.form.get("page_title", "").strip() or None,
            meta_description=request.form.get("meta_description", "").strip() or None,
            meta_keywords=request.form.get("meta_keywords", "").strip() or None,
            og_title=request.form.get("og_title", "").strip() or None,
            og_description=request.form.get("og_description", "").strip() or None,
            canonical_url=request.form.get("canonical_url", "").strip() or None,
            schema_alternate_names=request.form.get("schema_alternate_names", "").strip() or None,
            hero_tag=request.form.get("hero_tag", "").strip() or None,
            name_line1=request.form.get("name_line1", "").strip() or None,
            name_line2=request.form.get("name_line2", "").strip() or None,
            subtitle=request.form.get("subtitle", "").strip() or None,
            date_of_birth=request.form.get("date_of_birth", "").strip() or None,
            age=int(request.form.get("age", 0)) if request.form.get("age") else None,
            gender=request.form.get("gender", "").strip() or None,
            birth_city=request.form.get("birth_city", "").strip() or None,
            nationality=request.form.get("nationality", "").strip() or None,
            religion=request.form.get("religion", "").strip() or None,
            marital_status=request.form.get("marital_status", "").strip() or None,
            spouse=request.form.get("spouse", "").strip() or None,
            children_count=int(request.form.get("children_count", 0)) if request.form.get("children_count") else None,
            children_names=request.form.get("children_names", "").strip() or None,
            profession=request.form.get("profession", "").strip() or None,
            net_worth=request.form.get("net_worth", "").strip() or None,
            debut_work=request.form.get("debut_work", "").strip() or None,
            total_works=request.form.get("total_works", "").strip() or None,
            awards_count_label=request.form.get("awards_count_label", "").strip() or None,
            mumbai_neighbourhood=request.form.get("mumbai_neighbourhood", "").strip() or None,
            mumbai_area_detail=request.form.get("mumbai_area_detail", "").strip() or None,
            mumbai_home_name=request.form.get("mumbai_home_name", "").strip() or None,
            neighbourhood_slug=request.form.get("neighbourhood_slug", "").strip() or None,
            neighbourhood_desc=request.form.get("neighbourhood_desc", "").strip() or None,
            bio_para_1=request.form.get("bio_para_1", "").strip() or None,
            bio_para_2=request.form.get("bio_para_2", "").strip() or None,
            bio_para_3=request.form.get("bio_para_3", "").strip() or None,
            wikipedia_url=request.form.get("wikipedia_url", "").strip() or None,
            wikipedia_image_url=uploaded_celebrity_image or (request.form.get("wikipedia_image_url", "").strip() or None),
            instagram_handle=request.form.get("instagram_handle", "").strip() or None,
            twitter_handle=request.form.get("twitter_handle", "").strip() or None,
        )

        for i in range(1, 7):
            year = request.form.get(f"work{i}_year", "").strip()
            title = request.form.get(f"work{i}_title", "").strip()
            role = request.form.get(f"work{i}_role", "").strip()
            badge = request.form.get(f"work{i}_badge", "").strip()
            setattr(celebrity, f"work{i}_year", int(year) if year else None)
            setattr(celebrity, f"work{i}_title", title or None)
            setattr(celebrity, f"work{i}_role", role or None)
            setattr(celebrity, f"work{i}_badge", badge or None)

        for i in range(1, 6):
            award = request.form.get(f"award{i}", "").strip()
            setattr(celebrity, f"award{i}", award or None)

        for i in range(1, 6):
            q_text = request.form.get(f"faq{i}_q", "").strip()
            a_text = request.form.get(f"faq{i}_a", "").strip()
            setattr(celebrity, f"faq{i}_q", q_text or None)
            setattr(celebrity, f"faq{i}_a", a_text or None)

        for i in range(1, 5):
            name = request.form.get(f"related{i}_name", "").strip()
            slug_rel = request.form.get(f"related{i}_slug", "").strip()
            emoji_rel = request.form.get(f"related{i}_emoji", "").strip()
            area_rel = request.form.get(f"related{i}_area", "").strip()
            setattr(celebrity, f"related{i}_name", name or None)
            setattr(celebrity, f"related{i}_slug", slug_rel or None)
            setattr(celebrity, f"related{i}_emoji", emoji_rel or None)
            setattr(celebrity, f"related{i}_area", area_rel or None)

        db.session.add(celebrity)
        db.session.commit()
        return redirect(url_for("admin.celebrities"))

    return render_template("admin/celebrities/form.html")


@admin_bp.route("/celebrities/<int:celebrity_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_celebrity(celebrity_id):
    celebrity = Celebrity.query.get_or_404(celebrity_id)

    if request.method == "POST":
        slug = request.form.get("slug", "").strip()
        full_name = request.form.get("full_name", "").strip()
        category = request.form.get("category", "").strip()

        uploaded_celebrity_image = None
        celebrity_image_file = request.files.get("celebrity_image_file")
        if celebrity_image_file and has_uploaded_images(request, field_name="celebrity_image_file"):
            uploaded_celebrity_image = upload_celebrity_image(celebrity_image_file, slug) + f"?v={int(time.time())}"

        errors = {}
        if not full_name:
            errors["full_name"] = "Full name is required"
        if not slug:
            errors["slug"] = "Slug is required"
        if not category:
            errors["category"] = "Category is required"

        if slug and Celebrity.query.filter(Celebrity.slug == slug, Celebrity.id != celebrity.id).first():
            errors["slug"] = "Slug already exists"

        if errors:
            return render_template("admin/celebrities/form.html", errors=errors, celebrity=celebrity)

        celebrity.slug = slug
        celebrity.full_name = full_name
        celebrity.first_name = request.form.get("first_name", "").strip() or None
        celebrity.last_name = request.form.get("last_name", "").strip() or None
        celebrity.emoji = request.form.get("emoji", "").strip() or None
        celebrity.category = category
        celebrity.subcategory = request.form.get("subcategory", "").strip() or None
        celebrity.page_title = request.form.get("page_title", "").strip() or None
        celebrity.meta_description = request.form.get("meta_description", "").strip() or None
        celebrity.meta_keywords = request.form.get("meta_keywords", "").strip() or None
        celebrity.og_title = request.form.get("og_title", "").strip() or None
        celebrity.og_description = request.form.get("og_description", "").strip() or None
        celebrity.canonical_url = request.form.get("canonical_url", "").strip() or None
        celebrity.schema_alternate_names = request.form.get("schema_alternate_names", "").strip() or None
        celebrity.hero_tag = request.form.get("hero_tag", "").strip() or None
        celebrity.name_line1 = request.form.get("name_line1", "").strip() or None
        celebrity.name_line2 = request.form.get("name_line2", "").strip() or None
        celebrity.subtitle = request.form.get("subtitle", "").strip() or None
        celebrity.date_of_birth = request.form.get("date_of_birth", "").strip() or None
        celebrity.age = int(request.form.get("age", 0)) if request.form.get("age") else None
        celebrity.gender = request.form.get("gender", "").strip() or None
        celebrity.birth_city = request.form.get("birth_city", "").strip() or None
        celebrity.nationality = request.form.get("nationality", "").strip() or None
        celebrity.religion = request.form.get("religion", "").strip() or None
        celebrity.marital_status = request.form.get("marital_status", "").strip() or None
        celebrity.spouse = request.form.get("spouse", "").strip() or None
        celebrity.children_count = int(request.form.get("children_count", 0)) if request.form.get("children_count") else None
        celebrity.children_names = request.form.get("children_names", "").strip() or None
        celebrity.profession = request.form.get("profession", "").strip() or None
        celebrity.net_worth = request.form.get("net_worth", "").strip() or None
        celebrity.debut_work = request.form.get("debut_work", "").strip() or None
        celebrity.total_works = request.form.get("total_works", "").strip() or None
        celebrity.awards_count_label = request.form.get("awards_count_label", "").strip() or None
        celebrity.mumbai_neighbourhood = request.form.get("mumbai_neighbourhood", "").strip() or None
        celebrity.mumbai_area_detail = request.form.get("mumbai_area_detail", "").strip() or None
        celebrity.mumbai_home_name = request.form.get("mumbai_home_name", "").strip() or None
        celebrity.neighbourhood_slug = request.form.get("neighbourhood_slug", "").strip() or None
        celebrity.neighbourhood_desc = request.form.get("neighbourhood_desc", "").strip() or None
        celebrity.bio_para_1 = request.form.get("bio_para_1", "").strip() or None
        celebrity.bio_para_2 = request.form.get("bio_para_2", "").strip() or None
        celebrity.bio_para_3 = request.form.get("bio_para_3", "").strip() or None
        celebrity.wikipedia_url = request.form.get("wikipedia_url", "").strip() or None
        celebrity.wikipedia_image_url = uploaded_celebrity_image or (request.form.get("wikipedia_image_url", "").strip() or None)
        celebrity.instagram_handle = request.form.get("instagram_handle", "").strip() or None
        celebrity.twitter_handle = request.form.get("twitter_handle", "").strip() or None

        for i in range(1, 7):
            year = request.form.get(f"work{i}_year", "").strip()
            title = request.form.get(f"work{i}_title", "").strip()
            role = request.form.get(f"work{i}_role", "").strip()
            badge = request.form.get(f"work{i}_badge", "").strip()
            setattr(celebrity, f"work{i}_year", int(year) if year else None)
            setattr(celebrity, f"work{i}_title", title or None)
            setattr(celebrity, f"work{i}_role", role or None)
            setattr(celebrity, f"work{i}_badge", badge or None)

        for i in range(1, 6):
            award = request.form.get(f"award{i}", "").strip()
            setattr(celebrity, f"award{i}", award or None)

        for i in range(1, 6):
            q_text = request.form.get(f"faq{i}_q", "").strip()
            a_text = request.form.get(f"faq{i}_a", "").strip()
            setattr(celebrity, f"faq{i}_q", q_text or None)
            setattr(celebrity, f"faq{i}_a", a_text or None)

        for i in range(1, 5):
            name = request.form.get(f"related{i}_name", "").strip()
            slug_rel = request.form.get(f"related{i}_slug", "").strip()
            emoji_rel = request.form.get(f"related{i}_emoji", "").strip()
            area_rel = request.form.get(f"related{i}_area", "").strip()
            setattr(celebrity, f"related{i}_name", name or None)
            setattr(celebrity, f"related{i}_slug", slug_rel or None)
            setattr(celebrity, f"related{i}_emoji", emoji_rel or None)
            setattr(celebrity, f"related{i}_area", area_rel or None)

        db.session.commit()
        return redirect(url_for("admin.celebrities"))

    return render_template("admin/celebrities/form.html", celebrity=celebrity)


@admin_bp.route("/celebrities/<int:celebrity_id>/delete", methods=["POST"])
@admin_login_required
def delete_celebrity(celebrity_id):
    celebrity = Celebrity.query.get_or_404(celebrity_id)
    db.session.delete(celebrity)
    db.session.commit()
    return redirect(url_for("admin.celebrities"))


# ===================================================================
# LOST & FOUND LISTINGS (admin CRUD)
# ===================================================================

@admin_bp.route("/lost-found")
@admin_login_required
def lost_found_listings():
    q = LostFoundListing.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(LostFoundListing.item_name.ilike(f"%{search}%"))

    type_filter = request.args.get("type", "").strip()
    if type_filter in ("lost", "found"):
        q = q.filter(LostFoundListing.type == type_filter)

    status_filter = request.args.get("status", "").strip()
    if status_filter:
        q = q.filter(LostFoundListing.status == status_filter)

    q = q.order_by(LostFoundListing.created_at.desc())

    pagination = paginate(q)
    return render_template(
        "admin/lost_found/list.html",
        listings=pagination.items,
        pagination=pagination,
        search=search,
        type_filter=type_filter,
        status_filter=status_filter,
    )


@admin_bp.route("/lost-found/<int:listing_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_lost_found(listing_id):
    listing = LostFoundListing.query.get_or_404(listing_id)

    if request.method == "POST":
        listing.type = request.form.get("type", listing.type)
        listing.item_name = request.form.get("item_name", "").strip()
        listing.category = request.form.get("category", "").strip()
        listing.area = request.form.get("area", "").strip()

        date_str = request.form.get("date_lost_found", "").strip()
        if date_str:
            try:
                listing.date_lost_found = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                pass
        else:
            listing.date_lost_found = None

        listing.description = request.form.get("description", "").strip() or None
        listing.reporter_name = request.form.get("reporter_name", "").strip()
        listing.contact_info = request.form.get("contact_info", "").strip()
        listing.handover = request.form.get("handover", "").strip() or None
        listing.handover_location = request.form.get("handover_location", "").strip() or None
        listing.status = request.form.get("status", "open")
        listing.is_active = bool(request.form.get("is_active"))

        db.session.commit()
        return redirect(url_for("admin.lost_found_listings"))

    return render_template("admin/lost_found/form.html", listing=listing)


@admin_bp.route("/lost-found/<int:listing_id>/delete", methods=["POST"])
@admin_login_required
def delete_lost_found(listing_id):
    listing = LostFoundListing.query.get_or_404(listing_id)
    db.session.delete(listing)
    db.session.commit()
    return redirect(url_for("admin.lost_found_listings"))


# ===================================================================
# REVIEWS (admin CRUD)
# ===================================================================

@admin_bp.route("/reviews")
@admin_login_required
def reviews():
    q = Review.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(
            db.or_(
                Review.entity.ilike(f"%{search}%"),
                Review.review.ilike(f"%{search}%"),
                Review.title.ilike(f"%{search}%"),
            )
        )

    category_filter = request.args.get("category", "").strip()
    if category_filter:
        q = q.filter(Review.category == category_filter)

    area_filter = request.args.get("area", "").strip()
    if area_filter:
        q = q.filter(Review.area == area_filter)

    approved_filter = request.args.get("approved", "").strip()
    if approved_filter == "yes":
        q = q.filter(Review.is_approved.is_(True))
    elif approved_filter == "no":
        q = q.filter(Review.is_approved.is_(False))

    q = q.order_by(Review.created_at.desc())

    pagination = paginate(q)
    return render_template(
        "admin/reviews/list.html",
        reviews=pagination.items,
        pagination=pagination,
        search=search,
        category_filter=category_filter,
        area_filter=area_filter,
        approved_filter=approved_filter,
    )


@admin_bp.route("/reviews/<int:review_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_review(review_id):
    review = Review.query.get_or_404(review_id)

    if request.method == "POST":
        review.is_approved = bool(request.form.get("is_approved"))
        db.session.commit()
        return redirect(url_for("admin.reviews"))

    return render_template("admin/reviews/form.html", review=review)


@admin_bp.route("/reviews/<int:review_id>/delete", methods=["POST"])
@admin_login_required
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    return redirect(url_for("admin.reviews"))


# ===================================================================
# VOICE TOPICS (admin CRUD)
# ===================================================================

@admin_bp.route("/voice")
@admin_login_required
def voice_topics():
    q = VoiceTopic.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(VoiceTopic.title.ilike(f"%{search}%"))

    type_filter = request.args.get("type", "").strip()
    if type_filter:
        q = q.filter(VoiceTopic.type == type_filter)

    category_filter = request.args.get("category", "").strip()
    if category_filter:
        q = q.filter(VoiceTopic.category == category_filter)

    status_filter = request.args.get("status", "").strip()
    if status_filter:
        q = q.filter(VoiceTopic.status == status_filter)

    q = q.order_by(VoiceTopic.created_at.desc())

    pagination = paginate(q)
    return render_template(
        "admin/voice/list.html",
        topics=pagination.items,
        pagination=pagination,
        search=search,
        type_filter=type_filter,
        category_filter=category_filter,
        status_filter=status_filter,
    )


@admin_bp.route("/voice/<int:topic_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_voice_topic(topic_id):
    topic = VoiceTopic.query.get_or_404(topic_id)

    if request.method == "POST":
        topic.type = request.form.get("type", topic.type)
        topic.title = request.form.get("title", "").strip()
        topic.description = request.form.get("description", "").strip() or None
        topic.area = request.form.get("area", "").strip()
        topic.category = request.form.get("category", "").strip() or None
        topic.bmc_subcategory = request.form.get("bmc_subcategory", "").strip() or None
        topic.status = request.form.get("status", "pending")
        topic.is_active = bool(request.form.get("is_active"))
        topic.urgency = bool(request.form.get("urgency"))

        db.session.commit()
        return redirect(url_for("admin.voice_topics"))

    return render_template("admin/voice/form.html", topic=topic)


@admin_bp.route("/voice/<int:topic_id>/delete", methods=["POST"])
@admin_login_required
def delete_voice_topic(topic_id):
    topic = VoiceTopic.query.get_or_404(topic_id)
    db.session.delete(topic)
    db.session.commit()
    return redirect(url_for("admin.voice_topics"))


# ===================================================================
# FORUM QUESTIONS (admin CRUD)
# ===================================================================

@admin_bp.route("/forum")
@admin_login_required
def forum_questions():
    q = ForumQuestion.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(ForumQuestion.title.ilike(f"%{search}%"))

    category_filter = request.args.get("category", "").strip()
    if category_filter:
        q = q.filter(ForumQuestion.category == category_filter)

    approved_filter = request.args.get("approved", "").strip()
    if approved_filter == "yes":
        q = q.filter(ForumQuestion.is_approved.is_(True))
    elif approved_filter == "no":
        q = q.filter(ForumQuestion.is_approved.is_(False))

    q = q.order_by(ForumQuestion.created_at.desc())

    pagination = paginate(q)
    return render_template(
        "admin/forum/list.html",
        questions=pagination.items,
        pagination=pagination,
        search=search,
        category_filter=category_filter,
        approved_filter=approved_filter,
    )


@admin_bp.route("/forum/<int:question_id>/edit", methods=["GET", "POST"])
@admin_login_required
def edit_forum_question(question_id):
    question = ForumQuestion.query.get_or_404(question_id)

    if request.method == "POST":
        question.title = request.form.get("title", "").strip()
        question.category = request.form.get("category", "").strip() or None
        question.area = request.form.get("area", "").strip() or None
        question.author_name = request.form.get("author_name", "").strip() or None
        question.body = request.form.get("body", "").strip() or None
        question.is_approved = bool(request.form.get("is_approved"))
        question.is_active = bool(request.form.get("is_active"))

        db.session.commit()
        return redirect(url_for("admin.forum_questions"))

    answers = question.answers.order_by(ForumAnswer.created_at.desc()).all()
    return render_template("admin/forum/form.html", question=question, answers=answers)


@admin_bp.route("/forum/<int:question_id>/delete", methods=["POST"])
@admin_login_required
def delete_forum_question(question_id):
    question = ForumQuestion.query.get_or_404(question_id)
    db.session.delete(question)
    db.session.commit()
    return redirect(url_for("admin.forum_questions"))


# ===================================================================
# EMAIL LOGS (read-only)
# ===================================================================

@admin_bp.route("/email-logs")
@admin_login_required
def email_logs():
    q = EmailLog.query

    search = request.args.get("q", "").strip()
    if search:
        q = q.filter(EmailLog.to_email.ilike(f"%{search}%"))

    status_filter = request.args.get("status", "").strip()
    if status_filter:
        q = q.filter(EmailLog.status == status_filter)

    q = q.order_by(EmailLog.created_at.desc())

    pagination = paginate(q)
    return render_template(
        "admin/email_logs/list.html",
        logs=pagination.items,
        pagination=pagination,
        search=search,
        status_filter=status_filter,
    )

