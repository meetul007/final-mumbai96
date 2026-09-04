import Link from "next/link";

const touristItems = [
  {
    href: "/must-visit-places",
    icon: "🏛️",
    title: "Gateway of India",
    sub: "Iconic · South Mumbai",
    bg: "linear-gradient(135deg,#1a0f05,#3d2410)",
  },
  {
    href: "/mumbai-night-life",
    icon: "🌃",
    title: "Mumbai Nightlife",
    sub: "After Dark · City Wide",
    bg: "linear-gradient(135deg,#1a0835,#2e1258)",
  },
  {
    href: "/must-visit-places",
    icon: "🏖️",
    title: "Juhu Beach",
    sub: "Beach Life · Western",
    bg: "linear-gradient(135deg,#001a0a,#03401a)",
  },
  {
    href: "/mumbai-travel",
    icon: "🚆",
    title: "Local Train Life",
    sub: "The Lifeline · All Mumbai",
    bg: "linear-gradient(135deg,#200a40,#371b58)",
  },
  {
    href: "/must-visit-places",
    icon: "🐟",
    title: "Dharavi",
    sub: "Raw Mumbai · Central",
    bg: "linear-gradient(135deg,#001518,#003d42)",
  },
  {
    href: "/must-visit-places",
    icon: "🏙️",
    title: "Marine Drive",
    sub: "Queen's Necklace · South",
    bg: "linear-gradient(135deg,#180010,#3a0025)",
  },
  {
    href: "/know-mumbai",
    icon: "🌯",
    title: "Street Food Trail",
    sub: "Vada Pav · Everywhere",
    bg: "linear-gradient(135deg,#0f0d00,#2e2b00)",
  },
  {
    href: "/must-visit-places",
    icon: "🌿",
    title: "Sanjay Gandhi Park",
    sub: "Nature · Borivali",
    bg: "linear-gradient(135deg,#0a1000,#1e2c00)",
  },
];

export default function Tourist() {
  return (
    <section className="tourist">
      <div className="con">
        {/* Header */}
        <div className="ts-row rv">
          <div>
            <div className="section-kicker">Mumbai for Tourists</div>

            <h2 className="sec-title">
              VISITING
              <br />
              <em>MUMBAI?</em>
            </h2>

            <p className="sec-desc">
              Your definitive insider guide to experiencing the real Mumbai.
            </p>
          </div>

          <Link
            href="/foreign-tourists"
            className="btn-fire"
            style={{ marginBottom: "6px" }}
          >
            Complete Tourist Guide →
          </Link>
        </div>

        {/* Scroll cards */}
        <div className="tourist-scroll rv delay-1">
          {touristItems.map((item, i) => (
            <Link key={i} href={item.href} className="tc">
              <div className="tc-thumb" style={{ background: item.bg }}>
                {item.icon}
              </div>

              <div className="tc-body">
                <div className="tc-name">{item.title}</div>
                <div className="tc-sub">{item.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
