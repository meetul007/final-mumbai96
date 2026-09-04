"use client";

import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".rv");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target); // 🔥 improve performance
          }
        });
      },
      { threshold: 0.08 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
