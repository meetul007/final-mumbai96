import { isOpenNow, formatTime } from "@/lib/formatHours";
import { isEmbedMapUrl, openableMapUrl, directionsUrl } from "@/lib/mapUrl";
import "./style.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractivityProvider } from "./_components/InteractivityContext";
import CoverActions from "./_components/CoverActions";
import GalleryGrid from "./_components/GalleryGrid";
import ReadMore from "./_components/ReadMore";
import ShareButton from "./_components/ShareButton";
import StickyTabs from "./_components/StickyTabs";
import ContactBox from "./_components/ContactBox";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// ── Helpers ──────────────────────────────────────────────────────
const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_LABELS = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};
const AVATAR_COLORS = [
  "#e05500",
  "#371b58",
  "#10B981",
  "#7c3aed",
  "#0d9488",
  "#2563eb",
  "#db2777",
  "#ca8a04",
];

function waNumber(phone) {
  if (!phone) return "";
  let digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (!digits.startsWith("91")) digits = `91${digits}`;
  return digits;
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

// ✅ API CALL
async function getBusinessDetail(location, category, slug) {
  const res = await fetch(
    `${API_BASE}/api/public/business/${location}/${category}/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (res.status === 404) notFound();

  if (!res.ok) throw new Error("Failed to fetch business");

  return res.json();
}

// ✅ SEO
export async function generateMetadata({ params }) {
  const { location, category, slug } = await params;
  const data = await getBusinessDetail(location, category, slug);

  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: { canonical: data.seo.canonical },
    robots: data.seo.indexable ? "index, follow" : "noindex",
  };
}

// ✅ PAGE
export default async function ListingDetailPage({ params }) {
  const { location, category, slug } = await params;
  const data = await getBusinessDetail(location, category, slug);

  const business = data.business;
  const listing = data.listing;
  const locationInfo = data.location;
  const categoryInfo = data.category;

  const services = listing.services || [];
  const features = listing.features || [];
  const reviews = data.reviews || [];
  const similar = data.similar || [];

  const categoryEmoji = categoryInfo.emoji || "🏛️";
  const phone = listing.phone || "";
  const waLink = `https://wa.me/${waNumber(phone)}`;
  const website = business.website || "";
  const websiteDomain = website.replace(/^https?:\/\//, "");
  const mapUrl =
    listing.google_map_url ||
    `https://maps.google.com/?q=${encodeURIComponent(listing.address || "")}`;
  const mapIsEmbed = isEmbedMapUrl(mapUrl);
  const openMapUrl = openableMapUrl(mapUrl, listing.address);
  const directionsHref = directionsUrl(mapUrl, listing.address);

  const coverImg =
    listing.banner_image || business.logo || business.gallery?.gallery?.[0] || "";
  // Fix #1 — hide the whole cover/photo section when there's no business image at all
  const hasCoverImage = Boolean(coverImg);

  const rating = business.rating || 0;
  const reviewCount = business.review_count || reviews.length || 0;
  const stars = "★".repeat(Math.round(rating));

  const openNow = isOpenNow(listing.opening_hours);
  const todayKey = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    new Date().getDay()
  ];

  // Fix #6 — only show the Description section when there's real content
  const aboutTrimmed = String(listing.about || "").trim();
  const descTrimmed = String(business.description || "").trim();
  const hasAboutContent = aboutTrimmed.length > 0 && aboutTrimmed !== descTrimmed;
  const hasDescription = Boolean(descTrimmed) || hasAboutContent;

  // Rating distribution — real data when reviews exist, else fallback
  let dist = [];
  if (reviews.length > 0) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      const s = Math.round(r.rating || 0);
      if (s >= 1 && s <= 5) counts[s] += 1;
    });
    dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      pct: counts[star] / reviews.length,
    }));
  } else {
    dist = [
      { star: 5, pct: 0.7 },
      { star: 4, pct: 0.18 },
      { star: 3, pct: 0.06 },
      { star: 2, pct: 0.03 },
      { star: 1, pct: 0.01 },
    ];
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "amenities", label: "Amenities" },
    { id: "features", label: "Features" },
    { id: "gallery", label: "Gallery" },
    { id: "hours", label: "Hours" },
    { id: "location", label: "Location" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <InteractivityProvider>
      {/* ── COVER ── (Fix #1: hidden entirely when there's no business image) */}
      {hasCoverImage && (
        <div className="l-cover">
          <div
            className="l-cover-img"
            style={{
              backgroundImage: `url(${coverImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="l-cover-overlay" />

          <CoverActions
            images={business.gallery?.gallery || []}
            businessName={business.name}
            categoryEmoji={categoryEmoji}
          />
        </div>
      )}

      {/* ── STICKY TABS ── */}
      <StickyTabs tabs={tabs} />

      {/* ── LISTING HEADER ── */}
      <div className="l-hd">
        <div className="con">
          <div className="l-hd-inner">
            <div className="l-hd-avatar">{categoryEmoji}</div>

            <div className="l-hd-meta">
              <div className="l-hd-badges">
                {/* Fix #2 — "✓ Verified" badge removed */}
                <span className="hbadge hb-cat">
                  {categoryEmoji} {categoryInfo.name}
                </span>
                <span
                  className={`hbadge ${openNow ? "hb-open" : "hb-closed"}`}
                >
                  {openNow ? "● Open Now" : "● Closed Now"}
                </span>
              </div>

              <h1 className="l-name">{business.name}</h1>

              <div className="l-rating-row">
                <span className="l-stars">{stars}</span>
                <strong style={{ color: "var(--ink)" }}>{rating}</strong>
                <span>{reviewCount} Reviews</span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span>{locationInfo.name}</span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span>{categoryInfo.name}</span>
              </div>

              <div className="l-addr">📍 {listing.address}</div>

              <div className="l-hd-cta">
                {/* Fix #3 — Send Message button removed */}

                {phone && (
                  <>
                    <a href={waLink} target="_blank" className="btn-wa">
                      💬 WhatsApp
                    </a>

                    <a href={`tel:${phone}`} className="btn-call">
                      📞 {phone}
                    </a>
                  </>
                )}

                {/* Fix #4 — Save/heart button removed */}
                <ShareButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="l-body">
        <div className="con">
          {/* BREADCRUMB */}
          <div className="bc">
            <Link href="/">Home</Link>
            <span className="bc-sep">/</span>

            <Link href={`/${locationInfo.slug}`}>{locationInfo.name}</Link>

            <span className="bc-sep">/</span>

            <Link href={`/${locationInfo.slug}/${categoryInfo.slug}`}>
              {categoryInfo.name}
            </Link>

            <span className="bc-sep">/</span>

            <span>{business.name}</span>
          </div>

          <div className="l-grid">
            {/* ════════════ LEFT COLUMN ════════════ */}
            <div>
              {/* DESCRIPTION — Fix #6: hidden entirely when there's nothing to show */}
              {hasDescription && (
                <div className="lc" id="overview">
                  <div className="lc-hd">
                    <h3>DESCRIPTION</h3>
                  </div>

                  <div className="lc-body">
                    {business.description && (
                      <p className="desc-p">{business.description}</p>
                    )}

                    {hasAboutContent && (
                      <ReadMore>
                        {String(listing.about)
                          .split(/\n{2,}/)
                          .filter(Boolean)
                          .map((para, i) => (
                            <p key={i} className="desc-p">
                              {para}
                            </p>
                          ))}
                      </ReadMore>
                    )}
                  </div>
                </div>
              )}

              {/* GALLERY — hides itself when fewer than 2 photos (Fix #7) */}
              <GalleryGrid
                images={business.gallery?.gallery || []}
                businessName={business.name}
                categoryEmoji={categoryEmoji}
              />

              {/* AMENITIES & SERVICE OPTIONS */}
              <div className="lc" id="amenities">
                <div className="lc-hd">
                  <h3>AMENITIES &amp; SERVICE OPTIONS</h3>
                </div>

                <div className="lc-body">
                  {services.length > 0 && (
                    <>
                      <div className="feat-section-title">Service Options</div>
                      <div className="feat-chips">
                        {services.map((s, i) => (
                          <span key={i} className="feat-chip on">
                            ✅ {s}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {features.length > 0 && (
                    <>
                      <div className="feat-section-title">
                        Features &amp; Facilities
                      </div>
                      <div className="feat-chips">
                        {features.map((f, i) => (
                          <span key={i} className="feat-chip on">
                            ⭐ {f}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {services.length === 0 && features.length === 0 && (
                    <p className="desc-p">
                      Amenities and service options for this business are being
                      updated. Contact them directly for details.
                    </p>
                  )}
                </div>
              </div>

              {/* HIGHLIGHTS & FEATURES */}
              <div className="lc" id="features">
                <div className="lc-hd">
                  <h3>HIGHLIGHTS &amp; FEATURES</h3>
                </div>

                <div className="lc-body">
                  <div className="feat-section-title">Business Highlights</div>
                  <div className="feat-grid">
                    <div className="feat-item">
                      <div className="feat-icon">⭐</div>
                      <div className="feat-text">
                        <strong>{rating} Rated</strong>
                        <span>{reviewCount} verified reviews</span>
                      </div>
                    </div>
                    <div className="feat-item">
                      <div className="feat-icon">📊</div>
                      <div className="feat-text">
                        <strong>{categoryInfo.name}</strong>
                        <span>Verified category</span>
                      </div>
                    </div>
                    <div className="feat-item">
                      <div className="feat-icon">📍</div>
                      <div className="feat-text">
                        <strong>{locationInfo.name}</strong>
                        <span>Mumbai</span>
                      </div>
                    </div>
                    {website && (
                      <div className="feat-item">
                        <div className="feat-icon">🌐</div>
                        <div className="feat-text">
                          <strong>{websiteDomain}</strong>
                          <span>Official website</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {services.length > 0 && (
                    <>
                      <div className="feat-section-title">
                        Services — Quick Overview
                      </div>
                      <div className="feat-chips">
                        {services.map((s, i) => (
                          <span key={i} className="feat-chip on">
                            {s}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* BUSINESS HOURS */}
              <div className="lc" id="hours">
                <div className="lc-hd">
                  <h3>BUSINESS HOURS</h3>
                </div>

                <div className="lc-body">
                  <div className="hours-list">
                    {DAY_ORDER.map((day) => {
                      const val = (listing.opening_hours || {})[day];
                      const isToday = day === todayKey;
                      const isClosed = !val || val.closed;

                      let timeText;
                      if (isClosed) {
                        timeText = "Closed";
                      } else {
                        timeText = `${formatTime(val.open)} – ${formatTime(
                          val.close,
                        )}`;
                        if (isToday) {
                          timeText = `${openNow ? "● Open Now · " : "● Closed · "}${timeText}`;
                        }
                      }

                      return (
                        <div key={day} className="hl-row">
                          <span
                            className={`hl-day${isToday ? " today" : ""}`}
                          >
                            {DAY_LABELS[day]}
                          </span>

                          <span
                            className={
                              isToday && !isClosed
                                ? openNow
                                  ? "hl-time now-open"
                                  : "hl-time now-closed"
                                : "hl-time"
                            }
                            style={
                              isClosed && !isToday
                                ? {
                                    color: "var(--muted)",
                                    fontStyle: "italic",
                                  }
                                : undefined
                            }
                          >
                            {timeText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* LOCATION & MAP */}
              <div className="lc" id="location">
                <div className="lc-hd">
                  <h3>LOCATION &amp; MAP</h3>
                </div>

                <div className="lc-body">
                  <div className={`map-embed${mapIsEmbed ? " map-embed-live" : ""}`}>
                  {mapIsEmbed ? (
                    <iframe
                      src={mapUrl}
                      title="Map"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  ) : (
                    <div className="map-pin">📍</div>
                  )}

                  <a
                    className="map-open-btn"
                    href={openMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>

                  <div style={{ marginTop: "14px" }}>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--ink)",
                        marginBottom: "4px",
                      }}
                    >
                      {listing.address}
                    </p>

                    {listing.landmark && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "var(--muted)",
                          marginBottom: "14px",
                        }}
                      >
                        {listing.landmark}
                      </p>
                    )}

                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      <a
                        href={directionsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-btn"
                      >
                        🧭 Get Directions
                      </a>

                      {/* Fix #13 — Street View link removed */}
                    </div>
                  </div>
                </div>
              </div>

              {/* REVIEWS */}
              <div className="lc" id="reviews">
                <div className="lc-hd">
                  <h3>
                    REVIEWS{" "}
                    <span
                      style={{
                        fontFamily: "'Sora',sans-serif",
                        fontSize: ".9rem",
                        fontWeight: 300,
                        color: "var(--muted)",
                      }}
                    >
                      ({reviewCount})
                    </span>
                  </h3>

                  {/* Fix #12 — "Write a Review" link removed */}
                </div>

                <div className="lc-body">
                  {/* SUMMARY */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid var(--border)",
                      marginBottom: "4px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div className="rtg-big">{rating}</div>
                      <div className="rtg-stars">{stars}</div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--muted)",
                          marginTop: "4px",
                        }}
                      >
                        {reviewCount} reviews
                      </div>
                    </div>

                    <div
                      className="rtg-bars"
                      style={{ flex: 1, minWidth: "180px" }}
                    >
                      {dist.map((d) => (
                        <div key={d.star} className="rb">
                          <span style={{ width: "10px" }}>{d.star}</span>
                          <div className="rb-track">
                            <div
                              className="rb-fill"
                              style={{ width: `${Math.max(2, d.pct * 100)}%` }}
                            />
                          </div>
                          <span>
                            {d.count !== undefined
                              ? d.count
                              : Math.round(d.pct * reviewCount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LIST */}
                  <div className="rev-list">
                    {reviews.length > 0 ? (
                      reviews.map((rev, i) => (
                        <div key={i} className="rev">
                          <div className="rev-top">
                            <div
                              className="rev-av"
                              style={{
                                background:
                                  AVATAR_COLORS[i % AVATAR_COLORS.length],
                              }}
                            >
                              {(rev.name || "R").charAt(0)}
                            </div>

                            <div>
                              <div className="rev-name">
                                {rev.name || "Anonymous"}
                              </div>
                              <div className="rev-date">
                                {[
                                  rev.area && `${rev.area}`,
                                  timeAgo(rev.date),
                                ]
                                  .filter(Boolean)
                                  .join(" · ") || "Recently"}
                              </div>
                            </div>

                            <span className="rev-stars">
                              {"★".repeat(Math.round(rev.rating || 0))}
                            </span>
                          </div>

                          {rev.title && (
                            <p className="rev-text">
                              <strong>{rev.title}</strong>
                            </p>
                          )}

                          <p className="rev-text">{rev.comment}</p>

                          {rev.reply && (
                            <div className="rev-reply">
                              <strong>{business.name} replied:</strong>
                              <p>{rev.reply}</p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: "13px",
                          paddingTop: "14px",
                        }}
                      >
                        No reviews yet.
                      </p>
                    )}
                  </div>

                  {/* Fix #12 — "+ Write a Review" button removed */}
                </div>
              </div>
            </div>

            {/* ════════════ SIDEBAR ════════════ */}
            <div className="l-sidebar">
              {/* CONTACT */}
              <ContactBox businessName={business.name} phone={phone} />

              {/* BUSINESS INFO */}
              <div className="info-card">
                <div className="info-title">Business Info</div>

                <div className="info-list">
                  <div className="il-row">
                    <div className="il-icon">📊</div>
                    <div>
                      <div className="il-label">Category</div>
                      <div className="il-val">{categoryInfo.name}</div>
                    </div>
                  </div>

                  <div className="il-row">
                    <div className="il-icon">📍</div>
                    <div>
                      <div className="il-label">Area</div>
                      <div className="il-val">
                        <Link href={`/${locationInfo.slug}`}>
                          {locationInfo.name}, Mumbai
                        </Link>
                      </div>
                    </div>
                  </div>

                  {website && (
                    <div className="il-row">
                      <div className="il-icon">🌐</div>
                      <div>
                        <div className="il-label">Website</div>
                        <div className="il-val">
                          <a href={website} target="_blank">
                            {websiteDomain} ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="il-row">
                    <div className="il-icon">⭐</div>
                    <div>
                      <div className="il-label">Rating</div>
                      <div className="il-val">
                        {rating} ({reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIMILAR — Fix #10: links open in a new tab */}
              {similar.length > 0 && (
                <div className="info-card">
                  <div className="info-title">
                    Similar in {locationInfo.name}
                  </div>

                  <div>
                    {similar.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.location_slug || locationInfo.slug}/${item.category_slug || categoryInfo.slug}/${item.slug}`}
                        className="sim-item"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="sim-thumb">{categoryEmoji}</div>

                        <div>
                          <div className="sim-name">{item.name}</div>
                          <div className="sim-cat">
                            {item.category_name || categoryInfo.name} ·{" "}
                            {item.location_name || locationInfo.name}
                          </div>
                          <div className="sim-rating">
                            {"★".repeat(Math.round(item.rating || 0))}{" "}
                            {item.rating?.toFixed(1)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Fix #11 — "Report this listing" block removed */}
            </div>
          </div>
        </div>
      </div>
    </InteractivityProvider>
  );
}
