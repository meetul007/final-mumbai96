#!/usr/bin/env node

/**
 * Regenerate ui/src/data/locations-static/<slug>.json files from the
 * backend API. Run this on the server after the backend is up and has
 * real location data.
 *
 * Usage:
 *   node scripts/regenerate-locations-static.js [api-base-url]
 *
 * Example:
 *   node scripts/regenerate-locations-static.js http://127.0.0.1:5002
 *   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5002 node scripts/regenerate-locations-static.js
 */

const fs = require("node:fs/promises");
const path = require("node:path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const ZONES_FILE = path.join(PROJECT_ROOT, "src", "data", "location-zones.json");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "src", "data", "locations-static");

const DEFAULT_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5002";
const API_BASE = process.argv[2] || DEFAULT_API_BASE;

async function fetchJson(urlPath) {
  const url = new URL(urlPath, API_BASE);
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.json();
}

async function main() {
  const zonesRaw = await fs.readFile(ZONES_FILE, "utf8");
  const zones = JSON.parse(zonesRaw);

  const slugs = [];
  for (const items of Object.values(zones)) {
    for (const item of items) {
      if (item?.slug) slugs.push(item.slug);
    }
  }

  if (slugs.length === 0) {
    console.error("No locations found in", ZONES_FILE);
    process.exit(1);
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  console.log(`Regenerating ${slugs.length} location JSON files from ${API_BASE}\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const slug of slugs) {
    try {
      const data = await fetchJson(`/api/public/location/${slug}`);

      if (!data || typeof data !== "object") {
        console.log(`⚠️  ${slug}: empty response, skipped`);
        skipped++;
        continue;
      }

      const outPath = path.join(OUTPUT_DIR, `${slug}.json`);
      await fs.writeFile(outPath, JSON.stringify(data, null, 2), "utf8");
      console.log(`✅ ${slug}`);
      success++;
    } catch (err) {
      console.error(`❌ ${slug}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Success: ${success}, Skipped: ${skipped}, Failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
