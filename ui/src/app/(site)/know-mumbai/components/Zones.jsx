"use client";
import ScrollReveal from "@/components/common/ScrollReveal";

const Zones = () => {
  return (
    <ScrollReveal><section className="km-zones" id="zones">
      <div className="con">
        <div className="rv">
          <div className="km-kicker gold">Navigate the City</div>
          <h2 className="km-stitle w ge">
            FOUR ZONES.
            <br />
            <em>ONE CITY.</em>
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,.45)",
              fontWeight: 300,
              maxWidth: "560px",
              marginTop: "12px",
            }}
          >
            Mumbai stretches across four distinct zones — each with its own
            character, food, people and pace. Knowing them is knowing Mumbai.
          </p>
        </div>

        <div className="km-zones-grid rv d1">
          <div
            className="km-zone-tile km-zt-north"
            onClick={() => (location.href = "/north-mumbai")}
          >
            <div className="km-zone-num">01</div>
            <div>
              <span className="km-zone-icon">🌐</span>
              <div className="km-zone-name">NORTH MUMBAI</div>
              <div className="km-zone-sub">
                Virar to Mira Road · Where Mumbai breathes
              </div>
              <div className="km-zone-count">12 Neighbourhoods →</div>
            </div>
          </div>

          <div
            className="km-zone-tile km-zt-western"
            onClick={() => (location.href = "/western-mumbai")}
          >
            <div className="km-zone-num">02</div>
            <div>
              <span className="km-zone-icon">🌊</span>
              <div className="km-zone-name">WESTERN MUMBAI</div>
              <div className="km-zone-sub">
                Dahisar to Bandra · The lifestyle spine
              </div>
              <div className="km-zone-count">27 Neighbourhoods →</div>
            </div>
          </div>

          <div
            className="km-zone-tile km-zt-central"
            onClick={() => (location.href = "/central-mumbai")}
          >
            <div className="km-zone-num">03</div>
            <div>
              <span className="km-zone-icon">🏙️</span>
              <div className="km-zone-name">CENTRAL MUMBAI</div>
              <div className="km-zone-sub">
                Mulund to Wadala · The industrial heartland
              </div>
              <div className="km-zone-count">12 Neighbourhoods →</div>
            </div>
          </div>

          <div
            className="km-zone-tile km-zt-south"
            onClick={() => (location.href = "/south-mumbai")}
          >
            <div className="km-zone-num">04</div>
            <div>
              <span className="km-zone-icon">⚓</span>
              <div className="km-zone-name">SOUTH MUMBAI</div>
              <div className="km-zone-sub">
                Dadar to Colaba · Heritage, power and the sea
              </div>
              <div className="km-zone-count">14 Neighbourhoods →</div>
            </div>
          </div>
        </div>
      </div>
    </section></ScrollReveal>
  );
};

export default Zones;
