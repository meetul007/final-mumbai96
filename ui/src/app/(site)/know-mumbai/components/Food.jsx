import ScrollReveal from "@/components/common/ScrollReveal";

const Food = () => {
  return (
    <ScrollReveal><section className="km-food" id="food">
      <div className="con">
        <div
          className="rv"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "4px",
          }}
        >
          <div>
            <div className="km-kicker">What Mumbai Eats</div>
            <h2 className="km-stitle">
              FOOD IS
              <br />
              <em>MUMBAI'S LOVE LANGUAGE.</em>
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "var(--muted)",
                fontWeight: 300,
                maxWidth: "560px",
                marginTop: "10px",
              }}
            >
              From ₹10 vada pav at a street corner to ₹10,000 tasting menus in
              Bandra. Mumbai's food is as democratic and dramatic as the city
              itself.
            </p>
          </div>

          <a
            href="/know-mumbai"
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "var(--red)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "8px",
            }}
          >
            Explore All Food →
          </a>
        </div>

        <div className="km-food-scroll rv d1">
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#2a1000,#5a2200)",
              }}
            >
              🫓
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Vada Pav</div>
              <div className="km-fc-sub">Mumbai's Soul Food</div>
              <div className="km-fc-where">Every corner · ₹10–20</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#1a2000,#3a4500)",
              }}
            >
              🌯
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Pav Bhaji</div>
              <div className="km-fc-sub">The Street Classic</div>
              <div className="km-fc-where">Juhu Beach & Everywhere</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#001520,#003040)",
              }}
            >
              🐟
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Bombay Duck Fry</div>
              <div className="km-fc-sub">The Koli Legacy</div>
              <div className="km-fc-where">Seafood Restaurants</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#200a40,#371b58)",
              }}
            >
              🧁
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Irani Chai & Bun Maska</div>
              <div className="km-fc-sub">The Afternoon Ritual</div>
              <div className="km-fc-where">Irani Cafés · Dadar, CST</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#1a1500,#3a3000)",
              }}
            >
              🥘
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Misal Pav</div>
              <div className="km-fc-sub">Fiery Maharashtrian</div>
              <div className="km-fc-where">Dadar · Thane · Nashik</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#001a0a,#003820)",
              }}
            >
              🧆
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Bhel Puri</div>
              <div className="km-fc-sub">Chowpatty Staple</div>
              <div className="km-fc-where">Marine Drive · Juhu</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#200010,#480028)",
              }}
            >
              🍱
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Mumbai Biryani</div>
              <div className="km-fc-sub">The Slow Pot Classic</div>
              <div className="km-fc-where">Mohammad Ali Road</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#1a0800,#3d1a00)",
              }}
            >
              🍦
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Kulfi Falooda</div>
              <div className="km-fc-sub">The Summer Escape</div>
              <div className="km-fc-where">Mohammed Ali Road · CST</div>
            </div>
          </div>
          <div className="km-fc">
            <div
              className="km-fc-thumb"
              style={{
                background: "linear-gradient(135deg,#001010,#002828)",
              }}
            >
              🦐
            </div>
            <div className="km-fc-body">
              <div className="km-fc-name">Koliwada Prawns</div>
              <div className="km-fc-sub">Coastal Mumbai Original</div>
              <div className="km-fc-where">Versova · Koliwada</div>
            </div>
          </div>
        </div>
      </div>
    </section></ScrollReveal>
  );
};

export default Food;
