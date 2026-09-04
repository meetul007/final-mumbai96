import WardSearch from "@/components/WardSearch";
// import "./style.css";

const MumbaiCorporators = () => {
  return (
    <>
      <div class="page-hero">
        <div class="ph-grid"></div>
        <div class="ph-glow"></div>
        <div class="con">
          <div class="ph-inner">
            <div class="ph-bc">
              <a href="/">Home</a>
              <span>/</span>
              <span>Mumbai Corporators</span>
            </div>
            <div class="ph-kicker">
              Mumbai96 · Civic Directory · Elected Representatives
            </div>
            <h1 class="ph-h1">
              Mumbai Ward
              &nbsp;
              <em>Corporator</em> Directory
              &nbsp;
              2026
            </h1>
            <p class="ph-desc">
              Find the elected corporator for your area. Every ward corporator's
              name, party, contact number and ward area — all in one place.
              Because you deserve to know who represents you.
            </p>
          </div>
        </div>
        <div class="ph-bottom">
          <div class="con">
            <div class="ph-stats">
              <div class="phs">
                <div class="phs-n">227</div>
                <div class="phs-l">Total Wards</div>
              </div>
              <div class="phs">
                <div class="phs-n">24</div>
                <div class="phs-l">Administrative Zones</div>
              </div>
              <div class="phs">
                <div class="phs-n">5 yrs</div>
                <div class="phs-l">Corporator Term</div>
              </div>
              <div class="phs">
                <div class="phs-n">Free</div>
                <div class="phs-l">To Contact</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WardSearch />

      <div style={{ padding: "0 0 60px", background: "var(--cream)" }}>
        <div className="con">
          {/* WHAT IS A CORPORATOR */}
          <div style={{ padding: "40px 0" }} className="rv">
            <div className="sec-kicker">Before You Contact</div>

            <h2 className="sec-title">
              What Does a <em>Corporator</em> Do?
            </h2>

            <div className="info-box">
              <h4>🏛️ Roles & Responsibilities of Your Ward Corporator</h4>
              <ul>
                <li>
                  Elected representative responsible for civic infrastructure in
                  their ward — roads, drains, street lights, parks
                </li>
                <li>
                  Attends BMC General Body meetings and votes on city budget and
                  policy decisions
                </li>
                <li>
                  Receives and escalates resident complaints to the BMC
                  administration and relevant departments
                </li>
                <li>
                  Oversees ward-level development funds (typically ₹70–₹1 Crore
                  per year per ward)
                </li>
                <li>
                  Can help with approvals, certificates and BMC permissions in
                  your area
                </li>
                <li>
                  Conducts ward-level Praja Ashawad (public interaction)
                  sessions — attend and raise your issues directly
                </li>
              </ul>
            </div>
          </div>

          {/* WESTERN SUBURBS */}
          <div className="zone-section rv" id="zone-west">
            <div className="zone-header">
              <div className="zone-badge">🚂</div>
              <div className="zone-info">
                <h3>Western Suburbs — H to R Ward</h3>
                <p>
                  Andheri, Borivali, Kandivali, Malad, Goregaon, Bandra, Vile
                  Parle, Jogeshwari
                </p>
              </div>
            </div>

            <div className="corp-grid">
              {[
                {
                  ward: "H/E",
                  name: "Smt. Rekha Patil",
                  party: "Shiv Sena (Shinde) · Elected 2022",
                  area: "Andheri West — Versova, Gilbert Hill, DN Nagar",
                  phone: "9820000001",
                  wa: "919820000001",
                  resolved: "12 complaints resolved via Mumbai96",
                },
                {
                  ward: "H/W",
                  name: "Suresh Bhagat",
                  party: "BJP · Elected 2022",
                  area: "Andheri West — Lokhandwala, 4 Bungalows, JP Road",
                  phone: "9820000002",
                  wa: "919820000002",
                },
                {
                  ward: "K/W",
                  name: "Priya Sharma",
                  party: "Shiv Sena (UBT) · Elected 2022",
                  area: "Borivali West — IC Colony, Mandpeshwar, Poisar",
                  phone: "9820000003",
                  wa: "919820000003",
                  resolved: "8 complaints resolved via Mumbai96",
                },
                {
                  ward: "P/N",
                  name: "Ramesh Joshi",
                  party: "BJP · Elected 2022",
                  area: "Malad West — Malvani, Marve, Maroshi",
                  phone: "9820000004",
                  wa: "919820000004",
                },
                {
                  ward: "P/S",
                  name: "Kavita Rane",
                  party: "NCP · Elected 2022",
                  area: "Goregaon West — Film City Road, Aarey Colony",
                  phone: "9820000005",
                  wa: "919820000005",
                },
                {
                  ward: "H/E",
                  name: "Amir Khan",
                  party: "AIMIM · Elected 2022",
                  area: "Andheri East — Jogeshwari, Bharat Nagar, Gundavali",
                  phone: "9820000006",
                  wa: "919820000006",
                },
              ].map((c, i) => (
                <div key={i} className="corp-card">
                  <div className="corp-ward">
                    Ward <span>{c.ward}</span>
                  </div>
                  <div className="corp-name">{c.name}</div>
                  <div className="corp-party">{c.party}</div>
                  <div className="corp-area">{c.area}</div>

                  <div className="corp-actions">
                    <a href={`tel:${c.phone}`} className="corp-call">
                      📞 Call
                    </a>
                    <a href={`https://wa.me/${c.wa}`} className="corp-wa">
                      💬 WA
                    </a>
                  </div>

                  {c.resolved && (
                    <div className="corp-resolved">{c.resolved}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SOUTH MUMBAI */}
          <div className="zone-section rv" id="zone-south">
            <div className="zone-header">
              <div className="zone-badge">🏛️</div>
              <div className="zone-info">
                <h3>South Mumbai — A to G Ward</h3>
                <p>
                  Colaba, Fort, Churchgate, Byculla, Matunga, Worli, Dadar,
                  Mahim
                </p>
              </div>
            </div>

            <div className="corp-grid">
              {[
                {
                  ward: "A",
                  name: "Milind Desai",
                  party: "BJP · Elected 2022",
                  area: "Colaba, Cuffe Parade, Navy Nagar",
                  phone: "9820000010",
                  wa: "919820000010",
                },
                {
                  ward: "D",
                  name: "Meena Shetty",
                  party: "Shiv Sena (Shinde) · Elected 2022",
                  area: "Malabar Hill, Walkeshwar, Breach Candy",
                  phone: "9820000011",
                  wa: "919820000011",
                },
                {
                  ward: "F/S",
                  name: "Rakesh Kolekar",
                  party: "Shiv Sena (UBT) · Elected 2022",
                  area: "Dadar West, Shivaji Park, Prabhadevi",
                  phone: "9820000012",
                  wa: "919820000012",
                  resolved: "5 complaints resolved via Mumbai96",
                },
                {
                  ward: "G/N",
                  name: "Anita Pawar",
                  party: "NCP · Elected 2022",
                  area: "Bandra West, Khar, Santacruz West",
                  phone: "9820000013",
                  wa: "919820000013",
                },
                {
                  ward: "E",
                  name: "Ashok Sawant",
                  party: "BJP · Elected 2022",
                  area: "Byculla, Mazgaon, Nagpada",
                  phone: "9820000014",
                  wa: "919820000014",
                },
                {
                  ward: "G/S",
                  name: "Vijay Naik",
                  party: "Shiv Sena (Shinde) · Elected 2022",
                  area: "Bandra East, Dharavi, Sion",
                  phone: "9820000015",
                  wa: "919820000015",
                },
              ].map((c, i) => (
                <div key={i} className="corp-card">
                  <div className="corp-ward">
                    Ward <span>{c.ward}</span>
                  </div>
                  <div className="corp-name">{c.name}</div>
                  <div className="corp-party">{c.party}</div>
                  <div className="corp-area">{c.area}</div>

                  <div className="corp-actions">
                    <a href={`tel:${c.phone}`} className="corp-call">
                      📞 Call
                    </a>
                    <a href={`https://wa.me/${c.wa}`} className="corp-wa">
                      💬 WA
                    </a>
                  </div>

                  {c.resolved && (
                    <div className="corp-resolved">{c.resolved}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PRO TIPS */}
          <div style={{ padding: "32px 0" }} className="rv">
            <div className="sec-kicker">Pro Tips</div>

            <h2 className="sec-title">
              How to <em>Effectively</em> Reach Your Corporator
            </h2>

            <div className="info-box">
              <h4>📋 Tips from Mumbaikars Who Got Results</h4>
              <ul>
                <li>
                  Call during office hours (10am–5pm weekdays). Evening calls
                  often go unanswered.
                </li>
                <li>
                  WhatsApp with a photo of the issue works better than a plain
                  call
                </li>
                <li>
                  Mention your complaint number from BMC portal when calling
                </li>
                <li>Attend weekly jan sabhas for fastest results</li>
                <li>Be specific: street name, landmark, exact problem</li>
                <li>
                  If no response, escalate via{" "}
                  <a
                    href="/bmc-complaint"
                    style={{ color: "var(--red)", fontWeight: 700 }}
                  >
                    BMC portal
                  </a>{" "}
                  or{" "}
                  <a
                    href="/mumbai-voice"
                    style={{ color: "var(--red)", fontWeight: 700 }}
                  >
                    Mumbai Voice
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* NOTE */}
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "20px 22px",
              display: "flex",
              gap: "14px",
              marginTop: "8px",
            }}
            className="rv"
          >
            <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>ℹ️</div>

            <div>
              <h4
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  marginBottom: "5px",
                }}
              >
                Data Accuracy Notice
              </h4>

              <p
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                Corporator details are representative samples. For official list
                visit <strong>mcgm.gov.in</strong> or call 1916.{" "}
                <a
                  href="/contact"
                  style={{ color: "var(--red)", fontWeight: 700 }}
                >
                  Share updates with us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MumbaiCorporators;
