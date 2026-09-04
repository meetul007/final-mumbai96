"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { stations } from "./stations";
import "./style.css";

const FAQ_ITEMS = [
  {
    q: "How many local train lines are there in Mumbai?",
    a: "Mumbai has 3 suburban local train lines: Western Line (Churchgate to Virar, 60+ km), Central Line (CSMT to Kasara/Khopoli, 120+ km), and Harbour Line (CSMT to Panvel, 54+ km). Together they carry over 7.5 million passengers daily — more than the entire population of many countries.",
  },
  {
    q: "What time does the first local train run in Mumbai?",
    a: "The first Mumbai local trains run as early as 4:13 AM from CSMT on Central Line, 4:25 AM from CSMT on the Harbour Line, and 4:33 AM from Churchgate on Western Line. Trains run until approximately 1:00–1:30 AM making it a near-24-hour service.",
  },
  {
    q: "What is the difference between Fast and Slow local trains?",
    a: "Fast trains skip smaller intermediate stations and are significantly quicker — they cover Churchgate to Virar in about 72 minutes vs 100+ minutes for slow trains. Always check that your destination is on the Fast train's halt list. The UTS app and Mumbai Rail Map app show which trains stop at each station.",
  },
  {
    q: "What is the Dadar interchange and why is it important?",
    a: "Dadar has two separate stations — Dadar WR (Western Line) and Dadar CR (Central Line) — approximately 10–12 minutes walk apart. It is Mumbai's key mid-city interchange between the two main lines. If you want to switch from WR to CR without going all the way to CSMT or Churchgate, Dadar is your stop. Extremely busy during peak hours.",
  },
  {
    q: "How do I buy a Mumbai local train ticket?",
    a: "You can buy tickets at any suburban railway booking counter, from ATVM (vending machines) at platforms, or through the UTS (Unreserved Ticketing System) mobile app on Play Store / App Store. Monthly Season Tickets (MST) are best for daily commuters — they must be renewed each month and can be bought at counters or via the UTS app.",
  },
  {
    q: "What are Ladies compartments on Mumbai local trains?",
    a: "Mumbai local trains reserve specific compartments exclusively for women. On Western Line, the 1st and last coaches are Ladies compartments. On Central Line, the 1st coach from the front is Ladies. During peak hours, general compartments also have a designated ladies section. Men are not permitted in ladies compartments at any time.",
  },
  {
    q: "Which is the last station on the Harbour Line?",
    a: "Panvel is the last station on the Harbour Line. The line runs from CSMT in South Mumbai to Panvel in Navi Mumbai, covering 54+ km with major stops at Wadala, Chembur, Vashi, CBD Belapur and Panvel. It takes approximately 65–70 minutes from CSMT to Panvel. Panvel is also the northern terminus for Konkan Railway trains heading to Goa and coastal Maharashtra.",
  },
  {
    q: "Can I use UPI to buy Mumbai local train tickets?",
    a: "Yes. The UTS (Unreserved Ticketing System) app accepts UPI, debit cards, credit cards and net banking. You can buy single journey tickets and monthly/quarterly season passes. Note that when purchasing a ticket through the app, you must be within a specific GPS radius of the station for the transaction to go through — this is an anti-fraud measure by Indian Railways.",
  },
];

const HOTSPOTS = [
  {
    id: "churchgate",
    stn: "churchgate",
    line: "wr",
    className: "hotspot wr terminus",
    label: "Churchgate — WR Terminus",
    tooltip: "Churchgate 🔵",
  },
  {
    id: "mumbai_central",
    stn: "mumbai_central",
    line: "wr",
    className: "hotspot wr major",
    label: "Mumbai Central",
    tooltip: "Mumbai Central 🚆",
  },
  {
    id: "dadar-wr",
    stn: "dadar",
    line: "wr",
    className: "hotspot xchange terminus",
    label: "Dadar WR — Interchange",
    tooltip: "Dadar WR 🔄",
  },
  {
    id: "bandra",
    stn: "bandra",
    line: "wr",
    className: "hotspot wr major",
    label: "Bandra",
    tooltip: "Bandra 👑",
  },
  {
    id: "andheri",
    stn: "andheri",
    line: "wr",
    className: "hotspot wr major",
    label: "Andheri — Metro Hub",
    tooltip: "Andheri 🔄",
  },
  {
    id: "kandivali",
    stn: "kandivali",
    line: "wr",
    className: "hotspot wr",
    label: "Kandivali",
    tooltip: "Kandivali",
  },
  {
    id: "borivali",
    stn: "borivali",
    line: "wr",
    className: "hotspot wr major",
    label: "Borivali",
    tooltip: "Borivali 🏞️",
  },
  {
    id: "dahisar",
    stn: "dahisar",
    line: "wr",
    className: "hotspot wr",
    label: "Dahisar",
    tooltip: "Dahisar",
  },
  {
    id: "virar",
    stn: "virar",
    line: "wr",
    className: "hotspot wr terminus",
    label: "Virar — WR Terminus",
    tooltip: "Virar 🛑",
  },
  {
    id: "csmt",
    stn: "csmt",
    line: "cr",
    className: "hotspot cr terminus",
    label: "CSMT — CR + Harbour Terminus",
    tooltip: "CSMT 🏛️",
  },
  {
    id: "dadar-cr",
    stn: "dadar",
    line: "cr",
    className: "hotspot xchange major",
    label: "Dadar CR — Interchange",
    tooltip: "Dadar CR 🔄",
  },
  {
    id: "kurla",
    stn: "kurla",
    line: "cr",
    className: "hotspot cr major",
    label: "Kurla / LTT",
    tooltip: "Kurla / LTT 🚆",
  },
  {
    id: "ghatkopar",
    stn: "ghatkopar",
    line: "cr",
    className: "hotspot cr major",
    label: "Ghatkopar — Metro 1",
    tooltip: "Ghatkopar 🔄",
  },
  {
    id: "thane",
    stn: "thane",
    line: "cr",
    className: "hotspot cr terminus",
    label: "Thane — Lake City",
    tooltip: "Thane 🏙️",
  },
  {
    id: "kasara",
    stn: "kasara",
    line: "cr",
    className: "hotspot cr terminus tip-r",
    label: "Kasara — CR Terminus",
    tooltip: "Kasara 🛑",
  },
  {
    id: "karjat",
    stn: "kasara",
    line: "cr",
    className: "hotspot cr terminus",
    label: "Karjat / Khopoli — CR branch terminus",
    tooltip: "Karjat / Khopoli 🛑",
  },
  {
    id: "wadala",
    stn: "wadala",
    line: "hl",
    className: "hotspot hl",
    label: "Wadala Rd",
    tooltip: "Wadala Rd 🟢",
  },
  {
    id: "chembur",
    stn: "chembur",
    line: "hl",
    className: "hotspot hl major",
    label: "Chembur",
    tooltip: "Chembur 🟢",
  },
  {
    id: "mankhurd",
    stn: "vashi",
    line: "hl",
    className: "hotspot hl",
    label: "Mankhurd — towards Vashi",
    tooltip: "Mankhurd 🟢",
  },
  {
    id: "vashi",
    stn: "vashi",
    line: "hl",
    className: "hotspot hl major",
    label: "Vashi — Navi Mumbai",
    tooltip: "Vashi 🏙️",
  },
  {
    id: "belapur",
    stn: "panvel",
    line: "hl",
    className: "hotspot hl",
    label: "CBD Belapur",
    tooltip: "CBD Belapur 🟢",
  },
  {
    id: "panvel",
    stn: "panvel",
    line: "hl",
    className: "hotspot hl terminus",
    label: "Panvel — HL Terminus",
    tooltip: "Panvel 🛑",
  },
];

const QUICK_LINKS = [
  {
    href: "/mumbai-local-train",
    icon: "🚇",
    label: "Full Mumbai Train Guide (Metro too)",
  },
  {
    href: "/mumbai-real-estate-guide",
    icon: "💰",
    label: "Mumbai Real Estate Intel",
  },
  { href: "/mumbai-monsoon", icon: "🌧️", label: "Mumbai Monsoon Guide" },
  {
    href: "/senior-citizens-mumbai",
    icon: "👴",
    label: "Senior Citizens Guide",
  },
  { href: "/mumbai-street-food", icon: "🥘", label: "Street Food Guide" },
  { href: "/mumbai-sports", icon: "🏏", label: "Mumbai Sports Hub" },
];

function HotspotButton({ hs, isActive, isHidden, onSelect }) {
  return (
    <button
      type="button"
      className={`${hs.className}${isActive ? " active" : ""}${isHidden ? " hide" : ""}`}
      data-stn={hs.stn}
      data-line={hs.line}
      aria-label={hs.label}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(hs.id, hs.stn);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(hs.id, hs.stn);
        }
      }}
    >
      <span className="hc" />
      <span className="hp1" />
      <span className="hp2" />
      <span className="hotspot-tooltip">{hs.tooltip}</span>
    </button>
  );
}

export default function LocalTrainsClient() {
  const [lineFilter, setLineFilter] = useState("all");
  const [activeHotspotId, setActiveHotspotId] = useState(null);
  const [selectedStnId, setSelectedStnId] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const closePanel = useCallback(() => {
    setActiveHotspotId(null);
    setSelectedStnId(null);
  }, []);

  const showStation = useCallback((hotspotId, stnId) => {
    if (!stations[stnId]) return;
    setActiveHotspotId(hotspotId);
    setSelectedStnId(stnId);
  }, []);

  const handleFilter = useCallback(
    (filter) => {
      setLineFilter(filter);
      if (filter !== "all" && activeHotspotId) {
        const active = HOTSPOTS.find((h) => h.id === activeHotspotId);
        if (active && active.line !== filter) closePanel();
      }
    },
    [activeHotspotId, closePanel],
  );

  const handleMapWrapClick = useCallback(
    (e) => {
      if (!e.target.closest(".hotspot")) closePanel();
    },
    [closePanel],
  );

  const toggleFaq = useCallback((index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  const selectedStation = selectedStnId ? stations[selectedStnId] : null;

  return (
    <div className="mumbai-local-trains-page">
      <header className="page-hero" role="banner">
        <div className="hero-grid" />
        <div className="hero-glow wr" />
        <div className="hero-glow cr" />
        <div className="con">
          <div className="ph-inner">
            <nav className="hero-bc" aria-label="Breadcrumb">
              <Link href="/">Mumbai96</Link>
              <span>›</span>
              <Link href="/transport">Transport</Link>
              <span>›</span>
              <span>Mumbai Local Train Guide</span>
            </nav>
            <p className="hero-kicker">Complete Train Guide 2026</p>
            <h1 className="hero-h1">
              Mumbai
              <br />
              <span className="wr-t">Local</span>{" "}
              <span className="cr-t">Train</span>
              <br />
              <span className="hl-t">Guide</span>
            </h1>
            <p className="hero-desc">
              3 lines. 465 km. 7.5 million rides every day. The lifeline of
              Mumbai — Western Line, Central Line and Harbour Line — explained
              simply with an interactive map, live fares and insider commuter
              tips.
            </p>
            <div className="hero-lines">
              <span className="line-pill lp-wr">
                <span className="dot dot-wr" />
                Western Line — Churchgate to Virar
              </span>
              <span className="line-pill lp-cr">
                <span className="dot dot-cr" />
                Central Line — CSMT to Kalyan/Kasara/Karjat-Khopoli
              </span>
              <span className="line-pill lp-hl">
                <span className="dot dot-hl" />
                Harbour Line — CSMT to Panvel
              </span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="con">
            <div className="hero-stats">
              <div className="hs">
                <div className="hs-n">465</div>
                <div className="hs-l">km of track</div>
              </div>
              <div className="hs">
                <div className="hs-n">7.5M+</div>
                <div className="hs-l">Daily Rides</div>
              </div>
              <div className="hs">
                <div className="hs-n">3</div>
                <div className="hs-l">Main Lines</div>
              </div>
              <div className="hs">
                <div className="hs-n">180+</div>
                <div className="hs-l">Stations</div>
              </div>
              <div className="hs">
                <div className="hs-n">₹5</div>
                <div className="hs-l">Min. Fare</div>
              </div>
              <div className="hs">
                <div className="hs-n">4:13 AM</div>
                <div className="hs-l">First Train (CR)</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="page-body">
        <div className="con">
          <div className="page-layout">
            <div className="page-main">
              <section className="sec rv" aria-labelledby="lines-heading">
                <p className="sec-kicker">The Three Lines</p>
                <h2 className="sec-title" id="lines-heading">
                  Mumbai&apos;s Local Train <em>Network</em> — Made Simple
                </h2>
                <p className="sec-subtitle">
                  Think of it like three coloured roads that go through Mumbai.
                  Each road has its own colour, its own end points, and its own
                  stops along the way.
                </p>

                <div className="line-cards">
                  <div className="lc">
                    <div className="lc-head wr-head">
                      <span className="lc-line-num">WR</span>
                      <span className="lc-emoji">🏖️</span>
                      <div className="lc-name">Western Line</div>
                      <div className="lc-route">Churchgate → Virar</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stat-row">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--wr">60</div>
                          <div className="lc-stat-l">km</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--wr">29</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--wr">Blue</div>
                          <div className="lc-stat-l">Colour</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Runs along Mumbai&apos;s western coast — from the tip of
                        the city at Churchgate all the way north to Virar.
                        Passes through Bandra, Andheri, Borivali and Vasai Road.
                        The busiest of the three lines.
                      </p>
                    </div>
                  </div>

                  <div className="lc">
                    <div className="lc-head cr-head">
                      <span className="lc-line-num">CR</span>
                      <span className="lc-emoji">🏛️</span>
                      <div className="lc-name">Central Line</div>
                      <div className="lc-route">CSMT → Kasara / Khopoli</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stat-row">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--cr">120+</div>
                          <div className="lc-stat-l">km</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--cr">51</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--cr">Red</div>
                          <div className="lc-stat-l">Colour</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Starts from the grand Victoria-era CSMT station and
                        heads northeast through Thane, Kalyan, and on to Kasara
                        or Khopoli. The spine of eastern Mumbai&apos;s suburbs.
                        Dadar is the biggest interchange station.
                      </p>
                    </div>
                  </div>

                  <div className="lc">
                    <div className="lc-head hl-head">
                      <span className="lc-line-num">HL</span>
                      <span className="lc-emoji">🌊</span>
                      <div className="lc-name">Harbour Line</div>
                      <div className="lc-route">CSMT → Panvel</div>
                    </div>
                    <div className="lc-body">
                      <div className="lc-stat-row">
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--hl">54</div>
                          <div className="lc-stat-l">km</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--hl">25</div>
                          <div className="lc-stat-l">Stations</div>
                        </div>
                        <div className="lc-stat">
                          <div className="lc-stat-n lc-stat-n--hl">Green</div>
                          <div className="lc-stat-l">Colour</div>
                        </div>
                      </div>
                      <p className="lc-desc">
                        Starts at CSMT and travels along the eastern harbour
                        coast through Wadala, Chembur, and into Navi Mumbai
                        (Vashi, Belapur) all the way to Panvel. Essential for
                        Navi Mumbai commuters.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="map-section rv" aria-labelledby="map-heading">
                <p className="sec-kicker">Interactive Map</p>
                <h2 className="sec-title" id="map-heading">
                  Tap Any Station to <em>Learn More</em>
                </h2>
                <p className="sec-subtitle">
                  Colour-coded lines just like a real Mumbai train map. Click
                  any station circle to see what&apos;s there!
                </p>

                <div
                  className="map-container"
                  role="application"
                  aria-label="Interactive Mumbai Local Train Map"
                >
                  <div className="map-header">
                    <div>
                      <div className="map-title">
                        🗺️ Mumbai Local Train Map
                        <span>Western · Central · Harbour</span>
                      </div>
                    </div>
                    <div className="map-hint">Tap a station for details</div>
                  </div>

                  <div className="map-filter-bar-wrap">
                    <div
                      className="map-filter-bar"
                      role="group"
                      aria-label="Filter stations by line"
                    >
                      <button
                        type="button"
                        className={`mfb mfb-all${lineFilter === "all" ? " on" : ""}`}
                        data-filter="all"
                        onClick={() => handleFilter("all")}
                      >
                        All Lines
                      </button>
                      <button
                        type="button"
                        className={`mfb mfb-wr${lineFilter === "wr" ? " on" : ""}`}
                        data-filter="wr"
                        onClick={() => handleFilter("wr")}
                      >
                        🔵 Western
                      </button>
                      <button
                        type="button"
                        className={`mfb mfb-cr${lineFilter === "cr" ? " on" : ""}`}
                        data-filter="cr"
                        onClick={() => handleFilter("cr")}
                      >
                        🔴 Central
                      </button>
                      <button
                        type="button"
                        className={`mfb mfb-hl${lineFilter === "hl" ? " on" : ""}`}
                        data-filter="hl"
                        onClick={() => handleFilter("hl")}
                      >
                        🟢 Harbour
                      </button>
                    </div>
                  </div>

                  <div className="map-body">
                    <div
                      className="map-img-wrap"
                      onClick={handleMapWrapClick}
                      role="presentation"
                    >
                      <figure className="map-figure">
                        <img
                          src="/images/mumbai-train-map.webp"
                          alt="Mumbai Local Train Network Map 2026 — Western Railway (Churchgate to Dahanu Road), Central Railway (Mumbai CST to Kasara and Karjat/Khopoli) and Harbour Line (CST to Panvel via Vashi and Belapur) — all stations with km distances"
                          className="train-map-img"
                          width={755}
                          height={940}
                          loading="lazy"
                          decoding="async"
                        />

                        <div
                          className="hotspot-layer"
                          role="group"
                          aria-label="Clickable station markers"
                        >
                          {HOTSPOTS.map((hs) => (
                            <HotspotButton
                              key={hs.id}
                              hs={hs}
                              isActive={activeHotspotId === hs.id}
                              isHidden={
                                lineFilter !== "all" && hs.line !== lineFilter
                              }
                              onSelect={showStation}
                            />
                          ))}
                        </div>

                        <figcaption className="map-figcaption">
                          Mumbai Suburban Railway Network — Western Railway,
                          Central Railway &amp; Harbour Line. Distances
                          approximate. Source: Indian Railways / WR / CR.
                        </figcaption>
                      </figure>
                    </div>

                    <div className="map-info-panel">
                      <div
                        className={`panel-default${selectedStation ? " panel-default--hidden" : ""}`}
                      >
                        <div className="panel-emoji-big">🚂</div>
                        <p className="panel-prompt">
                          Tap any station on the map to learn about it — even a
                          5-year-old will understand!
                        </p>
                        <br />
                        <div className="panel-legend">
                          <div className="panel-legend-item">
                            <span className="panel-legend-line panel-legend-line--wr" />
                            Western Line
                          </div>
                          <div className="panel-legend-item">
                            <span className="panel-legend-line panel-legend-line--cr" />
                            Central Line
                          </div>
                          <div className="panel-legend-item">
                            <span className="panel-legend-line panel-legend-line--hl" />
                            Harbour Line
                          </div>
                          <div className="panel-legend-item">
                            <span className="panel-legend-line panel-legend-line--gold" />
                            Interchange Station
                          </div>
                        </div>
                      </div>

                      {selectedStation && (
                        <div className="panel-station active">
                          <div
                            className={`ps-line-bar ps-line-bar--${selectedStation.barClass}`}
                          />
                          <div className="ps-emoji">
                            {selectedStation.emoji}
                          </div>
                          <div className="ps-name">{selectedStation.name}</div>
                          <div className="ps-lines">
                            {selectedStation.lines.map((l) => (
                              <span
                                key={l.label}
                                className={`ps-line-tag ${l.tagClass}`}
                              >
                                {l.label}
                              </span>
                            ))}
                          </div>
                          <div className="ps-desc">{selectedStation.desc}</div>
                          <div className="ps-facts">
                            {selectedStation.facts.map((f) => (
                              <div key={f.text} className="ps-fact">
                                <span className="ps-fact-icon">{f.icon}</span>
                                <span>{f.text}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="ps-close"
                            onClick={closePanel}
                          >
                            ✕ Click map to close
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="map-legend">
                    <div className="legend-item">
                      <span className="legend-line legend-line--wr" />
                      Western Line
                    </div>
                    <div className="legend-item">
                      <span className="legend-line legend-line--cr" />
                      Central Line
                    </div>
                    <div className="legend-item">
                      <span className="legend-line legend-line--hl" />
                      Harbour Line
                    </div>
                    <span className="legend-sep">|</span>
                    <div className="legend-item">
                      <span className="legend-dot legend-dot--major-wr" />
                      Major Station
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot legend-dot--interchange" />
                      Interchange
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot legend-dot--long-distance" />
                      Long Distance
                    </div>
                  </div>
                </div>
              </section>

              <section className="sec rv" aria-labelledby="fares-heading">
                <p className="sec-kicker">Ticket Prices 2026</p>
                <h2 className="sec-title" id="fares-heading">
                  How Much Does a <em>Mumbai Train</em> Ticket Cost?
                </h2>
                <p className="sec-subtitle">
                  Second class is cheap — really cheap. Most Mumbaikars use
                  Monthly Season Tickets (MST) which are the best value by far.
                </p>

                <div className="fare-grid">
                  <div className="fare-card">
                    <div className="fc-head fc-head--wr">
                      🔵 Western Line — Key Fares
                    </div>
                    <div className="fc-body">
                      <div className="fare-row">
                        <span className="fare-from">Churchgate → Andheri</span>
                        <span className="fare-price fare-price--wr">₹10</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">Churchgate → Borivali</span>
                        <span className="fare-price fare-price--wr">₹15</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">Churchgate → Virar</span>
                        <span className="fare-price fare-price--wr">₹20</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">Bandra → Andheri</span>
                        <span className="fare-price fare-price--wr">₹5</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">Dadar → Andheri</span>
                        <span className="fare-price fare-price--wr">₹10</span>
                      </div>
                    </div>
                  </div>

                  <div className="fare-card">
                    <div className="fc-head fc-head--cr">
                      🔴 Central Line — Key Fares
                    </div>
                    <div className="fc-body">
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Dadar</span>
                        <span className="fare-price fare-price--cr">₹5</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Ghatkopar</span>
                        <span className="fare-price fare-price--cr">₹10</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Thane</span>
                        <span className="fare-price fare-price--cr">₹15</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Kalyan</span>
                        <span className="fare-price fare-price--cr">₹15</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Kasara</span>
                        <span className="fare-price fare-price--cr">₹35</span>
                      </div>
                    </div>
                  </div>

                  <div className="fare-card">
                    <div className="fc-head fc-head--hl">
                      🟢 Harbour Line — Key Fares
                    </div>
                    <div className="fc-body">
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Wadala</span>
                        <span className="fare-price fare-price--hl">₹5</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Chembur</span>
                        <span className="fare-price fare-price--hl">₹10</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Vashi</span>
                        <span className="fare-price fare-price--hl">₹15</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Belapur</span>
                        <span className="fare-price fare-price--hl">₹15</span>
                      </div>
                      <div className="fare-row">
                        <span className="fare-from">CSMT → Panvel</span>
                        <span className="fare-price fare-price--hl">₹20</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="warn-box">
                  <div className="warn-icon">💡</div>
                  <div className="warn-body">
                    <h4>Monthly Season Ticket (MST) = Massive Savings</h4>
                    <p>
                      A daily commuter buying single tickets spends
                      ₹600–₹1,800/month. An MST for the same route costs
                      ₹130–₹450/month — saving you up to 75%. Buy at any station
                      counter or via the <strong>UTS App</strong> (Google Play /
                      App Store). First class MST costs ~4× more but with
                      significantly less crowd.
                    </p>
                  </div>
                </div>
              </section>

              <section className="sec rv" aria-labelledby="timings-heading">
                <p className="sec-kicker">Train Timings 2026</p>
                <h2 className="sec-title" id="timings-heading">
                  First &amp; Last Train <em>Timings</em>
                </h2>
                <p className="sec-subtitle">
                  Trains run almost 21 hours a day. But these timings matter —
                  especially for early risers and night owls.
                </p>

                <div className="timing-grid">
                  <div className="timing-card wr">
                    <div className="tc-label wr">🔵 Western Line</div>
                    <div className="tc-time">
                      <span className="tc-time-key">First from Churchgate</span>
                      <span className="tc-time-val">4:33 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">First from Virar</span>
                      <span className="tc-time-val">4:26 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Last from Churchgate</span>
                      <span className="tc-time-val">~1:00 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Frequency (peak)</span>
                      <span className="tc-time-val">2–4 min</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Frequency (off-peak)</span>
                      <span className="tc-time-val">6–10 min</span>
                    </div>
                  </div>

                  <div className="timing-card cr">
                    <div className="tc-label cr">🔴 Central Line</div>
                    <div className="tc-time">
                      <span className="tc-time-key">First from CSMT</span>
                      <span className="tc-time-val">4:13 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">First from Kasara</span>
                      <span className="tc-time-val">4:05 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Last from CSMT</span>
                      <span className="tc-time-val">~1:30 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Frequency (peak)</span>
                      <span className="tc-time-val">3–5 min</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Frequency (off-peak)</span>
                      <span className="tc-time-val">7–12 min</span>
                    </div>
                  </div>

                  <div className="timing-card hl">
                    <div className="tc-label hl">🟢 Harbour Line</div>
                    <div className="tc-time">
                      <span className="tc-time-key">First from CSMT</span>
                      <span className="tc-time-val">4:25 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">First from Panvel</span>
                      <span className="tc-time-val">4:15 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Last from CSMT</span>
                      <span className="tc-time-val">~12:30 AM</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Frequency (peak)</span>
                      <span className="tc-time-val">6–8 min</span>
                    </div>
                    <div className="tc-time">
                      <span className="tc-time-key">Frequency (off-peak)</span>
                      <span className="tc-time-val">12–20 min</span>
                    </div>
                  </div>
                </div>

                <div className="info-box">
                  <h4>⚠️ Avoid These Hours if You Can</h4>
                  <ul>
                    <li>
                      <strong>8:00–10:00 AM:</strong> Extreme rush. Trains are
                      packed beyond their 1,800-person limit. Board from start
                      stations (Churchgate, CSMT) for a seat, otherwise
                      it&apos;s standing room only
                    </li>
                    <li>
                      <strong>6:00–8:30 PM:</strong> Evening peak. Especially
                      bad at Dadar, Andheri, Thane and CSMT. Allow 20–30 extra
                      minutes for this window
                    </li>
                    <li>
                      <strong>Fast vs Slow trains:</strong> Always check — Fast
                      trains skip smaller stations. Slow trains stop everywhere.
                      The UTS app shows this clearly
                    </li>
                  </ul>
                </div>
              </section>

              <section className="sec rv" aria-labelledby="tips-heading">
                <p className="sec-kicker">Commuter Tips</p>
                <h2 className="sec-title" id="tips-heading">
                  Things Every <em>Mumbaikar</em> Should Know
                </h2>
                <p className="sec-subtitle">
                  These tips will save you time, money and a lot of stress on
                  the platform.
                </p>

                <div className="tips-grid">
                  <div className="tip-card">
                    <div className="tip-icon">👩</div>
                    <div className="tip-body">
                      <h4>Ladies Compartment</h4>
                      <p>
                        The 1st and last coaches on WR are exclusively for
                        women. On CR, the 1st coach from the front is Ladies.
                        Men are not allowed — it&apos;s strictly enforced.
                      </p>
                    </div>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🎟️</div>
                    <div className="tip-body">
                      <h4>First Class = Less Crowd</h4>
                      <p>
                        Front coaches are First Class — roughly 4× more
                        expensive but noticeably less packed. Worth it for long
                        commutes from Virar or Kasara.
                      </p>
                    </div>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">📱</div>
                    <div className="tip-body">
                      <h4>UTS App for Tickets</h4>
                      <p>
                        Download the UTS app (Indian Railways) for paperless
                        tickets. Buy single journey or monthly passes — no queue
                        at the counter. Must be within range of the station when
                        buying.
                      </p>
                    </div>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🚪</div>
                    <div className="tip-body">
                      <h4>Doors Remain Open</h4>
                      <p>
                        Mumbai locals run with doors open at all times —
                        it&apos;s how the city breathes. Stand back from
                        doorways when the train is moving. Only lean out if
                        you&apos;re a seasoned Mumbaikar.
                      </p>
                    </div>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">⚡</div>
                    <div className="tip-body">
                      <h4>Board Far End of Platform</h4>
                      <p>
                        The middle of long platforms gets the most crowd (exits
                        are there). Board from the far ends — first and last
                        coaches — for more breathing room and easier exits.
                      </p>
                    </div>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🗺️</div>
                    <div className="tip-body">
                      <h4>Mumbai Rail Map App</h4>
                      <p>
                        Best offline app for Mumbai local — shows fast/slow
                        trains, which stations each train stops at, and works
                        completely without internet. Essential for newcomers.
                      </p>
                    </div>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">📞</div>
                    <div className="tip-body">
                      <h4>Lost Something? Call 139</h4>
                      <p>
                        Railway enquiry helpline is 139. For found/lost items,
                        report at the Lost Property Office at your
                        station&apos;s Station Master cabin. File quickly —
                        items are cleared fast.
                      </p>
                    </div>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🔄</div>
                    <div className="tip-body">
                      <h4>Dadar = Mumbai&apos;s Middle</h4>
                      <p>
                        If you need to switch from WR to CR (or vice versa),
                        Dadar is your interchange point. WR and CR Dadar
                        stations are ~12 minutes walk apart. Far better than
                        going all the way to CSMT.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="cta-bar rv">
                <div>
                  <h3>
                    Explore <em>All of Mumbai96</em>
                  </h3>
                  <p>
                    Transport, neighbourhoods, food, real estate — everything a
                    Mumbaikar needs, free.
                  </p>
                </div>
                <Link href="/" className="cta-btn">
                  Go to Mumbai96 →
                </Link>
              </div>

              <section className="sec rv" aria-labelledby="faq-heading">
                <p className="sec-kicker">Frequently Asked Questions</p>
                <h2 className="sec-title" id="faq-heading">
                  Mumbai Local Train — <em>FAQs</em>
                </h2>

                <div className="faq-list">
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
                <h2>
                  Mumbai Local Train Network — Complete Commuter Guide 2026
                </h2>
                <p>
                  The Mumbai suburban railway is not just a transport system —
                  it is the city&apos;s heartbeat. Over 7.5 million people
                  travel on it every single day, making it one of the busiest
                  commuter rail networks on the planet. Understanding how the
                  three lines work — and how to use them together — is the
                  single most valuable skill any Mumbaikar can develop.
                </p>
                <h3>Western Line: The Western Coast&apos;s Lifeline</h3>
                <p>
                  The Western Line runs 60+ km from the southern tip of Mumbai
                  at Churchgate, hugging the western coastline north through
                  Marine Lines, Bandra, Andheri, Borivali, all the way to Virar.
                  It serves the western suburbs where Mumbai&apos;s IT, media,
                  and entertainment industries are concentrated. Andheri, the
                  busiest WR station, is also a major metro interchange point
                  for Metro Line 1 and Metro Line 7. The WR fast trains are
                  among the fastest short-distance trains in India relative to
                  station density.
                </p>
                <h3>Central Line: The Eastern Spine</h3>
                <p>
                  Central Line starts at the iconic CSMT (Chhatrapati Shivaji
                  Maharaj Terminus) — a UNESCO World Heritage site — and runs
                  northeast through the industrial and residential eastern
                  suburbs. Thane, Kalyan, and beyond to Kasara or Khopoli. The
                  CR main line and harbour branch share tracks till Kurla, after
                  which they diverge. Ghatkopar on the CR is a critical metro
                  interchange (Metro Line 1), finally giving east Mumbaikars a
                  direct link to the western suburbs without a long detour
                  through Dadar.
                </p>
                <h3>The Harbour Line: Navi Mumbai&apos;s Bridge</h3>
                <p>
                  The Harbour Line branches from CSMT eastward, curving around
                  the harbour and reaching into Navi Mumbai through Wadala,
                  Chembur, Vashi, and Belapur to Panvel. For Navi Mumbai
                  residents, it is the only direct rail connection to South
                  Mumbai. Journey time from CSMT to Panvel is approximately
                  65–70 minutes. The line also serves as a gateway to Konkan
                  Railway at Panvel — making it the first leg of a journey to
                  Goa, Mangalore, or Kerala.
                </p>
                <h3>How to Plan Any Mumbai Train Journey in 3 Steps</h3>
                <p>
                  Step 1: Identify which line your origin and destination are
                  on. If both are on the same line, simple. Step 2: If different
                  lines, find your interchange — Dadar is the mid-city
                  interchange between WR and CR; CSMT connects CR and Harbour
                  Line. Step 3: Check if a Fast train stops at your destination.
                  Use the UTS app or Mumbai Rail Map app. Buy your ticket — MST
                  if you&apos;re a regular commuter, single journey for one-off
                  trips.
                </p>
              </article>
            </div>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🚂 Quick <em>Contacts</em>
                </div>
                <div className="sbw-body">
                  <a href="tel:139" className="quick-link">
                    <div className="ql-icon">📞</div>
                    <div className="ql-text">Rail Enquiry — 139</div>
                    <div className="ql-arrow">→</div>
                  </a>
                  <a href="tel:182" className="quick-link">
                    <div className="ql-icon">🛡️</div>
                    <div className="ql-text">Railway Security — 182</div>
                    <div className="ql-arrow">→</div>
                  </a>
                  <a
                    href="https://utsonmobile.indianrailways.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-link"
                  >
                    <div className="ql-icon">📱</div>
                    <div className="ql-text">UTS Ticket App</div>
                    <div className="ql-arrow">↗</div>
                  </a>
                  <a
                    href="https://www.enquiry.indianrail.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-link"
                  >
                    <div className="ql-icon">🔍</div>
                    <div className="ql-text">Train Enquiry (NTES)</div>
                    <div className="ql-arrow">↗</div>
                  </a>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  ⏰ Key <em>Timings</em>
                </div>
                <div className="sbw-body sb-timings">
                  <div className="sb-timing-row">
                    <strong className="sb-timing-wr">WR First:</strong> 4:33 AM
                    — Churchgate
                  </div>
                  <div className="sb-timing-row">
                    <strong className="sb-timing-cr">CR First:</strong> 4:13 AM
                    — CSMT
                  </div>
                  <div className="sb-timing-row">
                    <strong className="sb-timing-hl">HL First:</strong> 4:25 AM
                    — CSMT
                  </div>
                  <div className="sb-timing-row">
                    <strong className="sb-timing-dark">Peak AM:</strong> 8:00 –
                    10:00 AM
                  </div>
                  <div className="sb-timing-row">
                    <strong className="sb-timing-dark">Peak PM:</strong> 6:00 –
                    8:30 PM
                  </div>
                  <div className="sb-timing-row">
                    <strong className="sb-timing-dark">WR Last:</strong> ~1:00
                    AM
                  </div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🗺️ Key <em>Interchanges</em>
                </div>
                <div className="sbw-body">
                  <div className="metro-sb-line">
                    <div className="metro-sb-dot metro-sb-dot--gold" />
                    <div>
                      <div className="metro-sb-name">Dadar — WR + CR</div>
                      <div className="metro-sb-route">
                        ~12 min walk between stations
                      </div>
                    </div>
                  </div>
                  <div className="metro-sb-line">
                    <div className="metro-sb-dot metro-sb-dot--cr" />
                    <div>
                      <div className="metro-sb-name">CSMT — CR + Harbour</div>
                      <div className="metro-sb-route">
                        Same complex — easy walk
                      </div>
                    </div>
                  </div>
                  <div className="metro-sb-line">
                    <div className="metro-sb-dot metro-sb-dot--purple" />
                    <div>
                      <div className="metro-sb-name">
                        Ghatkopar — CR + Metro 1
                      </div>
                      <div className="metro-sb-route">
                        Direct metro connection
                      </div>
                    </div>
                  </div>
                  <div className="metro-sb-line">
                    <div className="metro-sb-dot metro-sb-dot--wr" />
                    <div>
                      <div className="metro-sb-name">Andheri — WR + Metro</div>
                      <div className="metro-sb-route">
                        Metro 1 + Metro 7 access
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {QUICK_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="quick-link">
                      <div className="ql-icon">{l.icon}</div>
                      <div className="ql-text">{l.label}</div>
                      <div className="ql-arrow">→</div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
