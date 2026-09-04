import Link from "next/link";
import "./style.css";

export const metadata = {
  title:
    "Mumbai Corporator & Ward Guide 2026 — Find Your Representative | Mumbai96",
  description:
    "Complete guide to Mumbai corporators, wards, and how to file civic complaints. Find your ward corporator, understand BMC structure and file complaints on 1916.",
  keywords:
    "mumbai corporator, bmc ward, corporator contact, civic complaint mumbai, file complaint 1916, find corporator, bmc corporator list",
  canonical: "https://mumbai96.vercel.app/mumbai-corporator-ward",
  openGraph: {
    title: "Mumbai Corporator & Ward Guide 2026 — Know Your Representative",
    description:
      "Find your BMC corporator, understand ward structure, file civic complaints and access BMC services.",
    url: "https://mumbai96.vercel.app/mumbai-corporator-ward",
    type: "article",
    siteName: "Mumbai96",
  },
};

const CORPORATOR_INFO = [
  {
    icon: "🗳️",
    title: "How They Are Elected",
    desc: "BMC elections are held every 5 years for 227 (previously 236) seats across Mumbai's wards. Each ward elects 1–3 corporators. Political parties — Shiv Sena, BJP, Congress, NCP — all contest. Independents also win frequently in local body elections.",
  },
  {
    icon: "💰",
    title: "Ward Development Fund",
    desc: "Each corporator gets ₹75–₹100 lakh annual ward development fund for local infrastructure. You can ask your corporator how this fund was spent — this information is public under RTI and must be published on BMC's website.",
  },
  {
    icon: "📋",
    title: "What to Approach Them For",
    desc: "Potholes, broken streetlights, drainage blockage, tree trimming, garden maintenance, illegal parking complaints, encroachments, water supply issues, local school/hospital grievances.",
  },
];

const WARDS = [
  { code: "A Ward", areas: "Colaba, Nariman Point, Fort, CST, Ballard Estate" },
  { code: "B Ward", areas: "Mandvi, Bhuleshwar, Masjid Bunder, Kalbadevi" },
  { code: "C Ward", areas: "Marine Lines, Girgaon, Malabar Hill, Gamdevi" },
  {
    code: "D Ward",
    areas: "Grant Road, Worli, Tardeo, Haji Ali, Breach Candy",
  },
  { code: "E Ward", areas: "Byculla, Mazgaon, Nagpada" },
  { code: "F/N Ward", areas: "Wadala, Antop Hill, Sion" },
  { code: "G/N Ward", areas: "Dharavi, Mahim, Worli (partial)" },
  { code: "H/E Ward", areas: "Bandra East, Vakola, Santacruz East" },
  { code: "H/W Ward", areas: "Bandra West, Khar, Santacruz West" },
  {
    code: "K/E & K/W Ward",
    areas: "Andheri East, Andheri West, Juhu, Vile Parle",
  },
  { code: "P/N & P/S Ward", areas: "Goregaon, Jogeshwari" },
  { code: "R/N & R/S Ward", areas: "Borivali, Kandivali, Dahisar, Malad" },
  { code: "T Ward", areas: "Mulund, Bhandup (partial)" },
];

const COMPLAINT_STEPS = [
  {
    num: "1",
    title: "Call BMC Helpline 1916 (First)",
    desc: "BMC's 24x7 helpline registers complaints immediately. You get a complaint number. Track status online. Most routine complaints (potholes, streetlights) are resolved via this channel in 7–15 days.",
  },
  {
    num: "2",
    title: "My BMC App — Mobile Complaints",
    desc: "Download My BMC App — photo-based complaint system. Take a photo, mark location, submit. Very effective for pothole, garbage, and encroachment complaints.",
  },
  {
    num: "3",
    title: "Contact Your Corporator's Office",
    desc: 'Every corporator has a ward office or "Prabhag" office. Visit or call with your complaint. Corporators are most responsive before elections. Keep complaint number from step 1 when approaching.',
  },
  {
    num: "4",
    title: "Ward Officer / Assistant Commissioner",
    desc: "If no response in 15 days, escalate to the Ward Officer (senior IAS/IPS officer heading the ward). Their contact is on the MCGM portal. Send complaint by email with complaint number.",
  },
  {
    num: "5",
    title: "RTI — Right to Information",
    desc: "File an RTI application asking for the status of your complaint, the contractor responsible, and the fund allocation. RTI responses are legally mandated within 30 days. RTI is the most powerful civic tool.",
  },
];

const BMC_CONTACTS = [
  { icon: "📞", label: "BMC Helpline", value: "1916", href: "tel:1916" },
  {
    icon: "🌐",
    label: "MCGM Portal",
    value: "Visit ↗",
    href: "https://www.mcgm.gov.in",
  },
  {
    icon: "📱",
    label: "My BMC App",
    value: "Download ↗",
    href: "https://pbmcservices.mcgm.gov.in",
  },
];

const QUICK_LINKS = [
  { href: "/mumbai-local-train", icon: "🚂", text: "Local Train Guide" },
  { href: "/mumbai-real-estate-guide", icon: "💰", text: "Real Estate Intel" },
  { href: "/mumbai-monsoon", icon: "🌧️", text: "Monsoon Guide" },
  { href: "/senior-citizens-mumbai", icon: "👴", text: "Senior Citizens" },
  { href: "/mumbai-cost-of-living", icon: "💸", text: "Cost of Living" },
  { href: "/pets-mumbai", icon: "🐾", text: "Pets in Mumbai" },
  { href: "/mumbai-sports", icon: "🏏", text: "Sports Hub" },
  { href: "/mumbai-education", icon: "🎓", text: "Education Hub" },
  { href: "/mumbai-startup-business", icon: "🚀", text: "Startup Guide" },
  { href: "/mumbai-festivals", icon: "🎉", text: "Festivals" },
];

export default function MumbaiCorporatorWardPage() {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(55,27,88,.3)",
            top: "-80px",
            right: "-80px",
          }}
        ></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Mumbai Corporator Ward</span>
            </div>
            <div className="ph-kicker">
              Mumbai96 · Civic Democracy · Know Your Ward
            </div>
            <h1 className="ph-h1">
              Mumbai <em>Corporator &amp;</em>
              &nbsp;
              <span className="gold">Ward Guide 2026</span>
            </h1>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">227</div>
                <div className="phs-l">Elected Corporators</div>
              </div>
              <div className="phs">
                <div className="phs-n">24</div>
                <div className="phs-l">BMC Administrative Wards</div>
              </div>
              <div className="phs">
                <div className="phs-n">₹52,000 Cr</div>
                <div className="phs-l">BMC Annual Budget</div>
              </div>
              <div className="phs">
                <div className="phs-n">1916</div>
                <div className="phs-l">File Any Civic Complaint</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* What Is a Corporator Section */}
              <div className="sec rv">
                <div className="sec-kicker">What Is a Corporator?</div>
                <h2 className="sec-title">
                  Your <em>BMC Corporator</em> — What They Do & How to Reach
                  Them
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    marginBottom: "16px",
                  }}
                >
                  A BMC Corporator (Municipal Councillor) is your elected
                  representative at the ward level — the most local form of
                  democracy in Mumbai. They allocate ward funds, attend to civic
                  complaints, represent your area at the BMC General Body
                  meetings, and are the first point of contact for road repairs,
                  drainage, garden maintenance, streetlights and civic
                  infrastructure.
                </p>
                <div className="card-grid">
                  {CORPORATOR_INFO.map((info, idx) => (
                    <div key={idx} className="data-card">
                      <div className="dc-icon">{info.icon}</div>
                      <div className="dc-title">{info.title}</div>
                      <div className="dc-body">{info.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Find Your Ward Section */}
              <div className="sec rv">
                <div className="sec-kicker">Find Your Ward</div>
                <h2 className="sec-title">
                  Mumbai's <em>24 Administrative Wards</em>
                </h2>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Ward</th>
                        <th>Areas Covered</th>
                        <th>Find Corporator</th>
                      </tr>
                    </thead>
                    <tbody>
                      {WARDS.map((ward, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{ward.code}</td>
                          <td style={{ fontSize: "12px" }}>{ward.areas}</td>
                          <td>
                            <a
                              href="https://www.mcgm.gov.in"
                              target="_blank"
                              rel="noopener"
                              style={{
                                color: "var(--red)",
                                fontWeight: 700,
                                fontSize: "12px",
                              }}
                            >
                              MCGM Portal →
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="cta-bar">
                  <div>
                    <h3>
                      Find Your <em>Corporator</em> Now
                    </h3>
                    <p>
                      MCGM portal has the official list of elected corporators
                      by ward with contact details
                    </p>
                  </div>
                  <a
                    href="https://www.mcgm.gov.in"
                    target="_blank"
                    rel="noopener"
                    className="cta-btn"
                  >
                    Find on MCGM Portal ↗
                  </a>
                </div>
              </div>

              {/* How to File Civic Complaints Section */}
              <div className="sec rv">
                <div className="sec-kicker">How to File Civic Complaints</div>
                <h2 className="sec-title">
                  Get Things <em>Fixed</em> in Your Area — Step by Step
                </h2>
                <ol className="step-list">
                  {COMPLAINT_STEPS.map((step) => (
                    <li key={step.num}>
                      <div className="step-num">{step.num}</div>
                      <div className="step-body">
                        <strong>{step.title}</strong>
                        {step.desc}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Prose Section */}
              <div className="prose rv">
                <h2>
                  Corporator & Ward Guide Mumbai — How Local Democracy Works
                </h2>
                <p>
                  The BMC (Brihanmumbai Municipal Corporation) is the richest
                  municipal corporation in India — with an annual budget of
                  ₹52,000 crore+ (2024). It is governed by 227 elected
                  corporators and a permanent bureaucracy headed by the
                  Municipal Commissioner (an IAS officer). Understanding this
                  structure helps you navigate civic complaints effectively.
                </p>
                <h3>What Is the Standing Committee?</h3>
                <p>
                  The BMC's Standing Committee is the most powerful body — it
                  approves all major tenders and expenditures above ₹5 crore. It
                  consists of senior corporators elected from among themselves.
                  If a major civic project in your area is delayed or seems
                  corrupt, the Standing Committee proceedings (public record)
                  are where you'd find evidence. All committee minutes are
                  available on the MCGM website.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🏙️ BMC <em>Contacts</em>
                </div>
                <div className="sbw-body">
                  {BMC_CONTACTS.map((contact, idx) => (
                    <a
                      key={idx}
                      href={contact.href}
                      target={
                        contact.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        contact.href.startsWith("http") ? "noopener" : undefined
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom:
                          idx < BMC_CONTACTS.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: 700 }}>
                        {contact.icon} {contact.label}
                      </span>
                      <span
                        style={{
                          fontSize: contact.value.includes("↗")
                            ? "10px"
                            : "18px",
                          fontWeight: 800,
                          color: "var(--red)",
                        }}
                      >
                        {contact.value}
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
                    <Link key={idx} href={link.href} className="quick-link">
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
