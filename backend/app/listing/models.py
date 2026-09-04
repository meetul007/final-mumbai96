from datetime import datetime, timedelta, date
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
import secrets


class BusinessUser(db.Model):
    __tablename__ = "business_users"

    id = db.Column(db.Integer, primary_key=True)

    fname = db.Column(db.String(120), nullable=True)
    lname = db.Column(db.String(120), nullable=True)
    area = db.Column(db.String(120), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)

    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    is_verified = db.Column(db.Boolean, default=False)
    verification_token = db.Column(db.String(255), nullable=True)
    verification_token_expiry = db.Column(db.DateTime, nullable=True)

    verification_token_sent_at = db.Column(db.DateTime, nullable=True)

    reset_token = db.Column(db.String(255), nullable=True)
    reset_token_expiry = db.Column(db.DateTime, nullable=True)
    reset_token_sent_at = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_verification_token(self):
        self.verification_token = secrets.token_urlsafe(32)
        self.verification_token_expiry = datetime.utcnow() + timedelta(hours=24)
        self.verification_token_sent_at = datetime.utcnow()

    def generate_reset_token(self):
        self.reset_token = secrets.token_urlsafe(32)
        self.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
        self.reset_token_sent_at = datetime.utcnow()


class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), nullable=False, unique=True)

    parent_id = db.Column(
        db.Integer,
        db.ForeignKey("locations.id"),
        nullable=True
    )

    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

    seo_title = db.Column(db.String(255))
    seo_description = db.Column(db.Text)

    is_active = db.Column(db.Boolean, default=True)

    parent = db.relationship(
        "Location",
        remote_side=[id],
        backref="children"
    )
    about = db.Column(db.Text, nullable=True)
    population = db.Column(db.String(20), nullable=True)
    municipal_body = db.Column(db.String(200), nullable=True)
    location_image = db.Column(db.String(255))
    travelling_connectivity = db.Column(db.JSON, nullable=True)
    living_style = db.Column(db.JSON, nullable=True)
    nearby_locations = db.Column(db.JSON, nullable=True)
    best_services = db.Column(db.JSON, nullable=True)
    food = db.Column(db.JSON, nullable=True)
    places_to_visit = db.Column(db.JSON, nullable=True)
    night_life = db.Column(db.JSON, nullable=True)
    location_icon = db.Column(db.String(255))

    # ---- New Guide Section Columns ----
    character_vibe = db.Column(db.JSON, nullable=True)           # editorial: vibe description, keywords, etc.
    resident_profile = db.Column(db.JSON, nullable=True)         # editorial: who lives here, demographics
    sub_areas = db.Column(db.JSON, nullable=True)                # Excel: [{name, tag, description}]
    property_prices = db.Column(db.JSON, nullable=True)          # Excel: [{type, price, sub_area, rental}]
    schools = db.Column(db.JSON, nullable=True)                  # Excel: [{name, board}]
    hospitals = db.Column(db.JSON, nullable=True)                # Excel: [{name, type}]
    major_employers = db.Column(db.JSON, nullable=True)          # Excel: [{name, sector}]
    food_tags = db.Column(db.Text, nullable=True)                # Excel: comma-separated food tags
    local_events = db.Column(db.JSON, nullable=True)             # editorial: [{name, date, description}]
    upcoming_projects = db.Column(db.JSON, nullable=True)        # editorial: [{name, developer, status, description}]
    residential_societies = db.Column(db.JSON, nullable=True)    # editorial: [{name, type, description}]
    faq = db.Column(db.JSON, nullable=True)                      # Excel: [{question, answer}]
    civic_data = db.Column(db.JSON, nullable=True)               # Excel: {ward, assembly_constituency, lok_sabha, police_station}
    area_report_card = db.Column(db.JSON, nullable=True)         # editorial: {safety, cleanliness, green, transit, overall}
    seo_keywords = db.Column(db.Text, nullable=True)             # Excel: comma-separated keywords


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), nullable=False, unique=True)

    image_path = db.Column(db.String(255))

    seo_title = db.Column(db.String(255))
    seo_description = db.Column(db.Text)
    seo_keywords = db.Column(db.Text)
    trending_score = db.Column(db.Integer, default=0)
    hot_score = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)

    emoji = db.Column(db.String(20), nullable=True)
    google_places_api_type = db.Column(db.String(100), nullable=True)


class Business(db.Model):
    __tablename__ = "businesses"

    id = db.Column(db.Integer, primary_key=True)


    name = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(160), nullable=False, unique=True)
    google_place_id = db.Column(db.String(255), unique=True, nullable=True)

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=False
    )

    description = db.Column(db.Text)
    website = db.Column(db.String(255))
    logo = db.Column(db.String(255))

    rating = db.Column(db.Float, default=0)
    review_count = db.Column(db.Integer, default=0)

    social_links = db.Column(db.JSON)

    is_active = db.Column(db.Boolean, default=True)

    category = db.relationship("Category", lazy="joined")

    owner_id = db.Column(
        db.Integer,
        db.ForeignKey("business_users.id")
    )

    owner = db.relationship("BusinessUser")


class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)

    business_id = db.Column(
        db.Integer,
        db.ForeignKey("businesses.id"),
        nullable=False
    )

    location_id = db.Column(
        db.Integer,
        db.ForeignKey("locations.id"),
        nullable=False
    )

    address = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))

    gallery = db.Column(db.JSON)
    opening_hours = db.Column(db.JSON)
    services = db.Column(db.JSON)
    features = db.Column(db.JSON)
    about = db.Column(db.Text)
    banner_image = db.Column(db.String(255), nullable=True)
    google_map_url = db.Column(db.String(500))

    is_published = db.Column(db.Boolean, default=False)

    business = db.relationship("Business", lazy="joined")
    location = db.relationship("Location", lazy="joined")

    __table_args__ = (
        db.UniqueConstraint(
            "business_id", "location_id",
            name="uq_business_location"
        ),
    )


class SeoAliasSlug(db.Model):
    __tablename__ = "seo_alias_slugs"

    id = db.Column(db.Integer, primary_key=True)

    slug = db.Column(db.String(255), nullable=False, unique=True)

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=False
    )

    location_id = db.Column(
        db.Integer,
        db.ForeignKey("locations.id"),
        nullable=False
    )

    canonical_location_id = db.Column(
        db.Integer,
        db.ForeignKey("locations.id"),
        nullable=False
    )

    canonical_category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=False
    )

    is_active = db.Column(db.Boolean, default=True)

    category = db.relationship(
        "Category",
        foreign_keys=[category_id]
    )

    location = db.relationship(
        "Location",
        foreign_keys=[location_id]
    )

    canonical_location = db.relationship(
        "Location",
        foreign_keys=[canonical_location_id]
    )

    canonical_category = db.relationship(
        "Category",
        foreign_keys=[canonical_category_id]
    )


class BusinessImage(db.Model):
    __tablename__ = "business_images"

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(
        db.Integer,
        db.ForeignKey("businesses.id"),
        nullable=False
    )

    image_path = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255), nullable=True)
    is_primary = db.Column(db.Boolean, default=False)
    sort_order = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    business = db.relationship(
        "Business",
        backref=db.backref("images", cascade="all, delete-orphan")
    )


class LocationCategory(db.Model):
    __tablename__ = "location_category"

    id = db.Column(db.Integer, primary_key=True)

    location_id = db.Column(
        db.Integer,
        db.ForeignKey("locations.id"),
        nullable=False
    )

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=False
    )

    image_path = db.Column(db.String(255))
    location = db.relationship("Location")
    category = db.relationship("Category")
    name = db.Column(db.String(120), nullable=True)
    description = db.Column(db.Text)
    seo_description = db.Column(db.Text)
    seo_slug = db.Column(db.String(120), nullable=False, unique=True)

    __table_args__ = (
        db.UniqueConstraint(
            "location_id", "category_id",
            name="uq_location_category"
        ),
    )


class Blog(db.Model):
    __tablename__ = "blogs"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)

    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.Text)
    toc = db.Column(db.JSON, nullable=True)

    featured_image = db.Column(db.String(255))

    # 👇 AUTHOR
    author_name = db.Column(db.String(120))
    author_bio = db.Column(db.Text)
    author_tagline = db.Column(db.String(255))
    author_image = db.Column(db.String(255))

    # 👇 SEO
    seo_title = db.Column(db.String(255))
    seo_description = db.Column(db.Text)

    # 👇 NEW FEATURES
    reading_time = db.Column(db.Integer)  # in minutes
    hashtags = db.Column(db.JSON)         # ["dentist", "mumbai"]
    total_views = db.Column(db.Integer, default=0)

    is_published = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class NewsletterSubscriber(db.Model):
    __tablename__ = "newsletter_subscribers"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Subscriber {self.email}>"


class Celebrity(db.Model):
    __tablename__ = "celebrities"

    id = db.Column(db.Integer, primary_key=True)

    # Identity
    slug = db.Column(db.String(200), unique=True, nullable=False, index=True)
    full_name = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    emoji = db.Column(db.String(10), nullable=True)

    # Classification
    category = db.Column(db.String(80), nullable=False, index=True)
    subcategory = db.Column(db.String(120), nullable=True)

    # SEO
    page_title = db.Column(db.String(300))
    meta_description = db.Column(db.Text)
    meta_keywords = db.Column(db.Text)
    og_title = db.Column(db.String(300))
    og_description = db.Column(db.Text)
    canonical_url = db.Column(db.String(400))
    schema_alternate_names = db.Column(db.String(300))

    # Profile
    hero_tag = db.Column(db.String(120))
    name_line1 = db.Column(db.String(120))
    name_line2 = db.Column(db.String(120))
    subtitle = db.Column(db.String(255))
    date_of_birth = db.Column(db.String(50))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    birth_city = db.Column(db.String(120))
    nationality = db.Column(db.String(60))
    religion = db.Column(db.String(60))
    marital_status = db.Column(db.String(40))
    spouse = db.Column(db.String(150))
    children_count = db.Column(db.Integer)
    children_names = db.Column(db.String(300))
    profession = db.Column(db.String(200))
    net_worth = db.Column(db.String(50))
    debut_work = db.Column(db.String(200))
    total_works = db.Column(db.String(50))
    awards_count_label = db.Column(db.String(100))

    # Mumbai Connection
    mumbai_neighbourhood = db.Column(db.String(120))
    mumbai_area_detail = db.Column(db.String(255))
    mumbai_home_name = db.Column(db.String(120))
    neighbourhood_slug = db.Column(db.String(120))
    neighbourhood_desc = db.Column(db.Text)

    # Bio
    bio_para_1 = db.Column(db.Text)
    bio_para_2 = db.Column(db.Text)
    bio_para_3 = db.Column(db.Text)

    # Notable Works (up to 6)
    work1_year = db.Column(db.Integer)
    work1_title = db.Column(db.String(200))
    work1_role = db.Column(db.String(200))
    work1_badge = db.Column(db.String(200))

    work2_year = db.Column(db.Integer)
    work2_title = db.Column(db.String(200))
    work2_role = db.Column(db.String(200))
    work2_badge = db.Column(db.String(200))

    work3_year = db.Column(db.Integer)
    work3_title = db.Column(db.String(200))
    work3_role = db.Column(db.String(200))
    work3_badge = db.Column(db.String(200))

    work4_year = db.Column(db.Integer)
    work4_title = db.Column(db.String(200))
    work4_role = db.Column(db.String(200))
    work4_badge = db.Column(db.String(200))

    work5_year = db.Column(db.Integer)
    work5_title = db.Column(db.String(200))
    work5_role = db.Column(db.String(200))
    work5_badge = db.Column(db.String(200))

    work6_year = db.Column(db.Integer)
    work6_title = db.Column(db.String(200))
    work6_role = db.Column(db.String(200))
    work6_badge = db.Column(db.String(200))

    # Awards (up to 5)
    award1 = db.Column(db.String(200))
    award2 = db.Column(db.String(200))
    award3 = db.Column(db.String(200))
    award4 = db.Column(db.String(200))
    award5 = db.Column(db.String(200))

    # FAQ (up to 5)
    faq1_q = db.Column(db.Text)
    faq1_a = db.Column(db.Text)
    faq2_q = db.Column(db.Text)
    faq2_a = db.Column(db.Text)
    faq3_q = db.Column(db.Text)
    faq3_a = db.Column(db.Text)
    faq4_q = db.Column(db.Text)
    faq4_a = db.Column(db.Text)
    faq5_q = db.Column(db.Text)
    faq5_a = db.Column(db.Text)

    # Related Celebs (4)
    related1_name = db.Column(db.String(150))
    related1_slug = db.Column(db.String(150))
    related1_emoji = db.Column(db.String(10))
    related1_area = db.Column(db.String(120))

    related2_name = db.Column(db.String(150))
    related2_slug = db.Column(db.String(150))
    related2_emoji = db.Column(db.String(10))
    related2_area = db.Column(db.String(120))

    related3_name = db.Column(db.String(150))
    related3_slug = db.Column(db.String(150))
    related3_emoji = db.Column(db.String(10))
    related3_area = db.Column(db.String(120))

    related4_name = db.Column(db.String(150))
    related4_slug = db.Column(db.String(150))
    related4_emoji = db.Column(db.String(10))
    related4_area = db.Column(db.String(120))

    # Social & External
    wikipedia_url = db.Column(db.String(400))
    wikipedia_image_url = db.Column(db.String(500))
    instagram_handle = db.Column(db.String(120))
    twitter_handle = db.Column(db.String(120))

    # Metadata
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def _compute_age(self):
        """Calculate age dynamically from date_of_birth. Falls back to stored self.age if parsing fails."""
        if not self.date_of_birth:
            return self.age

        dob_str = str(self.date_of_birth).strip()

        # Try common date formats
        for fmt in ("%d %B %Y", "%B %d %Y", "%B %d, %Y", "%Y-%m-%d", "%m/%d/%Y", "%d/%m/%Y"):
            try:
                dob = datetime.strptime(dob_str, fmt).date()
                break
            except ValueError:
                continue
        else:
            # Could not parse — fall back to stored value
            return self.age

        today = date.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        return age

    def to_dict(self, include_bio=False, include_works=False, include_faqs=False):
        data = {
            "id": self.id,
            "slug": self.slug,
            "full_name": self.full_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "emoji": self.emoji,
            "category": self.category,
            "subcategory": self.subcategory,
            "mumbai_neighbourhood": self.mumbai_neighbourhood,
            "mumbai_area_detail": self.mumbai_area_detail,
            "mumbai_home_name": self.mumbai_home_name,
            "age": self._compute_age(),
            "gender": self.gender,
            "profession": self.profession,
            "date_of_birth": self.date_of_birth,
            "marital_status": self.marital_status,
            "spouse": self.spouse,
            "children_count": self.children_count,
            "children_names": self.children_names,
            "birth_city": self.birth_city,
            "nationality": self.nationality,
            "religion": self.religion,
            "net_worth": self.net_worth,
            "debut_work": self.debut_work,
            "total_works": self.total_works,
            "awards_count_label": self.awards_count_label,
            "hero_tag": self.hero_tag,
            "name_line1": self.name_line1,
            "name_line2": self.name_line2,
            "subtitle": self.subtitle,
            "page_title": self.page_title,
            "meta_description": self.meta_description,
            "meta_keywords": self.meta_keywords,
            "og_title": self.og_title,
            "og_description": self.og_description,
            "canonical_url": self.canonical_url,
            "schema_alternate_names": self.schema_alternate_names,
            "wikipedia_url": self.wikipedia_url,
            "wikipedia_image_url": self.wikipedia_image_url,
            "instagram_handle": self.instagram_handle,
            "twitter_handle": self.twitter_handle,
            "neighbourhood_slug": self.neighbourhood_slug,
            "neighbourhood_desc": self.neighbourhood_desc,
        }

        if include_bio:
            data["bio_para_1"] = self.bio_para_1
            data["bio_para_2"] = self.bio_para_2
            data["bio_para_3"] = self.bio_para_3

        if include_works:
            works = []
            for i in range(1, 7):
                year = getattr(self, f"work{i}_year")
                title = getattr(self, f"work{i}_title")
                role = getattr(self, f"work{i}_role")
                badge = getattr(self, f"work{i}_badge")
                if title:
                    works.append({
                        "year": year,
                        "title": title,
                        "role": role,
                        "badge": badge,
                    })
            data["works"] = works

            awards = []
            for i in range(1, 6):
                award = getattr(self, f"award{i}")
                if award:
                    awards.append(award)
            data["awards"] = awards

        if include_faqs:
            faqs = []
            for i in range(1, 6):
                q = getattr(self, f"faq{i}_q")
                a = getattr(self, f"faq{i}_a")
                if q and a:
                    faqs.append({"question": q, "answer": a})
            data["faqs"] = faqs

        # Related celebs
        related = []
        for i in range(1, 5):
            name = getattr(self, f"related{i}_name")
            slug = getattr(self, f"related{i}_slug")
            emoji = getattr(self, f"related{i}_emoji")
            area = getattr(self, f"related{i}_area")
            if name and slug:
                related.append({
                    "name": name,
                    "slug": slug,
                    "emoji": emoji,
                    "area": area,
                })
        data["related"] = related

        return data

    def __repr__(self):
        return f"<Celebrity {self.full_name}>"


class LostFoundListing(db.Model):
    __tablename__ = "lost_found_listings"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10), nullable=False)
    item_name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    area = db.Column(db.String(100), nullable=False)
    date_lost_found = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)
    reporter_name = db.Column(db.String(120), nullable=False)
    contact_info = db.Column(db.String(255), nullable=False)
    handover = db.Column(db.String(20), nullable=True)
    handover_location = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(20), default="open")
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self, include_contact=False):
        data = {
            "id": self.id,
            "type": self.type,
            "item_name": self.item_name,
            "category": self.category,
            "area": self.area,
            "date_lost_found": self.date_lost_found.isoformat() if self.date_lost_found else None,
            "description": self.description,
            "reporter_name": self.reporter_name,
            "handover": self.handover,
            "handover_location": self.handover_location,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
        if include_contact:
            data["contact_info"] = self.contact_info
        return data

    def __repr__(self):
        return f"<LostFoundListing #{self.id} {self.type}: {self.item_name}>"


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    entity = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    area = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    review = db.Column(db.Text, nullable=False)
    reviewer_name = db.Column(db.String(120), nullable=False)
    contact = db.Column(db.String(255), nullable=True)
    amount = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    helpful_count = db.Column(db.Integer, default=0)
    is_approved = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    external_review_id = db.Column(db.String(255), unique=True, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "entity": self.entity,
            "category": self.category,
            "area": self.area,
            "rating": self.rating,
            "title": self.title,
            "review": self.review,
            "reviewer_name": self.reviewer_name,
            "amount": self.amount,
            "image_url": self.image_url,
            "helpful_count": self.helpful_count,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<Review #{self.id} {self.entity}>"


class VoiceTopic(db.Model):
    __tablename__ = "voice_topics"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    area = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=True)
    bmc_subcategory = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    urgency = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20), default="pending")
    is_pinned = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    upvotes = db.Column(db.Integer, default=0)
    views = db.Column(db.Integer, default=0)
    reporter_name = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    poll_options = db.relationship("PollOption", backref="topic", lazy="dynamic", cascade="all, delete-orphan")
    comments = db.relationship("VoiceComment", backref="topic", lazy="dynamic", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "title": self.title,
            "description": self.description,
            "area": self.area,
            "category": self.category,
            "bmc_subcategory": self.bmc_subcategory,
            "image_url": self.image_url,
            "urgency": self.urgency,
            "status": self.status,
            "is_pinned": self.is_pinned,
            "upvotes": self.upvotes,
            "views": self.views,
            "reporter_name": self.reporter_name,
            "comment_count": self.comments.count(),
            "poll_options": [o.to_dict() for o in self.poll_options.all()] if self.type == "poll" else [],
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<VoiceTopic #{self.id} {self.type}: {self.title}>"


class PollOption(db.Model):
    __tablename__ = "poll_options"

    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey("voice_topics.id"), nullable=False)
    emoji = db.Column(db.String(10), nullable=True, default="✅")
    label = db.Column(db.String(255), nullable=False)
    votes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "emoji": self.emoji,
            "label": self.label,
            "votes": self.votes,
        }

    def __repr__(self):
        return f"<PollOption #{self.id}: {self.label}>"


class VoiceComment(db.Model):
    __tablename__ = "voice_comments"

    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey("voice_topics.id"), nullable=False)
    author_name = db.Column(db.String(120), nullable=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "author_name": self.author_name,
            "text": self.text,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<VoiceComment #{self.id}>"


class ForumQuestion(db.Model):
    __tablename__ = "forum_questions"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100), nullable=True)
    area = db.Column(db.String(100), nullable=True)
    author_name = db.Column(db.String(120), nullable=True)
    body = db.Column(db.Text, nullable=True)
    helpful_count = db.Column(db.Integer, default=0)
    is_approved = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    answers = db.relationship("ForumAnswer", backref="question", lazy="dynamic", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "area": self.area,
            "author_name": self.author_name,
            "body": self.body,
            "helpful_count": self.helpful_count,
            "is_approved": self.is_approved,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "answers": [a.to_dict() for a in self.answers.order_by(ForumAnswer.helpful_count.desc(), ForumAnswer.created_at.asc()).all()],
        }

    def __repr__(self):
        return f"<ForumQuestion #{self.id}: {self.title}>"


class ForumAnswer(db.Model):
    __tablename__ = "forum_answers"

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey("forum_questions.id"), nullable=False)
    author_name = db.Column(db.String(120), nullable=True)
    text = db.Column(db.Text, nullable=False)
    helpful_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "author_name": self.author_name,
            "text": self.text,
            "helpful_count": self.helpful_count,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<ForumAnswer #{self.id}>"


class EmailLog(db.Model):
    __tablename__ = "email_logs"

    id = db.Column(db.Integer, primary_key=True)
    to_email = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    response_code = db.Column(db.Integer, nullable=True)
    error_message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<EmailLog #{self.id} to={self.to_email} status={self.status}>"
