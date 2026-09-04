"use client";

import { useEffect, useRef } from "react";

const FACTS = [
  "Mumbai contributes 6% of India\u2019s GDP",
  "7.5 Million daily local train riders",
  "First Indian film made in Bombay in 1913",
  "BSE \u2014 Asia\u2019s oldest stock exchange \u2014 founded in 1875",
  "Mumbai was 7 separate islands until land reclamation",
  "Dharavi generates \u20B91,000 Crore annually",
  "Mumbai Airport handles 45 Million passengers yearly",
  "The city has over 1,200 km of roads",
  "Marine Drive was built between 1915 and 1940",
  "Mumbai has 7 UNESCO World Heritage Sites nearby",
  "Dabbawala network delivers 200,000 tiffins daily with 99.9% accuracy",
  "Mumbai has the highest number of billionaires in India",
];

export default function FactsTicker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Double the items for seamless scroll
    const doubled = [...FACTS, ...FACTS];
    track.innerHTML = doubled
      .map(
        (f) =>
          `<span class="km-fact-item">\u26A1 ${f}<span class="km-fact-sep"></span></span>`
      )
      .join("");
  }, []);

  return (
    <div className="km-facts-ticker">
      <div className="km-facts-track" ref={trackRef} />
    </div>
  );
}
