#!/usr/bin/env python3
"""
Import/upsert celebrities into Postgres from mumbai96_celebrities_database_v8.xlsx
Run on the GCP server. Requires: pip install openpyxl psycopg2-binary requests

Usage:
  PGPASSWORD=xxx python3 import_celebrities.py mumbai96_celebrities_database_v8.xlsx
"""
import sys, os, subprocess, datetime, time, json
import openpyxl, psycopg2, requests
from psycopg2.extras import execute_values

XLSX     = sys.argv[1] if len(sys.argv) > 1 else "mumbai96_celebrities_database_v8.xlsx"
DB_NAME  = "mumbai96"
DB_USER  = "mumbai96_user"
DB_HOST  = "localhost"
DB_PORT  = 5432
TABLE    = "celebrities"
BACKUP_DIR = os.path.expanduser("~/backups")

pw = os.environ.get("PGPASSWORD")
if not pw:
    sys.exit("Set PGPASSWORD env var first.")

# 1. BACKUP (table-level pg_dump, plain SQL, timestamped)
os.makedirs(BACKUP_DIR, exist_ok=True)
ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
backup_file = f"{BACKUP_DIR}/{TABLE}_{ts}.sql"
subprocess.run(
    ["pg_dump", "-h", DB_HOST, "-U", DB_USER, "-t", TABLE, "-f", backup_file, DB_NAME],
    env={**os.environ, "PGPASSWORD": pw}, check=True
)
print(f"[backup] {backup_file}")

# 2. LOAD XLSX
wb = openpyxl.load_workbook(XLSX, read_only=True, data_only=True)
ws = wb["Celebrities Data"]
rows = list(ws.iter_rows(values_only=True))
headers, data = rows[0], [r for r in rows[1:] if r[0]]  # skip blank-slug rows
h = {name: i for i, name in enumerate(headers)}
print(f"[xlsx] {len(data)} rows loaded")

# 3. FILL MISSING wikipedia_image_url VIA WIKIPEDIA API
img_i, wiki_i = h["wikipedia_image_url"], h["wikipedia_url"]
data = [list(r) for r in data]
filled = 0
for r in data:
    if r[img_i] or not r[wiki_i]:
        continue
    title = r[wiki_i].rsplit("/", 1)[-1]
    try:
        resp = requests.get(
            "https://en.wikipedia.org/w/api.php",
            params={"action": "query", "titles": title, "prop": "pageimages",
                    "format": "json", "pithumbsize": 500},
            headers={"User-Agent": "mumbai96-import/1.0"}, timeout=10
        ).json()
        pages = resp.get("query", {}).get("pages", {})
        for p in pages.values():
            src = p.get("thumbnail", {}).get("source")
            if src:
                r[img_i] = src
                filled += 1
        time.sleep(0.2)
    except Exception as e:
        print(f"  [img-fail] {r[h['slug']]}: {e}")
print(f"[images] filled {filled} missing wikipedia_image_url values")

# 4. INSERT ONLY NEW SLUGS — skip anything already in the table, never touch existing rows
conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=pw, host=DB_HOST, port=DB_PORT)
cur = conn.cursor()
cur.execute("SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name=%s", (TABLE,))
col_info = {row[0]: (row[1], row[2]) for row in cur.fetchall()}
col_types = {c: t for c, (t, _) in col_info.items()}
table_cols = set(col_info)
if not table_cols:
    sys.exit(f"Table '{TABLE}' not found or has no columns — check table name.")

cols = [c for c in headers if c in table_cols]
idx = [h[c] for c in cols]
slug_i = h["slug"]
if "slug" not in cols:
    sys.exit("'slug' column not found in target table — can't dedupe safely.")

NUMERIC_TYPES = {"integer", "bigint", "smallint", "numeric", "real", "double precision"}
numeric_cols = {c for c in cols if col_types[c] in NUMERIC_TYPES}
truncated = set()

def clean(col, val):
    if col in numeric_cols:
        if val is None or val == "":
            return None
        try:
            return int(val) if col_types[col] != "numeric" else float(val)
        except (ValueError, TypeError):
            return None  # non-numeric text like "Not publicly disclosed" -> NULL
    max_len = col_info[col][1]
    if max_len and isinstance(val, str) and len(val) > max_len:
        truncated.add(col)
        return val[:max_len]
    return val

cur.execute(f"SELECT slug FROM {TABLE}")
existing_slugs = {row[0] for row in cur.fetchall()}
print(f"[db] {len(existing_slugs)} celebrities already live")

new_rows = [r for r in data if r[slug_i] not in existing_slugs]
skipped = len(data) - len(new_rows)
print(f"[filter] skipping {skipped} already-live, inserting {len(new_rows)} new")

if new_rows:
    col_list = ", ".join(cols)
    sql = f"INSERT INTO {TABLE} ({col_list}) VALUES %s ON CONFLICT (slug) DO NOTHING"
    values = [tuple(clean(c, r[i]) for c, i in zip(cols, idx)) for r in new_rows]
    execute_values(cur, sql, values)
    conn.commit()
    print(f"[db] inserted {len(values)} new rows into {TABLE} using columns: {cols}")
    if numeric_cols:
        print(f"[note] non-numeric text in these columns was set to NULL: {sorted(numeric_cols)}")
    if truncated:
        print(f"[note] over-length text was truncated to fit column limits: {sorted(truncated)}")
else:
    print("[db] nothing new to insert")
cur.close(); conn.close()
print("[done]")
