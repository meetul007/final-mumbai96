"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import "./Navbar.css";
import SearchBar from "./SearchBox";
import { useAuth } from "@/context/auth/AuthContext";
import locationZones from "@/data/location-zones.json";

const EXTERNAL_HOODS = {
  north: (locationZones?.north || []).map((item) => [item.name, `/${item.slug}`]),
  western: (locationZones?.western || []).map((item) => [item.name, `/${item.slug}`]),
  central: (locationZones?.central || []).map((item) => [item.name, `/${item.slug}`]),
  south: (locationZones?.south || []).map((item) => [item.name, `/${item.slug}`]),
};

// ── Data ──────────────────────────────────────────────────────
const ZONES = [
  {
    id: "north",
    label: "🌴 North",
    emoji: "🌴",
    name: "NORTH MUMBAI",
    count: "Virar to Mira Road",
    hoods: [
      ["Virar West", "/virar-west"],
      ["Virar East", "/virar-east"],
      ["Nala Sopara West", "/nalasopara-west"],
      ["Nala Sopara East", "/nalasopara-east"],
      ["Vasai West", "/vasai-west"],
      ["Vasai East", "/vasai-east"],
      ["Naigaon West", "/naigaon-west"],
      ["Naigaon East", "/naigaon-east"],
      ["Bhayandar West", "/bhayandar-west"],
      ["Bhayandar East", "/bhayandar-east"],
      ["Uttan", "/uttan"],
      ["Mira Road East", "/mira-road-east"],
    ],
    link: "/north-mumbai",
    areaCount: "12 Areas",
  },
  {
    id: "western",
    label: "🌊 Western",
    emoji: "🌊",
    name: "WESTERN MUMBAI",
    count: "Gorai to Pali Hill",
    hoods: [
      ["Gorai", "/gorai"],
      ["Dahisar West", "/dahisar-west"],
      ["Dahisar East", "/dahisar-east"],
      ["Borivali West", "/borivali-west"],
      ["Borivali East", "/borivali-east"],
      ["Kandivali West", "/kandivali-west"],
      ["Kandivali East", "/kandivali-east"],
      ["Malad West", "/malad-west"],
      ["Madh Marve", "/madh-marve"],
      ["Malad East", "/malad-east"],
      ["Goregaon West", "/goregaon-west"],
      ["Goregaon East", "/goregaon-east"],
      // ["Ram Mandir", "/ram-mandir"],
      ["Jogeshwari West", "/jogeshwari-west"],
      ["Jogeshwari East", "/jogeshwari-east"],
      ["Andheri West", "/andheri-west"],
      ["Andheri East", "/andheri-east"],
      ["Juhu", "/juhu"],
      ["Versova", "/versova"],
      ["Vile Parle West", "/vile-parle-west"],
      ["Vile Parle East", "/vile-parle-east"],
      ["Santa Cruz West", "/santacruz-west"],
      ["Santa Cruz East", "/santacruz-east"],
      ["Khar West", "/khar-west"],
      ["Khar East", "/khar-east"],
      ["Bandra West", "/bandra-west"],
      ["Bandra East", "/bandra-east"],
      ["Mahim", "/mahim"],
      ["Pali Hill", "/pali-hill"],
      // ["Matunga Road", "/matunga-road"],
    ],
    link: "/western-mumbai",
    areaCount: "27 Areas",
  },
  {
    id: "central",
    label: "🚆 Central",
    emoji: "🚆",
    name: "CENTRAL MUMBAI",
    count: "Mulund to Wadala",
    hoods: [
      ["Mulund West", "/mulund-west"],
      ["Mulund East", "/mulund-east"],
      ["Bhandup", "/bhandup"],
      ["Vikhroli", "/vikhroli"],
      ["Powai", "/powai"],
      ["Chembur", "/chembur"],
      ["Ghatkopar West", "/ghatkopar-west"],
      ["Ghatkopar East", "/ghatkopar-east"],
      ["Kurla", "/kurla"],
      ["Sion", "/sion"],
      // ["Antop Hill", "/antop-hill"],
      ["Wadala", "/wadala"],
    ],
    link: "/central-mumbai",
    areaCount: "12 Areas",
  },
  {
    id: "south",
    label: "🏙️ South",
    emoji: "🏙️",
    name: "SOUTH MUMBAI",
    count: "BKC to Colaba",
    hoods: [
      ["BKC", "/bkc"],
      ["Matunga", "/matunga"],
      ["Dadar West", "/dadar-west"],
      ["Dadar East", "/dadar-east"],
      ["Prabhadevi", "/prabhadevi"],
      ["Lower Parel West", "/lower-parel-west"],
      ["Lower Parel East", "/lower-parel-east"],
      ["Worli", "/worli"],
      ["Mahalaxmi", "/mahalaxmi"],
      ["Marine Lines", "/marine-lines"],
      ["Mumbai Central", "/mumbai-central"],
      ["Grant Road", "/grant-road"],
      ["Charni Road", "/charni-road"],
      ["Byculla", "/byculla"],
      ["Pedder Road", "/pedder-road"],
      ["Altamount Road", "/altamount-road"],
      ["Tardeo", "/tardeo"],
      ["Breach Candy", "/breach-candy"],
      ["Malabar Hill", "/malabar-hill"],
      ["Kalbadevi", "/kalbadevi"],
      ["Churchgate", "/churchgate"],
      ["Fort", "/fort"],
      ["Cuffe Parade", "/cuffe-parade"],
      ["Colaba", "/colaba"],
    ],
    link: "/south-mumbai",
    areaCount: "14 Areas",
  },
];

for (const zone of ZONES) {
  const hoods = EXTERNAL_HOODS[zone.id];
  if (hoods?.length) {
    zone.hoods = hoods;
    zone.areaCount = `${hoods.length} Areas`;
  }
}

// ── Chevron Icon ──────────────────────────────────────────────
function ChevronIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── Search Icon ───────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// ── Plus Icon ─────────────────────────────────────────────────
function PlusIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ── Star Icon ─────────────────────────────────────────────────
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9.09 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L14.91 8.26L12 2Z" />
    </svg>
  );
}

// ── About Dropdown ────────────────────────────────────────────
function AboutDropdown({ closeMenu }) {
  return (
    <div className="m96-drop">
      <div className="m96-drop-group">
        <div className="m96-drop-head">Who We Are</div>
        <Link href="/know-us" className="m96-drop-link" onClick={closeMenu}>
          <span className="ico">🏛️</span> Know Us
        </Link>
        <Link href="/our-mission" className="m96-drop-link" onClick={closeMenu}>
          <span className="ico">🎯</span> Our Mission
        </Link>
      </div>

      {/* Hidden - Why Join Us & Know More

      <div className="m96-drop-divider" />
      <div className="m96-drop-group">
        <div className="m96-drop-head">Why Join Us?</div>
        <Link href="/case-study" className="m96-drop-link">
          <span className="ico">📈</span> Case Study
        </Link>
        <Link href="/compare-us" className="m96-drop-link">
          <span className="ico">⚖️</span> Compare Us
        </Link>
      </div>
      
      <div className="m96-drop-divider" />
      <div className="m96-drop-group">
        <div className="m96-drop-head">Know More</div>
        <Link href="/testimonials" className="m96-drop-link">
          <span className="ico">💬</span> Testimonials
        </Link>
        <Link href="/faq" className="m96-drop-link">
          <span className="ico">❓</span> Mumbai96 FAQ&apos;s
        </Link>
      </div>
    </div>
    
    */}
    </div>
  );
}

// ── Help Dropdown ─────────────────────────────────────────────
function HelpDropdown() {
  return (
    <div className="m96-drop">
      <div className="m96-drop-group">
        <div className="m96-drop-head">Frauds &amp; Scams</div>
        <Link href="/report-fraud-scam" className="m96-drop-link">
          <span className="ico">🚨</span> Report Fraud / Scam
        </Link>
        <Link href="/mumbai-police-stations" className="m96-drop-link">
          <span className="ico">👮</span> Mumbai Police Stations
        </Link>
      </div>
      <div className="m96-drop-divider" />
      <div className="m96-drop-group">
        <div className="m96-drop-head">Kids &amp; Women</div>
        <Link href="/child-helpline-mumbai" className="m96-drop-link">
          <span className="ico">🧒</span> Kids Safety
        </Link>
        <Link href="/women-helpline-mumbai" className="m96-drop-link">
          <span className="ico">🛡️</span> Women Safety
        </Link>
      </div>
    </div>
  );
}

// ── Spotlight Dropdown ────────────────────────────────────────
function DealsDropdown() {
  return (
    <div className="m96-drop">
      <Link href="/property-deals" className="m96-drop-link">
        <span className="ico">🏠</span> Property Deals
      </Link>
      <Link href="/franchise-deals" className="m96-drop-link">
        <span className="ico">🏢</span> Franchise Deals
      </Link>
      <Link href="/coming-soon" className="m96-drop-link">
        <span className="ico">✈️</span> Travel Deals
      </Link>
      <Link href="/coming-soon" className="m96-drop-link">
        <span className="ico">🏨</span> Stay Deals
      </Link>
    </div>
  );
}

// ── Travel Dropdown ───────────────────────────────────────────
function TravelDropdown() {
  return (
    <div className="m96-drop">
      <div className="m96-drop-group">
        <div className="m96-drop-head">MUMBAI</div>
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">🗺️</span> Jobs
        </Link>
        <Link href="/mumbai-education" className="m96-drop-link">
          <span className="ico">📚</span> Education
        </Link>
        <Link href="/mumbai-festivals" className="m96-drop-link">
          <span className="ico">🎉</span> Festivals
        </Link>
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">🚇</span> Local Train
        </Link>

        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">🚇</span> Metro
        </Link>
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">🌧️</span> Monsoon
        </Link>
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">🏠</span> Real Estate
        </Link>
        <Link href="/mumbai-sports" className="m96-drop-link">
          <span className="ico">⚽</span> Sports
        </Link>
        <Link href="/mumbai-startup-business" className="m96-drop-link">
          <span className="ico">💼</span> Startup & Business
        </Link>
        <Link href="/mumbai-street-food" className="m96-drop-link">
          <span className="ico">🍜</span> Street Food
        </Link>
        <Link href="/pets-mumbai" className="m96-drop-link">
          <span className="ico">🐾</span> Pets
        </Link>
        <Link href="/senior-citizens-mumbai" className="m96-drop-link">
          <span className="ico">👴</span> Senior Citizens
        </Link>
        <Link href="/save-electricity-mumbai" className="m96-drop-link">
          <span className="ico">💡</span> Save Electricity
        </Link>
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">🏢</span> Maharera
        </Link>
      </div>
    </div>
  );
}

function SocietyDropdown() {
  return (
    <div className="m96-drop">
      <div className="m96-drop-group">
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">🗺️</span> Society Bye Laws
        </Link>
        <Link href="/society-services" className="m96-drop-link">
          <span className="ico">🛠️</span> Society Services
        </Link>
        <Link href="/property-tax-mumbai" className="m96-drop-link">
          <span className="ico">💰</span> Property Tax Info
        </Link>
      </div>
    </div>
  );
}

function BmcDropdown() {
  return (
    <div className="m96-drop">
      <div className="m96-drop-group">
        <Link href="/bmc-hospitals-mumbai" className="m96-drop-link">
          <span className="ico">🏥</span> BMC Hospitals
        </Link>
        <Link href="/bmc-gardens" className="m96-drop-link">
          <span className="ico">🌳</span> BMC Gardens
        </Link>
        <Link href="/bmc-schools-mumbai" className="m96-drop-link">
          <span className="ico">🏫</span> BMC Schools
        </Link>

        {/*
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">📋</span> BMC Licences
        </Link>
        */}

        <Link href="/mumbai-corporators" className="m96-drop-link">
          <span className="ico">💼</span> BMC Corporators
        </Link>
        <Link href="/property-tax-mumbai" className="m96-drop-link">
          <span className="ico">💰</span> Property Tax Info
        </Link>
        <Link href="/mhada-lottery-mumbai" className="m96-drop-link">
          <span className="ico">🎟️</span> MHADA Lottery
        </Link>
        <Link href="/coming-soon" className="m96-drop-link">
          <span className="ico">📋</span> BMC Licence
        </Link>
        <Link href="/bmc-stray-dogs-vaccination" className="m96-drop-link">
          <span className="ico">🐕</span> Stray Dogs
        </Link>
        <Link href="/bmc-complaint" className="m96-drop-link">
          <span className="ico">📝</span> BMC Complaints
        </Link>
      </div>
    </div>
  );
}

function CommunityDropdown() {
  return (
    <div className="m96-drop">
      <div className="m96-drop-group">
        <Link href="/mumbai-voice" className="m96-drop-link">
          <span className="ico">📢</span> Mumbai Voice
        </Link>
        <Link href="/lost-found" className="m96-drop-link">
          <span className="ico">🔍</span> Lost & Found
        </Link>
        <Link href="/mumbai-reviews" className="m96-drop-link">
          <span className="ico">⭐</span> Reviews
        </Link>

        {/*
         <Link href="/mumbai-forum" className="m96-drop-link">
          <span className="ico">📝</span> Forum
        </Link>
        */}

        <Link href="/ngos-mumbai" className="m96-drop-link">
          <span className="ico">⭐</span> ngo&apos;s
        </Link>
      </div>
    </div>
  );
}

// ── Mega Explore Dropdown ─────────────────────────────────────
function ExploreDropdown({ closeMenu }) {
  const router = useRouter();
  const [activeZone, setActiveZone] = useState("north");
  const zone = ZONES.find((z) => z.id === activeZone);

  useEffect(() => {
    if (!zone?.hoods?.length) return;

    // Warm route payloads for the currently visible zone to speed first click.
    zone.hoods.forEach(([, href]) => {
      router.prefetch(href);
    });
  }, [router, zone]);

  return (
    <div className="m96-mega">
      <div className="mega-inner">
        <div className="mega-header">
          <div>
            <div className="mega-title">
              EXPLORE <em>MUMBAI.</em>
            </div>
            {/* <div className="mega-sub">
              96 neighbourhoods · 4 zones · One city
            </div> */}
          </div>
          {/* <div className="explore-menu-links">
            <Link
              href="/know-mumbai"
              className="mega-all-link"
              onClick={closeMenu}
            >
              Know Mumbai
            </Link>
            <Link
              href="/celebrities"
              className="mega-all-link"
              onClick={closeMenu}
            >
              Celebrities
            </Link>
            <Link
              href="/meetups"
              className="mega-all-link"
              onClick={closeMenu}
            >
              Meetup's
            </Link>
          </div> */}
        </div>

        <div className="mega-layout">
          <div>
            {/* Zone Tabs */}
            <div className="mega-zone">
              <div className="mega-zone-tabs">
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    className={`mzt${activeZone === z.id ? " on" : ""}`}
                    onClick={() => setActiveZone(z.id)}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
              <div className="mega-zone-tabs">
                <Link href="/celebrities" className="mzt">
                  Celebrities
                </Link>
                <Link href="/know-mumbai" className="mzt">
                  Know Mumbai
                </Link>{" "}
                <Link href="/blog" className="mzt">
                  Blog
                </Link>
              </div>
            </div>

            {/* Zone Panel */}
            {zone && (
              <div className="mega-zone-panel on">
                <div className="mega-zone-info">
                  <div className="mzi-badge">{zone.emoji}</div>
                  <div>
                    <div className="mzi-name">{zone.name}</div>
                    <div className="mzi-count">{zone.count}</div>
                  </div>
                </div>
                <div className="m96-hood-grid">
                  {zone.hoods.map(([name, href]) => (
                    <Link
                      key={href}
                      href={href}
                      prefetch={true}
                      className="m96-hood-link"
                      onMouseEnter={() => router.prefetch(href)}
                      onClick={closeMenu}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Desktop Nav Item ──────────────────────────────────────────
function NavItem({ label, href, children, gold }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  const closeMenu = () => setOpen(false);

  if (!children) {
    return (
      <li className="m96-item">
        <Link
          href={href || "/"}
          onClick={closeMenu}
          style={gold ? { color: "var(--gold)" } : undefined}
        >
          {gold && <StarIcon />}
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={`m96-item${open ? " open" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span>
        {label}
        <ChevronIcon className="m96-chev" />
      </span>

      {/* inject closeMenu */}
      {React.cloneElement(children, { closeMenu })}
    </li>
  );
}

// ── Mobile Drawer ─────────────────────────────────────────────
function MobileDrawer({ open, onClose, isLoggedIn, user, logout }) {
  const [openItem, setOpenItem] = useState(null);
  const [activeZone, setActiveZone] = useState("north");

  const toggleItem = (id) => setOpenItem((prev) => (prev === id ? null : id));

  const drwLinks = (children) => (
    <div className="drw-sub" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );

  return (
    <>
      <div
        className={`m96-drawer-overlay${open ? " open" : ""}`}
        onClick={onClose}
      />
      <div className={`m96-drawer${open ? " open" : ""}`}>
        {/* Home */}
        {/* <div className="drw-item">
          <div className="drw-top">
            <Link href="/" onClick={onClose}>
              Home
            </Link>
          </div>
        </div> */}

        {/* About */}
        <div
          className={`drw-item${openItem === "about" ? " open" : ""}`}
          onClick={() => toggleItem("about")}
        >
          <div className="drw-top has-sub">
            About Us <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <>
              <div className="drw-sub-head">Who We Are</div>
              <Link href="/know-us" className="drw-sub-link" onClick={onClose}>
                <span className="ico">🏛️</span> Know Us
              </Link>
              <Link
                href="/our-mission"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🎯</span> Our Mission
              </Link>
              <div className="drw-sub-head">Why Join Us</div>
              <Link
                href="/case-study"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">📈</span> Case Study
              </Link>
              <Link
                href="/compare-us"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">⚖️</span> Compare Us
              </Link>
              <div className="drw-sub-head">Know More</div>
              <Link
                href="/testimonials"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">💬</span> Testimonials
              </Link>
              <Link href="/faq" className="drw-sub-link" onClick={onClose}>
                <span className="ico">❓</span> FAQ&apos;s
              </Link>
            </>,
          )}
        </div>

        {/* Explore */}
        <div
          className={`drw-item${openItem === "explore" ? " open" : ""}`}
          onClick={() => toggleItem("explore")}
        >
          <div className="drw-top has-sub">
            Explore <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <div className="drw-hood-group">
              <div className="drw-hood-tabs">
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    className={`dht${activeZone === z.id ? " on" : ""}`}
                    onClick={() => setActiveZone(z.id)}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
              {ZONES.map((z) => (
                <div
                  key={z.id}
                  className={`drw-hood-panel${activeZone === z.id ? " on" : ""}`}
                >
                  {z.hoods.map(([name, href]) => (
                    <Link
                      key={href}
                      href={href}
                      prefetch={true}
                      className="drw-hood-link"
                      onMouseEnter={() => router.prefetch(href)}
                      onClick={onClose}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>,
          )}
        </div>

        {/* Help */}
        <div
          className={`drw-item${openItem === "help" ? " open" : ""}`}
          onClick={() => toggleItem("help")}
        >
          <div className="drw-top has-sub">
            Help <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <>
              <div className="drw-sub-head">Frauds &amp; Scams</div>
              <Link
                href="/report-fraud-scam"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🚨</span> Report Fraud
              </Link>
              <Link
                href="/report-fraud-scam"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">⚠️</span> Report Scam
              </Link>
              <div className="drw-sub-head">Kids &amp; Women</div>
              <Link
                href="/child-helpline-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🧒</span> Kids Safety
              </Link>
              <Link
                href="/women-helpline-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🛡️</span> Women Safety
              </Link>
            </>,
          )}
        </div>

        {/* Deals */}
        <div
          className={`drw-item${openItem === "deals" ? " open" : ""}`}
          onClick={() => toggleItem("deals")}
        >
          <div className="drw-top has-sub">
            DEALS <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <>
              <Link
                href="/property-deals"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🏠</span> Property Deals
              </Link>
              <Link
                href="/franchise-deals"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🏢</span> Franchise Deals
              </Link>

              {/* Hidden - Travel Deals
              <Link
                href="/coming-soon"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">✈️</span> Travel Deals
              </Link>
              */}

              {/* Hidden - Stay Deals
              <Link
                href="/coming-soon"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🏨</span> Stay Deals
              </Link>
              */}
            </>,
          )}
        </div>

        {/* AI */}
        {/* <div className="drw-item">
          <div className="drw-top">
            <Link href="/" style={{ color: "var(--gold)" }} onClick={onClose}>
              ⭐ AI
            </Link>
          </div>
        </div> */}

        {/* Travel */}
        {/* <div
          className={`drw-item${openItem === "travel" ? " open" : ""}`}
          onClick={() => toggleItem("travel")}
        >
          <div className="drw-top has-sub">
            Travel <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <>
              <Link
                href="/know-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🗺️</span> Know Mumbai
              </Link>
              <Link
                href="/must-visit-places"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">📍</span> Must Visit Places
              </Link>
              <Link
                href="/mumbai-night-life"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🌃</span> Mumbai Night Life
              </Link>
              <Link
                href="/mumbai-travel"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🚂</span> Mumbai Travel
              </Link>
              <Link
                href="/foreign-tourists"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">✈️</span> Foreign Tourists
              </Link>
            </>,
          )}
        </div> */}

        {/* Community */}
        <div
          className={`drw-item${openItem === "community" ? " open" : ""}`}
          onClick={() => toggleItem("community")}
        >
          <div className="drw-top has-sub">
            Community <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <>
              <Link
                href="/mumbai-forum"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">📝</span> Forum
              </Link>
              <Link
                href="/mumbai-voice"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">📢</span> Mumbai Voice
              </Link>
              <Link
                href="/lost-found"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🔍</span> Lost & Found
              </Link>
              <Link
                href="/mumbai-reviews"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">⭐</span> Reviews
              </Link>
              <Link
                href="/ngos-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">⭐</span> ngo&apos;s
              </Link>
              <Link
                href="/coming-soon"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🏢</span> Maharera
              </Link>
            </>,
          )}
        </div>

        {/* Jobs */}
        {/* Hidden - Jobs Section
        <div className="drw-item">
          <div className="drw-top">
            <Link href="/coming-soon" onClick={onClose}>
              Jobs
            </Link>
          </div>
        </div>
         */}

        {/* BMC */}
        <div
          className={`drw-item${openItem === "bmc" ? " open" : ""}`}
          onClick={() => toggleItem("bmc")}
        >
          <div className="drw-top has-sub">
            BMC <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <>
              <Link
                href="/bmc-hospitals-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🏥</span> BMC Hospitals
              </Link>
              <Link
                href="/bmc-gardens"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🌳</span> BMC Gardens
              </Link>
              <Link
                href="/bmc-schools-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🏫</span> BMC Schools
              </Link>
              <Link
                href="/coming-soon"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">📋</span> BMC Licences
              </Link>
              <Link
                href="/mumbai-police-stations"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">👮</span> Mumbai Police Stations
              </Link>
              <Link
                href="/mumbai-corporators"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">💼</span> BMC Corporators
              </Link>
              <Link
                href="/property-tax-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">💰</span> Property Tax Info
              </Link>
              <Link
                href="/mhada-lottery-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🎟️</span> MHADA Lottery
              </Link>
              <Link
                href="/coming-soon"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">📋</span> BMC Licence
              </Link>
              <Link
                href="/bmc-stray-dogs-vaccination"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🐕</span> Stray Dogs
              </Link>
              <Link
                href="/bmc-complaint"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">📝</span> BMC Complaints
              </Link>
            </>,
          )}
        </div>

        {/* Society */}
        <div
          className={`drw-item${openItem === "society" ? " open" : ""}`}
          onClick={() => toggleItem("society")}
        >
          <div className="drw-top has-sub">
            Society <ChevronIcon className="drw-chev" />
          </div>
          {drwLinks(
            <>
              {/* Hidden - Society Bye Laws
              <Link
                href="/coming-soon"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🗺️</span> Society Bye Laws
              </Link>
              */}

              <Link
                href="/society-services"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">🛠️</span> Society Services
              </Link>
              <Link
                href="/property-tax-mumbai"
                className="drw-sub-link"
                onClick={onClose}
              >
                <span className="ico">💰</span> Property Tax Info
              </Link>
            </>,
          )}
        </div>

        {/* Business */}
        {/* Hidden - Business Section
        <div className="drw-item">
          <div className="drw-top">
            <Link href="/coming-soon" onClick={onClose}>
              Business
            </Link>
          </div>
        </div>
        */}

        {/* Meetup */}
        {/* Hidden - Meetup Section
        <div className="drw-item">
          <div className="drw-top">
            <Link href="/coming-soon" onClick={onClose}>
              Meetup
            </Link>
          </div>
        </div>
         */}

        {/* Contact */}
        <div className="drw-item">
          <div className="drw-top">
            <Link href="/contact-us" onClick={onClose}>
              Contact
            </Link>
          </div>
        </div>

        {/* <div className="drw-item">
          <div className="drw-top">
            <Link href="/Blog" onClick={onClose}>
              Blog
            </Link>
          </div>
        </div> */}

        {/* Footer */}
        <div className="drw-footer">
          <div className="drw-search-bar">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search Mumbai96…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  window.location.href = `/know-mumbai?q=${encodeURIComponent(e.target.value.trim())}`;
                }
              }}
            />
          </div>
          <div className="drw-auth-row">
            {isLoggedIn ? (
              <>
                <div className="drw-user-info">
                  <span className="drw-user-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                  <span className="drw-user-name">{user?.name || "User"}</span>
                </div>
                <button
                  className="drw-logout"
                  onClick={() => {
                    logout();
                    onClose();
                    window.location.href = "/";
                  }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="drw-signup"
                  onClick={onClose}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <Link
            href="/auth/signup"
            className="drw-add-listing"
            onClick={onClose}
          >
            ⭐ AI
          </Link>
          <Link
            href="/coming-soon"
            className="drw-add-listing"
            onClick={onClose}
          >
            Business
          </Link>
        </div>
      </div>
    </>
  );
}

// ── Main Navbar ───────────────────────────────────────────────
export default function Navbar() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav id="m96-nav" className={scrolled ? "lit" : "lit"}>
        {/* Logo */}
        <Link href="/" className="m96-logo">
          <img src="/logo.svg" />
        </Link>

        {/* Desktop Links */}
        <ul className="m96-links">
          {/* <NavItem label="Home" href="/" /> */}
          <NavItem label="About Us">
            <AboutDropdown />
          </NavItem>
          <NavItem label="Explore">
            <ExploreDropdown />
          </NavItem>
          <NavItem label="Help">
            <HelpDropdown />
          </NavItem>
          <NavItem label="Deals">
            <DealsDropdown />
          </NavItem>
          <NavItem label="COMMUNITY">
            <CommunityDropdown />
          </NavItem>
          {/* <NavItem label="AI" href="/" gold /> */}

          {/* <NavItem label="Guide">
            <TravelDropdown />
          </NavItem> */}

          <NavItem label="BMC">
            <BmcDropdown />
          </NavItem>

          <NavItem label="Society">
            <SocietyDropdown />
          </NavItem>
          <NavItem label="Business" href="/coming-soon" />
          <NavItem label="Meetup" href="/coming-soon" />
          <NavItem label="Contact" href="/contact-us" />
          {/* <NavItem label="Blog" href="/blog" /> */}
        </ul>

        {/* Right Side */}
        <div className="m96-right">
          <SearchBar />
          <div className="m96-divider desktop" />
          {isLoggedIn ? (
            <div className="m96-profile desktop" ref={profileRef}>
              <button
                className="m96-profile-btn"
                onClick={() => setProfileOpen((p) => !p)}
              >
                <span className="m96-profile-avatar">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
                <span className="m96-profile-chevron">
                  {profileOpen ? "▲" : "▼"}
                </span>
              </button>
              {profileOpen && (
                <div className="m96-profile-menu">
                  <div className="m96-profile-header">
                    <strong>{user?.name || "User"}</strong>
                    <span>{user?.email || ""}</span>
                  </div>
                  <div className="m96-profile-divider" />
                  <Link
                    href="/dashboard"
                    className="m96-profile-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    📊 Dashboard
                  </Link>
                  <button
                    className="m96-profile-item m96-profile-logout"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                      router.push("/");
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {/* <Link href="/auth/signup" className="m96-signup desktop">
            Sign Up
          </Link> */}
          <div className="m96-divider desktop" />
          <Link
            href="/auth/signup"
            className="m96-signup desktop m96-add-listing"
          >
            AI
          </Link>

          {/* Hamburger */}
          <button
            className={`m96-ham${drawerOpen ? " open" : ""}`}
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isLoggedIn={isLoggedIn}
        user={user}
        logout={logout}
      />
    </>
  );
}
