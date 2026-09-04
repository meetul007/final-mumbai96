import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

export const metadata = {
  title:
    "Senior Citizens Mumbai 2026 — Concessions, Healthcare, Legal Rights & Helplines | Mumbai96",
  description:
    "Complete guide for senior citizens in Mumbai 2026. Train and bus concessions, free BMC healthcare, legal rights, pension schemes, elder helplines and best areas to live.",
  keywords:
    "senior citizens mumbai, train concession senior citizen mumbai, elder helpline mumbai, senior citizen legal rights india, bmc hospital senior citizen, helpage india mumbai",
  canonical: "https://mumbai96.vercel.app/senior-citizens-mumbai",
  openGraph: {
    title:
      "Senior Citizens Mumbai 2026 — Concessions, Healthcare, Legal Rights & Helplines",
    description:
      "Train concessions, healthcare, legal rights, pension schemes and elder helplines for senior citizens in Mumbai.",
    url: "https://mumbai96.vercel.app/senior-citizens-mumbai",
    type: "article",
    siteName: "Mumbai96",
  },
};

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

export default function SeniorCitizensMumbaiPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Senior Citizens Mumbai" },
        ]}
        kicker="Mumbai96 · Senior Living · Concessions & Rights"
        title={
          <>
            Mumbai for <em>Senior Citizens</em>
            &nbsp;
            <span className="gold">2026</span>
          </>
        }
        stats={[
          { value: "50%", label: "Train Concession" },
          { value: "14567", label: "Elder Line Helpline" },
          { value: "₹5 Lakh", label: "Health Cover (PMJAY)" },
          { value: "Free", label: "BMC Hospital OPD" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Train & Bus Concessions</div>
                <h2 className="sec-title">
                  Travel <em>Concessions</em> for Senior Citizens
                </h2>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Mode</th>
                        <th>Eligibility</th>
                        <th>Concession</th>
                        <th>How to Apply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="dt-label">Indian Railways (Local Train)</td>
                        <td className="dt-meta">Men 60+, Women 58+</td>
                        <td className="dt-meta">
                          50% on Season Ticket (Freedom Pass)
                        </td>
                        <td className="dt-meta">
                          Any booking counter with age proof
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">Indian Railways (Long Distance)</td>
                        <td className="dt-meta">Men 60+, Women 58+</td>
                        <td className="dt-meta">40% (Men) / 50% (Women)</td>
                        <td className="dt-meta">
                          Online or counter booking — select senior citizen
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">BEST Bus (BMC)</td>
                        <td className="dt-meta">Age 65+</td>
                        <td className="dt-meta">50% on bus pass</td>
                        <td className="dt-meta">
                          BEST depot — senior citizen pass application
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">Metro (All Lines)</td>
                        <td className="dt-meta">Age 60+</td>
                        <td className="dt-meta">50% on smart card</td>
                        <td className="dt-meta">
                          Metro station — senior citizen smart card
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">Air Travel (Domestic)</td>
                        <td className="dt-meta">Age 60+ (varies by airline)</td>
                        <td className="dt-meta">Up to 50% on certain flights</td>
                        <td className="dt-meta">
                          Book via airline website — select senior citizen fare
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Health & Medical</div>
                <h2 className="sec-title">
                  Free & Subsidised <em>Healthcare</em> for Seniors
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">BMC Hospitals — Free OPD</div>
                    <div className="dc-body">
                      All BMC hospitals (KEM, Nair, Sion, Cooper) provide free OPD
                      consultations. Senior citizens get priority queue at BMC hospitals.
                      No registration fee — just Aadhaar card sufficient.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">💊</div>
                    <div className="dc-title">Mahatma Phule Jan Arogya Yojana</div>
                    <div className="dc-body">
                      Maharashtra government scheme — up to ₹1.5 lakh/year cashless
                      treatment at empanelled hospitals. Senior citizens from BPL/APL
                      families eligible. Apply at district health office with Aadhaar +
                      ration card.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🧬</div>
                    <div className="dc-title">Ayushman Bharat — PMJAY</div>
                    <div className="dc-body">
                      Central scheme — ₹5 lakh/year health cover for eligible families.
                      Senior citizens above 70 years now have separate enhanced coverage
                      under AB-PMJAY-Senior scheme (2024). Apply online or at CSC.
                    </div>
                    <a
                      href="https://pmjay.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      Apply ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Legal Rights & Financial</div>
                <h2 className="sec-title">
                  Senior Citizen <em>Legal Rights</em> in Mumbai
                </h2>
                <div className="info-box">
                  <h4>⚖️ Key Legal Protections for Senior Citizens</h4>
                  <ul>
                    <li>
                      <strong>Maintenance & Welfare of Parents Act 2007:</strong>{" "}
                      Children legally obligated to maintain parents. Senior citizen can
                      file complaint at SDM (Sub-Divisional Magistrate) — ₹10,000/month
                      maintenance can be ordered within 90 days
                    </li>
                    <li>
                      <strong>Property Transfer Protection:</strong> Any property
                      transferred by senior citizen to children can be revoked if children
                      fail to provide maintenance. Tribunal at district level handles this.
                    </li>
                    <li>
                      <strong>Senior Citizen Savings Scheme (SCSS):</strong> Post Office
                      SCSS — 8.2% interest per annum (2026 rate), ₹30 lakh max investment,
                      quarterly interest payout. Best guaranteed return for seniors.
                    </li>
                    <li>
                      <strong>Income Tax Exemption:</strong> Senior citizens (60+): No tax
                      up to ₹3 lakh. Super seniors (80+): No tax up to ₹5 lakh. Higher
                      deduction limits on medical insurance.
                    </li>
                    <li>
                      <strong>Elder Line — 14567:</strong> National Elder Helpline — legal
                      aid, abuse support, pension queries. Free call, 8 AM–8 PM.
                    </li>
                    <li>
                      <strong>Priority at Banks:</strong> RBI mandates all banks to have
                      dedicated counters for senior citizens. You cannot be made to stand
                      in regular queue.
                    </li>
                  </ul>
                </div>
                <a
                  href="https://elderline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">📞</div>
                  <div className="lc-body">
                    <div className="lc-title">Elder Line 14567 — National Senior Helpline</div>
                    <div className="lc-desc">
                      Free helpline for seniors — pension, legal aid, abuse support,
                      medical guidance. 8 AM–8 PM daily.
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://helpageindia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">❤️</div>
                  <div className="lc-body">
                    <div className="lc-title">HelpAge India — Mumbai Chapter</div>
                    <div className="lc-desc">
                      Mobile healthcare vans, elder abuse helpline 1800-180-1253, legal aid
                      and caregiver training for seniors across Mumbai
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Senior-Friendly Areas</div>
                <h2 className="sec-title">
                  Best Areas for <em>Senior Citizens</em> to Live in Mumbai
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏡</div>
                    <div className="dc-title">Borivali / Kandivali</div>
                    <div className="dc-body">
                      Clean air, accessible Sanjay Gandhi National Park, good hospitals,
                      flat terrain, strong Gujarati/Jain community network, affordable.
                      National Park proximity means morning walks.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌊</div>
                    <div className="dc-title">Juhu / Santacruz</div>
                    <div className="dc-body">
                      Beach access, walkable promenade, multiple hospitals, good public
                      transport, established residential community. Quieter than South
                      Mumbai while staying well-connected.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌿</div>
                    <div className="dc-title">Mulund / Powai</div>
                    <div className="dc-body">
                      Green surroundings (Sanjay Gandhi NP adjacent), newer construction,
                      flat roads, good hospitals, peaceful atmosphere. Powai lake morning
                      walks. Growing medical infrastructure.
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose rv">
                <h2>Senior Citizens in Mumbai — Complete Resource Guide 2026</h2>
                <p>
                  Mumbai has a significant and growing senior citizen population — over
                  15 lakh residents above 60 years in MMR. Yet this community remains
                  underserved by digital platforms. Mumbai96 is committed to being the most
                  comprehensive resource for senior Mumbaikars — from government schemes
                  and legal rights to social connection and healthcare navigation.
                </p>
                <h3>What Is the Maintenance Tribunal for Senior Citizens?</h3>
                <p>
                  Under the Maintenance and Welfare of Parents and Senior Citizens Act
                  2007, every district has a Maintenance Tribunal. A senior citizen can
                  approach this tribunal directly — without a lawyer — to claim maintenance
                  from their children. The tribunal can order maintenance of up to
                  ₹10,000/month and must dispose of the case within 90 days. For Mumbai,
                  approach the Sub-Divisional Magistrate (SDM) office of your area.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  📞 Senior <em>Helplines</em>
                </div>
                <div className="sbw-body">
                  <a href="tel:14567" className="sb-row">
                    <span className="sb-row-label">🆘 Elder Line</span>
                    <span className="sb-row-value">14567</span>
                  </a>
                  <a href="tel:18001801253" className="sb-row">
                    <span className="sb-row-label">❤️ HelpAge India</span>
                    <span className="sb-row-value--sm">1800-180-1253</span>
                  </a>
                  <a href="tel:1800111363" className="sb-row last">
                    <span className="sb-row-label">💰 Pension Helpline</span>
                    <span className="sb-row-value--sm">1800-111-363</span>
                  </a>
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  🎫 Key <em>Concessions</em>
                </div>
                <div className="sbw-body sb-list-plain">
                  <div>
                    <strong>Local Train:</strong> 50% off (Freedom Pass)
                  </div>
                  <div>
                    <strong>BEST Bus:</strong> 50% pass (age 65+)
                  </div>
                  <div>
                    <strong>Metro:</strong> 50% smart card
                  </div>
                  <div>
                    <strong>Long Distance Rail:</strong> 40–50% off
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
