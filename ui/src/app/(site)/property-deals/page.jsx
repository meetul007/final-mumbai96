// import "../style.css";

const PropertyDeals = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "54vh",
          display: "flex",
          alignItems: "center",
          background: "#1e0d33",
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
          <div className="kicker light rv">Mumbai Property</div>

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
            BEST PROPERTY
            &nbsp;
            <span style={{ color: "var(--red)" }}>DEALS IN MUMBAI.</span>
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
            Verified residential and commercial property deals across all 96
            Mumbai neighbourhoods. No broker traps. No commission games. Just
            real deals.
          </p>

          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a href="/auth/login" className="btn-o">
              List Your Property Free →
            </a>
            <a href="/know-mumbai" className="btn-ghost">
              Explore Neighbourhoods
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div className="con">
          <div className="rv">
            <div className="kicker">Property Deals</div>
            <h2 className="stitle">
              FIND YOUR
              <br />
              <em>MUMBAI HOME.</em>
            </h2>
            <p className="sdesc">
              Browse verified property listings across Mumbai. Click any card to
              enquire directly.
            </p>
          </div>

          {/* FILTERS */}
          <div className="prop-filters rv d1">
            <button className="pf on">🏘️ All Properties</button>
            <button className="pf">🏠 Buy</button>
            <button className="pf">🔑 Rent</button>
            <button className="pf">🏢 Commercial</button>
            <button className="pf">🌆 South Mumbai</button>
            <button className="pf">🌊 Western</button>
            <button className="pf">🏙️ Central</button>
          </div>

          {/* PROPERTY GRID */}
          <div className="prop-grid">
            <div className="prop-card rv d1">
              <div
                className="prop-thumb"
                style={{
                  background: "linear-gradient(135deg,#1e0d33,#371b58)",
                }}
              >
                🏢
                <span className="prop-badge">For Sale</span>
              </div>
              <div className="prop-body">
                <div className="prop-price">₹1.85 Cr</div>
                <div className="prop-title">2 BHK Sea-Facing Flat</div>
                <div className="prop-area">📍 Worli · 850 sq ft</div>
                <div className="prop-specs">
                  <span className="prop-spec">🛏 2 Bed</span>
                  <span className="prop-spec">🚿 2 Bath</span>
                  <span className="prop-spec">🚗 1 Parking</span>
                </div>
                <a href="/property-deals" className="prop-cta">
                  Enquire Now
                </a>
              </div>
            </div>

            <div className="prop-card rv d2">
              <div
                className="prop-thumb"
                style={{
                  background: "linear-gradient(135deg,#0a2010,#1a4a28)",
                }}
              >
                🏠
                <span className="prop-badge rent">For Rent</span>
              </div>
              <div className="prop-body">
                <div className="prop-price">₹32,000/mo</div>
                <div className="prop-title">Spacious 1 BHK</div>
                <div className="prop-area">📍 Andheri West · 550 sq ft</div>
                <div className="prop-specs">
                  <span className="prop-spec">🛏 1 Bed</span>
                  <span className="prop-spec">🚿 1 Bath</span>
                  <span className="prop-spec">✅ Furnished</span>
                </div>
                <a href="/property-deals" className="prop-cta">
                  Enquire Now
                </a>
              </div>
            </div>

            <div className="prop-card rv d3">
              <div
                className="prop-thumb"
                style={{
                  background: "linear-gradient(135deg,#1a0a00,#3d2300)",
                }}
              >
                🏗️
                <span className="prop-badge comm">Commercial</span>
              </div>
              <div className="prop-body">
                <div className="prop-price">₹2.4 Cr</div>
                <div className="prop-title">Office Space BKC</div>
                <div className="prop-area">
                  📍 Bandra Kurla Complex · 1200 sq ft
                </div>
                <div className="prop-specs">
                  <span className="prop-spec">🪟 Corner Unit</span>
                  <span className="prop-spec">🔌 IT Ready</span>
                </div>
                <a href="/property-deals" className="prop-cta">
                  Enquire Now
                </a>
              </div>
            </div>

            <div className="prop-card rv d1">
              <div
                className="prop-thumb"
                style={{
                  background: "linear-gradient(135deg,#200a40,#371b58)",
                }}
              >
                🏘️
                <span className="prop-badge">For Sale</span>
              </div>
              <div className="prop-body">
                <div className="prop-price">₹95 Lakh</div>
                <div className="prop-title">1 BHK New Construction</div>
                <div className="prop-area">📍 Mira Road East · 480 sq ft</div>
                <div className="prop-specs">
                  <span className="prop-spec">🛏 1 Bed</span>
                  <span className="prop-spec">🚿 1 Bath</span>
                  <span className="prop-spec">🌳 Garden View</span>
                </div>
                <a href="/property-deals" className="prop-cta">
                  Enquire Now
                </a>
              </div>
            </div>

            <div className="prop-card rv d2">
              <div
                className="prop-thumb"
                style={{
                  background: "linear-gradient(135deg,#001520,#003040)",
                }}
              >
                🌊
                <span className="prop-badge rent">For Rent</span>
              </div>
              <div className="prop-body">
                <div className="prop-price">₹18,000/mo</div>
                <div className="prop-title">Studio Apartment</div>
                <div className="prop-area">📍 Chembur · 320 sq ft</div>
                <div className="prop-specs">
                  <span className="prop-spec">🛏 Studio</span>
                  <span className="prop-spec">🚿 1 Bath</span>
                  <span className="prop-spec">✅ Semi-Furnished</span>
                </div>
                <a href="/property-deals" className="prop-cta">
                  Enquire Now
                </a>
              </div>
            </div>

            <div className="prop-card rv d3">
              <div
                className="prop-thumb"
                style={{
                  background: "linear-gradient(135deg,#0a1000,#1e3000)",
                }}
              >
                🏡
                <span className="prop-badge">For Sale</span>
              </div>
              <div className="prop-body">
                <div className="prop-price">₹3.2 Cr</div>
                <div className="prop-title">3 BHK Premium Flat</div>
                <div className="prop-area">📍 Powai · 1450 sq ft</div>
                <div className="prop-specs">
                  <span className="prop-spec">🛏 3 Bed</span>
                  <span className="prop-spec">🚿 3 Bath</span>
                  <span className="prop-spec">🏊 Club House</span>
                </div>
                <a href="/property-deals" className="prop-cta">
                  Enquire Now
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="rv"
            style={{
              marginTop: "48px",
              textAlign: "center",
              background: "var(--dark)",
              borderRadius: "20px",
              padding: "44px 32px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "2.4rem",
                color: "#fff",
                letterSpacing: ".04em",
                marginBottom: "12px",
              }}
            >
              OWN A PROPERTY?{" "}
              <span style={{ color: "var(--gold)" }}>LIST IT FREE.</span>
            </h3>

            <p
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: "14px",
                marginBottom: "24px",
                fontWeight: 300,
              }}
            >
              Reach thousands of genuine buyers and renters across Mumbai. No
              commission. No broker fees.
            </p>

            <a href="/auth/login" className="btn-o">
              List Your Property →
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyDeals;
