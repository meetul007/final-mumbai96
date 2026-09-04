/*
  Import static location HTML pages into JSON files consumed by
  src/app/(site)/[location]/page.jsx via src/data/locations-static/<slug>.json.
*/

const fs = require("node:fs/promises");
const path = require("node:path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const DEFAULT_SOURCE = path.join(
  PROJECT_ROOT,
  "src",
  "data",
  "location",
  "75 locations pages",
);

const SOURCE_ROOT = process.env.LOCATION_PAGES_SOURCE || DEFAULT_SOURCE;
const OUTPUT_DIR = path.join(PROJECT_ROOT, "src", "data", "locations-static");
const ZONES_OUT_FILE = path.join(PROJECT_ROOT, "src", "data", "location-zones.json");

const REGION_BY_FOLDER = {
  north: "North Mumbai",
  western: "Western Mumbai",
  central: "Central Mumbai",
  south: "South Mumbai",
};

const ZONE_ID_BY_REGION = {
  "north mumbai": "north",
  "western mumbai": "western",
  "central mumbai": "central",
  "south mumbai": "south",
};

function stripTags(input) {
  return (input || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function slugToName(slug) {
  return (slug || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getMeta(html, name) {
  const re = new RegExp(
    `<meta\\s+name=["']${name}["']\\s+content=["']([\\s\\S]*?)["']\\s*\\/?\\s*>`,
    "i",
  );
  return html.match(re)?.[1]?.trim() || "";
}

function getMetaProperty(html, prop) {
  const re = new RegExp(
    `<meta\\s+property=["']${prop}["']\\s+content=["']([\\s\\S]*?)["']\\s*\\/?\\s*>`,
    "i",
  );
  return html.match(re)?.[1]?.trim() || "";
}

function getCanonical(html) {
  return (
    html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']\s*\/?\s*>/i)?.[1]?.trim() ||
    ""
  );
}

function extractFirstImageUrl(html) {
  const re = /<img[^>]+src=["']([^"']+)["']/i;
  const src = html.match(re)?.[1]?.trim() || "";
  if (!src || src.startsWith("data:")) return "";
  return src;
}

function absolutizeUrl(url, baseUrl) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  try {
    if (baseUrl) {
      return new URL(url, baseUrl).toString();
    }
  } catch {
    // ignore
  }
  return url;
}

function getTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
}

function getLdJsonBlocks(html) {
  const blocks = [];
  const re = /<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = (m[1] || "").trim();
    try {
      blocks.push(JSON.parse(raw));
    } catch {
      // skip invalid block
    }
  }
  return blocks;
}

function findLdByType(blocks, type) {
  return blocks.find((b) => b && b["@type"] === type) || null;
}

function extractFaqFromHtml(html) {
  const faqs = [];
  const faqBlockRe = /<div\s+class=["']faq["']>([\s\S]*?)<\/div>\s*<\/div>/gi;
  let m;
  while ((m = faqBlockRe.exec(html))) {
    const q = stripTags(m[1].match(/<div\s+class=["']fqq["']>([\s\S]*?)<\/div>/i)?.[1] || "");
    const a = stripTags(m[1].match(/<div\s+class=["']fqa["']>([\s\S]*?)<\/div>/i)?.[1] || "");
    if (q && a) faqs.push({ question: q, answer: a });
  }
  return faqs;
}

function extractSectionItems(html, sectionId) {
  const sectionRe = new RegExp(
    `<section\\s+class=["']guide-sec["']\\s+id=["']${sectionId}["'][\\s\\S]*?<\\/section>`,
    "i",
  );
  const section = html.match(sectionRe)?.[0] || "";
  if (!section) return [];

  const items = [];
  const cardRe = /<h4>([\s\S]*?)<\/h4>[\s\S]*?<p>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = cardRe.exec(section))) {
    const name = stripTags(m[1]);
    const description = stripTags(m[2]);
    if (name) items.push({ name, description });
  }
  return items;
}

function extractSubAreas(html) {
  const items = [];
  const cardRe = /<div\s+class=["']subarea-card["'][\s\S]*?<h4\s+class=["']subarea-name["']>([\s\S]*?)<\/h4>[\s\S]*?<p\s+class=["']subarea-desc["']>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = cardRe.exec(html))) {
    const name = stripTags(m[1]);
    const description = stripTags(m[2]);
    if (name) items.push({ name, description });
  }
  return items;
}

function extractCategories(html, slug) {
  const out = [];
  const seen = new Set();
  const re = new RegExp(
    `<a\\s+href=["']\\/${slug}\\/([^"']+)["'][\\s\\S]*?class=["']cat-card["'][\\s\\S]*?<span\\s+class=["']cat-emoji["']>([\\s\\S]*?)<\\/span>[\\s\\S]*?<span\\s+class=["']cat-name["']>([\\s\\S]*?)<\\/span>`,
    "gi",
  );
  let m;
  while ((m = re.exec(html))) {
    const catSlug = (m[1] || "").trim();
    const emoji = stripTags(m[2]);
    const name = stripTags(m[3]);
    if (!catSlug || seen.has(catSlug)) continue;
    seen.add(catSlug);
    out.push({
      slug: catSlug,
      name: name || slugToName(catSlug),
      emoji: emoji || "📌",
      image: "",
      description: "",
    });
  }
  return out;
}

function extractBestServices(html) {
  const prose = [];
  const proseRe = /<section\s+class=["']prose["'][\s\S]*?<div\s+class=["']prose-i["']>([\s\S]*?)<\/div>[\s\S]*?<\/section>/i;
  const proseHtml = html.match(proseRe)?.[1] || "";
  if (!proseHtml) return prose;

  const h3Re = /<h3>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3>|$)/gi;
  let m;
  while ((m = h3Re.exec(proseHtml))) {
    const heading = stripTags(m[1]);
    const text = stripTags(m[2]);
    if (heading || text) {
      prose.push({ heading: heading || "Guide", text });
    }
  }
  return prose;
}

function derivePopulation(description) {
  const match = (description || "").match(/([0-9]+\+?\s*(?:L|Cr|lakhs?|crores?))/i);
  return match ? match[1].replace(/\s+/g, "") : "8L+";
}

async function parseLocationFile(filePath, folderName) {
  const html = await fs.readFile(filePath, "utf8");
  const slug = path.basename(filePath, ".html").toLowerCase();

  const title = getTitle(html);
  const description = getMeta(html, "description");
  const keywords = getMeta(html, "keywords");
  const canonical = getCanonical(html);
  const ogImage = getMetaProperty(html, "og:image");
  const twitterImage = getMeta(html, "twitter:image");
  const firstImage = extractFirstImageUrl(html);

  const ldBlocks = getLdJsonBlocks(html);
  const collection = findLdByType(ldBlocks, "CollectionPage");
  const faqLd = findLdByType(ldBlocks, "FAQPage");
  const placeLd = findLdByType(ldBlocks, "Place");

  const displayName =
    placeLd?.name ||
    title.replace(/\s+Mumbai\s*-.*$/i, "").trim() ||
    slugToName(slug);

  const about =
    placeLd?.description ||
    collection?.description ||
    description ||
    `${displayName} local area guide.`;

  const faqFromLd = (faqLd?.mainEntity || []).map((q) => ({
    question: q?.name || "",
    answer: q?.acceptedAnswer?.text || "",
  })).filter((q) => q.question && q.answer);

  const faq = faqFromLd.length > 0 ? faqFromLd : extractFaqFromHtml(html);
  const categories = extractCategories(html, slug);
  const schools = extractSectionItems(html, "schools");
  const hospitals = extractSectionItems(html, "hospitals");
  const placesToVisit = extractSectionItems(html, "places");
  const nightLife = extractSectionItems(html, "nightlife");
  const subAreas = extractSubAreas(html);
  const bestServices = extractBestServices(html);

  const population = derivePopulation(description);
  const baseUrl = canonical || `https://mumbai96.vercel.app/${slug}`;
  const primaryImage = absolutizeUrl(ogImage || twitterImage || firstImage, baseUrl);
  const iconImage = absolutizeUrl(twitterImage || ogImage || firstImage, baseUrl);

  return {
    slug,
    data: {
      name: displayName,
      seo_title: title || `${displayName} Mumbai - Complete Local Guide 2026 | Mumbai96`,
      seo_description: description || about,
      seo_keywords: keywords || `${displayName} Mumbai, ${displayName} guide`,
      location_icon: iconImage,
      image: primaryImage,
      about,
      population,
      municipal_body: "",
      food_tags: "",
      sub_areas: subAreas,
      character_vibe: [],
      property_prices: [],
      places_to_visit: placesToVisit,
      food: [],
      night_life: nightLife,
      resident_profile: [],
      schools,
      hospitals,
      major_employers: [],
      grouped_listings: {},
      category_groups: [],
      travelling_connectivity: [],
      residential_societies: [],
      local_events: [],
      upcoming_projects: [],
      civic_data: {
        region: REGION_BY_FOLDER[folderName] || "Mumbai",
        ward: "",
        assembly_constituency: "",
      },
      area_report_card: {},
      living_style: [],
      faq,
      categories,
      best_services: bestServices,
      nearby_locations: [],
      source_file: filePath,
    },
  };
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const zoneManifest = {
    north: [],
    western: [],
    central: [],
    south: [],
  };

  const folders = ["north", "western", "central", "south"];
  let written = 0;

  for (const folder of folders) {
    const folderPath = path.join(SOURCE_ROOT, folder);
    let entries = [];
    try {
      entries = await fs.readdir(folderPath, { withFileTypes: true });
    } catch {
      continue;
    }

    const htmlFiles = entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".html"))
      .map((e) => path.join(folderPath, e.name));

    for (const filePath of htmlFiles) {
      const parsed = await parseLocationFile(filePath, folder);
      const outPath = path.join(OUTPUT_DIR, `${parsed.slug}.json`);
      await fs.writeFile(outPath, JSON.stringify(parsed.data, null, 2), "utf8");

      const regionKey = (parsed.data?.civic_data?.region || "").toLowerCase();
      const zoneId = ZONE_ID_BY_REGION[regionKey] || folder;
      if (zoneManifest[zoneId]) {
        zoneManifest[zoneId].push({
          name: parsed.data?.name || slugToName(parsed.slug),
          slug: parsed.slug,
        });
      }

      written += 1;
    }
  }

  for (const key of Object.keys(zoneManifest)) {
    zoneManifest[key].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (written === 0) {
    throw new Error(
      `No HTML files were imported. Check source folder: ${SOURCE_ROOT} (expected subfolders: north, western, central, south).`,
    );
  }

  await fs.writeFile(ZONES_OUT_FILE, JSON.stringify(zoneManifest, null, 2), "utf8");

  console.log(`Imported ${written} location files from ${SOURCE_ROOT} into ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
