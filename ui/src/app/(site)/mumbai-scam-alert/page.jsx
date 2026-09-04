// import "./style.css";

function ScamAlertHero() {
  return (
    <div className="page-hero scam-hero">
      <div className="ph-grid"></div>
      <div className="ph-glow scam"></div>

      <div className="con">
        <div className="ph-inner">
          <div className="ph-bc">
            <a href="/">Home</a>
            <span>/</span>
            <span>Scam Alert</span>
          </div>

          <div className="ph-kicker">
            Mumbai96 · Safety Guide · Fraud & Scam Awareness
          </div>

          <h1 className="ph-h1">
            Mumbai <em>Scam Alert</em>
            &nbsp;
            2026 — Stay Safe,
            &nbsp;
            Stay Aware
          </h1>

          <p className="ph-desc">
            Mumbai sees thousands of fraud cases every year. From UPI scams to
            digital arrest threats, courier fraud and investment Ponzi schemes —
            know the most common scams targeting Mumbaikars in 2026.
          </p>
        </div>
      </div>

      <div className="ph-bottom">
        <div className="con">
          <div className="ph-stats">
            <div className="phs">
              <div className="phs-n">1930</div>
              <div className="phs-l">Cyber Crime Helpline</div>
            </div>

            <div className="phs">
              <div className="phs-n">₹500Cr+</div>
              <div className="phs-l">Fraud Lost in Mumbai 2025</div>
            </div>

            <div className="phs">
              <div className="phs-n">Free</div>
              <div className="phs-l">Reporting</div>
            </div>

            <div className="phs">
              <div className="phs-n">24×7</div>
              <div className="phs-l">Cyber Cell</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MumbaiScanAlert = () => {
  return (
    <>
      <ScamAlertHero />
      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* ALERT CTA */}
              <div className="sec rv">
                <div className="sec-kicker">Report Now If You're a Victim</div>

                <div className="fraud-cta">
                  <div>
                    <div className="fraud-eyebrow">
                      🚨 Fraud Victim? Act Immediately
                    </div>

                    <h3 className="fraud-title">
                      Call 1930 — Cyber Crime Helpline
                    </h3>

                    <p className="fraud-desc">
                      Available 24×7 · Free call · For UPI fraud, online
                      cheating, digital scams · The faster you call, the higher
                      the chance of fund recovery
                    </p>
                  </div>

                  <a href="tel:1930" className="fraud-call">
                    1930
                  </a>
                </div>
              </div>

              {/* SCAMS */}
              <div className="sec rv">
                <div className="sec-kicker">Top Scams in Mumbai 2026</div>
                <h2 className="sec-title">
                  Active <em>Fraud Types</em> — Know These
                </h2>

                <div className="alert-card">
                  <div className="ac2-icon">📱</div>
                  <div>
                    <div className="ac2-title">
                      Digital Arrest Scam — Most Dangerous
                    </div>
                    <div className="ac2-body">
                      Criminals impersonate CBI, ED, Narcotics or Telecom
                      officers and call claiming a "case" against you or your
                      relative. They demand money to "cancel the FIR" via video
                      call.{" "}
                      <strong>
                        NO government agency ever conducts arrests over phone or
                        video call. Hang up immediately.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="alert-card">
                  <div className="ac2-icon">💳</div>
                  <div>
                    <div className="ac2-title">
                      UPI / Banking Fraud — Most Common
                    </div>
                    <div className="ac2-body">
                      Fraudsters pose as bank officials and ask for OTP, UPI PIN
                      or screen share access. Once given, they drain your
                      account.{" "}
                      <strong>
                        Rule: No bank ever asks for OTP, PIN or password. Ever.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="alert-card">
                  <div className="ac2-icon">📦</div>
                  <div>
                    <div className="ac2-title">
                      Courier Scam (FedEx / DTDC Fraud)
                    </div>
                    <div className="ac2-body">
                      Caller claims a parcel in your name contains drugs/illegal
                      items and threatens arrest unless you pay "settlement
                      money".{" "}
                      <strong>
                        No courier company or police ever calls to demand money
                        for releasing a parcel.
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="alert-card">
                  <div className="ac2-icon">💰</div>
                  <div>
                    <div className="ac2-title">Part-Time Job / Task Scam</div>
                    <div className="ac2-body">
                      Online ads offer ₹500–₹5,000 per task. They initially pay
                      small amounts, then trap you into depositing large sums.{" "}
                      <strong>Never deposit money to earn money.</strong>
                    </div>
                  </div>
                </div>

                <div className="alert-card">
                  <div className="ac2-icon">🏠</div>
                  <div>
                    <div className="ac2-title">Property / Builder Fraud</div>
                    <div className="ac2-body">
                      Fake brokers or builders take advance money for fake
                      flats. <strong>Always verify RERA before paying.</strong>
                    </div>
                  </div>
                </div>

                <div className="alert-card">
                  <div className="ac2-icon">📈</div>
                  <div>
                    <div className="ac2-title">Investment / Trading Scam</div>
                    <div className="ac2-body">
                      WhatsApp/Telegram groups promising guaranteed returns.{" "}
                      <strong>Guaranteed returns are always fraud.</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* RULES */}
              <div className="sec rv d1">
                <div className="sec-kicker">How to Protect Yourself</div>

                <h2 className="sec-title">
                  <em>10 Rules</em> Every Mumbaikar Should Know
                </h2>

                <div className="info-box">
                  <h4>🛡️ Anti-Fraud Golden Rules</h4>

                  <ul>
                    <li>
                      Never share OTP, UPI PIN, CVV or online banking password
                      with anyone — including "bank officials"
                    </li>

                    <li>
                      Never download apps suggested by unknown callers (AnyDesk,
                      TeamViewer etc. are remote access tools used by scammers)
                    </li>

                    <li>
                      Police, CBI, ED, TRAI never call to "arrest" or "settle
                      cases" over phone. Hang up — always.
                    </li>

                    <li>
                      Never pay money to receive a parcel, prize, lottery or job
                      offer. Legitimate processes don't work this way.
                    </li>

                    <li>
                      Verify any builder/property with RERA at{" "}
                      <a
                        href="https://maharera.mahaonline.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        maharera.mahaonline.gov.in
                      </a>{" "}
                      before paying anything
                    </li>

                    <li>
                      Investment groups on WhatsApp/Telegram promising
                      guaranteed returns are 100% scams
                    </li>

                    <li>
                      If you received a suspicious call, note the number and
                      report at{" "}
                      <a
                        href="https://cybercrime.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        cybercrime.gov.in
                      </a>
                    </li>

                    <li>
                      Enable SIM swap alerts with your telecom operator and set
                      up 2FA on banking apps
                    </li>

                    <li>
                      If defrauded, call <a href="tel:1930">1930</a> immediately
                      — banks can freeze transactions if reported fast enough
                    </li>

                    <li>
                      Share this information with elderly parents and neighbours
                      — they are the most targeted demographic
                    </li>
                  </ul>
                </div>
              </div>

              {/* REPORT TABLE */}
              <div className="sec rv">
                <div className="sec-kicker">How to Report</div>

                <h2 className="sec-title">
                  Reporting <em>Fraud</em> in Mumbai
                </h2>

                <div className="report-box">
                  {/* HEADER */}
                  <div className="report-head">
                    <span>Type of Fraud</span>
                    <span>Where to Report</span>
                    <span>Contact</span>
                  </div>

                  {/* ROWS */}
                  <div className="report-row">
                    <span>UPI / Online Banking Fraud</span>
                    <span>National Cyber Crime Portal + 1930</span>
                    <a href="tel:1930">1930</a>
                  </div>

                  <div className="report-row">
                    <span>Digital Arrest / Impersonation</span>
                    <span>Nearest Police Station + Cyber Cell</span>
                    <a href="tel:100">100 + 1930</a>
                  </div>

                  <div className="report-row">
                    <span>Property / Real Estate Fraud</span>
                    <span>RERA + Economic Offence Wing</span>
                    <a
                      href="https://maharera.mahaonline.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      maharera.gov.in
                    </a>
                  </div>

                  <div className="report-row">
                    <span>Investment / Stock Scam</span>
                    <span>SEBI + Cyber Crime Portal</span>
                    <a
                      href="https://scores.sebi.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      scores.sebi.gov.in
                    </a>
                  </div>

                  <div className="report-row">
                    <span>Consumer / Product Fraud</span>
                    <span>Consumer Helpline</span>
                    <a href="tel:1915">1915</a>
                  </div>

                  <div className="report-row">
                    <span>Insurance Fraud</span>
                    <span>IRDAI Grievance Cell</span>
                    <a href="tel:155255">155255</a>
                  </div>
                </div>
              </div>
            </main>

            {/* SIDEBAR */}
            <aside className="page-sidebar">
              <div className="fraud-sidebar">
                <div className="fs-icon">🚨</div>
                <div className="fs-label">Fraud Victim?</div>
                <div className="fs-number">1930</div>
                <div className="fs-desc">Cyber Crime Helpline · 24×7</div>

                <a href="tel:1930" className="fs-btn">
                  Call 1930 Now
                </a>

                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  className="fs-btn-outline"
                >
                  Report Online →
                </a>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  Verify <em>Before You Pay</em>
                </div>

                <div className="sbw-body verify-box">
                  <a
                    href="https://maharera.mahaonline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-link"
                  >
                    🏠 Verify Builder — RERA →
                  </a>

                  <a
                    href="https://scores.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-link"
                  >
                    📈 Verify Advisor — SEBI →
                  </a>

                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-link"
                  >
                    💻 Report Cyber Crime →
                  </a>

                  <a href="tel:1915" className="verify-link">
                    📞 Consumer Helpline: 1915
                  </a>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  Related <em>Pages</em>
                </div>

                <div className="sbw-body">
                  <a
                    href="/mumbai-police-stations"
                    className="rel-link bordered"
                  >
                    👮 Police Station Directory →
                  </a>

                  <a href="/mumbai-voice" className="rel-link">
                    📢 Mumbai Voice — Report →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default MumbaiScanAlert;
