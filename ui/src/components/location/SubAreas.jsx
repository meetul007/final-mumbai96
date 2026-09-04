export default function SubAreas({ items = [], location }) {
  if (!items || items.length === 0) return null;

  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="guide-sec" id="subareas">
      <div className="con">
        <p className="sl">📍 Localities & Sub-areas</p>
        <h2 className="st">
          Localities in <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          Key neighbourhoods and districts that make up {formattedLocation}.
        </p>

        <div className="subarea-grid">
          {items.map((area, i) => (
            <div className="subarea-card" key={i}>
              <div className="subarea-tag">{area.tag || "Locality"}</div>
              <h3 className="subarea-name">{area.name}</h3>
              {area.description && (
                <p className="subarea-desc">{area.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
