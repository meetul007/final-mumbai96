import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

const quickLinks = [
  { href: "/coop-society-mumbai", icon: "🏘️", label: "Co-op Society Bye Laws" },
  { href: "/lift-licence-mumbai", icon: "🛗", label: "Lift Licence & Renewal" },
  { href: "/property-tax-mumbai", icon: "🏦", label: "Property Tax Payment" },
  { href: "/mhada-lottery-mumbai", icon: "🏗️", label: "MHADA Lottery 2026" },
  { href: "/mumbai-exhibitions", icon: "🎪", label: "Mumbai Exhibitions 2026" },
  { href: "/save-electricity-mumbai", icon: "⚡", label: "Save Electricity Mumbai" },
  { href: "/coop-society-imp-mumbai", icon: "🏢", label: "Society IMP Guide" },
  { href: "/mumbai-lost-found", icon: "🔍", label: "Mumbai Lost & Found" },
  { href: "/ngos-mumbai", icon: "🤝", label: "Verified NGOs Mumbai" },
  { href: "/women-empowerment-mumbai", icon: "👩", label: "Women Empowerment" },
];

export default function CoopSocietyImpPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/coop-society-mumbai", label: "Co-op Society" },
          { label: "Society IMP Guide" },
        ]}
        kicker="Mumbai96 · Housing Society · Improvement Guide"
        title={
          <>
            Society <em>Improvement</em>
            &nbsp;
            Guide <span className="gold">Mumbai 2026</span>
          </>
        }
        description={
          <>
            The complete reference for Mumbai co-op housing societies — solar
            installation, BMC colour rules, annual repairs, plumbing maintenance,
            CCTV setup, entry/exit systems and modern security.
          </>
        }
        stats={[
          { value: "6", label: "Key Improvement Areas" },
          { value: "ROI", label: "Solar in 4–5 Years" },
          { value: "BMC", label: "Colour Approval Needed" },
          { value: "CHS Act", label: "Governs All Works" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
            <div className="sec rv">
              <div className="sec-kicker">1 — Solar Energy</div>
              <h2 className="sec-title">
                Society <em>Solar Installation</em> — Complete Guide
              </h2>
              <div className="tip-card">
                <div className="tip-icon">☀️</div>
                <div className="tip-body">
                  <h4>Why Every Mumbai Society Should Go Solar</h4>
                  <p>
                    Mumbai gets 5.5–6 peak sun hours daily. A 10–25 kW rooftop solar
                    system can power all common area electricity — lifts, corridor
                    lights, pump motors, security systems and gardens — reducing
                    society&apos;s electricity bill by 70–100%. PM Surya Ghar subsidy
                    up to ₹78,000 available per unit (individual flat owners) + group
                    housing discounts.
                  </p>
                  <span className="tip-save">
                    💰 Common area bill to near-zero | 10kW system ≈ ₹5–7 lakh after
                    subsidy
                  </span>
                </div>
              </div>
              <div className="card-grid">
                <div className="data-card">
                  <div className="dc-icon">📋</div>
                  <div className="dc-title">Approval Process</div>
                  <div className="dc-body">
                    Pass a resolution at AGM or SGM. Get structural audit for terrace
                    load-bearing. Apply for MSEDCL net metering. Empanel MNRE-approved
                    vendor. Building plan permission may be needed from BMC for large
                    systems.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">💰</div>
                  <div className="dc-title">Subsidy & Financing</div>
                  <div className="dc-body">
                    PM Surya Ghar: ₹30,000/kW (first 2kW) + ₹18,000 for 3rd kW. Group
                    housing schemes available. NABARD green financing. Most banks offer
                    Solar EMI loans at 7–9% for societies.
                  </div>
                  <a
                    href="https://pmsuryaghar.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Apply Now ↗
                  </a>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🔌</div>
                  <div className="dc-title">Net Metering</div>
                  <div className="dc-body">
                    Apply for net metering via MSEDCL / Mahadiscom. Surplus solar units
                    exported to grid are credited to your account, further reducing the
                    bill. Apply at mahadiscom.in after panel installation.
                  </div>
                  <a
                    href="https://www.mahadiscom.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Apply MSEDCL ↗
                  </a>
                </div>
              </div>
              <div className="info-box">
                <h4>📋 Solar Installation Checklist for Societies</h4>
                <ul>
                  <li>
                    Pass AGM resolution approving solar installation and approving the
                    capital expenditure
                  </li>
                  <li>
                    Get structural certificate from licensed civil engineer — terrace
                    can bear panel load (12–15 kg/m²)
                  </li>
                  <li>
                    Select MNRE-empanelled / MSEDCL-approved vendor via tender process
                    (3 quotes mandatory)
                  </li>
                  <li>
                    Apply for MSEDCL net metering connection before installation begins
                  </li>
                  <li>
                    Check BMC building permission — systems above 10kW may need
                    structural drawing approval
                  </li>
                  <li>
                    Ensure insurance coverage for solar panels under society&apos;s
                    building insurance policy
                  </li>
                  <li>
                    Create a solar maintenance fund — annual O&amp;M contract with
                    installer (₹5,000–₹15,000/year)
                  </li>
                </ul>
              </div>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">2 — Exterior Painting</div>
              <h2 className="sec-title">
                Society <em>Painting Rules</em> — BMC Colour Guidelines
              </h2>
              <div className="warn-box">
                <div className="warn-icon">🎨</div>
                <div className="warn-body">
                  <h4>BMC Colour Scheme — Approval Required</h4>
                  <p>
                    BMC periodically mandates specific colour schemes for building
                    exteriors in different wards. Societies cannot arbitrarily paint
                    buildings in non-approved colours without prior NOC from the Ward
                    Office. Violation can result in BMC directing the society to repaint
                    at their own cost.
                  </p>
                </div>
              </div>
              <div className="card-grid">
                <div className="data-card">
                  <div className="dc-icon">🖌️</div>
                  <div className="dc-title">BMC Colour Policy</div>
                  <div className="dc-body">
                    BMC issued Heritage Precinct Colour Codes for South Mumbai (Fort,
                    Colaba, Dadar HPC). For suburbs, Ward Office approval needed before
                    exterior painting. Choose from BMC&apos;s approved palette.
                  </div>
                  <a
                    href="https://www.mcgm.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-cta"
                  >
                    Check BMC ↗
                  </a>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🏗️</div>
                  <div className="dc-title">Painting Frequency</div>
                  <div className="dc-body">
                    Standard: exterior every 3–5 years (Mumbai humidity accelerates
                    weathering). Waterproofing before painting is essential. Interior
                    common areas: every 3–4 years or as needed after monsoon.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">💧</div>
                  <div className="dc-title">Waterproofing First</div>
                  <div className="dc-body">
                    Always do waterproofing treatment before exterior painting — crack
                    filling, waterproof putty, elastomeric coating or Dampstop layer.
                    Failure to waterproof first means the paint will peel within 1
                    monsoon.
                  </div>
                </div>
              </div>
              <div className="info-box">
                <h4>✅ Painting Project Checklist</h4>
                <ul>
                  <li>Pass painting resolution at AGM/SGM with budget approved</li>
                  <li>
                    Obtain Ward Office NOC for exterior colour (check if your building is
                    in Heritage Precinct)
                  </li>
                  <li>Get 3 comparative quotations from licensed painting contractors</li>
                  <li>
                    Ensure scaffolding compliance with BMC safety norms before erecting
                  </li>
                  <li>Do waterproofing / crack repair treatment before painting</li>
                  <li>
                    Use approved exterior-grade waterproof paint (Asian Paints Apex /
                    Berger Weathercoat / Nerolac Suraksha)
                  </li>
                  <li>
                    Maintain photographic record before, during and after for society
                    records
                  </li>
                </ul>
              </div>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">3 — Plumbing & Water</div>
              <h2 className="sec-title">
                Society <em>Plumbing</em> Maintenance Guide
              </h2>
              <div className="card-grid">
                <div className="data-card">
                  <div className="dc-icon">🚿</div>
                  <div className="dc-title">Annual Plumbing Audit</div>
                  <div className="dc-body">
                    Appoint a licensed plumber for annual inspection — water risers,
                    terrace tanks, pump room, drainage lines, sump, overhead tank.
                    Prevent leakage before monsoon every May.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">💧</div>
                  <div className="dc-title">Overhead Tank Cleaning</div>
                  <div className="dc-body">
                    Mandatory: clean overhead tanks twice a year (pre-monsoon +
                    post-monsoon). Engage BMC-approved or licensed cleaning agency.
                    Society should have cleaning record maintained.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🔧</div>
                  <div className="dc-title">Riser Replacement</div>
                  <div className="dc-body">
                    GI water risers older than 20 years must be inspected for corrosion.
                    Replace with CPVC or uPVC pipes — lighter, no corrosion, cheaper.
                    Requires BMC plumber NOC for multi-storey societies.
                  </div>
                </div>
              </div>
              <div className="info-box">
                <h4>🔧 Annual Plumbing Maintenance Schedule</h4>
                <ul>
                  <li>
                    <strong>Pre-Monsoon (April–May):</strong> Inspect all drainage, clear
                    clogged pipes, check terrace waterproofing
                  </li>
                  <li>
                    <strong>Post-Monsoon (October):</strong> Check for seepage, water
                    stains, crack formation from rain
                  </li>
                  <li>
                    <strong>Water Tank Cleaning:</strong> April &amp; October — mandatory
                    for potable water safety
                  </li>
                  <li>
                    <strong>Pump Maintenance:</strong> Monthly visual inspection; annual
                    comprehensive service by contractor
                  </li>
                  <li>
                    <strong>STP (Sewage Treatment Plant):</strong> Monthly maintenance if
                    society has STP (mandatory for 20+ flats)
                  </li>
                  <li>
                    <strong>Water Meter Reading:</strong> Record bulk water meter reading
                    monthly for dispute prevention
                  </li>
                </ul>
              </div>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">4 — CCTV Cameras</div>
              <h2 className="sec-title">
                Society <em>CCTV Setup</em> — Coverage &amp; Compliance
              </h2>
              <div className="tip-card">
                <div className="tip-icon">📹</div>
                <div className="tip-body">
                  <h4>CCTV Is Now Practically Mandatory for Mumbai Societies</h4>
                  <p>
                    Mumbai Police and BMC strongly recommend CCTV for all residential
                    societies. Post-2020, many societies have been asked to provide CCTV
                    footage during police investigations. Modern IP camera systems cost
                    ₹1,500–₹4,000 per camera with cloud/NVR storage. A 20-camera system
                    for a building costs ₹40,000–₹80,000 installed.
                  </p>
                </div>
              </div>
              <div className="card-grid">
                <div className="data-card">
                  <div className="dc-icon">📍</div>
                  <div className="dc-title">Where to Install</div>
                  <div className="dc-body">
                    Main entrance/exit gates (must), lift lobbies on all floors,
                    stairwells, parking lots, terrace access, basement, garden perimeter.
                    Minimum: main gate + all lift lobbies.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">💾</div>
                  <div className="dc-title">Storage & Resolution</div>
                  <div className="dc-body">
                    Minimum 2MP (1080p) cameras. Storage: 30 days of footage minimum
                    (police requirement). Use NVR with 2TB+ HDD or cloud storage. Test
                    storage weekly — dead HDDs are common.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">📋</div>
                  <div className="dc-title">Legal Compliance</div>
                  <div className="dc-body">
                    Do NOT install cameras inside lifts (privacy violation). Common areas
                    only. Display &quot;CCTV in Operation&quot; signages at entry/exit.
                    Society must have a written CCTV data policy under IT Act.
                  </div>
                </div>
              </div>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">5 — Entry/Exit Systems</div>
              <h2 className="sec-title">
                Modern <em>Entry/Exit</em> Access Control
              </h2>
              <div className="card-grid">
                <div className="data-card">
                  <div className="dc-icon">📱</div>
                  <div className="dc-title">Video Door Phone / Intercom</div>
                  <div className="dc-body">
                    IP video intercom connects all flats to main gate. Flat owner can see
                    and speak with visitor on phone or intercom panel. Cost: ₹800–₹2,000/flat
                    installed. Most popular: 2-wire systems.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🚗</div>
                  <div className="dc-title">Boom Barrier (Parking)</div>
                  <div className="dc-body">
                    RFID or number plate recognition boom barriers for vehicle access.
                    Prevents unauthorised parking. Cost: ₹80,000–₹2,50,000. Vendors: Faac,
                    Came, BFT, local Indian brands.
                  </div>
                </div>
                <div className="data-card">
                  <div className="dc-icon">🔐</div>
                  <div className="dc-title">Face / RFID Access</div>
                  <div className="dc-body">
                    Biometric face recognition or RFID card/tag access for residents.
                    Generates auto access log. Cost: ₹15,000–₹40,000 per gate. Useful for
                    high-rise societies with 100+ flats.
                  </div>
                </div>
              </div>
              <div className="warn-box">
                <div className="warn-icon">📱</div>
                <div className="warn-body">
                  <h4>Society Management Apps — Recommended</h4>
                  <p>
                    Apps like MyGate, NoBrokerHood, ADDA and ApnaComplex integrate visitor
                    management, digital gate pass, delivery tracking, amenity booking and
                    maintenance complaints in one platform. Monthly cost: ₹5–₹15/flat.
                  </p>
                </div>
              </div>
            </div>

            <div className="sec rv">
              <div className="sec-kicker">6 — Security</div>
              <h2 className="sec-title">
                Society <em>Security Setup</em> Best Practices
              </h2>
              <div className="info-box">
                <h4>🛡️ Complete Society Security Framework</h4>
                <ul>
                  <li>
                    <strong>Trained Security Guards:</strong> Hire from PSARA-licensed
                    security agency — all guards must have PSARA verification and police
                    verification. Society is legally responsible for guard conduct.
                  </li>
                  <li>
                    <strong>Visitor Management:</strong> Every visitor log — name, flat
                    visiting, purpose, vehicle number, time in/out. Use digital log
                    (MyGate/NoBrokerHood) or paper register.
                  </li>
                  <li>
                    <strong>Delivery Management:</strong> Designate a delivery collection
                    point at gate. No delivery personnel should enter building unless
                    specifically called up by flat owner.
                  </li>
                  <li>
                    <strong>Night Security:</strong> Mandatory patrolling of all floors,
                    terrace, parking, perimeter fence every 2 hours. Guard should sign
                    patrol register / use patrol app.
                  </li>
                  <li>
                    <strong>Emergency Protocol:</strong> Society must have a written
                    emergency SOP — fire, medical emergency, earthquake, robbery. Share
                    with all residents annually.
                  </li>
                  <li>
                    <strong>Police Liaison:</strong> Register with local police chowki.
                    Most Mumbai police stations have a Society Security coordination cell
                    — contact and register your society.
                  </li>
                  <li>
                    <strong>Fire Safety:</strong> Annual fire safety audit mandatory for
                    buildings above G+3. Fire extinguishers: inspect quarterly. Fire NOC
                    from CFO (Chief Fire Officer) must be current.
                  </li>
                </ul>
              </div>
              <a
                href="https://www.mcgm.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">🏙️</div>
                <div className="lc-body">
                  <div className="lc-title">MCGM — Building Safety &amp; Fire NOC</div>
                  <div className="lc-desc">
                    Apply for fire NOC, structural audit empanelment, building permission
                    for improvement works
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
              <a
                href="https://mahasahakar.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <div className="lc-icon">🏛️</div>
                <div className="lc-body">
                  <div className="lc-title">MahaSahakar — Society Dispute &amp; Compliance</div>
                  <div className="lc-desc">
                    File complaints, check compliance status, dispute redressal for society
                    management issues
                  </div>
                </div>
                <div className="lc-arrow">↗</div>
              </a>
            </div>

            <div className="prose rv">
              <h2>Mumbai Co-op Society Improvement Guide 2026</h2>
              <p>
                A well-maintained co-operative housing society in Mumbai is not just
                about aesthetics — it directly impacts property values, resident safety
                and quality of life. Under the Maharashtra Co-operative Societies Act, the
                Managing Committee is duty-bound to maintain the building and common
                areas to a satisfactory standard using funds from the{" "}
                <strong>Repair &amp; Maintenance Fund and Sinking Fund</strong> collected
                monthly from members.
              </p>
              <h3>Can the Committee Undertake Major Works Without Member Approval?</h3>
              <p>
                For major capital works above the threshold set in the bye laws (typically
                ₹50,000–₹1 lakh), a <strong>Special General Body Meeting</strong>{" "}
                resolution is required. Routine maintenance within the approved annual
                budget can be done by the Committee. Solar installation, major plumbing
                rework, CCTV installation and security system upgrades would generally
                require SGM approval.
              </p>
              <h3>Society Annual Maintenance Calendar</h3>
              <p>
                Every Managing Committee should prepare an annual maintenance schedule at
                the beginning of the financial year — covering pre-monsoon preparation
                (April–May), post-monsoon repairs (October), annual painting cycle,
                CCTV/security system check, fire safety audit, and lift inspection
                renewal. Presenting this plan at the AGM builds member trust and ensures
                adequate budgeting.
              </p>
            </div>
            </main>
            <aside className="page-sidebar">
            <div className="sb-widget">
              <div className="sbw-head">
                🔗 Key <em>Portals</em>
              </div>
              <div className="sbw-body">
                <a
                  href="https://pmsuryaghar.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">☀️ Solar Subsidy</span>
                  <span className="sb-row-value--cta">Apply ↗</span>
                </a>
                <a
                  href="https://www.mahadiscom.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">⚡ Net Metering</span>
                  <span className="sb-row-value--cta">MSEDCL ↗</span>
                </a>
                <a
                  href="https://mahasahakar.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">🏛️ MahaSahakar</span>
                  <span className="sb-row-value--cta">Visit ↗</span>
                </a>
                <a
                  href="https://www.mcgm.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sb-row"
                >
                  <span className="sb-row-label">🏙️ BMC / MCGM</span>
                  <span className="sb-row-value--cta">Visit ↗</span>
                </a>
              </div>
            </div>
            <div className="sb-widget">
              <div className="sbw-head">
                📋 Annual <em>Checklist</em>
              </div>
              <div className="sbw-body sb-list-plain">
                <div>☀️ Solar system inspection</div>
                <div>🎨 Exterior painting (every 3–5yr)</div>
                <div>💧 Water tank cleaning (twice)</div>
                <div>📹 CCTV storage test</div>
                <div>🛗 Lift licence renewal</div>
                <div>🔥 Fire NOC renewal</div>
                <div>🛡️ Security audit</div>
              </div>
            </div>
            <div className="sb-widget">
              <div className="sbw-head">
                Quick <em>Links</em>
              </div>
              <div className="sbw-body">
                {quickLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="quick-link">
                    <div className="ql-icon">{l.icon}</div>
                    <div className="ql-text">{l.label}</div>
                    <div className="ql-arrow">→</div>
                  </Link>
                ))}
              </div>
            </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
