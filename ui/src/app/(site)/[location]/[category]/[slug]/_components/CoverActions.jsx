"use client";

import { useState, useRef, useEffect } from "react";
import { useLightbox } from "./InteractivityContext";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#000000">
    <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
  </svg>
);

export default function CoverActions({ images, businessName, categoryEmoji }) {
  const { openLightbox } = useLightbox();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef(null);
  const count = images?.length || 0;

  const handleView = () => openLightbox(images, 0, businessName);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFullUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    const fullUrl = getFullUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: businessName || document.title, url: fullUrl });
        return;
      } catch (err) {
        // user cancelled — no-op
      }
    }
    setOpen((prev) => !prev);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // clipboard failed — no-op
    }
  };

  return (
    <>
      <div className="l-cover-actions" ref={wrapRef}>
        <button className="cover-btn" onClick={handleView}>
          📷 View Photos
        </button>
        <button className="cover-btn" onClick={handleShare}>
          {copied ? "✅ Copied!" : "📤 Share"}
        </button>

        {open && (
          <div className="share-menu">
            <button type="button" className="share-copy" onClick={handleCopy}>
              {copied ? "✅ Copied" : "🔗 Copy Link"}
            </button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getFullUrl())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={`https://www.threads.net/intent/post?text=${encodeURIComponent(`${businessName || ""} ${getFullUrl()}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon"
              title="Threads"
            >
              <ThreadsIcon />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${businessName || ""} ${getFullUrl()}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon"
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>
        )}
      </div>
      <div className="photo-count-badge" onClick={handleView}>
        📷 {count} Photos
      </div>
    </>
  );
}
