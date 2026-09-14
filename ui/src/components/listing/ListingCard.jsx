"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { openableMapUrl } from "@/lib/mapUrl";
import { waLink } from "@/lib/whatsapp";
import ShareButton from "@/components/common/ShareButton";

// Some business names come from the data source fully in ALL CAPS
// (e.g. "KOTA KACHORI - FAMOUS FOR KACHORI BHAYANDER WEST"). CSS
// text-transform: capitalize can't fix that — it only capitalizes the
// first letter of each word and leaves the rest untouched, so an
// all-caps string stays all-caps. This normalizes to Title Case
// instead, without touching the underlying data.
function toTitleCase(str) {
  if (!str) return str;
  return str
    .toLowerCase()
    .replace(/(^|[\s\-(])\p{L}/gu, (c) => c.toUpperCase());
}

export default function ListingCard({ data, index }) {
  const gallery = data.images?.gallery || [];
  const maxPhotos = 4;
  const directionsUrl = openableMapUrl(data.google_map_url, data.address);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const displayName = toTitleCase(data.name);

  return (
    <div className={`lc ${data.featured ? "featured" : ""}`}>
      <div className="lc-inner">
        <div className="lc-rank">{String(index + 1).padStart(2, "0")}</div>

        <div className="lc-main">
          {/* Badges */}
          <div className="lc-badges">
            {data.verified && <span className="badge-v">✓ Verified</span>}
            <span className="badge-cat">{data.category}</span>
            {data.open && <span className="badge-open">● Open Now</span>}
            {data.featured && <span className="badge-featured">☆ Featured</span>}
          </div>

          {/* Name */}
          <div className="lc-name">
            <a href={data.url}>{displayName}</a>
          </div>

          {/* Rating */}
          <div className="lc-rating-row">
            <span className="lc-stars">{data.stars || "★★★★★"}</span>
            <span className="lc-score">{data.rating}</span>
            <span className="lc-revs">({data.reviews} reviews)</span>
            <span className="lc-sep">·</span>
            <span className="lc-exp">{data.experience}</span>
          </div>

          <p className="lc-desc">{data.description}</p>

          {/* Tags */}
          <div className="lc-chips">
            {data.tags?.map((tag, i) => (
              <span key={i} className="lc-chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="lc-addr">
            <span className="lc-addr-icon">📍</span>
            {data.address}
          </div>
        </div>

        {/* CTA */}
        <div className="lc-cta">
          {data.distance && <div className="lc-dist">{data.distance}</div>}

          {data.phone && (
            <a href={`tel:${data.phone}`} className="btn-call">
              📞 Call
            </a>
          )}
          {data.phone && (
            <a
              href={waLink(data.phone)}
              target="_blank" rel="noopener noreferrer" className="btn-wa"
            >
              💬 WhatsApp
            </a>
          )}

          {data.google_map_url && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dir"
            >
              🗺 Directions
            </a>
          )}

          <ShareButton url={data.url} title={data.name} />
        </div>
      </div>

      {/* ── Photo strip (only when there are actual images) ── */}
      {gallery.length > 0 && (
        <div className="lc-photos">
          {Array.from({ length: Math.min(gallery.length, maxPhotos) }).map((_, i) => {
            const photoUrl = gallery[i];
            const remaining =
              i === maxPhotos - 1 ? gallery.length - maxPhotos : 0;

            return (
              <div
                key={i}
                className="lc-photo"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`View photos of ${data.name}`}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
              >
                <img src={photoUrl} alt="" />
                {remaining > 0 && (
                  <div className="lc-photo-more">+{remaining}</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function PhotoLightbox({ photos, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const next = () => setIndex((i) => (i + 1) % photos.length);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  // Rendered via a portal straight into <body> — the card it's opened from
  // has `overflow: hidden` (for its rounded corners), which would otherwise
  // clip this to the card's own box instead of covering the full screen.
  return createPortal(
    <div className="lc-lightbox" onClick={onClose}>
      <button
        type="button"
        className="lc-lightbox-close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        ✕
      </button>
      <button
        type="button"
        className="lc-lightbox-nav lc-lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous photo"
      >
        ‹
      </button>
      <img
        src={photos[index]}
        alt=""
        className="lc-lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="lc-lightbox-nav lc-lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next photo"
      >
        ›
      </button>
      <div className="lc-lightbox-count">
        {index + 1} / {photos.length}
      </div>
    </div>,
    document.body,
  );
}
