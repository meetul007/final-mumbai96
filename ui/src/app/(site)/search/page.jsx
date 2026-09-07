"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setResult(null);
      return;
    }

    let cancelled = false;

    fetch(`${API_BASE}/api/public/search?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Search failed");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setResult(data);
          setError("");
        }
      })
      .catch((searchError) => {
        if (!cancelled) setError(searchError.message);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <main className="search-results-page">
      <div className="con">
        <h1 className="search-results-title">Search Mumbai96</h1>

        {!query && <p className="search-status">Enter a search term to continue.</p>}
        {query && !result && !error && <p className="search-status">Searching...</p>}
        {error && <p className="search-status search-error">{error}</p>}

        {result && (
          <section className="search-result-summary">
            <p className="search-status">
              Results for <strong>&quot;{query}&quot;</strong>
            </p>
            {result.seo?.description && <p>{result.seo.description}</p>}
            {result.redirect && (
              <Link className="search-result-card" href={result.redirect}>
                Open {result.seo?.title || "matching results"}
              </Link>
            )}
          </section>
        )}
      </div>
    </main>
  );
}