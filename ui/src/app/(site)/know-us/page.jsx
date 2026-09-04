// import "./style.css";

const KnowUs = () => {
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
          <div className="kicker light rv">Who We Are</div>

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
            BUILT FOR
            &nbsp;
            <span style={{ color: "var(--red)" }}>MUMBAI.</span>
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
            We are Mumbaikars who believed this city deserved its own complete
            platform — a living digital home for 22 million people.
          </p>

          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a href="/our-mission" className="btn-o">
              Our Mission →
            </a>
            <a href="/auth/login" className="btn-ghost">
              Join Us
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="con">
          <div className="about-grid">
            <div className="rv">
              <div className="kicker">The Story</div>

              <h2 className="stitle" style={{ marginBottom: "24px" }}>
                FROM AN
                <br />
                <em>IDEA TO A MOVEMENT.</em>
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "#444",
                  lineHeight: 1.9,
                  fontWeight: 300,
                  marginBottom: "16px",
                }}
              >
                Mumbai96 was born from a simple frustration: Mumbai is vibrant 
                financial city with millions of incredible people, 
                amazing and innovative local businesses, and million of stories 
                - but not single place that truly captured it all. 
                Every local community was scattered, so we decided to built one.
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "#444",
                  lineHeight: 1.9,
                  fontWeight: 300,
                  marginBottom: "16px",
                }}
              >
                We built Mumbai96 to change that. Not just a business directory
                — a complete hyperlocal city platform where every Mumbaikar
                matters, every lane has a voice, and every local story gets
                told.
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "#444",
                  lineHeight: 1.9,
                  fontWeight: 300,
                }}
              >
                From Virar to Colaba. From Vasai to Chembur. Every corner of
                Mumbai, finally in one place.
              </p>

              <div className="stat-row rv d1">
                <div className="stat-box">
                  <div className="stat-n">100%</div>
                  <div className="stat-l">Mumbai Covered</div>
                </div>
                <div className="stat-box">
                  <div className="stat-n">∞</div>
                  <div className="stat-l">Stories</div>
                </div>
                <div className="stat-box">
                  <div className="stat-n">Zero</div>
                  <div className="stat-l">Fraud Tolerated</div>
                </div>
              </div>
            </div>

            <div className="rv d2">
              <div className="kicker">Our Journey</div>

              <div className="timeline" style={{ marginTop: "20px" }}>
                <div className="tl-item">
                  <div className="tl-year">2011</div>
                  <div className="tl-title">The Idea Sparks</div>
                  <div className="tl-desc">
                    Frustrated by scattered, expensive and incomplete local
                    platforms, the Mumbai96 concept was born as Churchgate 2 Virar in
                    Andheri.
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-year">2024</div>
                  <div className="tl-title">Platform Launches</div>
                  <div className="tl-desc">
                   Over the period of time, the dream lived on, and in 2023
                   it took shape as Mumbai96 and the we launched first phase in 2024.
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-year">2025</div>
                  <div className="tl-title">Improvisation</div>
                  <div className="tl-desc">
                    We improvised the platform & added more features,
                    making some tweaks, we kept on the running.
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-year">2026</div>
                  <div className="tl-title">Everything Mumbai</div>
                  <div className="tl-desc">
                    Finally in 2026, we launched the revamped design, and real local stories.
                    More Dynamic Features, so that every Mumbaikar feels connected in the city.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div className="con">
          <div
            className="rv"
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <div className="kicker" style={{ justifyContent: "center" }}>
              What Drives Us
            </div>

            <h2 className="stitle" style={{ textAlign: "center" }}>
              OUR CORE
              <br />
              <em>VALUES.</em>
            </h2>
          </div>

          <div className="value-grid rv d1">
            <div className="value-card">
              <div className="ic">🎯</div>
              <h4>Local First, Always</h4>
              <p>
                Everything we do starts with one simple question: 
                will this make life easier, better, or more connected for Mumbaikars?
              </p>
            </div>

            <div className="value-card">
              <div className="ic">💸</div>
              <h4>Real Mumbai, Real Stories</h4>
              <p>
                Discover the heartbeat of Mumbai through authentic local experiences,
                untold stories, hidden gems, and the people who make every location special.
              </p>
            </div>

            <div className="value-card">
              <div className="ic">🛡️</div>
              <h4>Safety Over Everything</h4>
              <p>
                From trusted information and fraud awareness to essential emergency resources, 
                keeping every Mumbaikar safe is always our priority.
              </p>
            </div>

            <div className="value-card">
              <div className="ic">🤝</div>
              <h4>Community is the Core</h4>
              <p>
                The heart of Mumbai96 isn't technology—it's the millions of Mumbaikars 
                whose experiences, insights, and stories shape the platform every day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KnowUs;
