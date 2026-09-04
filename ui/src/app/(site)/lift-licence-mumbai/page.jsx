// "use client";

import Link from "next/link";
import "./style.css";

export const metadata = {
  title:
    "Lift Licence & Renewal Mumbai 2026 — How to Apply, Fees & Process | Mumbai96",
  description:
    "Complete guide to lift licence and renewal in Mumbai 2026. Learn how to apply for a new lift licence, renewal process, fees, documents required and BMC portal links.",
  keywords:
    "lift licence mumbai, elevator licence renewal mumbai, bmc lift licence, lift registration mumbai 2026, lift inspection mumbai",
  canonical: "https://mumbai96.vercel.app/lift-licence-mumbai",
  openGraph: {
    title: "Lift Licence & Renewal Mumbai 2026 — How to Apply, Fees & Process",
    description:
      "Complete guide to lift licence and renewal in Mumbai. Apply for new lift licence, renewal process, fees and documents required.",
    url: "https://mumbai96.vercel.app/lift-licence-mumbai",
    type: "article",
    siteName: "Mumbai96",
  },
};

const QUICK_LINKS = [
  { href: "/coop-society-mumbai", icon: "🏘️", text: "Co-op Society Bye Laws" },
  { href: "/lift-licence-mumbai", icon: "🛗", text: "Lift Licence & Renewal" },
  { href: "/property-tax-mumbai", icon: "🏦", text: "Property Tax Payment" },
  { href: "/mhada-lottery-mumbai", icon: "🏗️", text: "MHADA Lottery 2026" },
  { href: "/bmc-gardens-mumbai", icon: "🌳", text: "Garden & Tree" },
  { href: "/bmc-schools-mumbai", icon: "🏫", text: "BMC Schools List" },
  {
    href: "/bmc-stray-dogs-vaccination",
    icon: "🐕",
    text: "Stray Dog Vaccination",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Appoint a Licensed Lift Contractor",
    desc: "The lift must be installed by a contractor licensed by BMC. Only BMC-approved contractors can carry out installation in Mumbai.",
  },
  {
    num: "2",
    title: "Submit Application to Ward Office",
    desc: "After installation, the building owner / society submits Form A (application for lift registration) to the concerned ward office along with required documents.",
  },
  {
    num: "3",
    title: "BMC Inspection",
    desc: "BMC's Lift Inspector visits the site to inspect the lift installation for compliance with Maharashtra Lifts Act 1939 and safety norms. This typically takes 15–30 days.",
  },
  {
    num: "4",
    title: "Pay Licence Fee",
    desc: "Fees range from ₹500 to ₹2,000 depending on lift capacity and type. Payment is made online via the MCGM portal or at the ward office cashier.",
  },
  {
    num: "5",
    title: "Receive Lift Licence Certificate",
    desc: "After successful inspection and fee payment, the Lift Licence Certificate is issued. This must be displayed inside the lift at all times.",
  },
];

const RENEWAL_CARDS = [
  {
    icon: "📅",
    title: "When to Apply",
    desc: "Apply for renewal at least 30–45 days before expiry of current licence. BMC processes applications in order of receipt. Late renewal may attract penalties.",
  },
  {
    icon: "📁",
    title: "Documents Required",
    desc: "Current licence copy, AMC (Annual Maintenance Contract) certificate from licensed contractor, building completion certificate and fee challan.",
  },
  {
    icon: "🔍",
    title: "Inspection",
    desc: "BMC inspector re-inspects the lift for safety compliance. Any defects must be rectified before renewal is granted. Inspection report is submitted online.",
  },
];

const DOCUMENTS = [
  {
    item: "Form A — Application",
    desc: "Lift registration application form",
    mandatory: true,
  },
  {
    item: "Contractor's Licence Copy",
    desc: "BMC-approved lift contractor certificate",
    mandatory: true,
  },
  {
    item: "Building Completion Certificate",
    desc: "Occupation Certificate (OC) from BMC",
    mandatory: true,
  },
  {
    item: "AMC Certificate",
    desc: "Annual Maintenance Contract with licensed agency",
    mandatory: true,
  },
  {
    item: "Insurance Certificate",
    desc: "Third-party liability insurance for lift",
    mandatory: true,
  },
  {
    item: "Licence Fee",
    desc: "₹500–₹2,000 depending on capacity",
    mandatory: true,
  },
];

const SAFETY_NORMS = [
  "Emergency phone / intercom connected to ground floor and security",
  "ARD (Automatic Rescue Device) — mandatory for all new lifts post 2016",
  "Overload sensor — must prevent door closing when overloaded",
  "Display of maximum load capacity and number of persons inside lift",
  "Emergency lighting — must function during power failure",
  "Valid licence certificate displayed prominently inside lift cabin",
  "AMC contractor name and emergency contact number displayed inside",
  "Fire recall feature — lift to return to ground floor in case of fire alarm",
];

const BMC_CONTACTS = [
  { icon: "📞", label: "BMC Helpline", value: "1916", href: "tel:1916" },
  {
    icon: "🏢",
    label: "MCGM Portal",
    value: "Apply ↗",
    href: "https://pbmcservices.mcgm.gov.in",
  },
  {
    icon: "🏢",
    label: "BMC Website",
    value: "Visit ↗",
    href: "https://www.mcgm.gov.in",
  },
];

const TIMELINE = [
  { label: "New Application:", value: "30–45 days from submission" },
  { label: "Inspection:", value: "Scheduled within 15–20 days" },
  { label: "Renewal:", value: "Apply 30 days before expiry" },
  { label: "Licence Valid:", value: "1 year from issue date" },
];

export default function LiftLicenceMumbaiPage() {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(255,107,0,.1)",
            top: "-80px",
            right: "-80px",
          }}
        ></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Lift Licence Mumbai</span>
            </div>
            <div className="ph-kicker">
              Mumbai96 · BMC Services · Building Safety
            </div>
            <h1 className="ph-h1">
              Lift <em>Licence</em> &amp;
              &nbsp;
              Renewal <span className="gold">Mumbai 2026</span>
            </h1>
            <p className="ph-desc">
              Comprehensive guide to obtaining and renewing a lift licence in
              Mumbai. Know the process, fees, documents required, inspection
              norms and BMC portal links for all building types.
            </p>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">Annual</div>
                <div className="phs-l">Renewal Frequency</div>
              </div>
              <div className="phs">
                <div className="phs-n">₹500–₹2000</div>
                <div className="phs-l">Approx. Fees</div>
              </div>
              <div className="phs">
                <div className="phs-n">Online</div>
                <div className="phs-l">BMC Portal Application</div>
              </div>
              <div className="phs">
                <div className="phs-n">30 Days</div>
                <div className="phs-l">Processing Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* Official Links */}
              <div className="sec rv">
                <div className="sec-kicker">Official Links</div>
                <h2 className="sec-title">
                  Apply Online — <em>BMC Portals</em>
                </h2>
                <a
                  href="https://pbmcservices.mcgm.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">🏙️</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MCGM Online Services Portal — Lift Licence
                    </div>
                    <div className="lc-desc">
                      Primary portal for new lift registration, annual renewal,
                      inspection scheduling and licence download
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://www.mcgm.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">📋</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      BMC Official Website — Building Permissions
                    </div>
                    <div className="lc-desc">
                      Download forms, fee schedule, inspection norms and contact
                      details for your ward office
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://mahaonline.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">🖥️</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MahaOnline — Government e-Services
                    </div>
                    <div className="lc-desc">
                      Integrated Maharashtra government portal for various
                      building and civic applications
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              {/* Step-by-Step Process */}
              <div className="sec rv">
                <div className="sec-kicker">Step-by-Step Process</div>
                <h2 className="sec-title">
                  How to Apply for <em>New Lift Licence</em>
                </h2>
                <ol className="step-list">
                  {STEPS.map((step) => (
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

              {/* Annual Renewal */}
              <div className="sec rv">
                <div className="sec-kicker">Annual Renewal</div>
                <h2 className="sec-title">
                  Lift Licence <em>Renewal Process</em> — Every Year
                </h2>
                <div className="warn-box">
                  <div className="warn-icon">⚠️</div>
                  <div className="warn-body">
                    <h4>Mandatory Annual Renewal</h4>
                    <p>
                      Under the Maharashtra Lifts Act 1939, every lift licence
                      must be renewed annually before expiry. Operating a lift
                      without a valid licence is a punishable offence and may
                      result in the lift being sealed by BMC.
                    </p>
                  </div>
                </div>
                <div className="card-grid">
                  {RENEWAL_CARDS.map((card, idx) => (
                    <div key={idx} className="data-card">
                      <div className="dc-icon">{card.icon}</div>
                      <div className="dc-title">{card.title}</div>
                      <div className="dc-body">{card.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents & Fees */}
              <div className="sec rv">
                <div className="sec-kicker">Documents & Fees</div>
                <h2 className="sec-title">
                  Required <em>Documents</em> & Fee Structure
                </h2>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Document / Fee</th>
                        <th>Details</th>
                        <th>Mandatory?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DOCUMENTS.map((doc, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{doc.item}</td>
                          <td
                            style={{ fontSize: "12px", color: "var(--muted)" }}
                          >
                            {doc.desc}
                          </td>
                          <td>
                            <span className="tag">
                              {doc.mandatory ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Safety Norms */}
              <div className="sec rv">
                <div className="sec-kicker">Safety Norms</div>
                <h2 className="sec-title">
                  BMC Lift <em>Safety Requirements</em>
                </h2>
                <div className="info-box">
                  <h4>🔒 Mandatory Safety Features in Every Lift</h4>
                  <ul>
                    {SAFETY_NORMS.map((norm, idx) => (
                      <li key={idx}>{norm}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prose Content */}
              <div className="prose rv">
                <h2>Lift Licence in Mumbai — Complete Guide 2026</h2>
                <p>
                  All lifts in Mumbai are regulated under the{" "}
                  <strong>Maharashtra Lifts Act 1939</strong> and BMC's building
                  bye laws. Every lift — residential, commercial or industrial —
                  must have a valid BMC lift licence that is renewed annually.
                  The licence ensures that the lift has passed safety inspection
                  and is maintained by a BMC-approved contractor.
                </p>
                <h3>Who Is Responsible for Lift Licence?</h3>
                <p>
                  The <strong>building owner or housing society</strong> is
                  responsible for obtaining and renewing the lift licence. In
                  co-operative housing societies, the Managing Committee must
                  ensure the lift licence is current. Failure to renew can
                  result in BMC sealing the lift, creating serious inconvenience
                  for residents — especially in high-rise buildings.
                </p>
                <h3>What Happens If Lift Licence Expires?</h3>
                <p>
                  Operating a lift with an expired licence is an offence under
                  the Maharashtra Lifts Act. BMC can seal the lift and issue a
                  penalty. In case of any accident, the building owner may face
                  criminal liability if the lift was running without a valid
                  licence. Always apply for renewal at least 30 days before the
                  expiry date.
                </p>
                <h3>Lift Licence for Old Buildings</h3>
                <p>
                  For old buildings (pre-1990) with existing lifts, BMC has
                  periodically conducted amnesty drives to regularise
                  unregistered lifts. If your building lift does not have a
                  licence, approach the ward office immediately. The process
                  involves inspection, rectification of deficiencies, and
                  payment of compounding fees before a licence can be issued.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  📞 BMC <em>Contacts</em>
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
                            : "16px",
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
                  Quick <em>Links</em>
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

              <div className="sb-widget">
                <div className="sbw-head">
                  ⏱️ Key <em>Timeline</em>
                </div>
                <div
                  className="sbw-body"
                  style={{
                    fontSize: "12px",
                    color: "#374151",
                    fontWeight: 300,
                    lineHeight: 1.9,
                  }}
                >
                  {TIMELINE.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "8px 0",
                        borderBottom:
                          idx < TIMELINE.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      <strong style={{ color: "var(--dark)" }}>
                        {item.label}
                      </strong>{" "}
                      {item.value}
                    </div>
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
