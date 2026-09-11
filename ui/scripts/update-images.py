import os
import json

# ============================================================
# PATHS
# ============================================================
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_DIR = os.path.join(PROJECT_ROOT, "src", "data", "live-location")
PUBLIC_IMAGES = os.path.join(PROJECT_ROOT, "public", "images", "locations")

# ============================================================
# REGION MAP — kaunsi location kis region mein hai
# ============================================================
REGION_MAP = {
    # North
    "bhayandar-east": "north", "bhayandar-west": "north",
    "mira-road-east": "north", "naigaon-east": "north",
    "naigaon-west": "north", "nalasopara-east": "north",
    "nalasopara-west": "north", "uttan": "north",
    "vasai-east": "north", "vasai-west": "north",
    "virar-east": "north", "virar-west": "north",
    # Central
    "bhandup": "central", "chembur": "central",
    "ghatkopar-east": "central", "ghatkopar-west": "central",
    "kurla": "central", "mulund-east": "central",
    "mulund-west": "central", "powai": "central",
    "sion": "central", "vikhroli": "central", "wadala": "central",
    # South
    "altamount-road": "south", "bkc": "south",
    "breach-candy": "south", "byculla": "south",
    "charni-road": "south", "churchgate": "south",
    "colaba": "south", "cuffe-parade": "south",
    "dadar-east": "south", "dadar-west": "south",
    "fort": "south", "grant-road": "south",
    "kalbadevi": "south", "lower-parel-east": "south",
    "lower-parel-west": "south", "mahalaxmi": "south",
    "malabar-hill": "south", "marine-lines": "south",
    "matunga": "south", "mumbai-central": "south",
    "pedder-road": "south", "prabhadevi": "south",
    "tardeo": "south", "worli": "south",
    # West
    "andheri-east": "west", "andheri-west": "west",
    "bandra-east": "west", "bandra-west": "west",
    "borivali-east": "west", "borivali-west": "west",
    "dahisar-east": "west", "dahisar-west": "west",
    "gorai": "west", "goregaon-east": "west",
    "goregaon-west": "west", "jogeshwari-east": "west",
    "jogeshwari-west": "west", "juhu": "west",
    "kandivali-east": "west", "kandivali-west": "west",
    "khar-east": "west", "khar-west": "west",
    "madh-marve-island": "west", "mahim": "west",
    "malad-east": "west", "malad-west": "west",
    "pali-hill": "west", "santacruz-east": "west",
    "santacruz-west": "west", "versova": "west",
    "vile-parle-east": "west", "vile-parle-west": "west",
}


def main():
    updated = 0
    skipped = []
    missing_files = []
    
    print(f"📂 JSON folder: {JSON_DIR}")
    print(f"🖼️  Images folder: {PUBLIC_IMAGES}")
    print()
    
    for filename in sorted(os.listdir(JSON_DIR)):
        if not filename.endswith(".json"):
            continue
        
        slug = filename.replace(".json", "")
        json_path = os.path.join(JSON_DIR, filename)
        
        # Region dhundho
        region = REGION_MAP.get(slug)
        if not region:
            skipped.append(slug)
            print(f"⚠️  {slug}: region not found in REGION_MAP")
            continue
        
        # Paths banao
        hero_path = f"/images/locations/name-boards/{slug}.webp"
        about_path = f"/images/locations/below-hero/{region}/{slug}.webp"
        
        # Actual files exist karti hain?
        hero_file = os.path.join(PUBLIC_IMAGES, "name-boards", f"{slug}.webp")
        about_file = os.path.join(PUBLIC_IMAGES, "below-hero", region, f"{slug}.webp")
        
        hero_ok = os.path.exists(hero_file)
        about_ok = os.path.exists(about_file)
        
        if not hero_ok:
            missing_files.append(f"❌ {slug}: name-boards/{slug}.webp missing")
        if not about_ok:
            missing_files.append(f"❌ {slug}: below-hero/{region}/{slug}.webp missing")
        
        # JSON load karo
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            print(f"❌ {slug}: JSON parse error - {e}")
            continue
        
        # Fields update karo
        data["location_icon"] = hero_path
        data["image"] = about_path
        
        # Purana galat field hata do
        if "location_image" in data:
            del data["location_image"]
        
        # Save karo
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        updated += 1
        status = "✅" if (hero_ok and about_ok) else "⚠️ "
        print(f"{status} {slug}")
    
    print()
    print(f"🎉 Total {updated} JSON files updated")
    
    if missing_files:
        print(f"\n⚠️  MISSING IMAGES ({len(missing_files)}):")
        for m in missing_files:
            print(f"  {m}")
    
    if skipped:
        print(f"\n⚠️  Skipped (no region in REGION_MAP): {len(skipped)}")
        for s in skipped:
            print(f"  - {s}")


if __name__ == "__main__":
    main()