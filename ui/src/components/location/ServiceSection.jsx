
// ServiceSection.js
"use client";
import styles from './locationPage.module.css';
import { useState } from 'react';

export default function ServiceSection({
  location,
  category,
  emoji,
  description,
  image,
  benefits = [],
  faq,
  reverse = false,
  slug = null,
}) {
    const [isOpen, setIsOpen] = useState(false);

  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()) || "Bhayandar East";

  // Default benefits if not provided
  const defaultBenefits = [
    "Verified listings with real Mumbaikar reviews",
    "Direct phone numbers - call instantly",
    "Updated availability and contact details",
    "Compare multiple options before you decide"
  ];

  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

  // Default description if not provided
  const displayDescription = description || `Find the best ${category} in ${formattedLocation}. Trusted by locals, verified by Mumbai96.`;

  return (
    <section className={styles.cs}>
      <div className={styles.con}>
        <div className={`${styles.cg} ${reverse ? styles.r : ""}`}>
          {/* IMAGE */}
          <div className={styles.ci}>
            {image ? (
              <img
                src={image}
                alt={`${category} in ${formattedLocation}`}
                loading="lazy"
              />
            ) : (
              <div className={styles.ciPlaceholder}>
                <span className={styles.ciPlaceholderEmoji}>{emoji || "📌"}</span>
              </div>
            )}
            <span className={styles.it}>
              {emoji ? (
                <>
                  <span className={styles.ciEmoji}>{emoji}</span> {category}
                </>
              ) : (
                category
              )}
            </span>
          </div>

          {/* CONTENT */}
          <div className={styles.cb}>
            <div className={styles.ch}>
              <div className={styles.chl}>
                <p className={styles.sl}>Local Services · {formattedLocation}</p>
                <h3>
                  {category} in {formattedLocation}
                </h3>
              </div>

              <a href={`/${location}/${slug || category?.toLowerCase().replace(/\s+/g, '-')}`} className={styles.cl}>
                View All →
              </a>
            </div>

            <p>{displayDescription}</p>

            {/* BENEFITS */}
            <div className={styles.tb}>
              <h4>
                ⭐ Why use Mumbai96 to find {category?.toLowerCase() || "services"} in{" "}
                {formattedLocation}?
              </h4>
              <ul>
                {displayBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
 {faq && (
              <div className={styles.faq}>
                <div className={styles.fqi}>
                  <div 
                    className={styles.fqq} 
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {faq.question}
                    {/* <span className={styles.faqIcon}>{isOpen ? "−" : "+"}</span> */}
                  </div>
                  <div className={`${styles.fqa} ${isOpen ? styles.open : ""}`}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}