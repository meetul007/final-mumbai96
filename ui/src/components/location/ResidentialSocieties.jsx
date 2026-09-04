export default function ResidentialSocieties({ location, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ");

  if (!items || items.length === 0) return null;

  return (
    <section className="guide-sec" id="residential-societies">
      <div className="con">
        <p className="sl">🏘️ Housing Societies</p>
        <h2 className="st">
          Residential Societies in <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          Prominent housing societies and residential complexes that define
          community life in {formattedLocation}.
        </p>

        <div className="soc-grid">
          {items.map((item, i) => (
            <div className="soc-item" key={i}>
              {item.type && <span className="soc-type">{item.type}</span>}
              <h4>{item.name}</h4>
              {item.description && <p>{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
