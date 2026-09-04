"use client";
import { useEffect, useRef } from "react";

export default function Ticker() {
  const trackRef = useRef(null);

  const HOODS = [
    "Borivali",
    "Powai",
    "Tardeo",
    "Malabar Hill",
    "Andheri",
    "Colaba",
    "Dadar",
    "Malad",
    "Virar",
    "Bandra",
    "Goregaon",
    "Kandivali",
    "Juhu",
    "Chembur",
    "Ghatkopar",
    "Vasai",
    "Kurla",
    "Sion",
    "Worli",
    "Prabhadevi",
    "Marine Lines",
    "Churchgate",
    "Fort",
    "Mulund",
    "Vikhroli",
    "Mahim",
    "Matunga",
    "Khar",
    "Santacruz",
    "Vile Parle",
    "Versova",
  ];

  useEffect(() => {
    if (!trackRef.current) return;

    const doubled = [...HOODS, ...HOODS];

    trackRef.current.innerHTML = doubled
      .map(
        (h) =>
          `<span class="ticker-item">${h}<span class="ticker-sep"></span></span>`,
      )
      .join("");
  }, []);

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track" ref={trackRef}></div>
    </div>
  );
}
