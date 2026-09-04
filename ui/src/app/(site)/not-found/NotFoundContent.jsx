"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NotFoundContent() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/know-mumbai?q=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="wrap404">
      <div className="num404">404</div>
      <div className="badge404">⚠ Page Not Found</div>
      <h1 className="title404">LOST IN <em>MUMBAI?</em></h1>
      <p className="sub404">
        Even Mumbai's local trains sometimes go off-route. The page you're
        looking for doesn't exist, was moved, or took a wrong turn at Dadar Junction.
      </p>

      <div className="search404">
        <input
          type="text"
          placeholder="Search Mumbai96 — neighbourhoods, food, businesses…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="actions404">
        <Link href="/" className="btn-home">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Home
        </Link>

        <button className="btn-back" onClick={handleBack}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Go Back
        </button>

        <Link href="/contact-us" className="btn-back">
          Report Broken Link
        </Link>
      </div>

      <div className="quick-links">
        <Link href="/know-mumbai" className="ql">
          <span className="ql-icon">🗺️</span>
          <span className="ql-text">Know Mumbai</span>
        </Link>
        <Link href="/andheri-east" className="ql">
          <span className="ql-icon">📍</span>
          <span className="ql-text">Neighbourhoods</span>
        </Link>
        <Link href="/report-fraud-scam" className="ql">
          <span className="ql-icon">🚨</span>
          <span className="ql-text">Report Fraud</span>
        </Link>
        <Link href="/auth/login" className="ql">
          <span className="ql-icon">🏢</span>
          <span className="ql-text">Add Listing</span>
        </Link>
      </div>
    </div>
  );
}
