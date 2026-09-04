"use client";

import { useState } from "react";

export default function WardSearch({ onSearch, onZoneChange }) {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("all");

  const handleSearch = () => {
    onSearch?.(query, zone);
  };

  const handleZoneChange = (newZone) => {
    setZone(newZone);
    onZoneChange?.(newZone, query);
  };

  return (
    <div className="search-section">
      <div className="con">
        <div className="search-inner">
          {/* SEARCH INPUT */}
          <div className="ward-search">
            <input
              className="ws-input"
              type="text"
              value={query}
              placeholder="Search by area name, ward number or corporator name…"
              onChange={(e) => setQuery(e.target.value)}
            />

            <button className="ws-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* ZONE FILTER */}
          <div className="zone-filter">
            {[
              { key: "all", label: "All Zones" },
              { key: "west", label: "Western" },
              { key: "central", label: "Central" },
              { key: "south", label: "South" },
              { key: "harbour", label: "Harbour" },
            ].map((z) => (
              <button
                key={z.key}
                className={`zf-btn ${zone === z.key ? "on" : ""}`}
                onClick={() => handleZoneChange(z.key)}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
