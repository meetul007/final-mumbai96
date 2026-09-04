"use client";
import { useState } from "react";

const faqs = [
  { q: "What are the best nightlife areas in Mumbai?", a: "Bandra West (indie pubs, artsy bars), Lower Parel (premium clubs, hotel rooftops), Andheri West (casual bars, budget-friendly), Juhu (beach-side, celeb-spotting), Colaba (heritage pubs, jazz bars) and BKC (corporate crowd, cocktail bars). Each area has a distinct vibe — pick based on your crowd and budget." },
  { q: "What time do clubs and bars close in Mumbai?", a: "Most Mumbai venues serve alcohol until 1:30 AM on weekdays and 3 AM on weekends. Some premium clubs with special licences extend to 5 AM. Kitchen timings vary — always call ahead to confirm." },
  { q: "Is Mumbai nightlife safe for solo women and tourists?", a: "Mumbai is generally considered one of India's safest cities for nightlife. Stick to well-known venues, use Ola/Uber for transport, and stay in groups after midnight. Reputed venues in Bandra, Lower Parel and Colaba have good security and staff trained in crowd management." },
  { q: "What is the legal drinking age in Mumbai?", a: "The legal drinking age in Maharashtra (and thus Mumbai) is 21 years. Most venues will ask for photo ID at the entrance. Carry your Aadhaar, Passport or Driving Licence." },
  { q: "How much does a night out in Mumbai cost?", a: "It varies widely. A casual pub night in Andheri costs ₹1000–2000 per person. A night at a premium Lower Parel club with entry, drinks and late-night food can cost ₹4000–8000. Rooftop cocktail bars average ₹1500–3000 per person for drinks." },
];

export default function NightlifeFaq() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <section className="faq-sec">
      <div className="con">
        <p className="sl">Frequently Asked Questions</p>
        <h2 className="st">Mumbai Nightlife — <em>Common Questions</em></h2>
        <div className="fq-list">
          {faqs.map((item, i) => (
            <div key={i} className={`fqi${openFaq === i ? " is-open" : ""}`}>
              <button type="button" className="fqq" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                {item.q}
              </button>
              <div className="fqa">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
