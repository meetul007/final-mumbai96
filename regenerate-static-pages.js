#!/usr/bin/env node

/**
 * Restore / regenerate static location HTML pages.
 *
 * Strategy:
 *   1. Use the original rich standalone HTML files from
 *      ui/src/data/location/75 locations pages/<zone>/<slug>.html
 *   2. Only if a source HTML file is missing, fall back to fetching the
 *      page from the running Next.js app on localhost:3000.
 *
 * Run this after every `npm run build` and before `sudo systemctl reload nginx`.
 *
 * Usage:
 *   node regenerate-static-pages.js [output-dir] [base-url]
 *
 * Examples:
 *   node regenerate-static-pages.js
 *   node regenerate-static-pages.js /home/bpl_borivali/mumbai96-static-locations/pages http://127.0.0.1:3000
 */

const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");

const PROJECT_ROOT = __dirname;
const DEFAULT_OUTPUT_DIR = "/home/bpl_borivali/mumbai96-static-locations/pages";
const DEFAULT_BASE_URL = "http://127.0.0.1:3000";

const ZONES_FILE = path.join(
  PROJECT_ROOT,
  "ui",
  "src",
  "data",
  "location-zones.json",
);

const SOURCE_ROOT = process.env.LOCATION_PAGES_SOURCE
  ? path.resolve(PROJECT_ROOT, process.env.LOCATION_PAGES_SOURCE)
  : path.join(
      PROJECT_ROOT,
      "ui",
      "src",
      "data",
      "location",
      "75 locations pages",
    );

const outputDir = process.argv[2] || DEFAULT_OUTPUT_DIR;
const baseUrl = process.argv[3] || DEFAULT_BASE_URL;

async function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, baseUrl);
    http
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${urlPath}`));
          return;
        }
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

async function copySourcePage(slug, zone) {
  const sourcePath = path.join(SOURCE_ROOT, zone, `${slug}.html`);
  const destPath = path.join(outputDir, `${slug}.html`);

  try {
    const html = await fs.readFile(sourcePath, "utf8");
    await fs.writeFile(destPath, html, "utf8");
    return { ok: true, source: sourcePath };
  } catch (err) {
    if (err.code === "ENOENT") {
      return { ok: false, source: sourcePath, reason: "missing" };
    }
    return { ok: false, source: sourcePath, reason: err.message };
  }
}

async function fetchFallbackPage(slug) {
  const destPath = path.join(outputDir, `${slug}.html`);
  try {
    const html = await fetchPage(`/${slug}`);
    await fs.writeFile(destPath, html, "utf8");
    return { ok: true, source: baseUrl };
  } catch (err) {
    return { ok: false, source: baseUrl, reason: err.message };
  }
}

async function main() {
  const zonesRaw = await fs.readFile(ZONES_FILE, "utf8");
  const zones = JSON.parse(zonesRaw);

  const locations = [];
  for (const [zone, items] of Object.entries(zones)) {
    for (const item of items) {
      if (item.slug) {
        locations.push({ slug: item.slug, zone });
      }
    }
  }

  await fs.mkdir(outputDir, { recursive: true });

  console.log(`Restoring ${locations.length} static pages to ${outputDir}`);
  console.log(`Source root: ${SOURCE_ROOT}\n`);

  let copied = 0;
  let fetched = 0;
  let failed = 0;

  for (const { slug, zone } of locations) {
    const copyResult = await copySourcePage(slug, zone);
    if (copyResult.ok) {
      copied++;
      console.log(`✅ ${slug} (source)`);
      continue;
    }

    // Fallback only when the rich source HTML does not exist.
    console.log(
      `⚠️  ${slug}: source missing (${copyResult.source}), trying Next.js fallback...`,
    );
    const fetchResult = await fetchFallbackPage(slug);
    if (fetchResult.ok) {
      fetched++;
      console.log(`✅ ${slug} (fallback)`);
    } else {
      failed++;
      console.error(`❌ ${slug}: ${fetchResult.reason}`);
    }
  }

  console.log(
    `\nDone. Copied: ${copied}, Fallback: ${fetched}, Failed: ${failed}`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
