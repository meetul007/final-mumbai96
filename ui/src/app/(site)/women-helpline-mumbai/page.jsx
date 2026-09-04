const WomenHelpLine = () => {
  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          background: "#1a0a2e",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 10% 50%,rgba(236,72,153,.18) 0%,transparent 55%),radial-gradient(ellipse 50% 60% at 90% 20%,rgba(245,166,35,.1) 0%,transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(-45deg,rgba(255,255,255,.012) 0,rgba(255,255,255,.012) 1px,transparent 1px,transparent 28px)",
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
          <div
            className="rv"
            style={{
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#f472b6",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "22px",
                height: "2px",
                background: "#f472b6",
                flexShrink: 0,
              }}
            ></span>
            Women Safety · Mumbai96
          </div>

          <h1
            className="rv d1"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3.2rem,9vw,8rem)",
              lineHeight: 1,
              color: "#fff",
              letterSpacing: ".01em",
              margin: "12px 0 20px",
            }}
          >
            MUMBAI STANDS
            &nbsp;
            <span style={{ color: "#f472b6" }}>WITH EVERY WOMAN.</span>
          </h1>

          <p
            className="rv d2"
            style={{
              fontSize: "clamp(.9rem,1.6vw,1.1rem)",
              color: "rgba(255,255,255,.55)",
              fontWeight: 300,
              maxWidth: "560px",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            Every woman in Mumbai deserves to feel completely safe — on the
            streets, online and at home. Here are the resources, helplines and
            rights you need to know.
          </p>

          <div
            className="rv d3"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a
              href="tel:1091"
              style={{
                background: "#EC4899",
                color: "#fff",
                padding: "15px 32px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: ".07em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📞 WOMEN HELPLINE: 1091
            </a>

            <a
              href="tel:100"
              style={{
                border: "1.5px solid rgba(255,255,255,.2)",
                color: "#fff",
                padding: "15px 32px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: ".07em",
                textTransform: "uppercase",
              }}
            >
              🚔 Police: 100
            </a>
          </div>
        </div>
      </section>

      {/* HELPLINES */}
      <section style={{ padding: "80px 0", background: "#1a0a2e" }}>
        <div className="con">
          <div className="rv">
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#f472b6",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "22px",
                  height: "2px",
                  background: "#f472b6",
                  flexShrink: 0,
                }}
              ></span>
              Emergency Numbers
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2rem,5vw,4rem)",
                letterSpacing: ".02em",
                color: "#fff",
                lineHeight: 1.05,
                marginBottom: "4px",
              }}
            >
              HELPLINES &<br />
              <span style={{ color: "#f472b6" }}>EMERGENCY CONTACTS.</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "16px",
              marginTop: "48px",
            }}
          >
            {[
              ["📞", "1091", "Women Helpline", "24x7 · Free · All India"],
              ["🚔", "100", "Mumbai Police", "Emergency · 24x7"],
              ["🏛️", "181", "Abhayam Helpline", "Maharashtra Women Helpline"],
              ["🏥", "112", "National Emergency", "Police · Fire · Ambulance"],
              [
                "💻",
                "1930",
                "Cyber Crime Helpline",
                "Online Harassment & Abuse",
              ],
              [
                "⚖️",
                "022-2307-3999",
                "iCall — Mental Support",
                "Mon–Sat 8am–10pm",
              ],
            ].map((item, i) => (
              <div
                key={i}
                className={`rv d${(i % 3) + 1}`}
                style={{
                  background: "#2a1245",
                  borderRadius: "18px",
                  padding: "28px 24px",
                  textAlign: "center",
                  transition: "transform .3s",
                }}
                // onMouseEnter={(e) =>
                //   (e.currentTarget.style.transform = "translateY(-4px)")
                // }
                // onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
              >
                <div style={{ fontSize: "2.8rem", marginBottom: "14px" }}>
                  {item[0]}
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: item[1].length > 6 ? "1.6rem" : "2.8rem",
                    letterSpacing: ".08em",
                    color: "#f472b6",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {item[1]}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "4px",
                  }}
                >
                  {item[2]}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,.4)",
                    fontWeight: 300,
                  }}
                >
                  {item[3]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHTS */}
      <section style={{ padding: "80px 0", background: "var(--light)" }}>
        <div className="con">
          <div className="rv">
            <div className="kicker">Know Your Rights</div>
            <h2 className="stitle">
              YOUR RIGHTS AS A<br />
              <em>WOMAN IN INDIA.</em>
            </h2>
          </div>

          <div
            className="rv d1"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "var(--sh)",
                borderTop: "3px solid #EC4899",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "14px" }}>🛡️</div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                Right to Zero FIR
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                You can file an FIR at ANY police station in India regardless of
                where the crime occurred. The police cannot refuse to register
                your complaint.
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "var(--sh)",
                borderTop: "3px solid var(--red)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "14px" }}>🔒</div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                Right to Privacy in Complaints
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                Statements from survivors of sexual assault must be recorded at
                home by a female officer. Your identity cannot be revealed by
                the media.
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "var(--sh)",
                borderTop: "3px solid var(--gold)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "14px" }}>🌙</div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                Right Against Arrest After Sunset
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                A woman cannot be arrested after sunset or before sunrise except
                in extraordinary circumstances with a female officer and
                magistrate approval.
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "var(--sh)",
                borderTop: "3px solid #10B981",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "14px" }}>💼</div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  marginBottom: "8px",
                }}
              >
                Workplace Harassment Rights (POSH)
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                Every workplace with 10+ employees must have an Internal
                Complaints Committee. Report to icc@yourcompany or the District
                Officer if no ICC exists.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WomenHelpLine;
