// import "./style.css";

const testimonials = [
  {
    id: 1,
    delay: "d1",
    text: "I listed my salon on Mumbai96 and got 25 new clients in the first two weeks. Not a single rupee spent on ads. This is unreal for a small business like mine.",
    name: "Pooja Sawant",
    role: "Salon Owner · Borivali West",
    avatar: "PS",
  },
  {
    id: 2,
    delay: "d2",
    text: "As a tourist visiting Mumbai for the first time, Mumbai96 was like having a local friend. I discovered places no travel blog had covered. Absolutely brilliant.",
    name: "Arjun Kapoor",
    role: "Traveller · Visiting from Pune",
    avatar: "AK",
  },
  {
    id: 3,
    delay: "d3",
    text: "The fraud reporting feature helped me warn my entire housing society about a fake plumber who had been operating in our area. Mumbai96 is doing God's work.",
    name: "Meena Rao",
    role: "Resident · Andheri East",
    avatar: "MR",
  },
  {
    id: 4,
    delay: "d1",
    text: "I found my current apartment through a Mumbai96 property listing. No broker, no commission, no drama. Just a genuine listing from a genuine owner.",
    name: "Rahul Desai",
    role: "Software Engineer · Powai",
    avatar: "RD",
  },
  {
    id: 5,
    delay: "d2",
    text: "The community meetup I attended through Mumbai96 led to three new business partnerships. This platform creates real connections, not just digital ones.",
    name: "Nisha Kulkarni",
    role: "Entrepreneur · Dadar",
    avatar: "NK",
  },
  {
    id: 6,
    delay: "d3",
    text: "My catering business went from local word-of-mouth to orders from across Western Mumbai. Mumbai96 made me believe in the power of being local and visible.",
    name: "Suresh Joshi",
    role: "Caterer · Malad",
    avatar: "SJ",
  },
];

export default function TestimonialsSection() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "54vh",
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
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 80% at 5% 50%,rgba(255,107,0,.13) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 90% 20%,rgba(245,166,35,.09) 0%,transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="con"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "52px",
            paddingBottom: "64px",
          }}
        >
          <div className="kicker light rv">What Mumbaikars Say</div>

          <h1
            className="rv d1"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3.5rem,10vw,9rem)",
              lineHeight: 1,
              color: "#fff",
              letterSpacing: ".01em",
              margin: "12px 0 20px",
            }}
          >
            REAL WORDS,
            &nbsp;
            <span style={{ color: "var(--red)" }}>REAL MUMBAI.</span>
          </h1>

          <p
            className="rv d2"
            style={{
              fontSize: "clamp(.9rem,1.6vw,1.1rem)",
              color: "rgba(255,255,255,.55)",
              fontWeight: 300,
              maxWidth: "540px",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            Every review, every quote, every story — straight from the
            Mumbaikars who live and breathe Mumbai96 every day.
          </p>

          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a href="/auth/login" className="btn-o">
              Share Your Story →
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL GRID */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div className="con">
          <div className="rv">
            <div className="kicker">Community Voices</div>
            <h2 className="stitle">
              WHAT THEY'RE
              <br />
              <em>SAYING.</em>
            </h2>
          </div>

          <div className="t-grid">
            {testimonials.map((t) => (
              <div key={t.id} className={`t-card rv ${t.delay}`}>
                <div className="t-quote-mark">"</div>
                <div className="t-stars">★★★★★</div>

                <p className="t-text">"{t.text}"</p>

                <div className="t-author">
                  <div className="t-avatar">{t.avatar}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG QUOTE */}
      <section className="t-feat">
        <div className="con">
          <div className="t-big-quote rv">
            <blockquote>
              "MUMBAI96 IS NOT JUST A WEBSITE.
              <br />
              IT'S <em>MUMBAI'S OWN VOICE.</em>"
            </blockquote>
            <div className="t-big-cite">— Community Member, Bandra West</div>
          </div>
        </div>
      </section>
    </>
  );
}
