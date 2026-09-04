import ScrollReveal from "@/components/common/ScrollReveal";

const Spirit = () => {
  return (
    <ScrollReveal><section className="km-spirit" id="spirit">
      <div className="con">
        <div className="rv">
          <div className="km-kicker">What Makes Mumbai, Mumbai</div>

          <h2 className="km-stitle">
            THE SPIRIT
            <br />
            <em>OF THIS CITY.</em>
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              fontWeight: 300,
              maxWidth: "560px",
              marginTop: "12px",
            }}
          >
            You can describe Mumbai in statistics. But what really makes it
            extraordinary is something you can only feel.
          </p>
        </div>

        <div className="km-spirit-row rv d1">
          <div className="km-sp-card">
            <div className="km-sp-head">
              <div
                className="km-sp-accent"
                style={{
                  background: "linear-gradient(90deg,var(--red),transparent)",
                }}
              ></div>
              <div className="km-sp-icon">💪</div>
              <div className="km-sp-title">THE MUMBAI SPIRIT</div>
              <div className="km-sp-desc">
                No matter what hits this city — floods, tragedies, lockdowns —
                Mumbai wakes up the next day and gets back to work. Not because
                it has to. Because that's simply who Mumbaikars are.
              </div>
            </div>

            <div className="km-sp-body">
              <div className="km-sp-tags">
                <span className="km-sp-tag">Resilience</span>
                <span className="km-sp-tag">Hustle</span>
                <span className="km-sp-tag">Grit</span>
                <span className="km-sp-tag">Comeback</span>
              </div>
            </div>
          </div>

          <div className="km-sp-card">
            <div className="km-sp-head">
              <div
                className="km-sp-accent"
                style={{
                  background: "linear-gradient(90deg,var(--gold),transparent)",
                }}
              ></div>
              <div className="km-sp-icon">🌍</div>
              <div className="km-sp-title">THE COSMOPOLITAN SOUL</div>
              <div className="km-sp-desc">
                In one Mumbai local train, you'll find a Gujarati businessman, a
                UP migrant worker, a South Indian IT professional and a Marathi
                koli fisherman — all sharing the same pole. That is Mumbai's
                greatest gift to India.
              </div>
            </div>

            <div className="km-sp-body">
              <div className="km-sp-tags">
                <span className="km-sp-tag">All Faiths</span>
                <span className="km-sp-tag">All Languages</span>
                <span className="km-sp-tag">All India</span>
              </div>
            </div>
          </div>

          <div className="km-sp-card">
            <div className="km-sp-head">
              <div
                className="km-sp-accent"
                style={{
                  background: "linear-gradient(90deg,#10B981,transparent)",
                }}
              ></div>
              <div className="km-sp-icon">🌙</div>
              <div className="km-sp-title">THE CITY THAT NEVER SLEEPS</div>
              <div className="km-sp-desc">
                At 2am, Mumbai's dhabas are still serving, the vada pav stalls
                are lit, the local trains are running and someone, somewhere, is
                chasing a dream. Mumbai doesn't have an off switch.
              </div>
            </div>

            <div className="km-sp-body">
              <div className="km-sp-tags">
                <span className="km-sp-tag">24/7 City</span>
                <span className="km-sp-tag">Dreams</span>
                <span className="km-sp-tag">Ambition</span>
                <span className="km-sp-tag">Nightlife</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></ScrollReveal>
  );
};

export default Spirit;
