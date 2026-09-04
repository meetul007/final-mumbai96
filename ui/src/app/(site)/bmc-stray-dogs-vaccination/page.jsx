import Link from "next/link";
import "./style.css";

export const metadata = {
  title:
    "BMC Stray Dog Vaccination Mumbai 2026 — Anti-Rabies Drive, Sterilisation & VHD Portal | Mumbai96",
  description:
    "BMC stray dog vaccination and anti-rabies programme in Mumbai 2026. How to report stray dog bite, access VHD portal, animal birth control programme, and BMC dog vaccination centres.",
  keywords:
    "bmc stray dog vaccination mumbai, stray dog bite mumbai, anti rabies vaccination mumbai, bmc abc programme, vhd.mcgm.gov.in, stray dog sterilisation mumbai",
  canonical: "https://mumbai96.vercel.app/bmc-stray-dogs-vaccination",
  openGraph: {
    title:
      "BMC Stray Dog Vaccination Mumbai 2026 — Anti-Rabies, Sterilisation & VHD Portal",
    description:
      "BMC stray dog vaccination and anti-rabies programme Mumbai 2026. Report dog bites, access VHD portal, ABC programme and vaccination centres.",
    url: "https://mumbai96.vercel.app/bmc-stray-dogs-vaccination",
    type: "article",
    siteName: "Mumbai96",
  },
};

const EMERGENCY_CONTACTS = [
  { icon: "🚑", label: "Ambulance", value: "108", href: "tel:108" },
  { icon: "📞", label: "BMC Helpline", value: "1916", href: "tel:1916" },
  {
    icon: "🐕",
    label: "VHD Portal",
    value: "Visit ↗",
    href: "https://vhd.mcgm.gov.in",
  },
  {
    icon: "📋",
    label: "File Complaint",
    value: "Online ↗",
    href: "https://www.mcgm.gov.in",
  },
];

const VACCINE_SCHEDULE = [
  { day: "Day 0", label: "First dose (same day of bite)", color: "red" },
  { day: "Day 3", label: "Second dose", color: "dark" },
  { day: "Day 7", label: "Third dose", color: "dark" },
  { day: "Day 14", label: "Fourth dose", color: "dark" },
  { day: "Day 28", label: "Fifth dose (final)", color: "dark" },
];

const QUICK_LINKS = [
  { href: "/coop-society-mumbai", icon: "🏘️", text: "Co-op Society Bye Laws" },
  { href: "/lift-licence-mumbai", icon: "🛗", text: "Lift Licence & Renewal" },
  { href: "/property-tax-mumbai", icon: "🏦", text: "Property Tax Payment" },
  { href: "/mhada-lottery-mumbai", icon: "🏗️", text: "MHADA Lottery 2026" },
  { href: "/bmc-gardens-mumbai", icon: "🌳", text: "Garden & Tree" },
  { href: "/bmc-schools-mumbai", icon: "🏫", text: "BMC Schools List" },
];

const HOSPITALS = [
  {
    icon: "🏥",
    name: "KEM Hospital",
    desc: "King Edward Memorial Hospital, Parel. 24x7 emergency anti-rabies treatment. Free for all. Rabies Immunoglobulin (RIG) available.",
    phone: "02224100000",
    href: "tel:02224100000",
  },
  {
    icon: "🏥",
    name: "Nair Hospital",
    desc: "Dr. BYL Nair Hospital, Mumbai Central. 24x7 OPD and emergency. Anti-rabies vaccine and RIG available free of cost.",
    phone: "02223082000",
    href: "tel:02223082000",
  },
  {
    icon: "🏥",
    name: "Sion Hospital",
    desc: "Lokmanya Tilak Municipal General Hospital, Sion. Serves Central & Eastern Mumbai. Free anti-rabies treatment 24x7.",
    phone: "02224090000",
    href: "tel:02224090000",
  },
  {
    icon: "🏥",
    name: "Cooper Hospital",
    desc: "MW Desai Municipal General Hospital, Vile Parle. Serves Western Suburbs. Anti-rabies vaccine available at OPD.",
    phone: "02226207254",
    href: "tel:02226207254",
  },
  {
    icon: "🏥",
    name: "BMC Health Centres (175+)",
    desc: "All 175+ BMC urban health centres provide anti-rabies vaccine during OPD hours (8 AM–1 PM). Find nearest centre on BMC portal.",
    href: "https://www.mcgm.gov.in",
  },
  {
    icon: "🏥",
    name: "Rajawadi Hospital, Ghatkopar",
    desc: "BMC's Rajawadi Hospital serves Eastern Mumbai & Ghatkopar region. Anti-rabies treatment available 24x7 at emergency OPD.",
    phone: "02225103500",
    href: "tel:02225103500",
  },
];

const BITE_STEPS = [
  {
    num: "1",
    title: "Wash Wound Immediately",
    desc: "Wash with soap and clean water for 15 minutes. Remove clothing around wound. Apply Povidone-Iodine (Betadine) or 70% alcohol. Do NOT close wound with bandage initially.",
  },
  {
    num: "2",
    title: "Go to BMC Hospital or Any Government Hospital",
    desc: "Anti-rabies vaccine and Rabies Immunoglobulin (RIG) are available FREE at all BMC hospitals. Go immediately — within the same day of the bite if possible.",
  },
  {
    num: "3",
    title: "Complete Full Vaccination Course",
    desc: "Anti-rabies vaccine requires multiple doses — Day 0, Day 3, Day 7, Day 14 and Day 28. Missing doses is dangerous. All doses are free at government hospitals.",
  },
  {
    num: "4",
    title: "Report to BMC",
    desc: "File a complaint with BMC about the stray dog at 1916 or online at mcgm.gov.in. BMC will arrange for the dog to be caught, vaccinated and sterilised under the ABC programme.",
  },
];

const ABC_POINTS = [
  "ABC stands for <strong>Animal Birth Control</strong> — mandated by Supreme Court of India and Prevention of Cruelty to Animals Act 1960",
  "BMC is prohibited from culling stray dogs — they must be caught, sterilised, vaccinated and released at the same location",
  "Stray dogs are caught by BMC's Veterinary Health Department, taken to BMC dog pounds for surgery and released within 48 hours",
  "All sterilised and vaccinated dogs are notch-ear marked for identification — means they have already been in the ABC programme",
  "Anti-rabies vaccination is given along with sterilisation surgery — creates herd immunity over time",
  "Citizens can request BMC to catch a specific aggressive stray dog for ABC by calling 1916",
  "Feeding stray dogs is legally permitted — feeders also have responsibility to get dogs vaccinated",
];

export default function BmcStrayDogsVaccinationPage() {
  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(255,107,0,.1)",
            top: "-80px",
            right: "-80px",
          }}
        ></div>
        <div
          className="ph-glow"
          style={{
            background: "rgba(55,27,88,.3)",
            bottom: "-100px",
            left: "-80px",
          }}
        ></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>BMC Stray Dog Vaccination</span>
            </div>
            <div className="ph-kicker">
              Mumbai96 · BMC Animal Services · VHD Portal
            </div>
            <h1 className="ph-h1">
              BMC <em>Stray Dog</em>
              &nbsp;
              Vaccination <span className="gold">Mumbai 2026</span>
            </h1>
            <p className="ph-desc">
              BMC's Veterinary Health Department runs Mumbai's anti-rabies
              vaccination and Animal Birth Control (ABC) programme for stray
              dogs. Report dog bites, find vaccination centres and access the
              official VHD portal.
            </p>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs">
                <div className="phs-n">95,000+</div>
                <div className="phs-l">Stray Dogs in Mumbai</div>
              </div>
              <div className="phs">
                <div className="phs-n">ABC</div>
                <div className="phs-l">Animal Birth Control Programme</div>
              </div>
              <div className="phs">
                <div className="phs-n">Free</div>
                <div className="phs-l">Anti-Rabies Vaccination</div>
              </div>
              <div className="phs">
                <div className="phs-n">24x7</div>
                <div className="phs-l">Dog Bite Helpline</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              {/* VHD Portal Section */}
              <div className="sec rv">
                <div className="sec-kicker">Official VHD Portal</div>
                <h2 className="sec-title">
                  BMC Veterinary <em>Portal</em> — Access Now
                </h2>
                <div className="cta-bar">
                  <div>
                    <h3>
                      VHD <em>MCGM Portal</em>
                    </h3>
                    <p>
                      BMC's Veterinary Health Department official portal for dog
                      registration, ABC programme data and animal welfare
                      services
                    </p>
                  </div>
                  <a
                    href="https://vhd.mcgm.gov.in"
                    target="_blank"
                    rel="noopener"
                    className="cta-btn"
                  >
                    Go to vhd.mcgm.gov.in &#8599;
                  </a>
                </div>
                <a
                  href="https://vhd.mcgm.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">🐕</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      VHD MCGM — Official Veterinary Health Portal
                    </div>
                    <div className="lc-desc">
                      BMC's official Veterinary Health Department portal — stray
                      dog data, ABC programme, vaccination records and animal
                      welfare
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://www.mcgm.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">🏙️</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MCGM Official Portal — Report & Complaint
                    </div>
                    <div className="lc-desc">
                      File complaint about stray dog menace, aggressive stray
                      dogs, report dog bite incidents online
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://pbmcservices.mcgm.gov.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">📋</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      MCGM Online Services — Dog Registration
                    </div>
                    <div className="lc-desc">
                      Register your pet dog with BMC online, renew dog licence,
                      pay registration fee and get dog tag
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://www.peta.org.in"
                  target="_blank"
                  rel="noopener"
                  className="link-card"
                >
                  <div className="lc-icon">🌿</div>
                  <div className="lc-body">
                    <div className="lc-title">
                      PETA India — Animal Welfare Support
                    </div>
                    <div className="lc-desc">
                      Report animal cruelty, access legal resources for stray
                      animal protection and connect with local animal welfare
                      groups
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              {/* Dog Bite Emergency Section */}
              <div className="sec rv">
                <div className="sec-kicker">Dog Bite Emergency</div>
                <h2 className="sec-title">
                  Bitten by a Dog? <em>Act Immediately</em>
                </h2>
                <div className="warn-box">
                  <div className="warn-icon">🚨</div>
                  <div className="warn-body">
                    <h4>URGENT: Dog Bite First Aid — Do This Now</h4>
                    <p>
                      Wash the bite wound thoroughly with soap and running water
                      for at least 15 minutes. Apply antiseptic (Betadine). Go
                      to the nearest BMC hospital or government hospital
                      immediately for anti-rabies treatment. Do NOT delay —
                      rabies is fatal if treatment is not started promptly.
                    </p>
                  </div>
                </div>
                <ol className="step-list">
                  {BITE_STEPS.map((step) => (
                    <li key={step.num}>
                      <div className="step-num">{step.num}</div>
                      <div className="step-body">
                        <strong>{step.title}</strong>
                        {step.desc}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Anti-Rabies Vaccination Centres */}
              <div className="sec rv">
                <div className="sec-kicker">
                  Anti-Rabies Vaccination Centres
                </div>
                <h2 className="sec-title">
                  Where to Get <em>Free Anti-Rabies</em> Treatment
                </h2>
                <div className="card-grid">
                  {HOSPITALS.map((hospital, idx) => (
                    <div key={idx} className="data-card">
                      <div className="dc-icon">{hospital.icon}</div>
                      <div className="dc-title">{hospital.name}</div>
                      <div className="dc-body">{hospital.desc}</div>
                      {hospital.phone ? (
                        <a href={hospital.href} className="dc-cta">
                          📞 {hospital.phone}
                        </a>
                      ) : (
                        <a
                          href={hospital.href}
                          target="_blank"
                          rel="noopener"
                          className="dc-cta"
                        >
                          Find Nearest →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ABC Programme Section */}
              <div className="sec rv">
                <div className="sec-kicker">ABC Programme</div>
                <h2 className="sec-title">
                  BMC's Animal Birth <em>Control Programme</em>
                </h2>
                <div className="info-box">
                  <h4>🐾 What Is the ABC Programme?</h4>
                  <ul>
                    {ABC_POINTS.map((point, idx) => (
                      <li
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: point }}
                      ></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pet Dog Registration Section */}
              <div className="sec rv">
                <div className="sec-kicker">Pet Dog Registration</div>
                <h2 className="sec-title">
                  Register Your <em>Pet Dog</em> with BMC
                </h2>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Detail</th>
                        <th>Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Who Must Register</td>
                        <td style={{ fontSize: "12px" }}>
                          All pet dog owners in Mumbai must register with BMC —
                          mandatory under BMC Act
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Registration Fee</td>
                        <td style={{ fontSize: "12px" }}>
                          ₹100–₹500 per year depending on dog breed and ward
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>How to Register</td>
                        <td style={{ fontSize: "12px" }}>
                          Online via MCGM portal or at your BMC ward office
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Documents Needed</td>
                        <td style={{ fontSize: "12px" }}>
                          Aadhaar / address proof, pet vaccination record, photo
                          of dog
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Rabies Vaccination</td>
                        <td style={{ fontSize: "12px" }}>
                          Pet dogs must have annual rabies vaccination —
                          certificate required for renewal
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Dog Tag</td>
                        <td style={{ fontSize: "12px" }}>
                          BMC issues a metal dog tag after registration — must
                          be worn by dog at all times
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="warn-box">
                  <div className="warn-icon">⚠️</div>
                  <div className="warn-body">
                    <h4>Unregistered Pet Dogs — Penalty</h4>
                    <p>
                      Keeping an unregistered pet dog in Mumbai is a violation
                      of BMC Act. BMC can seize the dog and owner may face fine.
                      Register your dog promptly via the MCGM portal or at your
                      ward office.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prose Content */}
              <div className="prose rv">
                <h2>BMC Stray Dog Vaccination Mumbai — Complete Guide 2026</h2>
                <p>
                  Mumbai's stray dog population is estimated at over{" "}
                  <strong>95,000 dogs</strong> managed by BMC's Veterinary
                  Health Department (VHD). Under the Supreme Court's mandate and
                  the Animal Birth Control (Dogs) Rules 2001, BMC cannot kill
                  stray dogs but must sterilise and vaccinate them under the ABC
                  programme. The VHD portal at{" "}
                  <a
                    href="https://vhd.mcgm.gov.in"
                    target="_blank"
                    rel="noopener"
                  >
                    vhd.mcgm.gov.in
                  </a>{" "}
                  tracks all registered stray and pet dogs in Mumbai.
                </p>
                <h3>Is Rabies Common in Mumbai?</h3>
                <p>
                  Mumbai has significantly reduced rabies incidence due to the
                  ABC + anti-rabies vaccination programme. However, rabies is
                  still present and every dog bite must be treated seriously.
                  The incubation period of rabies can range from 10 days to 1
                  year — which is why immediate treatment is critical even if
                  the wound seems minor.
                </p>
                <h3>Can You Feed Stray Dogs in Mumbai?</h3>
                <p>
                  Yes, feeding stray dogs is permitted and protected by the
                  Supreme Court of India (2015 ruling). However, the Bombay High
                  Court has also ruled that feeding must not cause nuisance to
                  neighbours and should be done at designated spots. Resident
                  Welfare Associations (RWAs) and housing societies cannot ban
                  feeder residents from feeding stray dogs in public spaces
                  adjacent to the building.
                </p>
                <h3>Conflict Between Feeders and Residents</h3>
                <p>
                  In case of disputes between stray dog feeders and residents
                  who are afraid of stray dogs, the matter should be addressed
                  to the local ward's Animal Welfare Officer or through the BMC
                  complaint portal. BMC has a Standard Operating Procedure (SOP)
                  for conflict resolution in such cases, including marking
                  feeding spots and ensuring regular ABC of the dogs being fed.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🚨 Dog Bite <em>Emergency</em>
                </div>
                <div className="sbw-body">
                  {EMERGENCY_CONTACTS.map((contact, idx) => (
                    <a
                      key={idx}
                      href={contact.href}
                      target={
                        contact.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        contact.href.startsWith("http") ? "noopener" : undefined
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom:
                          idx < EMERGENCY_CONTACTS.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: 700 }}>
                        {contact.icon} {contact.label}
                      </span>
                      <span
                        style={{
                          fontSize: contact.value.includes("↗")
                            ? "10px"
                            : "16px",
                          fontWeight: 800,
                          color: "var(--red)",
                        }}
                      >
                        {contact.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  🏥 Anti-Rabies <em>Vaccine Schedule</em>
                </div>
                <div
                  className="sbw-body"
                  style={{
                    fontSize: "12px",
                    color: "#374151",
                    fontWeight: 300,
                    lineHeight: 1.9,
                  }}
                >
                  {VACCINE_SCHEDULE.map((schedule, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "6px 0",
                        borderBottom:
                          idx < VACCINE_SCHEDULE.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      <strong
                        style={{
                          color:
                            schedule.color === "red"
                              ? "var(--red)"
                              : "var(--dark)",
                        }}
                      >
                        {schedule.day}
                      </strong>{" "}
                      — {schedule.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  Quick <em>Links</em>
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
