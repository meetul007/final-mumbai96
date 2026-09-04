#!/usr/bin/env python3
"""
Backfill missing wikipedia_image_url values directly in the celebrities table.
Backs up the table first, then fetches images from Wikipedia for every row
that has a wikipedia_url but no wikipedia_image_url.

Usage:
  PGPASSWORD=xxx python3 backfill_celebrity_images.py
"""
import os, sys, subprocess, datetime, time
import psycopg2
import requests

DB_NAME  = "mumbai96"
DB_USER  = "mumbai96_user"
DB_HOST  = "localhost"
DB_PORT  = 5432
TABLE    = "celebrities"
BACKUP_DIR = os.path.expanduser("~/backups")

pw = os.environ.get("PGPASSWORD")
if not pw:
    sys.exit("Set PGPASSWORD env var first.")

# 1. BACKUP
os.makedirs(BACKUP_DIR, exist_ok=True)
ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
backup_file = f"{BACKUP_DIR}/{TABLE}_{ts}.sql"
subprocess.run(
    ["pg_dump", "-h", DB_HOST, "-U", DB_USER, "-t", TABLE, "-f", backup_file, DB_NAME],
    env={**os.environ, "PGPASSWORD": pw}, check=True
)
print(f"[backup] {backup_file}")

# 2. FIND ROWS STILL MISSING AN IMAGE
conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=pw, host=DB_HOST, port=DB_PORT)
cur = conn.cursor()
cur.execute(f"""
    SELECT id, slug, wikipedia_url FROM {TABLE}
    WHERE (wikipedia_image_url IS NULL OR wikipedia_image_url = '')
      AND wikipedia_url IS NOT NULL AND wikipedia_url != ''
    ORDER BY id
""")
rows = cur.fetchall()
print(f"[db] {len(rows)} celebrities still missing an image")

# 3. FETCH + UPDATE ONE AT A TIME
filled = 0
still_missing = []
for celeb_id, slug, wiki_url in rows:
    title = wiki_url.rsplit("/", 1)[-1]
    src = None
    for attempt in range(3):
        try:
            resp = requests.get(
                "https://en.wikipedia.org/w/api.php",
                params={"action": "query", "titles": title, "prop": "pageimages",
                        "format": "json", "pithumbsize": 500},
                headers={"User-Agent": "mumbai96-backfill/1.0 (contact: admin@mumbai96.com)"},
                timeout=15
            )
            data = resp.json()
            pages = data.get("query", {}).get("pages", {})
            for p in pages.values():
                src = p.get("thumbnail", {}).get("source")
            break
        except Exception as e:
            if attempt == 2:
                print(f"  [fail] {slug}: {e}")
            time.sleep(1)

    if src:
        cur.execute(f"UPDATE {TABLE} SET wikipedia_image_url = %s WHERE id = %s", (src, celeb_id))
        conn.commit()
        filled += 1
        print(f"  [ok] {slug}")
    else:
        still_missing.append(slug)
        print(f"  [no-image] {slug} (Wikipedia page has no photo)")

    time.sleep(0.5)  # be polite to Wikipedia's API

print(f"\n[done] filled {filled} of {len(rows)}")
if still_missing:
    print(f"[still missing] {len(still_missing)} celebrities have no Wikipedia photo available: {still_missing[:20]}{'...' if len(still_missing) > 20 else ''}")

cur.close()
conn.close()
