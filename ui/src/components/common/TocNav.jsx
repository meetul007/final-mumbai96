"use client";
import { useState } from "react";

export default function TocNav({ items }) {
  const [active, setActive] = useState(items[0]?.[0] || items[0]?.id || "");
  return (
    <div className="toc-card">
      <div className="toc-label">Table of Contents</div>
      {items.map((item) => {
        const id = Array.isArray(item) ? item[0] : item.id;
        const label = Array.isArray(item) ? item[1] : item.label;
        return (
          <a
            key={id}
            href={`#${id}`}
            className={`toc-link ${active === id ? "on" : ""}`}
            onClick={() => setActive(id)}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
