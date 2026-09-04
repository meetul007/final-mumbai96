import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata = {
  title: "Mumbai Sports Hub — Mumbai96",
  description: "Complete guide to sports in Mumbai — Wankhede Stadium, Mumbai Marathon, cricket academies, kabaddi, football, and more sports facilities.",
};

const quickLinks = [
  { href: "/mumbai-local-train", icon: "🚂", label: "Local Train" },
  { href: "/mumbai-real-estate-guide", icon: "💰", label: "Real Estate" },
  { href: "/mumbai-monsoon", icon: "🌧️", label: "Monsoon" },
  { href: "/senior-citizens-mumbai", icon: "👴", label: "Senior Citizens" },
  { href: "/mumbai-cost-of-living", icon: "💸", label: "Cost of Living" },
  { href: "/pets-mumbai", icon: "🐾", label: "Pets" },
  { href: "/mumbai-street-food", icon: "🥘", label: "Street Food" },
  { href: "/mumbai-corporator-ward", icon: "🏛️", label: "Corporator Guide" },
  { href: "/mumbai-education", icon: "🎓", label: "Education" },
  { href: "/mumbai-festivals", icon: "🎉", label: "Festivals" },
];

export default function MumbaiSportsPage() {

  return (
    <ScrollReveal>
      <PageHero
        glowVariant="sports"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Mumbai Sports" },
        ]}
        kicker="Mumbai96 · Sports · Cricket · Marathon · Kabaddi"
        title={
          <>
            Mumbai <em>Sports Hub</em>
            &nbsp;
            <span className="gold">2026</span>
          </>
        }
        stats={[
          { value: "Wankhede", label: "80,000 Capacity Stadium" },
          { value: "IPL", label: "Mumbai Indians Home Ground" },
          { value: "42.2 km", label: "Mumbai Marathon Route" },
          { value: "BPL", label: "Local Cricket Leagues Citywide" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Wankhede Stadium</div>
                <h2 className="sec-title">
                  Wankhede Stadium — <em>Cricket</em> Guide
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏏</div>
                    <div className="dc-title">Getting Tickets</div>
                    <div className="dc-body">
                      Official tickets via BookMyShow for all matches. IPL tickets
                      sell out in minutes — set booking alerts 3 weeks before the
                      season. Avoid black market — buy only official tickets. Check
                      bcci.tv for Test and ODI ticket sales.
                    </div>
                    <a
                      href="https://in.bookmyshow.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      BookMyShow ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">📍</div>
                    <div className="dc-title">Getting to Wankhede</div>
                    <div className="dc-body">
                      Located in Churchgate — 3 min walk from Churchgate station
                      (WR). Best route: train to Churchgate. No parking near stadium
                      on match days. Marine Lines station also nearby. Metro Line 3
                      has Marine Lines station.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🎭</div>
                    <div className="dc-title">Best Stands</div>
                    <div className="dc-body">
                      North Stand (away from sun afternoon) — best for serious cricket
                      watching. Garware Pavilion (Members) — exclusive. Sunil Gavaskar
                      Stand (covered) — good for evening matches. Vijay Merchant Stand
                      — budget option.
                    </div>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Mumbai Marathon</div>
                <h2 className="sec-title">
                  Tata Mumbai Marathon — <em>January</em> Guide
                </h2>
                <p className="sec-intro">
                  Asia&apos;s largest marathon. January every year — draws 50,000+
                  participants from 100+ countries. Route: Bandra-Worli Sea Link →
                  Marine Drive → Churchgate → CSMT → return. Registration opens in
                  July–August.
                </p>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏃</div>
                    <div className="dc-title">Race Categories</div>
                    <div className="dc-body">
                      Full Marathon (42.2 km), Half Marathon (21.1 km), Dream Run (6
                      km — open to all), Senior Citizens Run, Champions with
                      Disability Run. Registration via TimingSense official website.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🥇</div>
                    <div className="dc-title">Training in Mumbai</div>
                    <div className="dc-body">
                      Best training routes: Marine Drive (3.6 km loop), Worli Sea Face,
                      Carter Road (Bandra), Powai Lake circuit, Sanjay Gandhi National
                      Park (flat road section). Mumbai Running Club has free weekend
                      group runs.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏋️</div>
                    <div className="dc-title">Cricket Academies</div>
                    <div className="dc-body">
                      MIG Cricket Club (Bandra), Dadar Union, Shivaji Park
                      (Mumbai&apos;s cricket nursery), Wankhede MCA Academy (competitive),
                      Bandra Cricket Academy, various neighbourhood BPL-style leagues in
                      every suburb.
                    </div>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Other Sports</div>
                <h2 className="sec-title">
                  Mumbai Beyond <em>Cricket</em>
                </h2>
                <div className="info-box">
                  <h4>🏅 Sports Facilities & Clubs in Mumbai</h4>
                  <ul>
                    <li>
                      <strong>Kabaddi:</strong> Mumbai is a kabaddi powerhouse — Pro
                      Kabaddi League games at NSCI Dome, Worli. Neighbourhood kabaddi
                      courts in almost every area
                    </li>
                    <li>
                      <strong>Swimming Pools:</strong> BMC runs public pools in Shivaji
                      Park, Borivali, Mulund — ₹100–₹200/month. Several private pools in
                      residential societies
                    </li>
                    <li>
                      <strong>Football:</strong> Mumbai FC, Mumbai City FC (ISL) —
                      matches at Cooperage (Fort) and DY Patil Stadium (Navi Mumbai)
                    </li>
                    <li>
                      <strong>Cycling:</strong> Cycling track at Bandra-Kurla Complex,
                      Carter Road, Powai, Eastern Freeway (Sunday morning cycling)
                    </li>
                    <li>
                      <strong>Chess:</strong> Mumbai has produced multiple international
                      chess champions — BCCI Chess centre, various club-level tournaments
                    </li>
                    <li>
                      <strong>Gymnastics & Martial Arts:</strong> Sports Authority of
                      India (SAI) centre at Marine Lines offers training programmes
                    </li>
                  </ul>
                </div>
              </div>

              <div className="prose rv">
                <h2>Mumbai Sports Hub — Complete Guide 2026</h2>
                <p>
                  Mumbai is India&apos;s sports capital in the most complete sense — it
                  produces more international cricketers than any other city, hosts the
                  country&apos;s largest marathon, has a thriving kabaddi scene and was the
                  birthplace of Indian wrestling culture. At the community level, cricket
                  grounds, kabaddi courts and football pitches exist in almost every
                  neighbourhood.
                </p>
                <h3>Mumbai Cricket League — Playing Local Cricket</h3>
                <p>
                  Mumbai&apos;s cricket ecosystem extends far beyond the professional
                  game. The Mumbai Cricket Association (MCA) runs hundreds of club-level
                  tournaments annually. At the community level, neighbourhood leagues
                  exist in every suburb — from Borivali Premiere League (BPL) style
                  tournaments in the north to Dadar&apos;s historic Shivaji Park cricket
                  culture in Central Mumbai. Any society or group of friends can form a
                  team and enter a local league through the MCA or independently organised
                  community tournaments.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🏏 Cricket <em>Links</em>
                </div>
                <div className="sbw-body">
                  <a
                    href="https://in.bookmyshow.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-link-row"
                  >
                    <span className="sb-link-label">🎟️ Buy Match Tickets</span>
                    <span className="sb-link-cta">BMS ↗</span>
                  </a>
                  <a
                    href="https://www.bcci.tv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-link-row"
                  >
                    <span className="sb-link-label">🏏 BCCI Official</span>
                    <span className="sb-link-cta">Visit ↗</span>
                  </a>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {quickLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="quick-link">
                      <div className="ql-icon">{link.icon}</div>
                      <div className="ql-text">{link.label}</div>
                      <div className="ql-arrow">→</div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
