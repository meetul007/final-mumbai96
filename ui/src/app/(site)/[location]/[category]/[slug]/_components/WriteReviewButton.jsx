"use client";

import { useReviewModal } from "./InteractivityContext";

export default function WriteReviewButton({ className, children }) {
  const { openReviewModal } = useReviewModal();
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openReviewModal();
      }}
    >
      {children}
    </a>
  );
}
