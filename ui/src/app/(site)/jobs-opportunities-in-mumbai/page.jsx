// import "../style.css";

const JobsOpportunity = () => {
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
          <div className="kicker light rv">Jobs in Mumbai</div>

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
            JOBS & &nbsp;
            <span style={{ color: "var(--gold)" }}>OPPORTUNITIES.</span>
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
            Hundreds of job openings from local Mumbai businesses — from entry
            level to senior positions. Find work in your own neighbourhood.
          </p>

          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a href="/auth/login" className="btn-o">
              Post a Job Free →
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div className="con">
          <div className="rv">
            <div className="kicker">Latest Openings</div>
            <h2 className="stitle">
              FIND WORK IN
              <br />
              <em>YOUR MUMBAI.</em>
            </h2>
            <p className="sdesc">
              All jobs are from verified local Mumbai businesses. Direct contact
              — no middlemen.
            </p>
          </div>

          {/* FILTERS */}
          <div className="job-filters rv d1">
            <button className="jf on">All Jobs</button>
            <button className="jf">Full Time</button>
            <button className="jf">Part Time</button>
            <button className="jf">Work From Home</button>
            <button className="jf">Freshers</button>
            <button className="jf">Senior</button>
          </div>

          {/* JOB LIST */}
          <div className="job-list">
            <div className="jc rv d1">
              <div>
                <div className="j-title">Social Media Manager</div>
                <div className="j-co">
                  🏢 Andheri-based D2C Brand · 📍 Andheri West
                </div>
                <div className="j-tags">
                  <span className="j-tag type">Full Time</span>
                  <span className="j-tag">Marketing</span>
                  <span className="j-tag">1–3 yrs exp</span>
                  <span className="j-tag">Immediate Joiner</span>
                </div>
              </div>
              <div className="j-right">
                <div className="j-salary">₹25–35K/mo</div>
                <a href="/jobs-opportunities-in-mumbai" className="j-apply">
                  Apply Now
                </a>
              </div>
            </div>

            <div className="jc rv d2">
              <div>
                <div className="j-title">Delivery Executive</div>
                <div className="j-co">
                  🛵 QuickCart Mumbai · 📍 Multiple Areas
                </div>
                <div className="j-tags">
                  <span className="j-tag type">Part Time</span>
                  <span className="j-tag">Logistics</span>
                  <span className="j-tag">Freshers OK</span>
                  <span className="j-tag">Own Vehicle</span>
                </div>
              </div>
              <div className="j-right">
                <div className="j-salary">₹15–22K/mo</div>
                <a href="/jobs-opportunities-in-mumbai" className="j-apply">
                  Apply Now
                </a>
              </div>
            </div>

            <div className="jc rv d3">
              <div>
                <div className="j-title">Accounts Executive</div>
                <div className="j-co">🏦 Local CA Firm · 📍 Dadar East</div>
                <div className="j-tags">
                  <span className="j-tag type">Full Time</span>
                  <span className="j-tag">Finance</span>
                  <span className="j-tag">CA Inter / B.Com</span>
                  <span className="j-tag">2+ yrs</span>
                </div>
              </div>
              <div className="j-right">
                <div className="j-salary">₹20–30K/mo</div>
                <a href="/jobs-opportunities-in-mumbai" className="j-apply">
                  Apply Now
                </a>
              </div>
            </div>

            <div className="jc rv d1">
              <div>
                <div className="j-title">Salon Stylist / Beautician</div>
                <div className="j-co">
                  💅 Glow Studio Mumbai · 📍 Bandra West
                </div>
                <div className="j-tags">
                  <span className="j-tag type">Full Time</span>
                  <span className="j-tag">Beauty</span>
                  <span className="j-tag">Skilled</span>
                  <span className="j-tag">Good Salary + Tips</span>
                </div>
              </div>
              <div className="j-right">
                <div className="j-salary">₹18–28K/mo</div>
                <a href="/jobs-opportunities-in-mumbai" className="j-apply">
                  Apply Now
                </a>
              </div>
            </div>

            <div className="jc rv d2">
              <div>
                <div className="j-title">Content Writer — Local Stories</div>
                <div className="j-co">✍️ Mumbai96 · 📍 Work From Home</div>
                <div className="j-tags">
                  <span className="j-tag type">Work From Home</span>
                  <span className="j-tag">Writing</span>
                  <span className="j-tag">Freshers OK</span>
                  <span className="j-tag">Mumbai-Based</span>
                </div>
              </div>
              <div className="j-right">
                <div className="j-salary">₹12–18K/mo</div>
                <a href="/jobs-opportunities-in-mumbai" className="j-apply">
                  Apply Now
                </a>
              </div>
            </div>

            <div className="jc rv d3">
              <div>
                <div className="j-title">Restaurant Manager</div>
                <div className="j-co">🍽️ Popular Juhu Eatery · 📍 Juhu</div>
                <div className="j-tags">
                  <span className="j-tag type">Full Time</span>
                  <span className="j-tag">Hospitality</span>
                  <span className="j-tag">3+ yrs exp</span>
                  <span className="j-tag">Leadership Role</span>
                </div>
              </div>
              <div className="j-right">
                <div className="j-salary">₹35–50K/mo</div>
                <a href="/jobs-opportunities-in-mumbai" className="j-apply">
                  Apply Now
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="rv"
            style={{
              marginTop: "48px",
              background: "var(--dark)",
              borderRadius: "20px",
              padding: "44px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "2rem",
                  color: "#fff",
                  letterSpacing: ".04em",
                  marginBottom: "8px",
                }}
              >
                HIRING? POST YOUR JOB{" "}
                <span style={{ color: "var(--gold)" }}>FREE.</span>
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: "13px",
                  fontWeight: 300,
                }}
              >
                Reach job seekers across all 96 Mumbai neighbourhoods —
                instantly, at zero cost.
              </p>
            </div>

            <a href="/auth/login" className="btn-o" style={{ flexShrink: 0 }}>
              Post a Job →
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobsOpportunity;
