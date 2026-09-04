// import "./style.css";
const MhadaLottery = () => {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>

        <div
          className="ph-glow"
          style={{ background: "rgba(5,150,105,.12)" }}
        ></div>

        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <a href="/">Home</a>
              <span>/</span>
              <span>MHADA Lottery</span>
            </div>

            <div className="ph-kicker">
              Mumbai96 · Housing Guide · MHADA Affordable Housing
            </div>

            <h1 className="ph-h1">
              MHADA <em>Lottery</em> Mumbai 2026 — Complete Application Guide
            </h1>

            <p className="ph-desc">
              MHADA lottery is one of Mumbai's best chances for affordable
              housing. Here's exactly how to apply, what categories exist, what
              documents you need and how to check results.
            </p>
          </div>
        </div>

        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">mhada.gov.in</div>
                <div className="phs-l">Official Portal</div>
              </div>

              <div className="phs">
                <div className="phs-n">₹15L–₹2.5Cr</div>
                <div className="phs-l">Price Range</div>
              </div>

              <div className="phs">
                <div className="phs-n">5 Schemes</div>
                <div className="phs-l">Categories</div>
              </div>

              <div className="phs">
                <div className="phs-n">Free</div>
                <div className="phs-l">Application</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* SECTION 1 */}
              <div className="sec rv">
                <div className="sec-kicker">What is MHADA?</div>

                <h2 className="sec-title">
                  MHADA <em>Lottery</em> — Everything You Need to Know
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
                  MHADA (Maharashtra Housing and Area Development Authority)
                  runs affordable housing lotteries across Mumbai — offering
                  flats at rates significantly below market value in prime and
                  suburban locations. The lottery is open to all eligible
                  residents and is completely transparent — a computerised
                  random draw decides the winners.
                </p>

                <div className="warn-box">
                  <div className="warn-icon">🏠</div>
                  <div className="warn-body">
                    <h4>MHADA 2026 Lottery — Stay Updated</h4>
                    <p>
                      MHADA lotteries are announced 2–3 times a year.
                      Registration windows are typically open for 30–45 days.
                      Subscribe to updates at mhada.gov.in or follow Mumbai96
                      for notification when the next lottery opens.
                    </p>
                  </div>
                </div>

                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏙️</div>
                    <div className="dc-title">Mumbai Board Lottery</div>
                    <div className="dc-body">
                      Mumbai-specific lottery by the Mumbai Housing and Area
                      Development Board. Covers areas across Mumbai city and
                      suburbs.
                    </div>
                    <div className="dc-cta" style={{ cursor: "pointer" }}>
                      Apply at mhada.gov.in →
                    </div>
                  </div>

                  <div className="data-card">
                    <div className="dc-icon">🏘️</div>
                    <div className="dc-title">Konkan Board Lottery</div>
                    <div className="dc-body">
                      Covers Thane, Raigad and peripheral areas of MMR. Often
                      has more units available at lower price points.
                    </div>
                    <div className="dc-cta" style={{ cursor: "pointer" }}>
                      Apply at mhada.gov.in →
                    </div>
                  </div>

                  <div className="data-card">
                    <div className="dc-icon">👴</div>
                    <div className="dc-title">Senior Citizen Scheme</div>
                    <div className="dc-body">
                      Dedicated MHADA flats for senior citizens aged 60+. Ground
                      floor preference, smaller unit sizes, proximity to
                      healthcare.
                    </div>
                    <div className="dc-cta" style={{ cursor: "pointer" }}>
                      Check Eligibility →
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="sec rv d1">
                <div className="sec-kicker">Step by Step</div>

                <h2 className="sec-title">
                  How to <em>Apply</em> for MHADA Lottery
                </h2>

                <div className="info-box">
                  <h4>📋 Application Process — Online</h4>
                  <ul>
                    <li>
                      Visit mhada.gov.in when a lottery is announced and click
                      "Apply Online"
                    </li>
                    <li>
                      Register with Aadhaar-linked mobile number — OTP
                      verification required
                    </li>
                    <li>
                      Select your preferred lottery board (Mumbai/Konkan/Nashik
                      etc.) and income category
                    </li>
                    <li>
                      Fill in personal details, income declaration and
                      residential address
                    </li>
                    <li>
                      Choose your preferred flat type: EWS, LIG, MIG or HIG
                      based on your income group
                    </li>
                    <li>
                      Upload documents: Aadhaar, PAN, income certificate,
                      domicile certificate, recent passport photos
                    </li>
                    <li>
                      Pay the application fee online (typically ₹500–₹1,000
                      non-refundable) plus the required EMD (Earnest Money
                      Deposit) — refunded if you don't win
                    </li>
                    <li>
                      Submit and note your application number for tracking
                    </li>
                    <li>
                      Attend or track the computerised draw — results published
                      on mhada.gov.in
                    </li>
                  </ul>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="sec rv">
                <div className="sec-kicker">Who Can Apply</div>

                <h2 className="sec-title">
                  Eligibility & <em>Income Categories</em>
                </h2>

                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    margin: "16px 0",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "var(--dark)" }}>
                        <th
                          style={{
                            padding: "11px 14px",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: "#fff",
                            textAlign: "left",
                          }}
                        >
                          Category
                        </th>
                        <th
                          style={{
                            padding: "11px 14px",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: "#fff",
                            textAlign: "left",
                          }}
                        >
                          Annual Income
                        </th>
                        <th
                          style={{
                            padding: "11px 14px",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: "var(--gold)",
                            textAlign: "left",
                          }}
                        >
                          Flat Size
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr style={{ borderBottom: "1px solid var(--border)" }}>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          EWS — Economically Weaker Section
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            color: "var(--muted)",
                          }}
                        >
                          Up to ₹3 lakh/year
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                          }}
                        >
                          160–269 sq ft (carpet)
                        </td>
                      </tr>

                      <tr style={{ borderBottom: "1px solid var(--border)" }}>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          LIG — Low Income Group
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            color: "var(--muted)",
                          }}
                        >
                          ₹3L – ₹6L/year
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                          }}
                        >
                          270–500 sq ft (carpet)
                        </td>
                      </tr>

                      <tr style={{ borderBottom: "1px solid var(--border)" }}>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          MIG — Middle Income Group
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            color: "var(--muted)",
                          }}
                        >
                          ₹6L – ₹12L/year
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                          }}
                        >
                          500–750 sq ft (carpet)
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          HIG — Higher Income Group
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            color: "var(--muted)",
                          }}
                        >
                          Above ₹12L/year
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontSize: "12px",
                            fontWeight: 700,
                          }}
                        >
                          750+ sq ft (carpet)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="info-box">
                  <h4>✅ General Eligibility Conditions</h4>
                  <ul>
                    <li>
                      Indian citizen, Maharashtra domicile certificate holder
                    </li>
                    <li>Must be 18+ years of age at time of application</li>
                    <li>
                      Applicant or spouse must not own any house/flat/plot in
                      Maharashtra
                    </li>
                    <li>PAN and Aadhaar are mandatory for all applicants</li>
                    <li>
                      Income certificate from Tehsildar or employer required
                    </li>
                    <li>
                      One application per family (husband/wife counted as one
                      unit)
                    </li>
                  </ul>
                </div>
              </div>
            </main>

            {/* SIDEBAR */}
            <aside className="page-sidebar">
              <div
                style={{
                  background: "linear-gradient(135deg,var(--dark),#1a0830)",
                  borderRadius: "16px",
                  padding: "22px",
                  border: "1px solid rgba(255,107,0,.15)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "var(--red)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Official MHADA Portal
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,.5)",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    marginBottom: "14px",
                  }}
                >
                  Apply, track results, check scheme details at the official
                  portal.
                </p>

                <a
                  href="https://mhada.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "var(--red)",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "100px",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                  }}
                >
                  Visit mhada.gov.in →
                </a>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  Key <em>Docs</em> Needed
                </div>

                <div
                  className="sbw-body"
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    📄 Aadhaar Card (mandatory)
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    📄 PAN Card (mandatory)
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    📄 Income Certificate (Tehsildar)
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    📄 Maharashtra Domicile Certificate
                  </div>
                  <div
                    style={{
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    📄 Caste Certificate (if applicable)
                  </div>
                  <div style={{ padding: "6px 0" }}>
                    📷 Recent Passport Photos
                  </div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  Related <em>Pages</em>
                </div>

                <div className="sbw-body">
                  <a
                    href="/mumbai-property-tax"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "9px 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    🏠 Property Tax Guide →
                  </a>

                  <a
                    href="/bmc-complaint"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "9px 0",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    🚨 BMC Complaint Portal →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default MhadaLottery;
