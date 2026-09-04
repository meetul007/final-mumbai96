"use client";

import { useState } from "react";
import { useReviewModal } from "./InteractivityContext";

export default function ReviewModal({ businessName }) {
  const { isOpen, closeReviewModal } = useReviewModal();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    alert("Thank you! Your review will appear after verification.");
    closeReviewModal();
    setRating(0);
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) closeReviewModal();
  };

  return (
    <div className="modal-overlay open" onClick={handleOverlay}>
      <div className="modal-box">
        <h3>WRITE A REVIEW</h3>
        <p>Share your experience with {businessName}</p>

        <div className="star-pick">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={`sp${s <= (hover || rating) ? " lit" : ""}`}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
            >
              ⭐
            </span>
          ))}
        </div>

        <input
          className="cfi"
          type="text"
          placeholder="Your name"
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <textarea
          className="cfi ta"
          placeholder="Tell others about your experience…"
          style={{
            width: "100%",
            minHeight: "100px",
            marginBottom: "14px",
            resize: "none",
          }}
        />
        <button className="send-btn" onClick={handleSubmit}>
          Submit Review
        </button>
        <button className="modal-close" onClick={closeReviewModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
