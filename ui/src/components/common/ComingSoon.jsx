"use client";
import useReveal from "@/hooks/useReveal";

export default function ComingSoon({
  title = "COMING",
  highlight = "VERY SOON.",
  subtitle = "Something very powerful is being built. Stay tuned - it's worth the wait.",
  ctaText = "Contact Us →",
  ctaLink = "/contact-us",
}) {
  useReveal();
  return (
    <section
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#371b58",
        overflow: "hidden",
        textAlign: "center",
        padding: "80px 20px",
      }}
    >
      {/* Pattern Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(-45deg,rgba(255,255,255,.012) 0,rgba(255,255,255,.012) 1px,transparent 1px,transparent 32px)",
          pointerEvents: "none",
        }}
      />

      {/* Glow Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 80% at 10% 50%,rgba(255,107,0,.15) 0%,transparent 55%), radial-gradient(ellipse 50% 60% at 90% 20%,rgba(245,166,35,.1) 0%,transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div className="con" style={{ position: "relative", zIndex: 2 }}>
        {/* Kicker */}
        <div className="kicker light rv">Mumbai96</div>

        {/* Title */}
        <h1
          className="rv d1"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem,10vw,8rem)",
            lineHeight: 1,
            color: "#fff",
            letterSpacing: ".02em",
            margin: "12px 0 16px",
          }}
        >
          {title}
          <br />
          <span style={{ color: "var(--red)" }}>{highlight}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="rv d2"
          style={{
            fontSize: "clamp(.9rem,1.6vw,1.1rem)",
            color: "rgba(255,255,255,.55)",
            fontWeight: 300,
            maxWidth: "520px",
            margin: "0 auto 32px",
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </p>

        {/* CTA */}
        <div
          className="rv d3"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a href={ctaLink} className="btn-o">
            {ctaText}
          </a>
          <a href={"/"} className="btn-o">
            Home
          </a>
        </div>

        {/* Hidden Optional Badge 
        <div
          className="rv d3"
          style={{
            marginTop: "40px",
            display: "inline-block",
            padding: "10px 18px",
            borderRadius: "100px",
            border: "1px solid rgba(255,255,255,.15)",
            color: "rgba(255,255,255,.6)",
            fontSize: "11px",
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          Launching Soon in Mumbai 🚀
        </div>

        */}

        
      </div>
    </section>
  );
}
