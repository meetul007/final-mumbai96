from app import create_app
from app.extensions import db
from app.listing.models import (
    Location, Category, Business, Listing, SeoAliasSlug
)

app = create_app()


with app.app_context():
    print("⚠️ Deleting existing data...")

    # Order matters because of FK constraints
    db.session.query(SeoAliasSlug).delete()
    db.session.query(Listing).delete()
    db.session.query(Business).delete()
    db.session.query(Category).delete()
    db.session.query(Location).delete()

    db.session.commit()

    print("✅ All data deleted (schema intact)")

    # ---------- LOCATIONS (FULL HIERARCHY) ----------
    mumbai = Location(name="Mumbai", slug="mumbai")

    borivali = Location(name="Borivali", slug="borivali", parent=mumbai)
    borivali_w = Location(name="Borivali West", slug="borivali-west", parent=borivali)
    borivali_e = Location(name="Borivali East", slug="borivali-east", parent=borivali)

    andheri = Location(name="Andheri", slug="andheri", parent=mumbai)
    andheri_w = Location(name="Andheri West", slug="andheri-west", parent=andheri)
    andheri_e = Location(name="Andheri East", slug="andheri-east", parent=andheri)

    db.session.add_all([
        mumbai,
        borivali, borivali_w, borivali_e,
        andheri, andheri_w, andheri_e
    ])

    # ---------- CATEGORIES ----------
    gym = Category(
        name="Gym",
        slug="gym",
        seo_description="Find the best gyms with trainers and modern equipment"
    )

    dentist = Category(
        name="Dentist",
        slug="dentist",
        seo_description="Top-rated dentists with affordable treatments"
    )

    db.session.add_all([gym, dentist])
    db.session.commit()

    # ---------- BUSINESSES ----------
    gold = Business(
        name="Gold Gym Borivali",
        slug="gold-gym-borivali",
        category=gym,
        rating=4.6,
        review_count=215
    )

    fitness = Business(
        name="Fitness First Andheri",
        slug="fitness-first-andheri",
        category=gym,
        rating=4.4,
        review_count=180
    )

    smile = Business(
        name="Smile Care Dental Clinic",
        slug="smile-care-dental-clinic",
        category=dentist,
        rating=4.8,
        review_count=320
    )

    db.session.add_all([gold, fitness, smile])
    db.session.commit()

    # ---------- LISTINGS ----------
    db.session.add_all([
        Listing(
            business=gold,
            location=borivali_w,
            address="Link Road, Borivali West",
            is_published=True
        ),
        Listing(
            business=fitness,
            location=andheri_w,
            address="SV Road, Andheri West",
            is_published=True
        ),
        Listing(
            business=smile,
            location=borivali_w,
            address="IC Colony, Borivali West",
            is_published=True
        ),
        Listing(
            business=smile,
            location=borivali_e,
            address="Borivali East",
            is_published=True
        ),
    ])

    db.session.commit()

    # ---------- SEO ALIAS SLUGS ----------
    db.session.add_all([
        SeoAliasSlug(
            slug="gym-in-borivali",
            category=gym,
            location=borivali,
            canonical_category=gym,
            canonical_location=borivali
        ),
        SeoAliasSlug(
            slug="gym-in-borivali-west",
            category=gym,
            location=borivali_w,
            canonical_category=gym,
            canonical_location=borivali_w
        ),
        SeoAliasSlug(
            slug="dentist-in-borivali",
            category=dentist,
            location=borivali,
            canonical_category=dentist,
            canonical_location=borivali
        ),
        SeoAliasSlug(
            slug="dentist-in-borivali-west",
            category=dentist,
            location=borivali_w,
            canonical_category=dentist,
            canonical_location=borivali_w
        ),
        SeoAliasSlug(
            slug="gym-in-andheri",
            category=gym,
            location=andheri,
            canonical_category=gym,
            canonical_location=andheri
        ),
        SeoAliasSlug(
            slug="gym-in-andheri-west",
            category=gym,
            location=andheri_w,
            canonical_category=gym,
            canonical_location=andheri_w
        ),
        SeoAliasSlug(
            slug="gym-in-andheri-east",
            category=gym,
            location=andheri_w,
            canonical_category=gym,
            canonical_location=andheri_w
        ),
    ])

    db.session.commit()

    print("✅ FULL sample data inserted successfully")