"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const PER_PAGE = 20;

const CATEGORY_LABELS = {
  all: "⭐ All Stars",
  actor: "🎬 Actors",
  actress: "💃 Actresses",
  tv: "📺 TV Celebs",
  natak: "🎭 Natak / Theatre",
  director: "🎥 Directors",
  producer: "🎬 Producers",
  influencer: "📱 Influencers",
  sports: "🏏 Sports",
  sportsperson: "🏅 Sportspersons",
  music: "🎵 Music",
  musician: "🎼 Musicians",
  business: "💼 Business",
  comedian: "😂 Comedians",
  designer: "✂️ Designers",
  news: "📰 News",
};

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS);

const DOT_CLASS = {
  actor: "dot-actor",
  actress: "dot-actress",
  tv: "dot-tv",
  natak: "dot-natak",
  director: "dot-producer",
  producer: "dot-producer",
  influencer: "dot-influencer",
  sports: "dot-sports",
  sportsperson: "dot-sports",
  music: "dot-music",
  musician: "dot-music",
  business: "dot-producer",
  comedian: "dot-influencer",
  designer: "dot-influencer",
  news: "dot-tv",
};

export default function CelebritiesClient({ initialData }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [celebrities, setCelebrities] = useState(initialData.celebrities);
  const [featured] = useState(initialData.featured);
  const [total, setTotal] = useState(initialData.total);
  const [pages, setPages] = useState(initialData.pages);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialData.categories);
  const initialLoaded = useRef(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const catParam = filter === "all" ? "" : filter;
      const res = await fetch(
        `${API_BASE}/api/public/celebrities?page=${page}&per_page=${PER_PAGE}&category=${catParam}&search=${encodeURIComponent(query)}`,
      );
      if (res.ok) {
        const json = await res.json();
        console.log(json, "json---");
        setCelebrities(json.celebrities);
        setTotal(json.pagination.total);
        setPages(json.pagination.pages);
        setCategories(json.categories);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [filter, query, page]);

  useEffect(() => {
    if (initialLoaded.current) {
      initialLoaded.current = false;
      return;
    }
    fetchData();
  }, [fetchData]);

  const handleFilter = (key) => {
    setFilter(key);
    setPage(1);
  };

  const handleSearch = (val) => {
    setQuery(val);
    setPage(1);
  };

  return (
    <div className="celeb-page">
      <header className="celeb-hero" role="banner">
        <div className="celeb-hero-content">
          <nav aria-label="Breadcrumb" className="celeb-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span aria-current="page">Celebrities</span>
          </nav>
          <span className="celeb-hero-tag">⭐ Mumbai Spotlight</span>
          <h1>
            MUMBAI'S BIGGEST <em>STARS.</em>
          </h1>
          <p className="celeb-hero-desc">
            Bollywood legends, Marathi natak artists, TV icons, digital
            influencers, top producers and sporting heroes — every celebrity who
            called Mumbai home, from Churchgate to Virar.
          </p>
          <div className="celeb-hero-stats">
            <div>
              <div className="celeb-stat-num">{total}+</div>
              <div className="celeb-stat-label">Profiles</div>
            </div>
            <div>
              <div className="celeb-stat-num">{categories.length || 9}</div>
              <div className="celeb-stat-label">Categories</div>
            </div>
            <div>
              <div className="celeb-stat-num">30+</div>
              <div className="celeb-stat-label">Neighbourhoods</div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="celeb-filter-bar"
        role="navigation"
        aria-label="Filter by category"
      >
        <div className="celeb-filter-inner">
          {CATEGORY_KEYS.map((key) => (
            <button
              key={key}
              className={`celeb-filter-btn ${filter === key ? "active" : ""}`}
              onClick={() => handleFilter(key)}
            >
              {CATEGORY_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <main id="celeb-main-content">
        {featured.length > 0 && filter === "all" && !query && (
          <section
            aria-labelledby="celeb-featured-h"
            className="celeb-featured-section"
          >
            <p className="celeb-section-label">Mumbai's Most Iconic</p>
            <h2 className="celeb-section-title" id="celeb-featured-h">
              FEATURED <em>CELEBRITIES</em>
            </h2>
            <div className="celeb-featured-grid">
              {featured.map((f) => (
                <article key={f.slug} className="celeb-feat-card">
                  <Link href={`/celebrities/${f.slug}`}>
                    <div className="celeb-feat-img">
                      {f.wikipedia_image_url ? (
                        <img
                          src={f.wikipedia_image_url}
                          alt={f.full_name}
                          loading="lazy"
                        />
                      ) : (
                        <span>{f.emoji}</span>
                      )}
                    </div>
                    <span className="celeb-feat-badge">{f.category}</span>
                    <span className="celeb-feat-star">⭐ Star</span>
                  </Link>
                  <div className="celeb-feat-body">
                    <h3 className="celeb-feat-name">
                      <Link href={`/celebrities/${f.slug}`}>
                        {f.full_name.toUpperCase()}
                      </Link>
                    </h3>
                    <p className="celeb-feat-prof">{f.profession}</p>
                    <div className="celeb-feat-meta">
                      {f.age && (
                        <span>
                          <strong>Age:</strong> {f.age}
                        </span>
                      )}
                      {f.children_count > 0 && (
                        <span>
                          <strong>Kids:</strong> {f.children_count}
                        </span>
                      )}
                      {f.marital_status && (
                        <span>
                          <strong>{f.marital_status}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="celeb-feat-footer">
                    <span className="celeb-feat-location">
                      📍 {f.mumbai_neighbourhood}
                    </span>
                    <span className="celeb-feat-cta">Profile →</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="celeb-all-h">
          <p className="celeb-section-label">The Complete Mumbai Directory</p>
          <h2 className="celeb-section-title" id="celeb-all-h">
            ALL MUMBAI <em>CELEBRITIES</em>
          </h2>

          <div className="celeb-legend">
            {categories.map((cat) => (
              <div key={cat.slug} className="celeb-legend-item">
                <div
                  className={`celeb-legend-dot ${DOT_CLASS[cat.slug] || ""}`}
                ></div>
                {cat.name} ({cat.count})
              </div>
            ))}
          </div>

          <div className="celeb-search-wrap">
            <span className="celeb-search-icon">🔍</span>
            <input
              type="search"
              className="celeb-search-input"
              placeholder="Search by name, area or profession…"
              aria-label="Search celebrities"
              autoComplete="off"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <p className="celeb-result-count">
            Showing <span>{total}</span> Mumbai celebrities
          </p>

          {loading ? (
            <p className="celeb-loading">Loading celebrities...</p>
          ) : celebrities.length === 0 ? (
            <div className="celeb-no-results">
              <p className="celeb-no-results-emoji">🔍</p>
              <p>
                No celebrities found. Try a different name, area or category.
              </p>
            </div>
          ) : (
            <div className="celebs-grid" role="list">
              {celebrities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/celebrities/${c.slug}`}
                  className="celeb-card"
                  role="listitem"
                >
                  <div className="celeb-card-img">
                    {c.wikipedia_image_url ? (
                      <img
                        src={c.wikipedia_image_url}
                        alt={c.full_name}
                        loading="lazy"
                      />
                    ) : (
                      <span>{c.emoji}</span>
                    )}
                    <span
                      className={`celeb-card-dot ${DOT_CLASS[c.category] || ""}`}
                    ></span>
                  </div>
                  <div className="celeb-card-body">
                    <h3 className="celeb-card-name">{c.full_name}</h3>
                    <p className="celeb-card-prof">{c.profession}</p>
                    <p className="celeb-card-area">
                      📍 {c.mumbai_neighbourhood}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pages > 1 && (
            <div className="celeb-pagination">
              {page > 1 && (
                <button
                  className="celeb-page-btn"
                  onClick={() => setPage(page - 1)}
                >
                  ← Prev
                </button>
              )}
              <span className="celeb-page-info">
                Page {page} of {pages}
              </span>
              {page < pages && (
                <button
                  className="celeb-page-btn"
                  onClick={() => setPage(page + 1)}
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </section>

        <div className="celeb-banner" role="complementary">
          <div>
            <h3>KNOW A MUMBAI CELEBRITY WE'VE MISSED?</h3>
            <p>
              Help us build the most complete celebrity directory — from
              Churchgate to Virar.
            </p>
          </div>
          <Link href="/contact-us" className="celeb-banner-btn">
            Suggest a Celebrity →
          </Link>
        </div>
      </main>
    </div>
  );
}
