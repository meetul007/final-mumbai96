import Link from "next/link";
import "./style.css";

export const metadata = {
  title:
    "Mumbai Cost of Living 2026 — Real Rent, Salary & Budget Guide | Mumbai96",
  description:
    "Honest Mumbai cost of living guide 2026. Real rent prices, monthly expenses, salary needed and area-by-area comparison for different lifestyles.",
  keywords:
    "mumbai cost of living 2026, mumbai rent prices, mumbai salary needed, mumbai expenses, how much money needed in mumbai",
  canonical: "https://mumbai96.vercel.app/mumbai-cost-of-living",
  openGraph: {
    title: "Mumbai Cost of Living 2026 — Real Rent, Salary & Budget",
    description:
      "Real numbers on Mumbai expenses, rent by area, and salary needed to live comfortably.",
    url: "https://mumbai96.vercel.app/mumbai-cost-of-living",
    type: "article",
    siteName: "Mumbai96",
  },
};

const EXPENSES = [
  {
    item: "Rent — 1BHK",
    budget: "₹12,000–₹18,000 (Mira Rd, Virar, Nalasopara)",
    midrange: "₹22,000–₹35,000 (Malad, Kandivali, Borivali)",
    premium: "₹50,000–₹90,000 (Bandra, Andheri W, Powai)",
  },
  {
    item: "Rent — 2BHK",
    budget: "₹18,000–₹28,000 (Suburbs far)",
    midrange: "₹35,000–₹55,000 (Mid-suburbs)",
    premium: "₹80,000–₹2,00,000+ (Premium areas)",
  },
  {
    item: "Groceries (family of 3)",
    budget: "₹6,000–₹8,000",
    midrange: "₹9,000–₹14,000",
    premium: "₹18,000–₹30,000",
  },
  {
    item: "Eating Out (per month)",
    budget: "₹2,000–₹4,000",
    midrange: "₹6,000–₹12,000",
    premium: "₹20,000+",
  },
  {
    item: "Transport (train + auto)",
    budget: "₹800–₹1,500 (season pass)",
    midrange: "₹2,000–₹4,000 (mix)",
    premium: "₹8,000–₹20,000 (cab daily)",
  },
  {
    item: "Electricity (MSEDCL)",
    budget: "₹600–₹1,200",
    midrange: "₹1,500–₹3,000",
    premium: "₹4,000–₹12,000+",
  },
  {
    item: "School Fees (per month)",
    budget: "₹800–₹2,000 (BMC / aided)",
    midrange: "₹3,000–₹8,000 (private unaided)",
    premium: "₹15,000–₹60,000 (international)",
  },
  {
    item: "Domestic Help (bai)",
    budget: "₹2,500–₹4,000 (2 hrs/day)",
    midrange: "₹5,000–₹8,000 (4 hrs)",
    premium: "₹12,000–₹20,000 (full time)",
  },
  {
    item: "Society Maintenance",
    budget: "₹500–₹1,500",
    midrange: "₹2,000–₹5,000",
    premium: "₹8,000–₹30,000+",
  },
];

const AREA_CARDS = [
  {
    icon: "💚",
    title: "Budget — ₹12K–₹25K/month",
    desc: "Best value areas: Virar, Vasai, Nalasopara, Mira Road, Naigaon, Bhayandar, Dahisar. Far from city centre but good connectivity on WR. Excellent for young families.",
    borderColor: "green",
  },
  {
    icon: "🟡",
    title: "Mid-Range — ₹25K–₹55K/month",
    desc: "Sweet spot areas: Borivali, Kandivali, Malad, Goregaon, Mulund, Ghatkopar, Vikhroli, Powai (outskirts), Chembur. Good schools, hospitals, transport. Most middle-class Mumbai lives here.",
    borderColor: "gold",
  },
  {
    icon: "🔴",
    title: "Premium — ₹55K–₹2L+/month",
    desc: "Top locations: Bandra West, Andheri West (Lokhandwala), Juhu, Worli, Lower Parel, Powai (lakeside), Santacruz West, Khar. Walking distance to everything — at a price.",
    borderColor: "red",
  },
];

const SALARY_TABLE = [
  {
    lifestyle: "Single, shared flat",
    area: "Andheri / Goregaon",
    budget: "₹25,000–₹35,000",
    salary: "₹35,000+",
  },
  {
    lifestyle: "Couple, own 1BHK",
    area: "Borivali / Malad",
    budget: "₹50,000–₹70,000",
    salary: "₹75,000+",
  },
  {
    lifestyle: "Family of 3–4 (owned flat)",
    area: "Mid-suburbs",
    budget: "₹70,000–₹1,00,000",
    salary: "₹1.2 lakh+",
  },
  {
    lifestyle: "Family of 3–4 (rented 2BHK)",
    area: "Mid-suburbs",
    budget: "₹1,00,000–₹1,40,000",
    salary: "₹1.5 lakh+",
  },
  {
    lifestyle: "Premium lifestyle (Bandra etc)",
    area: "Bandra / Juhu",
    budget: "₹2,50,000–₹5,00,000+",
    salary: "₹3 lakh+",
  },
];

const QUICK_LINKS = [
  { href: "/mumbai-local-train", icon: "🚂", text: "Local Train Guide" },
  { href: "/mumbai-real-estate-guide", icon: "💰", text: "Real Estate Intel" },
  { href: "/mumbai-monsoon", icon: "🌧️", text: "Monsoon Guide" },
  { href: "/senior-citizens-mumbai", icon: "👴", text: "Senior Citizens" },
  { href: "/story-of-mumbai-96", icon: "🏙️", text: "Story of Mumbai96" },
  { href: "/pets-mumbai", icon: "🐾", text: "Pets in Mumbai" },
  { href: "/mumbai-street-food", icon: "🥘", text: "Street Food" },
  { href: "/mumbai-sports", icon: "🏏", text: "Sports Hub" },
  { href: "/mumbai-education", icon: "🎓", text: "Education Hub" },
  { href: "/mumbai-startup-business", icon: "🚀", text: "Startup Guide" },
];

const COST_SUMMARY = [
  { label: "Budget 1BHK rent:", value: "₹12K–₹18K" },
  { label: "Mid-range 1BHK:", value: "₹22K–₹35K" },
  { label: "Groceries (family):", value: "₹6K–₹14K/mo" },
  { label: "Comfortable salary:", value: "₹75K+ take-home" },
];

export default function MumbaiCostOfLivingPage() {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(5,150,105,.12)",
            top: "-80px",
            right: "-80px",
          }}
        ></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Mumbai Cost Of Living</span>
            </div>
            <div className="ph-kicker">
              Mumbai96 · City Finance · What Things Actually Cost
            </div>
            <h1 className="ph-h1">
              Mumbai <em>Cost of Living</em>
              &nbsp;
              <span className="gold">2026</span>
            </h1>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">₹12,000</div>
                <div className="phs-l">Cheapest 1BHK Rent</div>
              </div>
              <div className="phs">
                <div className="phs-n">₹75,000+</div>
                <div className="phs-l">Salary for Comfortable Life</div>
              </div>
              <div className="phs">
                <div className="phs-n">40–50%</div>
                <div className="phs-l">Income Spent on Rent (Avg)</div>
              </div>
              <div className="phs">
                <div className="phs-n">₹6,000</div>
                <div className="phs-l">Min Monthly Groceries (Family)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* The Real Numbers */}
              <div className="sec rv">
                <div className="sec-kicker">The Real Numbers</div>
                <h2 className="sec-title">
                  What Does <em>Life in Mumbai</em> Actually Cost? (2026)
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    marginBottom: "16px",
                  }}
                >
                  Honest, researched numbers — not aspirational estimates. What
                  a middle-class Mumbai family actually spends every month.
                </p>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Expense</th>
                        <th>Budget (₹)</th>
                        <th>Mid-Range (₹)</th>
                        <th>Premium (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXPENSES.map((exp, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{exp.item}</td>
                          <td>{exp.budget}</td>
                          <td>{exp.midrange}</td>
                          <td>{exp.premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Area vs Cost */}
              <div className="sec rv">
                <div className="sec-kicker">Area vs Cost</div>
                <h2 className="sec-title">
                  Rent Comparison — <em>Area by Area</em>
                </h2>
                <div className="card-grid">
                  {AREA_CARDS.map((card, idx) => (
                    <div
                      key={idx}
                      className="data-card"
                      style={{
                        borderTopColor:
                          card.borderColor === "green"
                            ? "var(--green)"
                            : card.borderColor === "gold"
                              ? "var(--gold)"
                              : "var(--red)",
                      }}
                    >
                      <div className="dc-icon">{card.icon}</div>
                      <div className="dc-title">{card.title}</div>
                      <div className="dc-body">{card.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Needed */}
              <div className="sec rv">
                <div className="sec-kicker">The Real Salary Needed</div>
                <h2 className="sec-title">
                  What Salary Do You Need to <em>Live Comfortably</em> in
                  Mumbai?
                </h2>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Lifestyle</th>
                        <th>Area</th>
                        <th>Monthly Budget</th>
                        <th>Salary Needed (Take-Home)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SALARY_TABLE.map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{row.lifestyle}</td>
                          <td style={{ fontSize: "12px" }}>{row.area}</td>
                          <td>{row.budget}</td>
                          <td
                            style={{
                              fontWeight: 700,
                              color:
                                idx < 2
                                  ? "var(--green)"
                                  : idx < 4
                                    ? "var(--gold)"
                                    : "var(--red)",
                            }}
                          >
                            {row.salary}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="warn-box">
                  <div className="warn-icon">💡</div>
                  <div className="warn-body">
                    <h4>The Mumbai Offset</h4>
                    <p>
                      Higher salaries in Mumbai partially offset the higher cost
                      of living. A ₹1 lakh salary in Mumbai has comparable
                      purchasing power (after housing) to ₹60,000–₹70,000 in
                      Pune, and ₹45,000–₹55,000 in smaller cities. Factor this
                      when comparing job offers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prose Content */}
              <div className="prose rv">
                <h2>Mumbai Cost of Living — The Honest Guide 2026</h2>
                <p>
                  Mumbai is India's most expensive city to rent in — but also
                  the city with the highest average salaries and the most
                  diverse income opportunities. The key to living well in Mumbai
                  is location intelligence: choosing an area that matches your
                  lifestyle without over-spending on rent, which is the single
                  biggest variable in the Mumbai budget equation.
                </p>
                <h3>The 30% Rule in Mumbai</h3>
                <p>
                  Financial advisors globally recommend spending no more than
                  30% of take-home salary on rent. In Mumbai, this is extremely
                  difficult in premium areas — many households spend 40–50% on
                  rent. The workaround: buy early (even a small flat far from
                  the city), use the EMI-vs-rent comparison (at today's rates, a
                  ₹30,000/month rent often equals the EMI on a ₹50 lakh flat),
                  and consider whether a 45-minute longer commute in exchange
                  for ₹15,000 lower rent is worth it for your life stage.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  💸 Cost <em>Summary</em>
                </div>
                <div className="sbw-body">
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#374151",
                      fontWeight: 300,
                      lineHeight: 1.9,
                    }}
                  >
                    {COST_SUMMARY.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "5px 0",
                          borderBottom:
                            idx < COST_SUMMARY.length - 1
                              ? "1px solid var(--border)"
                              : "none",
                        }}
                      >
                        <strong style={{ color: "var(--dark)" }}>
                          {item.label}
                        </strong>{" "}
                        {item.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {QUICK_LINKS.map((link, idx) => (
                    <Link key={idx} href={link.href} className="quick-link">
                      <div className="ql-icon">{link.icon}</div>
                      <div className="ql-text">{link.text}</div>
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
