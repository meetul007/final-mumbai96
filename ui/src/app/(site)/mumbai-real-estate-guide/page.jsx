import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata = {
  title:
    "Mumbai Real Estate Intelligence 2026 — RR Rates, Stamp Duty, Pagdi & SRA Guide | Mumbai96",
  description:
    "Complete Mumbai real estate guide 2026. Ready reckoner rates by area, stamp duty calculator, pagdi tenant rights, SRA redevelopment and MahaRERA verification.",
  keywords:
    "mumbai real estate guide 2026, ready reckoner rates mumbai, stamp duty mumbai 2026, pagdi system mumbai, sra redevelopment mumbai, maharera check",
  alternates: {
    canonical: "https://mumbai96.vercel.app/mumbai-real-estate-guide",
  },
  openGraph: {
    title:
      "Mumbai Real Estate Intelligence 2026 — RR Rates, Stamp Duty, Pagdi & SRA Guide | Mumbai96",
    description:
      "Complete Mumbai real estate guide 2026. Ready reckoner rates by area, stamp duty calculator, pagdi tenant rights, SRA redevelopment and MahaRERA verification.",
    url: "https://mumbai96.vercel.app/mumbai-real-estate-guide",
    type: "article",
    siteName: "Mumbai96",
  },
};

const QUICK_LINKS = [
  { href: "/mumbai-local-trains", icon: "🚂", label: "Local Train Guide" },
  { href: "/mumbai-monsoon", icon: "🌧️", label: "Monsoon Hub" },
  { href: "/senior-citizens-mumbai", icon: "👴", label: "Senior Citizens" },
  { href: "/mumbai-cost-of-living", icon: "💸", label: "Cost of Living" },
  { href: "/pets-mumbai", icon: "🐾", label: "Pets in Mumbai" },
  { href: "/mumbai-street-food", icon: "🥘", label: "Street Food" },
  { href: "/mumbai-sports", icon: "🏏", label: "Sports Hub" },
  { href: "/mumbai-education", icon: "🎓", label: "Education Hub" },
  { href: "/mumbai-startup-business", icon: "🚀", label: "Startup Guide" },
  { href: "/mumbai-festivals", icon: "🎉", label: "Festivals" },
];

export default function MumbaiRealEstateGuidePage() {
  return (
    <ScrollReveal>
      <PageHero
        glowVariant="gold-tr"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Mumbai Real Estate Guide" },
        ]}
        kicker="Mumbai96 · Property Intelligence · Know Before You Buy"
        title={
          <>
            Mumbai Real <em>Estate Guide</em>
            <br />
            <span className="gold">2026</span>
          </>
        }
        stats={[
          { value: "₹1.2L+", label: "Max RR Rate/sqft (South)" },
          { value: "6%", label: "Stamp Duty Male Buyer" },
          { value: "1%", label: "Registration Fee" },
          { value: "Free", label: "MahaRERA Verification" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Ready Reckoner 2026</div>
                <h2 className="sec-title">
                  Area-Wise <em>Property Rates</em> Mumbai 2026
                </h2>
                <p className="sec-intro sec-intro--muted">
                  Ready Reckoner (RR) rates are the minimum government-registered
                  prices. Actual market rates are typically 20–60% above RR rates.
                  Stamp duty and registration is calculated on RR rate or actual
                  price — whichever is higher.
                </p>
                <div className="table-wrap">
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>Area</th>
                        <th>RR Rate (approx ₹/sq ft)</th>
                        <th>Market Rate (approx ₹/sq ft)</th>
                        <th>Zone</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="cell-bold">Colaba / Nariman Point</td>
                        <td>₹1,20,000–₹1,80,000</td>
                        <td>₹80,000–₹2,00,000+</td>
                        <td className="cell-muted">South</td>
                      </tr>
                      <tr>
                        <td className="cell-bold">Bandra West</td>
                        <td>₹70,000–₹1,10,000</td>
                        <td>₹55,000–₹1,40,000</td>
                        <td className="cell-muted">West</td>
                      </tr>
                      <tr>
                        <td className="cell-bold">Andheri West</td>
                        <td>₹35,000–₹55,000</td>
                        <td>₹25,000–₹50,000</td>
                        <td className="cell-muted">West</td>
                      </tr>
                      <tr>
                        <td className="cell-bold">Powai</td>
                        <td>₹25,000–₹40,000</td>
                        <td>₹22,000–₹38,000</td>
                        <td className="cell-muted">Central</td>
                      </tr>
                      <tr>
                        <td className="cell-bold">Goregaon / Malad</td>
                        <td>₹20,000–₹35,000</td>
                        <td>₹18,000–₹32,000</td>
                        <td className="cell-muted">West</td>
                      </tr>
                      <tr>
                        <td className="cell-bold">Borivali / Kandivali</td>
                        <td>₹16,000–₹28,000</td>
                        <td>₹15,000–₹26,000</td>
                        <td className="cell-muted">West</td>
                      </tr>
                      <tr>
                        <td className="cell-bold">Thane (nearby)</td>
                        <td>₹10,000–₹18,000</td>
                        <td>₹9,000–₹16,000</td>
                        <td className="cell-muted">East</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Stamp Duty & Registration</div>
                <h2 className="sec-title">
                  Stamp Duty <em>Calculator</em> Guide — Maharashtra 2026
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">👨</div>
                    <div className="dc-title">Male Buyer — Mumbai City</div>
                    <div className="dc-body">
                      Stamp Duty: <strong>6%</strong> of agreement value
                      <br />
                      Registration: 1% (max ₹30,000)
                      <br />
                      Metro Cess: 1%
                      <br />
                      <strong>Total: ~7–8%</strong>
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">👩</div>
                    <div className="dc-title">Female Buyer — Concession</div>
                    <div className="dc-body">
                      Stamp Duty: <strong>5%</strong> (1% concession)
                      <br />
                      Registration: 1% (max ₹30,000)
                      <br />
                      Metro Cess: 1%
                      <br />
                      <strong>Total: ~6–7%</strong>
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏡</div>
                    <div className="dc-title">Joint (Male + Female)</div>
                    <div className="dc-body">
                      Stamp Duty: <strong>5%</strong> if female is first owner
                      <br />
                      Registration: 1%
                      <br />
                      <strong>
                        Tip: Always register in wife&apos;s name first to save 1%
                        stamp duty
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="cta-bar">
                  <div>
                    <h3>
                      Check IGR <em>Ready Reckoner</em>
                    </h3>
                    <p>
                      Official Maharashtra government RR rates — updated annually
                      every April 1st
                    </p>
                  </div>
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    IGR Maharashtra ↗
                  </a>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Pagdi System — Mumbai&apos;s Unique Tenancy</div>
                <h2 className="sec-title">
                  Understanding <em>Pagdi Tenancy</em> — Mumbai&apos;s Legacy System
                </h2>
                <div className="warn-box">
                  <div className="warn-icon">🏠</div>
                  <div className="warn-body">
                    <h4>What Is Pagdi?</h4>
                    <p>
                      Pagdi (premium tenancy) is a unique Mumbai system from the
                      Bombay Rent Control Act 1947. A pagdi tenant pays a one-time
                      premium to the landlord and then pays very low monthly rent
                      (often ₹200–₹2,000 for flats worth crores). The tenant has
                      near-permanent occupancy rights and can even sell the tenancy
                      — sharing 33% of premium with the landlord. Most pagdi buildings
                      are in Girgaon, Dadar, Parel, Kalbadevi, Matunga.
                    </p>
                  </div>
                </div>
                <div className="info-box">
                  <h4>📋 Pagdi Tenant Rights</h4>
                  <ul>
                    <li>
                      Cannot be evicted without Court order — extremely strong
                      protection under Rent Control Act
                    </li>
                    <li>
                      Can transfer tenancy to family members (spouse, children)
                      without landlord permission
                    </li>
                    <li>Can sub-let with landlord&apos;s written permission</li>
                    <li>
                      On sale of tenancy, landlord gets 33% of premium — tenant keeps
                      67%
                    </li>
                    <li>
                      Under Section 13 of Bombay Rent Act — landlord can only evict
                      for genuine personal use or non-payment
                    </li>
                    <li>
                      Pagdi buildings being redeveloped: tenant entitled to alternate
                      accommodation or cash compensation
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Redevelopment Rights</div>
                <h2 className="sec-title">
                  SRA & MHADA <em>Redevelopment</em> — Know Your Rights
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏗️</div>
                    <div className="dc-title">SRA — Slum Redevelopment</div>
                    <div className="dc-body">
                      Slum Rehabilitation Authority scheme gives eligible slum
                      residents a free 269 sq ft (carpet) flat in the same area.
                      Developer builds free component + sells market-rate flats to
                      fund it. Eligible: residents with proof of 1995 occupation.
                    </div>
                    <a
                      href="https://sra.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      SRA Portal ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏘️</div>
                    <div className="dc-title">MHADA Redevelopment</div>
                    <div className="dc-body">
                      MHADA-owned buildings in Mumbai being redeveloped — tenants get
                      a free new flat (typically 405–500 sq ft carpet). Apply through
                      MHADA Repair Board. Developer builds corpus fund for maintenance.
                    </div>
                    <a
                      href="https://www.mhada.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      MHADA ↗
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">📐</div>
                    <div className="dc-title">TDR — Transfer of Development Rights</div>
                    <div className="dc-body">
                      When your land is acquired for roads/public use, you receive TDR
                      certificates allowing extra FSI (Floor Space Index) to be used
                      elsewhere. TDR is a tradeable commodity — often worth crores.
                      Consult a property lawyer.
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose rv">
                <h2>Mumbai Real Estate Intelligence — Complete Guide 2026</h2>
                <p>
                  Mumbai has the most complex real estate market in India — multiple
                  tenancy systems (ownership, pagdi, MHADA, SRA, rent-controlled),
                  multiple authorities (BMC, MHADA, SRA, MMRDA) and a stamp duty
                  structure that rewards smart registration planning. Understanding
                  these basics can save lakhs on any property transaction.
                </p>
                <h3>FSI — Floor Space Index in Mumbai</h3>
                <p>
                  FSI (also called FAR — Floor Area Ratio) determines how much
                  built-up area is permitted on a plot. Mumbai&apos;s FSI has been
                  progressively increased: island city plots can now have FSI of
                  3.0–5.0 in premium zones, suburbs up to 2.5–3.0. Higher FSI = more
                  floors = higher land value. FSI changes are the single biggest driver
                  of Mumbai&apos;s property market.
                </p>
                <h3>MahaRERA — How to Verify Any Builder</h3>
                <p>
                  Every new residential project in Maharashtra must be registered with
                  MahaRERA. Before booking any flat, check the builder&apos;s MahaRERA
                  registration at{" "}
                  <a
                    href="https://maharera.mahaonline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    maharera.mahaonline.gov.in
                  </a>
                  . View the project&apos;s registered completion date, bank account
                  details, CA-certified quarterly progress reports and any complaints
                  filed against the project. Unregistered projects are illegal — do
                  not book them.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🏠 Property <em>Tools</em>
                </div>
                <div className="sbw-body">
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row"
                  >
                    <span className="sb-row-label">📋 IGR — RR Rates</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
                  <a
                    href="https://maharera.mahaonline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row"
                  >
                    <span className="sb-row-label">🏗️ MahaRERA Check</span>
                    <span className="sb-row-value--cta">Verify ↗</span>
                  </a>
                  <a
                    href="https://sra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row last"
                  >
                    <span className="sb-row-label">🏘️ SRA Portal</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  💰 Stamp Duty <em>Summary</em>
                </div>
                <div className="sbw-body sb-summary-list">
                  <div className="sb-summary-row">
                    <strong>Male buyer:</strong> 6% + 1% metro cess
                  </div>
                  <div className="sb-summary-row">
                    <strong>Female buyer:</strong> 5% + 1% metro cess
                  </div>
                  <div className="sb-summary-row">
                    <strong>Registration:</strong> 1% (max ₹30,000)
                  </div>
                  <div className="sb-summary-row">
                    <strong>Tip:</strong> Register in wife&apos;s name first!
                  </div>
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {QUICK_LINKS.map((l) => (
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
    </ScrollReveal>
  );
}
