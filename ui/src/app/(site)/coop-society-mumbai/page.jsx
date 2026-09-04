import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

export const metadata = {
  title:
    "Mumbai Co-op Society Bye Laws 2026 — Rules, Rights & Important Links | Mumbai96",
  description:
    "Complete guide to Mumbai housing cooperative society bye laws 2026. Know your rights, committee rules, maintenance charges, AGM rules, dispute redressal and key government links.",
  keywords:
    "mumbai co-op society bye laws, housing society rules mumbai, cooperative housing society mumbai, co-op society rights mumbai, society maintenance rules",
  canonical: "https://mumbai96.vercel.app/coop-society-mumbai",
  openGraph: {
    title:
      "Mumbai Co-op Society Bye Laws 2026 — Rules, Rights & Important Links",
    description:
      "Complete guide to Mumbai housing cooperative society bye laws 2026. Know your rights, committee rules, maintenance charges, AGM rules and dispute redressal.",
    url: "https://mumbai96.vercel.app/coop-society-mumbai",
    type: "article",
    siteName: "Mumbai96",
  },
};

const quickLinks = [
  { href: "/lift-licence-mumbai", icon: "🛗", label: "Lift Licence & Renewal" },
  { href: "/property-tax-mumbai", icon: "🏦", label: "Property Tax Payment" },
  { href: "/mhada-lottery-mumbai", icon: "🏗️", label: "MHADA Lottery 2026" },
  { href: "/bmc-gardens", icon: "🌳", label: "Garden & Tree Permissions" },
];

export default function CoopSocietyMumbaiPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Co-op Society Mumbai" },
        ]}
        kicker="Mumbai96 · Housing Guide · Know Your Rights"
        title={
          <>
            Mumbai <em>Co-op Society</em>
            &nbsp;
            Bye Laws <span className="gold">2026</span>
          </>
        }
        description={
          <>
            Everything Mumbaikars need to know about co-operative housing society
            rules — bye laws, committee powers, maintenance charges, AGM rights,
            dispute redressal and key government portals.
          </>
        }
        stats={[
          { value: "96,000+", label: "Societies in Maharashtra" },
          { value: "1960", label: "MCS Act Enacted" },
          { value: "2014", label: "Model Bye Laws Revised" },
          { value: "Free", label: "Online Registration" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Key Government Links</div>
                <h2 className="sec-title">
                  Official <em>Portals</em> & Resources
                </h2>
                <a
                  href="https://mahasahakar.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🏛️</div>
                  <div className="lc-body">
                    <div className="lc-title">MahaSahakar — Co-op Registrar Portal</div>
                    <div className="lc-desc">
                      Office of the Registrar of Co-operative Societies, Maharashtra.
                      File complaints, check society status, society registration
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://igrmaharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">📝</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      IGR Maharashtra — Share Certificate & Property Docs
                    </div>
                    <div className="lc-desc">
                      Inspector General of Registration — conveyance deeds, share
                      certificate verification, stamp duty
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://maharera.mahaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🏗️</div>
                  <div className="lc-body">
                    <div className="lc-title">MahaRERA — Developer & Project Check</div>
                    <div className="lc-desc">
                      Verify registered projects, check promoter compliance, file
                      complaints against builders
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://www.mcgm.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🏙️</div>
                  <div className="lc-body">
                    <div className="lc-title">MCGM Portal — BMC Property Services</div>
                    <div className="lc-desc">
                      Property tax, water connection, building plan approval, society
                      NOC
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://www.mhada.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🏘️</div>
                  <div className="lc-body">
                    <div className="lc-title">MHADA — Deemed Conveyance & Repair</div>
                    <div className="lc-desc">
                      Apply for deemed conveyance, lottery registration, repair board
                      approvals for old societies
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://www.nationalcooperatives.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🇮🇳</div>
                  <div className="lc-body">
                    <div className="lc-title">National Cooperative Union of India</div>
                    <div className="lc-desc">
                      Central cooperative body — policy updates, training, cooperative
                      development resources
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Know Your Bye Laws</div>
                <h2 className="sec-title">
                  Key Rules Every <em>Member Must Know</em>
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🗳️</div>
                    <div className="dc-title">AGM Rules</div>
                    <div className="dc-body">
                      Annual General Meeting must be held within 6 months of financial
                      year end. Minimum 1/5th members form quorum. 14 days advance notice
                      mandatory to all members.
                    </div>
                    <a
                      href="https://mahasahakar.maharashtra.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      Check Portal ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏗️</div>
                    <div className="dc-title">Managing Committee</div>
                    <div className="dc-body">
                      Elected for 5-year term. Max 21 members or 1/4th of total members
                      (whichever is less). No member can hold office for more than 2
                      consecutive terms.
                    </div>
                    <a
                      href="https://mahasahakar.maharashtra.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      Verify Rules ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">💰</div>
                    <div className="dc-title">Maintenance Charges</div>
                    <div className="dc-body">
                      Must be approved at AGM. Includes: service charge, repair fund
                      (0.75% of cost), sinking fund (0.25% of cost), parking charges, and
                      non-occupancy charge (max 10%).
                    </div>
                    <a
                      href="https://mahasahakar.maharashtra.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      Read Rules ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🔑</div>
                    <div className="dc-title">Transfer of Flat</div>
                    <div className="dc-body">
                      Society can charge transfer premium max ₹25,000. NOC must be issued
                      within 30 days. Society cannot unreasonably refuse membership to
                      buyer.
                    </div>
                    <a
                      href="https://igrmaharashtra.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      IGR Portal ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏠</div>
                    <div className="dc-title">Conveyance Deed</div>
                    <div className="dc-body">
                      Builder must execute conveyance within 4 months of society
                      registration. If delayed, society can apply for Deemed Conveyance via
                      Dy. Registrar under MCS Act Section 11.
                    </div>
                    <a
                      href="https://www.mhada.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      Apply MHADA ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">⚖️</div>
                    <div className="dc-title">Dispute Redressal</div>
                    <div className="dc-body">
                      Disputes between members / society go to Co-operative Court under
                      Section 91 of MCS Act. File complaint with Dy. Registrar of Co-op
                      Societies of your ward.
                    </div>
                    <a
                      href="https://mahasahakar.maharashtra.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      File Complaint ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Maintenance Charges Breakdown</div>
                <h2 className="sec-title">
                  What <em>Societies Can Charge</em> — Legal Limits
                </h2>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Charge Head</th>
                        <th>Basis</th>
                        <th>Legal Limit / Rule</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="dt-label">Service Charge</td>
                        <td className="dt-meta">Per flat, per month</td>
                        <td className="dt-meta">Based on services; approved at AGM</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Repair & Maintenance Fund</td>
                        <td className="dt-meta">Construction cost</td>
                        <td className="dt-meta">
                          Min 0.75% per annum of construction cost
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">Sinking Fund</td>
                        <td className="dt-meta">Construction cost</td>
                        <td className="dt-meta">
                          Min 0.25% per annum of construction cost
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">Non-Occupancy Charge</td>
                        <td className="dt-meta">Service charge %</td>
                        <td className="dt-meta">
                          Max 10% of service charge (SC Ruling 2001)
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">Transfer Premium</td>
                        <td className="dt-meta">One-time on transfer</td>
                        <td className="dt-meta">Max ₹25,000 per transfer</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Parking Charges</td>
                        <td className="dt-meta">Per vehicle slot</td>
                        <td className="dt-meta">As decided at AGM</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Water Charges</td>
                        <td className="dt-meta">Usage or flat-based</td>
                        <td className="dt-meta">Actual BMC/utility charges passed on</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="warn-box">
                  <div className="warn-icon">⚠️</div>
                  <div className="warn-body">
                    <h4>Non-Occupancy Charge Cap — Supreme Court Ruling</h4>
                    <p>
                      The Supreme Court in 2001 capped non-occupancy charges at 10% of
                      service charge. Many societies still illegally charge more. You can
                      challenge this at the Co-operative Court under Section 91 of MCS Act.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Rights & Obligations</div>
                <h2 className="sec-title">
                  Member <em>Rights</em> Under Maharashtra Law
                </h2>
                <div className="info-box">
                  <h4>✅ Rights Every Co-op Society Member Has</h4>
                  <ul>
                    <li>Right to attend and vote at all General Body meetings (AGM / SGM)</li>
                    <li>
                      Right to inspect books of accounts, registers and correspondence of
                      society
                    </li>
                    <li>
                      Right to elect and be elected to the Managing Committee (subject to
                      eligibility)
                    </li>
                    <li>
                      Right to receive audited balance sheet and income-expenditure
                      statement annually
                    </li>
                    <li>
                      Right to challenge illegal decisions at the Co-operative Court under
                      Section 91
                    </li>
                    <li>
                      Right to transfer flat to family member without society permission
                      (blood relatives)
                    </li>
                    <li>
                      Right to sub-let flat with intimation to society (prior permission
                      needed for outsiders)
                    </li>
                    <li>Right to receive Share Certificate within 6 months of joining society</li>
                    <li>
                      Right to receive NOC from society for resale within 30 days of
                      application
                    </li>
                    <li>
                      Right to file complaint with Dy. Registrar against errant Managing
                      Committee
                    </li>
                  </ul>
                </div>
              </div>

              <div className="prose rv">
                <h2>Mumbai Co-operative Housing Society — Complete Guide 2026</h2>
                <p>
                  Mumbai has over <strong>40,000 registered co-operative housing societies</strong>{" "}
                  governed under the Maharashtra Co-operative Societies Act, 1960. Every
                  housing society must register bye laws with the Registrar of Co-operative
                  Societies and operate within the framework of the Model Bye Laws 2014
                  issued by the Maharashtra government.
                </p>
                <h3>How to Register a New Co-op Society in Mumbai</h3>
                <p>
                  A minimum of <strong>10 members</strong> are required to register a
                  co-operative housing society. The application is made to the Deputy
                  Registrar of Co-operative Societies of the relevant ward via the
                  MahaSahakar portal. Documents required include: application form, list
                  of members, bye laws in prescribed format, proof of land/building, and
                  NOC from builder.
                </p>
                <h3>What Are Model Bye Laws 2014?</h3>
                <p>
                  The Maharashtra government issued revised Model Bye Laws in 2014 under the
                  MCS Act. These standardised rules govern all aspects of society functioning
                  — from membership eligibility and committee elections to maintenance
                  charging, fund management, dispute resolution and winding up. All societies
                  must adopt these bye laws.
                </p>
                <h3>What Happens If the Committee Acts Illegally?</h3>
                <p>
                  Members can approach the <strong>Co-operative Court</strong> under Section
                  91 of the MCS Act for disputes between member and society. The Dy.
                  Registrar of Co-operative Societies can also be approached for complaints
                  against a Managing Committee. For urgent matters, members can call a Special
                  General Meeting if signed by minimum 1/5th members.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  📞 Key <em>Contacts</em>
                </div>
                <div className="sbw-body">
                  <a
                    href="https://mahasahakar.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row"
                  >
                    <span className="sb-row-label">🏛️ MahaSahakar Portal</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
                  <a href="tel:18002330055" className="sb-row">
                    <span className="sb-row-label">📞 Co-op Helpline</span>
                    <span className="sb-row-value--sm">1800-233-0055</span>
                  </a>
                  <a
                    href="https://maharera.mahaonline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row"
                  >
                    <span className="sb-row-label">🏗️ MahaRERA</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row last"
                  >
                    <span className="sb-row-label">📝 IGR Maharashtra</span>
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
              <div className="sb-widget">
                <div className="sbw-head">
                  📅 Important <em>Deadlines</em>
                </div>
                <div className="sbw-body sb-list-plain">
                  <div>
                    <strong>AGM:</strong> Within 6 months of financial year end (Sep 30)
                  </div>
                  <div>
                    <strong>Audit:</strong> Within 6 months of year end
                  </div>
                  <div>
                    <strong>NOC:</strong> Within 30 days of application
                  </div>
                  <div>
                    <strong>Election:</strong> Every 5 years via Election Officer
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
