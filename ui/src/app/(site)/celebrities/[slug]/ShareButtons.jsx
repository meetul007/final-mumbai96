"use client";

import { useState } from "react";

export function ShareButtons({ fullName }) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const handleWhatsApp = () => {
    const text = `${fullName} | Mumbai96 ${getShareUrl()}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
      "_blank",
      "noopener,noreferrer,width=600,height=500"
    );
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="celeb-share-strip">
      <button className="celeb-share-btn" onClick={handleWhatsApp} aria-label="Share on WhatsApp">
        📱 WhatsApp
      </button>
      <button className="celeb-share-btn" onClick={handleFacebook} aria-label="Share on Facebook">
        📘 Facebook
      </button>
      <button className="celeb-share-btn" onClick={handleCopyLink} aria-label="Copy link">
        {copied ? "✅ Copied" : "🔗 Copy Link"}
      </button>
    </div>
  );
}
