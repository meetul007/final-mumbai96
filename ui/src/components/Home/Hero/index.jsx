"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const words = [
    "PEOPLE",
    "STORIES",
    "TRAVEL",
    "HELP",
    "FOOD",
    "DREAMS",
    "BUSINESS",
    "MEETUPS",
    "PLACES",
    "NIGHTLIFE",
    "SAFETY",
    "COMMUNITY",
    "TOURISTS",
  ];

  const [word, setWord] = useState(words[0]);
  const [animate, setAnimate] = useState(false);

  // 🔥 Word cycling animation (same as original)
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        i = (i + 1) % words.length;
        setWord(words[i]);
        setAnimate(false);
      }, 240);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero hero-full-height" style={{ padding: "0" }}>
      {/* 🔥 BACKGROUND LAYERS (IMPORTANT — previously missing) */}
      <div className="hero-bg"></div>
      <div className="hero-grid-lines"></div>
      <div className="hero-noise"></div>

      <div className="hero-inner con display-block" style={{ paddingTop: "0" }}>
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span className="badge-text">
            Mumbai96 — Mumbaikar's Very Own Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-title" style={{ marginBottom: "0" }}>
          <span
            className="row row-1"
            style={{ fontSize: " clamp(3.5rem, 10vw, 9rem)" }}
          >
            EVERYTHING
          </span>
          <span
            className="row row-2"
            style={{ fontSize: " clamp(3.5rem, 10vw, 9rem)" }}
          >
            MUMBAI
          </span>

          {/* 🔥 Animated word */}
          <span
            className={`row row-3 ${animate ? "out" : ""}`}
            style={{ fontSize: " clamp(3.5rem, 10vw, 9rem)" }}
          >
            <em id="cycleWord">{word}</em>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub">
          One City. Infinite Stories.
          <br />
          <strong>We cover every inch of Mumbai, for every Mumbaikar.</strong>
        </p>

        {/* Actions */}
        <div className="hero-actions">
          <Link href="/know-mumbai" className="btn-fire">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Explore Mumbai
          </Link>

          {/* <Link href="/auth/login" className="btn-ghost">
            Add Free Listing
          </Link> */}

          <Link href="/foreign-tourists" className="btn-ghost">
            Tourist Guide
          </Link>
        </div>
      </div>
      <div className="hero-stats-bar">
        <div className="hstat">
          <div className="hstat-n">100%</div>
          <div className="hstat-l">Mumbai Covered</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">Mumbai's</div>
          <div className="hstat-l">Own Platform</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">∞</div>
          <div className="hstat-l">Stories</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">ZERO</div>
          <div className="hstat-l">Fraud Tolerated</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">100%</div>
          <div className="hstat-l">Genuine Solutions</div>
        </div>
      </div>
    </section>
  );
}
