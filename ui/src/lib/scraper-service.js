import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';

// Import botasaurus-desktop-api (CJS module — use createRequire to avoid bundling issues)
const require = createRequire(import.meta.url);
const { default: Api } = require('botasaurus-desktop-api');

const BOTASAURUS_API_URL = process.env.BOTASAURUS_API_URL || 'http://127.0.0.1:8000';
const SCRAPED_DATA_DIR = path.join(process.cwd(), 'scraped-data');

// Singleton API client
let _api = null;
function getApi() {
  if (!_api) {
    _api = new Api({
      apiUrl: BOTASAURUS_API_URL,
      createResponseFiles: false,
    });
  }
  return _api;
}

/* ─── Helpers ─────────────────────────────────────── */

function generateId(prefix) {
  return `${prefix}-${Date.now()}`;
}

function getBatchDir(batchId) {
  return path.join(SCRAPED_DATA_DIR, batchId);
}

function getBatchStatePath(batchId) {
  return path.join(getBatchDir(batchId), '_state.json');
}

function getTestStatePath(testId) {
  return path.join(SCRAPED_DATA_DIR, `${testId}.json`);
}

function getTestResultPath(testId) {
  return path.join(SCRAPED_DATA_DIR, `${testId}-result.json`);
}

function slugToSearchTerm(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ─── Build the payload ────────────────────────────── */

/**
 * @param {string} category - category slug (e.g. "street-food")
 * @param {object} params - user parameters
 * @param {string} [location] - location slug (e.g. "virar-west") – used to derive city name
 */
function buildPayload({ category, params, location }) {
  const searchTerm = slugToSearchTerm(category);

  // Derive city from location slug first, fall back to params.city, then 'Mumbai'
  const cityName = location
    ? slugToSearchTerm(location)
    : (params.city || 'Mumbai');
  const searchLink = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm + ' in ' + cityName)}`;

  const payload = {
    business_types: [searchTerm],
    search_method: 'city',
    countries: params.countries?.length ? params.countries : [],
    states: params.states?.length ? params.states : [],
    cities: [cityName],
    randomize_cities: false,
    include_places_outside_city: true,
    search_links: [searchLink],
    extraction_method: params.extractionMethod || 'fast',
    geo_shape: 'polygons',
    point_coordinates: '',
    polygons: null,
    geo_zoom_level: '16',
    exclude_outside_shape: false,
    api_key: params.apiKey || '',
    enable_website_contacts: params.enableWebsiteContacts || false,
    product_description: '',
    enable_emails_social: params.enableEmailsSocial || false,
    recommended_emails_count: 'none',
    verify_recommended_emails: false,
    email_verification_service: 'millionverifier',
    enable_sales_summary: false,
    enable_phone_info: params.enablePhoneInfo || false,
    enrichment_filters: params.enrichmentFilters?.length ? params.enrichmentFilters : [],
    filter_reviews_gt: null,
    filter_reviews_lt: null,
    filter_category_contains: '',
    enable_leads: false,
    leads_max_per_place: '3',
    leads_seniorities: ['c_suite', 'founder', 'owner', 'vp', 'director'],
    leads_person_titles: '',
    leads_contact_email_status: ['verified'],
    leads_person_locations: '',
    enable_reviews_extraction: params.enableReviewsExtraction || false,
    max_reviews: params.maxReviews || 20,
    reviews_sort: 'newest',
    reviews_since_date: '',
    reviews_query: '',
    enable_photos_extraction: params.enablePhotosExtraction || false,
    max_photos: params.maxPhotos || 100,
    lang: null,
    max_results: params.maxResults || null,
  };

  if (params.filterReviewsGt) payload.filter_reviews_gt = params.filterReviewsGt;
  if (params.filterReviewsLt) payload.filter_reviews_lt = params.filterReviewsLt;

  return payload;
}

function sanitizeResult(result) {
  // Ensure result is always JSON-serializable (not undefined/null)
  if (result === null || result === undefined) {
    return { results: [], _note: 'No data returned from scraper' };
  }
  return result;
}

/* ─── Botasaurus task helpers ──────────────────────── */

/** Submit a scraping task and return the Botasaurus child-task ID */
async function submitTask(category, params, location) {
  const data = buildPayload({ category, params, location });
  const tasks = await getApi().createAsyncTask({
    scraperName: 'google_maps_scraper',
    data,
  });

  // The API returns an ARRAY of tasks: [parent ("All Task"), child (actual scraper task), ...]
  // We need the ID of the first non-parent (child) task to poll for completion.
  if (Array.isArray(tasks)) {
    const child = tasks.find((t) => !t.is_all_task);
    if (child && child.id) return child.id;
    // fallback: last task in array
    if (tasks.length > 0 && tasks[tasks.length - 1].id) {
      return tasks[tasks.length - 1].id;
    }
  }
  // Single task returned (shouldn't happen with current API, but be safe)
  if (tasks && tasks.id) return tasks.id;

  throw new Error(`Could not extract task ID from Botasaurus response`);
}

/** Poll a Botasaurus task once. Returns { status, result, error } */
async function pollTask(taskId) {
  const task = await getApi().getTask(taskId);
  return {
    status: task.status,
    result: task.result,
    error: task.status === 'failed' ? task.metadata?.error || JSON.stringify(task.metadata) : null,
  };
}

/** Synchronously wait for a task to complete (for batch processing) */
async function waitForTask(taskId, timeoutMs = 300_000) {
  const deadline = Date.now() + timeoutMs;
  let lastStatus;

  while (Date.now() < deadline) {
    await sleep(2000);
    const task = await getApi().getTask(taskId);
    lastStatus = task.status;

    if (task.status === 'completed') return sanitizeResult(task.result);
    if (task.status === 'failed') {
      throw new Error(task.metadata?.error || `Task ${taskId} failed`);
    }
    if (task.status === 'aborted') {
      throw new Error(`Task ${taskId} was aborted`);
    }
  }

  throw new Error(`Task ${taskId} did not complete within ${timeoutMs / 1000}s (last status: ${lastStatus})`);
}

/** Run one category synchronously (blocks until done) */
async function scrapeSync(category, params, location) {
  const taskId = await submitTask(category, params, location);
  return waitForTask(taskId);
}

/* ══════════════════════════════════════════════════════
   TEST (single category, persistent)
   ══════════════════════════════════════════════════════ */

export async function createTest({ location, category, params }) {
  const testId = generateId('test');

  // Initial state
  const state = {
    testId,
    location,
    category,
    params,
    status: 'submitting',    // submitting | running | completed | failed
    botasaurusTaskId: null,
    startedAt: new Date().toISOString(),
    completedAt: null,
    resultCount: 0,
    error: null,
  };

  await fs.writeFile(getTestStatePath(testId), JSON.stringify(state, null, 2));

  // Fire-and-forget: submit task + poll in background
  runTestPoller(testId).catch((err) => {
    console.error(`[scraper] test ${testId} poller error:`, err);
  });

  return testId;
}

export async function getTestState(testId) {
  try {
    const raw = await fs.readFile(getTestStatePath(testId), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function runTestPoller(testId) {
  // 1. Update state to "submitting"
  let state = await getTestState(testId);
  if (!state) return;

  // 2. Submit the task
  let taskId;
  try {
    taskId = await submitTask(state.category, state.params, state.location);
  } catch (err) {
    state.status = 'failed';
    state.completedAt = new Date().toISOString();
    state.error = err.message;
    await fs.writeFile(getTestStatePath(testId), JSON.stringify(state, null, 2));
    return;
  }

  // 3. Save taskId and mark running
  state.botasaurusTaskId = taskId;
  state.status = 'running';
  await fs.writeFile(getTestStatePath(testId), JSON.stringify(state, null, 2));

  // 4. Poll until done or timeout (5 min)
  const deadline = Date.now() + 300_000;

  while (Date.now() < deadline) {
    await sleep(2000);

    try {
      const poll = await pollTask(taskId);

      if (poll.status === 'completed') {
        const safeResult = sanitizeResult(poll.result);
        // Save result to separate file
        await fs.writeFile(getTestResultPath(testId), JSON.stringify(safeResult, null, 2));

        state.status = 'completed';
        state.completedAt = new Date().toISOString();
        state.resultCount = countBusinesses(safeResult);
        await fs.writeFile(getTestStatePath(testId), JSON.stringify(state, null, 2));
        return;
      }

      if (poll.status === 'failed') {
        state.status = 'failed';
        state.completedAt = new Date().toISOString();
        state.error = poll.error || 'Task failed';
        await fs.writeFile(getTestStatePath(testId), JSON.stringify(state, null, 2));
        return;
      }

      if (poll.status === 'aborted') {
        state.status = 'failed';
        state.completedAt = new Date().toISOString();
        state.error = 'Task was aborted';
        await fs.writeFile(getTestStatePath(testId), JSON.stringify(state, null, 2));
        return;
      }
      // "pending" / "in_progress" — keep polling
    } catch (err) {
      // Transient error — keep polling
      console.error(`[scraper] test ${testId} poll error:`, err.message);
    }
  }

  // Timeout
  state.status = 'failed';
  state.completedAt = new Date().toISOString();
  state.error = 'Timed out after 5 minutes';
  await fs.writeFile(getTestStatePath(testId), JSON.stringify(state, null, 2));
}

/* ══════════════════════════════════════════════════════
   BATCH
   ══════════════════════════════════════════════════════ */

export async function createBatch({ location, categories, params }) {
  const batchId = generateId('batch');
  const batchDir = getBatchDir(batchId);

  await fs.mkdir(batchDir, { recursive: true });

  const state = {
    batchId,
    location,
    params,
    categories: categories.map((slug) => ({
      slug,
      status: 'pending',
      startedAt: null,
      completedAt: null,
      resultCount: 0,
      error: null,
    })),
    startedAt: new Date().toISOString(),
    completedAt: null,
    totalBusinessesFound: 0,
    isComplete: false,
  };

  await fs.writeFile(getBatchStatePath(batchId), JSON.stringify(state, null, 2));

  // Fire-and-forget
  processBatch(batchId).catch((err) => {
    console.error(`[scraper] batch ${batchId} error:`, err);
  });

  return batchId;
}

export async function getBatchState(batchId) {
  try {
    const raw = await fs.readFile(getBatchStatePath(batchId), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function saveBatchState(batchId, state) {
  await fs.writeFile(getBatchStatePath(batchId), JSON.stringify(state, null, 2));
}

async function processBatch(batchId) {
  while (true) {
    const state = await getBatchState(batchId);
    if (!state || state.isComplete) break;

    const pending = state.categories.find((c) => c.status === 'pending');
    if (!pending) {
      state.isComplete = true;
      state.completedAt = new Date().toISOString();
      await saveBatchState(batchId, state);
      break;
    }

    pending.status = 'running';
    pending.startedAt = new Date().toISOString();
    await saveBatchState(batchId, state);

    try {
      const taskId = await submitTask(pending.slug, state.params, state.location);
      const result = await waitForTask(taskId);

      const filePath = path.join(getBatchDir(batchId), `${pending.slug}.json`);
      await fs.writeFile(filePath, JSON.stringify(result, null, 2));

      pending.status = 'completed';
      pending.completedAt = new Date().toISOString();
      pending.resultCount = countBusinesses(result);
      state.totalBusinessesFound += pending.resultCount;
    } catch (err) {
      const errPath = path.join(getBatchDir(batchId), `${pending.slug}.error.json`);
      await fs.writeFile(errPath, JSON.stringify({ error: err.message, stack: err.stack }, null, 2));

      pending.status = 'failed';
      pending.completedAt = new Date().toISOString();
      pending.error = err.message;
    }

    await saveBatchState(batchId, state);
  }
}

/* ─── List Batches ─────────────────────────────────── */

export async function listBatches() {
  try {
    const entries = await fs.readdir(SCRAPED_DATA_DIR, { withFileTypes: true });
    const batchDirs = entries.filter((e) => e.isDirectory() && e.name.startsWith('batch-'));

    return (await Promise.all(
      batchDirs.map(async (dir) => {
        const state = await getBatchState(dir.name);
        return state;
      }),
    ))
      .filter(Boolean)
      .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
  } catch {
    return [];
  }
}

/* ─── Get Category Result ──────────────────────────── */

export async function getCategoryResult(batchId, categorySlug) {
  const filePath = path.join(getBatchDir(batchId), `${categorySlug}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* ─── Download batch results ───────────────────────── */

export async function collectBatchResults(batchId) {
  const state = await getBatchState(batchId);
  if (!state) return null;

  const combined = {
    batchId,
    location: state.location,
    params: state.params,
    startedAt: state.startedAt,
    completedAt: state.completedAt,
    totalBusinessesFound: state.totalBusinessesFound,
    categories: {},
  };

  for (const cat of state.categories) {
    if (cat.status === 'completed') {
      const result = await getCategoryResult(batchId, cat.slug);
      combined.categories[cat.slug] = {
        status: 'completed',
        resultCount: cat.resultCount,
        data: result,
      };
    } else if (cat.status === 'failed') {
      combined.categories[cat.slug] = {
        status: 'failed',
        error: cat.error,
        data: null,
      };
    }
  }

  return combined;
}

/* ─── Test helpers (used by API routes) ───────────── */

export async function getTestResult(testId) {
  try {
    const raw = await fs.readFile(getTestResultPath(testId), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/* ─── Count businesses in a result ─────────────────── */

export function countBusinesses(result) {
  if (!result) return 0;
  if (Array.isArray(result)) return result.length;
  if (Array.isArray(result.results)) return result.results.length;
  if (Array.isArray(result.data)) return result.data.length;
  if (result.result && Array.isArray(result.result)) return result.result.length;
  if (result.result?.results && Array.isArray(result.result.results)) return result.result.results.length;
  return 0;
}
