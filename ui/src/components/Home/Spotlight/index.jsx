"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const spotlightItems = [
  {
    num: "01",
    kicker: "Hot in Mumbai",
    title: "PROPERTY DEALS",
    desc: "Verified deals on flats, offices and commercial spaces across all Mumbai zones. Just real listings & Real Deals.",
    href: "/property-deals",
    linkText: "Explore Deals →",
  },
  {
    num: "02",
    kicker: "Grow Your Business",
    title: "FRANCHISE DEALS",
    desc: "Ready-to-launch franchise opportunities across every Mumbai neighbourhood. Your entrepreneurial journey starts here.",
    href: "/franchise-deals",
    linkText: "View Franchises →",
  },
  {
    num: "03",
    kicker: "Mumbai Faces",
    title: "CELEBRITIES",
    desc: "Mumbai is home to India's biggest stars. Explore where they live, eat, and what they stand for in this city.",
    href: "/celebrities",
    linkText: "Meet Mumbai Stars →",
  },
  {
    num: "04",
    kicker: "This Weekend",
    title: "MEETUPS & EVENTS",
    desc: "Local meetups, community events and real-life connections. Because Mumbai's best moments happen IRL.",
    href: "/meetups",
    linkText: "Find Meetups →",
  },
];

export default function Spotlight() {
  const router = useRouter();

  return (
    <section className="spotlight">
      <div className="con">
        {/* Header */}
        <div className="rv">
          <div className="section-kicker white">Spotlight</div>

          <h2 className="sec-title light gold-em">
            HOT &
            <br />
            <em>TRENDING.</em>
          </h2>

          <p className="sec-desc light">
            The most exciting corners of Mumbai96 — handpicked for Mumbaikars.
          </p>
        </div>

        {/* Grid */}
        <div className="spot-grid rv delay-1">
          {spotlightItems.map((item, i) => (
            <div
              key={i}
              className="sg"
              data-num={item.num}
              onClick={() => router.push(item.href)} // 🔥 replaces onclick
              style={{ cursor: "pointer" }}
            >
              <span className="sg-kicker">{item.kicker}</span>

              <div className="sg-title">{item.title}</div>

              <div className="sg-desc">{item.desc}</div>

              {/* Prevent double navigation */}
              <Link
                href={item.href}
                className="sg-link"
                onClick={(e) => e.stopPropagation()}
              >
                {item.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
