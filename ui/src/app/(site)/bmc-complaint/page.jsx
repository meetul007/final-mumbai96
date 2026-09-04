import Link from "next/link";
import "./style.css";

export default function BMCComplaintPage() {
  const STEPS = [
    {
      title: "Go to my.bmc.gov.in and Register",
      desc: "Create a free account with your mobile number. OTP verification takes 30 seconds. Already registered? Just log in.",
    },
    {
      title: 'Click "Lodge Complaint"',
      desc: "From the dashboard, click Lodge Complaint. You'll be asked to select complaint type and your ward number.",
      tip: "💡 Don't know your ward? Search by area name on the site — it auto-detects.",
    },
    {
      title: "Select Complaint Category",
      desc: "Choose from: Roads, Street Lights, Drainage, Solid Waste, Water Supply, Building, Encroachments, etc. For potholes, select Roads → Pothole.",
    },
    {
      title: "Add Location + Photos",
      desc: "Pin the exact location on the map. Add 1–3 photos. Be specific in the description.",
      tip: "📸 Photos dramatically increase resolution speed. Always attach them.",
    },
    {
      title: "Submit and Save Your Complaint Number",
      desc: "You'll receive a complaint ID via SMS and email. Save this to track or escalate.",
    },
    {
      title: "Track & Escalate if Needed",
      desc: "Check status after 7 days. If unresolved after 21 days, escalate to Ward Officer or raise on Mumbai Voice.",
    },
  ];

  const COMPLAINTS = [
    {
      type: "Pothole on road",
      category: "Roads Department",
      time: "7–21 days",
      priority: "High Priority",
      tag: "st-urgent",
    },
    {
      type: "Illegal road digging / restoration pending",
      category: "Roads + Engineering",
      time: "14 days",
      priority: "Urgent",
      tag: "st-urgent",
    },
    {
      type: "Illegal speed bumper / hump",
      category: "Roads Department",
      time: "30 days",
      priority: "Moderate",
      tag: "st-moderate",
    },
    {
      type: "Broken street light",
      category: "Street Lighting Dept",
      time: "3–7 days",
      priority: "High Priority",
      tag: "st-urgent",
    },
    {
      type: "Waterlogging / drain blocked",
      category: "Storm Water Drains",
      time: "24–72 hrs (monsoon emergency)",
      priority: "Urgent",
      tag: "st-urgent",
    },
    {
      type: "Garbage not collected",
      category: "Solid Waste Management",
      time: "24–48 hours",
      priority: "Routine",
      tag: "st-normal",
    },
    {
      type: "Illegal construction / encroachment",
      category: "Building Proposals",
      time: "30 days",
      priority: "Moderate",
      tag: "st-moderate",
    },
    {
      type: "Water supply issue / no water",
      category: "Hydraulic Engineering",
      time: "24–48 hours",
      priority: "Urgent",
      tag: "st-urgent",
    },
    {
      type: "Footpath damage / missing tiles",
      category: "Roads Department",
      time: "21–30 days",
      priority: "Routine",
      tag: "st-normal",
    },
    {
      type: "Mosquito / pest complaint",
      category: "Health Department",
      time: "48–72 hours",
      priority: "Moderate",
      tag: "st-moderate",
    },
  ];

  const ESCALATION_STEPS = [
    'Re-open complaint on my.bmc.gov.in and mark it as "Unsatisfied with resolution"',
    "Call 1916 again — reference your existing complaint number and demand escalation to Ward Officer",
    "Email your Ward Office directly (find ward contact at mcgm.gov.in)",
    "Contact your elected Ward Corporator — it's literally their job to fix this",
    "File an RTI (Right to Information) asking for action taken on your complaint number",
    "Raise on Mumbai Voice — community upvotes amplify pressure on authorities",
    "Last resort: Consumer Forum complaint or media complaint (for major infrastructure failures)",
  ];

  const SEO_CONTENT = {
    title: "BMC Complaint for Potholes in Mumbai — 2026 Guide",
    sections: [
      {
        heading: "",
        body: `Mumbai has over 2,000 km of roads maintained by the BMC (Brihanmumbai Municipal Corporation). Every year, monsoon rains, utility digging and heavy traffic create thousands of potholes across the city's 24 wards. Knowing how to file a pothole complaint effectively can mean the difference between a road getting fixed in a week — or staying broken for months.`,
      },
      {
        heading: "What is the BMC Complaint Number for Potholes?",
        body: `The BMC 24×7 helpline is 1916. This is a free call available from any mobile or landline. You can also use the my.bmc.gov.in portal or the My BMC app. All three methods generate a complaint reference number that you can use to track progress.`,
      },
      {
        heading: "How Long Does BMC Take to Fix a Pothole?",
        body: `As per BMC's own service level agreement, pothole complaints must be addressed within 7 working days for major roads and 21 working days for internal roads. In practice, during non-monsoon months, resolution can take 2–4 weeks. Monsoon season (June–September) may cause delays due to volume.`,
      },
      {
        heading: "Can I Complain About Illegal Road Digging?",
        body: `Yes. Utility companies (water, electricity, telecom) are required to obtain No Objection Certificates (NOCs) before digging and must restore roads within 15 days of completion. If a road is dug without notice or not restored, file under Roads → Restoration Pending on the BMC portal.`,
      },
    ],
  };

  const RELATED_RESOURCES = [
    {
      href: "/mumbai-corporators",
      icon: "🏛️",
      title: "Ward Corporator Contacts",
      desc: "Find and contact your elected corporator ward-wise",
    },
    {
      href: "/bmc-hospitals-mumbai",
      icon: "🏥",
      title: "Free BMC Hospitals",
      desc: "All free BMC hospitals in Mumbai with contacts",
    },
    {
      href: "/mumbai-police-stations",
      icon: "👮",
      title: "Mumbai Police Stations",
      desc: "Find your nearest police station with contacts",
    },
    {
      href: "/mumbai-complaints-portal",
      icon: "📋",
      title: "All Mumbai Complaints",
      desc: "Railway, food, transport and other civic complaints",
    },
  ];

  const SIDEBAR_DATA = {
    quickActions: [
      {
        label: "📞 Call BMC: 1916",
        href: "tel:1916",
        type: "primary",
      },
      {
        label: "💻 Online Portal →",
        href: "https://my.bmc.gov.in",
        type: "secondary",
      },
    ],

    quickLinks: [
      {
        icon: "🏛️",
        label: "Find Your Ward Corporator",
        href: "/mumbai-corporators",
      },
      { icon: "🗺️", label: "BMC Ward Map", href: "/bmc-ward-map" },
      { icon: "📱", label: "Download My BMC App", href: "#" },
      { icon: "📋", label: "Track Existing Complaint", href: "#" },
      { icon: "📢", label: "Mumbai Voice — Community", href: "/mumbai-voice" },
    ],

    contacts: [
      { label: "BMC Helpline", value: "1916", href: "tel:1916" },
      { label: "Disaster / Flood", value: "1916", href: "tel:1916" },
      { label: "Water Supply", value: "2416-6000", href: "tel:24166000" },
      { label: "Street Lights", value: "Via Portal" },
    ],
  };

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="ph-grid"></div>

        <div
          className="ph-glow"
          style={{
            background: "rgba(239,68,68,.1)",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "400px",
          }}
        />

        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>BMC Complaint</span>
            </div>

            <div className="ph-kicker">Mumbai96 · Civic Guide · BMC</div>

            <h1 className="ph-h1">
              File a <em>BMC Complaint</em>
              &nbsp;
              Online — 2026 Guide
            </h1>

            <p className="ph-desc">
              Potholes ruining your commute? Illegal road digging? Broken street
              lights? Here's exactly how to file a BMC complaint in Mumbai.
            </p>

            <div className="ph-badges">
              <span className="ph-badge hot">🚨 High Demand Page</span>
              <span className="ph-badge">Updated March 2026</span>
              <span className="ph-badge">All 24 BMC Wards</span>
              <span className="ph-badge">Direct Portal Links</span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">3</div>
                <div className="phs-l">Ways to Complain</div>
              </div>
              <div className="phs">
                <div className="phs-n">24</div>
                <div className="phs-l">BMC Wards</div>
              </div>
              <div className="phs">
                <div className="phs-n">1916</div>
                <div className="phs-l">BMC Helpline</div>
              </div>
              <div className="phs">
                <div className="phs-n">21 Days</div>
                <div className="phs-l">Avg Resolution Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* METHODS */}
              <div className="sec">
                <div className="sec-kicker">3 Ways to File</div>

                <h2 className="sec-title">
                  How to File a <em>BMC Complaint</em>
                </h2>

                <div className="method-grid">
                  <div className="method-card">
                    <div className="mc-icon">💻</div>
                    <div className="mc-title">Online Portal</div>

                    <p className="mc-body">
                      File directly on the official BMC portal and track your
                      complaint.
                    </p>

                    <a
                      href="https://my.bmc.gov.in"
                      target="_blank"
                      className="mc-cta"
                    >
                      Go to Portal →
                    </a>
                  </div>

                  <div className="method-card">
                    <div className="mc-icon">📱</div>
                    <div className="mc-title">BMC App</div>

                    <p className="mc-body">
                      Use the My BMC app with GPS + photo upload.
                    </p>

                    <a
                      href="https://play.google.com/store/search?q=my+bmc"
                      target="_blank"
                      className="mc-cta"
                    >
                      Download App →
                    </a>
                  </div>

                  <div className="method-card">
                    <div className="mc-icon">📞</div>
                    <div className="mc-title">Helpline</div>

                    <p className="mc-body">
                      Call 1916 and register complaint instantly.
                    </p>

                    <a href="tel:1916" className="mc-cta">
                      Call 1916 →
                    </a>
                  </div>
                </div>
              </div>

              {/* STEPS */}
              <div className="sec">
                <div className="sec-kicker">Step by Step</div>

                <h2 className="sec-title">
                  Filing on <em>my.bmc.gov.in</em>
                </h2>

                <div className="steps">
                  {STEPS.map((step, i) => (
                    <div key={i} className="step">
                      <div className="step-num">{i + 1}</div>

                      <div className="step-content">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>

                        {step.tip && <div className="step-tip">{step.tip}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">What You Can Complain About</div>

                <h2 className="sec-title">
                  BMC <em>Complaint Types</em> & Priority
                </h2>

                <div className="table-wrap">
                  <table className="complaint-table">
                    <thead>
                      <tr>
                        <th>Complaint Type</th>
                        <th>BMC Category</th>
                        <th>Expected Resolution</th>
                        <th>Priority</th>
                      </tr>
                    </thead>

                    <tbody>
                      {COMPLAINTS.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <strong>{item.type}</strong>
                          </td>
                          <td>{item.category}</td>
                          <td>{item.time}</td>
                          <td>
                            <span className={`status-tag ${item.tag}`}>
                              {item.priority}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sec rv d1">
                <div className="sec-kicker">If BMC Doesn't Respond</div>

                <h2 className="sec-title">
                  How to <em>Escalate</em> Your Complaint
                </h2>

                {/* WARNING BOX */}
                <div className="warn-box">
                  <div className="warn-icon">⚠️</div>

                  <div className="warn-body">
                    <h4>BMC must respond within 21 working days by law</h4>
                    <p>
                      Under the BMC Act, unresolved complaints must be responded
                      to within 21 working days. If they don't respond, you have
                      legal escalation options.
                    </p>
                  </div>
                </div>

                {/* INFO BOX */}
                <div className="info-box">
                  <h4>📋 Escalation Path — In Order</h4>

                  <ul>
                    {ESCALATION_STEPS.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sec prose rv">
                <h2>{SEO_CONTENT.title}</h2>

                {SEO_CONTENT.sections.map((sec, i) => (
                  <div key={i}>
                    {sec.heading && <h3>{sec.heading}</h3>}
                    <p>{sec.body}</p>
                  </div>
                ))}
              </div>
            </main>
            {/* SIDEBAR */}
            <aside className="page-sidebar">
              {/* QUICK ACTION */}
              <div className="sb-widget">
                <div className="sbw-head">
                  🚨 Quick <em>Complaint</em>
                </div>

                <div className="sbw-body sb-actions">
                  {SIDEBAR_DATA.quickActions.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      className={`mc-cta ${item.type}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="sb-widget">
                <div className="sbw-head">
                  Quick <em>Links</em>
                </div>

                <div className="sbw-body">
                  {SIDEBAR_DATA.quickLinks.map((item, i) => (
                    <Link key={i} href={item.href} className="quick-link">
                      <div className="ql-icon">{item.icon}</div>
                      <div className="ql-text">{item.label}</div>
                      <div className="ql-arrow">→</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CONTACTS */}
              <div className="sb-widget">
                <div className="sbw-head">
                  BMC <em>Contacts</em>
                </div>

                <div className="sbw-body sb-contacts">
                  <p className="sb-note">Key BMC department numbers:</p>

                  {SIDEBAR_DATA.contacts.map((item, i) => (
                    <div key={i} className="sb-contact-row">
                      <span>{item.label}</span>

                      {item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        <span className="muted">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA BOX */}
              <div className="sb-cta-box">
                <div className="sb-cta-title">Mumbai Voice</div>

                <p>
                  Raise your civic issue publicly. Community upvotes get
                  complaints noticed faster.
                </p>

                <Link href="/mumbai-voice" className="sb-cta-btn">
                  Raise on Mumbai Voice →
                </Link>
              </div>
            </aside>
            <div style={{ marginTop: 40 }} className="rv">
              <div className="sec-kicker">Also on Mumbai96</div>

              <h2 className="sec-title">
                Related <em>Civic Resources</em>
              </h2>

              <div className="related-grid">
                {RELATED_RESOURCES.map((item, i) => (
                  <a key={i} href={item.href} className="rel-card">
                    <div className="rel-icon">{item.icon}</div>
                    <div className="rel-title">{item.title}</div>
                    <div className="rel-desc">{item.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
