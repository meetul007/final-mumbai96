import Link from "next/link";
import "./style.css";

export const metadata = {
  title: "Mumbai Education Hub 2026 — Schools, Coaching, Scholarships",
  description:
    "Complete guide to Mumbai schools, admission boards (SSC/CBSE/ICSE), competitive exam coaching (JEE/NEET/UPSC), scholarship schemes, and RTE 25% admissions.",
  keywords:
    "Mumbai schools, school admissions, JEE coaching, NEET coaching, UPSC, scholarships, RTE admissions, boarding schools, IIT Bombay",
  canonical: "https://mumbai96.com/mumbai-education",
  openGraph: {
    title: "Mumbai Education Hub 2026",
    description:
      "Schools, admission guides, coaching centres, and scholarships for Mumbai students.",
    url: "https://mumbai96.com/mumbai-education",
    type: "website",
  },
};

const BOARDS = [
  {
    board: "BMC / Municipal Schools",
    dates: "March–June (Std 1 onwards)",
    fee: "Free",
    feeColor: "var(--green)",
    apply: "Visit nearest BMC school",
  },
  {
    board: "SSC (Maharashtra Board)",
    dates: "April–June admissions",
    fee: "₹5,000–₹40,000/year",
    apply: "School directly, RTE portal for 25%",
  },
  {
    board: "ICSE Board",
    dates: "Nov–Jan (for next year)",
    fee: "₹40,000–₹1,50,000/year",
    apply: "School directly — very competitive",
  },
  {
    board: "CBSE Board",
    dates: "Nov–Feb (for next year)",
    fee: "₹30,000–₹1,20,000/year",
    apply: "School directly or school website",
  },
  {
    board: "International (IB/Cambridge)",
    dates: "Year-round, school-specific",
    fee: "₹2,00,000–₹10,00,000/year",
    apply: "School directly — entrance test",
  },
];

const COACHING_CARDS = [
  {
    icon: "🔬",
    title: "JEE / NEET Coaching",
    body: "Top centres: FIITJEE (Dadar, Andheri), Allen Career Institute (Thane, Andheri), Aakash (multiple branches), PACE (Mumbai-specific). Start in Class 9–10 for best results. Fees: ₹80,000–₹2 lakh/year.",
  },
  {
    icon: "🏛️",
    title: "UPSC / MPSC Coaching",
    body: "Chanakya Mandal (Pune + Mumbai), Unique Academy (Dadar), IAS Gateway (Andheri). MPSC (Maharashtra PSC) has strong coaching ecosystem in Mumbai — many successful candidates from Western Railway suburban belt.",
  },
  {
    icon: "💼",
    title: "CA / CS / CMA Coaching",
    body: "ICAI study centres across Mumbai (Fort, Andheri, Mulund). Strong CA coaching network at Dadar, Fort, Ghatkopar. Mumbai produces the highest number of CA exam passers annually in India.",
  },
];

const SCHOLARSHIPS = [
  {
    name: "Maharashtra EBC Scholarship",
    desc: "For economically backward class students — covers tuition + hostel. Apply at mahaeschol.maharashtra.gov.in",
  },
  {
    name: "Eklavya Scholarship (Tribal)",
    desc: "For ST students in Maharashtra — covers full education costs. Apply via tribal welfare department.",
  },
  {
    name: "Savitribai Phule Scholarship",
    desc: "For OBC/NT/SBC/VJNT girl students — tuition + living allowance. Apply via social welfare department.",
  },
  {
    name: "National Merit-cum-Means Scholarship",
    desc: "Class 8 exam based — ₹12,000/year for Class 9–12. Apply via MSCE Pune.",
  },
  {
    name: "Mumbai Port Trust (MbPT) Scholarship",
    desc: "For students in areas adjacent to Mumbai Port Trust — engineering and professional courses.",
  },
  {
    name: "NSP — National Scholarship Portal",
    desc: "One portal for all central government scholarships. scholarships.gov.in — apply before October deadline.",
  },
];

const PORTALS = [
  {
    icon: "📖",
    name: "RTE 25% Admissions",
    url: "https://rte25.maharashtra.gov.in",
    label: "Apply ↗",
  },
  {
    icon: "🎓",
    name: "MahaESchol",
    url: "https://mahaeschol.maharashtra.gov.in",
    label: "Scholarships ↗",
  },
  {
    icon: "🇮🇳",
    name: "NSP Scholarships",
    url: "https://scholarships.gov.in",
    label: "Apply ↗",
  },
];

const QUICK_LINKS = [
  { icon: "🚂", name: "Local Train", slug: "/mumbai-local-train" },
  { icon: "💰", name: "Real Estate", slug: "/mumbai-real-estate-guide" },
  { icon: "🌧️", name: "Monsoon", slug: "/mumbai-monsoon" },
  { icon: "👴", name: "Senior Citizens", slug: "/senior-citizens-mumbai" },
  { icon: "💸", name: "Cost of Living", slug: "/mumbai-cost-of-living" },
  { icon: "🐾", name: "Pets", slug: "/pets-mumbai" },
  { icon: "🥘", name: "Street Food", slug: "/mumbai-street-food" },
  { icon: "🏛️", name: "Corporator Guide", slug: "/mumbai-corporator-ward" },
  { icon: "🎓", name: "Education", slug: "/mumbai-education" },
  { icon: "🎉", name: "Festivals", slug: "/mumbai-festivals" },
];

export default function MumbaiEducation() {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(21, 101, 192, 0.12)",
            top: "-80px",
            right: "-80px",
          }}
        ></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Mumbai Education</span>
            </div>
            <div className="ph-kicker">
              Mumbai96 · Education · Admissions · Scholarships · Coaching
            </div>
            <h1 className="ph-h1">
              Mumbai <em>Education</em>
              &nbsp;
              <span className="gold">Hub 2026</span>
            </h1>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">5 IITs+</div>
                <div className="phs-l">Premier Institutions in MMR</div>
              </div>
              <div className="phs">
                <div className="phs-n">March–May</div>
                <div className="phs-l">School Admission Season</div>
              </div>
              <div className="phs">
                <div className="phs-n">25%</div>
                <div className="phs-l">RTE Quota in Private Schools</div>
              </div>
              <div className="phs">
                <div className="phs-n">Free</div>
                <div className="phs-l">Scholarship Applications</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* School Admissions Section */}
              <div className="sec rv">
                <div className="sec-kicker">School Admissions</div>
                <h2 className="sec-title">
                  Mumbai School <em>Admission Guide</em> 2026
                </h2>
                <div className="table-wrap">
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>Board</th>
                        <th>Key Dates</th>
                        <th>Fee Range/Year</th>
                        <th>How to Apply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BOARDS.map((board, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: "700" }}>{board.board}</td>
                          <td style={{ fontSize: "12px" }}>{board.dates}</td>
                          <td
                            style={{
                              fontWeight: "700",
                              color: board.feeColor || "inherit",
                            }}
                          >
                            {board.fee}
                          </td>
                          <td style={{ fontSize: "12px" }}>{board.apply}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="warn-box">
                  <div className="warn-icon">📖</div>
                  <div className="warn-body">
                    <h4>RTE 25% Admission — Free Private School Seats</h4>
                    <p>
                      Under the Right to Education Act, 25% of seats in all
                      unaided private schools must go to children from
                      economically weaker sections — completely free, reimbursed
                      by state government. Apply via rte25.maharashtra.gov.in.
                      Competition is high — apply early.
                    </p>
                  </div>
                </div>
              </div>

              {/* Coaching Section */}
              <div className="sec rv">
                <div className="sec-kicker">Competitive Exam Coaching</div>
                <h2 className="sec-title">
                  Best <em>Coaching Centres</em> in Mumbai
                </h2>
                <div className="card-grid">
                  {COACHING_CARDS.map((card, idx) => (
                    <div className="data-card" key={idx}>
                      <div className="dc-icon">{card.icon}</div>
                      <div className="dc-title">{card.title}</div>
                      <div className="dc-body">{card.body}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scholarships Section */}
              <div className="sec rv">
                <div className="sec-kicker">Scholarships</div>
                <h2 className="sec-title">
                  Scholarships for <em>Mumbai Students</em> 2026
                </h2>
                <div className="info-box">
                  <h4>🎓 Key Scholarship Schemes — Apply Now</h4>
                  <ul>
                    {SCHOLARSHIPS.map((sch, idx) => (
                      <li key={idx}>
                        <strong>{sch.name}:</strong> {sch.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prose Section */}
              <div className="prose rv">
                <h2>Mumbai Education Guide — Complete Reference 2026</h2>
                <p>
                  Mumbai is home to some of India's finest educational
                  institutions — IIT Bombay (Powai), TISS (Deonar), SNDT Women's
                  University, University of Mumbai, Narsee Monjee, SP Jain,
                  JBIMS and dozens more. At the school level, Mumbai has the
                  country's largest BMC school network (1,200+ schools)
                  alongside elite private schools in Bandra, Powai and South
                  Mumbai. Understanding Mumbai's education ecosystem — boards,
                  admissions, coaching and scholarships — is critical for every
                  family in the city.
                </p>
                <h3>Which Board is Best for Mumbai Students?</h3>
                <p>
                  SSC (Maharashtra State Board) is the most widely understood
                  locally and provides the best preparation for Maharashtra
                  professional entrance exams (MHT-CET, MPSC). CBSE is better
                  for students targeting national competitive exams (JEE, NEET).
                  ICSE develops strong English and analytical skills. The
                  "right" board depends on where you live, your school quality,
                  and your child's career aspirations — not the board brand
                  itself.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  📚 Key <em>Portals</em>
                </div>
                <div className="sbw-body">
                  {PORTALS.map((portal, idx) => (
                    <a
                      key={idx}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom:
                          idx < PORTALS.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: "700" }}>
                        {portal.icon} {portal.name}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "800",
                          color: "var(--red)",
                        }}
                      >
                        {portal.label}
                      </span>
                    </a>
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
                      <div className="ql-text">{link.name}</div>
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
