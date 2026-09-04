// import "./style.css";

const ReportFraud = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          background: "#1a0000",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 10% 50%,rgba(255,107,0,.2) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 90% 20%,rgba(200,0,0,.12) 0%,transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div className="fraud-hero-extra"></div>

        <div
          className="con"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "52px",
            paddingBottom: "64px",
          }}
        >
          <div
            className="kicker rv"
            style={{ color: "var(--red)", "--red": "#ff6b00" }}
          >
            🚨 Fraud & Scam Prevention
          </div>

          <h1
            className="rv d1"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3.2rem,9vw,8rem)",
              lineHeight: 1,
              color: "#fff",
              letterSpacing: ".01em",
              margin: "12px 0 20px",
            }}
          >
            REPORT A &nbsp;
            <span style={{ color: "#ff6b00" }}>FRAUD OR SCAM.</span>
          </h1>

          <p
            className="rv d2"
            style={{
              fontSize: "clamp(.9rem,1.6vw,1.1rem)",
              color: "rgba(255,255,255,.55)",
              fontWeight: 300,
              maxWidth: "540px",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            Zero tolerance for fraudsters in Mumbai. Don't Hesitate, Report Fraud.
            Inform Every Mumbaikar how they can avoid getting into traps.
          </p>


          
           {/* 
          <div
            className="rv d3"
            style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
          >
            <div
              style={{
                background: "rgba(255,107,0,.15)",
                border: "1px solid rgba(255,107,0,.3)",
                borderRadius: "12px",
                padding: "14px 22px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "1.8rem",
                  color: "#ff6b00",
                  letterSpacing: ".06em",
                }}
              >
                ANONYMOUS
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.4)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                Your Identity Protected
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,107,0,.15)",
                border: "1px solid rgba(255,107,0,.3)",
                borderRadius: "12px",
                padding: "14px 22px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "1.8rem",
                  color: "#ff6b00",
                  letterSpacing: ".06em",
                }}
              >
                24HR ACTION
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.4)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                Reports Reviewed Quickly
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,107,0,.15)",
                border: "1px solid rgba(255,107,0,.3)",
                borderRadius: "12px",
                padding: "14px 22px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "1.8rem",
                  color: "#ff6b00",
                  letterSpacing: ".06em",
                }}
              >
                COMMUNITY
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.4)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                Alerts Shared Citywide
              </div>
            </div>
          </div>

        */}
          
        </div>        
      </section>

      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div className="con">
          <div className="fraud-grid">
            {/* FORM */}
            <div className="fraud-form rv">
              <h3>SUBMIT YOUR REPORT</h3>
              <p>
                All fields except description are optional. Your report helps
                protect thousands of Mumbaikars.
              </p>

              <div className="ff-group">
                <label className="ff-label">Type of Fraud *</label>
                <select className="ff-select">
                  <option>Select fraud type</option>
                  <option>Fake Business / Listing</option>
                  <option>Online Scam</option>
                  <option>Property Fraud</option>
                  <option>Job Scam</option>
                  <option>Financial Fraud</option>
                  <option>Impersonation</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="ff-group">
                <label className="ff-label">Business / Person Name</label>
                <input
                  className="ff-input"
                  type="text"
                  placeholder="Name of fraudulent person or business"
                />
              </div>

              <div className="ff-group">
                <label className="ff-label">Mumbai Area / Neighbourhood</label>
                <input
                  className="ff-input"
                  type="text"
                  placeholder="e.g. Andheri East, Bandra West..."
                />
              </div>

              <div className="ff-group">
                <label className="ff-label">Describe What Happened *</label>
                <textarea
                  className="ff-textarea"
                  placeholder="Tell us what happened in as much detail as possible. The more detail, the faster we can act."
                ></textarea>
              </div>

              <div className="ff-group">
                <label className="ff-label">
                  Your Email (optional — for follow-up only)
                </label>
                <input
                  className="ff-input"
                  type="email"
                  placeholder="We will never publish your email"
                />
              </div>

              <button className="ff-submit">
                🚨 Submit Report Anonymously
              </button>
            </div>

            {/* RIGHT SIDE INFO */}
            <div className="fraud-info rv d2">
              <div className="fi-card">
                <div className="fi-icon">🚔</div>
                <div className="fi-title">Mumbai Police Cyber Cell</div>
                <div className="fi-desc">
                  For immediate cyber crimes and online fraud — contact Mumbai
                  Cyber Police directly.
                </div>
                <div className="fi-num">1930</div>
              </div>

              <div className="fi-card">
                <div className="fi-icon">📞</div>
                <div className="fi-title">National Cyber Crime Helpline</div>
                <div className="fi-desc">
                  Report cyber fraud, online scams and digital crimes 24x7 on
                  the national helpline.
                </div>
                <div className="fi-num">1930</div>
              </div>

              <div className="fi-card">
                <div className="fi-icon">🏦</div>
                <div className="fi-title">Banking Fraud / UPI Scam</div>
                <div className="fi-desc">
                  For UPI and banking fraud, contact your bank immediately and
                  the RBI helpline.
                </div>
                <div className="fi-num">14440</div>
              </div>

              <div className="fi-card tip">
                <div className="fi-icon">💡</div>
                <div className="fi-title">How to Spot a Scam</div>
                <div className="fi-desc" style={{ color: "var(--muted)" }}>
                  Too-good-to-be-true prices. Requests for advance payment. No
                  verifiable address. Pressure to act fast. Trust your instincts
                  — if something feels wrong, it probably is.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReportFraud;
