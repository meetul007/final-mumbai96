#!/usr/bin/env node

/**
 * Fix corrupted static location HTML files.
 *
 * Some files were written with the <style> block appearing before the
 * <!DOCTYPE html> declaration. Browsers then mis-parse the document and
 * show mojibake / broken layout. This script reorders the content so the
 * structure becomes:
 *
 *   <!DOCTYPE html>
 *   <html lang="en-IN">
 *   <head>
 *     <meta charset="UTF-8"/>
 *     ... other meta tags ...
 *     <style>
 *       ... CSS ...
 *     </style>
 *   </head>
 *   <body>
 *     ... page content ...
 *   </body>
 *   </html>
 *
 * Only files that start with "<style" (case-insensitive) are touched.
 * Correct files are left unchanged.
 *
 * Usage:
 *   node scripts/fix-corrupted-location-html.js [--write]
 *
 * Without --write the script only prints what it would do.
 * With --write it rewrites the corrupted files in place.
 */

const fs = require("node:fs/promises");
const path = require("node:path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PAGES_DIR = path.join(
  PROJECT_ROOT,
  "ui",
  "src",
  "data",
  "location",
  "75 locations pages"
);

async function listHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".html"))
    .map((e) => path.join(e.path || e.parentPath || dir, e.name));
}

function isCorrupted(content) {
  const trimmed = content.trimStart();
  const lower = trimmed.toLowerCase();
  // Missing DOCTYPE, or a <style> block placed before the DOCTYPE.
  return !lower.startsWith("<!doctype") || lower.startsWith("<style");
}

function fixContent(raw, filePath) {
  const content = raw.trimStart();
  const lower = content.toLowerCase();

  // Case A: file starts with <style>...</style> before the real HTML document.
  if (lower.startsWith("<style")) {
    const styleOpenIdx = lower.indexOf("<style");
    const styleCloseIdx = lower.indexOf("</style>");
    if (styleOpenIdx === -1 || styleCloseIdx === -1) {
      throw new Error("Could not locate leading <style> block");
    }
    const styleBlock = content.slice(
      styleOpenIdx,
      styleCloseIdx + "</style>".length
    );
    const afterStyle = content
      .slice(styleCloseIdx + "</style>".length)
      .trimStart();

    // Find where the real document starts (the first <!DOCTYPE html>).
    const doctypeIdx = afterStyle.toLowerCase().indexOf("<!doctype html>");

    if (doctypeIdx !== -1) {
      // Normal corruption: style block, then a complete HTML document.
      const realDoc = afterStyle.slice(doctypeIdx);
      const headCloseIdx = realDoc.toLowerCase().indexOf("</head>");
      if (headCloseIdx === -1) {
        throw new Error("Could not locate </head>");
      }
      const beforeHeadClose = realDoc.slice(0, headCloseIdx);
      const afterHeadClose = realDoc.slice(headCloseIdx);
      return `${beforeHeadClose}\n${styleBlock}\n${afterHeadClose}`;
    }

    // Severe corruption: style block followed directly by body content,
    // with no DOCTYPE/html/head opening tags at all.
    let bodyContent = afterStyle;
    if (bodyContent.toLowerCase().startsWith("</head>")) {
      bodyContent = bodyContent.slice("</head>".length).trimStart();
    }
    if (bodyContent.toLowerCase().startsWith("<body>")) {
      bodyContent = bodyContent.slice("<body>".length).trimStart();
    }
    const trimmedBody = bodyContent.trimEnd();
    if (!trimmedBody.toLowerCase().endsWith("</html>")) {
      throw new Error("Expected document to end with </html>");
    }

    // Derive a title from the filename/area name.
    const slug = path.basename(filePath, ".html");
    const displayName = slug
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
    const title = `${displayName} Mumbai - Complete Local Guide 2026 | Mumbai96`;

    return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title}</title>
<link rel="canonical" href="https://mumbai96.vercel.app/${slug}"/>
${styleBlock}
</head>
<body>
${trimmedBody.slice(0, -"</html>".length).trimEnd()}
</body>
</html>`;
  }

  // Case B: file starts directly with <html> (missing DOCTYPE).
  if (lower.startsWith("<html")) {
    return `<!DOCTYPE html>\n${content}`;
  }

  throw new Error("Unrecognized corruption pattern");
}

async function main() {
  const writeMode = process.argv.includes("--write");
  const files = await listHtmlFiles(PAGES_DIR);

  let corrupted = 0;
  let fixed = 0;
  let failed = 0;
  let skipped = 0;

  for (const filePath of files) {
    const rel = path.relative(PROJECT_ROOT, filePath);
    const raw = await fs.readFile(filePath, "utf8");

    if (!isCorrupted(raw)) {
      skipped++;
      continue;
    }

    corrupted++;

    try {
      const corrected = fixContent(raw, filePath);
      if (writeMode) {
        await fs.writeFile(filePath, corrected, "utf8");
        console.log(`✅ Fixed: ${rel}`);
      } else {
        console.log(`🔧 Would fix: ${rel}`);
      }
      fixed++;
    } catch (err) {
      console.error(`❌ ${rel}: ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\nTotal: ${files.length}, Corrupted: ${corrupted}, Fixed: ${fixed}, Failed: ${failed}, Already correct: ${skipped}`
  );

  if (!writeMode && corrupted > 0) {
    console.log("\nRun with --write to apply the fixes.");
  }

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
