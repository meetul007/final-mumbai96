"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef(null);
  const sectionRef = useRef(null);

  const [category, setCategory] = useState("All Mumbai");
  const [query, setQuery] = useState("");

  // 🔥 Filter mapping (FIXED)
  const filterMap = {
    All: "All Mumbai",
    People: "People",
    Food: "Food & Drinks",
    Places: "Places",
    Business: "Business",
    Help: "Help & Safety",
    Nightlife: "Nightlife",
    Tourists: "Tourists",
  };

  const handleFilter = (cat) => {
    setCategory(filterMap[cat]);

    // 🔥 focus input (restored)
    inputRef.current?.focus();
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      inputRef.current?.focus();
      return;
    }

    try {
      console.log("asdljasdljasd");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/search?q=${encodeURIComponent(query)}`,
      );

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      if (data?.redirect) {
        router.push(`${data.redirect}?q=${encodeURIComponent(query)}`); // 🔥 THIS IS THE MAGIC
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    } catch (err) {
      console.error(err);

      // fallback
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    const catMap = {
      People: "/meetups",
      "Food & Drinks": "/know-mumbai",
      Places: "/must-visit-places",
      Business: "/auth/login",
      Travel: "/mumbai-travel",
      "Help & Safety": "/report-fraud-scam",
      Nightlife: "/mumbai-night-life",
      Tourists: "/foriegn-tourists",
      Community: "/meetups",
      Property: "/property-deals",
      Franchise: "/franchise-deals",
    };

    // const dest = catMap[category] || "/know-mumbai";

    // router.push(`${dest}?q=${encodeURIComponent(query)}`);
  };

  // 🔥 SCROLL REVEAL (restored)
  useEffect(() => {
    const el = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
        }
      },
      { threshold: 0.1 },
    );

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="searchbar-section">
      <div ref={sectionRef} className="con sb-inner rv">
        <div className="sb-label">Search Mumbai96</div>

        <div className="sb-headline">
          WHAT ARE YOU
          <br />
          LOOKING IN <em>MUMBAI?</em>
        </div>

        {/* 🔥 FILTER PILLS */}
        <div className="sb-filters">
          {Object.keys(filterMap).map((key) => {
            const isActive = category === filterMap[key];

            return (
              <button
                key={key}
                className={`sbf ${isActive ? "on" : ""}`}
                onClick={() => handleFilter(key)}
              >
                <span className="sbf-icon">
                  {key === "All" && "🌆"}
                  {key === "People" && "🧑‍🤝‍🧑"}
                  {key === "Food" && "🍛"}
                  {key === "Places" && "📍"}
                  {key === "Business" && "🏢"}
                  {key === "Travel" && "🚂"}
                  {key === "Help" && "🆘"}
                  {key === "Nightlife" && "🌃"}
                  {key === "Tourists" && "🗺️"}
                </span>
                {filterMap[key]}
              </button>
            );
          })}
        </div>

        {/* 🔥 SEARCH BOX */}
        <div className="sb-box">
          <select
            className="sb-cat-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.values(filterMap).map((val) => (
              <option key={val}>{val}</option>
            ))}
            <option>Community</option>
            <option>Property</option>
            <option>Franchise</option>
          </select>

          <input
            ref={inputRef}
            className="sb-input"
            type="text"
            placeholder="Search, food, businesses, people, places & more…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* 🔥 SVG restored */}
          <button className="sb-btn" onClick={handleSearch}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
        </div>

        {/* 🔥 TRENDING (exact structure) */}
        <div className="sb-trending">
          <span className="sb-trend-label">🔥 Trending —</span>

          {[
            { href: "/andheri-east", icon: "📍", label: "Andheri East" },
            { href: "/bandra-west", icon: "📍", label: "Bandra West" },
            { href: "/mumbai-night-life", icon: "🌃", label: "Nightlife" },
            {
              href: "/must-visit-places",
              icon: "🏛️",
              label: "Must Visit Places",
            },
            { href: "/report-fraud-scam", icon: "🚨", label: "Report Fraud" },
            { href: "/property-deals", icon: "🏠", label: "Property Deals" },
            { href: "/meetups", icon: "🤝", label: "Meetups" },
            { href: "/foriegn-tourists", icon: "🗺️", label: "Tourist Guide" },
          ].map((item) => (
            <a key={item.href} href={item.href} className="sb-trend-pill">
              <span className="sb-trend-fire">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
