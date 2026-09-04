// import "./style.css";

function PoliceHero() {
  return (
    <div className="page-hero">
      <div className="ph-grid"></div>

      <div
        className="ph-glow"
        style={{ background: "rgba(26,115,232,.1)" }}
      ></div>

      <div className="con">
        <div className="ph-inner">
          {/* Breadcrumb */}
          <div className="ph-bc">
            <a href="/">Home</a>
            <span>/</span>
            <span>Police Stations</span>
          </div>

          {/* Header */}
          <div className="ph-kicker">
            Mumbai96 · Safety Guide · Mumbai Police Directory
          </div>

          <h1 className="ph-h1">
            Mumbai <em>Police Station</em>
            &nbsp;
            Directory 2026
          </h1>

          <p className="ph-desc">
            Find your nearest Mumbai police station instantly. Complete
            directory with phone numbers, addresses, jurisdiction areas and
            emergency contacts — for every zone of Mumbai.
          </p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="ph-bottom">
        <div className="con">
          <div className="ph-stats">
            <div className="phs">
              <div className="phs-n">100+</div>
              <div className="phs-l">Police Stations</div>
            </div>

            <div className="phs">
              <div className="phs-n">100</div>
              <div className="phs-l">Emergency</div>
            </div>

            <div className="phs">
              <div className="phs-n">112</div>
              <div className="phs-l">Police Helpline</div>
            </div>

            <div className="phs">
              <div className="phs-n">1091</div>
              <div className="phs-l">Women Helpline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicePageBody() {
  return (
    <div className="page-body">
      <div className="con">
        <div className="page-layout">
          {/* MAIN */}
          <main>
            {/* EMERGENCY */}
            <div className="sec rv">
              <div className="sec-kicker">Emergency First</div>
              <h2 className="sec-title">
                <em>Emergency</em> Contacts — Call First
              </h2>

              <div className="card-grid">
                {[
                  {
                    icon: "🚔",
                    title: "Police Emergency",
                    desc: "Call immediately for crimes in progress, accidents, violence, thefts.",
                    tel: "100",
                    color: "#dc2626",
                  },
                  {
                    icon: "👩‍🦱",
                    title: "Women's Helpline",
                    desc: "24×7 helpline for women in distress, harassment, domestic violence.",
                    tel: "1091",
                    color: "#dc2626",
                  },
                  {
                    icon: "👶",
                    title: "Child Helpline",
                    desc: "For missing children, child abuse and child protection emergencies.",
                    tel: "1098",
                    color: "#dc2626",
                  },
                  {
                    icon: "📱",
                    title: "Mumbai Police Control",
                    desc: "Mumbai Police Control Room — for non-emergency queries and reporting.",
                    tel: "02222621855",
                    label: "022-2262-1855",
                  },
                  {
                    icon: "🌐",
                    title: "Cyber Crime Cell",
                    desc: "For online fraud, UPI scams and digital crimes.",
                    tel: "1930",
                    label: "1930 (Cyber)",
                  },
                  {
                    icon: "🚨",
                    title: "Anti-Corruption",
                    desc: "Report bribery, corruption and misconduct.",
                    tel: "1800221281",
                    label: "1800-22-1281",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="data-card"
                    style={
                      item.color ? { borderTopColor: item.color } : undefined
                    }
                  >
                    <div className="dc-icon">{item.icon}</div>
                    <div className="dc-title">{item.title}</div>
                    <div className="dc-body">{item.desc}</div>

                    <a
                      href={`tel:${item.tel}`}
                      className="dc-cta"
                      style={
                        item.color
                          ? {
                              background: item.color,
                              fontSize: "1.2rem",
                              padding: "10px 22px",
                            }
                          : undefined
                      }
                    >
                      📞 {item.label || item.tel}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* STATION TABLE */}
            <div className="sec rv d1">
              <div className="sec-kicker">Station Directory</div>
              <h2 className="sec-title">
                Mumbai Police Stations — <em>Zone Wise</em>
              </h2>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  overflow: "hidden",
                  margin: "16px 0",
                }}
              >
                {/* HEADER */}
                <div
                  style={{
                    background: "#111827",
                    padding: "14px 18px",
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {["Police Station", "Jurisdiction", "Zone", "Contact"].map(
                    (h, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          color: i === 3 ? "#fbbf24" : "#fff",
                        }}
                      >
                        {h}
                      </span>
                    ),
                  )}
                </div>

                {/* ROWS */}
                {[
                  [
                    "Andheri",
                    "Andheri West, Versova",
                    "Western",
                    "02226322111",
                  ],
                  ["Borivali", "Borivali West", "Western", "02228974041"],
                  ["Dadar", "Shivaji Park", "Central", "02224145050"],
                  ["Colaba", "Colaba, Navy Nagar", "South", "02222162001"],
                  ["Kurla", "BKC, Kalina", "Eastern", "02225171000"],
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 2fr 1fr 1fr",
                      padding: "11px 18px",
                      borderBottom: "1px solid #e5e7eb",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>{row[0]}</span>
                    <span style={{ fontSize: "12px" }}>{row[1]}</span>
                    <span style={{ fontSize: "12px" }}>{row[2]}</span>
                    <a
                      href={`tel:${row[3]}`}
                      style={{ fontWeight: "800", color: "#dc2626" }}
                    >
                      {row[3]}
                    </a>
                  </div>
                ))}
              </div>

              {/* FIR INFO */}
              <div className="warn-box">
                <div className="warn-icon">💡</div>
                <div className="warn-body">
                  <h4>How to File an FIR</h4>
                  <p>
                    Go to the police station with jurisdiction. FIR cannot be
                    refused. You can also file online at{" "}
                    <strong>mumbaipolice.gov.in</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHTS */}
            <div className="sec rv">
              <div className="sec-kicker">Know Your Rights</div>
              <h2 className="sec-title">
                Citizen Rights When <em>Approaching Police</em>
              </h2>

              <div className="info-box">
                <h4>⚖️ Your Legal Rights</h4>
                <ul>
                  <li>Right to file FIR — cannot be refused</li>
                  <li>Free copy of FIR must be provided</li>
                  <li>Must be informed of arrest grounds</li>
                  <li>No detention beyond 24 hours without magistrate</li>
                  <li>Women cannot be called at night (except exceptions)</li>
                </ul>
              </div>
            </div>
          </main>

          {/* SIDEBAR */}
          <aside className="page-sidebar">
            {/* EMERGENCY CTA */}
            <div
              style={{
                background: "#dc2626",
                borderRadius: "16px",
                padding: "22px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "3rem" }}>🚔</div>
              <div style={{ fontSize: "3rem", color: "#fff" }}>100</div>
              <div style={{ color: "#fff" }}>Police Emergency — 24×7</div>

              <a
                href="tel:100"
                style={{
                  display: "block",
                  background: "#fff",
                  color: "#dc2626",
                  padding: "12px",
                  borderRadius: "100px",
                  marginTop: "12px",
                  fontWeight: "900",
                }}
              >
                Call 100 Now
              </a>
            </div>

            {/* HELPLINES */}
            <div className="sb-widget">
              <div className="sbw-head">
                All <em>Helplines</em>
              </div>

              <div className="sbw-body">
                {[
                  ["🚔 Police", "100"],
                  ["👩 Women", "1091"],
                  ["👶 Child", "1098"],
                  ["💻 Cyber", "1930"],
                ].map((h, i) => (
                  <a
                    key={i}
                    href={`tel:${h[1]}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
                    }}
                  >
                    <span>{h[0]}</span>
                    <span style={{ color: "#dc2626", fontWeight: "900" }}>
                      {h[1]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const PoliceStations = () => {
  return (
    <>
      <PoliceHero />
      <PolicePageBody />
    </>
  );
};

export default PoliceStations;
