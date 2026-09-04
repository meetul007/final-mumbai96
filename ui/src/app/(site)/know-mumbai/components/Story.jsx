import ScrollReveal from "@/components/common/ScrollReveal";

const Story = () => {
  return (
    <ScrollReveal><section className="km-story" id="story">
      <div className="con">
        <div className="km-story-grid">
          <div className="km-story-text rv">
            <div className="km-kicker">The Mumbai Story</div>

            <h2>
              FROM SEVEN
              <br />
              ISLANDS TO
              <br />
              <em>ONE LEGENDARY CITY.</em>
            </h2>

            <p>
              Mumbai was not always Mumbai. What is now the most populous city
              in India was once a cluster of <strong>seven islands</strong> —
              Bombay, Colaba, Old Woman's Island, Mahim, Mazgaon, Parel and
              Worli — inhabited by the Koli fishing community for thousands of
              years.
            </p>

            <p>
              The Portuguese arrived in 1534, and the British East India Company
              followed in 1661 when the islands were gifted to King Charles II
              as part of a royal dowry. The British saw the natural harbour's
              potential and began the monumental land reclamation that slowly
              merged the islands into the peninsula we know today.
            </p>

            <div className="km-story-pullquote">
              "MUMBAI IS NOT A CITY.
              <br />
              IT'S AN <em>EMOTION.</em>"
            </div>

            <p>
              By the 20th century, Bombay had become the{" "}
              <strong>commercial capital of India</strong> — the gateway for
              cotton trade, home to the first Indian stock exchange, birthplace
              of the Indian film industry and the beating heart of the nation's
              financial system.
            </p>

            <p>
              Renamed Mumbai in 1995, the city wears its Marathi heritage
              proudly while still being the home of every language, faith,
              cuisine and dream that India contains.{" "}
              <strong>This is the city.</strong>
            </p>
          </div>

          <div className="rv d2">
            <div className="km-kicker">Mumbai at a Glance</div>

            <div className="km-fact-grid" style={{ marginTop: "20px" }}>
              <div className="km-fact-card" data-emoji="🏙️">
                <div className="km-fact-n">1534</div>
                <div className="km-fact-l">
                  Year Portuguese first documented the islands
                </div>
              </div>

              <div className="km-fact-card" data-emoji="🏛️">
                <div className="km-fact-n">1661</div>
                <div className="km-fact-l">
                  Islands transferred to British East India Company
                </div>
              </div>

              <div className="km-fact-card" data-emoji="🎬">
                <div className="km-fact-n">1913</div>
                <div className="km-fact-l">
                  First Indian film, Raja Harishchandra, made in Bombay
                </div>
              </div>

              <div className="km-fact-card" data-emoji="📈">
                <div className="km-fact-n">1875</div>
                <div className="km-fact-l">
                  BSE — Asia's oldest stock exchange — founded
                </div>
              </div>

              <div className="km-fact-card" data-emoji="🌊">
                <div className="km-fact-n">7</div>
                <div className="km-fact-l">
                  Original islands now merged into one peninsula
                </div>
              </div>

              <div className="km-fact-card" data-emoji="🌍">
                <div className="km-fact-n">#7</div>
                <div className="km-fact-l">
                  Mumbai ranked 7th among world's most populous cities
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                background: "var(--dark)",
                borderRadius: "16px",
                padding: "24px",
                borderLeft: "4px solid var(--gold)",
              }}
            >
              <div className="km-kicker gold" style={{ marginBottom: "12px" }}>
                Did You Know?
              </div>

              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,.6)",
                  lineHeight: "1.75",
                  fontWeight: 300,
                }}
              >
                Mumbai's Dharavi, often called Asia's largest slum, is also one
                of its most productive economies — generating an estimated{" "}
                <strong style={{ color: "var(--gold)" }}>₹1,000 crore</strong>{" "}
                annually through leather, textiles and recycling industries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section></ScrollReveal>
  );
};

export default Story;
