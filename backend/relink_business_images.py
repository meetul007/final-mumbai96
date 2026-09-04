"""
Relinks business_images (and logo) from old, deactivated duplicate
businesses to the correct active business that replaced them. The
images were never lost - they're just still attached to the old rows.

For each active business with zero images, finds the best-matching
inactive counterpart (by name, picking the one with the most images
if there are several) and moves its images + logo over in one go.

Usage:
    PYTHONPATH=. python3 relink_business_images.py
"""
from app import create_app
from app.extensions import db

app = create_app()
app.app_context().push()

print("Finding active businesses with no images and their best old-image source...", flush=True)

pairs = db.session.execute(db.text("""
    SELECT DISTINCT ON (new.id)
        new.id AS new_id,
        old.id AS old_id,
        old.logo AS old_logo,
        img_count.cnt AS image_count
    FROM businesses new
    JOIN businesses old ON lower(old.name) = lower(new.name)
        AND old.is_active = false
        AND old.google_place_id IS NULL
        AND old.id != new.id
    JOIN (
        SELECT business_id, count(*) AS cnt
        FROM business_images
        GROUP BY business_id
    ) img_count ON img_count.business_id = old.id
    WHERE new.is_active = true
      AND new.google_place_id IS NOT NULL
      AND NOT EXISTS (
          SELECT 1 FROM business_images bi WHERE bi.business_id = new.id
      )
    ORDER BY new.id, img_count.cnt DESC
"""))
pairs = pairs.fetchall()
db.session.commit()

print(f"Found {len(pairs)} businesses to relink.", flush=True)

relinked = 0
skipped = 0
processed = 0

for row in pairs:
    processed += 1
    savepoint = db.session.begin_nested()
    try:
        db.session.execute(
            db.text("UPDATE business_images SET business_id = :new_id WHERE business_id = :old_id"),
            {"new_id": row.new_id, "old_id": row.old_id},
        )
        if row.old_logo:
            db.session.execute(
                db.text("UPDATE businesses SET logo = :logo WHERE id = :id AND logo IS NULL"),
                {"logo": row.old_logo, "id": row.new_id},
            )
        savepoint.commit()
        relinked += 1
    except Exception:
        savepoint.rollback()
        skipped += 1

    if processed % 2000 == 0:
        db.session.commit()
        print(f"  ...processed {processed}/{len(pairs)} (relinked={relinked} skipped={skipped})", flush=True)

db.session.commit()

print("=" * 60, flush=True)
print("DONE", flush=True)
print(f"Total processed: {processed}", flush=True)
print(f"Relinked: {relinked}", flush=True)
print(f"Skipped: {skipped}", flush=True)
print("=" * 60, flush=True)
