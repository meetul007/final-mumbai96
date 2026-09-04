import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { CategorySection, ServiceCard } from "./ServiceBlocks";

export default function SocietyServicesPage() {
  return (
    <>
      <PageHero
        variant="services"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Society Services" },
        ]}
        kicker="Mumbai96 · Housing Societies · Verified Service Partners"
        title={
          <>
            All Services Your
            &nbsp;
            <em>Society Needs</em>
            &nbsp;
            <span className="gold">One Platform</span>
          </>
        }
        description={
          <>
            From exterior painting to solar panels, CCTV to plumbing — Mumbai96
            connects your co-operative housing society directly to verified,
            background-checked service partners. Get multiple quotations. Choose
            the best.
          </>
        }
        stats={[
          { value: "24+", label: "Service Categories" },
          { value: "3", label: "Quotations per Request" },
          { value: "Verified", label: "Background-Checked Partners" },
          { value: "Free", label: "For Your Society" },
        ]}
      >
        <div className="ph-hero-actions">
          <Link href="/society-requirements" className="cbtn-main">
            Submit Your Requirement →
          </Link>
          <a href="#services" className="cbtn-sec">
            Browse All Services ↓
          </a>
        </div>
      </PageHero>

      <div className="page-body page-body--services">
        <div className="con">
          <div className="sec rv" id="services">
            <div className="sec-kicker">How It Works</div>
            <h2 className="sec-title">
              Simple. <em>Fast.</em> No Middlemen.
            </h2>
            <div className="how-grid">
              <div className="how-step">
                <div className="how-num">01</div>
                <div className="how-icon">📋</div>
                <div className="how-title">Submit Requirement</div>
                <div className="how-body">
                  Fill in your society details and select the service you need.
                  Takes 3 minutes.
                </div>
              </div>
              <div className="how-step">
                <div className="how-num">02</div>
                <div className="how-icon">🔍</div>
                <div className="how-title">Mumbai96 Reviews</div>
                <div className="how-body">
                  Our team verifies your requirement and matches it to 3
                  relevant verified partners.
                </div>
              </div>
              <div className="how-step">
                <div className="how-num">03</div>
                <div className="how-icon">📩</div>
                <div className="how-title">Get Quotations</div>
                <div className="how-body">
                  Partners contact you directly with their detailed quotations
                  within 48 hours.
                </div>
              </div>
              <div className="how-step">
                <div className="how-num">04</div>
                <div className="how-icon">✅</div>
                <div className="how-title">Choose the Best</div>
                <div className="how-body">
                  Compare quotes, check reviews, choose your partner. Mumbai96
                  stays as your support.
                </div>
              </div>
            </div>
          </div>

          <div className="society-trust-strip rv">
            <div className="tb-item">
              <span className="tb-icon">🛡️</span> All partners verified by
              Mumbai96
            </div>
            <div className="tb-sep" />
            <div className="tb-item">
              <span className="tb-icon">📋</span> GST registered vendors only
            </div>
            <div className="tb-sep" />
            <div className="tb-item">
              <span className="tb-icon">⭐</span> Rated by other societies
            </div>
            <div className="tb-sep" />
            <div className="tb-item">
              <span className="tb-icon">🤝</span> No advance payment to Mumbai96
            </div>
            <div className="tb-sep" />
            <div className="tb-item">
              <span className="tb-icon">💰</span> 100% Free for Societies
            </div>
          </div>

          <CategorySection
            icon="🏗️"
            title="Civil, Structural & Waterproofing"
            subtitle="Building fabric, exterior work, structural safety"
            badge="6 Services"
          >
            <ServiceCard
              featured
              icon="🎨"
              badges={
                <span className="sc-badge badge-popular">
                  🔥 Most Requested
                </span>
              }
              title="Exterior & Interior Painting"
              description="Full building exterior painting, interior common areas — staircase, lift lobby, parking. Includes surface preparation, waterproof putty, primer and top coat."
              scopeItems={[
                "Surface preparation & crack filling",
                "Waterproof putty + primer",
                "Exterior-grade paint (2 coats)",
                "Scaffolding arrangement",
                "BMC colour NOC guidance",
              ]}
              ctas={
                <>
                  <Link
                    href="/society-requirements?service=Exterior+%26+Interior+Painting"
                    className="sc-btn-primary"
                  >
                    Get Quotes →
                  </Link>
                  <Link href="/society-requirements" className="sc-btn-sec">
                    Learn More
                  </Link>
                </>
              }
            />
            <ServiceCard
              featured
              icon="💧"
              badges={
                <span className="sc-badge badge-popular">🔥 Popular</span>
              }
              title="Waterproofing & Terrace Treatment"
              description="Terrace waterproofing, external wall seepage treatment, bathroom leakage repair. Critical pre-monsoon work every 4–5 years."
              scopeItems={[
                "Terrace waterproofing (APP/SBS membrane or liquid)",
                "External wall anti-seepage coating",
                "Bathroom & kitchen leakage repair",
                "5-year workmanship warranty",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Waterproofing+%26+Terrace+Treatment"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🔬"
              badges={
                <span className="sc-badge badge-required">Mandatory</span>
              }
              title="Structural Audit & Repair"
              description="Mandatory structural audit for buildings 30+ years old. Identifies structural deficiencies, recommends repairs, provides safety certificate."
              scopeItems={[
                "Licensed structural engineer audit",
                "NDT (Non-Destructive Testing)",
                "Detailed audit report",
                "Safety certificate (required by BMC)",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Structural+Audit+%26+Repair"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🏢"
              title="Facade Cleaning & Restoration"
              description="High-pressure jet cleaning, facade stain removal, glass facade cleaning, graffiti removal. Restore your building's original appearance."
              scopeItems={[
                "High-pressure water jet cleaning",
                "Chemical cleaning for stubborn stains",
                "Glass & ACP facade cleaning",
                "Rope access for high-rises",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Facade+Cleaning+%26+Restoration"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🪟"
              title="Common Area Flooring & Tiling"
              description="Replacement of lobby flooring, staircase tiling, podium flooring, parking floor coating — epoxy, granite, vitrified tiles."
              scopeItems={[
                "Tile removal & base preparation",
                "Vitrified / granite / epoxy flooring",
                "Anti-skid treatment for parking",
                "Grouting & finishing",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Common+Area+Flooring+%26+Tiling"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🚪"
              title="Common Area Renovation"
              description="Lobby redesign, staircase makeover, entrance gate renovation, society office renovation, community hall upgrade."
              scopeItems={[
                "Interior design consultation",
                "False ceiling & lighting upgrade",
                "Wall panel & wallpaper",
                "Turnkey renovation",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Common+Area+Renovation"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
          </CategorySection>

          <CategorySection
            icon="🔧"
            title="Plumbing, Electrical & MEP"
            subtitle="Water, drainage, electrical systems and utilities"
            badge="5 Services"
          >
            <ServiceCard
              featured
              icon="🚿"
              badges={
                <span className="sc-badge badge-popular">🔥 Popular</span>
              }
              title="Plumbing & Drainage Overhaul"
              description="Water riser replacement (GI to CPVC), drainage line repair, sump & overhead tank maintenance, water meter installation, pump room upgrades."
              scopeItems={[
                "GI riser → CPVC/uPVC replacement",
                "Drainage CCTV inspection & repair",
                "Pump installation & AMC",
                "Water tank cleaning (biannual)",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Plumbing+%26+Drainage+Overhaul"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="⚡"
              title="Electrical Rewiring & Upgrades"
              description="Common area electrical rewiring, DB (distribution board) upgrade, LED lighting upgrade, metering system, emergency lighting installation."
              scopeItems={[
                "Full common area rewiring",
                "LED corridor & lobby lighting",
                "DB box upgrade & MCB fitting",
                "MSEDCL liaison for new connections",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Electrical+Rewiring+%26+Upgrades"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🌊"
              title="STP — Sewage Treatment Plant"
              description="New STP installation, existing STP AMC and servicing. Mandatory for societies with 20+ flats in Maharashtra. BMC compliance assistance."
              scopeItems={[
                "STP design & installation",
                "Monthly AMC contract",
                "PCB (Pollution Board) compliance",
                "Treated water reuse system",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=STP+Installation+%26+AMC"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🔋"
              title="Generator / DG Set"
              description="DG set installation, replacement, AMC. Sizing consultation for society load. Acoustic enclosure for noise compliance. Fuel management."
              scopeItems={[
                "Load assessment & DG sizing",
                "Installation with acoustic enclosure",
                "AMC (quarterly/annual)",
                "Emergency breakdowns included in AMC",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Generator+%26+DG+Set"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="💡"
              badges={<span className="sc-badge badge-new">Save 70%</span>}
              title="LED & Smart Lighting Upgrade"
              description="Replace all common area lighting with 5-star LED. Motion sensor + timer controls for stairs/parking. Reduce society electricity bill by 60–70%."
              scopeItems={[
                "Energy audit & LED sizing",
                "Motion sensors for corridors/stairs",
                "Timer control for parking lights",
                "MSEDCL subsidy assistance",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=LED+%26+Smart+Lighting"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
          </CategorySection>

          <CategorySection
            icon="📹"
            title="Technology, CCTV & Security"
            subtitle="Cameras, access control, intercoms, parking management"
            badge="5 Services"
          >
            <ServiceCard
              featured
              icon="📹"
              badges={
                <span className="sc-badge badge-popular">🔥 Popular</span>
              }
              title="CCTV Surveillance System"
              description="HD IP cameras covering main gate, lift lobbies, parking, terrace, perimeter. NVR with 30-day storage. Remote viewing on phone."
              scopeItems={[
                "2MP–5MP IP cameras (weatherproof)",
                "NVR with 2TB+ storage (30 days)",
                "Remote mobile viewing app",
                "AMC & warranty support",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=CCTV+Surveillance+System"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              featured
              icon="🔔"
              badges={
                <span className="sc-badge badge-popular">🔥 Popular</span>
              }
              title="Video Door Phone & Intercom"
              description="IP video intercom connecting main gate to every flat. Residents can see visitors on phone or intercom panel and grant access remotely."
              scopeItems={[
                "IP video intercom per flat",
                "Gate panel with keypad & RFID",
                "Mobile app for remote unlock",
                "2-wire or IP-based installation",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Video+Door+Phone+%26+Intercom"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🚗"
              title="Boom Barrier & Parking Management"
              description="RFID or ANPR (number plate recognition) boom barriers for vehicle access. Prevents unauthorised parking. Visitor vehicle logging."
              scopeItems={[
                "Boom barrier (FAAC / BFT brands)",
                "RFID tag/card system or ANPR camera",
                "Visitor vehicle management software",
                "AMC for barrier motor & electronics",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Boom+Barrier+%26+Parking+Management"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🔐"
              title="Access Control — Biometric & RFID"
              description="Face recognition or RFID card access for main gate, gym, clubhouse, terrace. Generates entry/exit logs. Ideal for 100+ flat societies."
              scopeItems={[
                "Face recognition or RFID readers",
                "Access log software (cloud/local)",
                "Integration with CCTV",
                "Emergency override system",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Access+Control+Biometric+RFID"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="📱"
              badges={<span className="sc-badge badge-new">New</span>}
              title="Society Management App Setup"
              description="Onboarding to MyGate, NoBrokerHood or ADDA — visitor management, maintenance billing, complaint tracking, notice board, amenity booking."
              scopeItems={[
                "App onboarding & resident setup",
                "Gate integration (visitor QR)",
                "Maintenance billing automation",
                "Training for committee & residents",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Society+Management+App+Setup"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
          </CategorySection>

          <CategorySection
            icon="☀️"
            title="Solar, Green & Energy"
            subtitle="Sustainability, solar power, energy savings"
            badge="3 Services"
          >
            <ServiceCard
              featured
              icon="☀️"
              badges={<span className="sc-badge badge-new">Bill to Zero</span>}
              title="Rooftop Solar Installation"
              description="Solar panels for common area electricity — lifts, corridors, pumps, lighting. PM Surya Ghar subsidy available. MSEDCL net metering assistance."
              scopeItems={[
                "Load assessment & system sizing",
                "MNRE-approved panel installation",
                "MSEDCL net metering application",
                "PM Surya Ghar subsidy processing",
                "10-year panel warranty + AMC",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Rooftop+Solar+Installation"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="💧"
              title="Solar Water Heater — Common Areas"
              description="Solar water heating for clubhouse, gym showers, swimming pool heating. Eliminates geyser electricity cost in common areas."
              scopeItems={[
                "Evacuated tube / flat plate collectors",
                "Insulated storage tank",
                "Backup electric element",
                "5-year system warranty",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Solar+Water+Heater"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🌿"
              title="Rainwater Harvesting System"
              description="Rooftop rainwater collection, filtration and storage system. Recharge groundwater or use for garden irrigation and flushing."
              scopeItems={[
                "Terrace collection system design",
                "Filtration & storage tank",
                "Distribution to recharge pit / garden",
                "BMC compliance certification",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Rainwater+Harvesting"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
          </CategorySection>

          <CategorySection
            icon="🛗"
            title="Lift, Fire Safety & Compliance"
            subtitle="Mandatory statutory requirements and safety systems"
            badge="3 Services"
          >
            <ServiceCard
              featured
              icon="🛗"
              badges={
                <span className="sc-badge badge-required">
                  Mandatory Annual
                </span>
              }
              title="Lift AMC & BMC Licence Renewal"
              description="Annual Maintenance Contract for lifts — covers breakdowns, inspections, BMC licence renewal, ARD installation, safety upgrades. Maharashtra Lifts Act compliance."
              scopeItems={[
                "Monthly preventive maintenance",
                "24x7 breakdown response",
                "BMC annual licence renewal",
                "ARD installation (if not present)",
                "3rd party insurance certificate",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Lift+AMC+%26+BMC+Licence+Renewal"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              featured
              icon="🔥"
              badges={
                <span className="sc-badge badge-required">Mandatory</span>
              }
              title="Fire Safety & NOC Compliance"
              description="Fire extinguisher supply, hydrant system, fire alarm, sprinkler systems. CFO (Chief Fire Officer) NOC renewal. Annual fire safety audit."
              scopeItems={[
                "Fire extinguisher supply & refill",
                "Hydrant & hose reel maintenance",
                "Fire alarm panel servicing",
                "CFO NOC renewal assistance",
                "Staff fire drill & training",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Fire+Safety+%26+NOC+Compliance"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🆕"
              title="New Lift Installation"
              description="Full new lift installation — machine room / machine-room-less (MRL), passenger or service lift. BMC licence application to completion."
              scopeItems={[
                "Civil pit & shaft preparation",
                "Lift installation & testing",
                "BMC licence application",
                "First year AMC included",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=New+Lift+Installation"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
          </CategorySection>

          <CategorySection
            icon="🧹"
            title="Housekeeping, Pest Control & Garden"
            subtitle="Ongoing maintenance services and AMC contracts"
            badge="4 Services"
          >
            <ServiceCard
              icon="🧹"
              title="Housekeeping & Facility Management"
              description="Daily housekeeping staff supply — sweeping, mopping, garbage collection, common area cleaning. PSARA-compliant staffing agency."
              scopeItems={[
                "Trained housekeeping staff",
                "Monthly PF/ESIC compliance",
                "Supervisor + daily attendance report",
                "Annual deep-cleaning service",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Housekeeping+%26+Facility+Management"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🐛"
              title="Pest Control (Annual AMC)"
              description="Cockroach, mosquito, rat, termite and bed bug treatments. Annual contract with quarterly service visits. Safe for children and pets."
              scopeItems={[
                "Quarterly general pest treatment",
                "Annual termite treatment",
                "Mosquito fogging (pre-monsoon)",
                "Safe chemical certification",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Pest+Control+AMC"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🌳"
              title="Garden & Landscape Maintenance"
              description="Garden design, landscaping, daily maintenance, plant supply, tree trimming (with BMC permission), lawn mowing, irrigation system."
              scopeItems={[
                "Garden redesign & plant supply",
                "Monthly maintenance contract",
                "Drip irrigation installation",
                "BMC tree trimming coordination",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Garden+%26+Landscape+Maintenance"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🛡️"
              title="Security Guards & Agency"
              description="PSARA-licensed security agency supply — trained, verified guards, 24x7 duty roster, supervisor, monthly reports. All PF/ESIC compliant."
              scopeItems={[
                "PSARA licensed agency",
                "Police-verified guards",
                "Duty roster + attendance app",
                "Monthly compliance reports",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Security+Guards+%26+Agency"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
          </CategorySection>

          <CategorySection
            icon="⚖️"
            title="Legal, Financial & Society Management"
            subtitle="Compliance, audit, conveyance and legal services"
            badge="3 Services"
          >
            <ServiceCard
              icon="📊"
              badges={
                <span className="sc-badge badge-required">Mandatory</span>
              }
              title="Society Audit & Accounting"
              description="Annual statutory audit (mandatory under MCS Act), monthly accounting, maintenance bill generation, income-expenditure statements."
              scopeItems={[
                "Annual statutory audit",
                "Monthly bookkeeping",
                "Maintenance bill generation",
                "Income-expenditure statements",
                "AGM balance sheet preparation",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Society+Audit+%26+Accounting"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="📜"
              title="Deemed Conveyance"
              description="If your builder hasn't done conveyance — we help get Deemed Conveyance through Dy. Registrar (Section 11, MOFA). Legal documentation support."
              scopeItems={[
                "Legal consultant + documentation",
                "Dy. Registrar application",
                "Title search & verification",
                "Stamp duty computation",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Deemed+Conveyance"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
            <ServiceCard
              icon="🏗️"
              title="Redevelopment Consultancy"
              description="End-to-end redevelopment guidance — developer selection, LOI, DA agreement, corpus fund negotiation, RERA compliance, member communication."
              scopeItems={[
                "Developer RFQ & evaluation",
                "DA agreement review",
                "Corpus & amenity negotiation",
                "RERA registration assistance",
              ]}
              ctas={
                <Link
                  href="/society-requirements?service=Redevelopment+Consultancy"
                  className="sc-btn-primary"
                >
                  Get Quotes →
                </Link>
              }
            />
          </CategorySection>

          <div className="cta-banner rv">
            <h2>
              Ready to Get <em>Quotations?</em>
            </h2>
            <p>
              Submit your society&apos;s requirement in 3 minutes. Mumbai96
              connects you to verified partners who will reach out with their
              best quotation within 48 hours.
            </p>
            <div className="cta-banner-btns">
              <Link href="/society-requirements" className="cbtn-main">
                Submit Requirement Now →
              </Link>
              <a href="tel:+91XXXXXXXXXX" className="cbtn-sec">
                📞 Call Mumbai96
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
