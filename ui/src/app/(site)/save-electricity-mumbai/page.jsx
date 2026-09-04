import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

export const metadata = {
  title:
    "Save Electricity Mumbai 2026 — BLDC Fans, Inverter AC, Solar & Energy Saving Tips | Mumbai96",
  description:
    "Save electricity in Mumbai 2026. Switch to BLDC fans, 5-star inverter ACs, LED lights and solar panels. Calculate savings, know MSEDCL slab rates and reduce your electricity bill.",
  keywords:
    "save electricity mumbai, bldc fan mumbai, inverter ac electricity saving, led lights mumbai, solar panel home mumbai, msedcl slab rate, electricity bill reduce mumbai",
  canonical: "https://mumbai96.vercel.app/save-electricity-mumbai",
  openGraph: {
    title:
      "Save Electricity Mumbai 2026 — BLDC Fans, Inverter AC, Solar & Energy Saving Tips",
    description:
      "Practical guide to saving electricity in Mumbai. Switch to BLDC fans, inverter ACs, LED lights and solar. Know MSEDCL slab rates and cut your bill.",
    url: "https://mumbai96.vercel.app/save-electricity-mumbai",
    type: "article",
    siteName: "Mumbai96",
  },
};

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

export default function SaveElectricityMumbaiPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Save Electricity Mumbai" },
        ]}
        kicker="Mumbai96 · Green Living · Energy Efficiency"
        title={
          <>
            Save <em>Electricity</em>
            &nbsp;
            Mumbai <span className="gold">2026 Guide</span>
          </>
        }
        description={
          <>
            Cut your Mumbai electricity bill by 30–60% with smart switches — BLDC
            fans, 5-star inverter ACs, LED lighting, solar panels and simple habits.
            Know your MSEDCL slab rates and save big.
          </>
        }
        stats={[
          { value: "70%", label: "Savings with BLDC Fan" },
          { value: "50%", label: "Savings with Inverter AC" },
          { value: "90%", label: "Savings with LED vs Incandescent" },
          { value: "0 Bill", label: "Possible with Rooftop Solar" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Biggest Wins First</div>
                <h2 className="sec-title">
                  Switch These — <em>Maximum Savings</em>
                </h2>

                <div className="tip-card">
                  <div className="tip-icon">🌀</div>
                  <div className="tip-body">
                    <h4>BLDC Fan — The Single Best Switch You Can Make</h4>
                    <p>
                      A conventional ceiling fan uses <strong>75–90 watts</strong>. A
                      BLDC (Brushless DC) fan uses only <strong>25–35 watts</strong> —
                      same airflow, 65–70% less electricity. If you run 3 fans
                      12 hours/day, you save ₹1,800–₹2,400/year per fan. Brands:
                      Atomberg, Orient, Havells (BLDC). Price: ₹2,500–₹4,500. Payback
                      in 12–18 months.
                    </p>
                    <span className="tip-save">
                      💰 Save ₹1,800–₹2,400/year per fan | ₹2,500 investment
                    </span>
                  </div>
                </div>

                <div className="tip-card">
                  <div className="tip-icon">❄️</div>
                  <div className="tip-body">
                    <h4>Inverter AC — 5-Star vs Old AC (Massive Difference)</h4>
                    <p>
                      Old fixed-speed 1.5T AC: <strong>1.5–2 units/hour</strong>. New
                      5-star inverter AC: <strong>0.7–0.9 units/hour</strong>. For 6
                      hours daily across Mumbai&apos;s 8-month season, that&apos;s a
                      saving of <strong>800–1,100 units/year</strong>. At ₹7–10/unit in
                      higher slabs, that&apos;s ₹5,600–₹11,000 saved per AC annually.
                      Also always set AC at 24°C — every degree above 20°C saves ~6%
                      power.
                    </p>
                    <span className="tip-save">
                      💰 Save ₹5,600–₹11,000/year per AC | ROI in 2–3 years
                    </span>
                  </div>
                </div>

                <div className="tip-card">
                  <div className="tip-icon">💡</div>
                  <div className="tip-body">
                    <h4>LED Lights — Replace Everything</h4>
                    <p>
                      A 60W incandescent bulb = 6–8W LED equivalent. If your home has
                      15 lights, switching all to LED saves ~750W of draw. Running 8
                      hours/day = 6 units/day saved = ~180 units/month. LED bulbs cost
                      ₹60–₹150, last 25,000 hours vs 1,000 hours for incandescent. Also
                      check: use LEDs from BEE 5-star rated brands.
                    </p>
                    <span className="tip-save">
                      💰 Save ₹1,200–₹1,800/year | Total cost ₹1,000–₹2,000
                    </span>
                  </div>
                </div>

                <div className="tip-card">
                  <div className="tip-icon">☀️</div>
                  <div className="tip-body">
                    <h4>Rooftop Solar — Zero Bill Possible</h4>
                    <p>
                      Mumbai gets 5.5–6 peak sun hours daily — excellent solar potential.
                      A 3kW rooftop system costs ₹1.5–₹2 lakh (after PM Surya Ghar
                      subsidy). It generates 350–400 units/month, covering the average
                      Mumbai home&apos;s entire electricity need. Net metering allows
                      exporting surplus to MSEDCL grid. Subsidy: Central Govt pays
                      ₹30,000–₹78,000 for 1–3kW systems.
                    </p>
                    <span className="tip-save">
                      💰 Bill reduction to zero possible | Payback 4–5 years
                    </span>
                  </div>
                </div>

                <div className="tip-card">
                  <div className="tip-icon">🌡️</div>
                  <div className="tip-body">
                    <h4>Geyser / Water Heater — Switch to Solar or Heat Pump</h4>
                    <p>
                      Electric geysers are massive power consumers — a 15L geyser uses
                      2kW. Using it 1 hour/day = 60 units/month just for hot water.
                      Solar water heater (₹15,000–₹30,000) eliminates this cost
                      entirely. Heat pump water heaters use 70% less power than electric
                      geysers and work brilliantly in Mumbai&apos;s warm climate.
                    </p>
                    <span className="tip-save">
                      💰 Save ₹420–₹600/month on hot water alone
                    </span>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">MSEDCL Slab Rates Mumbai</div>
                <h2 className="sec-title">
                  Know Your <em>MSEDCL Electricity</em> Slab Rates 2026
                </h2>
                <div className="warn-box">
                  <div className="warn-icon">⚡</div>
                  <div className="warn-body">
                    <h4>Why Slab Rates Matter for Saving Electricity</h4>
                    <p>
                      MSEDCL uses progressive slab billing. The more you consume, the
                      higher the rate per unit. Crossing into a higher slab makes ALL
                      units more expensive — not just the extra ones. Cutting usage to
                      stay in a lower slab gives disproportionate savings.
                    </p>
                  </div>
                </div>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Monthly Units Consumed</th>
                        <th>Rate per Unit (Approx.)</th>
                        <th>Monthly Fixed Charge</th>
                        <th>Strategy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="dt-label">0–100 units</td>
                        <td className="dt-meta">₹3.25–₹3.80/unit</td>
                        <td className="dt-meta">₹70–₹90/month</td>
                        <td className="dt-meta">Lowest slab — target this</td>
                      </tr>
                      <tr>
                        <td className="dt-label">101–300 units</td>
                        <td className="dt-meta">₹6.50–₹7.20/unit</td>
                        <td className="dt-meta">₹100–₹120/month</td>
                        <td className="dt-meta">Average household range</td>
                      </tr>
                      <tr>
                        <td className="dt-label">301–500 units</td>
                        <td className="dt-meta">₹8.50–₹9.50/unit</td>
                        <td className="dt-meta">₹130–₹160/month</td>
                        <td className="dt-meta sb-val danger">Expensive — reduce urgently</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Above 500 units</td>
                        <td className="dt-meta">₹10.00–₹12.00/unit</td>
                        <td className="dt-meta">₹180+/month</td>
                        <td className="dt-meta sb-val danger">Very expensive — solar now</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a
                  href="https://www.mahadiscom.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">⚡</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MSEDCL / Mahadiscom — Pay Bill & Check Slab
                    </div>
                    <div className="lc-desc">
                      Pay MSEDCL electricity bill online, view consumption history,
                      check current slab, apply for net metering
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://pmsuryaghar.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">☀️</div>
                  <div className="lc-body">
                    <div className="lc-title">PM Surya Ghar — Solar Subsidy Portal</div>
                    <div className="lc-desc">
                      Apply for central government rooftop solar subsidy — up to ₹78,000
                      for residential installations
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://beeindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🌿</div>
                  <div className="lc-body">
                    <div className="lc-title">BEE India — Star Rating & Energy Labels</div>
                    <div className="lc-desc">
                      Bureau of Energy Efficiency — check star ratings of appliances,
                      compare energy consumption before buying
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Quick Habits</div>
                <h2 className="sec-title">
                  Daily Habits That <em>Cut Your Bill</em> Every Month
                </h2>
                <div className="info-box">
                  <h4>✅ Simple Habits — Zero Investment, Real Savings</h4>
                  <ul>
                    <li>
                      Set AC to 24°C — every degree above 20°C saves ~6% electricity;
                      use fan with AC at 24° feels like 20°
                    </li>
                    <li>
                      Use AC on <strong>auto fan speed</strong> — manual high fan speed
                      consumes 30% more power
                    </li>
                    <li>
                      Switch off appliances at the plug — standby power (TV, set-top box,
                      chargers) wastes 50–80 units/month
                    </li>
                    <li>
                      Wash clothes in cold water — front-load washing machines on cold
                      cycle use 90% less energy than hot
                    </li>
                    <li>
                      Full loads only — run dishwasher and washing machine only when
                      fully loaded
                    </li>
                    <li>
                      Clean AC filters monthly — a clogged filter makes AC work 15–20%
                      harder, wasting power
                    </li>
                    <li>
                      Use pressure cooker — cooks 70% faster, uses 75% less energy than
                      open pot on stove
                    </li>
                    <li>
                      Natural ventilation first — cross-ventilate home using windows
                      before switching on AC/fan
                    </li>
                    <li>
                      Switch off geyser immediately after use — 10 minutes of extra
                      heating = 300W wasted
                    </li>
                    <li>
                      Use smart plugs or timers on water heaters, ACs and other
                      appliances
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Product Comparison</div>
                <h2 className="sec-title">
                  Old vs <em>New Technology</em> — Power Consumption
                </h2>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Appliance</th>
                        <th>Old Technology</th>
                        <th>New (Efficient)</th>
                        <th>Annual Saving (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="dt-label">Ceiling Fan (1 unit)</td>
                        <td className="dt-meta">75–90W conventional</td>
                        <td className="dt-meta">25–35W BLDC</td>
                        <td className="dt-meta">₹1,800–₹2,400</td>
                      </tr>
                      <tr>
                        <td className="dt-label">AC 1.5 Ton</td>
                        <td className="dt-meta">1.8–2.0 units/hr</td>
                        <td className="dt-meta">0.7–0.9 units/hr (5★)</td>
                        <td className="dt-meta">₹6,000–₹11,000</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Light Bulb (per bulb)</td>
                        <td className="dt-meta">60W incandescent</td>
                        <td className="dt-meta">7W LED equivalent</td>
                        <td className="dt-meta">₹200–₹280/bulb</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Water Heater (Geyser)</td>
                        <td className="dt-meta">2,000W electric</td>
                        <td className="dt-meta">Solar / Heat pump</td>
                        <td className="dt-meta">₹4,000–₹6,000</td>
                      </tr>
                      <tr>
                        <td className="dt-label">Refrigerator</td>
                        <td className="dt-meta">2–3 star, 200L, old</td>
                        <td className="dt-meta">5-star inverter</td>
                        <td className="dt-meta">₹1,200–₹1,800</td>
                      </tr>
                      <tr>
                        <td className="dt-label">TV (40&quot;)</td>
                        <td className="dt-meta">120W CRT / Plasma</td>
                        <td className="dt-meta">45–55W LED Smart TV</td>
                        <td className="dt-meta">₹500–₹800</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="prose rv">
                <h2>Save Electricity in Mumbai — Complete 2026 Guide</h2>
                <p>
                  Mumbai households pay some of India&apos;s highest electricity bills due
                  to the combination of MSEDCL&apos;s tiered slab system and Mumbai&apos;s
                  hot climate requiring heavy AC usage. The{" "}
                  <strong>average Mumbai household consumes 200–400 units/month</strong>{" "}
                  — but smart appliance choices can bring this down to 100–150 units
                  without any lifestyle compromise.
                </p>
                <h3>How to Read Your MSEDCL Bill</h3>
                <p>
                  Your MSEDCL bill has three main components:{" "}
                  <strong>Energy Charges</strong> (units consumed × slab rate),{" "}
                  <strong>Fixed Charges</strong> (based on connected load), and{" "}
                  <strong>Taxes &amp; Levies</strong> (fuel adjustment, electricity duty
                  etc). The trick is keeping total units under 300 to avoid the expensive
                  top slab. Check your monthly consumption history on the Mahadiscom app.
                </p>
                <h3>PM Surya Ghar Scheme — Free Solar for Mumbai Homes</h3>
                <p>
                  Under the PM Surya Ghar Muft Bijli Yojana, residential consumers can
                  install 1–10 kW rooftop solar with central government subsidy of
                  ₹30,000 per kW for first 2 kW and ₹18,000 for the 3rd kW. Combined
                  with Maharashtra state subsidies and net metering, a Mumbai flat can
                  achieve near-zero electricity bills. Apply at{" "}
                  <a
                    href="https://pmsuryaghar.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pmsuryaghar.gov.in
                  </a>
                  .
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  ⚡ Quick <em>Actions</em>
                </div>
                <div className="sbw-body">
                  <a
                    href="https://pmsuryaghar.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn"
                  >
                    Apply Solar Subsidy ↗
                  </a>
                  <a
                    href="https://www.mahadiscom.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row"
                  >
                    <span className="sb-row-label">💳 Pay MSEDCL Bill</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
                  <a
                    href="https://beeindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row last"
                  >
                    <span className="sb-row-label">🌿 BEE Star Ratings</span>
                    <span className="sb-row-value--cta">Check ↗</span>
                  </a>
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  💡 Top <em>BLDC Brands</em>
                </div>
                <div className="sbw-body sb-list-plain">
                  <div>
                    <strong>Atomberg</strong> — Pioneer BLDC brand, ₹3,000–₹4,500
                  </div>
                  <div>
                    <strong>Orient Electric</strong> — BLDC range, ₹2,800–₹4,000
                  </div>
                  <div>
                    <strong>Havells</strong> — BLDC Efficiencia, ₹3,000–₹5,000
                  </div>
                  <div>
                    <strong>Crompton</strong> — BLDC Hi-Flo, ₹2,500–₹3,500
                  </div>
                  <div>
                    <strong>Usha</strong> — Maglev BLDC range, ₹2,800+
                  </div>
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
