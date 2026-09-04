'use client';

import { useState, useEffect } from 'react';
import Mumbai96Loader from './Mumbai96Loader';

const STORAGE_KEY = 'mumbai96_seen_loader';

export default function SplashGate() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        setShowLoader(true);
        document.body.classList.add('splash-active');
      }
    } catch {
      // localStorage unavailable (SSR, private browsing edge case) — skip loader
    }
  }, []);

  const handleComplete = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    document.body.classList.remove('splash-active');
    setShowLoader(false);
  };

  if (!showLoader) return null;

  return <Mumbai96Loader onComplete={handleComplete} />;
}
