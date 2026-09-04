"use client";

export default function ContactHero({ setCategory, setStep }) {
  const quickSelect = (cat) => {
    if (setCategory) setCategory(cat);
    if (setStep) setStep(2); // jump to form step 2
  };

  return (
    <section className="hero hero-full-height">
      <div className="hero-grid"></div>
      <div className="hero-blob hb1"></div>
      <div className="hero-blob hb2"></div>
      <div className="hero-blob hb3"></div>

      <div className="con">
        <div className="hero-inner">
          <div className="hero-left rv">
            <div className="hero-kicker">Get in Touch · Mumbai96</div>

            <h1 className="hero-h1">
              LET'S TALK <em>MUMBAI.</em>
            </h1>

            <p className="hero-sub">
              From listing help to fraud reports, press enquiries to community
              ideas —
              <br />
              pick your topic below and we'll get you to the right place
              instantly.
            </p>

            {/* Chips */}
            <div className="hero-chips rv d1">
              <span className="chip" onClick={() => quickSelect("listing")}>
                <span className="chip-icon">🏢</span> Add a Listing
              </span>

              <span className="chip" onClick={() => quickSelect("fraud")}>
                <span className="chip-icon">🚨</span> Report Fraud
              </span>

              <span className="chip" onClick={() => quickSelect("partnership")}>
                <span className="chip-icon">🤝</span> Partnership
              </span>

              <span className="chip" onClick={() => quickSelect("press")}>
                <span className="chip-icon">📰</span> Press
              </span>

              <span className="chip" onClick={() => quickSelect("hello")}>
                <span className="chip-icon">👋</span> Say Hello
              </span>
            </div>

            {/* Promise */}
            <div className="hero-promise rv d2">
              <div className="promise-item">
                <div className="promise-dot"></div>
                <div className="promise-text">
                  <strong>Always Respond</strong>
                  Within 24 hours
                </div>
              </div>

              <div className="promise-item">
                <div
                  className="promise-dot"
                  style={{
                    background: "var(--gold)",
                    boxShadow: "0 0 0 3px rgba(245,166,35,.2)",
                  }}
                ></div>
                <div className="promise-text">
                  <strong>Anonymous Reports</strong>
                  For fraud & safety
                </div>
              </div>

              <div className="promise-item">
                <div
                  className="promise-dot"
                  style={{
                    background: "#10B981",
                    boxShadow: "0 0 0 3px rgba(16,185,129,.2)",
                  }}
                ></div>
                <div className="promise-text">
                  <strong>Real Mumbaikars</strong>
                  Not bots
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
