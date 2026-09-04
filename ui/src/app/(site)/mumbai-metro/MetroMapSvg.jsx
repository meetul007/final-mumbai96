"use client";

export default function MetroMapSvg({ mapRef }) {
  return (
    <svg id="metro-map" ref={mapRef} viewBox="0 0 1100 740" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive schematic map of all Mumbai Metro lines 2026">
        <title>Mumbai Metro Map 2026 — All Lines</title>
        <desc>Interactive schematic map showing all Mumbai Metro operational lines: Line 1 Blue, Line 2A Yellow, Line 3 Aqua underground, Line 7 Red, Line 9 and Line 2B new 2026 lines, plus under construction Line 4 Green, Line 6 Pink.</desc>
        <defs>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="cb" />
            <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-sm">
            <feGaussianBlur stdDeviation="2" result="cb" />
            <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/*Underground dashed pattern for Line 3*/}
          <pattern id="aqua-dash" patternUnits="userSpaceOnUse" width="20" height="1">
            <line x1="0" y1="0" x2="13" y2="0" stroke="#00BCD4" strokeWidth="2" />
          </pattern>
        </defs>

        {/*==================== DIRECTION LABELS ====================*/}
        <text x="555" y="22" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.15)" fontSize="10" fontWeight="700" letterSpacing="2">NORTH</text>
        <text x="190" y="728" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.15)" fontSize="10" fontWeight="700" letterSpacing="2">WEST</text>
        <text x="880" y="728" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.15)" fontSize="10" fontWeight="700" letterSpacing="2">EAST</text>

        {/*==================== UNDER CONSTRUCTION (faded) ====================*/}

        {/*Line 4 Green - Bhakti Park to Kasarvadavali (Thane corridor) - faded*/}
        <polyline points="760,680 780,600 810,510 820,420 840,320 850,200"
          fill="none" stroke="rgba(67,160,71,.3)" strokeWidth="6" strokeDasharray="14,7" strokeLinecap="round" />
        <text x="865" y="420" fontFamily="Sora" fill="rgba(67,160,71,.35)" fontSize="9" fontWeight="700">LINE 4</text>
        <text x="865" y="431" fontFamily="Sora" fill="rgba(67,160,71,.25)" fontSize="8">Under Construction</text>

        {/*Line 6 Pink - JVLR corridor east-west at around y=310*/}
        <line x1="190" y1="310" x2="720" y2="310"
          stroke="rgba(216,27,96,.3)" strokeWidth="5" strokeDasharray="12,7" strokeLinecap="round" />
        <text x="725" y="314" fontFamily="Sora" fill="rgba(216,27,96,.35)" fontSize="9" fontWeight="700">LINE 6 PINK</text>
        <text x="725" y="325" fontFamily="Sora" fill="rgba(216,27,96,.25)" fontSize="8">Under Construction</text>

        {/*==================== LINE 9 (above Line 7, partial new) ====================*/}
        {/*Line 9 extends Line 7 northward from Dahisar East to Kashigaon*/}
        <line x1="310" y1="42" x2="310" y2="82"
          stroke="#E53935" strokeWidth="8" strokeLinecap="round" strokeDasharray="14,6" />
        {/*Line 9 glow*/}
        <line x1="310" y1="42" x2="310" y2="82"
          stroke="rgba(229,57,53,.25)" strokeWidth="18" strokeLinecap="round" />
        <text x="320" y="36" fontFamily="Sora" fill="rgba(229,57,53,.7)" fontSize="8.5" fontWeight="800">LINE 9 ↑ Mira-Bhayandar</text>
        <text x="320" y="46" fontFamily="Sora" fill="rgba(255,107,0,.8)" fontSize="7.5" fontWeight="700">NEW · April 2026</text>

        {/*==================== LINE 2B PARTIAL (far east, new) ====================*/}
        {/*Mandale to Diamond Garden (east side)*/}
        <line x1="900" y1="520" x2="900" y2="590"
          stroke="#F9A825" strokeWidth="7" strokeLinecap="round" strokeDasharray="12,6" />
        <line x1="900" y1="520" x2="900" y2="590"
          stroke="rgba(249,168,37,.2)" strokeWidth="16" strokeLinecap="round" />
        {/*Line 2B label*/}
        <text x="915" y="545" fontFamily="Sora" fill="rgba(249,168,37,.75)" fontSize="8.5" fontWeight="800">LINE 2B</text>
        <text x="915" y="556" fontFamily="Sora" fill="rgba(255,107,0,.8)" fontSize="7.5" fontWeight="700">NEW · April 2026</text>

        {/*==================== LINE 2A YELLOW (main) ====================*/}
        {/*Dahisar to DN Nagar, vertical at x=140*/}
        <line x1="140" y1="82" x2="140" y2="460"
          stroke="#F9A825" strokeWidth="9" strokeLinecap="round" />
        <line x1="140" y1="82" x2="140" y2="460"
          stroke="rgba(249,168,37,.22)" strokeWidth="22" strokeLinecap="round" />

        {/*==================== LINE 7 RED (main) ====================*/}
        {/*Dahisar East to Gundavali at x=310*/}
        <line x1="310" y1="82" x2="310" y2="460"
          stroke="#E53935" strokeWidth="9" strokeLinecap="round" />
        <line x1="310" y1="82" x2="310" y2="460"
          stroke="rgba(229,57,53,.22)" strokeWidth="22" strokeLinecap="round" />

        {/*==================== LINE 1 BLUE (horizontal) ====================*/}
        {/*Versova to Ghatkopar at y=460*/}
        <line x1="40" y1="460" x2="780" y2="460"
          stroke="#1565C0" strokeWidth="9" strokeLinecap="round" />
        <line x1="40" y1="460" x2="780" y2="460"
          stroke="rgba(21,101,192,.22)" strokeWidth="22" strokeLinecap="round" />

        {/*Connector: 2A DN Nagar → Line 1 (same station)*/}
        {/*Already overlapping at (140, 460)*/}

        {/*==================== LINE 3 AQUA (underground, dashed) ====================*/}
        {/*Route: Aarey(680,55) → SEEPZ(640,145) → MIDC(610,210) → Marol Naka(490,460) → Airport area(560,330) ← hmm need to route differently*/}
        {/*Actual geographic order: Aarey→SEEPZ→MIDC→Marol Naka→Airport T2→Sahar Road→Airport T1→Santacruz→Bandra Colony→BKC→Dharavi→Dadar→Worli→Churchgate area→Cuffe Parade*/}
        {/*For schematic: Aarey (top-right) → curves through SEEPZ, MIDC → Marol Naka (Line 1 junction) → airport area → BKC → curves south → Dadar → Worli → Churchgate → Cuffe Parade*/}

        {/*Line 3 glow layer*/}
        <polyline points="710,52 670,130 630,200 570,300 490,460 520,530 510,580 490,620 460,655 440,690 420,720"
          fill="none" stroke="rgba(0,188,212,.2)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
        {/*Line 3 main dashed line*/}
        <polyline points="710,52 670,130 630,200 570,300 490,460 520,530 510,580 490,620 460,655 440,690 420,720"
          fill="none" stroke="#00BCD4" strokeWidth="8" strokeDasharray="16,7" strokeLinecap="round" strokeLinejoin="round" />

        {/*UNDERGROUND label for Line 3*/}
        <text x="720" y="96" fontFamily="Sora" fill="rgba(0,188,212,.6)" fontSize="9" fontWeight="700">🚇 UNDERGROUND</text>

        {/*==================== LINE LABELS (vertical) ====================*/}
        <rect x="55" y="330" width="18" height="90" rx="5" fill="rgba(249,168,37,.6)" />
        <text x="64" y="348" textAnchor="middle" fontFamily="Sora" fill="white" fontSize="7.5" fontWeight="800" writingMode="tb" letterSpacing="1.5">2A YELLOW</text>

        <rect x="225" y="330" width="18" height="80" rx="5" fill="rgba(229,57,53,.6)" />
        <text x="234" y="348" textAnchor="middle" fontFamily="Sora" fill="white" fontSize="7.5" fontWeight="800" writingMode="tb" letterSpacing="1.5">7 RED</text>

        <rect x="380" y="382" width="90" height="18" rx="5" fill="rgba(21,101,192,.6)" />
        <text x="388" y="394" fontFamily="Sora" fill="white" fontSize="7.5" fontWeight="800" letterSpacing="1.5">1 BLUE LINE</text>

        {/*==================== STATIONS — LINE 2A ====================*/}

        {/*Dahisar — 2A North Terminus*/}
        <g className="stn-g" data-stn="dahisar_2a" onClick={(e) => onStationClick(e, "dahisar_2a")} onKeyDown={(e) => onStationKeyDown(e, "dahisar_2a")} tabIndex="0" role="button" aria-label="Dahisar - Line 2A terminus">
          <circle className="outer" cx="140" cy="82" r="16" fill="transparent" />
          <circle className="main" cx="140" cy="82" r="10" fill="white" stroke="#F9A825" strokeWidth="3" />
          <circle cx="140" cy="82" r="4" fill="#F9A825" />
          <text x="120" y="78" textAnchor="end" fontFamily="Sora" fill="white" fontSize="10.5" fontWeight="800">Dahisar</text>
          <text x="120" y="89" textAnchor="end" fontFamily="Sora" fill="rgba(255,255,255,.4)" fontSize="8">2A Terminus</text>
        </g>

        {/*Borivali West — 2A*/}
        <g className="stn-g" data-stn="borivali_w" onClick={(e) => onStationClick(e, "borivali_w")} onKeyDown={(e) => onStationKeyDown(e, "borivali_w")} tabIndex="0" role="button" aria-label="Borivali West - Line 2A">
          <circle className="outer" cx="140" cy="180" r="14" fill="transparent" />
          <circle className="main" cx="140" cy="180" r="7" fill="#F9A825" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
          <text x="122" y="183" textAnchor="end" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9.5">Borivali W</text>
        </g>

        {/*Goregaon — 2A*/}
        <g className="stn-g" data-stn="goregaon" onClick={(e) => onStationClick(e, "goregaon")} onKeyDown={(e) => onStationKeyDown(e, "goregaon")} tabIndex="0" role="button" aria-label="Goregaon - Line 2A">
          <circle className="outer" cx="140" cy="280" r="14" fill="transparent" />
          <circle className="main" cx="140" cy="280" r="7" fill="#F9A825" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
          <text x="122" y="283" textAnchor="end" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9.5">Goregaon</text>
        </g>

        {/*DN Nagar — 2A South terminus + Line 1 interchange*/}
        <g className="stn-g" data-stn="dn_nagar" onClick={(e) => onStationClick(e, "dn_nagar")} onKeyDown={(e) => onStationKeyDown(e, "dn_nagar")} tabIndex="0" role="button" aria-label="DN Nagar - Line 2A and Line 1 interchange">
          <circle className="outer" cx="140" cy="460" r="20" fill="transparent" />
          <circle cx="140" cy="460" r="17" fill="rgba(249,168,37,.15)" />
          <circle className="main" cx="140" cy="460" r="12" fill="white" stroke="#F9A825" strokeWidth="3.5" />
          <circle cx="140" cy="460" r="5" fill="#F9A825" />
          <text x="120" y="455" textAnchor="end" fontFamily="Sora" fill="white" fontSize="11" fontWeight="800">DN Nagar</text>
          <text x="120" y="467" textAnchor="end" fontFamily="Sora" fill="#F9A825" fontSize="7.5">2A ↔ Line 1 🔄</text>
        </g>

        {/*==================== STATIONS — LINE 7 ====================*/}

        {/*Kashigaon — Line 9 new*/}
        <g className="stn-g" data-stn="kashigaon" onClick={(e) => onStationClick(e, "kashigaon")} onKeyDown={(e) => onStationKeyDown(e, "kashigaon")} tabIndex="0" role="button" aria-label="Kashigaon - Line 9 new station">
          <circle className="outer" cx="310" cy="42" r="14" fill="transparent" />
          <circle className="main" cx="310" cy="42" r="9" fill="white" stroke="#E53935" strokeWidth="3" />
          <circle cx="310" cy="42" r="3.5" fill="#E53935" />
          <text x="328" y="38" fontFamily="Sora" fill="white" fontSize="10" fontWeight="800">Kashigaon</text>
          <text x="328" y="48" fontFamily="Sora" fill="rgba(255,107,0,.9)" fontSize="7.5" fontWeight="700">Line 9 • NEW 🆕</text>
        </g>

        {/*Dahisar East — Line 7 terminus (also Line 2A/9 junction zone)*/}
        <g className="stn-g" data-stn="dahisar_e" onClick={(e) => onStationClick(e, "dahisar_e")} onKeyDown={(e) => onStationKeyDown(e, "dahisar_e")} tabIndex="0" role="button" aria-label="Dahisar East - Line 7 terminus and Line 9 junction">
          <circle className="outer" cx="310" cy="82" r="18" fill="transparent" />
          <circle cx="310" cy="82" r="15" fill="rgba(229,57,53,.15)" />
          <circle className="main" cx="310" cy="82" r="11" fill="white" stroke="#E53935" strokeWidth="3" />
          <circle cx="310" cy="82" r="4.5" fill="#E53935" />
          <text x="330" y="78" fontFamily="Sora" fill="white" fontSize="11" fontWeight="800">Dahisar East</text>
          <text x="330" y="89" fontFamily="Sora" fill="#EF9A9A" fontSize="7.5">Line 7 + Line 9 🔄</text>
        </g>

        {/*Borivali East — 7*/}
        <g className="stn-g" data-stn="borivali_e" onClick={(e) => onStationClick(e, "borivali_e")} onKeyDown={(e) => onStationKeyDown(e, "borivali_e")} tabIndex="0" role="button" aria-label="Borivali East - Line 7">
          <circle className="outer" cx="310" cy="180" r="14" fill="transparent" />
          <circle className="main" cx="310" cy="180" r="7" fill="#E53935" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
          <text x="328" y="183" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9.5">Borivali East</text>
        </g>

        {/*Pahadi Goregaon — 7*/}
        <g className="stn-g" data-stn="pahadi_goregaon" onClick={(e) => onStationClick(e, "pahadi_goregaon")} onKeyDown={(e) => onStationKeyDown(e, "pahadi_goregaon")} tabIndex="0" role="button" aria-label="Pahadi Goregaon - Line 7">
          <circle className="outer" cx="310" cy="280" r="14" fill="transparent" />
          <circle className="main" cx="310" cy="280" r="7" fill="#E53935" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
          <text x="328" y="283" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9.5">Pahadi Goregaon</text>
        </g>

        {/*Gundavali / WEH — Line 7 south + Line 1 interchange*/}
        <g className="stn-g" data-stn="gundavali" onClick={(e) => onStationClick(e, "gundavali")} onKeyDown={(e) => onStationKeyDown(e, "gundavali")} tabIndex="0" role="button" aria-label="Gundavali WEH - Line 7 and Line 1 interchange">
          <circle className="outer" cx="310" cy="460" r="20" fill="transparent" />
          <circle cx="310" cy="460" r="17" fill="rgba(229,57,53,.15)" />
          <circle className="main" cx="310" cy="460" r="12" fill="white" stroke="#E53935" strokeWidth="3.5" />
          <circle cx="310" cy="460" r="5" fill="#E53935" />
          <text x="328" y="455" fontFamily="Sora" fill="white" fontSize="11" fontWeight="800">Gundavali</text>
          <text x="328" y="467" fontFamily="Sora" fill="#EF9A9A" fontSize="7.5">Line 7 ↔ Line 1 🔄</text>
        </g>

        {/*==================== STATIONS — LINE 1 ====================*/}

        {/*Versova — Line 1 west terminus*/}
        <g className="stn-g" data-stn="versova" onClick={(e) => onStationClick(e, "versova")} onKeyDown={(e) => onStationKeyDown(e, "versova")} tabIndex="0" role="button" aria-label="Versova - Line 1 western terminus">
          <circle className="outer" cx="40" cy="460" r="18" fill="transparent" />
          <circle cx="40" cy="460" r="15" fill="rgba(21,101,192,.15)" />
          <circle className="main" cx="40" cy="460" r="10" fill="white" stroke="#1565C0" strokeWidth="3" />
          <circle cx="40" cy="460" r="4" fill="#1565C0" />
          <text x="40" y="480" textAnchor="middle" fontFamily="Sora" fill="white" fontSize="10" fontWeight="800">Versova</text>
          <text x="40" y="491" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.35)" fontSize="7.5">L1 Terminus</text>
        </g>

        {/*Azad Nagar — Line 1*/}
        <g className="stn-g" data-stn="azad_nagar" onClick={(e) => onStationClick(e, "azad_nagar")} onKeyDown={(e) => onStationKeyDown(e, "azad_nagar")} tabIndex="0" role="button" aria-label="Azad Nagar - Line 1">
          <circle className="outer" cx="220" cy="460" r="14" fill="transparent" />
          <circle className="main" cx="220" cy="460" r="6.5" fill="#1565C0" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
          <text x="220" y="478" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.65)" fontSize="8.5">Azad Nagar</text>
        </g>

        {/*Airport Road / Chakala area — Line 1*/}
        <g className="stn-g" data-stn="airport_road" onClick={(e) => onStationClick(e, "airport_road")} onKeyDown={(e) => onStationKeyDown(e, "airport_road")} tabIndex="0" role="button" aria-label="Airport Road - Line 1">
          <circle className="outer" cx="410" cy="460" r="14" fill="transparent" />
          <circle className="main" cx="410" cy="460" r="6.5" fill="#1565C0" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
          <text x="410" y="478" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.65)" fontSize="8.5">Airport Road</text>
        </g>

        {/*Marol Naka — Line 1 + Line 3 MEGA INTERCHANGE*/}
        <g className="stn-g" data-stn="marol_naka" onClick={(e) => onStationClick(e, "marol_naka")} onKeyDown={(e) => onStationKeyDown(e, "marol_naka")} tabIndex="0" role="button" aria-label="Marol Naka - Line 1 and Line 3 Aqua interchange">
          <circle className="outer" cx="490" cy="460" r="22" fill="transparent" />
          <circle cx="490" cy="460" r="20" fill="rgba(0,188,212,.15)" />
          <circle className="main" cx="490" cy="460" r="14" fill="white" stroke="#00BCD4" strokeWidth="4" />
          <circle cx="490" cy="460" r="6" fill="#1565C0" />
          <text x="490" y="482" textAnchor="middle" fontFamily="Sora" fill="white" fontSize="11.5" fontWeight="800">Marol Naka</text>
          <text x="490" y="493" textAnchor="middle" fontFamily="Sora" fill="#80DEEA" fontSize="7.5">Line 1 ↔ Line 3 Aqua 🔄</text>
        </g>

        {/*Chakala (JB Nagar) — Line 1*/}
        <g className="stn-g" data-stn="chakala" onClick={(e) => onStationClick(e, "chakala")} onKeyDown={(e) => onStationKeyDown(e, "chakala")} tabIndex="0" role="button" aria-label="Chakala JB Nagar - Line 1">
          <circle className="outer" cx="580" cy="460" r="14" fill="transparent" />
          <circle className="main" cx="580" cy="460" r="6.5" fill="#1565C0" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
          <text x="580" y="478" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.65)" fontSize="8.5">Chakala</text>
        </g>

        {/*Saki Naka — Line 1*/}
        <g className="stn-g" data-stn="saki_naka" onClick={(e) => onStationClick(e, "saki_naka")} onKeyDown={(e) => onStationKeyDown(e, "saki_naka")} tabIndex="0" role="button" aria-label="Saki Naka - Line 1">
          <circle className="outer" cx="660" cy="460" r="14" fill="transparent" />
          <circle className="main" cx="660" cy="460" r="6.5" fill="#1565C0" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
          <text x="660" y="478" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.65)" fontSize="8.5">Saki Naka</text>
        </g>

        {/*Ghatkopar — Line 1 East terminus + CR Interchange*/}
        <g className="stn-g" data-stn="ghatkopar" onClick={(e) => onStationClick(e, "ghatkopar")} onKeyDown={(e) => onStationKeyDown(e, "ghatkopar")} tabIndex="0" role="button" aria-label="Ghatkopar - Line 1 eastern terminus and Central Railway interchange">
          <circle className="outer" cx="780" cy="460" r="22" fill="transparent" />
          <circle cx="780" cy="460" r="18" fill="rgba(21,101,192,.15)" />
          <circle className="main" cx="780" cy="460" r="13" fill="white" stroke="#1565C0" strokeWidth="3.5" />
          <circle cx="780" cy="460" r="5.5" fill="#1565C0" />
          <text x="780" y="482" textAnchor="middle" fontFamily="Sora" fill="white" fontSize="12" fontWeight="800">Ghatkopar</text>
          <text x="780" y="493" textAnchor="middle" fontFamily="Sora" fill="#90CAF9" fontSize="7.5">L1 Terminus + CR Local 🚂</text>
        </g>

        {/*==================== STATIONS — LINE 3 AQUA ====================*/}

        {/*Aarey JVLR — Line 3 North terminus*/}
        <g className="stn-g" data-stn="aarey" onClick={(e) => onStationClick(e, "aarey")} onKeyDown={(e) => onStationKeyDown(e, "aarey")} tabIndex="0" role="button" aria-label="Aarey JVLR - Line 3 northern terminus">
          <circle className="outer" cx="710" cy="52" r="18" fill="transparent" />
          <circle cx="710" cy="52" r="15" fill="rgba(0,188,212,.15)" />
          <circle className="main" cx="710" cy="52" r="10" fill="white" stroke="#00BCD4" strokeWidth="3" />
          <circle cx="710" cy="52" r="4" fill="#00BCD4" />
          <text x="728" y="48" fontFamily="Sora" fill="white" fontSize="11" fontWeight="800">Aarey JVLR</text>
          <text x="728" y="58" fontFamily="Sora" fill="rgba(0,188,212,.8)" fontSize="7.5">Line 3 Terminus 🛑</text>
        </g>

        {/*SEEPZ — Line 3 (also Line 6 future)*/}
        <g className="stn-g" data-stn="seepz" onClick={(e) => onStationClick(e, "seepz")} onKeyDown={(e) => onStationKeyDown(e, "seepz")} tabIndex="0" role="button" aria-label="SEEPZ - Line 3 Aqua station">
          <circle className="outer" cx="670" cy="130" r="16" fill="transparent" />
          <circle className="main" cx="670" cy="130" r="8" fill="#00BCD4" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
          <text x="688" y="133" fontFamily="Sora" fill="rgba(255,255,255,.8)" fontSize="9.5" fontWeight="600">SEEPZ</text>
          <text x="688" y="143" fontFamily="Sora" fill="rgba(0,188,212,.6)" fontSize="7.5">Line 6 future</text>
        </g>

        {/*MIDC / Airport T2 zone — Line 3*/}
        <g className="stn-g" data-stn="airport_t2" onClick={(e) => onStationClick(e, "airport_t2")} onKeyDown={(e) => onStationKeyDown(e, "airport_t2")} tabIndex="0" role="button" aria-label="Airport T2 - Line 3 Aqua station">
          <circle className="outer" cx="630" cy="200" r="16" fill="transparent" />
          <circle className="main" cx="630" cy="200" r="9" fill="white" stroke="#00BCD4" strokeWidth="2.5" />
          <circle cx="630" cy="200" r="3.5" fill="#00BCD4" />
          <text x="648" y="196" fontFamily="Sora" fill="rgba(255,255,255,.85)" fontSize="10" fontWeight="700">Airport T2 ✈️</text>
          <text x="648" y="207" fontFamily="Sora" fill="rgba(0,188,212,.65)" fontSize="7.5">CSMIA International</text>
        </g>

        {/*Airport T1 / Santacruz area — Line 3*/}
        <g className="stn-g" data-stn="airport_t1" onClick={(e) => onStationClick(e, "airport_t1")} onKeyDown={(e) => onStationKeyDown(e, "airport_t1")} tabIndex="0" role="button" aria-label="Airport T1 - Line 3 Aqua station">
          <circle className="outer" cx="570" cy="300" r="16" fill="transparent" />
          <circle className="main" cx="570" cy="300" r="8" fill="#00BCD4" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
          <text x="555" y="296" textAnchor="end" fontFamily="Sora" fill="rgba(255,255,255,.8)" fontSize="9.5" fontWeight="600">Airport T1 ✈️</text>
          <text x="555" y="307" textAnchor="end" fontFamily="Sora" fill="rgba(0,188,212,.6)" fontSize="7.5">Domestic Terminal</text>
        </g>

        {/*BKC — Line 3 key business hub*/}
        <g className="stn-g" data-stn="bkc" onClick={(e) => onStationClick(e, "bkc")} onKeyDown={(e) => onStationKeyDown(e, "bkc")} tabIndex="0" role="button" aria-label="BKC Bandra Kurla Complex - Line 3 Aqua station">
          <circle className="outer" cx="520" cy="530" r="20" fill="transparent" />
          <circle cx="520" cy="530" r="17" fill="rgba(0,188,212,.15)" />
          <circle className="main" cx="520" cy="530" r="13" fill="white" stroke="#00BCD4" strokeWidth="3.5" />
          <circle cx="520" cy="530" r="5.5" fill="#00BCD4" />
          <text x="540" y="525" fontFamily="Sora" fill="white" fontSize="12" fontWeight="800">BKC</text>
          <text x="540" y="536" fontFamily="Sora" fill="rgba(0,188,212,.8)" fontSize="7.5">Bandra-Kurla Complex 💼</text>
        </g>

        {/*Dadar — Line 3 (connects to local trains)*/}
        <g className="stn-g" data-stn="dadar_metro" onClick={(e) => onStationClick(e, "dadar_metro")} onKeyDown={(e) => onStationKeyDown(e, "dadar_metro")} tabIndex="0" role="button" aria-label="Dadar - Line 3 Aqua station with local train connection">
          <circle className="outer" cx="510" cy="580" r="16" fill="transparent" />
          <circle className="main" cx="510" cy="580" r="9" fill="white" stroke="#00BCD4" strokeWidth="2.5" />
          <circle cx="510" cy="580" r="3.5" fill="#00BCD4" />
          <text x="527" y="576" fontFamily="Sora" fill="rgba(255,255,255,.85)" fontSize="10" fontWeight="700">Dadar</text>
          <text x="527" y="587" fontFamily="Sora" fill="rgba(0,188,212,.6)" fontSize="7.5">+ WR/CR Local 🚂</text>
        </g>

        {/*Worli / Siddhivinayak area — Line 3*/}
        <g className="stn-g" data-stn="worli" onClick={(e) => onStationClick(e, "worli")} onKeyDown={(e) => onStationKeyDown(e, "worli")} tabIndex="0" role="button" aria-label="Worli - Line 3 Aqua station">
          <circle className="outer" cx="490" cy="620" r="16" fill="transparent" />
          <circle className="main" cx="490" cy="620" r="8" fill="#00BCD4" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
          <text x="474" y="617" textAnchor="end" fontFamily="Sora" fill="rgba(255,255,255,.8)" fontSize="9.5" fontWeight="600">Worli</text>
          <text x="474" y="627" textAnchor="end" fontFamily="Sora" fill="rgba(0,188,212,.6)" fontSize="7.5">Sea Link area 🌊</text>
        </g>

        {/*Churchgate — Line 3 + WR Local*/}
        <g className="stn-g" data-stn="churchgate_metro" onClick={(e) => onStationClick(e, "churchgate_metro")} onKeyDown={(e) => onStationKeyDown(e, "churchgate_metro")} tabIndex="0" role="button" aria-label="Churchgate - Line 3 station connecting to Western Railway local">
          <circle className="outer" cx="460" cy="655" r="16" fill="transparent" />
          <circle className="main" cx="460" cy="655" r="9" fill="white" stroke="#00BCD4" strokeWidth="2.5" />
          <circle cx="460" cy="655" r="3.5" fill="#00BCD4" />
          <text x="444" y="651" textAnchor="end" fontFamily="Sora" fill="rgba(255,255,255,.85)" fontSize="10" fontWeight="700">Churchgate</text>
          <text x="444" y="662" textAnchor="end" fontFamily="Sora" fill="rgba(0,188,212,.6)" fontSize="7.5">+ WR Local 🚂</text>
        </g>

        {/*CSMT — Line 3 + CR/Harbour Local*/}
        <g className="stn-g" data-stn="csmt_metro" onClick={(e) => onStationClick(e, "csmt_metro")} onKeyDown={(e) => onStationKeyDown(e, "csmt_metro")} tabIndex="0" role="button" aria-label="CSMT - Line 3 station with Central Railway and Harbour Line connection">
          <circle className="outer" cx="440" cy="690" r="18" fill="transparent" />
          <circle cx="440" cy="690" r="15" fill="rgba(0,188,212,.15)" />
          <circle className="main" cx="440" cy="690" r="11" fill="white" stroke="#00BCD4" strokeWidth="3" />
          <circle cx="440" cy="690" r="4.5" fill="#00BCD4" />
          <text x="422" y="685" textAnchor="end" fontFamily="Sora" fill="white" fontSize="11.5" fontWeight="800">CSMT</text>
          <text x="422" y="697" textAnchor="end" fontFamily="Sora" fill="rgba(0,188,212,.75)" fontSize="7.5">+ CR + Harbour 🚂</text>
        </g>

        {/*Cuffe Parade — Line 3 South terminus*/}
        <g className="stn-g" data-stn="cuffe_parade" onClick={(e) => onStationClick(e, "cuffe_parade")} onKeyDown={(e) => onStationKeyDown(e, "cuffe_parade")} tabIndex="0" role="button" aria-label="Cuffe Parade - Line 3 southern terminus">
          <circle className="outer" cx="420" cy="720" r="18" fill="transparent" />
          <circle cx="420" cy="720" r="15" fill="rgba(0,188,212,.15)" />
          <circle className="main" cx="420" cy="720" r="10" fill="white" stroke="#00BCD4" strokeWidth="3" />
          <circle cx="420" cy="720" r="4" fill="#00BCD4" />
          <text x="402" y="714" textAnchor="end" fontFamily="Sora" fill="white" fontSize="10.5" fontWeight="800">Cuffe Parade</text>
          <text x="402" y="725" textAnchor="end" fontFamily="Sora" fill="rgba(0,188,212,.7)" fontSize="7.5">Line 3 S Terminus 🛑</text>
        </g>

        {/*==================== STATIONS — LINE 2B (NEW) ====================*/}

        {/*Mandale — 2B North terminus (partial)*/}
        <g className="stn-g" data-stn="mandale" onClick={(e) => onStationClick(e, "mandale")} onKeyDown={(e) => onStationKeyDown(e, "mandale")} tabIndex="0" role="button" aria-label="Mandale - Line 2B new station">
          <circle className="outer" cx="900" cy="520" r="16" fill="transparent" />
          <circle className="main" cx="900" cy="520" r="9" fill="white" stroke="#F9A825" strokeWidth="2.5" />
          <circle cx="900" cy="520" r="3.5" fill="#F9A825" />
          <text x="918" y="516" fontFamily="Sora" fill="rgba(255,255,255,.85)" fontSize="10" fontWeight="700">Mandale</text>
          <text x="918" y="526" fontFamily="Sora" fill="rgba(255,107,0,.9)" fontSize="7.5" fontWeight="700">Line 2B NEW 🆕</text>
        </g>

        {/*Diamond Garden / Chembur — 2B partial*/}
        <g className="stn-g" data-stn="diamond_garden" onClick={(e) => onStationClick(e, "diamond_garden")} onKeyDown={(e) => onStationKeyDown(e, "diamond_garden")} tabIndex="0" role="button" aria-label="Diamond Garden Chembur - Line 2B new station">
          <circle className="outer" cx="900" cy="590" r="16" fill="transparent" />
          <circle className="main" cx="900" cy="590" r="9" fill="white" stroke="#F9A825" strokeWidth="2.5" />
          <circle cx="900" cy="590" r="3.5" fill="#F9A825" />
          <text x="918" y="586" fontFamily="Sora" fill="rgba(255,255,255,.85)" fontSize="10" fontWeight="700">Diamond Garden</text>
          <text x="918" y="596" fontFamily="Sora" fill="rgba(255,255,255,.45)" fontSize="7.5">Chembur area</text>
        </g>

        {/*==================== COMPASS ROSE ====================*/}
        <g transform="translate(1040, 120)">
          <circle cx="0" cy="0" r="30" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
          <text x="0" y="-16" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.7)" fontSize="10" fontWeight="800">N</text>
          <text x="0" y="22" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.35)" fontSize="9">S</text>
          <text x="-18" y="4" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.35)" fontSize="9">W</text>
          <text x="18" y="4" textAnchor="middle" fontFamily="Sora" fill="rgba(255,255,255,.35)" fontSize="9">E</text>
          <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
          <polygon points="0,-22 -4,-10 0,-14 4,-10" fill="rgba(255,255,255,.7)" />
        </g>

        {/*==================== LEGEND BOX ====================*/}
        <rect x="20" y="532" width="240" height="190" rx="10" fill="rgba(5,2,18,.75)" stroke="rgba(255,255,255,.07)" strokeWidth="1" />
        <text x="38" y="554" fontFamily="Sora" fill="rgba(255,255,255,.9)" fontSize="10" fontWeight="800" letterSpacing="1.5">LEGEND</text>

        {/*Operational lines*/}
        <text x="38" y="572" fontFamily="Sora" fill="rgba(255,255,255,.35)" fontSize="8" fontWeight="700" letterSpacing="1">OPERATIONAL</text>
        <line x1="38" y1="585" x2="68" y2="585" stroke="#1565C0" strokeWidth="5.5" strokeLinecap="round" />
        <text x="76" y="589" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9">Line 1 — Blue (Versova–Ghatkopar)</text>
        <line x1="38" y1="603" x2="68" y2="603" stroke="#F9A825" strokeWidth="5.5" strokeLinecap="round" />
        <text x="76" y="607" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9">Line 2A — Yellow (Dahisar–DN Nagar)</text>
        <line x1="38" y1="621" x2="68" y2="621" stroke="#E53935" strokeWidth="5.5" strokeLinecap="round" />
        <text x="76" y="625" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9">Line 7 — Red (Dahisar E–Gundavali)</text>
        <line x1="38" y1="639" x2="68" y2="639" stroke="#00BCD4" strokeWidth="5.5" strokeDasharray="10,5" strokeLinecap="round" />
        <text x="76" y="643" fontFamily="Sora" fill="rgba(255,255,255,.75)" fontSize="9">Line 3 — Aqua (Underground)</text>

        {/*New 2026*/}
        <text x="38" y="660" fontFamily="Sora" fill="rgba(255,107,0,.7)" fontSize="8" fontWeight="700" letterSpacing="1">NEW — APRIL 2026</text>
        <line x1="38" y1="673" x2="68" y2="673" stroke="#E53935" strokeWidth="4.5" strokeDasharray="8,5" strokeLinecap="round" />
        <text x="76" y="677" fontFamily="Sora" fill="rgba(255,255,255,.6)" fontSize="9">Line 9 (Dahisar E extension)</text>
        <line x1="38" y1="690" x2="68" y2="690" stroke="#F9A825" strokeWidth="4.5" strokeDasharray="8,5" strokeLinecap="round" />
        <text x="76" y="694" fontFamily="Sora" fill="rgba(255,255,255,.6)" fontSize="9">Line 2B partial (Diamond Gdn–Mandale)</text>

        {/*Under construction*/}
        <text x="38" y="712" fontFamily="Sora" fill="rgba(255,255,255,.25)" fontSize="8" fontWeight="700" letterSpacing="1">UNDER CONSTRUCTION</text>
        <line x1="38" y1="720" x2="68" y2="720" stroke="rgba(67,160,71,.5)" strokeWidth="4" strokeDasharray="8,5" strokeLinecap="round" />
        <text x="76" y="724" fontFamily="Sora" fill="rgba(255,255,255,.4)" fontSize="9">Line 4 Green · Line 6 Pink · Line 5</text>
      </svg>
  );
}
