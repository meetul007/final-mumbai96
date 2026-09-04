import Link from "next/link";
// import "./style.css";

const faqData = {
  general: [
    {
      q: "What is Mumbai96?",
      a: "Mumbai96 is Mumbai's most complete city platform. It covers 96 neighbourhoods, 200+ categories of local businesses, travel and tourism guides, community meetups, fraud prevention, safety resources and much more — all in one place, built specifically for Mumbaikars.",
    },
    {
      q: "Is Mumbai96 free to use?",
      a: "Yes — completely free for everyone. Browsing, searching, reading and listing your business are all free. There are no premium plans, no hidden fees and no advertising tricks. Free means free.",
    },
    {
      q: "Who is Mumbai96 for?",
      a: "Mumbai96 is for every Mumbaikar — residents, business owners, tourists, job seekers, community organisers and anyone who calls Mumbai home or visits it.",
    },
    {
      q: "How do I search for something on Mumbai96?",
      a: "Use the search bar on the homepage. You can filter by category — Food, Business, Travel, Help, Nightlife and more — and search within specific areas of Mumbai.",
    },
    {
      q: "How is Mumbai96 different from JustDial or Google Maps?",
      a: "Mumbai96 is exclusively for Mumbai, goes down to the neighbourhood level, is always free, includes community and safety features, and is run by people who genuinely care about this city.",
    },
  ],
  safety: [
    {
      q: "How do I report a fraud?",
      a: "Visit the Report Fraud page and submit anonymously.",
    },
    {
      q: "Is my report anonymous?",
      a: "Yes, your identity is protected.",
    },
    {
      q: "What happens after reporting?",
      a: "We verify and take action, including removal or alerts.",
    },
    {
      q: "Are there helplines?",
      a: "Yes, dedicated women and child safety pages exist.",
    },
  ],
  community: [
    {
      q: "What are Meetups?",
      a: "Local events — networking, cultural and neighbourhood gatherings.",
    },
    {
      q: "How do I join?",
      a: "Browse and register from the Meetups page.",
    },
    {
      q: "Can I host one?",
      a: "Yes — contact us to list your event.",
    },
  ],

  tourists: [
    {
      q: "Is Mumbai96 useful for tourists?",
      a: "Yes — guides, food, safety, travel tips and local insights.",
    },
    {
      q: "Does it cover transport?",
      a: "Yes — trains, autos, cabs, routes.",
    },
    {
      q: "Can I find stays?",
      a: "Yes — via neighbourhood listings.",
    },
  ],
};

const categories = [
  { key: "general", label: "🌆 General" },
  { key: "safety", label: "🛡️ Safety" },
  { key: "community", label: "🤝 Community" },
  { key: "tourists", label: "🗺️ Tourists" },
];

export default async function FAQSection({ searchParams }) {
  const params = await searchParams;
  const category = params?.categories || "general";
  const faqIdx = parseInt(params?.faqIdx) || 0;

  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "#371b58",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(-45deg,rgba(255,255,255,.013) 0,rgba(255,255,255,.013) 1px,transparent 1px,transparent 32px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 80% at 5% 50%,rgba(255,107,0,.13) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 90% 20%,rgba(245,166,35,.09) 0%,transparent 55%)",
          }}
        />

        <div className="con" style={{ position: "relative", zIndex: 2 }}>
          <div className="kicker light rv">Frequently Asked Questions</div>

          <h1
            className="rv d1"
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "clamp(3.5rem,10vw,9rem)",
              color: "#fff",
            }}
          >
            GOT
            &nbsp;
            <span style={{ color: "var(--red)" }}>QUESTIONS?</span>
          </h1>

          <p className="rv d2" style={{ color: "rgba(255,255,255,.55)" }}>
            Everything you need to know about Mumbai96.
          </p>

          <a href="/contact-us" className="btn-o">
            Contact Us →
          </a>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="con">
          <div className="faq-cats">
            {categories.map((cat) => (
              <Link
                key={`categories-${cat.key}`}
                className={`fcat ${category === cat.key ? "on" : ""}`}
                href={`?faqIdx=${faqIdx}&categories=${cat.key}`}
                scroll={false}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="fpanel on">
            {faqData[category].map((item, i) => (
              <div
                key={`categories-faq-${i}`}
                className={`faq-item ${faqIdx === i ? "open" : ""}`}
              >
                <Link
                  className="faq-q"
                  href={`?faqIdx=${i}&categories=${category}`}
                  scroll={false}
                >
                  {item.q}
                  {/* <span className="faq-icon">{faqIdx === i ? "−" : "+"}</span> */}
                </Link>

                {faqIdx === i && (
                  <div className={`faq-a ${faqIdx === i ? "open" : ""}`}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
