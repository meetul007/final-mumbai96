"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const STATS = [
  { value: "22M+", label: "Population" },
  { value: "603", label: "Sq Km Area" },
  { value: "96+", label: "Neighbourhoods" },
  { value: "7", label: "Islands at Origin" },
  { value: "\u20B9900Cr", label: "Daily GDP" },
  { value: "7.5M", label: "Daily Train Riders" },
];

export default function HeroKnowMumbai() {
  // ── Stars ──────────────────────────────────────
  useEffect(() => {
    const container = document.getElementById("km-heroStars");
    if (!container) return;
    for (let i = 0; i < 120; i++) {
      const star = document.createElement("div");
      star.className = "km-star";
      const size = Math.random() * 2.5 + 0.5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = 2 + Math.random() * 3;
      star.style.cssText = `width:${size}px;height:${size}px;top:${y}%;left:${x}%;animation-delay:${delay}s;animation-duration:${duration}s;`;
      container.appendChild(star);
    }
    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <section className="km-hero" id="top">
      {/* Sky photo background (set in CSS via url()) */}
      <div className="km-hero-sky" />

      {/* Stars */}
      <div id="km-heroStars" />

      {/* Grid overlay */}
      <div className="km-hero-grid-ov" />

      {/* Glow blobs */}
      <div className="km-hero-glow km-glow-1" />
      <div className="km-hero-glow km-glow-2" />

      {/* Skyline gradient strip */}
      <div className="km-skyline-strip" />

      {/* Content (bottom-aligned) */}
      <div className="con km-hero-content">
        <div className="km-hero-eyebrow rv">
          The City That Never Sleeps · 22 Million Stories
        </div>

        <h1 className="km-hero-h1 rv d1">
          KNOW<br />
          <span className="km-h1-line2">MUMBAI.</span>
          <span className="km-h1-line3">EVERYTHING &mdash; MUMBAI</span>
        </h1>

        <p className="km-hero-desc rv d2">
          From the fishing villages of Worli to the glass towers of BKC. From
          Dharavi&rsquo;s ingenuity to Marine Drive&rsquo;s golden light. This
          is the most complete guide to the city Mumbai really is &mdash; not
          just what guidebooks say.
        </p>

        <div className="km-hero-nav-pills rv d3">
          <Link href="#story" className="km-hnp">
            📖 The Story
          </Link>
          <Link href="#zones" className="km-hnp">
            🗺️ City Zones
          </Link>
          <Link href="#food" className="km-hnp">
            🍛 Food Culture
          </Link>
          <Link href="#numbers" className="km-hnp">
            📊 Mumbai in Numbers
          </Link>
          <Link href="#spirit" className="km-hnp">
            ❤️ The Spirit
          </Link>
          <Link href="/must-visit-places" className="km-hnp">
            📍 Must Visit
          </Link>
        </div>
      </div>

      {/* Stat bar - absolute at bottom */}
      <div className="km-hero-stat-bar">
        {STATS.map((s) => (
          <div className="km-hsb-item" key={s.label}>
            <div className="km-hsb-n">{s.value}</div>
            <div className="km-hsb-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
