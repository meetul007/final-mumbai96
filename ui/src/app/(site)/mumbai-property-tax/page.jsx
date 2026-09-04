// import "./style.css";

function PropertyTaxDates() {
  return (
    <div class="sb-widget">
      <div class="sbw-head">
        Key <em>Dates</em> 2026
      </div>

      <div class="sbw-body sbw-body-sm">
        <div class="sb-list">
          <div class="sb-row">
            <span>First Half Due</span>
            <span class="sb-val highlight">Apr 30, 2026</span>
          </div>

          <div class="sb-row">
            <span>Second Half Due</span>
            <span class="sb-val highlight">Oct 31, 2026</span>
          </div>

          <div class="sb-row">
            <span>Late Penalty</span>
            <span class="sb-val danger">2%/month</span>
          </div>

          <div class="sb-row last">
            <span>Dispute Deadline</span>
            <span class="sb-val">60 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatedPages() {
  const links = [
    { href: "/bmc-complaint", label: "🚨 BMC Complaint Portal" },
    { href: "/mumbai-corporators", label: "🏛️ Find Your Corporator" },
    { href: "/mhada-lottery-mumbai", label: "🏠 MHADA Lottery Guide" },
  ];

  return (
    <div className="sb-widget">
      <div className="sbw-head">
        Related <em>Pages</em>
      </div>

      <div className="sbw-body">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className={`sb-link ${
              i !== links.length - 1 ? "border-b border-[var(--border)]" : ""
            }`}
          >
            {link.label} →
          </a>
        ))}
      </div>
    </div>
  );
}

function PropertyTaxPageBody() {
  const actions = [
    {
      icon: "💳",
      title: "Pay Property Tax Online",
      body: "Pay via net banking, credit/debit card, UPI or NEFT on the official MCGM portal.",
      cta: "Pay Now at MCGM Portal →",
      link: "https://propertytax.mcgm.gov.in",
    },
    {
      icon: "📋",
      title: "Check Outstanding Dues",
      body: "Enter your Property Account Number or address to check dues and penalties.",
      cta: "Check Dues →",
      link: "https://propertytax.mcgm.gov.in",
    },
    {
      icon: "🧾",
      title: "Download Tax Receipt",
      body: "Download official property tax receipt for any financial year.",
      cta: "Download Receipt →",
      link: "https://propertytax.mcgm.gov.in",
    },
    {
      icon: "⚠️",
      title: "Dispute Wrong Assessment",
      body: "File objection within 60 days if your tax bill is incorrect.",
      cta: "File Objection →",
      highlight: true,
    },
  ];

  const faqs = [
    {
      q: "How do I find my Property Account Number (PAN)?",
      a: "Check previous bill or search by address on the MCGM portal.",
    },
    {
      q: "Is property tax same as society maintenance?",
      a: "No. Property tax is paid to MCGM; maintenance is paid to society.",
    },
    {
      q: "How to transfer tax after buying property?",
      a: "Apply for mutation with sale deed and documents at ward office.",
    },
    {
      q: "Are senior citizens exempt?",
      a: "No blanket exemption, but some properties have reduced tax.",
    },
    {
      q: "Can MCGM take action for non-payment?",
      a: "Yes, they can attach property and initiate legal recovery.",
    },
  ];

  return (
    <div className="page-body">
      <div className="con">
        <div className="page-layout">
          {/* MAIN */}
          <main>
            {/* QUICK ACTIONS */}
            <div className="sec rv">
              <div className="sec-kicker">4 Things You Can Do</div>
              <h2 className="sec-title">
                Property Tax — <em>Quick Actions</em>
              </h2>

              <div className="action-grid">
                {actions.map((item, i) => (
                  <a
                    key={i}
                    href={item.link || "#"}
                    target={item.link ? "_blank" : undefined}
                    className="action-card"
                    style={!item.link ? { cursor: "default" } : undefined}
                  >
                    <div className="ac-icon">{item.icon}</div>
                    <div className="ac-title">{item.title}</div>
                    <p className="ac-body">{item.body}</p>

                    <div
                      className="ac-cta"
                      style={
                        item.highlight ? { background: "#dc2626" } : undefined
                      }
                    >
                      {item.cta}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* PAYMENT STEPS */}
            <div className="sec rv d1">
              <div className="sec-kicker">Step by Step</div>
              <h2 className="sec-title">
                How to Pay <em>Online</em>
              </h2>

              <div className="info-box">
                <h4>💻 Payment Steps</h4>
                <ul>
                  <li>Visit propertytax.mcgm.gov.in</li>
                  <li>Click "Pay Property Tax"</li>
                  <li>Enter Property Account Number (PAN)</li>
                  <li>Verify property details</li>
                  <li>Select payment period</li>
                  <li>Choose payment method (UPI / Card / Net Banking)</li>
                  <li>Complete payment and download receipt</li>
                </ul>
              </div>

              <div className="warn-box">
                <div className="warn-icon">📅</div>
                <div className="warn-body">
                  <h4>Deadline: April 30</h4>
                  <p>
                    Pay on time to avoid 2% monthly penalty on outstanding tax.
                  </p>
                </div>
              </div>
            </div>

            {/* DISPUTE */}
            <div className="sec rv">
              <div className="sec-kicker">Wrong Bill?</div>
              <h2 className="sec-title">
                How to <em>Dispute</em>
              </h2>

              <div className="info-box">
                <h4>⚖️ Grounds</h4>
                <ul>
                  <li>Incorrect carpet area</li>
                  <li>Wrong property type</li>
                  <li>Duplicate billing</li>
                  <li>Incorrect valuation</li>
                </ul>
              </div>

              <p>
                File objection within 60 days at ward office or email
                propertytax@mcgm.gov.in
              </p>
            </div>

            {/* FAQ */}
            <div className="sec rv d1">
              <div className="sec-kicker">FAQs</div>
              <h2 className="sec-title">
                Property Tax <em>Questions</em>
              </h2>

              <div className="faq">
                {faqs.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-q">{item.q}</summary>
                    <div className="faq-a">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </main>

          {/* SIDEBAR */}
          <aside className="page-sidebar">
            {/* CTA */}
            <div className="mcgm-card">
              <div className="mcgm-eyebrow">Official MCGM Portal</div>

              <p className="mcgm-desc">
                Pay online 24×7, download receipts, check dues — all on the
                official portal.
              </p>

              <a
                href="https://propertytax.mcgm.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="mcgm-btn primary"
              >
                propertytax.mcgm.gov.in →
              </a>

              <a href="tel:1916" className="mcgm-btn secondary">
                📞 Call MCGM: 1916
              </a>
            </div>
            <PropertyTaxDates />
            <RelatedPages />
          </aside>
        </div>
      </div>
    </div>
  );
}

const MumbaiProperty = () => {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>

        <div className="ph-glow"></div>

        <div className="con">
          <div className="ph-inner">
            {/* Breadcrumb */}
            <div className="ph-bc">
              <a href="/">Home</a>
              <span>/</span>
              <span>Property Tax Mumbai</span>
            </div>

            {/* Kicker */}
            <div className="ph-kicker">
              Mumbai96 · Civic Guide · MCGM Property Tax
            </div>

            {/* Heading */}
            <h1 className="ph-h1">
              Mumbai <em>Property Tax</em>
              &nbsp;
              2026 — Pay, Track
              &nbsp;
              &amp; Complain
            </h1>

            {/* Description */}
            <p className="ph-desc">
              Pay your MCGM property tax online in minutes, download receipts,
              check outstanding dues, track assessments and know how to dispute
              wrong property tax bills in Mumbai.
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">propertytax.mcgm.gov.in</div>
                <div className="phs-l">Official Portal</div>
              </div>

              <div className="phs">
                <div className="phs-n">1916</div>
                <div className="phs-l">MCGM Helpline</div>
              </div>

              <div className="phs">
                <div className="phs-n">April 30</div>
                <div className="phs-l">Annual Due Date</div>
              </div>

              <div className="phs">
                <div className="phs-n">2%</div>
                <div className="phs-l">Monthly Penalty if Late</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PropertyTaxPageBody />
    </>
  );
};

export default MumbaiProperty;
