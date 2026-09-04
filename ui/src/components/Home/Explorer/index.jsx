"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import locationZones from "@/data/location-zones.json";

export default function Explorer() {
  const [zone, setZone] = useState("north");

  useEffect(() => {
    const elements = document.querySelectorAll(".rv");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.08 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // cleanup
  }, []);

  const zones = locationZones;

  const titles = {
    north: "🌐 North Mumbai",
    western: "🌊 Western Mumbai",
    central: "🏙️ Central Mumbai",
    south: "⚓ South Mumbai",
  };

  return (
    <section className="explorer">
      <div className="con">
        {/* Header */}
        <div
          className="rv"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div className="section-kicker">Your Mumbai</div>

            <h2 className="sec-title">
              FIND YOUR
              <br />
              <em>MUMBAI VIBE.</em>
            </h2>

            <p className="sec-desc">
              Every lane, every gully, every area, you call home in Mumbai, Covered.
            </p>
          </div>

          <Link
            href="/know-mumbai"
            style={{
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "var(--red)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "8px",
            }}
          >
            Know Mumbai →
          </Link>
        </div>

        {/* Tabs */}
        <div className="zone-tabs rv delay-1">
          {["north", "western", "central", "south"].map((z) => (
            <button
              key={z}
              className={`zt ${zone === z ? "on" : ""}`}
              onClick={() => setZone(z)}
            >
              {titles[z]}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="rv delay-2">
          <div className="zpanel on">
            <div className="zone-hd">
              <div className="zone-big">{titles[zone]}</div>
              <div className="zone-ct">{(zones[zone] || []).length} Neighbourhoods</div>
            </div>

            <div className="nb-grid">
              {(zones[zone] || []).map((area) => (
                <Link
                  key={area.slug}
                  href={`/${area.slug}`}
                  className="nb"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
