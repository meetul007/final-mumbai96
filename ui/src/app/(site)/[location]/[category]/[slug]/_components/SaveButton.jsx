"use client";

import { useState } from "react";

export default function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      className={`btn-icon${saved ? " saved" : ""}`}
      onClick={() => setSaved((p) => !p)}
      title={saved ? "Saved" : "Save listing"}
    >
      {saved ? "❤️" : "🤍"}
    </button>
  );
}
