"use client";

import { useState } from "react";

export default function FaqSection({ items = [], location }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items || items.length === 0) return null;

  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="guide-sec" id="faq">
      <div className="con">
        <p className="sl">❓ FAQ</p>
        <h2 className="st">
          Frequently Asked Questions about <em>{formattedLocation}</em>
        </h2>

        <div className="faq-list">
          {items.map((item, i) => (
            <div
              className={`faq-item ${openIndex === i ? "faq-open" : ""}`}
              key={i}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{item.question}</span>
                <svg
                  className="faq-chevron"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 7l5 5 5-5" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-list {
          margin-top: 2rem;
          max-width: 768px;
        }
        .faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          margin-bottom: 0.75rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .faq-item:hover {
          border-color: #d1d5db;
        }
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: #fff;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #111827;
          cursor: pointer;
          text-align: left;
        }
        .faq-chevron {
          transition: transform 0.2s;
          flex-shrink: 0;
          margin-left: 1rem;
        }
        .faq-open .faq-chevron {
          transform: rotate(180deg);
        }
        .faq-answer {
          padding: 0 1.25rem 1rem 1.25rem;
          font-size: 0.925rem;
          color: #4b5563;
          line-height: 1.6;
        }
        .faq-answer p {
          margin: 0;
        }
      `}</style>
    </section>
  );
}
