// import "./style.css";

const CaseStudies = () => {
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
          <div className="kicker light rv">Real Results</div>

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
            PROOF IN
            &nbsp;
            <span style={{ color: "var(--red)" }}>EVERY NUMBER.</span>
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
            Our community of businesses and Mumbaikars share what happened when
            they joined Mumbai96. These are real results from real people across
            Mumbai.
          </p>
          
          {/* 
          
          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a href="/auth/login" className="btn-o">
              Add Your Business Free →
            </a>
          </div>
          
          */}
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div className="con">
          <div className="rv">
            <div className="kicker">Case Studies</div>
            <h2 className="stitle">
              RESULTS THAT
              <br />
              <em>SPEAK LOUD.</em>
            </h2>
          </div>

          <div className="cs-grid">
            {/* CARD 1 */}
            <div className="cs-card rv d1">
              <div className="cs-head" data-num="01">
                <div className="cs-cat">Food & Restaurant</div>
                <div className="cs-name">SHARMA TIFFIN SERVICE</div>
                <div className="cs-area">📍 Goregaon East · Family Tiffin</div>
              </div>

              <div className="cs-body">
                <p className="cs-desc">
                  A 20-year-old family tiffin service with no online presence.
                  After the help from Mumbai96 team, we were discovered by
                  office-goers across three nearby locations — and had to
                  hire 2 extra staff to manage demand.
                </p>

                <div className="cs-metrics">
                  <div className="cs-m">
                    <div className="cs-mn">3x</div>
                    <div className="cs-ml">Orders Growth</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">400+</div>
                    <div className="cs-ml">New Customers</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">0₹</div>
                    <div className="cs-ml">Spent on Ads</div>
                  </div>
                </div>

                <div className="cs-quote">
                  <p>
                    "We never thought anyone outside our building knew us.
                    Mumbai96 changed everything."
                  </p>
                  <cite>— Rekha Sharma, Owner</cite>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="cs-card rv d2">
              <div className="cs-head" data-num="02">
                <div className="cs-cat">Home Services</div>
                <div className="cs-name">ANAND ELECTRICALS</div>
                <div className="cs-area">
                  📍 Malad West · Licensed Electrician
                </div>
              </div>

              <div className="cs-body">
                <p className="cs-desc">
                  A solo electrician relying only on word-of-mouth. Within one
                  month of listing, he received genuine 60+ verified enquiries from,
                  Kandivali and Borivali — all thanks to Mumbai96 Team.
                </p>

                <div className="cs-metrics">
                  <div className="cs-m">
                    <div className="cs-mn">60+</div>
                    <div className="cs-ml">Enquiries / Month</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">5★</div>
                    <div className="cs-ml">Avg Rating</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">3</div>
                    <div className="cs-ml">Areas Served</div>
                  </div>
                </div>

                <div className="cs-quote">
                  <p>
                    "I used to wait for calls. Now I have to manage a waiting
                    list. Meeting with Mumbai96 team is a real gold for my business."
                  </p>
                  <cite>— Anand Pawar, Electrician</cite>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="cs-card rv d3">
              <div className="cs-head" data-num="03">
                <div className="cs-cat">Education</div>
                <div className="cs-name">PRIYA'S SPOKEN ENGLISH</div>
                <div className="cs-area">📍 Kurla · Language Academy</div>
              </div>

              <div className="cs-body">
                <p className="cs-desc">
                  A home-based spoken English tutor struggling to get students
                  beyond her apartment complex. Mumbai96 connected her with
                  students from Chembur, Ghatkopar and Sion — doubling her batch
                  size in 12 weeks.
                </p>

                <div className="cs-metrics">
                  <div className="cs-m">
                    <div className="cs-mn">2x</div>
                    <div className="cs-ml">Batch Size</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">8wk</div>
                    <div className="cs-ml">To Full Batches</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">5</div>
                    <div className="cs-ml">Areas Reached</div>
                  </div>
                </div>

                <div className="cs-quote">
                  <p>
                    "Students I never imagined finding me, found me. My dream of
                    a real academy feels real now."
                  </p>
                  <cite>— Priya Menon, Educator</cite>
                </div>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="cs-card rv d4">
              <div className="cs-head" data-num="04">
                <div className="cs-cat">Retail</div>
                <div className="cs-name">BANDRA BOOKWORM</div>
                <div className="cs-area">
                  📍 Bandra West · Independent Bookstore
                </div>
              </div>

              <div className="cs-body">
                <p className="cs-desc">
                  An independent bookstore competing with giant e-commerce.
                  Mumbai96 helped them build a loyal local community of readers
                  — with meetup events, local push and guided online presense help, 
                  visibility that no algorithm could replicate.
                </p>

                <div className="cs-metrics">
                  <div className="cs-m">
                    <div className="cs-mn">180%</div>
                    <div className="cs-ml">Footfall Rise</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">12</div>
                    <div className="cs-ml">Events Hosted</div>
                  </div>
                  <div className="cs-m">
                    <div className="cs-mn">800+</div>
                    <div className="cs-ml">Community Members</div>
                  </div>
                </div>

                <div className="cs-quote">
                  <p>
                    "Mumbai96 reminded Bandra that a local bookstore is
                    irreplaceable. We're thriving."
                  </p>
                  <cite>— Kabir Shah, Founder</cite>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="rv"
            style={{
              textAlign: "center",
              marginTop: "56px",
              padding: "48px",
              background: "var(--dark)",
              borderRadius: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2rem,5vw,4rem)",
                color: "#fff",
                letterSpacing: ".03em",
                marginBottom: "16px",
              }}
            >
              YOUR STORY COULD
              <br />
              BE <span style={{ color: "var(--gold)" }}>NEXT.</span>
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,.5)",
                marginBottom: "28px",
                fontSize: "14px",
                fontWeight: 300,
              }}
            >
              Add your free listing today. Zero cost. Zero catch.
            </p>

            <a href="/auth/login" className="btn-o">
              Start Free Today →
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
