// import "./style.css";

const ChildHelpLine = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          background: "#0a1a30",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 10% 50%,rgba(59,130,246,.18) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 90% 20%,rgba(245,166,35,.1) 0%,transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(-45deg,rgba(255,255,255,.01) 0,rgba(255,255,255,.01) 1px,transparent 1px,transparent 28px)",
            pointerEvents: "none",
          }}
        />

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
            className="rv"
            style={{
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#60a5fa",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "22px",
                height: "2px",
                background: "#60a5fa",
                flexShrink: 0,
              }}
            ></span>
            Child Safety · Mumbai96
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
            PROTECTING
            &nbsp;
            <span style={{ color: "var(--gold)" }}>EVERY CHILD.</span>
          </h1>

          <p
            className="rv d2"
            style={{
              fontSize: "clamp(.9rem,1.6vw,1.1rem)",
              color: "rgba(255,255,255,.55)",
              fontWeight: 300,
              maxWidth: "560px",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            Because no child in Mumbai should ever feel unsafe. Here are all the
            resources, helplines and guidance you need — available 24 hours a
            day, 7 days a week.
          </p>

          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a
              href="tel:1098"
              style={{
                background: "#F5A623",
                color: "#fff",
                padding: "15px 32px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: ".07em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📞 CALL CHILDLINE: 1098
            </a>

            <a
              href="#report"
              style={{
                border: "1.5px solid rgba(255,255,255,.2)",
                color: "#fff",
                padding: "15px 32px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: ".07em",
                textTransform: "uppercase",
              }}
            >
              Report Concern →
            </a>
          </div>
        </div>
      </section>

      {/* HELPLINES */}
      <section style={{ padding: "80px 0", background: "#0f1f35" }}>
        <div className="con">
          <div className="rv">
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "22px",
                  height: "2px",
                  background: "var(--gold)",
                  flexShrink: 0,
                }}
              ></span>
              Emergency Numbers
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2rem,5vw,4rem)",
                letterSpacing: ".02em",
                color: "#fff",
                lineHeight: 1.05,
                marginBottom: "4px",
              }}
            >
              KEY HELPLINES
              <br />
              <span style={{ color: "var(--gold)" }}>FOR CHILD SAFETY.</span>
            </h2>
          </div>

          <div className="help-nums">
            <div className="hn rv d1" style={{ background: "#1a2e4a" }}>
              <div className="hn-icon">📞</div>
              <div className="hn-num">1098</div>
              <div className="hn-label">Childline India</div>
              <div className="hn-sub">24x7 · Free · All India</div>
            </div>

            <div className="hn rv d2" style={{ background: "#1a2e4a" }}>
              <div className="hn-icon">🚔</div>
              <div className="hn-num">100</div>
              <div className="hn-label">Mumbai Police</div>
              <div className="hn-sub">Emergency · 24x7</div>
            </div>

            <div className="hn rv d3" style={{ background: "#1a2e4a" }}>
              <div className="hn-icon">🏥</div>
              <div className="hn-num">112</div>
              <div className="hn-label">National Emergency</div>
              <div className="hn-sub">Police · Fire · Ambulance</div>
            </div>

            <div className="hn rv d1" style={{ background: "#1a2e4a" }}>
              <div className="hn-icon">👮</div>
              <div className="hn-num">022-2262-1855</div>
              <div className="hn-label">Mumbai Crime Branch</div>
              <div className="hn-sub">Child Abuse Cases</div>
            </div>

            <div className="hn rv d2" style={{ background: "#1a2e4a" }}>
              <div className="hn-icon">🏛️</div>
              <div className="hn-num">1800-419-0001</div>
              <div className="hn-label">NCPCR Helpline</div>
              <div className="hn-sub">Child Rights Commission</div>
            </div>

            <div className="hn rv d3" style={{ background: "#1a2e4a" }}>
              <div className="hn-icon">💻</div>
              <div className="hn-num">1930</div>
              <div className="hn-label">Cyber Crime Helpline</div>
              <div className="hn-sub">Online Child Safety</div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY INFO */}
      <section
        id="report"
        style={{ padding: "80px 0", background: "var(--light)" }}
      >
        <div className="con">
          <div className="rv">
            <div className="kicker">Stay Safe · Stay Alert</div>
            <h2 className="stitle">
              HOW TO KEEP
              <br />
              <em>CHILDREN SAFE.</em>
            </h2>
          </div>

          <div className="info-cards rv d1">
            <div className="ic-card">
              <div className="ic-icon">🔒</div>
              <div className="ic-title">Online Safety for Kids</div>
              <div className="ic-desc">
                Never share personal details online. Use parental controls on
                devices. Monitor social media activity. Report cyberbullying
                immediately to 1930.
              </div>
            </div>

            <div className="ic-card" style={{ borderColor: "var(--gold)" }}>
              <div className="ic-icon">🏫</div>
              <div className="ic-title">School & Public Safety</div>
              <div className="ic-desc">
                Teach children to identify safe adults. Always know your child's
                route. Trust their instincts if they feel unsafe anywhere.
              </div>
            </div>

            <div className="ic-card" style={{ borderColor: "#10B981" }}>
              <div className="ic-icon">📱</div>
              <div className="ic-title">What to Do if a Child is Missing</div>
              <div className="ic-desc">
                Call Childline 1098 immediately. File a missing person report
                with Mumbai Police. Share on community channels. Do not wait 24
                hours.
              </div>
            </div>

            <div className="ic-card" style={{ borderColor: "#6366F1" }}>
              <div className="ic-icon">🤝</div>
              <div className="ic-title">Community Responsibility</div>
              <div className="ic-desc">
                Child safety is everyone's responsibility. If you see something
                concerning, report it. Use Mumbai96's Report Fraud page to flag
                suspicious activity near schools or parks.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChildHelpLine;
