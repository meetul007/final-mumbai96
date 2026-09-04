import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

const timeline = [
  {
    icon: "🐟",
    year: "Pre-1000 AD",
    title: "The Seven Islands — Koli Fisher Communities",
    body: 'Mumbai was seven separate islands — Bombay, Colaba, Old Woman\'s Island, Mahim, Mazagaon, Parel, Worli — inhabited by Koli fisher communities for millennia. The name "Mumbai" derives from Mumba Devi, the patron goddess of the Koli people.',
  },
  {
    icon: "⚓",
    year: "1534",
    title: "Portuguese Arrival — Bom Bahia",
    body: 'Portuguese took control from the Sultan of Gujarat. Named the harbour "Bom Bahia" (Good Bay) — corrupted to "Bombay" by the British. The Portuguese began modest development, building churches including St. Thomas Cathedral (1718).',
  },
  {
    icon: "💍",
    year: "1661",
    title: "Bombay Becomes British — Catherine's Dowry",
    body: "Bombay was gifted to England as part of the marriage dowry when King Charles II wed Catherine of Braganza. In 1668, the Crown leased the islands to the East India Company for £10 per year. One of history's most consequential property deals.",
  },
  {
    icon: "🏗️",
    year: "1784–1845",
    title: "The Great Reclamation — One Island from Seven",
    body: "The British undertook the Hornby Vellard project — connecting the seven islands through massive land reclamation. By 1845 Mumbai was a single landmass. This engineering feat (joining 438 sq km of islands and reclaimed land) created the geography of modern Mumbai.",
  },
  {
    icon: "🚂",
    year: "1853",
    title: "India's First Railway — Bombay to Thane",
    body: "April 16, 1853: India's first passenger train ran from Bombay's Bori Bunder (now CSMT) to Thane — 34 km. The train that would define Mumbai's identity for the next 170 years was born. 400 passengers on the inaugural run, 21-gun salute.",
  },
  {
    icon: "🧵",
    year: "1850–1920",
    title: "The Cotton Mills Era — Mumbai as Industrial Capital",
    body: "The American Civil War disrupted US cotton supply, making Mumbai's cotton mills incredibly profitable. Over 130 cotton textile mills employed lakhs of workers — Girangaon (Village of Mills) in Parel, Worli, Dadar became the beating heart of working-class Mumbai. This era created Mumbai's unique working-class culture, trade unions, and Dadar's distinct identity.",
  },
  {
    icon: "🎬",
    year: "1913",
    title: "Bollywood is Born — Dadasaheb Phalke's Raja Harishchandra",
    body: "Dhundiraj Govind Phalke (Dadasaheb) made India's first feature film Raja Harishchandra in 1913 — primarily in Mumbai. The city has been the capital of Indian cinema ever since. Today Bollywood contributes ₹12,000 crore+ annually to Mumbai's economy.",
  },
  {
    icon: "🇮🇳",
    year: "1960",
    title: "Maharashtra State — Mumbai Becomes State Capital",
    body: "May 1, 1960: Bombay State was bifurcated into Maharashtra (Marathi-speaking) and Gujarat (Gujarati-speaking). Bombay became the capital of Maharashtra after a long Samyukta Maharashtra movement (1955–1960) in which 106 protesters died for the cause.",
  },
  {
    icon: "💔",
    year: "1992–93",
    title: "Riots & Resilience",
    body: 'December 1992–January 1993 communal riots following Babri Masjid demolition killed over 900 people. The Bombay Serial Blasts of March 1993 killed 257 more. Yet Mumbai rebuilt — returning to normalcy faster than any other city had. "Mumbai Bandh nahin hota" became the city\'s defining self-belief.',
  },
  {
    icon: "🏙️",
    year: "1995–1996",
    title: "Bombay Becomes Mumbai — The Name That Carries History",
    body: (
      <>
        November 1995: Maharashtra government officially renamed Bombay to Mumbai —
        restoring the Koli community&apos;s ancient name for their goddess Mumba
        Devi. The legal transition completed through 1996, making Mumbai the
        city&apos;s permanent name in all official use.{" "}
        <strong>This is why we are Mumbai96.</strong>
      </>
    ),
  },
  {
    icon: "💥",
    year: "2006 · 2008",
    title: "Terror and Tenacity",
    body: "July 11, 2006: Serial train bombings killed 209 Mumbaikars. November 26–29, 2008: 10 Pakistani terrorists held the city hostage for 60 hours, killing 175 people including at Taj Mahal Hotel, CST and Nariman House. Mumbai mourned and resumed. The city's resilience became its global identity.",
  },
  {
    icon: "🚇",
    year: "2024–2026",
    title: "Mumbai's Infrastructure Renaissance",
    body: "The Coastal Road, Metro Line 3 (underground), Atal Setu (longest sea bridge in India), Trans Harbour Link — Mumbai is in the middle of the largest infrastructure transformation in its history. The city that built itself from seven islands is rebuilding itself again, faster than ever.",
  },
];

const quickLinks = [
  { href: "/mumbai-local-train", icon: "🚂", label: "Local Train Guide" },
  { href: "/mumbai-real-estate-guide", icon: "💰", label: "Real Estate Intel" },
  { href: "/mumbai-monsoon", icon: "🌧️", label: "Monsoon Guide" },
  { href: "/mumbai-cost-of-living", icon: "💸", label: "Cost of Living" },
  { href: "/pets-mumbai", icon: "🐾", label: "Pets in Mumbai" },
  { href: "/mumbai-street-food", icon: "🥘", label: "Street Food" },
  { href: "/mumbai-sports", icon: "🏏", label: "Sports Hub" },
  { href: "/mumbai-education", icon: "🎓", label: "Education Hub" },
  { href: "/mumbai-startup-business", icon: "🚀", label: "Startup Guide" },
  { href: "/mumbai-festivals", icon: "🎉", label: "Festivals" },
];

export default function StoryOfMumbai96Page() {
  return (
    <>
      <PageHero
        tone="gold"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Story Of Mumbai 96" },
        ]}
        kicker="Mumbai96 · City Heritage · 1853 to 2026"
        title={
          <>
            Story of <em>Mumbai96</em>
          </>
        }
        stats={[
          { value: "1853", label: "India's First Railway" },
          { value: "1995–96", label: "Bombay → Mumbai" },
          { value: "7", label: "Islands That Became One City" },
          { value: "Est. 2024", label: "Mumbai96 Platform" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Why 96?</div>
                <h2 className="sec-title">
                  The Year That <em>Changed Everything</em>
                </h2>
                <p className="story-pullquote">
                  <em>
                    &quot;Bombay was renamed Mumbai in 1995. But it was in 1996 that
                    the name came into full legal and civic effect — making 1996 the
                    year Mumbai truly became Mumbai. That&apos;s why we are
                    Mumbai96.&quot;
                  </em>
                </p>
                <div className="warn-box">
                  <div className="warn-icon">🏙️</div>
                  <div className="warn-body">
                    <h4>The Founding Idea</h4>
                    <p>
                      Mumbai96 is named after 1996 — the year the city&apos;s identity
                      crystallised. We are not just a platform, we are a commitment to
                      this city and its people, built around the belief that Mumbai
                      deserves its own digital home that is as ambitious, resilient and
                      inclusive as the city itself.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">City Timeline</div>
                <h2 className="sec-title">
                  Mumbai&apos;s <em>History</em> — From Seven Islands to Megacity
                </h2>
                <div className="m96-timeline">
                  {timeline.map((t, idx) => (
                    <div key={idx} className="m96-tl-item">
                      <div className="m96-tl-dot">{t.icon}</div>
                      <div className="m96-tl-body">
                        <div className="m96-tl-year">{t.year}</div>
                        <h4>{t.title}</h4>
                        <p>{t.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Mumbai&apos;s DNA</div>
                <h2 className="sec-title">
                  What Makes <em>Mumbai, Mumbai</em>
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏃</div>
                    <div className="dc-title">The Pace</div>
                    <div className="dc-body">
                      Mumbai moves faster than any other Indian city. Trains run on the
                      minute. Dabbawalas achieve six-sigma logistics every day. 21
                      lakh people commute on local trains daily. The city doesn&apos;t
                      wait.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌏</div>
                    <div className="dc-title">The Plurality</div>
                    <div className="dc-body">
                      No other city in India has this mix — Marathi, Gujarati, Sindhi,
                      South Indian, UP-Bihar, Muslim, Christian, Parsi communities
                      living door-to-door. Mumbai&apos;s identity is precisely this:
                      belonging to everyone who comes here to build a life.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">💪</div>
                    <div className="dc-title">The Resilience</div>
                    <div className="dc-body">
                      Floods, riots, blasts, pandemics — Mumbai has faced every disaster
                      and resumed. &quot;Mumbai Bandh nahin hota&quot; is not just a
                      slogan, it is the city&apos;s operating system. Every generation of
                      Mumbaikars has rebuilt.
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose rv">
                <h2>Story of Mumbai 96 — Why This Platform Was Built</h2>
                <p>
                  Mumbai96 was built on a simple belief: this city, with its 2 crore
                  people and 170-year history as India&apos;s commercial capital,
                  deserved a platform that was exclusively and unconditionally its own.
                  Not a national platform with a Mumbai section. Not a listing site. A
                  city platform — built by a Mumbaikar, for Mumbaikars, covering every
                  dimension of city life from street food to co-op society bye-laws.
                </p>
                <h3>The Koli Heritage — Mumbai&apos;s Original People</h3>
                <p>
                  Before the British, before the Portuguese, before any colonial power
                  — the Koli fishing communities lived on these seven islands and called
                  their patron goddess Mumba Devi. Every time a Mumbaikar says
                  &quot;Mumbai,&quot; they are unknowingly honouring the Koli
                  community&apos;s ancient name. The Koliwada fishing villages still
                  exist in Worli, Versova, Mahim, Colaba and Cuffe Parade — living within
                  the megacity as Mumbai&apos;s oldest residents.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🏙️ Mumbai <em>Milestones</em>
                </div>
                <div className="sbw-body">
                  <div className="sb-list-plain">
                    <div>
                      <strong>1853:</strong> India&apos;s first railway
                    </div>
                    <div>
                      <strong>1913:</strong> Bollywood born
                    </div>
                    <div>
                      <strong>1960:</strong> Maharashtra formed
                    </div>
                    <div>
                      <strong>1996:</strong> Bombay → Mumbai
                    </div>
                    <div>
                      <strong>2026:</strong> Mumbai96 platform
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {quickLinks.map((l) => (
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
    </>
  );
}
