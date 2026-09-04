import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata = {
  title: "Mumbai Street Food Guide — Mumbai96",
  description: "Ultimate Mumbai street food guide — iconic dishes, khau gallis, area food map, vada pav, pav bhaji, bhel puri, and price guide for every neighbourhood.",
};

export default function MumbaiPage() {
  return (
    <ScrollReveal>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Mumbai Street Food" },
        ]}
        kicker="Mumbai96 · Food Culture · From Vada Pav to Koliwada"
        title={
          <>
            Mumbai <em>Street Food</em> &nbsp;
            <span className="gold">Guide 2026</span>
          </>
        }
        stats={[
          { value: "₹10", label: "Vada Pav — Street Price" },
          { value: "7 Khau Gallis", label: "Covered in This Guide" },
          { value: "1913", label: "Irani Cafe Culture Born" },
          { value: "24x7", label: "Mumbai Never Stops Eating" },
        ]}
      />
      <div className="page-body"><div className="con"><div className="page-layout"><main>
<div className="sec rv">
  <div className="sec-kicker">The Holy Trinity</div>
  <h2 className="sec-title">Mumbai's <em>Iconic</em> Street Foods</h2>
  <div className="card-grid">
    <div className="data-card"><div className="dc-icon">🥔</div><div className="dc-title">Vada Pav — Mumbai's Soul Food</div><div className="dc-body">Spiced potato fritter inside a pav, with three chutneys (dry garlic, green, tamarind). The unofficial lunch of every Mumbaikar. <strong>Best in city:</strong> Ashok Vada Pav (Dadar), Anand Stall (near Vile Parle station), SC Vada Pav (Malad).</div></div>
    <div className="data-card data-card--red"><div className="dc-icon">🫓</div><div className="dc-title">Pav Bhaji — Butter on Everything</div><div className="dc-body">Mixed vegetable bhaji cooked with butter, served with buttered pav. Born in Mumbai's cotton mill era as a quick meal for workers. <strong>Best:</strong> Sardar Pav Bhaji (Tardeo), Cannon Pav Bhaji (Chowpatty), Amar Juice Centre (Bandra).</div></div>
    <div className="data-card data-card--green"><div className="dc-icon">🌾</div><div className="dc-title">Bhel Puri — The Seaside Staple</div><div className="dc-body">Puffed rice, sev, vegetables, three chutneys — assembled in seconds at Chowpatty and Juhu Beach. The first street food most outsiders try in Mumbai. <strong>Best:</strong> Beachside at Girgaon Chowpatty, any good bhel cart at Juhu.</div></div>
  </div>
</div>
<div className="sec rv">
  <div className="sec-kicker">Mumbai's Khau Gallis</div>
  <h2 className="sec-title">Best <em>Food Streets</em> by Area</h2>
  <div className="festival-stack">
    <div className="festival-card"><div className="fc-month">South Mumbai</div><div className="fc-name">Mohammed Ali Road — Ramzan Food Heaven</div><div className="fc-body">Mumbai's most famous food street comes alive during Ramzan (30 days). Mawa cake, naan kalia, tawa chicken, sheekh kebab, phirni, haleem. Even outside Ramzan: excellent Mughlai food throughout the year. Crawford Market nearby for spices and dry fruits.</div></div>
    <div className="festival-card"><div className="fc-month">Central Mumbai</div><div className="fc-name">Dadar's Khau Galli — The Working Class Kitchen</div><div className="fc-body">Behind Dadar (TT) junction — a dense cluster of Maharashtrian eateries. Misal pav, sabudana khichdi, puran poli, batata vada, sol kadhi. Authentic Maharashtrian home-style cooking at street prices. Best visited: 7–10 AM (breakfast) and 12–3 PM (lunch).</div></div>
    <div className="festival-card"><div className="fc-month">Western Suburbs</div><div className="fc-name">Juhu — Bollywood Beach Food</div><div className="fc-body">Juhu Beach's food stretch is iconic — chaat, sev puri, bhel, pani puri carts plus proper restaurants. Evening 5–9 PM is the best time. The beach energy + street food combination is quintessentially Mumbai.</div></div>
    <div className="festival-card"><div className="fc-month">North Mumbai</div><div className="fc-name">Borivali's Market Area — Gujarati Flavour</div><div className="fc-body">Borivali West's market has excellent Gujarati snacks — dal puri, dhokla, fafda, jalebi, kachori. Strong Gujarati community means authentic snacks at all hours. Station area is particularly good for breakfast.</div></div>
    <div className="festival-card"><div className="fc-month">South Mumbai — Heritage</div><div className="fc-name">Irani Cafe Culture — Disappearing Mumbai</div><div className="fc-body">Kyani & Co. (Marine Lines, est. 1904), B. Merwan & Co. (Grant Road, est. 1914), Jimmy Boy (Fort) — Mumbai's surviving Irani cafes. Brun maska, chai, kheema pav. These cafes are living history. Visit before they're gone.</div></div>
  </div>
</div>
<div className="sec rv">
  <div className="sec-kicker">Area Food Map</div>
  <h2 className="sec-title">What to Eat <em>Where</em> — Mumbai Food by Area</h2>
  <div className="table-wrap"><table className="price-table">
    <thead><tr><th>Area</th><th>Signature Food</th><th>Must-Visit Spot</th></tr></thead>
    <tbody>
      <tr><td>Matunga</td><td>South Indian — idli, dosa, filter coffee</td><td>Ram Ashraya, Café Madras</td></tr>
      <tr><td>Sion / Dharavi</td><td>Sindhi food, biryani</td><td>Kalyan Bhojanalaya</td></tr>
      <tr><td>Bandra</td><td>Coastal — prawn koliwada, butter garlic crabs</td><td>Coast, Sea Palace</td></tr>
      <tr><td>Chembur</td><td>Maharashtrian — misal, thali</td><td>Lucky Restaurant</td></tr>
      <tr><td>Fort / Churchgate</td><td>Parsi food — dhansak, patra ni macchi</td><td>Britannia & Co, Café Royal</td></tr>
      <tr><td>Malad / Malwani</td><td>Malvani seafood — kombdi wade, surmai</td><td>Malvan Kinara, Aaswad</td></tr>
      <tr><td>Kurla / Govandi</td><td>Biryani — Hyderabadi, Mughlai</td><td>Noor Mohammadi, Delhi Darbar</td></tr>
    </tbody>
  </table></div>
</div>
<div className="prose rv">
  <h2>Mumbai Street Food — The Complete Eater's Guide 2026</h2>
  <p>Mumbai's street food culture is one of the most diverse, evolved and democratically accessible food ecosystems in the world. From the 60-paise vada pav that's kept lakh of mill workers fuelled for decades to the ₹600 crab at Bandra's seafood joints — Mumbai feeds everyone, everywhere, at every price point. No other city in India has this range.</p>
  <h3>The Best Time to Eat Street Food in Mumbai</h3>
  <p>Mumbai's street food is freshest and most varied at two times: <strong>7–10 AM</strong> (breakfast peak — fresh dosas, poha, upma, misalpav, vada, chai) and <strong>6–10 PM</strong> (evening peak — chaat, bhel, pav bhaji, vada pav, frankies). Avoid the 2–5 PM window when most stalls prepare fresh batches and quality can be inconsistent.</p>
</div>
</main><aside className="page-sidebar"><div className="sb-widget"><div className="sbw-head">🥘 Food <em>Essentials</em></div><div className="sbw-body sb-list-plain"><div><strong>Vada Pav:</strong> ₹10–₹25 (street), ₹40+ (branded)</div><div><strong>Pav Bhaji:</strong> ₹80–₹200</div><div><strong>Bhel Puri:</strong> ₹30–₹60</div><div><strong>Cutting Chai:</strong> ₹8–₹15</div></div></div><div className="sb-widget"><div className="sbw-head">🔗 Quick <em>Links</em></div><div className="sbw-body"><Link href="/mumbai-local-train" className="quick-link"><div className="ql-icon">🚂</div><div className="ql-text">Local Train Guide</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-real-estate-guide" className="quick-link"><div className="ql-icon">💰</div><div className="ql-text">Real Estate Intel</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-monsoon" className="quick-link"><div className="ql-icon">🌧️</div><div className="ql-text">Monsoon Guide</div><div className="ql-arrow">→</div></Link><Link href="/senior-citizens-mumbai" className="quick-link"><div className="ql-icon">👴</div><div className="ql-text">Senior Citizens</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-cost-of-living" className="quick-link"><div className="ql-icon">💸</div><div className="ql-text">Cost of Living</div><div className="ql-arrow">→</div></Link><Link href="/pets-mumbai" className="quick-link"><div className="ql-icon">🐾</div><div className="ql-text">Pets in Mumbai</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-sports" className="quick-link"><div className="ql-icon">🏏</div><div className="ql-text">Sports Hub</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-education" className="quick-link"><div className="ql-icon">🎓</div><div className="ql-text">Education Hub</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-startup-business" className="quick-link"><div className="ql-icon">🚀</div><div className="ql-text">Startup Guide</div><div className="ql-arrow">→</div></Link><Link href="/mumbai-festivals" className="quick-link"><div className="ql-icon">🎉</div><div className="ql-text">Festivals</div><div className="ql-arrow">→</div></Link></div></div></aside></div></div></div>
    </ScrollReveal>
  );
}
