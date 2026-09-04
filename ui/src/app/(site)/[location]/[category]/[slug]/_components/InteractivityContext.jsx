"use client";

import { createContext, useContext, useState, useCallback } from "react";

const InteractivityCtx = createContext(null);

export function InteractivityProvider({ children }) {
  // ── Lightbox ──
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [lbImages, setLbImages] = useState([]);
  const [lbName, setLbName] = useState("");

  const openLightbox = useCallback((images, index = 0, name = "") => {
    setLbImages(images || []);
    setLbIndex(index || 0);
    setLbName(name || "");
    setLbOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLbOpen(false), []);

  // ── Review Modal ──
  const [revOpen, setRevOpen] = useState(false);
  const openReviewModal = useCallback(() => setRevOpen(true), []);
  const closeReviewModal = useCallback(() => setRevOpen(false), []);

  return (
    <InteractivityCtx.Provider
      value={{
        // lightbox
        lbOpen,
        lbIndex,
        lbImages,
        lbName,
        openLightbox,
        closeLightbox,
        // review
        revOpen,
        openReviewModal,
        closeReviewModal,
      }}
    >
      {children}
    </InteractivityCtx.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(InteractivityCtx);
  if (!ctx) throw new Error("useLightbox must be inside InteractivityProvider");
  return {
    isOpen: ctx.lbOpen,
    currentIndex: ctx.lbIndex,
    images: ctx.lbImages,
    businessName: ctx.lbName,
    openLightbox: ctx.openLightbox,
    closeLightbox: ctx.closeLightbox,
  };
}

export function useReviewModal() {
  const ctx = useContext(InteractivityCtx);
  if (!ctx) throw new Error("useReviewModal must be inside InteractivityProvider");
  return {
    isOpen: ctx.revOpen,
    openReviewModal: ctx.openReviewModal,
    closeReviewModal: ctx.closeReviewModal,
  };
}
