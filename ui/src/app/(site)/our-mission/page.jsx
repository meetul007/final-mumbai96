// import "./style.css";

const OurMission = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "54vh",
          display: "flex",
          alignItems: "center",
          background: "#371b58",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(-45deg,rgba(255,255,255,.013) 0,rgba(255,255,255,.013) 1px,transparent 1px,transparent 32px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 80% at 5% 50%,rgba(255,107,0,.13) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 90% 20%,rgba(245,166,35,.09) 0%,transparent 55%)",
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
          <div className="kicker light rv">Mission & Vision</div>

          <h1
            className="rv d1"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3.5rem,10vw,9rem)",
              lineHeight: 1,
              color: "#fff",
              letterSpacing: ".01em",
              margin: "12px 0 20px",
            }}
          >
            OUR NORTH
            &nbsp;
            <span style={{ color: "var(--red)" }}>STAR.</span>
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
            We exist to make Mumbai the most connected, informed, and cared-for
            city in the world — starting from the ground up, one location
            at a time.
          </p>

          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a href="/know-us" className="btn-o">
              About Us →
            </a>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="con">
          <div className="rv" style={{ marginBottom: "16px" }}>
            <div className="kicker gold">What We Stand For</div>

            <h2 className="stitle w ge">
              OUR
              <br />
              <em>MANIFESTO.</em>
            </h2>
          </div>

          <div className="m-item rv d1">
            <div className="m-num">01</div>
            <div className="m-content">
              <h3>
                OUR <em>MISSION</em>
              </h3>
              <p>
                To give every single Mumbaikar — from the chai wala in the city
                to the corporate in BKC — a free, powerful and trustworthy
                platform to discover, connect and grow. Mumbai has 22+ million
                stories. We are the platform that tells them all, one at a time.
              </p>
            </div>
          </div>

          <div className="m-item rv d2">
            <div className="m-num">02</div>
            <div className="m-content">
              <h3>
                OUR <em>VISION</em>
              </h3>
              <p>
                A Mumbai where every place has a digital voice. Where no
                local business goes unnoticed. Where every resident is
                protected, informed and connected. We envision a city platform
                so complete that no Mumbaikar ever needs to look elsewhere for
                anything about their city.
              </p>
            </div>
          </div>

          <div className="m-item rv d3">
            <div className="m-num">03</div>
            <div className="m-content">
              <h3>
                OUR <em>PROMISE</em>
              </h3>
              <p>
                Free business listing. Zero tolerance for fraud. Relentless
                community focus. We are not a startup chasing revenue at the
                cost of the people we serve. We are Mumbaikars, building for
                Mumbaikars, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars-mv">
        <div className="con">
          <div
            className="rv"
            style={{ textAlign: "center", marginBottom: "4px" }}
          >
            <div className="kicker" style={{ justifyContent: "center" }}>
              How We Get There
            </div>

            <h2 className="stitle" style={{ textAlign: "center" }}>
              SIX PILLARS OF
              <br />
              <em>MUMBAI96.</em>
            </h2>
          </div>

          <div className="pil-grid rv d1">
            <div className="pil-card">
              <div className="pil-icon">🏙️</div>
              <div className="pil-title">LOCAL DEPTH</div>
              <div className="pil-desc">
                We truly understand that every location in Mumbai is unique and deserves its own spotlight.
              </div>
            </div>

            <div className="pil-card">
              <div className="pil-icon">🆓</div>
              <div className="pil-title">100% ACCESS</div>
              <div className="pil-desc">
                Every business, every individual, every Mumbaikar gets a equal
                presence on Mumbai96 platform — so don't hesitate & contact us.
              </div>
            </div>

            <div className="pil-card">
              <div className="pil-icon">🛡️</div>
              <div className="pil-title">SAFETY & PROTECTION</div>
              <div className="pil-desc">
                Fraud alerts, women safety, child helplines — community
                protection is built into our core.
              </div>
            </div>

            <div className="pil-card">
              <div className="pil-icon">🤝</div>
              <div className="pil-title">REAL COMMUNITY</div>
              <div className="pil-desc">
                Meetups, local events, people stories — building genuine human
                connections across the city.
              </div>
            </div>

            <div className="pil-card">
              <div className="pil-icon">🗺️</div>
              <div className="pil-title">CITY KNOWLEDGE</div>
              <div className="pil-desc">
                Travel, food, tourism, nightlife and every aspect of city life —
                the complete Mumbai almanac.
              </div>
            </div>

            <div className="pil-card">
              <div className="pil-icon">📈</div>
              <div className="pil-title">BUSINESS GROWTH</div>
              <div className="pil-desc">
                Empowering local businesses with visibility, credibility and
                connections they could never afford elsewhere.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMission;
