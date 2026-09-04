import Link from "next/link";
import "./style.css";

export const metadata = {
  title:
    "BMC Schools List Mumbai 2026 — Free Government Schools, Admission & Contact | Mumbai96",
  description:
    "Complete list of BMC municipal schools in Mumbai 2026. Find free government schools near you, admission process, medium of instruction, school types and contact numbers for all 24 wards.",
  keywords:
    "bmc schools mumbai, municipal schools mumbai, free government school mumbai, bmc school admission 2026, mumbai municipal school list",
  canonical: "https://mumbai96.vercel.app/bmc-schools-mumbai",
  openGraph: {
    title:
      "BMC Schools List Mumbai 2026 — Free Government Schools, Admission & Contact",
    description:
      "Complete list of BMC municipal schools in Mumbai 2026. Free government schools, admission process, and contact for all 24 wards.",
    url: "https://mumbai96.vercel.app/bmc-schools-mumbai",
    type: "article",
    siteName: "Mumbai96",
  },
};

export default function BMCSchoolsMumbaiPage() {
  const WARDS = [
    { name: "A Ward", area: "Colaba, Nariman Point, Fort, CST", schools: "18" },
    {
      name: "B Ward",
      area: "Mandvi, Bhuleshwar, Masjid Bunder",
      schools: "22",
    },
    {
      name: "C Ward",
      area: "Marine Lines, Girgaon, Malabar Hill",
      schools: "15",
    },
    { name: "D Ward", area: "Grant Road, Worli, Tardeo", schools: "28" },
    { name: "E Ward", area: "Byculla, Mazgaon", schools: "32" },
    { name: "F/N Ward", area: "Wadala, Sion", schools: "38" },
    { name: "F/S Ward", area: "Parel, Lalbaug, Sewri", schools: "35" },
    { name: "G/N Ward", area: "Dharavi, Mahim", schools: "42" },
    { name: "H/E Ward", area: "Bandra East, Vakola", schools: "29" },
    { name: "H/W Ward", area: "Bandra West, Khar", schools: "18" },
    { name: "K/E Ward", area: "Andheri East, Chakala, MIDC", schools: "44" },
    { name: "K/W Ward", area: "Andheri West, Versova, Juhu", schools: "38" },
    { name: "P/N Ward", area: "Goregaon, Film City", schools: "46" },
    { name: "R/N Ward", area: "Borivali, Dahisar", schools: "55" },
    { name: "T Ward", area: "Mulund, Nahur", schools: "40" },
  ];

  const ADMISSION_CARDS = [
    {
      icon: "📅",
      title: "Admission Season",
      body: "BMC school admissions for Std 1 begin in June (new academic year). Applications are accepted from March–May. Mid-year transfers are accepted with TC from previous school.",
    },
    {
      icon: "📋",
      title: "Documents Required",
      body: "Birth certificate, Aadhaar card of child and parents, previous school Transfer Certificate (TC), address proof, caste certificate (if applicable), and passport photo.",
    },
    {
      icon: "🆓",
      title: "What's Free",
      body: "Tuition, textbooks (SSC syllabus), midday meal (Shiv Bhojan), school uniform (one set per year), and basic stationery. No registration fee for Std 1–8 under RTE.",
    },
  ];

  const LANGUAGES = [
    {
      name: "Marathi Medium",
      desc: "Largest network; SSC board; standard 1–10",
    },
    {
      name: "Hindi Medium",
      desc: "Widely available across all wards for Hindi-speaking communities",
    },
    {
      name: "English Medium",
      desc: "Select schools across Mumbai; high demand, limited seats",
    },
    {
      name: "Urdu Medium",
      desc: "Available in M Ward (Govandi, Mankhurd), F Ward (Nagpada) and others",
    },
    {
      name: "Gujarati Medium",
      desc: "Available in B, C and D wards serving Gujarati community",
    },
    {
      name: "Tamil, Telugu, Kannada",
      desc: "Selected schools in areas with South Indian population",
    },
    {
      name: "Bengali, Sindhi",
      desc: "Specific schools serving respective communities",
    },
  ];

  const QUICK_LINKS = [
    {
      icon: "🏘️",
      text: "Co-op Society Bye Laws",
      href: "/coop-society-mumbai",
    },
    {
      icon: "🛗",
      text: "Lift Licence & Renewal",
      href: "/lift-licence-mumbai",
    },
    { icon: "🏦", text: "Property Tax Payment", href: "/property-tax-mumbai" },
    { icon: "🏗️", text: "MHADA Lottery 2026", href: "/mhada-lottery-mumbai" },
    { icon: "🌳", text: "Garden & Tree", href: "/bmc-gardens-mumbai" },
    {
      icon: "🐕",
      text: "Stray Dog Vaccination",
      href: "/bmc-stray-dogs-vaccination",
    },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700;800&display=swap');
        `}
      </style>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(55,27,88,.4)",
            bottom: "-80px",
            left: "-80px",
          }}
        ></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(245,166,35,.08)",
            top: "-80px",
            right: "-80px",
          }}
        ></div>

        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>BMC Schools Mumbai</span>
            </div>
            <div className="ph-kicker">
              Mumbai96 · Education · Free Government Schools
            </div>
            <h1 className="ph-h1">
              BMC <em>Schools</em> List
              &nbsp;
              <span className="gold">Mumbai 2026</span>
            </h1>
            <p className="ph-desc">
              Mumbai's BMC runs over 1,200 free municipal schools across all 24
              wards — the largest urban school network in India. Find schools
              near you, admission process, medium of instruction and important
              education portals.
            </p>
          </div>
        </div>

        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">1,200+</div>
                <div className="phs-l">BMC Schools in Mumbai</div>
              </div>
              <div className="phs">
                <div className="phs-n">3.5L+</div>
                <div className="phs-l">Students Enrolled</div>
              </div>
              <div className="phs">
                <div className="phs-n">Free</div>
                <div className="phs-l">Education for All</div>
              </div>
              <div className="phs">
                <div className="phs-n">11</div>
                <div className="phs-l">Languages of Instruction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            {/* Main Content */}
            <main>
              {/* Education Links */}
              <section className="sec rv">
                <div className="sec-kicker">Official Education Links</div>
                <h2 className="sec-title">
                  BMC Education <em>Portals</em> & Resources
                </h2>

                <a
                  href="https://www.mcgm.gov.in/irj/portal/anonymous?NavigationTarget=navurl://7d474a1c37d61a52fd78e8f8a1e58591"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">🏫</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      BMC Education Department — MCGM
                    </div>
                    <div className="lc-desc">
                      Official BMC education portal — school list, admission
                      process, school data and department contacts
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
                  <div className="lc-icon">🏙️</div>
                  <div className="lc-body">
                    <div className="lc-title">MCGM Portal — Civic Services</div>
                    <div className="lc-desc">
                      BMC's main portal for all civic services including
                      education, health, and building permissions
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>

                <a
                  href="https://www.education.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">📚</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      Maharashtra Education Department
                    </div>
                    <div className="lc-desc">
                      State education policy, scholarship schemes, SSC results,
                      teacher recruitment and school registration
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>

                <a
                  href="https://rte25.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">📖</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      RTE 25% Admission Portal — Maharashtra
                    </div>
                    <div className="lc-desc">
                      Apply for free admission in private schools under RTE 25%
                      quota. Available for children aged 6–14
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>

                <a
                  href="https://mahascholarship.co.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">🎓</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      Maharashtra Scholarship Portal
                    </div>
                    <div className="lc-desc">
                      Apply for pre-matric and post-matric scholarships, merit
                      scholarship and EBC scholarships for Mumbai students
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </section>

              {/* Ward-Wise Schools */}
              <section className="sec rv">
                <div className="sec-kicker">Ward-Wise Schools</div>
                <h2 className="sec-title">
                  BMC Schools by <em>Ward — All 24 Wards</em>
                </h2>

                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Ward</th>
                        <th>Area</th>
                        <th>Approx. Schools</th>
                        <th>Admission Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {WARDS.map((ward) => (
                        <tr key={ward.name}>
                          <td style={{ fontWeight: "700" }}>{ward.name}</td>
                          <td
                            style={{ color: "var(--muted)", fontSize: "12px" }}
                          >
                            {ward.area}
                          </td>
                          <td style={{ fontWeight: "700" }}>{ward.schools}</td>
                          <td>
                            <a
                              href="tel:1916"
                              style={{
                                color: "var(--red)",
                                fontWeight: "700",
                                fontSize: "12px",
                              }}
                            >
                              Call 1916 →
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Admission Process */}
              <section className="sec rv">
                <div className="sec-kicker">Admission Process</div>
                <h2 className="sec-title">
                  BMC School <em>Admission</em> — How to Enroll 2026
                </h2>

                <div className="card-grid">
                  {ADMISSION_CARDS.map((card) => (
                    <div key={card.title} className="data-card">
                      <div className="dc-icon">{card.icon}</div>
                      <div className="dc-title">{card.title}</div>
                      <div className="dc-body">{card.body}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages & Types */}
              <section className="sec rv">
                <div className="sec-kicker">Languages & Types</div>
                <h2 className="sec-title">
                  BMC School <em>Types</em> by Medium
                </h2>

                <div className="info-box">
                  <h4>🌍 11 Languages of Instruction in BMC Schools</h4>
                  <ul>
                    {LANGUAGES.map((lang) => (
                      <li key={lang.name}>
                        <strong>{lang.name}</strong> — {lang.desc}
                      </li>
                    ))}
                    <li>
                      All schools follow Maharashtra SSC Board curriculum; CBSE
                      not offered in BMC schools
                    </li>
                  </ul>
                </div>

                <div className="warn-box">
                  <div className="warn-icon">🍱</div>
                  <div className="warn-body">
                    <h4>Shiv Bhojan Midday Meal Scheme</h4>
                    <p>
                      All BMC school students receive a free hot midday meal
                      under the Shiv Bhojan scheme. The meal is nutritionally
                      planned and served on all school working days. Contact
                      your school's head teacher for details.
                    </p>
                  </div>
                </div>
              </section>

              {/* Main Content / Prose */}
              <article className="prose rv">
                <h2>BMC Municipal Schools Mumbai — Complete Guide 2026</h2>
                <p>
                  Mumbai's Brihanmumbai Municipal Corporation (BMC) operates one
                  of India's largest urban school networks — over{" "}
                  <strong>1,200 schools with 3.5 lakh+ students</strong> across
                  the city. BMC schools offer free education from Std 1 to 10
                  following the Maharashtra SSC Board curriculum, in 11 regional
                  languages.
                </p>

                <h3>Are BMC Schools Really Free?</h3>
                <p>
                  Yes. Under the{" "}
                  <strong>Right to Education (RTE) Act 2009</strong>, education
                  in government schools is free and compulsory for children aged
                  6–14 (Std 1–8). BMC provides free textbooks, uniforms, midday
                  meals and stationery. For Std 9–10, tuition is free but
                  students may pay nominal examination fees to the SSC Board
                  directly.
                </p>

                <h3>What Is the RTE 25% Quota in Private Schools?</h3>
                <p>
                  Under the RTE Act, 25% of seats in all private unaided schools
                  in Mumbai must be reserved for children from economically
                  weaker sections and disadvantaged groups. Applications are
                  made via the Maharashtra RTE portal at
                  rte25.maharashtra.gov.in. This gives access to premium private
                  schools at zero cost. The state government reimburses the
                  school for these students.
                </p>

                <h3>BMC School Infrastructure — Upgrades in 2026</h3>
                <p>
                  BMC has been upgrading schools under the{" "}
                  <strong>School Rebuilding Programme</strong> — constructing
                  new buildings, adding digital classrooms, CCTV cameras,
                  toilets (separate for girls and boys) and playgrounds. Many
                  BMC schools now have computer labs and e-learning facilities
                  under the Digital Mumbai initiative.
                </p>
              </article>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              {/* Helplines Widget */}
              <div className="sb-widget">
                <div className="sbw-head">
                  📞 School <em>Helplines</em>
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
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>
                      📞 BMC Helpline
                    </span>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "800",
                        color: "var(--red)",
                      }}
                    >
                      1916
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
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>
                      🌐 BMC Education
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "800",
                        color: "var(--red)",
                      }}
                    >
                      Visit ↗
                    </span>
                  </a>
                  <a
                    href="https://rte25.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>
                      📖 RTE 25% Admission
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "800",
                        color: "var(--red)",
                      }}
                    >
                      Apply ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* Quick Links Widget */}
              <div className="sb-widget">
                <div className="sbw-head">
                  Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {QUICK_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="quick-link"
                    >
                      <div className="ql-icon">{link.icon}</div>
                      <div className="ql-text">{link.text}</div>
                      <div className="ql-arrow">→</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Academic Calendar Widget */}
              <div className="sb-widget">
                <div className="sbw-head">
                  📅 Academic <em>Calendar</em>
                </div>
                <div
                  className="sbw-body"
                  style={{
                    fontSize: "12px",
                    color: "#374151",
                    fontWeight: "300",
                    lineHeight: "1.9",
                  }}
                >
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <strong style={{ color: "var(--dark)" }}>
                      New Admission:
                    </strong>{" "}
                    March–May
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <strong style={{ color: "var(--dark)" }}>
                      School Opens:
                    </strong>{" "}
                    June 15
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <strong style={{ color: "var(--dark)" }}>
                      Diwali Break:
                    </strong>{" "}
                    October
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <strong style={{ color: "var(--dark)" }}>SSC Exams:</strong>{" "}
                    February–March
                  </div>
                  <div style={{ padding: "6px 0" }}>
                    <strong style={{ color: "var(--dark)" }}>
                      Summer Break:
                    </strong>{" "}
                    May–June
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
