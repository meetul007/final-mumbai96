"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MetroMapSvg from "./MetroMapSvg";
import { stationData } from "./stationData";
import "./style.css";

function popupBarClass(barColor) {
  const map = {
    "#F9A825": "popup-bar--y2a",
    "#E53935": "popup-bar--l7",
    "#1565C0": "popup-bar--l1",
    "#00BCD4": "popup-bar--l3",
  };
  return map[barColor] ?? "popup-bar--l3";
}

function popupTagClass(tag) {
  if (tag.bg === "#F9A825" && tag.color === "#111") return "popup-tag--2a";
  if (tag.bg === "#1565C0") return "popup-tag--l1";
  if (tag.bg === "#E53935") return "popup-tag--l7";
  if (tag.bg === "#ff6b00") return "popup-tag--l9";
  if (tag.bg === "#006064") return "popup-tag--l3";
  if (tag.bg === "#C62828") return "popup-tag--cr";
  if (tag.bg === "#555") return "popup-tag--rail";
  return "popup-tag--l3";
}

const FAQ_ITEMS = [
  {
    q: "How many metro lines are operational in Mumbai in 2026?",
    a: "As of April 2026, Mumbai has 6 operational metro lines: Line 1 Blue (Versova–Ghatkopar, 11.4 km), Line 2A Yellow (Dahisar–DN Nagar, 18.6 km), Line 3 Aqua (Aarey–Cuffe Parade, 33.5 km, fully underground), Line 7 Red (Dahisar East–Gundavali, 16.5 km), Line 9 Phase 1 (new April 2026), and Line 2B Phase 1 (new April 2026). Total operational network: 101+ km.",
  },
  {
    q: "Which Mumbai Metro line goes to the airport?",
    a: "Mumbai Metro Line 3 (Aqua Line) connects directly to Chhatrapati Shivaji Maharaj International Airport — it has stations at both Terminal 1 (T1) and Terminal 2 (T2). It is the fastest and most reliable way to reach the airport from BKC, Andheri, Marol, Dadar or CSMT. Line 7A (under construction, expected end-2026) will also add a third metro connection to T2.",
  },
  {
    q: "What is the Mumbai Metro Line 3 Aqua Line?",
    a: "Mumbai Metro Line 3, called the Aqua Line, is Mumbai's first fully underground metro. It runs 33.5 km with 27 stations from Aarey JVLR in the north to Cuffe Parade in South Mumbai. It became fully operational on October 8, 2025. Key stations include Marol Naka (Line 1 interchange), Airport T1 & T2, BKC, Dadar, Worli, Churchgate, CSMT, and Cuffe Parade. Operated by MMRCL.",
  },
  {
    q: "Where do Line 1 and Line 3 interchange in Mumbai Metro?",
    a: "Mumbai Metro Line 1 (Blue Line, east-west) and Line 3 (Aqua Line, north-south underground) interchange at Marol Naka station. This is the most important hub in Mumbai's metro network — from here you can reach Versova in the west, Ghatkopar in the east, the airport in the north, or BKC/Cuffe Parade in the south.",
  },
  {
    q: "What is the Mumbai Metro fare range in 2026?",
    a: "Mumbai Metro fares start at ₹10 for the shortest distance. Line 1 goes up to ₹40, Lines 2A and 7 up to ₹50, and Line 3 Aqua (longest line at 33.5 km) up to ₹80. Smart card holders get a 10% discount on all journeys on all lines. Tokens at ₹10 to ₹80 are available at station vending machines.",
  },
  {
    q: "What are the new Mumbai Metro lines opened in 2026?",
    a: "On April 7, 2026, two new metro sections were inaugurated by CM Devendra Fadnavis: Line 9 Phase 1 (Dahisar East to Kashigaon — Mumbai's first metro into the Mira-Bhayandar region) and Line 2B Phase 1 (Mandale to Diamond Garden in Chembur — bringing metro connectivity to the Harbour Line area for the first time).",
  },
  {
    q: "What time does the first and last Mumbai Metro train run?",
    a: "Line 1 first train: 5:30 AM from Versova and Ghatkopar. Line 2A and Line 7 first trains: 6:00 AM. Line 3 Aqua Line first train: 6:00 AM from both Aarey and Cuffe Parade. Last trains on most lines run until 11:00 PM. Line 3 last train is approximately 11:00–11:30 PM. Always check the Mumbai 1 app for latest timings.",
  },
  {
    q: "How do I buy a Mumbai Metro ticket?",
    a: "Mumbai Metro tickets can be bought as: (1) Tokens from vending machines at any station (accepts cash, UPI, card), (2) QR code tickets via the Mumbai 1 app (no queue needed), (3) UPI payment via Paytm or PhonePe at machines, (4) Smart card at station service counter (₹50 refundable deposit, 10% discount on every ride). Smart card is recommended for frequent users.",
  },
  {
    q: "Which Mumbai Metro lines are under construction in 2026?",
    a: "Lines under construction in 2026: Line 4 Green (Bhakti Park Wadala to Kasarvadavali via Thane, 32.32 km — phased 2026 opening), Line 6 Pink (JVLR Lokhandwala to Kanjurmarg, 14.47 km — mid-2026), Line 5 Orange (Thane to Kalyan via Bhiwandi, 23.5 km), and Line 7A (Airport T2 extension, 3.17 km — end-2026). When all are complete, Mumbai will have 300+ km of metro.",
  },
  {
    q: "What is the Mumbai Metro Smart Card and how does it work?",
    a: "The Mumbai Metro Smart Card is a prepaid contactless card available at any metro station counter for ₹50 refundable deposit. It works across all metro lines and gives 10% discount on every journey. Tap at entry gate → ride → tap at exit gate; fare is automatically deducted. Top up at station kiosks, customer service, or via the Mumbai 1 app. Recommended for all regular metro users.",
  },
];

const TIPS = [
  {
    icon: "🚇",
    title: "Line 3 Aqua = Airport Made Easy",
    body: "Airport T1 and T2 are both directly on Line 3. No cab stress, no traffic. Just metro — and it runs right under the city. Most reliable airport route in Mumbai.",
  },
  {
    icon: "💼",
    title: "BKC Finally Accessible",
    body: "Before Line 3, BKC (Bandra-Kurla Complex) was notoriously hard to reach without a cab. Now Line 3 stops right there. A 40–90 min cab ride from Andheri is now a 20 min metro ride.",
  },
  {
    icon: "🔄",
    title: "Marol Naka = The Power Junction",
    body: "This one station connects the east-west Line 1 with the north-south underground Line 3. From here you can reach Versova, Ghatkopar, Airport, BKC, CSMT or Cuffe Parade.",
  },
  {
    icon: "💳",
    title: "Smart Card at Entry = No Queue",
    body: "Token queues pile up at peak hours. Smart card users tap and enter instantly. Get one from any metro station for ₹50 deposit. Recharge at kiosks or the Mumbai 1 app.",
  },
  {
    icon: "⏱️",
    title: "Last Train Before 11 PM",
    body: "Most metro lines end around 11 PM. Line 3 is approximately 11:00–11:30 PM last train. Plan your evening accordingly — don't miss the last train and need an Uber from Aarey!",
  },
  {
    icon: "👩",
    title: "First Coach Reserved for Women",
    body: "The first coach on all metro lines is reserved for women passengers during peak hours. Less crowded and always available — a great option for solo female commuters.",
  },
  {
    icon: "🧳",
    title: "Luggage? Metro is Fine",
    body: "Standard luggage allowed on metro at no extra charge — great for airport runs. Just avoid giant suitcases in rush hour. Overhead shelves are available in most coaches.",
  },
  {
    icon: "📱",
    title: "Mumbai 1 App for Everything",
    body: "The Mumbai 1 app covers all metro lines — ticket booking, route planning, smart card recharge, real-time train information. Download before your first metro trip.",
  },
];

const QUICK_LINKS = [
  {
    href: "/mumbai-local-trains",
    icon: "🚂",
    label: "Mumbai Local Train Guide",
  },
  {
    href: "/mumbai-real-estate-guide",
    icon: "💰",
    label: "Real Estate Near Metro",
  },
  { href: "/mumbai-monsoon", icon: "🌧️", label: "Mumbai Monsoon Guide" },
  { href: "/mumbai-street-food", icon: "🥘", label: "Street Food Guide" },
  {
    href: "/mumbai-cost-of-living",
    icon: "💸",
    label: "Cost of Living Mumbai",
  },
  { href: "/mumbai-sports", icon: "🏏", label: "Mumbai Sports Hub" },
];

function LineBadge({ line, children }) {
  return <span className={`line-badge-cell badge-${line}`}>{children}</span>;
}

export default function MetroGuideClient() {
  const mapRef = useRef(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeStationId, setActiveStationId] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const activeStation = activeStationId ? stationData[activeStationId] : null;

  const closePopup = useCallback(() => {
    setPopupOpen(false);
    setActiveStationId(null);
  }, []);

  const openPopup = useCallback((id) => {
    if (!stationData[id]) return;
    setActiveStationId(id);
    setPopupOpen(true);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const groups = map.querySelectorAll(".stn-g");
    const handlers = [];

    groups.forEach((g) => {
      const click = (e) => {
        e.stopPropagation();
        openPopup(g.dataset.stn);
      };
      const keydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPopup(g.dataset.stn);
        }
      };
      g.addEventListener("click", click);
      g.addEventListener("keydown", keydown);
      handlers.push({ g, click, keydown });
    });

    return () => {
      handlers.forEach(({ g, click, keydown }) => {
        g.removeEventListener("click", click);
        g.removeEventListener("keydown", keydown);
      });
    };
  }, [openPopup]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.querySelectorAll(".stn-g").forEach((g) => {
      g.classList.toggle("active", g.dataset.stn === activeStationId);
    });
  }, [activeStationId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closePopup]);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mumbai-metro-page">
      <header className="page-hero" role="banner">
        <div className="hero-grid" />
        <div className="glow glow-1" />
        <div className="glow glow-2" />
        <div className="glow glow-3" />
        <div className="con">
          <div className="hero-inner">
            <div className="hero-content">
              <nav className="hero-bc" aria-label="Breadcrumb">
                <Link href="/">Mumbai96</Link>
                <span>›</span>
                <Link href="/transport">Transport</Link>
                <span>›</span>
                <span>Mumbai Metro Guide 2026</span>
              </nav>
              <p className="hero-kicker">
                Complete Metro Guide — Updated April 2026
              </p>
              <h1 className="hero-h1">
                Mumbai
                {/* <br /> */}
                <span className="t1">Metro</span>
                {/* <br /> */}
                <span className="t2">Guide</span>
              </h1>
              <p className="hero-desc">
                6 lines. 100+ km. Mumbai&apos;s air-conditioned answer to
                traffic gridlock. Every metro line — operational, new and coming
                soon — explained with an interactive map anyone can understand.
              </p>
              <div className="hero-lines">
                <span className="lb lb-l1">
                  <span className="dot" />
                  Line 1 Blue
                </span>
                <span className="lb lb-l2a">
                  <span className="dot" />
                  Line 2A Yellow
                </span>
                <span className="lb lb-l3">
                  <span className="dot" />
                  Line 3 Aqua 🚇
                </span>
                <span className="lb lb-l7">
                  <span className="dot" />
                  Line 7 Red
                </span>
                <span className="lb lb-l9">
                  <span className="dot" />
                  Line 9 <span className="lb-new">NEW</span>
                </span>
                <span className="lb lb-l2b">
                  <span className="dot" />
                  Line 2B <span className="lb-new">NEW</span>
                </span>
              </div>
            </div>
            <div className="hero-logo-wrap">
              <Image
                src="/images/mumbai-metro-mmrc-logo.svg"
                alt="MMRC — Mumbai Metro Rail Corporation Logo"
                className="hero-logo-img"
                width={260}
                height={260}
                priority
              />
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="con">
            <div className="hstats">
              <div className="hs">
                <div className="hs-n">101</div>
                <div className="hs-l">km Operational</div>
              </div>
              <div className="hs">
                <div className="hs-n">6</div>
                <div className="hs-l">Active Lines</div>
              </div>
              <div className="hs">
                <div className="hs-n">142+</div>
                <div className="hs-l">Stations</div>
              </div>
              <div className="hs">
                <div className="hs-n">1.5M+</div>
                <div className="hs-l">Daily Riders</div>
              </div>
              <div className="hs">
                <div className="hs-n">₹10</div>
                <div className="hs-l">Min. Fare</div>
              </div>
              <div className="hs">
                <div className="hs-n">27</div>
                <div className="hs-l">Line 3 Stations</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="map-section" aria-labelledby="map-heading">
        <div className="map-section-inner">
          <div className="map-header">
            <div className="map-head-left">
              <p className="map-kicker">Interactive Schematic Map</p>
              <h2 id="map-heading">
                All Mumbai Metro Lines — <em>Tap Any Station</em>
              </h2>
            </div>
            <div className="map-hint">Tap a station circle for details</div>
          </div>
          <div className="map-canvas">
            <MetroMapSvg mapRef={mapRef} />
          </div>
          <div className="map-legend">
            <div className="legend-line-row">
              <span className="lleg lleg-l1" />
              Line 1 Blue — Versova to Ghatkopar
            </div>
            <div className="legend-line-row">
              <span className="lleg lleg-l2a" />
              Line 2A Yellow — Dahisar to DN Nagar
            </div>
            <div className="legend-line-row">
              <span className="lleg lleg-l7" />
              Line 7 Red — Dahisar E to Gundavali
            </div>
            <div className="legend-line-row">
              <span className="lleg-dash" />
              Line 3 Aqua — Underground
            </div>
            <div className="legend-line-row legend-line-row--new">
              <span className="lleg lleg-new" />
              Lines 9 &amp; 2B{" "}
              <span className="leg-new-badge">NEW APR 2026</span>
            </div>
            <div className="legend-line-row">
              <span className="lleg-under" />
              Lines 4, 6, 5 — Under Construction
            </div>
          </div>
        </div>
      </section>

      <div
        className={`popup-overlay${popupOpen ? " open" : ""}`}
        onClick={closePopup}
        aria-hidden={!popupOpen}
      />
      <div
        className={`stn-popup${popupOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={
          activeStation ? `Station info: ${activeStation.name}` : "Station info"
        }
      >
        <button
          type="button"
          className="popup-close"
          onClick={closePopup}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="popup-drag" />
        {activeStation && (
          <>
            <div
              className={`popup-bar ${popupBarClass(activeStation.barColor)}`}
            />
            <div className="popup-top">
              <div className="popup-emoji">{activeStation.emoji}</div>
              <div className="popup-head">
                <div className="popup-name">{activeStation.name}</div>
                <div className="popup-tags">
                  {activeStation.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`popup-tag ${popupTagClass(t)}`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="popup-desc">{activeStation.desc}</div>
            <div className="popup-facts">
              {activeStation.facts.map((f) => (
                <div key={f.text} className="popup-fact">
                  <span className="popup-fact-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <div className="page-main">
              <section className="sec rv" aria-labelledby="lines-heading">
                <p className="sec-kicker">Operational Lines — April 2026</p>
                <h2 className="sec-title" id="lines-heading">
                  Mumbai Metro — <em>All Active Lines</em> Explained
                </h2>
                <p className="sec-sub">
                  Think of each line like a coloured road in the sky (or
                  underground!). Each has its own colour, two end stations, and
                  stops in between.
                </p>
                <div className="line-cards">
                  <div className="lc">
                    <div className="lc-head lc-head-l1">
                      <div className="lc-num">1</div>
                      <div className="lc-badge">Fully Operational · 2014</div>
                      <div className="lc-name">Line 1 — Blue Line</div>
                      <div className="lc-route">Versova ↔ Ghatkopar</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stats">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l1">11.4</div>
                          <div className="lc-stat-l">km</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l1">12</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l1">21</div>
                          <div className="lc-stat-l">min end-to-end</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Mumbai&apos;s first metro (2014). Runs east-west — the
                        only rapid transit link connecting western suburbs
                        (Versova/Andheri) to eastern suburbs (Ghatkopar/Central
                        Railway) in just 21 minutes. A 45-min cab ride now takes
                        21 minutes.
                      </p>
                      <div className="lc-stations">
                        <span className="lc-stn">Versova</span>
                        <span className="lc-stn ix">DN Nagar 🔄</span>
                        <span className="lc-stn">Azad Nagar</span>
                        <span className="lc-stn">Airport Road</span>
                        <span className="lc-stn ix">Marol Naka 🔄</span>
                        <span className="lc-stn">Chakala</span>
                        <span className="lc-stn">Saki Naka</span>
                        <span className="lc-stn ix">Ghatkopar 🔄</span>
                      </div>
                    </div>
                  </div>

                  <div className="lc">
                    <div className="lc-head lc-head-l2a">
                      <div className="lc-num">2A</div>
                      <div className="lc-badge">
                        Fully Operational · 2022–23
                      </div>
                      <div className="lc-name">Line 2A — Yellow</div>
                      <div className="lc-route">Dahisar ↔ DN Nagar</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stats">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l2a">18.6</div>
                          <div className="lc-stat-l">km</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l2a">17</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l2a">6–8</div>
                          <div className="lc-stat-l">min freq</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Runs parallel to the Western Railway on the western side
                        — Dahisar in the north to DN Nagar (Andheri West),
                        interchanging with Line 1. Great for north-western
                        suburb commuters who want to avoid local train crowds.
                      </p>
                      <div className="lc-stations">
                        <span className="lc-stn">Dahisar</span>
                        <span className="lc-stn">Eksar</span>
                        <span className="lc-stn">Poisar</span>
                        <span className="lc-stn">Akurli</span>
                        <span className="lc-stn">Borivali W</span>
                        <span className="lc-stn">Pahadi Goregaon</span>
                        <span className="lc-stn">Goregaon</span>
                        <span className="lc-stn">Jogeshwari W</span>
                        <span className="lc-stn ix">DN Nagar 🔄</span>
                      </div>
                    </div>
                  </div>

                  <div className="lc">
                    <div className="lc-head lc-head-l3">
                      <div className="lc-num">3</div>
                      <div className="lc-badge">
                        Fully Operational · Oct 2025
                      </div>
                      <div className="lc-name">Line 3 — Aqua Line 🚇</div>
                      <div className="lc-route">Aarey JVLR ↔ Cuffe Parade</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stats">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l3">33.5</div>
                          <div className="lc-stat-l">km</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l3">27</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l3">3–4</div>
                          <div className="lc-stat-l">min freq</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Mumbai&apos;s first and only fully underground metro —
                        26 of 27 stations are underground! Connects Aarey
                        (Goregaon north) to Cuffe Parade (south Mumbai), passing
                        through the airport (T1 + T2), BKC, Dadar, Worli,
                        Churchgate and CSMT.
                      </p>
                      <div className="lc-stations">
                        <span className="lc-stn">Aarey JVLR</span>
                        <span className="lc-stn">SEEPZ</span>
                        <span className="lc-stn">MIDC</span>
                        <span className="lc-stn ix">Marol Naka 🔄</span>
                        <span className="lc-stn">Airport T2 ✈️</span>
                        <span className="lc-stn">Airport T1 ✈️</span>
                        <span className="lc-stn">Santacruz</span>
                        <span className="lc-stn">Bandra Colony</span>
                        <span className="lc-stn">BKC 💼</span>
                        <span className="lc-stn">Dharavi</span>
                        <span className="lc-stn">Dadar</span>
                        <span className="lc-stn">Worli</span>
                        <span className="lc-stn">Churchgate</span>
                        <span className="lc-stn">CSMT</span>
                        <span className="lc-stn">Cuffe Parade</span>
                      </div>
                    </div>
                  </div>

                  <div className="lc">
                    <div className="lc-head lc-head-l7">
                      <div className="lc-num">7</div>
                      <div className="lc-badge">
                        Fully Operational · 2022–23
                      </div>
                      <div className="lc-name">Line 7 — Red Line</div>
                      <div className="lc-route">Dahisar East ↔ Gundavali</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stats">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l7">16.5</div>
                          <div className="lc-stat-l">km</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l7">14</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l7">6–8</div>
                          <div className="lc-stat-l">min freq</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Runs parallel to Western Railway on the eastern side
                        (Western Express Highway corridor) — from Dahisar East
                        to Andheri East (Gundavali), interchanging with Line 1.
                        Now extended north as Line 9 toward Mira-Bhayandar.
                      </p>
                      <div className="lc-stations">
                        <span className="lc-stn">Dahisar East</span>
                        <span className="lc-stn">Anand Nagar</span>
                        <span className="lc-stn">Devi Pada</span>
                        <span className="lc-stn">Pahadi Goregaon E</span>
                        <span className="lc-stn">Devipada</span>
                        <span className="lc-stn">Borivali East</span>
                        <span className="lc-stn">Magathane</span>
                        <span className="lc-stn ix">Gundavali 🔄</span>
                      </div>
                    </div>
                  </div>

                  <div className="lc">
                    <div className="lc-head lc-head-l9">
                      <div className="lc-num">9</div>
                      <div className="lc-badge new-badge">
                        NEW · 7 April 2026 🆕
                      </div>
                      <div className="lc-name">Line 9 — Partial</div>
                      <div className="lc-route">Dahisar E ↔ Kashigaon</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stats">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l9">Phase 1</div>
                          <div className="lc-stat-l">operational</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l9">4</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l9">13</div>
                          <div className="lc-stat-l">Total planned</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Opened April 7, 2026 — Mumbai&apos;s newest metro!
                        Extends Line 7 northward from Dahisar East into the
                        Mira-Bhayandar region, giving the city&apos;s northern
                        outskirts metro access for the first time. Eventually
                        connects to Mira Road.
                      </p>
                      <div className="lc-stations">
                        <span className="lc-stn ix">Dahisar East 🔄</span>
                        <span className="lc-stn">Kashigaon</span>
                        <span className="lc-stn">More phases coming…</span>
                      </div>
                    </div>
                  </div>

                  <div className="lc">
                    <div className="lc-head lc-head-l2b">
                      <div className="lc-num">2B</div>
                      <div className="lc-badge new-badge">
                        NEW · 7 April 2026 🆕
                      </div>
                      <div className="lc-name">Line 2B — Yellow (East)</div>
                      <div className="lc-route">Diamond Garden ↔ Mandale</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stats">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l2b">5.4</div>
                          <div className="lc-stat-l">km Phase 1</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l2b">5</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n-l2b">23.6</div>
                          <div className="lc-stat-l">km full</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Opened April 7, 2026 — the eastern arm of the Yellow
                        Line. Connects Chembur (Diamond Garden) to Mandale,
                        bringing metro to the Harbour Line zone. When the full
                        2B opens, it will run from DN Nagar through Bandra, BKC
                        to Mandale — a true east-west crosser.
                      </p>
                      <div className="lc-stations">
                        <span className="lc-stn">Diamond Garden</span>
                        <span className="lc-stn">Chembur area</span>
                        <span className="lc-stn">Mandale</span>
                        <span className="lc-stn">DN Nagar end (planned)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="sec rv" aria-labelledby="ix-heading">
                <p className="sec-kicker">Key Interchange Stations</p>
                <h2 className="sec-title" id="ix-heading">
                  Where Lines <em>Meet</em> — Interchange Guide
                </h2>
                <p className="sec-sub">
                  These are the stations where you can switch from one metro
                  line to another — or to a local train — without going outside.
                </p>
                <table
                  className="ix-table"
                  aria-label="Mumbai Metro interchange stations"
                >
                  <thead>
                    <tr>
                      <th>Station</th>
                      <th>Lines That Meet</th>
                      <th>Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="ix-stn">Marol Naka</span>
                      </td>
                      <td>
                        <LineBadge line="l1">Line 1 Blue</LineBadge>{" "}
                        <LineBadge line="l3">Line 3 Aqua</LineBadge>
                      </td>
                      <td className="cell-muted">
                        The most critical metro interchange — connect east-west
                        (L1) with north-south underground (L3). The airport,
                        BKC, CSMT and Cuffe Parade all become easily accessible
                        from here.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="ix-stn">DN Nagar</span>
                      </td>
                      <td>
                        <LineBadge line="l1">Line 1 Blue</LineBadge>{" "}
                        <LineBadge line="l2a">Line 2A Yellow</LineBadge>
                      </td>
                      <td className="cell-muted">
                        Switch between the east-west Line 1 and the north-south
                        Line 2A here. Andheri West commuters can go east to
                        Ghatkopar without a cab.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="ix-stn">Gundavali / WEH</span>
                      </td>
                      <td>
                        <LineBadge line="l1">Line 1 Blue</LineBadge>{" "}
                        <LineBadge line="l7">Line 7 Red</LineBadge>
                      </td>
                      <td className="cell-muted">
                        Switch between Line 1 and Line 7 on the Western Express
                        Highway. Andheri East commuters from northern suburbs
                        can connect to Versova or Ghatkopar.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="ix-stn">Dahisar East</span>
                      </td>
                      <td>
                        <LineBadge line="l7">Line 7 Red</LineBadge>{" "}
                        <LineBadge line="l9">Line 9</LineBadge>
                      </td>
                      <td className="cell-muted">
                        Hub for the northern metro extension — Line 7 and new
                        Line 9 meet here, plus easy access to WR Dahisar and the
                        bus network to Mira Road.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="ix-stn">Ghatkopar</span>
                      </td>
                      <td>
                        <LineBadge line="l1">Line 1 Blue</LineBadge>{" "}
                        <span className="badge-cr">Central Railway 🚂</span>
                      </td>
                      <td className="cell-muted">
                        The metro&apos;s eastern gateway — swap to CR local at
                        Ghatkopar and reach CSMT, Dadar, Thane or Kasara without
                        a cab. Game-changer for eastern suburb commuters.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="ix-stn">CSMT (Metro)</span>
                      </td>
                      <td>
                        <LineBadge line="l3">Line 3 Aqua</LineBadge>{" "}
                        <span className="badge-cr">CR + Harbour 🚂</span>
                      </td>
                      <td className="cell-muted">
                        The south Mumbai mega-hub. Aqua Line 3&apos;s
                        underground station below CSMT connects directly to
                        Central Railway and Harbour Line local trains above.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="sec rv" aria-labelledby="fares-heading">
                <p className="sec-kicker">Ticket Prices 2026</p>
                <h2 className="sec-title" id="fares-heading">
                  Mumbai Metro <em>Fares</em> — Complete Guide
                </h2>
                <p className="sec-sub">
                  All lines use distance-based fares. Smart card = 10% off every
                  journey. Buy tickets at any station kiosk or via the Mumbai 1
                  app.
                </p>
                <div className="fare-table-wrap">
                  <table
                    className="fare-table"
                    aria-label="Mumbai Metro fare guide by line 2026"
                  >
                    <thead>
                      <tr>
                        <th>Metro Line</th>
                        <th>Minimum Fare</th>
                        <th>Maximum Fare</th>
                        <th>Smart Card Discount</th>
                        <th>Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <LineBadge line="l1">Line 1 Blue</LineBadge>
                        </td>
                        <td className="cell-bold">₹10</td>
                        <td className="cell-bold fare-max-l1">₹40</td>
                        <td>10% off</td>
                        <td>4–5 min</td>
                      </tr>
                      <tr>
                        <td>
                          <LineBadge line="l2a">Line 2A Yellow</LineBadge>
                        </td>
                        <td className="cell-bold">₹10</td>
                        <td className="cell-bold fare-max-l2a">₹50</td>
                        <td>10% off</td>
                        <td>6–8 min</td>
                      </tr>
                      <tr>
                        <td>
                          <LineBadge line="l3">Line 3 Aqua 🚇</LineBadge>
                        </td>
                        <td className="cell-bold">₹10</td>
                        <td className="cell-bold fare-max-l3">₹80</td>
                        <td>10% off</td>
                        <td>3–4 min</td>
                      </tr>
                      <tr>
                        <td>
                          <LineBadge line="l7">Line 7 Red</LineBadge>
                        </td>
                        <td className="cell-bold">₹10</td>
                        <td className="cell-bold fare-max-l7">₹50</td>
                        <td>10% off</td>
                        <td>6–8 min</td>
                      </tr>
                      <tr>
                        <td>
                          <LineBadge line="l9">Line 9 (new)</LineBadge>
                        </td>
                        <td className="cell-bold">₹10</td>
                        <td className="cell-bold fare-max-l9">₹40</td>
                        <td>10% off</td>
                        <td>TBD</td>
                      </tr>
                      <tr>
                        <td>
                          <LineBadge line="l2b">Line 2B (new)</LineBadge>
                        </td>
                        <td className="cell-bold">₹10</td>
                        <td className="cell-bold fare-max-l2b">₹40</td>
                        <td>10% off</td>
                        <td>9–10 min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="warn-box">
                  <div className="warn-icon">💳</div>
                  <div className="warn-body">
                    <h4>Smart Card = Best Value — Always</h4>
                    <p>
                      A Mumbai Metro Smart Card (₹50 refundable deposit at any
                      station) gives 10% off every ride across all lines. Top up
                      at kiosks, customer service, or via the{" "}
                      <strong>Mumbai 1 app</strong>. QR code tickets are also
                      available via Paytm, PhonePe and Amazon Pay — no token
                      queue needed.
                    </p>
                  </div>
                </div>
              </section>

              <section className="sec rv" aria-labelledby="upcoming-heading">
                <p className="sec-kicker">Under Construction — 2026 & Beyond</p>
                <h2 className="sec-title" id="upcoming-heading">
                  Mumbai Metro Lines <em>Coming Soon</em>
                </h2>
                <p className="sec-sub">
                  When all planned lines are complete, Mumbai will have 300+ km
                  of metro — transforming how 20 million people move.
                </p>
                <div className="upcoming-grid">
                  <div className="uc l4">
                    <span className="status-badge s-2026">Expected 2026</span>
                    <div className="uc-line-label">Line 4 — Green Line</div>
                    <div className="uc-name">
                      Bhakti Park (Wadala) ↔ Kasarvadavali
                    </div>
                    <div className="uc-body">
                      32.32 km · 32 stations · Via Ghatkopar, Thane — this
                      massive north-south corridor will finally link
                      Mumbai&apos;s eastern waterfront to Thane city, giving the
                      eastern suburbs their own metro spine. Phased opening
                      expected 2026.
                    </div>
                  </div>
                  <div className="uc l6">
                    <span className="status-badge s-2026">
                      Expected Mid-2026
                    </span>
                    <div className="uc-line-label">Line 6 — Pink Line</div>
                    <div className="uc-name">
                      Lokhandwala (Andheri W) ↔ Kanjurmarg
                    </div>
                    <div className="uc-body">
                      14.47 km · 13 stations · The JVLR corridor — finally
                      connecting Andheri West with Powai, SEEPZ and Kanjurmarg.
                      Will interchange with Line 3 at SEEPZ, creating a key
                      east-west junction. Highly awaited by Powai and Kanjurmarg
                      residents.
                    </div>
                  </div>
                  <div className="uc l5">
                    <span className="status-badge s-construction">
                      Under Construction
                    </span>
                    <div className="uc-line-label">Line 5 — Orange Line</div>
                    <div className="uc-name">Thane ↔ Bhiwandi ↔ Kalyan</div>
                    <div className="uc-body">
                      23.5 km · 17 stations · Connects Thane to Kalyan via
                      Bhiwandi. Opens the entire Bhiwandi logistics corridor —
                      one of Asia&apos;s biggest warehousing zones — to rapid
                      transit. Phased construction ongoing.
                    </div>
                  </div>
                  <div className="uc l7a">
                    <span className="status-badge s-2026">
                      Expected end-2026
                    </span>
                    <div className="uc-line-label">
                      Line 7A — Red Line Extension
                    </div>
                    <div className="uc-name">Andheri East ↔ Airport T2</div>
                    <div className="uc-body">
                      3.17 km · 3 stations · Short but critical extension that
                      will be the third metro connection to CSMIA Airport (T2).
                      Cuts travel time from Mira-Bhayandar and northern suburbs
                      to the airport by up to 60 minutes. 59%+ complete as of
                      April 2026.
                    </div>
                  </div>
                </div>
              </section>

              <section className="sec rv" aria-labelledby="tips-heading">
                <p className="sec-kicker">Commuter Tips</p>
                <h2 className="sec-title" id="tips-heading">
                  Mumbai Metro — <em>Insider Tips</em>
                </h2>
                <div className="tips-grid">
                  {TIPS.map((tip) => (
                    <div key={tip.title} className="tip">
                      <div className="tip-icon">{tip.icon}</div>
                      <div>
                        <h4>{tip.title}</h4>
                        <p>{tip.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="cta-bar rv">
                <div>
                  <h3>
                    Also Explore <em>Mumbai Local Trains</em>
                  </h3>
                  <p>
                    Western, Central and Harbour lines — complete guide with
                    interactive map.
                  </p>
                </div>
                <Link href="/mumbai-local-trains" className="cta-btn">
                  Local Train Guide →
                </Link>
              </div>

              <section className="sec rv" aria-labelledby="faq-heading">
                <p className="sec-kicker">Frequently Asked Questions</p>
                <h2 className="sec-title" id="faq-heading">
                  Mumbai Metro 2026 — <em>FAQs</em>
                </h2>
                <div id="faq-list">
                  {FAQ_ITEMS.map((item, index) => (
                    <div
                      key={item.q}
                      className={`faq-item${openFaqIndex === index ? " open" : ""}`}
                    >
                      <button
                        type="button"
                        className="faq-q"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={openFaqIndex === index}
                      >
                        {item.q}
                      </button>
                      <div className="faq-a">
                        <div className="faq-a-inner">{item.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <article className="prose rv">
                <h2>Mumbai Metro 2026 — Complete Commuter Guide</h2>
                <p>
                  Mumbai&apos;s metro network has transformed from a single
                  11-km east-west corridor in 2014 to a 101+ km network in 2026
                  — and the city is still building. Understanding how the lines
                  connect, and which line takes you where, is the key to
                  unlocking a faster, air-conditioned city.
                </p>
                <h3>Line 3 Aqua: The Line That Changed Everything</h3>
                <p>
                  No single infrastructure project has changed Mumbai&apos;s
                  commuting landscape as dramatically as Line 3. For decades,
                  BKC was the city&apos;s most important business district and
                  also its most inaccessible — a 40–90-minute cab ride from most
                  of the city. Line 3&apos;s BKC station made this commute 20
                  minutes from Andheri. The airport, previously a traffic
                  nightmare, now has direct metro access at both terminals.
                  South Mumbai and North Mumbai — long separated by the
                  city&apos;s spine of traffic — are now connected underground.
                </p>
                <h3>Lines 2A and 7: The WR Parallel Network</h3>
                <p>
                  Line 2A (Yellow, on the west) and Line 7 (Red, on the east)
                  run parallel to the Western Railway suburban corridor,
                  offering an air-conditioned alternative to the packed local
                  trains. They also interconnect with Line 1 at DN Nagar (2A)
                  and Gundavali (L7), meaning a Dahisar resident can now reach
                  Ghatkopar without a single traffic light. This is the
                  transformation that metro lines create when they&apos;re
                  planned as a network.
                </p>
                <h3>2026 and Beyond: 300 km of Metro</h3>
                <p>
                  Mumbai&apos;s metro master plan envisions over 300 km of metro
                  coverage. Lines 4, 5, 6, 7A, 8, 9 and others will collectively
                  cover every major suburb from Mira-Bhayandar to Navi Mumbai,
                  and connect both airports (CSMIA and the new NMIA) via Line 8
                  (Gold Line). By 2030, a Mumbaikar will be able to travel
                  almost anywhere in the city — from the hills of Aarey to the
                  shores of Cuffe Parade — without a single cab, rick, or
                  traffic jam.
                </p>
              </article>
            </div>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🚇 Quick <em>Contacts</em>
                </div>
                <div className="sbw-body">
                  <a href="tel:1800-120-0880" className="ql">
                    <div className="qi">📞</div>
                    <div className="qt">MMRC Helpline</div>
                    <div className="qa">1800-120-0880</div>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.mmrcl.mumbai1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ql"
                  >
                    <div className="qi">📱</div>
                    <div className="qt">Mumbai 1 App</div>
                    <div className="qa">Download ↗</div>
                  </a>
                  <a
                    href="https://www.mmrcl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ql"
                  >
                    <div className="qi">🌐</div>
                    <div className="qt">MMRCL Website</div>
                    <div className="qa">↗</div>
                  </a>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  ⏰ First Train <em>Timings</em>
                </div>
                <div className="sbw-body">
                  <div className="timing-row">
                    <span className="tr-key tr-key-l1">Line 1 (Versova)</span>
                    <span className="tr-val">5:30 AM</span>
                  </div>
                  <div className="timing-row">
                    <span className="tr-key tr-key-l2a">Line 2A (Dahisar)</span>
                    <span className="tr-val">6:00 AM</span>
                  </div>
                  <div className="timing-row">
                    <span className="tr-key tr-key-l3">Line 3 (Aarey)</span>
                    <span className="tr-val">6:00 AM</span>
                  </div>
                  <div className="timing-row">
                    <span className="tr-key tr-key-l7">Line 7 (Dahisar E)</span>
                    <span className="tr-val">6:00 AM</span>
                  </div>
                  <div className="timing-row">
                    <span className="tr-key">Last train (most)</span>
                    <span className="tr-val">~11 PM</span>
                  </div>
                  <div className="timing-row">
                    <span className="tr-key">Peak hours</span>
                    <span className="tr-val">8–10 AM, 6–9 PM</span>
                  </div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {QUICK_LINKS.map((link) => (
                    <Link key={link.href} href={link.href} className="ql">
                      <div className="qi">{link.icon}</div>
                      <div className="qt">{link.label}</div>
                      <div className="qa">→</div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
