"use client";

import { useEffect, useCallback } from "react";
import { useLightbox } from "./InteractivityContext";

export default function GalleryGrid({ images, businessName, categoryEmoji }) {
  const {
    isOpen,
    currentIndex,
    images: lbImages,
    businessName: lbName,
    openLightbox,
    closeLightbox,
  } = useLightbox();

  const total = images?.length || 0;

  const handleKey = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && lbImages.length) {
        openLightbox(
          lbImages,
          (currentIndex + 1) % lbImages.length,
          lbName,
        );
      }
      if (e.key === "ArrowLeft" && lbImages.length) {
        openLightbox(
          lbImages,
          (currentIndex - 1 + lbImages.length) % lbImages.length,
          lbName,
        );
      }
    },
    [isOpen, closeLightbox, lbImages, currentIndex, lbName, openLightbox],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Fix #7 — hide the entire gallery section when there are fewer than 2 photos
  if (total < 2) return null;

  const display = images.slice(0, 6);
  const hasMore = total > 6;
  const remaining = total - 6;
  const fallbackEmoji = categoryEmoji || "📸";

  const handleCell = (i) => openLightbox(images, i, businessName);

  const prev = (e) => {
    e.stopPropagation();
    openLightbox(
      lbImages,
      (currentIndex - 1 + lbImages.length) % lbImages.length,
      lbName,
    );
  };

  const next = (e) => {
    e.stopPropagation();
    openLightbox(lbImages, (currentIndex + 1) % lbImages.length, lbName);
  };

  return (
    <div className="lc" id="gallery">
      <div className="lc-hd">
        <h3>GALLERY</h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openLightbox(images, 0, businessName);
          }}
          className="gallery-view-all"
        >
          View All {total} Photos
        </a>
      </div>
      <div className="lc-body" style={{ padding: "14px" }}>
        <div className="gal-grid">
          {display.map((img, i) => {
            const isLast = i === 5 && hasMore;
            return (
              <div
                key={i}
                className={`gal-cell${isLast ? " more" : ""}`}
                onClick={() => handleCell(i)}
              >
                {img ? (
                  <img src={img} alt={businessName} />
                ) : (
                  <span className="gal-emoji">{fallbackEmoji}</span>
                )}
                {isLast && <div className="gal-more">+{remaining} More</div>}
              </div>
            );
          })}
        </div>
      </div>

      {isOpen && (
        <div className="lightbox open" onClick={closeLightbox}>
          <div className="lb-close" onClick={closeLightbox}>
            ✕
          </div>

          {lbImages.length > 1 && (
            <div className="lb-nav lb-prev" onClick={prev}>
              ‹
            </div>
          )}

          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            {lbImages[currentIndex] ? (
              <img
                src={lbImages[currentIndex]}
                alt={lbName}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "85vh",
                  objectFit: "contain",
                }}
              />
            ) : (
              <span style={{ fontSize: "6rem" }}>{fallbackEmoji}</span>
            )}
          </div>

          {lbImages.length > 1 && (
            <div className="lb-nav lb-next" onClick={next}>
              ›
            </div>
          )}

          <div
            style={{
              color: "rgba(255,255,255,.45)",
              fontSize: "12px",
              marginTop: "14px",
            }}
          >
            Photo {currentIndex + 1} of {lbImages.length} · {lbName}
          </div>
        </div>
      )}
    </div>
  );
}
