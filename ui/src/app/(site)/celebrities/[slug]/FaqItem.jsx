"use client";

export function FaqItem({ question, answer }) {
  return (
    <div className="celeb-faq-item">
      <button className="celeb-faq-q" onClick={(e) => {
        e.currentTarget.closest(".celeb-faq-item").classList.toggle("open");
      }}>
        <span>{question}</span>
        <span className="celeb-faq-arrow">▼</span>
      </button>
      <div className="celeb-faq-a">
        <p>{answer}</p>
      </div>
    </div>
  );
}
