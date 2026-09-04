import Link from "next/link";
import "./style.css";

export const metadata = {
  title: "Mumbai Exhibitions 2026 — B2B Trade Shows, Expos, Events",
  description:
    "Complete guide to Mumbai exhibitions at NESCO Goregaon, Jio World Centre BKC, and venues. B2B trade shows (jewellery, engineering, pharma), kids expos, food festivals, and consumer events.",
  keywords:
    "Mumbai exhibitions, NESCO Goregaon, trade shows, B2B expos, BKC conventions, kids expos, food festivals, IIJS, ACETECH, events calendar",
  canonical: "https://mumbai96.com/mumbai-exhibitions",
  openGraph: {
    title: "Mumbai Exhibitions 2026",
    description:
      "B2B trade shows, kids expos, food festivals and consumer events at Mumbai venues.",
    url: "https://mumbai96.com/mumbai-exhibitions",
    type: "website",
  },
};

const VENUES = [
  {
    icon: "🏢",
    title: "NESCO — Goregaon",
    desc: "Nesco Exhibiton Centre, Western Express Highway, Goregaon (E). Mumbai's largest convention and exhibition complex — Bombay Exhibition Centre (BEC) + Centre 1. 1.2 lakh sq mt covered.",
    meta: ["📍 Goregaon East", "🚇 Goregaon Stn", "🅿️ 3,000 cars"],
  },
  {
    icon: "🌊",
    title: "Jio World Convention Centre",
    desc: "BKC, Bandra East. Mumbai's newest world-class convention centre — 175,000 sq ft, 11 convention halls. Hosts top-tier B2B summits, luxury expos and global conferences.",
    meta: ["📍 BKC, Bandra", "🚇 BKC Metro", "🅿️ Multi-level"],
  },
  {
    icon: "🏛️",
    title: "Bombay Exhibition Centre (BEC)",
    desc: "Part of NESCO complex, Goregaon. India's original modern exhibition centre — hosts India International Jewellery Show, Auto Expo events, engineering trade fairs.",
    meta: ["📍 Goregaon East", "☎️ 022-6678-0000"],
  },
  {
    icon: "🏟️",
    title: "Nehru Centre, Worli",
    desc: "Discovery of India cultural centre with exhibition gallery. Hosts art shows, government exhibitions, social sector events and community expos. Smaller format, central location.",
    meta: ["📍 Worli, Mumbai", "🚇 Lower Parel nearby"],
  },
  {
    icon: "🎡",
    title: "MMRDA Grounds & BKC Open Area",
    desc: "Bandra-Kurla Complex open grounds and MMRDA lawns host major consumer events — Kala Ghoda Arts Festival, Mumbai International Film Festival ticketed screenings, large food festivals and outdoor consumer expos. Centrally located with Metro connectivity.",
    meta: ["📍 BKC, Bandra East", "🚇 BKC Metro", "Outdoor + Tent setups"],
    fullWidth: true,
  },
];

const B2B_EVENTS = [
  {
    icon: "💎",
    badge: "Jewellery",
    badgeColor: "badge-gold",
    title: "IIJS — India International Jewellery Show",
    desc: "Asia's largest B2B jewellery exhibition. Lakhs of buyers from 100+ countries. NESCO Goregaon. Annual — August.",
    meta: ["📍 NESCO, Goregaon", "📅 August 2026"],
    cta: "Register ↗",
    link: "https://gjepc.org",
  },
  {
    icon: "🏭",
    badge: "Engineering",
    badgeColor: "badge-dark",
    title: "ENGIMACH — Engineering Machinery",
    desc: "International engineering machinery & tools expo. Manufacturers, importers, SMEs. NESCO Goregaon. Biennial — Dec 2026.",
    meta: ["📍 NESCO, Goregaon", "📅 Dec 2026"],
    cta: "Info ↗",
    link: "https://engimach.com",
  },
  {
    icon: "🏗️",
    badge: "Real Estate",
    badgeColor: "badge-dark",
    title: "CREDAI NATCON & Property Expos",
    desc: "India's largest real estate developer convention. Jio World Centre BKC. Top developers, investors, NRI buyers. Annual.",
    meta: ["📍 JWC, BKC", "📅 Various 2026"],
    cta: "Info ↗",
    link: "https://credai.org",
  },
  {
    icon: "🧴",
    badge: "Pharma",
    badgeColor: "badge-dark",
    title: "PHARMEXCIL & CPhI India",
    desc: "India pharma & chemical industry B2B expo. API, formulations, packaging, biotech companies. NESCO & JWC annually.",
    meta: ["📍 NESCO / JWC", "📅 Nov–Dec 2026"],
    cta: "Info ↗",
    link: "https://cphi-india.com",
  },
  {
    icon: "🖨️",
    badge: "Print & Pack",
    badgeColor: "badge-dark",
    title: "DRUPA India / PackTech India",
    desc: "Printing, packaging and allied machinery trade show. Publishers, brand owners, packaging companies. NESCO Goregaon.",
    meta: ["📍 NESCO, Goregaon", "📅 2026 TBA"],
    cta: "Info ↗",
    link: "https://printpackindia.com",
  },
  {
    icon: "🛋️",
    badge: "Interior",
    badgeColor: "badge-dark",
    title: "ACETECH Mumbai — Architecture & Interior",
    desc: "India's top architecture, construction & interior design expo. Architects, contractors, designers, developers. NESCO annually.",
    meta: ["📍 NESCO, Goregaon", "📅 Nov 2026"],
    cta: "Register ↗",
    link: "https://acetechindia.com",
  },
];

const KIDS_EVENTS = [
  {
    icon: "🧸",
    badge: "Kids",
    badgeColor: "badge-red",
    title: "Kids Stop — Children's Activity Expo",
    desc: "India's largest dedicated kids expo — activities, toys, education, nutrition, parenting workshops. Jio World Centre BKC. Annual.",
    meta: ["📍 JWC, BKC", "📅 April–May 2026"],
    cta: "Book Tickets ↗",
    link: "https://kidsstop.in",
  },
  {
    icon: "🎨",
    badge: "Art",
    badgeColor: "badge-red",
    title: "Kala Ghoda Arts Festival",
    desc: "South Mumbai's iconic 9-day street arts festival — visual art, performances, food, kids' craft workshops. Fort/Kala Ghoda precinct. February annual.",
    meta: ["📍 Fort, South Mumbai", "📅 Feb 2027"],
    cta: "Info ↗",
    link: "https://kalaghodaassociation.com",
  },
  {
    icon: "🎡",
    badge: "Family",
    badgeColor: "badge-red",
    title: "The Great India Place Expos",
    desc: "Family-friendly weekend expos at malls (Phoenix, Palladium, Infiniti) — toy fairs, science expos, hobby shows, seasonal events across Mumbai suburbs.",
    meta: ["📍 Various Malls", "📅 Year-round"],
  },
];

const FOOD_EVENTS = [
  {
    icon: "🍽️",
    badge: "Food B2B",
    badgeColor: "badge-gold",
    title: "AAHAR / FSSAI Food Expo",
    desc: "India's international food & hospitality trade show — processed foods, restaurant equipment, F&B brands, packaging. NESCO Goregaon chapter.",
    meta: ["📍 NESCO, Goregaon", "📅 Annual"],
    cta: "Info ↗",
    link: "https://aahaar.in",
  },
  {
    icon: "🥂",
    badge: "Food B2C",
    badgeColor: "badge-gold",
    title: "Mumbai Food Truck Festival",
    desc: "Popular B2C food festival — 50+ food trucks, live music, craft beer, dessert stalls. BKC & Bandra seafront. Multiple editions per year.",
    meta: ["📍 BKC / Bandra", "📅 Multiple 2026"],
  },
  {
    icon: "🧁",
    badge: "Baking",
    badgeColor: "badge-gold",
    title: "The Baker's Expo Mumbai",
    desc: "Dedicated B2B & B2C baking industry expo — ingredients, equipment, cake decorating, artisan bakers. Goregaon. Growing annually.",
    meta: ["📍 NESCO, Goregaon", "📅 2026 TBA"],
  },
];

const CONSUMER_EVENTS = [
  {
    icon: "🛒",
    badge: "Shopping",
    badgeColor: "badge-red",
    title: "Mumbai Shopping Festival",
    desc: "City-wide consumer event with retail offers, street stalls, brand showcases across Mumbai — Linking Road, Colaba, Hill Road, Mulund. Government supported.",
    meta: ["📍 City-wide", "📅 Dec–Jan"],
  },
  {
    icon: "💄",
    badge: "Beauty",
    badgeColor: "badge-red",
    title: "BEAUTY INDIA / Cosmoprof India",
    desc: "India's top beauty, wellness and cosmetics consumer + trade expo. Brands, salons, wellness experts. JWC BKC. Annual.",
    meta: ["📍 JWC, BKC", "📅 Annual 2026"],
    cta: "Info ↗",
    link: "https://cosmoprofindia.com",
  },
  {
    icon: "🐾",
    badge: "Pets",
    badgeColor: "badge-red",
    title: "India Pet Expo Mumbai",
    desc: "Pet owners, breeders, veterinary products, pet food, accessories. Growing show in Mumbai suburbs. Family-friendly, entry free/nominal.",
    meta: ["📍 Suburbs", "📅 Multiple 2026"],
  },
];

const QUICK_LINKS = [
  { icon: "🏘️", text: "Co-op Society Bye Laws", slug: "/coop-society-mumbai" },
  { icon: "🛗", text: "Lift Licence & Renewal", slug: "/lift-licence-mumbai" },
  { icon: "🏦", text: "Property Tax Payment", slug: "/property-tax-mumbai" },
  { icon: "🏗️", text: "MHADA Lottery 2026", slug: "/mhada-lottery-mumbai" },
  { icon: "🎪", text: "Mumbai Exhibitions 2026", slug: "/mumbai-exhibitions" },
  {
    icon: "⚡",
    text: "Save Electricity Mumbai",
    slug: "/save-electricity-mumbai",
  },
  { icon: "🏢", text: "Society IMP Guide", slug: "/coop-society-imp-mumbai" },
  { icon: "🔍", text: "Mumbai Lost & Found", slug: "/mumbai-lost-found" },
  { icon: "🤝", text: "Verified NGOs Mumbai", slug: "/ngos-mumbai" },
  { icon: "👩", text: "Women Empowerment", slug: "/women-empowerment-mumbai" },
];

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="ec-top">
        <div className="dc-icon">{event.icon}</div>
        <span className={`badge ${event.badgeColor}`}>{event.badge}</span>
      </div>
      <div className="ec-title">{event.title}</div>
      <div className="ec-body">{event.desc}</div>
      <div className="ec-meta">
        {event.meta.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
      {event.cta && event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ec-cta"
        >
          {event.cta}
        </a>
      )}
    </div>
  );
}

export default function MumbaiExhibitions() {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(245, 166, 35, 0.12)",
            top: "-80px",
            right: "-80px",
          }}
        ></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(55, 27, 88, 0.4)",
            bottom: "-80px",
            left: "-80px",
          }}
        ></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Mumbai Exhibitions 2026</span>
            </div>
            <div className="ph-kicker">
              Mumbai96 · Events & Expos · B2B · B2C · Kids
            </div>
            <h1 className="ph-h1">
              Mumbai <em>Exhibitions</em>
              &nbsp;& Expos <span className="gold">2026</span>
            </h1>
            <p className="ph-desc">
              The definitive guide to Mumbai's biggest exhibitions — B2B trade
              fairs at NESCO & BKC, kids & family expos, food & beverage shows,
              and consumer events across Mumbai's top venues.
            </p>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">5</div>
                <div className="phs-l">Major Venues</div>
              </div>
              <div className="phs">
                <div className="phs-n">200+</div>
                <div className="phs-l">Expos Annually</div>
              </div>
              <div className="phs">
                <div className="phs-n">B2B+B2C</div>
                <div className="phs-l">All Categories</div>
              </div>
              <div className="phs">
                <div className="phs-n">Year-Round</div>
                <div className="phs-l">Events Calendar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* Venues Section */}
              <div className="sec rv">
                <div className="sec-kicker">Top Exhibition Venues</div>
                <h2 className="sec-title">
                  Mumbai's <em>Premier</em> Exhibition Venues
                </h2>
                <div className="venue-grid">
                  {VENUES.map((venue, idx) => (
                    <div
                      key={idx}
                      className={
                        venue.fullWidth
                          ? "venue-card venue-card-full"
                          : "venue-card"
                      }
                    >
                      <h4>
                        {venue.icon} {venue.title}
                      </h4>
                      <p>{venue.desc}</p>
                      <div className="vc-meta">
                        {venue.meta.map((m, i) => (
                          <span key={i}>{m}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* B2B Section */}
              <div className="sec rv">
                <div className="sec-kicker">B2B Trade Exhibitions</div>
                <h2 className="sec-title">
                  Top <em>B2B Trade Shows</em> in Mumbai 2026
                </h2>
                <div className="card-grid-expos">
                  {B2B_EVENTS.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                  ))}
                </div>
              </div>

              {/* Kids & Family Section */}
              <div className="sec rv">
                <div className="sec-kicker">Kids & Family Events</div>
                <h2 className="sec-title">
                  Kids <em>Expos & Family</em> Events Mumbai 2026
                </h2>
                <div className="card-grid">
                  {KIDS_EVENTS.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                  ))}
                </div>
              </div>

              {/* Food Section */}
              <div className="sec rv">
                <div className="sec-kicker">Food & Beverage</div>
                <h2 className="sec-title">
                  Food <em>Exhibitions & Culinary</em> Events Mumbai 2026
                </h2>
                <div className="card-grid">
                  {FOOD_EVENTS.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                  ))}
                </div>
              </div>

              {/* Consumer Section */}
              <div className="sec rv">
                <div className="sec-kicker">Consumer B2C Expos</div>
                <h2 className="sec-title">
                  Popular <em>B2C Exhibitions</em> & Consumer Events
                </h2>
                <div className="card-grid">
                  {CONSUMER_EVENTS.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                  ))}
                </div>
              </div>

              {/* Prose Section */}
              <div className="prose rv">
                <h2>Mumbai Exhibitions 2026 — Complete Venue & Event Guide</h2>
                <p>
                  Mumbai is India's financial capital and hosts some of the
                  largest exhibitions and trade shows in South Asia. The city's
                  exhibition ecosystem is anchored by{" "}
                  <strong>NESCO Goregaon</strong> (India's largest expo complex)
                  and the newer{" "}
                  <strong>Jio World Convention Centre at BKC</strong>, supported
                  by MMRDA grounds, Nehru Centre and suburban mall venues for
                  smaller consumer events.
                </p>
                <h3>Best Months for Mumbai Exhibitions</h3>
                <p>
                  November to February is peak exhibition season in Mumbai —
                  post-monsoon weather is pleasant and footfall is highest.
                  October hosts Diwali consumer events, August–September brings
                  industry trade shows. The summer months (April–June) see fewer
                  events due to heat, except in air-conditioned convention
                  centres.
                </p>
                <h3>How to Exhibit at Mumbai Expos</h3>
                <p>
                  Most major exhibitions are organised by professional event
                  companies — Reed Exhibitions India, UBM India, and Messe
                  Frankfurt India are the biggest organisers operating in
                  Mumbai. Stall booking typically opens 3–6 months before the
                  event. Prices range from ₹15,000–₹2 lakh+ per sq metre
                  depending on the show and stall location.
                </p>
                <h3>Getting to NESCO Goregaon</h3>
                <p>
                  NESCO is on the Western Express Highway at Goregaon East.
                  Nearest railway stations:{" "}
                  <strong>Goregaon Station (Western Railway)</strong> — 10
                  minutes by auto. Metro Line 2A connects to NESCO from Dahisar
                  to DN Nagar. Ample parking available. From BKC: approximately
                  35–45 minutes by road.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  📍 Venue <em>Contacts</em>
                </div>
                <div className="sbw-body">
                  <a
                    href="tel:02266780000"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>
                      🏢 NESCO Goregaon
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        color: "var(--red)",
                      }}
                    >
                      6678-0000
                    </span>
                  </a>
                  <a
                    href="https://jioworld.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>
                      🌊 Jio World Centre
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "800",
                        color: "var(--red)",
                      }}
                    >
                      Visit ↗
                    </span>
                  </a>
                  <a
                    href="https://nehrucentre.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>
                      🏛️ Nehru Centre
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "800",
                        color: "var(--red)",
                      }}
                    >
                      Visit ↗
                    </span>
                  </a>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🗓️ Exhibition <em>Seasons</em>
                </div>
                <div
                  className="sbw-body"
                  style={{
                    fontSize: "12px",
                    color: "#374151",
                    fontWeight: "300",
                    lineHeight: "1.9",
                  }}
                >
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <strong style={{ color: "var(--dark)" }}>
                      Peak Season:
                    </strong>{" "}
                    Nov–Feb (Best weather)
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <strong style={{ color: "var(--dark)" }}>Festive:</strong>{" "}
                    Sep–Oct (Diwali consumer)
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <strong style={{ color: "var(--dark)" }}>
                      Trade Shows:
                    </strong>{" "}
                    Aug–Sep, Mar
                  </div>
                  <div style={{ padding: "6px 0" }}>
                    <strong style={{ color: "var(--dark)" }}>
                      Off-Season:
                    </strong>{" "}
                    May–Jul (minimal events)
                  </div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {QUICK_LINKS.map((link, idx) => (
                    <Link key={idx} href={link.slug} className="quick-link">
                      <div className="ql-icon">{link.icon}</div>
                      <div className="ql-text">{link.text}</div>
                      <div className="ql-arrow">→</div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
