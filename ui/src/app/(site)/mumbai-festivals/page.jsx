import Link from 'next/link';
import './style.css';

export const metadata = {
  title: 'Mumbai Festivals 2026 — Ganesh Chaturthi, Navratri, Kala Ghoda, Diwali',
  description: 'Complete Mumbai festival calendar 2026 — Ganesh Chaturthi, Navratri Garba, Kala Ghoda Arts Festival, Diwali, Christmas at Bandra, Tata Marathon, Holi, Mohammed Ali Road Iftar.',
  keywords: 'Mumbai festivals, Ganesh Chaturthi, Navratri, Kala Ghoda, Diwali Bandra, Christmas Mumbai, Tata Marathon, Holi, festivals calendar',
  canonical: 'https://mumbai96.com/mumbai-festivals',
  openGraph: {
    title: 'Mumbai Festivals 2026',
    description: 'Mumbai\'s festival calendar — celebrations year-round across all communities.',
    url: 'https://mumbai96.com/mumbai-festivals',
    type: 'website',
  },
};

const FESTIVALS = [
  {
    month: 'January',
    name: '🏃 Tata Mumbai Marathon',
    body: 'Asia\'s largest marathon — 50,000+ participants. Marine Drive to CSMT route. Register from August. Makar Sankranti (January 14–15) — kite flying on terrace rooftops, til-gul celebrations across the city.',
    borderColor: 'var(--red)',
  },
  {
    month: 'February',
    name: '🎨 Kala Ghoda Arts Festival',
    body: '9 days of visual art, performances, installations, films and food in the Fort-Kala Ghoda precinct of South Mumbai. Free to attend. A must-experience for every Mumbaikar. February first week, annually.',
  },
  {
    month: 'March',
    name: '🌈 Holi — Juhu Beach & Housing Societies',
    body: 'Mumbai celebrates Holi city-wide. Juhu Beach is the most famous public celebration. Almost every housing society has their own Holi event. Rangpanchami (5 days after Holi) is especially colourful in the Konkan community.',
    borderColor: 'var(--red)',
  },
  {
    month: 'Ramzan (Lunar — varies)',
    name: '🌙 Mohammed Ali Road Iftar Season',
    body: '30 nights of Mumbai\'s most extraordinary food street. Mohammed Ali Road transforms after sundown — mawa cake, phirni, biryani, haleem, naan kalia, seekh kebabs. Even non-Muslims come every year for this.',
  },
  {
    month: 'May',
    name: '🎬 MAMI — Mumbai Film Festival (varies)',
    body: 'Mumbai Academy of Moving Image hosts India\'s most prestigious film festival — world cinema, Indian independent films, workshops. Screenings across multiple venues in South and Central Mumbai. October–November.',
    borderColor: 'var(--red)',
  },
  {
    month: 'August–September',
    name: '🐘 Ganesh Chaturthi — 10 Days of Mumbai\'s Soul',
    body: 'Mumbai\'s biggest festival. 150,000+ Ganesh idols, famous pandals (Lalbaugcha Raja, GSB Seva, Andhericha Raja), street processions, modak, devotion and community spirit. Culminates with Anant Chaturdashi visarjan.',
  },
  {
    month: 'September–October',
    name: '💃 Navratri Garba',
    body: '9 nights of garba and dandiya. Biggest venues: Sports Club of Gujarat (Andheri), Sion, Dadar. Also popular in residential societies across Western suburbs. The Navratri garba scene in Mumbai is among India\'s most celebrated.',
    borderColor: 'var(--red)',
  },
  {
    month: 'October–November',
    name: '🪔 Diwali in Dadar & Across Mumbai',
    body: 'Dadar\'s Phule Market becomes a riot of flowers, lights and decorations pre-Diwali. Dharavi and Kurla\'s kite scene on Bhau-Beej. South Mumbai\'s Diwali Milan parties. Every neighbourhood has its own Diwali character.',
  },
  {
    month: 'December',
    name: '⭐ Christmas at Bandra — Hill Road Lights',
    body: 'Bandra\'s Hill Road and Mount Mary area transform at Christmas — illuminated stars, crib displays, midnight mass at Mount Mary Basilica, music, food. A Mumbai tradition that the whole city participates in, across communities.',
    borderColor: 'var(--red)',
  },
  {
    month: 'December',
    name: '🎊 New Year\'s Eve — Marine Drive & Bandra',
    body: 'Marine Drive (Queen\'s Necklace) lit at midnight. Bandstand and Carter Road (Bandra) packed. Gateway of India area crowded but spectacular. Hotels and restaurants across South Mumbai host ticketed NYE events.',
  },
];

const FESTIVAL_DATES = [
  { label: 'Marathon:', value: 'January' },
  { label: 'Kala Ghoda:', value: 'February' },
  { label: 'Ganesh Chaturthi:', value: 'Aug–Sep' },
  { label: 'Navratri:', value: 'Sep–Oct' },
  { label: 'Christmas Bandra:', value: 'December' },
];

const QUICK_LINKS = [
  { icon: '🚂', text: 'Local Train', slug: '/mumbai-local-train' },
  { icon: '💰', text: 'Real Estate', slug: '/mumbai-real-estate-guide' },
  { icon: '🌧️', text: 'Monsoon', slug: '/mumbai-monsoon' },
  { icon: '👴', text: 'Senior Citizens', slug: '/senior-citizens-mumbai' },
  { icon: '💸', text: 'Cost of Living', slug: '/mumbai-cost-of-living' },
  { icon: '🐾', text: 'Pets', slug: '/pets-mumbai' },
  { icon: '🥘', text: 'Street Food', slug: '/mumbai-street-food' },
  { icon: '🏏', text: 'Sports Hub', slug: '/mumbai-sports' },
  { icon: '🎓', text: 'Education', slug: '/mumbai-education' },
  { icon: '🏛️', text: 'Corporator', slug: '/mumbai-corporator-ward' },
];

export default function MumbaiFestivals() {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div className="ph-glow" style={{ background: 'rgba(245, 166, 35, 0.15)', top: '-80px', right: '-80px' }}></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Mumbai Festivals</span>
            </div>
            <div className="ph-kicker">Mumbai96 · Celebrations · Every Festival Every Community</div>
            <h1 className="ph-h1">
              Mumbai <em>Festivals</em>
              &nbsp;
              <span className="gold">Calendar 2026</span>
            </h1>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">12+ Months</div>
                <div className="phs-l">Festivals Year-Round</div>
              </div>
              <div className="phs">
                <div className="phs-n">150,000+</div>
                <div className="phs-l">Ganesh Idols During Chaturthi</div>
              </div>
              <div className="phs">
                <div className="phs-n">50,000+</div>
                <div className="phs-l">Marathon Participants</div>
              </div>
              <div className="phs">
                <div className="phs-n">9 Nights</div>
                <div className="phs-l">Navratri Garba Season</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* Festival Calendar */}
              <div className="sec rv">
                <div className="sec-kicker">Mumbai's Festival Year</div>
                <h2 className="sec-title">
                  Mumbai's <em>Festival Calendar</em> — Month by Month
                </h2>
                <div className="festival-list">
                  {FESTIVALS.map((festival, idx) => (
                    <div
                      key={idx}
                      className="festival-card"
                      style={{ borderLeftColor: festival.borderColor || 'var(--border)' }}
                    >
                      <div className="fc-month">{festival.month}</div>
                      <div className="fc-name">{festival.name}</div>
                      <div className="fc-body">{festival.body}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prose Section */}
              <div className="prose rv">
                <h2>Mumbai Festivals — The City That Celebrates Together</h2>
                <p>
                  No Indian city celebrates as many festivals as enthusiastically as Mumbai. The city's extraordinary mix of communities — Maharashtrian, Gujarati, Parsi, Muslim, Christian, South Indian, Sindhi — means there is literally a festival every week of the year. And uniquely, Mumbai's festivals are not just for the communities they belong to — they are for everyone. The whole city goes to Mohammed Ali Road during Ramzan, everyone participates in Ganesh Chaturthi, every Mumbaikar feels the magic of Christmas at Bandra.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  📅 Key <em>Festival Dates</em>
                </div>
                <div className="sbw-body" style={{ fontSize: '12px', color: '#374151', fontWeight: '300', lineHeight: '1.9' }}>
                  {FESTIVAL_DATES.map((date, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '5px 0',
                        borderBottom: idx < FESTIVAL_DATES.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <strong style={{ color: 'var(--dark)' }}>{date.label}</strong> {date.value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
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
