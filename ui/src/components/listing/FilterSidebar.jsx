"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function FilterSidebar({ filters = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeRating = searchParams.get("rating_min") || "";
  const activeTagStr = searchParams.get("tag") || "";
  const activeTags = useMemo(
    () => (activeTagStr ? activeTagStr.split(",").map((t) => t.trim()) : []),
    [activeTagStr],
  );

  const buildHref = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, val] of Object.entries(updates)) {
        if (val === null || val === "") {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      }
      // Reset to page 1 when filters change
      params.delete("page");
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname, searchParams],
  );

  const toggleRating = (val) => {
    const nextVal = activeRating === val ? "" : val;
    router.push(buildHref({ rating_min: nextVal }));
  };

  const toggleTag = (tag) => {
    const set = new Set(activeTags);
    if (set.has(tag)) {
      set.delete(tag);
    } else {
      set.add(tag);
    }
    const nextVal = [...set].join(",");
    router.push(buildHref({ tag: nextVal || null }));
  };

  const clearAll = () => {
    router.push(pathname);
  };

  return (
    <aside className="sidebar">
      <div className="sb-head">
        <h3>Filters</h3>
        <span className="sb-clear" onClick={clearAll} style={{ cursor: "pointer" }}>
          Clear All
        </span>
      </div>

      {/* Rating */}
      {filters.rating && filters.rating.length > 0 && (
        <div className="sb-sec">
          <div className="sb-title">Rating</div>
          <div className="sb-stars">
            {filters.rating.map((r, i) => (
              <label key={i} className="sb-star-row">
                <input
                  type="checkbox"
                  checked={activeRating === String(r.label.replace("+", ""))}
                  onChange={() => toggleRating(r.label.replace("+", ""))}
                />
                <span className="sb-star-dots">{r.stars}</span>
                <span className="sb-star-n">{r.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Sections (Status, Speciality, Payment, Experience) */}
      {filters.sections?.map((section, i) => (
        <div className="sb-sec" key={i}>
          <div className="sb-title">{section.title}</div>
          {section.options.map((opt, j) => (
            <label className="sb-option" key={j}>
              <span className="sb-label">
                <input type="checkbox" /> {opt.label}
              </span>
              <span className="sb-count">{opt.count}</span>
            </label>
          ))}
        </div>
      ))}

      {/* Tags (Services) — clickable pills */}
      {filters.tags && filters.tags.length > 0 && (
        <div className="sb-sec">
          <div className="sb-title">Services</div>
          <div className="sb-tags">
            {filters.tags.map((tag, i) => (
              <span
                key={i}
                className={`sb-tag ${activeTags.includes(tag) ? "on" : ""}`}
                onClick={() => toggleTag(tag)}
                style={{ cursor: "pointer" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
