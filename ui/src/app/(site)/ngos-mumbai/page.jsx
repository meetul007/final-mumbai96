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

export default function NgosMumbaiPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Verified NGOs Mumbai" },
        ]}
        kicker="Mumbai96 · Community · Give Back to Mumbai"
        title={
          <>
            Verified <em>NGOs</em>
            &nbsp;
            Mumbai <span className="gold">2026</span>
          </>
        }
        description={
          <>
            Donate with confidence. This curated list covers Mumbai&apos;s most
            trusted, transparent and genuinely impactful NGOs across child welfare,
            women&apos;s rights, education, disability, environment and animal
            welfare.
          </>
        }
        stats={[
          { value: "25+", label: "Verified NGOs Listed" },
          { value: "8", label: "Cause Categories" },
          { value: "80G", label: "Tax Benefit on Donations" },
          { value: "FCRA", label: "Registered & Transparent" },
        ]}
      />

      <div className="page-body"><div className="con"><div className="page-layout">
<main>

  <div className="sec rv">
    <div className="sec-kicker">Verify Before You Donate</div>
    <h2 className="sec-title">How to <em>Check NGO Legitimacy</em></h2>
    <div className="warn-box"><div className="warn-icon">⚠️</div><div className="warn-body"><h4>Always Verify an NGO Before Donating</h4><p>Check the NGO's registration number on the NGO Darpan portal (ngo.india.gov.in), FCRA registration for foreign donations, and 80G certificate for tax benefits. All genuine NGOs will provide these willingly. Never donate via personal bank accounts — always use the organisation's official account.</p></div></div>
    <div className="card-grid">
      <div className="data-card"><div className="dc-icon">🔍</div><div className="dc-title">NGO Darpan Portal</div><div className="dc-body">India's official NGO transparency portal. Check if an NGO is registered, view its activities, annual reports and utilisation certificates.</div><a href="https://ngodarpan.gov.in" target="_blank" rel="noopener noreferrer" className="dc-cta">Verify NGO ↗</a></div>
      <div className="data-card"><div className="dc-icon">📋</div><div className="dc-title">FCRA Registration Check</div><div className="dc-body">Foreign Contribution Regulation Act registration is mandatory for NGOs receiving foreign donations. Check FCRA status at MHA's FCRA portal.</div><a href="https://fcraonline.nic.in" target="_blank" rel="noopener noreferrer" className="dc-cta">Check FCRA ↗</a></div>
      <div className="data-card"><div className="dc-icon">💰</div><div className="dc-title">80G Tax Certificate</div><div className="dc-body">Donations to 80G-registered NGOs are tax deductible (50–100% of donation amount). Ask for the 80G certificate before donating. Verify validity on the IT portal.</div><a href="https://incometaxindiaefiling.gov.in" target="_blank" rel="noopener noreferrer" className="dc-cta">IT Portal ↗</a></div>
    </div>
  </div>

  <div className="sec rv">
    <div className="sec-kicker">Child Welfare</div>
    <h2 className="sec-title">NGOs for <em>Children</em> in Mumbai</h2>
    <div className="card-grid">
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">👶</div><div><div className="nc-title">Smile Foundation</div><div className="nc-tag">Education · Healthcare · Livelihood</div></div></div><div className="nc-body">Works with underprivileged children — education, healthcare and livelihood for slum children across Mumbai. 10 lakh+ children impacted annually. FCRA + 80G registered.</div><div className="nc-links"><a href="https://smilefoundationindia.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a><a href="https://ngodarpan.gov.in" target="_blank" rel="noopener noreferrer" className="nc-link">Verify ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🏫</div><div><div className="nc-title">Pratham Mumbai</div><div className="nc-tag">Education · Learning Outcomes</div></div></div><div className="nc-body">India's largest education NGO. Mumbai chapter runs learning centres, teacher training and digital education initiatives in BMC schools and slum areas. Annual ASER report globally cited.</div><div className="nc-links"><a href="https://pratham.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🤝</div><div><div className="nc-title">CRY — Child Rights &amp; You</div><div className="nc-tag">Child Rights · Education · Policy</div></div></div><div className="nc-body">India's most trusted child rights organisation. Headquartered in Mumbai. Works across child labour, education and legal protection. Strong FCRA + 80G + FCRA foreign donation track record.</div><div className="nc-links"><a href="https://cry.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a><a href="https://cry.org/donate" target="_blank" rel="noopener noreferrer" className="nc-link">Donate ↗</a></div></div>
    </div>
  </div>

  <div className="sec rv">
    <div className="sec-kicker">Women & Girls</div>
    <h2 className="sec-title">NGOs for <em>Women's Empowerment</em></h2>
    <div className="card-grid">
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">👩</div><div><div className="nc-title">iCall — TISS Mumbai</div><div className="nc-tag">Mental Health · Counselling</div></div></div><div className="nc-body">Free psychological counselling helpline by Tata Institute of Social Sciences. Strong focus on women and marginalised communities. iCall helpline: 9152987821.</div><div className="nc-links"><a href="https://icallhelpline.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">💪</div><div><div className="nc-title">Majlis — Legal Rights</div><div className="nc-tag">Legal Aid · Women's Rights</div></div></div><div className="nc-body">Provides free legal advice and representation to women in distress — domestic violence, divorce, maintenance, custody. Mumbai-based, 30+ years active.</div><div className="nc-links"><a href="https://majlislaw.com" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🌸</div><div><div className="nc-title">Snehalaya</div><div className="nc-tag">Rescue · Rehabilitation · Livelihood</div></div></div><div className="nc-body">Works with women and children in crisis — rescue, rehabilitation and livelihood training. Operates shelters and skill development centres across Maharashtra including Mumbai.</div><div className="nc-links"><a href="https://snehalaya.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
    </div>
  </div>

  <div className="sec rv">
    <div className="sec-kicker">Environment</div>
    <h2 className="sec-title">NGOs for <em>Environment</em> in Mumbai</h2>
    <div className="card-grid">
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🌿</div><div><div className="nc-title">Vanashakti</div><div className="nc-tag">Urban Forests · Mangroves · Trees</div></div></div><div className="nc-body">Mumbai's most active environmental NGO — fights for Aarey forest, mangrove protection and illegal tree cutting. Files PILs in Bombay HC. Volunteer-driven.</div><div className="nc-links"><a href="https://vanashakti.in" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🦜</div><div><div className="nc-title">BNHS — Bombay Natural History Society</div><div className="nc-tag">Wildlife · Research · Conservation</div></div></div><div className="nc-body">India's oldest and most prestigious wildlife conservation organisation, founded 1883. HQ Mumbai. Research, conservation education and migratory bird monitoring across India.</div><div className="nc-links"><a href="https://bnhs.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🌊</div><div><div className="nc-title">Afroz Shah Foundation</div><div className="nc-tag">Beach Cleanup · Oceans</div></div></div><div className="nc-body">Behind the famous Versova Beach cleanup — world's largest beach cleanup (Guinness record). Still active, expanding to other Mumbai beaches and beyond. Volunteer weekends open to all.</div><div className="nc-links"><a href="https://afrozshah.com" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
    </div>
  </div>

  <div className="sec rv">
    <div className="sec-kicker">Animal Welfare</div>
    <h2 className="sec-title">NGOs for <em>Animal Welfare</em> in Mumbai</h2>
    <div className="card-grid">
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🐾</div><div><div className="nc-title">BSPCA — Bombay Society for SPCA</div><div className="nc-tag">Animal Rescue · Treatment</div></div></div><div className="nc-body">India's oldest animal welfare society (1861). Runs Mumbai's largest animal hospital at Parel. Rescues injured animals, runs ABC programme and adoption drives. FCRA + 80G.</div><div className="nc-links"><a href="https://bspca.org.in" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🐕</div><div><div className="nc-title">Welfare of Stray Dogs (WSD)</div><div className="nc-tag">Stray Dogs · ABC · Policy</div></div></div><div className="nc-body">WSD has championed the humane treatment of stray dogs in India for 40+ years. Runs the largest ABC (sterilisation) programme in Mumbai. Advocates for stray dog protection in courts.</div><div className="nc-links"><a href="https://wsd.org.in" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">🐱</div><div><div className="nc-title">PAWS Mumbai</div><div className="nc-tag">Pet Adoption · Rescue · Education</div></div></div><div className="nc-body">People for Animals Welfare Society — runs pet adoption drives, rescue operations, anti-cruelty campaigns. Mumbai's most active adoption NGO with regular virtual adoption events.</div><div className="nc-links"><a href="https://pawsindia.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
    </div>
  </div>

  <div className="sec rv">
    <div className="sec-kicker">Elderly & Disability</div>
    <h2 className="sec-title">NGOs for <em>Elderly &amp; Disability</em></h2>
    <div className="card-grid">
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">👴</div><div><div className="nc-title">HelpAge India — Mumbai</div><div className="nc-tag">Elderly Care · Mobile Healthcare</div></div></div><div className="nc-body">India's largest organisation for senior citizens — mobile healthcare vans, elder abuse helpline (1800-180-1253), pension advocacy and caregiver training. Mumbai chapter very active.</div><div className="nc-links"><a href="https://helpageindia.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">♿</div><div><div className="nc-title">Adapt — Formerly Spastics Society</div><div className="nc-tag">Cerebral Palsy · Disability</div></div></div><div className="nc-body">Mumbai's leading disability rehabilitation organisation — schools, therapy, vocational training for cerebral palsy and multiple disability. Bandra HQ, 60+ years serving Mumbai.</div><div className="nc-links"><a href="https://adaptindia.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
      <div className="ngo-card"><div className="nc-head"><div className="nc-icon">👁️</div><div><div className="nc-title">NAB — National Association for the Blind</div><div className="nc-tag">Visual Impairment · Education</div></div></div><div className="nc-body">Established 1952 — runs schools, Braille library, vocational training for the visually impaired. Worli HQ Mumbai. India's oldest and most comprehensive blind welfare organisation.</div><div className="nc-links"><a href="https://nabindia.org" target="_blank" rel="noopener noreferrer" className="nc-link">Website ↗</a></div></div>
    </div>
  </div>

  <div className="prose rv">
    <h2>Verified NGOs in Mumbai — Guide to Responsible Giving 2026</h2>
    <p>Mumbai has thousands of registered NGOs — from highly impactful organisations running multi-crore programmes to small grassroots community groups and, unfortunately, some fraudulent entities. <strong>Always verify before donating</strong>. The NGO Darpan portal (ngodarpan.gov.in) is the definitive source — it lists all registered voluntary organisations and their compliance status.</p>
    <h3>What Is 80G and Why Does It Matter?</h3>
    <p>Section 80G of the Income Tax Act allows donors to claim deductions of 50–100% of the donated amount from their taxable income. This means donating to an 80G-registered NGO effectively costs you less — the government subsidises your donation. Ensure the NGO provides you a stamped receipt with their 80G registration number for your IT returns.</p>
    <h3>How to Volunteer with Mumbai NGOs</h3>
    <p>Most listed NGOs actively welcome volunteers — from weekend teaching visits to technical volunteers (legal, medical, IT). Contact the NGO directly via their website. Also check platforms like iVolunteer (ivolunteer.in) and GiveIndia's volunteer matching for structured volunteering opportunities across Mumbai's NGO sector.</p>
  </div>
</main>
<aside className="page-sidebar">
  <div className="sb-widget">
    <div className="sbw-head">✅ Verify <em>NGOs</em></div>
    <div className="sbw-body">
      <a href="https://ngodarpan.gov.in" target="_blank" rel="noopener noreferrer" className="sb-cta-green">NGO Darpan — Verify ↗</a>
      <a href="https://fcraonline.nic.in" target="_blank" rel="noopener noreferrer"><span>🔍 Check FCRA</span><span>Visit ↗</span></a>
      <a href="https://www.giveindia.org" target="_blank" rel="noopener noreferrer" className="sb-row last"><span className="sb-row-label">💰 Give India Platform</span><span className="sb-row-value--cta">Donate ↗</span></a>
    </div>
  </div>
  <div className="sb-widget">
    <div className="sbw-head">📞 Emergency <em>Helplines</em></div>
    <div className="sbw-body sb-list-plain">
      <div><strong>Child Helpline:</strong> 1098</div>
      <div><strong>Women Helpline:</strong> 181</div>
      <div><strong>Senior Citizens:</strong> 1800-180-1253</div>
      <div><strong>iCall Counselling:</strong> 9152987821</div>
      <div><strong>Vandrevala Foundation:</strong> 1860-2662-345</div>
    </div>
  </div>
  <div className="sb-widget">
    <div className="sbw-head">Quick <em>Links</em></div>
    <div className="sbw-body">
<Link href="/coop-society-mumbai" className="quick-link"><div className="ql-icon">🏘️</div><div className="ql-text">Co-op Society Bye Laws</div><div className="ql-arrow">→</div></Link>
<Link href="/lift-licence-mumbai" className="quick-link"><div className="ql-icon">🛗</div><div className="ql-text">Lift Licence &amp; Renewal</div><div className="ql-arrow">→</div></Link>
<Link href="/property-tax-mumbai" className="quick-link"><div className="ql-icon">🏦</div><div className="ql-text">Property Tax Payment</div><div className="ql-arrow">→</div></Link>
<Link href="/mhada-lottery-mumbai" className="quick-link"><div className="ql-icon">🏗️</div><div className="ql-text">MHADA Lottery 2026</div><div className="ql-arrow">→</div></Link>
<Link href="/mumbai-exhibitions" className="quick-link"><div className="ql-icon">🎪</div><div className="ql-text">Mumbai Exhibitions 2026</div><div className="ql-arrow">→</div></Link>
<Link href="/save-electricity-mumbai" className="quick-link"><div className="ql-icon">⚡</div><div className="ql-text">Save Electricity Mumbai</div><div className="ql-arrow">→</div></Link>
<Link href="/coop-society-imp-mumbai" className="quick-link"><div className="ql-icon">🏢</div><div className="ql-text">Society IMP Guide</div><div className="ql-arrow">→</div></Link>
<Link href="/mumbai-lost-found" className="quick-link"><div className="ql-icon">🔍</div><div className="ql-text">Mumbai Lost &amp; Found</div><div className="ql-arrow">→</div></Link>
<Link href="/ngos-mumbai" className="quick-link"><div className="ql-icon">🤝</div><div className="ql-text">Verified NGOs Mumbai</div><div className="ql-arrow">→</div></Link>
<Link href="/women-empowerment-mumbai" className="quick-link"><div className="ql-icon">👩</div><div className="ql-text">Women Empowerment</div><div className="ql-arrow">→</div></Link>
</div>
  </div>
</aside>
</div></div></div>

    </>
  );
}
