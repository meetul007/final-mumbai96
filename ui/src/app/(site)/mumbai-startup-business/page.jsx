import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata = {
  title: "Mumbai Startup & Business Guide — Mumbai96",
  description: "Complete business startup guide for Mumbai — company registration, licences, GST, MSME, incubators, co-working spaces, and funding.",
};

export default function MumbaiPage() {
  return (
    <ScrollReveal>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Mumbai Startup Business" },
        ]}
        kicker="Mumbai96 · Business · Startups · BKC · IIT Bombay"
        title={
          <>
            Mumbai <em>Startup &</em> &nbsp;
            <span className="gold">Business Guide 2026</span>
          </>
        }
        stats={[
          { value: "2nd", label: "Largest Startup City in India" },
          { value: "BKC", label: "India's Financial Hub" },
          { value: "SINE IIT Bombay", label: "Top Tech Incubator" },
          { value: "₹0", label: "MSME Registration Cost" },
        ]}
      />
      <div className="page-body"><div className="con"><div className="page-layout"><main>
<div className="sec rv"><div className="sec-kicker">Start Here</div><h2 className="sec-title">Registering Your <em>Business</em> in Mumbai — Step by Step</h2>
<div className="card-grid">
  <div className="data-card"><div className="dc-icon">🏢</div><div className="dc-title">Private Limited Company</div><div className="dc-body">Most scalable structure. Register with MCA21 portal — PAN, Aadhaar, DSC (Digital Signature) needed. Cost: ₹6,000–₹15,000 via professional. Time: 7–14 working days. Best for: startups seeking funding.</div><a href="https://www.mca.gov.in" target="_blank" rel="noopener" className="dc-cta">MCA Portal ↗</a></div>
  <div className="data-card"><div className="dc-icon">🤝</div><div className="dc-title">LLP — Limited Liability Partnership</div><div className="dc-body">Easier compliance than Pvt Ltd. Good for 2–4 co-founders in service businesses. Register via MCA21. Cost: ₹3,000–₹8,000 via professional. Annual compliance: simpler than Pvt Ltd.</div></div>
  <div className="data-card"><div className="dc-icon">🛒</div><div className="dc-title">Sole Proprietorship / Shop</div><div className="dc-body">Simplest structure. Get GST registration + Shop & Establishment licence from BMC ward office. PAN mandatory. No separate registration — business runs in your own name. Best for: small traders, freelancers.</div></div>
</div></div>
<div className="sec rv"><div className="sec-kicker">Licences & Registrations</div><h2 className="sec-title">Every Mumbai Business <em>Needs These</em></h2>
<div className="table-wrap"><table className="price-table">
  <thead><tr><th>Registration</th><th>Who Needs It</th><th>Where to Apply</th><th>Time</th></tr></thead>
  <tbody>
    <tr><td>GST Registration</td><td>Turnover above ₹20 lakh (₹10 lakh for services in some categories)</td><td><a href="https://www.gst.gov.in" target="_blank" rel="noopener">gst.gov.in ↗</a></td><td>3–7 days</td></tr>
    <tr><td>Shop & Establishment Licence</td><td>Every business with a physical shop/office in Mumbai</td><td><a href="https://aaplesarkar.mahaonline.gov.in" target="_blank" rel="noopener">Aaple Sarkar ↗</a></td><td>Online — 7 days</td></tr>
    <tr><td>MSME / Udyam Registration</td><td>All small businesses — gives access to govt schemes, priority lending</td><td><a href="https://udyamregistration.gov.in" target="_blank" rel="noopener">Udyam Portal ↗</a></td><td>Same day — free</td></tr>
    <tr><td>FSSAI Licence (Food)</td><td>Any food business — restaurant, cloud kitchen, packaged food</td><td><a href="https://foscos.fssai.gov.in" target="_blank" rel="noopener">FoSCoS ↗</a></td><td>30–60 days</td></tr>
    <tr><td>Import Export Code (IEC)</td><td>Any business importing/exporting goods</td><td><a href="https://www.dgft.gov.in" target="_blank" rel="noopener">DGFT ↗</a></td><td>2–3 days</td></tr>
    <tr><td>Startup India Registration</td><td>Innovative startups less than 10 years old, turnover below ₹100 crore</td><td><a href="https://www.startupindia.gov.in" target="_blank" rel="noopener">Startup India ↗</a></td><td>3–5 days</td></tr>
  </tbody>
</table></div></div>
<div className="sec rv"><div className="sec-kicker">Mumbai's Startup Ecosystem</div><h2 className="sec-title">Incubators, Co-working & <em>Funding</em> in Mumbai</h2>
<div className="card-grid">
  <div className="data-card"><div className="dc-icon">🏗️</div><div className="dc-title">SINE — IIT Bombay</div><div className="dc-body">Society for Innovation and Entrepreneurship at IIT Bombay (Powai). India's top tech incubator. Equity and non-equity programmes. Apply at sineiitb.org — open to all (not just IIT alumni).</div><a href="https://sineiitb.org" target="_blank" rel="noopener" className="dc-cta">Apply ↗</a></div>
  <div className="data-card"><div className="dc-icon">🌐</div><div className="dc-title">CIIE.CO / 91Springboard</div><div className="dc-body">91Springboard has 5+ co-working spaces in Mumbai (BKC, Andheri, Mahalaxmi). Membership from ₹7,000/month. Strong startup community, events and mentorship network. Good first base.</div></div>
  <div className="data-card"><div className="dc-icon">💰</div><div className="dc-title">Mumbai Angel Network</div><div className="dc-body">One of India's most active angel investor networks — HQ Mumbai, 400+ investors. Apply for funding at mumbaiangels.com. Also connects to Sequoia Surge, Nexus Ventures, Matrix Partners (all Mumbai-active).</div></div>
</div></div>
<div className="prose rv"><h2>Mumbai Startup & Business Guide 2026</h2><p>Mumbai is India's financial capital and increasingly its startup capital — Bandra-Kurla Complex (BKC) has become a hub for fintech, media-tech and consumer startups alongside traditional financial services. The city's advantages: deepest pool of seed and Series A capital in India, the strongest ecosystem of CA/law/finance professionals to support growth, and a consumer market of 2 crore high-purchasing-power residents to test products on.</p><h3>Why BKC Is Mumbai's Business Nerve Centre</h3><p>Bandra-Kurla Complex (BKC) houses the BSE and NSE (stock exchanges), RBI regional office, SEBI, Goldman Sachs, Morgan Stanley, and dozens of startup unicorn offices. It's the most sought-after business address in Mumbai — and with Metro Line 3 now operational, also the most accessible. For startups, being in BKC signals credibility to investors.</p></div>
</main><aside className="page-sidebar"><div className="sb-widget"><div className="sbw-head">🚀 Key <em>Portals</em></div><div className="sbw-body"><a href="https://www.startupindia.gov.in" target="_blank" rel="noopener noreferrer" className="sb-row"><span className="sb-row-label">🇮🇳 Startup India</span><span className="sb-row-value--cta">Register ↗</span></a><a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" className="sb-row"><span className="sb-row-label">🏭 MSME Udyam</span><span className="sb-row-value--cta">Free ↗</span></a><a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer" className="sb-row last"><span className="sb-row-label">💰 GST Registration</span><span className="sb-row-value--cta">Apply ↗</span></a></div></div><div className="sb-widget"><div className="sbw-head">🔗 Quick <em>Links</em></div><div className="sbw-body"><Link href="/mumbai-local-train" className="quick-link"><div className="ql-icon">🚂</div><div className="ql-text">Local Train</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-real-estate-guide" className="quick-link"><div className="ql-icon">💰</div><div className="ql-text">Real Estate</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-monsoon" className="quick-link"><div className="ql-icon">🌧️</div><div className="ql-text">Monsoon</div><div className="ql-arrow">→</div></Link><Link href="/senior-citizens-mumbai" className="quick-link"><div className="ql-icon">👴</div><div className="ql-text">Senior Citizens</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-cost-of-living" className="quick-link"><div className="ql-icon">💸</div><div className="ql-text">Cost of Living</div><div className="ql-arrow">→</div></Link><Link href="/pets-mumbai" className="quick-link"><div className="ql-icon">🐾</div><div className="ql-text">Pets</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-street-food" className="quick-link"><div className="ql-icon">🥘</div><div className="ql-text">Street Food</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-sports" className="quick-link"><div className="ql-icon">🏏</div><div className="ql-text">Sports Hub</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-education" className="quick-link"><div className="ql-icon">🎓</div><div className="ql-text">Education</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-corporator-ward" className="quick-link"><div className="ql-icon">🏛️</div><div className="ql-text">Corporator</div><div className="ql-arrow">→</div></Link></div></div></aside></div></div></div>
    </ScrollReveal>
  );
}
