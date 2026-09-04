import Link from "next/link";
import ScrollReveal from "@/components/common/ScrollReveal";
import "./style.css";

export const metadata = {
  title: "BMC Gardens & Tree Permission Mumbai — Mumbai96",
  description: "Mumbai's BMC manages 1,000+ gardens and is the authority for tree cutting, transplantation and pruning permissions. Know the rules, apply online, protect Mumbai's urban forest.",
};

export default function BmcGardensPage() {
  return (
    <ScrollReveal>
      {/* HERO */}
      <div className="page-hero">
        <div className="ph-grid"></div>

        <div
          className="ph-glow"
          style={{
            background: "rgba(5,150,105,.15)",
            bottom: "-80px",
            left: "-100px",
          }}
        />

        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>BMC Gardens Mumbai</span>
            </div>

            <div className="ph-kicker">
              Mumbai96 · Green Mumbai · BMC Garden Department
            </div>

            <h1 className="ph-h1">
              BMC <em>Gardens</em> & &nbsp;
              Tree Permission <span className="gold">Mumbai 2026</span>
            </h1>

            <p className="ph-desc">
              Mumbai's BMC manages 1,000+ gardens and is the authority for all
              tree cutting, transplantation and pruning permissions. Know the
              rules, apply online and protect Mumbai's urban forest.
            </p>
          </div>
        </div>

        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              {[
                ["1,000+", "BMC Gardens in Mumbai"],
                ["2.7L+", "Trees on BMC Records"],
                ["Online", "Tree Permission Application"],
                ["Illegal", "Felling Without Permit"],
              ].map(([n, l], i) => (
                <div key={i} className="phs">
                  <div className="phs-n">{n}</div>
                  <div className="phs-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* PORTALS */}
              <div className="sec rv">
                <div className="sec-kicker">Official Links</div>
                <h2 className="sec-title">
                  BMC Garden &amp; Tree <em>Portals</em>
                </h2>

                {[
                  {
                    icon: "🌳",
                    title: "BMC Garden Department — Tree NOC Application",
                    desc: "Apply online for tree cutting permission, transplantation NOC and pruning approvals via MCGM portal",
                    href: "https://www.mcgm.gov.in/irj/portal/anonymous?NavigationTarget=navurl://52ee7b4afb1eb762c601f8e9fc0b3f90",
                  },
                  {
                    icon: "🏙️",
                    title: "MCGM Official Website — Garden Department",
                    desc: "Contact BMC's Superintendent of Gardens, garden development applications, green belt notifications",
                    href: "https://www.mcgm.gov.in",
                  },
                  {
                    icon: "📋",
                    title: "MCGM Online Services — Complaint & Applications",
                    desc: "Report illegal tree felling, apply for garden event permission, track status of tree applications",
                    href: "https://pbmcservices.mcgm.gov.in",
                  },
                  {
                    icon: "🌿",
                    title: "Maharashtra Van Mahotsav — Tree Plantation Drive",
                    desc: "Government tree plantation programme — register to participate in urban greening initiatives",
                    href: "https://vanmahotsav.maharashtra.gov.in",
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="link-card"
                  >
                    <div className="lc-icon">{item.icon}</div>
                    <div className="lc-body">
                      <div className="lc-title">{item.title}</div>
                      <div className="lc-desc">{item.desc}</div>
                    </div>
                    <div className="lc-arrow">↗</div>
                  </a>
                ))}
              </div>

              {/* TREE NOC STEPS */}
              <div className="sec rv">
                <div className="sec-kicker">Tree Cutting Permission</div>
                <h2 className="sec-title">
                  How to Get <em>Tree Cutting NOC</em> from BMC
                </h2>

                <div className="warn-box">
                  <div className="warn-icon">🚨</div>
                  <div className="warn-body">
                    <h4>Never Cut a Tree Without BMC Permission</h4>
                    <p>
                      Cutting or damaging a tree without permission is an
                      offence under Maharashtra Trees Act 1975. Penalty up to ₹1
                      lakh per tree.
                    </p>
                  </div>
                </div>

                <ol className="step-list">
                  {[
                    {
                      title: "Submit Application to Ward Garden Department",
                      desc: "Apply at the Garden Superintendent's office of your BMC ward. Mention reasons: construction work, diseased tree, dead tree, danger to life/property. Include property documents.",
                    },
                    {
                      title: "Site Inspection by BMC Arborist",
                      desc: "BMC's Tree Authority or Garden Inspector visits the site to assess the tree — species, age, condition, necessity for removal. Takes 15–30 days.",
                    },
                    {
                      title: "Tree Authority Committee Review",
                      desc: "Mumbai has a Tree Authority Committee (includes BMC officers, NGO representatives, horticulture experts). All tree cutting applications above a threshold are reviewed here.",
                    },
                    {
                      title: "Compensatory Plantation",
                      desc: "If permission is granted, you must plant compensatory trees — typically 3–5 trees for every 1 tree cut. BMC specifies the species and location for plantation.",
                    },
                    {
                      title: "Receive NOC & Proceed",
                      desc: "NOC is valid for 6 months from issue date. Cutting must be done in presence of BMC's Garden Inspector. After completion, a site inspection confirms compliance.",
                    },
                  ].map((step, i) => (
                    <li key={i}>
                      <div className="step-num">{i + 1}</div>
                      <div className="step-body">
                        <strong>{step.title}</strong> {step.desc}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* GARDENS */}
              <div className="sec rv">
                <div className="sec-kicker">Major BMC Gardens</div>
                <h2 className="sec-title">
                  Famous <em>BMC Gardens</em> in Mumbai
                </h2>

                <div className="card-grid">
                  {[
                    "Hanging Gardens",
                    "Kamla Nehru Park",
                    "Byculla Zoo Garden",
                    "Jogger's Park Bandra",
                    "Dadar Chowpatty Garden",
                    "Aarey Colony Green Patch",
                  ].map((name, i) => (
                    <div key={i} className="data-card">
                      <div className="dc-icon">🌿</div>
                      <div className="dc-title">{name}</div>
                      <div className="dc-body">
                        Popular public green space maintained by BMC.
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REPORT */}
              <div className="sec rv">
                <div className="sec-kicker">Reporting & Rights</div>
                <h2 className="sec-title">
                  How to <em>Report Illegal</em> Tree Felling in Mumbai
                </h2>
                <div className="info-box">
                  <h4>🚨 Report Illegal Tree Cutting — Your Rights</h4>
                  <ul>
                    <li>
                      Call BMC helpline <strong>1916</strong> immediately — 24x7
                      available, register complaint with complaint number
                    </li>
                    <li>
                      File complaint on BMC's online portal at mcgm.gov.in →
                      Complaints section
                    </li>
                    <li>
                      Contact the local Ward Garden Superintendent directly with
                      photos and location
                    </li>
                    <li>
                      File complaint with Mumbai Police if illegal felling is in
                      progress
                    </li>
                    <li>
                      Approach Tree Authority Mumbai — any citizen can petition
                      the Tree Authority
                    </li>
                    <li>
                      NGOs like Vanashakti and Bombay Natural History Society
                      (BNHS) actively support tree protection cases
                    </li>
                    <li>
                      File RTI with BMC seeking information on any tree cutting
                      permission for a specific location
                    </li>
                  </ul>
                </div>
              </div>

              <div className="prose rv">
                <h2>
                  BMC Gardens &amp; Tree Authority Mumbai — Complete Guide 2026
                </h2>
                <p>
                  Mumbai's BMC Garden Department manages over{" "}
                  <strong>1,000 public gardens</strong> and is responsible for
                  the preservation of Mumbai's urban tree cover — over 2.7 lakh
                  trees registered on BMC records. The department operates under
                  the Superintendent of Gardens and coordinates with the Tree
                  Authority Mumbai for all tree-related permissions.
                </p>
                <h3>What Is the Maharashtra Trees Act 1975?</h3>
                <p>
                  The{" "}
                  <strong>
                    Maharashtra (Urban Areas) Protection and Preservation of
                    Trees Act 1975
                  </strong>{" "}
                  is the primary law protecting trees in urban Maharashtra.
                  Under this Act, no tree can be cut, uprooted, ring-barked,
                  lopped or damaged without prior permission from the Tree
                  Authority. The Act applies to all trees — whether on public
                  land, private land or within housing societies — in municipal
                  areas.
                </p>
                <h3>Can a Housing Society Cut Trees in Its Compound?</h3>
                <p>
                  A housing society must obtain BMC's Tree Authority permission
                  before cutting any tree in its compound — even for
                  redevelopment or construction. The society needs to submit an
                  application with site plan, tree details and justification.
                  Permission is granted only if the tree is dead, diseased or
                  poses a genuine safety risk. In all other cases, the Tree
                  Authority encourages transplantation over removal.
                </p>
                <h3>How to Adopt a Garden in Mumbai</h3>
                <p>
                  BMC has an <strong>Adopt a Garden</strong> scheme where
                  individuals, corporates or housing societies can adopt and
                  maintain a public garden. The adopted garden bears the
                  adopter's name board. Applications are made to the
                  Superintendent of Gardens at the relevant zonal BMC office.
                  The arrangement is typically for 3 years, renewable subject to
                  satisfactory maintenance.
                </p>
              </div>
            </main>

            {/* SIDEBAR */}
            <aside className="page-sidebar">
              {/* REPORT */}
              <div className="sb-widget">
                <div className="sbw-head">
                  📞 Report <em>Illegal Felling</em>
                </div>

                <div className="sbw-body">
                  <a
                    href="tel:1916"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      🚨 BMC Helpline
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "var(--red)",
                      }}
                    >
                      1916
                    </span>
                  </a>

                  <a
                    href="https://pbmcservices.mcgm.gov.in"
                    target="_blank"
                    rel="noopener"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      💻 File Online Complaint
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "var(--red)",
                      }}
                    >
                      Apply ↗
                    </span>
                  </a>

                  <a
                    href="https://www.mcgm.gov.in"
                    target="_blank"
                    rel="noopener"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700 }}>
                      🌐 MCGM Garden Dept
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "var(--red)",
                      }}
                    >
                      Visit ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="sb-widget">
                <div className="sbw-head">
                  Quick <em>Links</em>
                </div>

                <div className="sbw-body">
                  <Link href="/coop-society-mumbai" className="quick-link">
                    <div className="ql-icon">🏘️</div>
                    <div className="ql-text">Co-op Society Bye Laws</div>
                    <div className="ql-arrow">→</div>
                  </Link>

                  <Link href="/lift-licence-mumbai" className="quick-link">
                    <div className="ql-icon">🛗</div>
                    <div className="ql-text">Lift Licence & Renewal</div>
                    <div className="ql-arrow">→</div>
                  </Link>

                  <Link href="/property-tax-mumbai" className="quick-link">
                    <div className="ql-icon">🏦</div>
                    <div className="ql-text">Property Tax Payment</div>
                    <div className="ql-arrow">→</div>
                  </Link>

                  <Link href="/mhada-lottery-mumbai" className="quick-link">
                    <div className="ql-icon">🏗️</div>
                    <div className="ql-text">MHADA Lottery 2026</div>
                    <div className="ql-arrow">→</div>
                  </Link>

                  <Link href="/bmc-schools-mumbai" className="quick-link">
                    <div className="ql-icon">🏫</div>
                    <div className="ql-text">BMC Schools List</div>
                    <div className="ql-arrow">→</div>
                  </Link>

                  <Link
                    href="/bmc-stray-dogs-vaccination"
                    className="quick-link"
                  >
                    <div className="ql-icon">🐕</div>
                    <div className="ql-text">Stray Dog Vaccination</div>
                    <div className="ql-arrow">→</div>
                  </Link>
                </div>
              </div>

              {/* CHECKLIST */}
              <div className="sb-widget">
                <div className="sbw-head">
                  📋 Tree NOC <em>Checklist</em>
                </div>

                <div
                  className="sbw-body"
                  style={{
                    fontSize: 12,
                    color: "#374151",
                    fontWeight: 300,
                    lineHeight: 1.9,
                  }}
                >
                  {[
                    "Application Form (Ward Garden Office)",
                    "Property ownership documents",
                    "Site plan showing tree location",
                    "Photos of tree (all sides)",
                    "Reason for cutting (written)",
                    "Structural engineer certificate (if danger)",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "6px 0",
                        borderBottom:
                          i !== 5 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      ✅ {item}
                    </div>
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
