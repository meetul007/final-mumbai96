import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

export const metadata = {
  title:
    "BMC Property Tax Payment Mumbai 2026 — Pay Online, Check Status & Receipt | Mumbai96",
  description:
    "Pay BMC property tax online in Mumbai 2026. Step-by-step guide to MCGM property tax payment, how to check dues, download receipt, tax calculation and important links.",
  keywords:
    "bmc property tax payment mumbai, mcgm property tax online, mumbai property tax 2026, how to pay bmc tax online, property tax receipt mumbai",
  canonical: "https://mumbai96.vercel.app/property-tax-mumbai",
  openGraph: {
    title:
      "BMC Property Tax Payment Mumbai 2026 — Pay Online, Check Status & Receipt",
    description:
      "Pay BMC property tax online in Mumbai 2026. How to check dues, pay online, download receipt and calculate your property tax.",
    url: "https://mumbai96.vercel.app/property-tax-mumbai",
    type: "article",
    siteName: "Mumbai96",
  },
};

const quickLinks = [
  { href: "/coop-society-mumbai", icon: "🏘️", label: "Co-op Society Bye Laws" },
  { href: "/lift-licence-mumbai", icon: "🛗", label: "Lift Licence & Renewal" },
  { href: "/property-tax-mumbai", icon: "🏦", label: "Property Tax Payment" },
  { href: "/mhada-lottery-mumbai", icon: "🏗️", label: "MHADA Lottery 2026" },
  { href: "/bmc-gardens", icon: "🌳", label: "Garden & Tree" },
  { href: "/bmc-schools-mumbai", icon: "🏫", label: "BMC Schools List" },
  {
    href: "/bmc-stray-dogs-vaccination",
    icon: "🐕",
    label: "Stray Dog Vaccination",
  },
];

export default function PropertyTaxMumbaiPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Property Tax Mumbai" },
        ]}
        kicker="Mumbai96 · BMC Services · Pay Online"
        title={
          <>
            BMC <em>Property Tax</em>
            &nbsp;
            Payment <span className="gold">Mumbai 2026</span>
          </>
        }
        description={
          <>
            Pay your MCGM property tax online in minutes. Find your property
            number, check outstanding dues, pay via UPI or card, and download your
            official payment receipt — all on the BMC portal.
          </>
        }
        stats={[
          { value: "Online", label: "24x7 Payment Available" },
          { value: "2%", label: "Penalty Per Month (Late)" },
          { value: "March 31", label: "Annual Due Date" },
          { value: "Instant", label: "Receipt Download" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Direct Payment Links</div>
                <h2 className="sec-title">
                  Pay Your <em>BMC Property Tax</em> Now
                </h2>
                <div className="cta-bar">
                  <div>
                    <h3>
                      Pay <em>Online Now</em> — MCGM Portal
                    </h3>
                    <p>
                      Official BMC property tax payment portal — 24x7, all payment
                      modes accepted
                    </p>
                  </div>
                  <a
                    href="https://ptaxportal.mcgm.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    Pay Property Tax &#8599;
                  </a>
                </div>
                <a
                  href="https://ptaxportal.mcgm.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">💳</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MCGM Property Tax Portal — ptaxportal.mcgm.gov.in
                    </div>
                    <div className="lc-desc">
                      Official BMC portal to pay property tax online, view dues,
                      download receipt, update details
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://www.mcgm.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🏙️</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MCGM Official Website — BMC Mumbai
                    </div>
                    <div className="lc-desc">
                      Main BMC portal for all civic services including property
                      tax, water bill and building permissions
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://pbmcservices.mcgm.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">📋</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MCGM Online Services — All BMC Applications
                    </div>
                    <div className="lc-desc">
                      One-stop portal for birth certificate, building permission,
                      shop licence and more BMC services
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">How to Pay</div>
                <h2 className="sec-title">
                  Step-by-Step: Pay <em>BMC Property Tax</em> Online
                </h2>
                <ol className="step-list prose">
                  <li>
                    <div className="step-num">1</div>
                    <div className="step-body">
                      <strong>Go to the BMC Property Tax Portal</strong>
                      Visit{" "}
                      <a
                        href="https://ptaxportal.mcgm.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ptaxportal.mcgm.gov.in
                      </a>
                      . This is the official MCGM property tax payment website.
                    </div>
                  </li>
                  <li>
                    <div className="step-num">2</div>
                    <div className="step-body">
                      <strong>
                        Enter Your Property Account Number (PAN)
                      </strong>
                      Your Property Account Number is printed on previous tax
                      bills. You can also search by property address, ward, and
                      zone if you don&apos;t have the PAN.
                    </div>
                  </li>
                  <li>
                    <div className="step-num">3</div>
                    <div className="step-body">
                      <strong>View Outstanding Dues</strong>
                      The portal displays current year tax, arrears (if any),
                      penalties and the total amount due. Verify all details match
                      your property.
                    </div>
                  </li>
                  <li>
                    <div className="step-num">4</div>
                    <div className="step-body">
                      <strong>Select Payment Period &amp; Make Payment</strong>
                      Choose to pay current year or clear all arrears. Pay via net
                      banking, debit/credit card, UPI (GPay, PhonePe, Paytm) or
                      NEFT.
                    </div>
                  </li>
                  <li>
                    <div className="step-num">5</div>
                    <div className="step-body">
                      <strong>Download Your Receipt</strong>
                      After payment, an online receipt is generated immediately.
                      Download and save it — this serves as proof for all legal
                      and financial purposes.
                    </div>
                  </li>
                </ol>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Tax Calculation</div>
                <h2 className="sec-title">
                  How BMC <em>Property Tax</em> Is Calculated
                </h2>
                <div className="info-box">
                  <h4>🧮 Capital Value Based System (CVS) — Mumbai</h4>
                  <ul>
                    <li>
                      Mumbai BMC uses <strong>Capital Value System (CVS)</strong>{" "}
                      since 2010 to calculate property tax
                    </li>
                    <li>
                      Tax = Capital Value × Mill Rate (fixed by BMC annually) ×
                      Location Factor
                    </li>
                    <li>
                      Capital Value is based on ready reckoner rates published by
                      IGR Maharashtra
                    </li>
                    <li>
                      Residential properties: tax ranges from ~0.316% to 2.296% of
                      capital value
                    </li>
                    <li>
                      Owner-occupied residential flats below 500 sq ft: significant
                      concessions available
                    </li>
                    <li>
                      Shops and commercial properties attract higher mill rates than
                      residential
                    </li>
                    <li>
                      Senior citizens (age 65+) owning single property: eligible
                      for concession — apply at ward office
                    </li>
                  </ul>
                </div>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Property Type</th>
                        <th>Approx Tax Rate</th>
                        <th>Concession Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="dt-label">Residential (owner-occupied)</td>
                        <td className="dt-meta">
                          0.316% – 1.4% of capital value
                        </td>
                        <td className="dt-meta">
                          Yes — small flats, senior citizens
                        </td>
                      </tr>
                      <tr>
                        <td className="dt-label">Residential (rented/let out)</td>
                        <td className="dt-meta">
                          0.7% – 2.296% of capital value
                        </td>
                        <td className="dt-meta">Limited</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Commercial / Office</td>
                        <td className="dt-meta">1% – 2.5% of capital value</td>
                        <td className="dt-meta">None</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Industrial</td>
                        <td className="dt-meta">Varies by zone</td>
                        <td className="dt-meta">None</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Slum / Chawl</td>
                        <td className="dt-meta">Lower rate / exempt</td>
                        <td className="dt-meta">Yes — BPL category</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Penalties & Exemptions</div>
                <h2 className="sec-title">
                  Late Payment <em>Penalties</em> & Exemptions
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">⏰</div>
                    <div className="dc-title">Late Payment Penalty</div>
                    <div className="dc-body">
                      2% per month on outstanding amount. Interest compounds
                      monthly. Paying dues cleared by March 31 avoids all penalties
                      for that financial year.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏠</div>
                    <div className="dc-title">Small Flat Rebate</div>
                    <div className="dc-body">
                      Properties under 500 sq ft (carpet area) used for
                      self-occupation receive a substantial rebate. Some years BMC
                      has granted 100% rebate for flats under 500 sq ft.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">📑</div>
                    <div className="dc-title">Objections & Disputes</div>
                    <div className="dc-body">
                      If you believe your property is assessed incorrectly, file an
                      objection at the Assessment &amp; Collection Department of your
                      ward office within 30 days of notice.
                    </div>
                  </div>
                </div>
                <div className="warn-box">
                  <div className="warn-icon">💡</div>
                  <div className="warn-body">
                    <h4>
                      Update Property Details — Avoid Wrong Assessment
                    </h4>
                    <p>
                      If your property details (area, usage, floors) have changed,
                      update them at the ward Assessment &amp; Collection office.
                      Wrong details lead to incorrect tax which can accumulate as
                      arrears.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose rv">
                <h2>BMC Property Tax Mumbai — Complete Guide 2026</h2>
                <p>
                  Property tax is the primary source of revenue for BMC
                  (Brihanmumbai Municipal Corporation) and funds essential city
                  services like roads, drainage, solid waste management and public
                  health. Every property owner in Mumbai — residential, commercial or
                  industrial — must pay property tax annually to the MCGM.
                </p>
                <h3>What Is the Property Account Number (PAN)?</h3>
                <p>
                  The <strong>Property Account Number (PAN)</strong> is a unique
                  identifier assigned by BMC to every taxable property in Mumbai. It
                  is printed on your previous property tax bills. If you&apos;ve lost
                  your bill, you can retrieve your PAN by searching the BMC portal
                  using your property address, ward number and property type.
                </p>
                <h3>Can I Pay Property Tax at a BMC Ward Office?</h3>
                <p>
                  Yes, property tax can also be paid in person at the{" "}
                  <strong>Assessment &amp; Collection Department</strong> of your BMC
                  ward office. Cheque, demand draft and cash payments are accepted.
                  However, online payment is faster, paperless and provides instant
                  receipt.
                </p>
                <h3>What If My Property Details Are Wrong on BMC Records?</h3>
                <p>
                  Discrepancies in property records — wrong carpet area, incorrect
                  usage, missing floors — must be corrected at the ward Assessment
                  office by submitting a mutation application along with supporting
                  documents (sale deed, OC, floor plan). Uncorrected wrong records
                  can lead to over-assessment or future legal complications.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  💳 Pay <em>Now</em>
                </div>
                <div className="sbw-body">
                  <a
                    href="https://ptaxportal.mcgm.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    Pay Property Tax Online &#8599;
                  </a>
                  <a href="tel:1916" className="sb-row">
                    <span className="sb-row-label">📞 BMC Helpline</span>
                    <span className="sb-row-value">1916</span>
                  </a>
                  <a
                    href="https://www.mcgm.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row last"
                  >
                    <span className="sb-row-label">🌐 MCGM Website</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
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
              <div className="sb-widget">
                <div className="sbw-head">
                  📅 Key <em>Dates</em>
                </div>
                <div className="sbw-body sb-list-plain">
                  <div>
                    <strong>Due Date:</strong> March 31 every year
                  </div>
                  <div>
                    <strong>Penalty:</strong> 2% per month after March 31
                  </div>
                  <div>
                    <strong>Half-yearly:</strong> Sep 30 &amp; Mar 31
                  </div>
                  <div>
                    <strong>Receipt:</strong> Instant on online payment
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
