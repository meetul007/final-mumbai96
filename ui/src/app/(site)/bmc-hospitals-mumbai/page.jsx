import Link from "next/link";
// import "./style.css";

const BmcHospitals = () => {
  const thStyle = {
    padding: "12px 16px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "#fff",
    textAlign: "left",
  };

  const td = {
    padding: "11px 16px",
  };

  const tdBold = {
    ...td,
    fontSize: "13px",
    fontWeight: 700,
  };

  const tdMuted = {
    ...td,
    fontSize: "12px",
    color: "var(--muted)",
  };

  const trStyle = {
    borderBottom: "1px solid var(--border)",
  };

  const linkStyle = {
    color: "var(--red)",
    fontWeight: 700,
    fontSize: "12px",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid var(--border)",
  };

  const rowStyleLast = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: 700,
  };

  const labelSmall = {
    fontSize: "12px",
    fontWeight: 700,
  };

  const highlightStyle = {
    fontSize: "12px",
    fontWeight: 800,
    color: "var(--red)",
  };

  const highlightStyleLarge = {
    fontSize: "16px",
    fontWeight: 800,
    color: "var(--red)",
  };

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="ph-grid"></div>

        <div
          className="ph-glow"
          style={{
            background: "rgba(5,150,105,.12)",
            bottom: "-100px",
            left: "-100px",
          }}
        />

        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>BMC Hospitals</span>
            </div>

            <div className="ph-kicker">
              Mumbai96 · Health Guide · Free Government Care
            </div>

            <h1 className="ph-h1">
              Free <em>BMC Hospitals</em>
              &nbsp;
              in Mumbai 2026
            </h1>

            <p className="ph-desc">
              Mumbai's BMC runs 4 major hospitals and 175+ health centres — all
              free of cost for Mumbai residents. Find the nearest one to you,
              with departments, contact numbers and OPD timings.
            </p>
          </div>
        </div>

        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">4</div>
                <div className="phs-l">Major BMC Hospitals</div>
              </div>
              <div className="phs">
                <div className="phs-n">175+</div>
                <div className="phs-l">Health Centres</div>
              </div>
              <div className="phs">
                <div className="phs-n">Free</div>
                <div className="phs-l">For All Residents</div>
              </div>
              <div className="phs">
                <div className="phs-n">24×7</div>
                <div className="phs-l">Emergency Services</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            {/* MAIN */}
            <main>
              {/* HOSPITAL CARDS */}
              <div className="sec rv">
                <div className="sec-kicker">The 4 Major BMC Hospitals</div>
                <h2 className="sec-title">
                  Mumbai's <em>Free</em> Government Hospitals
                </h2>

                <div className="card-grid">
                  {/* KEM */}
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">KEM Hospital</div>
                    <div className="dc-body">
                      King Edward Memorial Hospital — Mumbai's largest
                      government hospital. Super-specialty care, trauma centre,
                      burn unit, NICU. Affiliated to Seth GS Medical College.
                    </div>
                    <div className="dc-contact">📍 Parel, Mumbai — 400012</div>
                    <div className="dc-contact" style={{ marginTop: "5px" }}>
                      All departments · Est. 1926
                    </div>
                    <a href="tel:02224100000" className="dc-cta">
                      📞 022-2410-0000
                    </a>
                  </div>

                  {/* NAIR */}
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">Nair Hospital</div>
                    <div className="dc-body">
                      Dr. B Y L Nair Charitable Hospital — Trauma centre,
                      maternity, oncology, cardiac care. Attached to TNMC.
                    </div>
                    <div className="dc-contact">📍 Mumbai Central — 400008</div>
                    <div className="dc-contact" style={{ marginTop: "5px" }}>
                      All departments · Est. 1921
                    </div>
                    <a href="tel:02223082000" className="dc-cta">
                      📞 022-2308-2000
                    </a>
                  </div>

                  {/* SION */}
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">Sion Hospital</div>
                    <div className="dc-body">
                      Lokmanya Tilak Municipal General Hospital — Major trauma
                      and emergency centre for Eastern suburbs.
                    </div>
                    <div className="dc-contact">📍 Sion, Mumbai — 400022</div>
                    <div className="dc-contact" style={{ marginTop: "5px" }}>
                      All departments · Est. 1956
                    </div>
                    <a href="tel:02224090000" className="dc-cta">
                      📞 022-2409-0000
                    </a>
                  </div>

                  {/* COOPER */}
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">Cooper Hospital</div>
                    <div className="dc-body">
                      V N Desai Municipal General Hospital — Western Suburbs
                      referral hospital.
                    </div>
                    <div className="dc-contact">
                      📍 Juhu, Vile Parle West — 400056
                    </div>
                    <a href="tel:02226207254" className="dc-cta">
                      📞 022-2620-7254
                    </a>
                  </div>

                  {/* CHILDREN */}
                  <div className="data-card">
                    <div className="dc-icon">👶</div>
                    <div className="dc-title">Byculla Children's Hospital</div>
                    <div className="dc-body">
                      Dedicated paediatric hospital — free treatment for
                      children.
                    </div>
                    <div className="dc-contact">📍 Byculla — 400027</div>
                    <a href="tel:02223701500" className="dc-cta">
                      📞 022-2370-1500
                    </a>
                  </div>

                  {/* DENTAL */}
                  <div className="data-card">
                    <div className="dc-icon">🦷</div>
                    <div className="dc-title">Nair Dental Hospital</div>
                    <div className="dc-body">
                      Government dental hospital with full treatment at minimal
                      or zero cost.
                    </div>
                    <div className="dc-contact">📍 Mumbai Central</div>
                    <a href="tel:02223004900" className="dc-cta">
                      📞 022-2300-4900
                    </a>
                  </div>
                </div>
              </div>

              {/* ZONE TABLE */}
              <div className="sec rv d1">
                <div className="sec-kicker">Zone-wise Health Centres</div>

                <h2 className="sec-title">
                  BMC <em>Urban Health Centres</em> by Zone
                </h2>

                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    marginBottom: "20px",
                  }}
                >
                  BMC runs 175+ Urban Health Centres (UHCs) and Peripheral
                  Health Centres (PHCs) across Mumbai — for OPD, vaccination,
                  maternal health, TB treatment and primary care. All free for
                  Mumbai residents.
                </p>

                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "var(--dark)" }}>
                        <th style={thStyle}>Zone</th>
                        <th style={thStyle}>Areas Covered</th>
                        <th style={thStyle}>Centres</th>
                        <th style={{ ...thStyle, color: "var(--gold)" }}>
                          Find Nearest
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr style={trStyle}>
                        <td style={tdBold}>South Mumbai</td>
                        <td style={tdMuted}>
                          Colaba, Fort, CST, Churchgate, Byculla
                        </td>
                        <td style={tdBold}>18</td>
                        <td style={td}>
                          <a href="tel:1916" style={linkStyle}>
                            Call 1916 →
                          </a>
                        </td>
                      </tr>

                      <tr style={trStyle}>
                        <td style={tdBold}>Central Mumbai</td>
                        <td style={tdMuted}>
                          Dadar, Mahim, Matunga, Worli, Sion
                        </td>
                        <td style={tdBold}>24</td>
                        <td style={td}>
                          <a href="tel:1916" style={linkStyle}>
                            Call 1916 →
                          </a>
                        </td>
                      </tr>

                      <tr style={trStyle}>
                        <td style={tdBold}>Western Suburbs</td>
                        <td style={tdMuted}>
                          Bandra, Andheri, Goregaon, Malad, Borivali
                        </td>
                        <td style={tdBold}>52</td>
                        <td style={td}>
                          <a href="tel:1916" style={linkStyle}>
                            Call 1916 →
                          </a>
                        </td>
                      </tr>

                      <tr style={trStyle}>
                        <td style={tdBold}>Eastern Suburbs</td>
                        <td style={tdMuted}>
                          Kurla, Ghatkopar, Vikhroli, Mulund
                        </td>
                        <td style={tdBold}>38</td>
                        <td style={td}>
                          <a href="tel:1916" style={linkStyle}>
                            Call 1916 →
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td style={tdBold}>Harbour & Islands</td>
                        <td style={tdMuted}>
                          Dharavi, Chembur, Trombay, Mankhurd
                        </td>
                        <td style={tdBold}>43</td>
                        <td style={td}>
                          <a href="tel:1916" style={linkStyle}>
                            Call 1916 →
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FREE SERVICES */}
              <div className="sec rv">
                <div className="sec-kicker">Free Specialties</div>

                <h2 className="sec-title">
                  What's <em>Completely Free</em> at BMC Hospitals
                </h2>

                <div className="info-box">
                  <h4>🆓 Services Provided Free of Cost</h4>

                  <ul>
                    <li>
                      All OPD (Outpatient Department) consultations — no
                      registration fee
                    </li>
                    <li>
                      Emergency treatment and ambulance (call 108 for free BMC
                      ambulance)
                    </li>
                    <li>
                      Maternity care — antenatal, delivery and postnatal
                      (including C-section)
                    </li>
                    <li>
                      All basic medicines from the BMC formulary at hospital
                      pharmacy
                    </li>
                    <li>
                      Basic diagnostics: blood tests, X-ray, ECG — free for
                      inpatients
                    </li>
                    <li>
                      TB (tuberculosis) treatment — DOTS programme, 100% free
                    </li>
                    <li>
                      HIV/AIDS treatment and ART medication at designated
                      centres
                    </li>
                    <li>Cancer screening camps and basic cancer treatment</li>
                    <li>
                      Vaccination for children — all under National Immunisation
                      Programme
                    </li>
                    <li>
                      Mental health OPD at KEM, Nair and Sion hospitals — free
                      consultation
                    </li>
                  </ul>
                </div>

                <div className="warn-box">
                  <div className="warn-icon">💡</div>

                  <div className="warn-body">
                    <h4>Bring These Documents to BMC Hospital</h4>

                    <p>
                      Aadhaar card or any government ID is sufficient for
                      registration at BMC hospitals. You do NOT need a ration
                      card. Emergency care is provided immediately without
                      documentation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="prose rv">
                <h2>
                  Free Government Hospitals in Mumbai — Complete Guide 2026
                </h2>

                <p>
                  Mumbai's BMC (Brihanmumbai Municipal Corporation) operates one
                  of India's largest urban public health networks —{" "}
                  <strong>
                    4 major teaching hospitals, 5 specialty hospitals and over
                    175 urban health centres
                  </strong>{" "}
                  across the city. Every service is free or heavily subsidised
                  for Mumbai residents.
                </p>

                <h3>Who Can Use BMC Hospitals for Free?</h3>

                <p>
                  Any person residing in Mumbai can access BMC hospitals. There
                  is <strong>no income or ration card requirement</strong> for
                  emergency care. For OPD, a valid ID (Aadhaar, voter card,
                  driving licence) is typically sufficient for registration.
                  Non-residents may be charged nominal fees for non-emergency
                  OPD at the hospital's discretion.
                </p>

                <h3>Are BMC Hospital Services Really Free?</h3>

                <p>
                  OPD consultations, emergency care, delivery services and all
                  basic medicines are completely free. Some tests (CT scan, MRI)
                  may have a nominal charge for non-BPL patients — typically
                  ₹100–₹500. In genuine financial hardship, these charges are
                  often waived on request.
                </p>
              </div>
            </main>

            {/* SIDEBAR */}
            <aside className="page-sidebar">
              {/* EMERGENCY NUMBERS */}
              <div className="sb-widget">
                <div className="sbw-head">
                  🆘 Emergency <em>Numbers</em>
                </div>

                <div className="sbw-body">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {/* Ambulance */}
                    <a href="tel:108" style={rowStyle}>
                      <span style={labelStyle}>🚑 Ambulance</span>
                      <span style={highlightStyleLarge}>108</span>
                    </a>

                    {/* KEM */}
                    <a href="tel:022-2410-0000" style={rowStyle}>
                      <span style={labelSmall}>🏥 KEM Hospital</span>
                      <span style={highlightStyle}>2410-0000</span>
                    </a>

                    {/* Nair */}
                    <a href="tel:022-2308-2000" style={rowStyle}>
                      <span style={labelSmall}>🏥 Nair Hospital</span>
                      <span style={highlightStyle}>2308-2000</span>
                    </a>

                    {/* Sion */}
                    <a href="tel:022-2409-0000" style={rowStyle}>
                      <span style={labelSmall}>🏥 Sion Hospital</span>
                      <span style={highlightStyle}>2409-0000</span>
                    </a>

                    {/* Cooper */}
                    <a href="tel:022-2620-7254" style={rowStyleLast}>
                      <span style={labelSmall}>🏥 Cooper Hospital</span>
                      <span style={highlightStyle}>2620-7254</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="sb-widget">
                <div className="sbw-head">
                  Quick <em>Links</em>
                </div>

                <div className="sbw-body">
                  <div className="quick-link">
                    <div className="ql-icon">🏛️</div>
                    <div className="ql-text">Find Your Corporator</div>
                    <div className="ql-arrow">→</div>
                  </div>

                  <div className="quick-link">
                    <div className="ql-icon">💊</div>
                    <div className="ql-text">
                      Medicines at Hospital Pharmacy
                    </div>
                    <div className="ql-arrow">→</div>
                  </div>

                  <div className="quick-link">
                    <div className="ql-icon">🤱</div>
                    <div className="ql-text">Maternity Services</div>
                    <div className="ql-arrow">→</div>
                  </div>

                  <div className="quick-link">
                    <div className="ql-icon">🧬</div>
                    <div className="ql-text">TB / HIV Treatment Centres</div>
                    <div className="ql-arrow">→</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default BmcHospitals;
