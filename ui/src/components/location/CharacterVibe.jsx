export default function CharacterVibe({ location, items = [], description }) {
  const formattedLocation = location?.replace(/-/g, " ");

  if (!items || items.length === 0) return null;

  return (
    <section className="guide-sec" id="character-vibe">
      <div className="con">
        <p className="sl">Character &amp; Vibe</p>
        <h2 className="st">
          What Makes <em>{formattedLocation}</em> Tick
        </h2>
        <p className="sd">
          An honest snapshot — the energy, the people, the pace. The kind of
          thing no other directory tells you.
        </p>

        {description && (
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "#4b5563",
              marginTop: "1.5rem",
            }}
          >
            {description}
          </p>
        )}

        <div className="vibe-tags">
          {items.map((item, i) => (
            <span className="vibe-tag" key={i}>
              {item.keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
