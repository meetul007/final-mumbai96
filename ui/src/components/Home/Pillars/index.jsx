"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Pillars() {
  const router = useRouter();

  const go = (url) => router.push(url);

  useEffect(() => {
    const elements = document.querySelectorAll(".rv");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.08 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // cleanup
  }, []);

  const cards = [
    {
      title: "FOOD",
      icon: "🍛",
      desc: "Vada pav to fine dining. Street food to Michelin-tier. Every bite Mumbai has to offer.",
      color: "#F5A623",
      url: "/know-mumbai",
    },
    {
      title: "PLACES",
      icon: "📍",
      desc: "Heritage spots, hidden gems, beaches, bazaars and landmarks you never knew existed.",
      color: "#0D9488",
      url: "/must-visit-places",
    },
    {
      title: "TRAVEL",
      icon: "🚂",
      desc: "Local trains, auto routes, cab hacks and the secret ways to beat Mumbai's traffic.",
      color: "#6366F1",
      url: "/mumbai-travel",
    },
    {
      title: "BUSINESS",
      icon: "🏢",
      desc: "Most of the business covered — from kirana stores to corporates. And extra help as requested.",
      color: "#F59E0B",
      url: "/auth/login",
    },
    {
      title: "TOURISTS",
      icon: "🗺️",
      desc: "First time in Mumbai? We are your insider guide to experiencing this city right.",
      color: "#EC4899",
      url: "/foreign-tourists",
    },
    {
      title: "HELP",
      icon: "🆘",
      desc: "Fraud alerts, women & child safety, helplines and emergency resources for Mumbaikars & Travellers.",
      color: "#10B981",
      url: "/report-fraud-scam",
    },
    {
      title: "NIGHTLIFE",
      icon: "🌃",
      desc: "Mumbai never sleeps. Clubs, bars, late-night eats and everything after dark.",
      color: "#8B5CF6",
      url: "/mumbai-night-life",
    },
  ];

  return (
    <section className="pillars">
      <div className="con">
        <div className="rv">
          <div className="section-kicker gold">What We Cover</div>

          <h2 className="sec-title light gold-em">
            EVERYTHING
            <br />
            <em>MUMBAI NEEDS.</em>
          </h2>

          <p className="sec-desc light">
            From your local vada pav wala to high-rise property deals. From
            fraud alerts to Bollywood meetups. This is Mumbai — in full.
          </p>
        </div>

        <div className="pillars-grid rv delay-1">
          {/* FEATURED */}
          <div
            className="pc feat"
            style={{ "--pc-clr": "#ff6b00" }}
            role="button"
            tabIndex={0}
            onClick={() => go("/meetups")}
            onKeyDown={(e) => e.key === "Enter" && go("/meetups")}
            title="Community"
          >
            <div className="pc-top">
              <span className="pc-icon">🧑‍🤝‍🧑</span>

              <div className="pc-name">
                PEOPLE &<br />
                COMMUNITY
              </div>

              <div className="pc-desc">
                Mumbaikars are the soul of this city. Meet local legends,
                community heroes, neighbours and the faces behind every lane.
              </div>

              <div className="pc-tags">
                <span className="pc-tag">Meetups</span>
                <span className="pc-tag">Local Legends</span>
                <span className="pc-tag">Celebrities</span>
                <span className="pc-tag">Neighbourhoods</span>
                <span className="pc-tag">Stories</span>
              </div>
            </div>

            <div className="pc-bot">
              <span className="pc-caret">→</span>
            </div>
          </div>

          {/* OTHER CARDS */}
          {cards.map((c, i) => (
            <div
              key={i}
              className="pc"
              style={{ "--pc-clr": c.color }}
              role="button"
              tabIndex={0}
              onClick={() => go(c.url)}
              onKeyDown={(e) => e.key === "Enter" && go(c.url)}
              title={c.title}
            >
              <div className="pc-top">
                <span className="pc-icon">{c.icon}</span>

                <div className="pc-name">{c.title}</div>

                <div className="pc-desc">{c.desc}</div>
              </div>

              <div className="pc-bot">
                <span className="pc-caret">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
