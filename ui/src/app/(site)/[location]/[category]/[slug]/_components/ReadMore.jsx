"use client";

import { useState } from "react";

export default function ReadMore({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && children}
      <span
        className="read-more-btn"
        onClick={() => setOpen((p) => !p)}
        style={{ cursor: "pointer" }}
      >
        {open ? "Show Less ▴" : "Read More ▾"}
      </span>
    </>
  );
}
