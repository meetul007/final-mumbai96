"use client";

import { useEffect, useState } from "react";

export default function StickyTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.id || "");

  // Smooth-scroll to a section on tab click
  const handleClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Scrollspy — highlight the section currently in view
  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <div className="sticky-tabs">
      <div className="sticky-tabs-inner">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`stab${active === t.id ? " on" : ""}`}
            onClick={(e) => handleClick(e, t.id)}
          >
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}
