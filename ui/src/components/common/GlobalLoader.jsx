"use client";

import loaderService from "@/service/loader";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = loaderService.subscribe(setLoading);
    return unsubscribe;
  }, []);

  if (!loading) return null;

  return (
    <div className="m96-spinner-overlay">
      <div className="m96-spinner-wrap">
        <div className="m96-spinner" />
        <p className="m96-loading-text">
          Wait We are communicating with system...
        </p>
      </div>
    </div>
  );
}
