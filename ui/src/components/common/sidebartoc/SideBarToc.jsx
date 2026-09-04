"use client";
import { useEffect, useState } from "react";

export default function SidebarTOC({ toc }) {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = toc.map((t) => document.getElementById(t.id));

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      // ✅ Progress %
      const pct = Math.round((scrollTop / docHeight) * 100);
      setProgress(pct);

      // ✅ Active section
      let current = "";
      sections.forEach((sec) => {
        if (sec && scrollTop >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  return (
    <div className="rp-widget">
      <div className="rp-title">Your Reading Progress</div>

      {/* PROGRESS BAR */}
      <div className="rp-bar-bg">
        <div className="rp-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="rp-pct">{progress}%</div>
      <div className="rp-sub">of this article</div>

      {/* TOC */}
      <div className="rp-toc">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`rp-toc-item ${
              active === item.id ? "active" : ""
            } ${item.level === "h3" ? "sub" : ""}`}
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
}
