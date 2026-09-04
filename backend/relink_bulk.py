"""
Bulk version of the image relink: does it all in one SQL statement
instead of a per-row Python loop. Only touches businesses that still
have zero images (safe to re-run, skips anything already done).

Usage:
    PYTHONPATH=. python3 relink_bulk.py
"""
from app import create_app
from app.extensions import db

app = create_app()
app.app_context().push()

print("Relinking images (single bulk statement)...", flush=True)

result = db.session.execute(db.text("""
    WITH best_match AS (
        SELECT DISTINCT ON (new.id)
            new.id AS new_id,
            old.id AS old_id
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
    )
    UPDATE business_images bi
    SET business_id = bm.new_id
    FROM best_match bm
    WHERE bi.business_id = bm.old_id
"""))
db.session.commit()
print(f"Images relinked: {result.rowcount}", flush=True)

print("Backfilling missing logos...", flush=True)
result2 = db.session.execute(db.text("""
    WITH best_match AS (
        SELECT DISTINCT ON (new.id)
            new.id AS new_id,
            old.logo AS old_logo
        FROM businesses new
        JOIN businesses old ON lower(old.name) = lower(new.name)
            AND old.is_active = false
            AND old.google_place_id IS NULL
            AND old.id != new.id
            AND old.logo IS NOT NULL
        WHERE new.is_active = true
          AND new.google_place_id IS NOT NULL
          AND new.logo IS NULL
        ORDER BY new.id
    )
    UPDATE businesses b
    SET logo = bm.old_logo
    FROM best_match bm
    WHERE b.id = bm.new_id
"""))
db.session.commit()
print(f"Logos backfilled: {result2.rowcount}", flush=True)

print("DONE", flush=True)
