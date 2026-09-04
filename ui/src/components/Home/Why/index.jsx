const features = [
  {
    icon: "🎯",
    title: "Deeply Local by Design",
    desc: "We go down to the lane level. Every neighbourhood gets its own dedicated space with content that actually matters to the people who live there.",
    color: "var(--red)",
  },
  {
    icon: "💸",
    title: "Always Free Listings",
    desc: "List your business at zero cost — no trial periods, no hidden fees. Mumbai96 believes every Mumbaikar deserves to be seen.",
    color: "var(--gold)",
  },
  {
    icon: "🛡️",
    title: "Fraud Prevention First",
    desc: "We take fraud seriously. Report scams, flag fake listings and protect the Mumbai community — all in one place.",
    color: "#10B981",
  },
  {
    icon: "🌆",
    title: "The Full Mumbai Picture",
    desc: "Not just listings. People, food, travel, nightlife, tourists, community events and emergency help — everything a city needs.",
    color: "#6366F1",
  },
];

export default function Why() {
  return (
    <section className="why">
      <div className="con">
        {/* Header */}
        <div className="rv">
          <div className="section-kicker">Why Mumbai96</div>

          <h2 className="sec-title">
            BUILT FOR
            <br />
            <em>MUMBAIKARS.</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="why-grid rv delay-1">
          {features.map((item, i) => (
            <div key={i} className="wc" style={{ "--wc-clr": item.color }}>
              <span className="wc-icon">{item.icon}</span>

              <div className="wc-title">{item.title}</div>

              <div className="wc-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
