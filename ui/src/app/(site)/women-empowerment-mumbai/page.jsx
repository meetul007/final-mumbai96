import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

const quickLinks = [
  { href: "/coop-society-mumbai", icon: "🏘️", label: "Co-op Society Bye Laws" },
  { href: "/lift-licence-mumbai", icon: "🛗", label: "Lift Licence & Renewal" },
  { href: "/property-tax-mumbai", icon: "🏦", label: "Property Tax Payment" },
  { href: "/mhada-lottery-mumbai", icon: "🏗️", label: "MHADA Lottery 2026" },
  { href: "/mumbai-exhibitions", icon: "🎪", label: "Mumbai Exhibitions 2026" },
  { href: "/save-electricity-mumbai", icon: "⚡", label: "Save Electricity Mumbai" },
  { href: "/coop-society-imp-mumbai", icon: "🏢", label: "Society IMP Guide" },
  { href: "/mumbai-lost-found", icon: "🔍", label: "Mumbai Lost & Found" },
  { href: "/ngos-mumbai", icon: "🤝", label: "Verified NGOs Mumbai" },
  { href: "/women-empowerment-mumbai", icon: "👩", label: "Women Empowerment" },
];

export default function WomenEmpowermentPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Women Empowerment Mumbai" },
        ]}
        kicker="Mumbai96 · Shakti · Women's Rights & Schemes"
        title={
          <>
            Women <em>Empowerment</em>
            &nbsp;
            <span className="gold">Mumbai 2026</span>
          </>
        }
        description={
          <>
            Maharashtra&apos;s Women &amp; Child Development Department offers
            dozens of schemes, legal protections, helplines and training programmes
            for women in Mumbai. Know your rights, access your benefits.
          </>
        }
        stats={[
          { value: "181", label: "Women Helpline (Free)" },
          { value: "50+", label: "Govt Schemes Available" },
          { value: "Free", label: "Legal Aid for Women" },
          { value: "24x7", label: "Emergency Support" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
            <div className="sec rv">
              <div className="sec-kicker">Official Government Portals</div>
              <h2 className="sec-title">
                Maharashtra Women &amp; Child{" "}
                <em>Government Portals</em>
              </h2>
              <div className="cta-bar">
                <div>
                  <h3>
                    Maharashtra <em>Women &amp; Child Portal</em>
                  </h3>
                  <p>
                    Official gateway for all Maharashtra government schemes,
                    helplines and services for women and children
                  </p>
                </div>
                <a
                  href="https://womenchild.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn"
                >
                  Visit womenchild.maharashtra.gov.in &#8599;
                </a>
              </div>
              <a
                href="https://womenchild.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">👩</div>
                <div className="lc-body">
                  <div className="lc-title">
                    Women &amp; Child Development Department — Maharashtra
                  </div>
                  <div className="lc-desc">
                    Official Maharashtra WCD portal — schemes, welfare programmes,
                    circulars, helplines and district offices
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://mahashasakti.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">💪</div>
                <div className="lc-body">
                  <div className="lc-title">MahaShasakti — Maharashtra Women&apos;s Commission</div>
                  <div className="lc-desc">
                    Maharashtra State Commission for Women — file complaint against
                    discrimination, harassment, workplace issues
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://www.ncw.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">🏛️</div>
                <div className="lc-body">
                  <div className="lc-title">National Commission for Women (NCW)</div>
                  <div className="lc-desc">
                    File online complaints about crimes against women, domestic violence,
                    harassment. NCW reviews complaints from all states.
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://wcd.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">🇮🇳</div>
                <div className="lc-body">
                  <div className="lc-title">Ministry of Women &amp; Child Development — India</div>
                  <div className="lc-desc">
                    Central government women&apos;s welfare — Beti Bachao Beti Padhao,
                    Mahila Shakti Kendras, One Stop Centre scheme
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://oscdelhi.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">🏥</div>
                <div className="lc-body">
                  <div className="lc-title">One Stop Centre — Sakhi (Violence Support)</div>
                  <div className="lc-desc">
                    One Stop Centres provide medical, legal, psychological and shelter
                    support for women in distress under one roof. Present in Mumbai.
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">Emergency Helplines</div>
              <h2 className="sec-title">
                Call Now — <em>Women&apos;s Helplines</em> Mumbai
              </h2>
              <div className="warn-box">
                <div className="warn-icon">🚨</div>
                <div className="warn-body">
                  <h4>
                    In Danger? Call 112 (Police Emergency) or 181 (Women Helpline)
                  </h4>
                  <p>
                    All calls to 181 Women Helpline are free, confidential and
                    24x7. Trained counsellors provide immediate support, connect you
                    to police, legal aid, shelter and medical assistance. You do
                    not need to be in immediate danger to call — any woman in
                    distress can call.
                  </p>
                </div>
              </div>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Helpline</th>
                      <th>Number</th>
                      <th>Service</th>
                      <th>Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="dt-label">Women Helpline</td>
                      <td className="dt-number">181</td>
                      <td className="dt-meta">
                        Emergency support, counselling, shelter referral
                      </td>
                      <td className="dt-meta">24x7</td>
                    </tr>
                    <tr>
                      <td className="dt-label">Police Emergency</td>
                      <td className="dt-number">112</td>
                      <td className="dt-meta">
                        Immediate police response, crime in progress
                      </td>
                      <td className="dt-meta">24x7</td>
                    </tr>
                    <tr>
                      <td className="dt-label">
                        Mumbai Police (Women&apos;s Cell)
                      </td>
                      <td className="dt-number">022-2262-0111</td>
                      <td className="dt-meta">
                        Crimes against women, stalking, harassment
                      </td>
                      <td className="dt-meta">24x7</td>
                    </tr>
                    <tr>
                      <td className="dt-label">Domestic Violence Helpline</td>
                      <td className="dt-number">1091</td>
                      <td className="dt-meta">
                        Domestic abuse support, shelter, legal aid
                      </td>
                      <td className="dt-meta">24x7</td>
                    </tr>
                    <tr>
                      <td className="dt-label">iCall — TISS</td>
                      <td className="dt-number">9152987821</td>
                      <td className="dt-meta">
                        Free psychological counselling, mental health
                      </td>
                      <td className="dt-meta">Mon–Sat 8am–10pm</td>
                    </tr>
                    <tr>
                      <td className="dt-label">NCW Complaint</td>
                      <td className="dt-number">7827170170</td>
                      <td className="dt-meta">
                        National Commission for Women complaints
                      </td>
                      <td className="dt-meta">WhatsApp + Call</td>
                    </tr>
                    <tr>
                      <td className="dt-label">Childline (for minors)</td>
                      <td className="dt-number">1098</td>
                      <td className="dt-meta">
                        Children in need — abuse, missing, exploitation
                      </td>
                      <td className="dt-meta">24x7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">Government Schemes</div>
              <h2 className="sec-title">
                Key Maharashtra <em>Women&apos;s Schemes</em> 2026
              </h2>
              <div className="card-grid">
                <div className="data-card">
                  <div className="dc-icon">💰</div>
                  <div className="dc-title">Ladki Bahin Yojana</div>
                  <div className="dc-body">
                    Maharashtra government&apos;s flagship scheme — ₹1,500/month
                    direct benefit to eligible married women aged 21–65. Apply via
                    official portal or common service centres. Aadhaar + bank
                    account needed.
                  </div>
                  <a
                    href="https://ladakibahin.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Apply Now ↗
                  </a>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🏠</div>
                  <div className="dc-title">Widow Homes &amp; Shelter</div>
                  <div className="dc-body">
                    Maharashtra WCD runs shelter homes (Mahila Sanstha) for
                    widows, destitute women and survivors of violence. Free stay,
                    meals, counselling and skill training. Apply at district WCD
                    office.
                  </div>
                  <a
                    href="https://womenchild.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Apply ↗
                  </a>
                </div>
                <div className="data-card">
                  <div className="dc-icon">📚</div>
                  <div className="dc-title">Skill Development — MSSDS</div>
                  <div className="dc-body">
                    Maharashtra Skill Development Scheme — free vocational training
                    for women in sewing, beauty, computer basics, food processing,
                    healthcare. Apply at local skill development centre.
                  </div>
                  <a
                    href="https://mssds.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Register ↗
                  </a>
                </div>
                <div className="data-card">
                  <div className="dc-icon">💳</div>
                  <div className="dc-title">Mazi Ladki Bahin — Bank Account</div>
                  <div className="dc-body">
                    Jan Dhan account + Aadhaar + Mobile (JAM Trinity) is the gateway
                    to most women&apos;s schemes. Ensure all women in family have
                    their own bank account linked to Aadhaar for direct benefit
                    transfer.
                  </div>
                  <a
                    href="https://www.pmjdy.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Open Account ↗
                  </a>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🏗️</div>
                  <div className="dc-title">MHADA Housing for Women</div>
                  <div className="dc-body">
                    Women applicants get reservation in MHADA lottery — EWS and LIG
                    categories have women-only quota. Single women are also eligible
                    as sole applicants. Apply at mhada.gov.in.
                  </div>
                  <a
                    href="https://lottery.mhada.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Apply ↗
                  </a>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🌸</div>
                  <div className="dc-title">Savitribai Phule Scholarship</div>
                  <div className="dc-body">
                    Maharashtra state scholarship for girl students — covers
                    tuition, hostel, and living expenses for girl students from
                    OBC/SBC/NT/VJNT categories studying in government and aided
                    colleges.
                  </div>
                  <a
                    href="https://mahaeschol.maharashtra.gov.in"
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
              <div className="sec-kicker">Legal Rights</div>
              <h2 className="sec-title">
                Know Your <em>Legal Rights</em> as a Woman in Mumbai
              </h2>
              <div className="info-box">
                <h4>⚖️ Important Legal Protections for Women in India</h4>
                <ul>
                  <li>
                    <strong>Domestic Violence Act 2005:</strong> Protection from
                    physical, emotional, economic and sexual abuse by
                    partner/family. File at Magistrate Court or approach DLSA for
                    free legal aid.
                  </li>
                  <li>
                    <strong>POSH Act 2013:</strong> Every workplace with 10+
                    employees must have Internal Complaints Committee (ICC). Sexual
                    harassment complaints must be resolved in 90 days.
                  </li>
                  <li>
                    <strong>Section 498A IPC:</strong> Cruelty by husband/in-laws
                    is a cognizable, non-bailable offence. FIR can be filed at any
                    police station.
                  </li>
                  <li>
                    <strong>Maintenance Rights:</strong> Under CrPC Section 125,
                    wife and minor children have right to maintenance. Application
                    at Family Court, Bandra (Mumbai suburbs) or City Civil Court.
                  </li>
                  <li>
                    <strong>Property Rights:</strong> Hindu women have equal right
                    to ancestral property under Hindu Succession Act 2005 amendment.
                    Cannot be excluded from father&apos;s property.
                  </li>
                  <li>
                    <strong>Maternity Benefit Act 2017:</strong> 26 weeks paid
                    maternity leave for women in establishments with 10+
                    employees. Creche facility mandatory for 50+ employee workplaces.
                  </li>
                  <li>
                    <strong>Free Legal Aid:</strong> DLSA (District Legal Services
                    Authority) Mumbai provides free legal aid to women, SC/ST,
                    children and economically weaker citizens. Contact:
                    022-2305-0500
                  </li>
                </ul>
              </div>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">Skill & Livelihood</div>
              <h2 className="sec-title">
                Skill Development &amp; <em>Livelihood Programmes</em>
              </h2>
              <a
                href="https://www.nrlm.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">🏭</div>
                <div className="lc-body">
                  <div className="lc-title">DAY-NRLM — Self Help Group (SHG) Programme</div>
                  <div className="lc-desc">
                    Join or form a women&apos;s Self Help Group — access micro-credit
                    (₹1–₹5 lakh), skill training, market linkage and government schemes. 1
                    crore+ SHGs pan-India.
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://mssds.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">💻</div>
                <div className="lc-body">
                  <div className="lc-title">MSSDS — Maharashtra Skill Training Centres</div>
                  <div className="lc-desc">
                    Free skill training for women — beauty &amp; wellness, sewing &amp;
                    fashion, food processing, computer basics, healthcare assistant.
                    Centres across Mumbai wards.
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://www.standupmitra.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">💰</div>
                <div className="lc-body">
                  <div className="lc-title">Stand Up India — Women Entrepreneur Loans</div>
                  <div className="lc-desc">
                    Dedicated loan scheme for SC/ST and women entrepreneurs — ₹10 lakh to
                    ₹1 crore for greenfield enterprises. Apply at any scheduled bank.
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://www.mudra.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">🏦</div>
                <div className="lc-body">
                  <div className="lc-title">MUDRA Yojana — Micro Business Loan</div>
                  <div className="lc-desc">
                    Collateral-free business loans ₹50,000–₹10 lakh for women entrepreneurs
                    (Shishu, Kishore, Tarun categories). Apply at any bank or NBFC.
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
            </div>

            <div className="prose rv">
              <h2>Women Empowerment in Mumbai — Complete Guide 2026</h2>
              <p>
                Maharashtra is one of India&apos;s most progressive states for
                women&apos;s welfare — from the legacy of social reformers like
                Savitribai Phule and Dr. Babasaheb Ambedkar to modern legislation
                like the Ladki Bahin Yojana. Mumbai, as the state&apos;s capital
                city, has the densest concentration of government offices, NGOs,
                legal aid centres and skill development programmes for women.
              </p>
              <h3>What Is the One Stop Centre (Sakhi)?</h3>
              <p>
                One Stop Centres (OSC), branded as &quot;Sakhi&quot;, are
                government-funded centres providing integrated support services to
                women affected by violence — police assistance, medical aid, legal
                aid, psychological counselling and temporary shelter — all under
                one roof. Mumbai has multiple Sakhi centres. Contact the 181 helpline
                to reach the nearest Sakhi centre.
              </p>
              <h3>Ladki Bahin Yojana — Am I Eligible?</h3>
              <p>
                The Maharashtra Ladki Bahin Yojana provides ₹1,500/month to married,
                divorced, widowed or abandoned women aged 21–65 whose family income
                is below ₹2.5 lakh/year. The woman must be a Maharashtra domicile and
                must not be a government employee or income taxpayer. Apply via the
                official portal at ladakibahin.maharashtra.gov.in or at any common
                service centre (Jan Seva Kendra).
              </p>
              <h3>Women Safety in Mumbai — Nirbhaya Fund Initiatives</h3>
              <p>
                Mumbai Police has deployed women safety measures under the Nirbhaya
                Fund — CCTV in public areas, panic buttons at bus stops, fast-track
                courts for crimes against women, and dedicated women&apos;s police
                stations. The <strong>Suraksha App</strong> by Mumbai Police allows
                women to send SOS location alerts to police and emergency contacts.
              </p>
            </div>
            </main>
            <aside className="page-sidebar">
            <div className="sb-widget">
              <div className="sbw-head">
                🚨 Emergency <em>Helplines</em>
              </div>
              <div className="sbw-body">
                <a href="tel:181" className="sb-row">
                  <span className="sb-row-label">👩 Women Helpline</span>
                  <span className="sb-row-value">181</span>
                </a>
                <a href="tel:112" className="sb-row">
                  <span className="sb-row-label">🚔 Police Emergency</span>
                  <span className="sb-row-value">112</span>
                </a>
                <a href="tel:1091" className="sb-row">
                  <span className="sb-row-label">🏠 Domestic Violence</span>
                  <span className="sb-row-value sb-row-value--md">1091</span>
                </a>
                <a href="tel:9152987821" className="sb-row">
                  <span className="sb-row-label">💙 iCall Counselling</span>
                  <span className="sb-row-value sb-row-value--sm">
                    9152987821
                  </span>
                </a>
              </div>
            </div>
            <div className="sb-widget">
              <div className="sbw-head">
                🔗 Key <em>Portals</em>
              </div>
              <div className="sbw-body">
                <a
                  href="https://womenchild.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">👩 WCD Maharashtra</span>
                  <span className="sb-row-value--cta">Visit ↗</span>
                </a>
                <a
                  href="https://ladakibahin.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">💰 Ladki Bahin Yojana</span>
                  <span className="sb-row-value--cta">Apply ↗</span>
                </a>
                <a
                  href="https://www.ncw.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">🏛️ NCW Complaint</span>
                  <span className="sb-row-value--cta">File ↗</span>
                </a>
                <a
                  href="https://mahashasakti.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">💪 MahaShasakti</span>
                  <span className="sb-row-value--cta">Visit ↗</span>
                </a>
              </div>
            </div>
            <div className="sb-widget">
              <div className="sbw-head">
                Quick <em>Links</em>
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
