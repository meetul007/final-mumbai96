// import "../style.css";
import Link from "next/link";

const FranchiseOpportunity = () => {
  // TEMP: client wants this page showing "Coming Soon" for now — real
  // franchise listing data isn't ready yet. The original page content
  // below is untouched, just unreachable while this flag is true.
  // Flip to false to restore it once real data is ready.
  const SHOW_COMING_SOON = true;
  if (SHOW_COMING_SOON) {
    return (
      <div className="coming-soon-page" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh',textAlign:'center',padding:'60px 20px'}}>
        <div style={{fontSize:'4rem',marginBottom:'16px'}}>🚧</div>
        <h1 style={{fontSize:'2rem',fontWeight:'800',margin:'0 0 8px',color:'var(--ink)'}}>Coming Soon</h1>
        <p style={{color:'var(--muted)',maxWidth:'440px',lineHeight:'1.7',marginBottom:'32px'}}>We&apos;re building something new for Mumbai. This page is under development and will be available soon.</p>
        <Link href="/" style={{padding:'12px 28px',borderRadius:'100px',background:'var(--red, #ff6b00)',color:'#fff',fontWeight:'700',textDecoration:'none',fontSize:'14px'}}>Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <>
        <section
          style={{
            position: "relative",
            minHeight: "54vh",
            display: "flex",
            alignItems: "center",
            background: "#2a1445",
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
            <div className="kicker light rv">Franchise Opportunities</div>

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
              FRANCHISE
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
              Discover ready-to-launch franchise opportunities across every
              corner of Mumbai. Backed by Mumbai96's reach, your growth story
              starts here.
            </p>

            <div
              className="rv d3"
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <a href="/auth/login" className="btn-o">
                List Your Franchise Free →
              </a>
              <a href="/case-study" className="btn-ghost">
                Success Stories
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "var(--light)" }}>
          <div className="con">
            <div className="rv">
              <div className="kicker">Franchise Deals</div>
              <h2 className="stitle">
                FIND YOUR
                <br />
                <em>NEXT VENTURE.</em>
              </h2>
              <p className="sdesc">
                Curated franchise opportunities from trusted Mumbai brands.
                Food, services, retail and more.
              </p>
            </div>

            <div className="fr-grid">
              {/* 1 */}
              <div className="fr-card rv d1">
                <div className="fr-head">
                  <div className="fr-cat">Food & Beverage</div>
                  <div className="fr-name">MUMBAI CHAI CO.</div>
                  <div className="fr-icon">☕</div>
                </div>
                <div className="fr-body">
                  <p className="fr-desc">
                    A fast-growing Mumbai chai and snacks franchise with proven
                    kiosk model.
                  </p>
                  <div className="fr-meta">
                    <div className="fr-m">
                      <div className="fr-ml">Investment</div>
                      <div className="fr-mv">₹3–5 Lakh</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Payback</div>
                      <div className="fr-mv">12–18 Months</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Space Required</div>
                      <div className="fr-mv">50–100 sq ft</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Outlets</div>
                      <div className="fr-mv">45+</div>
                    </div>
                  </div>
                  <a href="/franchise-deals" className="fr-cta">
                    Enquire Now →
                  </a>
                </div>
              </div>

              {/* 2 */}
              <div className="fr-card rv d2">
                <div className="fr-head">
                  <div className="fr-cat">Home Services</div>
                  <div className="fr-name">FIXMASTER PRO</div>
                  <div className="fr-icon">🔧</div>
                </div>
                <div className="fr-body">
                  <p className="fr-desc">
                    Home repair & maintenance franchise across Mumbai.
                  </p>
                  <div className="fr-meta">
                    <div className="fr-m">
                      <div className="fr-ml">Investment</div>
                      <div className="fr-mv">₹1.5–3 Lakh</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Payback</div>
                      <div className="fr-mv">8–12 Months</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Space</div>
                      <div className="fr-mv">No Outlet</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Partners</div>
                      <div className="fr-mv">80+</div>
                    </div>
                  </div>
                  <a href="/franchise-deals" className="fr-cta">
                    Enquire Now →
                  </a>
                </div>
              </div>

              {/* 3 */}
              <div className="fr-card rv d3">
                <div className="fr-head">
                  <div className="fr-cat">Education</div>
                  <div className="fr-name">SKILLUP ACADEMY</div>
                  <div className="fr-icon">📚</div>
                </div>
                <div className="fr-body">
                  <p className="fr-desc">
                    Spoken English & digital skills franchise.
                  </p>
                  <div className="fr-meta">
                    <div className="fr-m">
                      <div className="fr-ml">Investment</div>
                      <div className="fr-mv">₹2–4 Lakh</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Payback</div>
                      <div className="fr-mv">10–15 Months</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Space</div>
                      <div className="fr-mv">200–400 sq ft</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">City</div>
                      <div className="fr-mv">Mumbai</div>
                    </div>
                  </div>
                  <a href="/franchise-deals" className="fr-cta">
                    Enquire Now →
                  </a>
                </div>
              </div>

              {/* 4 */}
              <div className="fr-card rv d1">
                <div className="fr-head">
                  <div className="fr-cat">Beauty & Wellness</div>
                  <div className="fr-name">GLOW STUDIO MUM</div>
                  <div className="fr-icon">💅</div>
                </div>
                <div className="fr-body">
                  <p className="fr-desc">
                    Salon franchise for residential areas.
                  </p>
                  <div className="fr-meta">
                    <div className="fr-m">
                      <div className="fr-ml">Investment</div>
                      <div className="fr-mv">₹5–10 Lakh</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Payback</div>
                      <div className="fr-mv">14–20 Months</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Space</div>
                      <div className="fr-mv">300–600 sq ft</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Units</div>
                      <div className="fr-mv">22</div>
                    </div>
                  </div>
                  <a href="/franchise-deals" className="fr-cta">
                    Enquire Now →
                  </a>
                </div>
              </div>

              {/* 5 */}
              <div className="fr-card rv d2">
                <div className="fr-head">
                  <div className="fr-cat">Logistics</div>
                  <div className="fr-name">LASTMILE MUMBAI</div>
                  <div className="fr-icon">🛵</div>
                </div>
                <div className="fr-body">
                  <p className="fr-desc">Last-mile delivery micro-franchise.</p>
                  <div className="fr-meta">
                    <div className="fr-m">
                      <div className="fr-ml">Investment</div>
                      <div className="fr-mv">₹50K–1 Lakh</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Payback</div>
                      <div className="fr-mv">4–6 Months</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Fleet</div>
                      <div className="fr-mv">2–5 Bikes</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Partners</div>
                      <div className="fr-mv">120+</div>
                    </div>
                  </div>
                  <a href="/franchise-deals" className="fr-cta">
                    Enquire Now →
                  </a>
                </div>
              </div>

              {/* 6 */}
              <div className="fr-card rv d3">
                <div className="fr-head">
                  <div className="fr-cat">Cloud Kitchen</div>
                  <div className="fr-name">TIFFIN EXPRESS</div>
                  <div className="fr-icon">🍱</div>
                </div>
                <div className="fr-body">
                  <p className="fr-desc">
                    Cloud kitchen tiffin delivery model.
                  </p>
                  <div className="fr-meta">
                    <div className="fr-m">
                      <div className="fr-ml">Investment</div>
                      <div className="fr-mv">₹1–2 Lakh</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Payback</div>
                      <div className="fr-mv">6–10 Months</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Space</div>
                      <div className="fr-mv">Kitchen</div>
                    </div>
                    <div className="fr-m">
                      <div className="fr-ml">Units</div>
                      <div className="fr-mv">35</div>
                    </div>
                  </div>
                  <a href="/franchise-deals" className="fr-cta">
                    Enquire Now →
                  </a>
                </div>
              </div>
            </div>

            <div
              className="rv"
              style={{
                marginTop: "48px",
                textAlign: "center",
                background: "var(--dark)",
                borderRadius: "20px",
                padding: "44px",
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
                OWN A FRANCHISE BRAND?{" "}
                <span style={{ color: "var(--gold)" }}>LIST FREE.</span>
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.5)",
                  fontSize: "14px",
                  marginBottom: "24px",
                  fontWeight: 300,
                }}
              >
                Reach serious entrepreneurs across all 96 Mumbai neighbourhoods
                at zero cost.
              </p>

              <a href="/auth/login" className="btn-o">
                List Your Franchise →
              </a>
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default FranchiseOpportunity;
