import Link from "next/link";

export default function Community() {
  const cards = [
    {
      icon: "🚨",
      title: "FRAUD & SCAM ALERTS",
      desc: "Report fraud, fake businesses and scams. Mumbai96 protects Mumbaikars with zero tolerance. Report anonymously, stay safe.",
      link: "/report-fraud-scam",
      cta: "Report Now →",
      className: "fraud",
    },
    {
      icon: "🛡️",
      title: "WOMEN & KIDS SAFETY",
      desc: "Helpline numbers, safety tips and emergency resources. Because every Mumbaikar deserves to feel completely safe.",
      link: "/women-helpline-mumbai",
      cta: "Safety Resources →",
      className: "safety",
    },
    {
      icon: "🤝",
      title: "COMMUNITY BONDS",
      desc: "Connect with light minded Mumbaikar's. Meet people, attend local meetups, and build real bonds in a city of millions.",
      link: "/meetups",
      cta: "Join Meetups →",
      className: "bonds",
    },
  ];

  return (
    <section className="community">
      <div className="con">
        {/* Header */}
        <div className="rv">
          <div className="section-kicker gold">Beyond Usual Business</div>

          <h2 className="sec-title light gold-em">
            MUMBAI CARES.
            <br />
            <em>WE PROVE IT.</em>
          </h2>

          <p className="sec-desc light">
            Mumbai96 is Mumbaikar's very own Platform — to share the safety, bonds and stories of every single Mumbaikar.
          </p>
        </div>

        {/* Cards */}
        <div className="comm-grid rv delay-1">
          {cards.map((c, i) => (
            <div key={i} className={`cc ${c.className}`}>
              <span className="cc-icon">{c.icon}</span>

              <div className="cc-title">{c.title}</div>

              <div className="cc-desc">{c.desc}</div>

              <Link href={c.link} className="cc-link">
                {c.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
