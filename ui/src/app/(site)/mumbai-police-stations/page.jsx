import { PageHero } from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata = {
  title: "Mumbai Police Stations Directory — Mumbai96",
  description: "Complete directory of Mumbai police stations with phone numbers, jurisdiction areas, emergency contacts, and helplines for every zone of Mumbai.",
};

export default function MumbaiPoliceStationsPage() {

  const stations = [
    {
      name: "Andheri",
      jurisdiction: "Andheri West, Versova, DN Nagar",
      zone: "Western",
      phone: "022-2632-2111",
    },
    {
      name: "Borivali",
      jurisdiction: "Borivali West, IC Colony, Shimpoli",
      zone: "Western",
      phone: "022-2897-4041",
    },
    {
      name: "Kandivali",
      jurisdiction: "Kandivali West, Poisar, Charkop",
      zone: "Western",
      phone: "022-2804-0234",
    },
    {
      name: "Malad",
      jurisdiction: "Malad West, Malvani, Marve",
      zone: "Western",
      phone: "022-2887-1000",
    },
    {
      name: "Goregaon",
      jurisdiction: "Goregaon West, Film Nagar, Aarey",
      zone: "Western",
      phone: "022-2671-2555",
    },
    {
      name: "Bandra",
      jurisdiction: "Bandra West, Pali Hill, Reclamation",
      zone: "Western",
      phone: "022-2645-0301",
    },
    {
      name: "Dadar",
      jurisdiction: "Dadar West, Shivaji Park, Hindmata",
      zone: "Central",
      phone: "022-2414-5050",
    },
    {
      name: "Sion",
      jurisdiction: "Sion, Dharavi, Antop Hill",
      zone: "Central",
      phone: "022-2404-3282",
    },
    {
      name: "Colaba",
      jurisdiction: "Colaba, Cuffe Parade, Navy Nagar",
      zone: "South",
      phone: "022-2216-2001",
    },
    {
      name: "Azad Maidan",
      jurisdiction: "Fort, CST, Churchgate, Marine Lines",
      zone: "South",
      phone: "022-2207-4444",
    },
    {
      name: "Worli",
      jurisdiction: "Worli, Lower Parel, Elphinstone",
      zone: "South",
      phone: "022-2493-5003",
    },
    {
      name: "Kurla",
      jurisdiction: "Kurla West, BKC, Kalina",
      zone: "Eastern",
      phone: "022-2517-1000",
    },
    {
      name: "Ghatkopar",
      jurisdiction: "Ghatkopar West, Vikhroli",
      zone: "Eastern",
      phone: "022-2517-1003",
    },
    {
      name: "Mulund",
      jurisdiction: "Mulund West, LBS Marg",
      zone: "Eastern",
      phone: "022-2164-0001",
    },
  ];

  return (
    <ScrollReveal>
      <PageHero
        glowVariant="police"
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Police Stations" },
        ]}
        kicker="Mumbai96 · Safety Guide · Mumbai Police Directory"
        title={
          <>
            Mumbai <em>Police Station</em>
            &nbsp;
            Directory 2026
          </>
        }
        description={
          <>
            Find your nearest Mumbai police station instantly. Complete directory
            with phone numbers, addresses, jurisdiction areas and emergency
            contacts — for every zone of Mumbai.
          </>
        }
        stats={[
          { value: "100+", label: "Police Stations" },
          { value: "100", label: "Emergency" },
          { value: "112", label: "Police Helpline" },
          { value: "1091", label: "Women Helpline" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Emergency First</div>
                <h2 className="sec-title">
                  <em>Emergency</em> Contacts — Call First
                </h2>
                <div className="card-grid">
                  <div className="data-card data-card--danger">
                    <div className="dc-icon">🚔</div>
                    <div className="dc-title">Police Emergency</div>
                    <div className="dc-body">
                      Call immediately for crimes in progress, accidents, violence,
                      thefts.
                    </div>
                    <a href="tel:100" className="dc-cta dc-cta--emergency">
                      📞 100
                    </a>
                  </div>
                  <div className="data-card data-card--danger">
                    <div className="dc-icon">👩‍🦱</div>
                    <div className="dc-title">Women&apos;s Helpline</div>
                    <div className="dc-body">
                      24×7 helpline for women in distress, harassment, domestic
                      violence.
                    </div>
                    <a href="tel:1091" className="dc-cta dc-cta--emergency">
                      📞 1091
                    </a>
                  </div>
                  <div className="data-card data-card--danger">
                    <div className="dc-icon">👶</div>
                    <div className="dc-title">Child Helpline</div>
                    <div className="dc-body">
                      For missing children, child abuse and child protection
                      emergencies.
                    </div>
                    <a href="tel:1098" className="dc-cta dc-cta--emergency">
                      📞 1098
                    </a>
                  </div>
                  <div className="data-card data-card--blue">
                    <div className="dc-icon">📱</div>
                    <div className="dc-title">Mumbai Police Control</div>
                    <div className="dc-body">
                      Mumbai Police Control Room — for non-emergency queries and
                      reporting.
                    </div>
                    <a href="tel:02222621855" className="dc-cta">
                      📞 022-2262-1855
                    </a>
                  </div>
                  <div className="data-card data-card--blue">
                    <div className="dc-icon">🌐</div>
                    <div className="dc-title">Cyber Crime Cell</div>
                    <div className="dc-body">
                      For online fraud, social media harassment, UPI scams and
                      digital crimes.
                    </div>
                    <a href="tel:1930" className="dc-cta">
                      📞 1930 (Cyber)
                    </a>
                  </div>
                  <div className="data-card data-card--green">
                    <div className="dc-icon">🚨</div>
                    <div className="dc-title">Anti-Corruption</div>
                    <div className="dc-body">
                      Report bribery, corruption and misconduct by government
                      officials.
                    </div>
                    <a href="tel:1800221281" className="dc-cta">
                      📞 1800-22-1281
                    </a>
                  </div>
                </div>
              </div>

              <div className="sec rv d1">
                <div className="sec-kicker">Station Directory</div>
                <h2 className="sec-title">
                  Mumbai Police Stations — <em>Zone Wise</em>
                </h2>
                <div className="dir-table-wrap">
                  <div className="dir-table-head">
                    <span>Police Station</span>
                    <span>Jurisdiction</span>
                    <span>Zone</span>
                    <span className="col-gold">Contact</span>
                  </div>
                  {stations.map((station) => (
                    <div key={station.name} className="dir-table-row">
                      <span className="station-name">{station.name}</span>
                      <span className="station-jurisdiction">
                        {station.jurisdiction}
                      </span>
                      <span className="station-zone">{station.zone}</span>
                      <a href={`tel:${station.phone.replace(/-/g, "")}`} className="station-phone">
                        {station.phone}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="warn-box">
                  <div className="warn-icon">💡</div>
                  <div className="warn-body">
                    <h4>How to File an FIR</h4>
                    <p>
                      Go to the police station that has jurisdiction over the
                      location where the crime occurred. You have the right to
                      file an FIR — the police cannot refuse. If refused, approach
                      the Senior PI or DCP. For online FIR (for certain offences
                      like theft, missing items), visit{" "}
                      <strong>mumbaipolice.gov.in</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Know Your Rights</div>
                <h2 className="sec-title">
                  Citizen Rights When <em>Approaching Police</em>
                </h2>
                <div className="info-box">
                  <h4>⚖️ Your Legal Rights as a Citizen</h4>
                  <ul>
                    <li>
                      You have the right to file an FIR — police cannot refuse to
                      register one if a cognisable offence is reported
                    </li>
                    <li>
                      If FIR is refused, send a written complaint to the SP/DCP or
                      file it with a Judicial Magistrate under Section 156(3) CrPC
                    </li>
                    <li>You are entitled to a free copy of the FIR</li>
                    <li>
                      If arrested, you have the right to legal representation and
                      must be informed of grounds for arrest
                    </li>
                    <li>
                      Police cannot detain you without arrest for more than 24 hours
                      without producing before a magistrate
                    </li>
                    <li>
                      Women should not be interrogated at a police station after 6pm
                      or before 6am except in extraordinary circumstances
                    </li>
                    <li>
                      You can complain against police misconduct at the Police
                      Complaints Authority (PCA) Mumbai: 022-2265-5001
                    </li>
                  </ul>
                </div>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="police-emergency-card">
                <div className="police-emergency-icon">🚔</div>
                <div className="police-emergency-num">100</div>
                <div className="police-emergency-sub">Police Emergency — 24×7</div>
                <a href="tel:100" className="police-emergency-btn">
                  Call 100 Now
                </a>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  All <em>Helplines</em>
                </div>
                <div className="sbw-body sb-helplines">
                  <a href="tel:100" className="sb-helpline-row">
                    <span className="label">🚔 Police</span>
                    <span className="num num--red">100</span>
                  </a>
                  <a href="tel:1091" className="sb-helpline-row">
                    <span className="label">👩 Women</span>
                    <span className="num num--red">1091</span>
                  </a>
                  <a href="tel:1098" className="sb-helpline-row">
                    <span className="label">👶 Child</span>
                    <span className="num num--red">1098</span>
                  </a>
                  <a href="tel:1930" className="sb-helpline-row">
                    <span className="label">💻 Cyber Crime</span>
                    <span className="num">1930</span>
                  </a>
                  <a href="tel:1800221281" className="sb-helpline-row">
                    <span className="label">🚨 Anti-Corruption</span>
                    <span className="num num--sm">1800-22-1281</span>
                  </a>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">
                  Online <em>FIR</em>
                </div>
                <div className="sbw-body">
                  <p className="sb-fir-note">
                    File FIR online for theft, missing items and certain non-violent
                    offences.
                  </p>
                  <a
                    href="https://mumbaipolice.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-cta-dark"
                  >
                    mumbaipolice.gov.in →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
