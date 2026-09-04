import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata = {
  title:
    "Mumbai Monsoon Guide 2026 — Survival, Treks, Ganesh Chaturthi & Flood Areas | Mumbai96",
  description:
    "Complete Mumbai monsoon guide 2026. Waterlogging-prone areas, monsoon treks near Mumbai, Ganesh Chaturthi pandals, visarjan routes and IMD weather alerts.",
  keywords:
    "mumbai monsoon guide 2026, mumbai waterlogging areas, monsoon treks near mumbai, ganesh chaturthi mumbai 2026, mumbai flood areas, imd mumbai alert",
  alternates: {
    canonical: "https://mumbai96.vercel.app/mumbai-monsoon",
  },
  openGraph: {
    title:
      "Mumbai Monsoon Guide 2026 — Survival, Treks, Ganesh Chaturthi & Flood Areas | Mumbai96",
    description:
      "Complete Mumbai monsoon guide 2026. Waterlogging-prone areas, monsoon treks near Mumbai, Ganesh Chaturthi pandals, visarjan routes and IMD weather alerts.",
    url: "https://mumbai96.vercel.app/mumbai-monsoon",
    type: "article",
    siteName: "Mumbai96",
  },
};

const QUICK_LINKS = [
  { href: "/mumbai-local-trains", icon: "🚂", label: "Local Train Guide" },
  { href: "/mumbai-monsoon", icon: "🌧️", label: "Monsoon Hub" },
  { href: "/senior-citizens-mumbai", icon: "👴", label: "Senior Citizens" },
  { href: "/mumbai-cost-of-living", icon: "💸", label: "Cost of Living" },
  { href: "/pets-mumbai", icon: "🐾", label: "Pets in Mumbai" },
  { href: "/mumbai-street-food", icon: "🥘", label: "Street Food" },
  { href: "/mumbai-sports", icon: "🏏", label: "Sports Hub" },
  { href: "/mumbai-education", icon: "🎓", label: "Education Hub" },
  { href: "/mumbai-startup-business", icon: "🚀", label: "Startup Guide" },
  { href: "/mumbai-festivals", icon: "🎉", label: "Festivals" },
];

const MONSOON_CALENDAR = [
  { label: "Arrival:", value: "~June 10–15" },
  { label: "Peak:", value: "July–August" },
  { label: "Ganesh Chaturthi:", value: "Aug–Sep" },
  { label: "Withdrawal:", value: "Late September" },
];

export default function MumbaiMonsoonPage() {
  return (
    <ScrollReveal>
      <PageHero
        glowVariant="monsoon"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Mumbai Monsoon" },
        ]}
        kicker="Mumbai96 · Monsoon Season · June to September"
        title={
          <>
            Mumbai <em>Monsoon</em>
            &nbsp;
            <span className="gold">Guide 2026</span>
          </>
        }
        stats={[
          { value: "2,200 mm", label: "Annual Rainfall" },
          { value: "June 10–15", label: "Monsoon Arrives" },
          { value: "Ganesh Chaturthi", label: "August–September" },
          { value: "150,000+", label: "Idols Across City" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Monsoon 2026</div>
                <h2 className="sec-title">
                  Mumbai <em>Monsoon</em> — Survival & Celebration Guide
                </h2>
                <p className="sec-intro">
                  Mumbai&apos;s monsoon (June–September) is both the city&apos;s
                  greatest challenge and its most beautiful season. 2,200+ mm of
                  rainfall, waterlogged streets, late trains — and the most magical
                  bhajiya-chai evenings of the year.
                </p>
                <div className="warn-box">
                  <div className="warn-icon">🌧️</div>
                  <div className="warn-body">
                    <h4>Monsoon Season Dates 2026</h4>
                    <p>
                      Mumbai monsoon typically arrives June 10–15 (South-West
                      Monsoon). Peak rainfall: July–August. Withdrawal: late
                      September/October. IMD issues Red/Orange/Yellow alerts — always
                      check before travelling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Waterlogging Areas</div>
                <h2 className="sec-title">
                  Areas That <em>Flood First</em> — Plan Around Them
                </h2>
                <div className="card-grid">
                  <div className="data-card data-card--danger">
                    <div className="dc-icon">🚨</div>
                    <div className="dc-title">Extreme Risk Areas</div>
                    <div className="dc-body">
                      Hindmata (Dadar), Kings Circle, Andheri Subway, Milan Subway
                      (Santacruz), Malad Link Road, Jogeshwari-Vikhroli Link Road
                      (JVLR), LBS Marg (Kurla), Chunabhatti
                    </div>
                  </div>
                  <div className="data-card data-card--warn">
                    <div className="dc-icon">⚠️</div>
                    <div className="dc-title">Moderate Risk</div>
                    <div className="dc-body">
                      Gokhale Bridge approach (Andheri), CST Road (Santacruz East),
                      Western Express Highway (Goregaon), Eastern Express Highway
                      underpasses, Sion-Trombay Road
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">✅</div>
                    <div className="dc-title">Relatively Safer Routes</div>
                    <div className="dc-body">
                      Western Railway elevated corridors, Eastern Freeway, Sea Link,
                      Coastal Road (new), Elevated roads above WEH. Train over road
                      always preferable in heavy rain.
                    </div>
                  </div>
                </div>
                <a
                  href="https://mcgm.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🏙️</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      BMC Disaster Management — Live Flood Map
                    </div>
                    <div className="lc-desc">
                      MCGM live waterlogging map during active rainfall alerts — check
                      before stepping out
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://mausam.imd.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🌦️</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      IMD Mumbai — Weather Alerts (Official)
                    </div>
                    <div className="lc-desc">
                      India Meteorological Department Mumbai — Red/Orange/Yellow alert
                      notifications, 5-day forecast
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Monsoon Treks Near Mumbai</div>
                <h2 className="sec-title">
                  Best <em>Monsoon Getaways</em> from Mumbai 2026
                </h2>
                <div className="grid-2">
                  <div className="data-card">
                    <div className="dc-icon">⛰️</div>
                    <div className="dc-title">Bhandardara</div>
                    <div className="dc-body">
                      ~165 km · 3.5 hrs drive · Wilson Dam, Arthur Lake, Randha Falls
                      at peak flow. Camping available. Best: July–August. Wilson Dam
                      overflows spectacularly in August.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌿</div>
                    <div className="dc-title">Lonavala & Khandala</div>
                    <div className="dc-body">
                      ~83 km · 1.5 hrs · Tiger&apos;s Leap, Bhushi Dam, Rajmachi. Train
                      from CSMT available. Chikki + corn on the cob mandatory. Best:
                      June–September.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏔️</div>
                    <div className="dc-title">Malshej Ghat</div>
                    <div className="dc-body">
                      ~130 km · 2.5 hrs · Flamingo nesting site during monsoon, stunning
                      mist-covered ghats. Harishchandragad trek starts here. Best:
                      July–September.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌊</div>
                    <div className="dc-title">Alibaug & Murud Janjira</div>
                    <div className="dc-body">
                      ~100 km · Ferry from Gateway (1 hr) or drive 2 hrs · Beach fort,
                      sea fort (Murud Janjira). Quieter in monsoon — fewer crowds,
                      dramatic waves.
                    </div>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Monsoon Food & Culture</div>
                <h2 className="sec-title">
                  The <em>Real Pleasure</em> of Mumbai Monsoon
                </h2>
                <div className="info-box">
                  <h4>🌧️ Mumbai Monsoon Must-Dos (Non-Negotiable)</h4>
                  <ul>
                    <li>
                      <strong>Kanda Bhajiya + Cutting Chai:</strong> Every Mumbai
                      household&apos;s monsoon ritual — sliced onion pakoda with green
                      chutney and a small strong tea. Best at: Swati Snacks (Tardeo),
                      any Irani chai stall
                    </li>
                    <li>
                      <strong>Vada Pav in the Rain:</strong> Standing at a roadside
                      stall, eating vada pav as rain hammers the streets. A deeply
                      Mumbai experience.
                    </li>
                    <li>
                      <strong>Bhel at Chowpatty:</strong> Counter-intuitive but magical
                      — Girgaon Chowpatty bhel in light monsoon drizzle, sea breeze,
                      zero crowd
                    </li>
                    <li>
                      <strong>Juhu Beach Walks:</strong> Early morning monsoon walks at
                      Juhu — dramatic waves, cool air, hawkers just setting up — best
                      before 7 AM
                    </li>
                    <li>
                      <strong>Mohammed Ali Road at night:</strong> Ramzan falls partly
                      in monsoon some years — the food street is magnificent in light
                      rain
                    </li>
                    <li>
                      <strong>Irani Cafe culture:</strong> Kyani & Co. (Marine Lines),
                      B. Merwan (Grant Road), Jimmy Boy (Fort) — the old Irani cafes
                      feel most alive in monsoon
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Ganesh Chaturthi</div>
                <h2 className="sec-title">
                  Ganeshotsav <em>Guide</em> — Mumbai&apos;s Biggest Festival
                </h2>
                <p className="sec-intro sec-intro--mb16">
                  Ganesh Chaturthi (August–September) is the soul of Mumbai. 10 days,
                  150,000+ idols across the city, culminating in the Anant Chaturdashi
                  visarjan procession.
                </p>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🐘</div>
                    <div className="dc-title">Famous Pandals to Visit</div>
                    <div className="dc-body">
                      Lalbaugcha Raja (Lalbaug — Mumbai&apos;s most famous), GSB Seva
                      (King&apos;s Circle), Andhericha Raja (Andheri), Agrasen (Wadala),
                      Chinchpoklicha Chintamani (Chinchpokli)
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌊</div>
                    <div className="dc-title">Visarjan Routes 2026</div>
                    <div className="dc-body">
                      Major visarjan on Day 1, Day 5, Day 7 and Day 10 (Anant
                      Chaturdashi). Key points: Girgaon Chowpatty, Juhu Beach, Versova
                      Beach, Dadar Chowpatty. Mumbai Police manages traffic diversions.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🚇</div>
                    <div className="dc-title">Getting There During Ganeshotsav</div>
                    <div className="dc-body">
                      Avoid cars in Lalbaug, Parel, Chinchpokli, Dadar during peak
                      darshan days. Take local train (Currey Road / Chinchpokli
                      stations for Lalbaug). BMC runs special BEST buses during the
                      festival.
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose rv">
                <h2>Mumbai Monsoon — Everything You Need to Know</h2>
                <p>
                  Mumbai receives more rain in a single day during peak monsoon than
                  many Indian cities receive in a month. The July 26, 2005 deluge —
                  944 mm in 24 hours — remains the benchmark disaster. But every year,
                  Mumbai&apos;s citizens adapt and even celebrate the monsoon as part
                  of the city&apos;s identity.
                </p>
                <h3>Monsoon Preparedness for Housing Societies</h3>
                <p>
                  Every housing society must complete pre-monsoon work before June 1:
                  terrace waterproofing check, drainage cleaning, tree trimming
                  (coordinate with BMC garden department for any tree pruning),
                  water pump servicing, and ensuring the society&apos;s drain
                  connections are clear. Post the local BMC ward&apos;s flood helpline
                  number in the society notice board.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🌧️ Monsoon <em>Alerts</em>
                </div>
                <div className="sbw-body">
                  <a
                    href="https://mausam.imd.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-cta-dark"
                  >
                    IMD Weather Alerts ↗
                  </a>
                  <a href="tel:1916" className="sb-helpline-row">
                    <span className="label">📞 BMC Helpline</span>
                    <span className="num">1916</span>
                  </a>
                  <a href="tel:1800222111" className="sb-helpline-row">
                    <span className="label">🚨 Disaster Helpline</span>
                    <span className="num num--sm">1800-22-2111</span>
                  </a>
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  📅 Monsoon <em>Calendar</em>
                </div>
                <div className="sbw-body sb-summary-list">
                  {MONSOON_CALENDAR.map((row) => (
                    <div key={row.label} className="sb-summary-row">
                      <strong>{row.label}</strong> {row.value}
                    </div>
                  ))}
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {QUICK_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="quick-link">
                      <div className="ql-icon">{l.icon}</div>
                      <div className="ql-text">{l.label}</div>
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
