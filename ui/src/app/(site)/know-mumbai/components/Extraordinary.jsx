import ScrollReveal from "@/components/common/ScrollReveal";

const Extraordinary = () => {
  return (
    <ScrollReveal><section className="km-numbers" id="numbers">
      <div className="con">
        <div className="rv">
          <div className="km-kicker gold">By the Numbers</div>
          <h2 className="km-stitle w ge">
            MUMBAI IS
            <br />
            <em>EXTRAORDINARY.</em>
          </h2>
        </div>

        <div className="km-numbers-bento rv d1">
          {/* Featured big stat */}
          <div className="km-nb feat">
            <div className="km-nb-watermark">22M</div>
            <span className="km-nb-icon">🏙️</span>
            <div className="km-nb-n">22 Million+</div>
            <div className="km-nb-label">People Call Mumbai Home</div>

            <div className="km-nb-desc" style={{ marginTop: "8px" }}>
              That's more people than Australia. Mumbai's population is a
              country unto itself — and it continues to grow as dreams pull
              people from every corner of India to this single peninsula.
            </div>

            <div
              style={{
                marginTop: "28px",
                paddingTop: "22px",
                borderTop: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "2.8rem",
                  color: "var(--red)",
                  letterSpacing: ".06em",
                  lineHeight: 1,
                }}
              >
                ₹21 Lakh Crore
              </div>

              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#fff",
                  marginTop: "4px",
                }}
              >
                Mumbai's Annual GDP
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,.35)",
                  marginTop: "4px",
                  fontWeight: 300,
                }}
              >
                ~6% of India's entire national GDP contributed by one city
              </div>
            </div>
          </div>

          {/* Smaller stats */}
          <div className="km-nb sm">
            <div className="km-nb-watermark">7.5M</div>
            <span className="km-nb-icon">🚂</span>
            <div className="km-nb-n">7.5 Million</div>
            <div className="km-nb-label">Daily Train Riders</div>
            <div className="km-nb-desc">
              Mumbai's local trains carry 7.5 million passengers daily — more
              than the entire population of Switzerland. They are the lifeblood
              of the city.
            </div>
          </div>

          <div className="km-nb sm">
            <div className="km-nb-watermark">40%</div>
            <span className="km-nb-icon">💰</span>
            <div className="km-nb-n">40%</div>
            <div className="km-nb-label">Of India's Tax Revenue</div>
            <div className="km-nb-desc">
              Mumbai alone contributes over 40% of India's direct tax
              collection. The financial capital earns for the entire nation.
            </div>
          </div>

          <div className="km-nb sm">
            <div className="km-nb-watermark">1000</div>
            <span className="km-nb-icon">🎬</span>
            <div className="km-nb-n">1,000+</div>
            <div className="km-nb-label">Films Made Each Year</div>
            <div className="km-nb-desc">
              Bollywood, Marathi cinema and an entire film ecosystem that is the
              entertainment engine for a billion people worldwide.
            </div>
          </div>

          <div className="km-nb sm">
            <div className="km-nb-watermark">750</div>
            <span className="km-nb-icon">🌊</span>
            <div className="km-nb-n">750 Sq Km</div>
            <div className="km-nb-label">Surrounding Ocean</div>
            <div className="km-nb-desc">
              Mumbai is a peninsula shaped by the Arabian Sea — the ocean
              defines its geography, its food and its soul.
            </div>
          </div>
        </div>
      </div>
    </section></ScrollReveal>
  );
};

export default Extraordinary;
