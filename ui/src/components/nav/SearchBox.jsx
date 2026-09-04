"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { performSearch } from "@/lib/search";

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

function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const toggle = () => {
    setOpen((prev) => {
      if (!prev) setTimeout(() => inputRef.current?.focus(), 100);
      return !prev;
    });
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      performSearch(query, router);
      setOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div ref={wrapRef} className="m96-search-wrap desktop">
      <button className="m96-search-btn" onClick={toggle}>
        <SearchIcon />
      </button>
      {open && (
        <div className="m96-search-popover">
          <input
            ref={inputRef}
            className="m96-search-input"
            type="text"
            placeholder="Search Mumbai96…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="m96-search-submit" onClick={handleSearch}>
            Search
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
