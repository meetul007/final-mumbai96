'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import locationsData from '@/lib/locations.json';

/* ─── helpers ─────────────────────────────────────── */

const ALL_CATEGORIES = locationsData[Object.keys(locationsData)[0]].categories;
const LOCATIONS = Object.entries(locationsData).map(([slug, info]) => ({
  slug,
  name: info.name,
}));

const STATUS_ICONS = {
  pending: '⬜',
  running: '⏳',
  completed: '✅',
  failed: '❌',
};

/* ─── styles ───────────────────────────────────────── */

const s = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px 80px',
    fontFamily: "'Sora', sans-serif",
  },
  heading: {
    fontSize: '28px',
    fontWeight: 800,
    color: 'var(--ink)',
    marginBottom: '4px',
  },
  subheading: {
    fontSize: '14px',
    color: 'var(--muted)',
    marginBottom: '32px',
  },
  card: {
    background: '#fff',
    borderRadius: 'var(--r, 12px)',
    boxShadow: 'var(--sh, 0 4px 24px rgba(0,0,0,0.08))',
    padding: '24px',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--ink)',
    marginBottom: '16px',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '14px',
    background: '#fff',
    color: 'var(--ink)',
    outline: 'none',
    cursor: 'pointer',
  },
  btn: {
    padding: '14px 32px',
    borderRadius: '100px',
    border: 'none',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  btnPrimary: {
    background: 'var(--red)',
    color: '#fff',
  },
  btnSecondary: {
    background: 'var(--light)',
    color: 'var(--ink)',
  },
  btnOutline: {
    background: 'transparent',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '6px',
    maxHeight: '400px',
    overflowY: 'auto',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '12px',
  },
  catItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--ink)',
    padding: '4px 6px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  catCheckbox: {
    accentColor: 'var(--red)',
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: 'var(--sh-lg)',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--ink)',
    marginBottom: '20px',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--ink)',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '14px',
    color: 'var(--ink)',
    outline: 'none',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--ink)',
    marginBottom: '8px',
  },
  progressBarOuter: {
    width: '100%',
    height: '10px',
    background: 'var(--border)',
    borderRadius: '100px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  progressBarInner: {
    height: '100%',
    background: 'var(--red)',
    borderRadius: '100px',
    transition: 'width 0.5s ease',
  },
  statCard: {
    background: 'var(--light)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
  },
  statNum: {
    fontSize: '28px',
    fontWeight: 800,
    color: 'var(--red)',
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--muted)',
    marginTop: '4px',
  },
  statusList: {
    maxHeight: '500px',
    overflowY: 'auto',
    border: '1px solid var(--border)',
    borderRadius: '8px',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 14px',
    borderBottom: '1px solid var(--border)',
    fontSize: '13px',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '100px',
    fontSize: '11px',
    fontWeight: 600,
  },
  badgeCompleted: {
    background: '#d1fae5',
    color: '#065f46',
  },
  badgeFailed: {
    background: '#fee2e2',
    color: '#991b1b',
  },
  badgeRunning: {
    background: '#fef3c7',
    color: '#92400e',
  },
  badgePending: {
    background: '#f3f4f6',
    color: '#6b7280',
  },
  testDropdownWrapper: {
    position: 'relative',
  },
  testDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: '250px',
    overflowY: 'auto',
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: '0 0 8px 8px',
    zIndex: 50,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
  testDropdownItem: {
    padding: '8px 14px',
    fontSize: '13px',
    cursor: 'pointer',
    borderBottom: '1px solid var(--border)',
    color: 'var(--ink)',
  },
  jsonViewer: {
    background: '#1e293b',
    color: '#e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '12px',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    overflow: 'auto',
    maxHeight: '500px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  resultSummary: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  summaryChip: {
    background: 'var(--light)',
    borderRadius: '100px',
    padding: '6px 16px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--ink)',
  },
};

const BADGE_STYLES = {
  completed: s.badgeCompleted,
  failed: s.badgeFailed,
  running: s.badgeRunning,
  pending: s.badgePending,
};

/* ─── Result helpers ────────────────────────────────── */

/** Extract an array of business records from the Botasaurus response */
function extractBusinesses(result) {
  if (!result) return [];
  // Direct array
  if (Array.isArray(result)) return result;
  // Nested under .results
  if (Array.isArray(result.results)) return result.results;
  // Nested under .data
  if (Array.isArray(result.data)) return result.data;
  // Task wrapper — result might be inside the task object
  if (result.result && Array.isArray(result.result)) return result.result;
  if (result.result?.results && Array.isArray(result.result.results)) return result.result.results;
  // Scraper response nested under task keys
  if (result.task_result && Array.isArray(result.task_result)) return result.task_result;
  // Give up — return empty
  return [];
}

function ResultCountChip({ result }) {
  const businesses = extractBusinesses(result);
  return (
    <span style={s.summaryChip}>
      🏪 {businesses.length > 0
        ? `${businesses.length} businesses`
        : result
          ? 'Data returned (unexpected format)'
          : 'No data'}
    </span>
  );
}

/** Display a preview table of businesses + raw JSON below */
function ResultViewer({ result }) {
  const businesses = extractBusinesses(result);
  const [showRaw, setShowRaw] = useState(true);

  // Debug: show structure summary
  const debugInfo = !result
    ? 'Result is null/undefined'
    : Array.isArray(result)
      ? `Top-level array (${result.length} items)`
      : typeof result === 'object'
        ? `Top-level object with keys: ${Object.keys(result).join(', ')}`
        : `Top-level ${typeof result}: ${String(result).slice(0, 200)}`;

  if (businesses.length === 0) {
    return (
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--muted)', fontFamily: 'monospace' }}>
          ⓘ {debugInfo}
        </div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#991b1b' }}>
          Could not extract business array. Showing full response below:
        </div>
        <div style={s.jsonViewer}>
          {JSON.stringify(result, null, 2)}
        </div>
      </div>
    );
  }

  // Preview first 5 fields of first few businesses in a table
  const previewFields = ['name', 'rating', 'reviews', 'address', 'phone', 'website', 'category'];
  const previewCount = Math.min(businesses.length, 10);

  return (
    <div>
      {/* Mini table */}
      {previewCount > 0 && (
        <div style={{ overflowX: 'auto', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--light)', textAlign: 'left' }}>
                <th style={{ padding: '8px 10px', fontWeight: 600 }}>#</th>
                {previewFields.map((f) => (
                  <th key={f} style={{ padding: '8px 10px', fontWeight: 600 }}>{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {businesses.slice(0, previewCount).map((biz, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '6px 10px', color: 'var(--muted)' }}>{i + 1}</td>
                  {previewFields.map((f) => (
                    <td key={f} style={{ padding: '6px 10px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {biz[f] !== undefined && biz[f] !== null
                        ? String(biz[f])
                        : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {businesses.length > previewCount && (
            <div style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--muted)', borderTop: '1px solid var(--border)', background: 'var(--light)' }}>
              … and {businesses.length - previewCount} more
            </div>
          )}
        </div>
      )}

      {/* Toggle raw JSON */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          style={{ ...s.btn, ...s.btnOutline, padding: '6px 14px', fontSize: '11px' }}
          onClick={() => setShowRaw(!showRaw)}
        >
          {showRaw ? 'Hide' : 'Show'} Raw JSON
        </button>
        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
          Total fields per business: {businesses[0] ? Object.keys(businesses[0]).length : 0}
        </span>
      </div>
      {showRaw && (
        <div style={{ ...s.jsonViewer, marginTop: '8px' }}>
          {JSON.stringify(result, null, 2)}
        </div>
      )}
    </div>
  );
}

/* ─── Component ────────────────────────────────────── */

export default function ScraperPage() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]?.slug || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set(ALL_CATEGORIES));

  // Botasaurus server health
  const [scraperOnline, setScraperOnline] = useState(null); // null = loading, true = ok, false = down
  const [scraperError, setScraperError] = useState('');


  // Parameter dialog
  const [showParams, setShowParams] = useState(false);
  const [params, setParams] = useState({
    city: 'Mumbai',
    maxResults: 20,
    extractionMethod: 'fast',
    enableWebsiteContacts: false,
    enableEmailsSocial: false,
    enableReviewsExtraction: false,
    maxReviews: 20,
    enablePhotosExtraction: false,
    maxPhotos: 20,
    enablePhoneInfo: false,
    enrichmentFilters: [],
    filterReviewsGt: '',
    filterReviewsLt: '',
    countries: [],
    states: [],
    lang: '',
  });

  // Test run state (persistent)
  const [testCategory, setTestCategory] = useState('');
  const [testCategorySearch, setTestCategorySearch] = useState('');
  const [testShowDropdown, setTestShowDropdown] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [testId, setTestId] = useState(null);
  const [testState, setTestState] = useState(null);    // { status, result, error, ... }
  const [testPolling, setTestPolling] = useState(false);
  const testDropdownRef = useRef(null);
  const testPollRef = useRef(null);

  // Close test dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (testDropdownRef.current && !testDropdownRef.current.contains(e.target)) {
        setTestShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Batch state
  const [batchId, setBatchId] = useState(null);
  const [batchState, setBatchState] = useState(null);
  const [polling, setPolling] = useState(false);
  const pollRef = useRef(null);

  // Previous runs (history)
  const [batchHistory, setBatchHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Category search filter
  const filteredCategories = ALL_CATEGORIES.filter((c) =>
    c.replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Toggle a single category
  const toggleCategory = (slug) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  // Toggle all visible (filtered) categories
  const toggleAllFiltered = () => {
    const allFilteredSelected = filteredCategories.every((c) => selectedCategories.has(c));
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      for (const c of filteredCategories) {
        if (allFilteredSelected) next.delete(c);
        else next.add(c);
      }
      return next;
    });
  };

  // Convert slug to display name (e.g. "virar-west" → "Virar West")
  const slugToDisplay = (slug) =>
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Open parameter dialog — pre-fill city from selected location
  const handleStartClick = () => {
    const locName = LOCATIONS.find((l) => l.slug === selectedLocation)?.name || slugToDisplay(selectedLocation);
    setParams((prev) => ({ ...prev, city: locName }));
    setShowParams(true);
  };

  // Confirm and start scraping
  const handleRun = async () => {
    setShowParams(false);
    setBatchId(null);
    setBatchState(null);

    try {
      const res = await fetch('/api/scraper/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: selectedLocation,
          categories: Array.from(selectedCategories),
          params,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Error: ' + (err.error || 'Failed to start scraping'));
        return;
      }

      const data = await res.json();
      setBatchId(data.batchId);
      setPolling(true);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Run a single-category test
  const handleTestRun = async () => {
    if (!testCategory) return;
    setTestRunning(true);
    setTestId(null);
    setTestState(null);

    try {
      const res = await fetch('/api/scraper/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: selectedLocation,
          category: testCategory,
          params,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show error inline
        setTestState({ status: 'failed', error: data.error || 'Test failed' });
      } else {
        setTestId(data.testId);
        localStorage.setItem('scraper_test_id', data.testId);
        setTestPolling(true);
      }
    } catch (err) {
      setTestState({ status: 'failed', error: err.message });
    } finally {
      setTestRunning(false);
    }
  };

  // Fetch test status from server
  const fetchTestStatus = useCallback(async (tid) => {
    try {
      const res = await fetch(`/api/scraper/test-status/${tid}`);
      if (!res.ok) {
        if (res.status === 404) {
          // Test not found (maybe was cleaned up)
          setTestPolling(false);
          setTestState({ status: 'failed', error: 'Test not found on server' });
          localStorage.removeItem('scraper_test_id');
        }
        return;
      }
      const data = await res.json();
      setTestState(data);

      if (data.status === 'completed' || data.status === 'failed') {
        setTestPolling(false);
        // Keep testId in localStorage so result survives refresh
      }
    } catch {
      // transient — keep polling
    }
  }, []);

  // Poll test status
  useEffect(() => {
    if (testPolling && testId) {
      fetchTestStatus(testId);
      testPollRef.current = setInterval(() => fetchTestStatus(testId), 2000);
    }
    return () => {
      if (testPollRef.current) {
        clearInterval(testPollRef.current);
        testPollRef.current = null;
      }
    };
  }, [testPolling, testId, fetchTestStatus]);

  // Check Botasaurus server health on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/scraper/health');
        if (cancelled) return;
        if (res.ok) {
          setScraperOnline(true);
          setScraperError('');
        } else {
          const data = await res.json();
          setScraperOnline(false);
          setScraperError(data.message || 'Botasaurus server is not reachable');
        }
      } catch {
        if (!cancelled) {
          setScraperOnline(false);
          setScraperError('Could not connect to scraper service');
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Restore test state from localStorage on mount
  useEffect(() => {
    const savedTestId = localStorage.getItem('scraper_test_id');
    if (savedTestId) {
      setTestId(savedTestId);
      setTestPolling(true);
    }
  }, []);

  // Poll for status
  const fetchStatus = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/scraper/status/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setBatchState(data);

      if (data.isComplete) {
        setPolling(false);
      }
    } catch {
      // ignore
    }
  }, []);

  // Start polling when batchId changes
  useEffect(() => {
    if (polling && batchId) {
      fetchStatus(batchId);
      pollRef.current = setInterval(() => fetchStatus(batchId), 2000);
    }
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [polling, batchId, fetchStatus]);

  // Load batch history from server
  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/scraper/status/all');
      if (res.ok) {
        const data = await res.json();
        setBatchHistory(data.batches || []);
      }
    } catch {
      // silent
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Fetch history on mount and refresh after a batch completes
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    if (!batchState?.isComplete) return;
    // Refresh history list when current batch finishes
    loadHistory();
  }, [batchState?.isComplete, loadHistory]);

  // Prompt before leaving while scraping
  useEffect(() => {
    if (!polling) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [polling]);

  const locationName = LOCATIONS.find((l) => l.slug === selectedLocation)?.name || selectedLocation;
  const progress = batchState?.progress || {};

  return (
    <div style={s.page}>
      {/* ─── Header ─── */}
      <h1 style={s.heading}>🕷️ Scraper Control Panel</h1>
      <p style={s.subheading}>
        Scrape Google Maps business data for Mumbai locations. Select a location,
        choose categories, and configure parameters.
      </p>

      {/* ─── Botasaurus connection warning ─── */}
      {scraperOnline === false && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fca5a5',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <span style={{ fontSize: '22px', lineHeight: 1 }}>🚫</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: '#991b1b' }}>
              Scraper Service Offline
            </div>
            <div style={{ fontSize: '13px', color: '#b91c1c', marginTop: '4px' }}>
              {scraperError || 'The Botasaurus API server is not running.'}
            </div>
            <div style={{ fontSize: '12px', color: '#991b1b', marginTop: '8px' }}>
              Start it with{' '}
              <code style={{ background: '#fee2e2', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                botasaurus-desktop-api
              </code>
              {' '}or{' '}
              <code style={{ background: '#fee2e2', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                python3 -m botasaurus_desktop_api
              </code>
            </div>
          </div>
        </div>
      )}

      {scraperOnline !== false && <>
      {/* ─── ⚡ Test Run ─── */}
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>⚡ Test Run</h2>
          {testRunning && <span style={{ fontSize: '13px', color: 'var(--muted)' }}>⏳ Running…</span>}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
          Run one location + one category right now and preview the result.
        </p>

        <div style={{ ...s.grid2, marginBottom: '16px' }}>
          {/* Location */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Location</label>
            <select
              style={s.select}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              disabled={testRunning}
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.slug} value={loc.slug}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category — searchable combobox */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Category</label>
            <div ref={testDropdownRef} style={s.testDropdownWrapper}>
              <input
                style={s.input}
                placeholder="Search category…"
                value={
                  testCategory
                    ? testCategory.replace(/-/g, ' ')
                    : testCategorySearch
                }
                onChange={(e) => {
                  setTestCategorySearch(e.target.value);
                  setTestCategory('');
                  setTestShowDropdown(true);
                }}
                onFocus={() => setTestShowDropdown(true)}
                disabled={testRunning}
              />
              {testCategory && !testShowDropdown && (
                <span
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '11px',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setTestCategory('');
                    setTestCategorySearch('');
                  }}
                >
                  ✕
                </span>
              )}
              {testShowDropdown && (
                <div style={s.testDropdownList}>
                  {ALL_CATEGORIES.filter((c) =>
                    c.replace(/-/g, ' ')
                      .toLowerCase()
                      .includes((testCategorySearch || '').toLowerCase()),
                  ).map((cat) => (
                    <div
                      key={cat}
                      style={{
                        ...s.testDropdownItem,
                        background:
                          testCategory === cat
                            ? 'rgba(255,107,0,0.08)'
                            : 'transparent',
                      }}
                      onClick={() => {
                        setTestCategory(cat);
                        setTestCategorySearch('');
                        setTestShowDropdown(false);
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'var(--light)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          testCategory === cat
                            ? 'rgba(255,107,0,0.08)'
                            : 'transparent')
                      }
                    >
                      {cat.replace(/-/g, ' ')}
                    </div>
                  ))}
                  {ALL_CATEGORIES.filter((c) =>
                    c.replace(/-/g, ' ')
                      .toLowerCase()
                      .includes((testCategorySearch || '').toLowerCase()),
                  ).length === 0 && (
                    <div style={{ ...s.testDropdownItem, color: 'var(--muted)' }}>
                      No categories match
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            style={{
              ...s.btn,
              ...s.btnSecondary,
              fontSize: '13px',
              padding: '10px 24px',
            }}
            onClick={handleTestRun}
            disabled={!testCategory || testRunning}
          >
            ▶️ Run Test
          </button>
          {testState?.status === 'completed' && (
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
              Completed {testState.completedAt && new Date(testState.completedAt).toLocaleTimeString()}
              {testState.resultCount > 0 && ` · ${testState.resultCount} businesses`}
            </span>
          )}
          {testState?.status === 'running' && (
            <span style={{ fontSize: '12px', color: '#92400e' }}>⏳ Running…</span>
          )}
          {/* Re-use main batch params — show a quick summary */}
          <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: 'auto' }}>
            maxResults: {params.maxResults} · {params.extractionMethod}
          </span>
        </div>

        {/* ─── Test Results ─── */}
        {testState?.status === 'failed' && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: '#fee2e2',
              borderRadius: '8px',
              color: '#991b1b',
              fontSize: '13px',
            }}
          >
            ❌ {testState.error || 'Test failed'}
          </div>
        )}

        {testState?.status === 'running' && (
          <div style={{ marginTop: '16px', padding: '12px 16px', background: '#fef3c7', borderRadius: '8px', fontSize: '13px', color: '#92400e' }}>
            ⏳ Scraping in progress…
          </div>
        )}

        {testState?.status === 'completed' && testState.result && (
          <div style={{ marginTop: '20px' }}>
            <div style={s.resultSummary}>
              <span style={s.summaryChip}>
                📍 {LOCATIONS.find((l) => l.slug === selectedLocation)?.name || selectedLocation}
              </span>
              <span style={s.summaryChip}>
                📂 {testState.category?.replace(/-/g, ' ')}
              </span>
              <ResultCountChip result={testState.result} />
            </div>
            <ResultViewer result={testState.result} />
          </div>
        )}
      </div>

      {/* ─── Step 1: Location ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>📍 Select Location</h2>
        <select
          style={s.select}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          disabled={polling}
        >
          {LOCATIONS.map((loc) => (
            <option key={loc.slug} value={loc.slug}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* ─── Step 2: Categories ─── */}
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>📂 Categories</h2>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            {selectedCategories.size} / {ALL_CATEGORIES.length} selected
          </span>
        </div>

        {/* Search + toggle all */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            style={{ ...s.input, flex: 1 }}
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={polling}
          />
          <button
            style={{ ...s.btn, ...s.btnOutline, padding: '10px 16px', fontSize: '12px' }}
            onClick={toggleAllFiltered}
            disabled={polling}
          >
            {filteredCategories.every((c) => selectedCategories.has(c))
              ? 'Deselect All'
              : 'Select All'}
          </button>
        </div>

        <div style={s.categoryGrid}>
          {filteredCategories.map((cat) => (
            <label
              key={cat}
              style={{
                ...s.catItem,
                background: selectedCategories.has(cat)
                  ? 'rgba(255,107,0,0.08)'
                  : 'transparent',
              }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.has(cat)}
                onChange={() => toggleCategory(cat)}
                style={s.catCheckbox}
                disabled={polling}
              />
              {cat.replace(/-/g, ' ')}
            </label>
          ))}
        </div>
      </div>

      {/* ─── Start Button ─── */}
      {!polling && !batchState?.isComplete && (
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <button
            style={{ ...s.btn, ...s.btnPrimary, fontSize: '16px', padding: '16px 48px' }}
            onClick={handleStartClick}
            disabled={selectedCategories.size === 0}
          >
            🚀 Start Scraping
          </button>
          {selectedCategories.size === 0 && (
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>
              Select at least one category to begin.
            </p>
          )}
        </div>
      )}

      {/* ─── Parameter Dialog ─── */}
      {showParams && (
        <div style={s.overlay} onClick={() => setShowParams(false)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={s.modalTitle}>⚙️ Scraper Parameters</h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
              These settings will apply to <strong>{locationName}</strong> across all{' '}
              <strong>{selectedCategories.size}</strong> selected categories.
            </p>

            <div style={s.grid2}>
              <div style={s.fieldGroup}>
                <label style={s.label}>City</label>
                <input
                  style={s.input}
                  value={params.city}
                  onChange={(e) => setParams({ ...params, city: e.target.value })}
                  placeholder="e.g., Mumbai"
                />
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Max Results</label>
                <input
                  style={s.input}
                  type="number"
                  min={1}
                  max={500}
                  value={params.maxResults}
                  onChange={(e) => setParams({ ...params, maxResults: Number(e.target.value) })}
                />
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Extraction Method</label>
                <select
                  style={s.select}
                  value={params.extractionMethod}
                  onChange={(e) => setParams({ ...params, extractionMethod: e.target.value })}
                >
                  <option value="fast">Fast</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Max Reviews</label>
                <input
                  style={s.input}
                  type="number"
                  min={0}
                  max={200}
                  value={params.maxReviews}
                  onChange={(e) => setParams({ ...params, maxReviews: Number(e.target.value) })}
                />
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Max Photos</label>
                <input
                  style={s.input}
                  type="number"
                  min={0}
                  max={200}
                  value={params.maxPhotos}
                  onChange={(e) => setParams({ ...params, maxPhotos: Number(e.target.value) })}
                />
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Min Reviews Filter</label>
                <input
                  style={s.input}
                  type="number"
                  min={0}
                  value={params.filterReviewsGt}
                  onChange={(e) => setParams({ ...params, filterReviewsGt: e.target.value ? Number(e.target.value) : '' })}
                  placeholder="e.g., 50"
                />
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Max Reviews Filter</label>
                <input
                  style={s.input}
                  type="number"
                  min={0}
                  value={params.filterReviewsLt}
                  onChange={(e) => setParams({ ...params, filterReviewsLt: e.target.value ? Number(e.target.value) : '' })}
                  placeholder="e.g., 500"
                />
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Language Code</label>
                <input
                  style={s.input}
                  value={params.lang}
                  onChange={(e) => setParams({ ...params, lang: e.target.value })}
                  placeholder="e.g., en, hi, mr"
                />
              </div>
            </div>

            <div style={{ marginTop: '8px', marginBottom: '16px' }}>
              <label style={s.label}>Enrichment Filters</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { value: 'not_permanently_closed', label: 'Not Closed' },
                  { value: 'good_rating', label: 'Good Rating' },
                ].map((opt) => (
                  <label key={opt.value} style={s.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={params.enrichmentFilters.includes(opt.value)}
                      onChange={() => {
                        setParams((prev) => {
                          const next = [...prev.enrichmentFilters];
                          if (next.includes(opt.value)) {
                            return {
                              ...prev,
                              enrichmentFilters: next.filter((f) => f !== opt.value),
                            };
                          }
                          next.push(opt.value);
                          return { ...prev, enrichmentFilters: next };
                        });
                      }}
                      style={{ accentColor: 'var(--red)' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div style={s.grid2}>
              {[
                { key: 'enableWebsiteContacts', label: 'Extract Website Contacts' },
                { key: 'enableEmailsSocial', label: 'Extract Emails & Social' },
                { key: 'enableReviewsExtraction', label: 'Extract Reviews' },
                { key: 'enablePhotosExtraction', label: 'Extract Photos' },
                { key: 'enablePhoneInfo', label: 'Extract Phone Info' },
              ].map((opt) => (
                <label key={opt.key} style={s.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={params[opt.key]}
                    onChange={() =>
                      setParams({ ...params, [opt.key]: !params[opt.key] })
                    }
                    style={{ accentColor: 'var(--red)' }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button style={{ ...s.btn, ...s.btnOutline }} onClick={() => setShowParams(false)}>
                Cancel
              </button>
              <button
                style={{ ...s.btn, ...s.btnPrimary }}
                onClick={handleRun}
              >
                ▶️ Run — {locationName} ({selectedCategories.size} categories)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Progress & Results ─── */}
      {(polling || batchState?.isComplete) && batchState && (
        <div style={s.card}>
          <h2 style={s.cardTitle}>
            {batchState.isComplete ? '📊 Scraping Complete' : '⏳ Scraping in Progress'}
          </h2>

          {/* Progress bar */}
          <div style={s.progressBarOuter}>
            <div
              style={{
                ...s.progressBarInner,
                width: `${Math.min(progress.percent || 0, 100)}%`,
              }}
            />
          </div>

          {/* Stats */}
          <div style={{ ...s.grid2, marginBottom: '20px' }}>
            <div style={s.statCard}>
              <div style={s.statNum}>{progress.completed}</div>
              <div style={s.statLabel}>Completed</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statNum}>{progress.failed}</div>
              <div style={s.statLabel}>Failed</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statNum}>{progress.running}</div>
              <div style={s.statLabel}>Running</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statNum}>{progress.total}</div>
              <div style={s.statLabel}>Total Categories</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statNum}>{batchState.totalBusinessesFound}</div>
              <div style={s.statLabel}>Businesses Found</div>
            </div>
            <div style={s.statCard}>
              <div style={s.statNum}>
                {batchState.completedAt
                  ? Math.round(
                      (new Date(batchState.completedAt) - new Date(batchState.startedAt)) /
                        1000 /
                        60,
                    )
                  : Math.round(
                      (new Date() - new Date(batchState.startedAt)) / 1000 / 60,
                    )}
                m
              </div>
              <div style={s.statLabel}>Elapsed Time</div>
            </div>
          </div>

          {/* Per-category status */}
          <div style={s.statusList}>
            <div
              style={{
                ...s.statusRow,
                background: 'var(--light)',
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              <span>Category</span>
              <span>Status</span>
            </div>
            {batchState.categories.map((cat) => (
              <div key={cat.slug} style={s.statusRow}>
                <span>
                  {STATUS_ICONS[cat.status]}{' '}
                  {cat.slug.replace(/-/g, ' ')}
                  {cat.resultCount > 0 && (
                    <span style={{ color: 'var(--muted)', fontSize: '11px', marginLeft: '6px' }}>
                      ({cat.resultCount})
                    </span>
                  )}
                  {cat.error && (
                    <span style={{ color: 'var(--red)', fontSize: '11px', marginLeft: '6px', display: 'block' }}>
                      {cat.error}
                    </span>
                  )}
                </span>
                <span
                  style={{
                    ...s.badge,
                    ...(BADGE_STYLES[cat.status] || s.badgePending),
                  }}
                >
                  {cat.status}
                </span>
              </div>
            ))}
          </div>

          {/* Actions when complete */}
          {batchState.isComplete && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                style={{ ...s.btn, ...s.btnPrimary }}
                onClick={() => {
                  // Trigger download of combined results
                  const url = `/api/scraper/download/${batchState.batchId}`;
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `scraper-results-${batchState.batchId}-${batchState.location}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                disabled={batchState.totalBusinessesFound === 0}
              >
                📥 Download All Results
              </button>
              <button
                style={{ ...s.btn, ...s.btnSecondary }}
                onClick={() => {
                  setBatchId(null);
                  setBatchState(null);
                  setPolling(false);
                }}
              >
                🔄 Start New Scrape
              </button>
            </div>
          )}
        </div>
      )}
      </>}

      {/* ─── Previous Runs ─── */}
      {batchHistory.length > 0 && (
        <div style={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>📋 Previous Runs</h2>
            <button
              style={{ ...s.btn, ...s.btnOutline, padding: '6px 14px', fontSize: '11px' }}
              onClick={loadHistory}
              disabled={historyLoading}
            >
              ↻ Refresh
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {batchHistory.map((b) => {
              const completed = b.categories.filter((c) => c.status === 'completed').length;
              const failed = b.categories.filter((c) => c.status === 'failed').length;
              const total = b.categories.length;
              const pct = total > 0 ? Math.round(((completed + failed) / total) * 100) : 0;
              const isActive = b.batchId === batchId;

              return (
                <div
                  key={b.batchId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: isActive ? '2px solid var(--red)' : '1px solid var(--border)',
                    background: isActive ? 'rgba(255,107,0,0.04)' : '#fff',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Location badge */}
                  <span style={{
                    ...s.summaryChip,
                    background: 'var(--red)',
                    color: '#fff',
                    fontSize: '12px',
                    padding: '4px 12px',
                    whiteSpace: 'nowrap',
                  }}>
                    {slugToDisplay(b.location)}
                  </span>

                  {/* Date */}
                  <span style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    {new Date(b.startedAt).toLocaleDateString(undefined, {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </span>

                  {/* Stats */}
                  <span style={{ fontSize: '12px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    ✅{completed} ❌{failed} / {total} · {b.totalBusinessesFound} biz
                  </span>

                  {/* Progress bar (compact) */}
                  <div style={{
                    flex: 1, minWidth: '80px', height: '6px',
                    background: 'var(--border)', borderRadius: '100px', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', width: `${Math.min(pct, 100)}%`,
                      background: pct === 100 ? '#10b981' : 'var(--red)',
                      borderRadius: '100px', transition: 'width 0.3s',
                    }} />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                    <button
                      style={{ ...s.btn, ...s.btnOutline, padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => {
                        // Load this batch into the main progress viewer
                        setBatchId(b.batchId);
                        setBatchState(b);
                        setPolling(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      👁️ View
                    </button>
                    <button
                      style={{ ...s.btn, ...s.btnOutline, padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => {
                        const url = `/api/scraper/download/${b.batchId}`;
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `scraper-results-${b.batchId}-${b.location}.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      disabled={b.totalBusinessesFound === 0}
                    >
                      📥
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Batch ID footer (shown when a batch is active) */}
      {batchId && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'monospace' }}>
            Batch: {batchId}
          </span>
        </div>
      )}
    </div>
  );
}
