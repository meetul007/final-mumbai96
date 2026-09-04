export default function PropertySection({
  location,
  description,
  properties = [],
}) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="prop-sec" id="property">
      <div className="con">
        <p className="sl">🏠 Property Deals</p>

        <h2 className="st">
          Property Deals in <em>{formattedLocation}</em>
        </h2>

        <p className="sd">{description}</p>

        <div className="prop-grid">
          {properties.map((item, index) => (
            <div className="prop-card" key={index}>
              <img
                src={item.image}
                alt={item.alt}
                className="prop-card-img"
                loading="lazy"
              />

              <span className="prop-badge">{item.type}</span>

              <div className="prop-body">
                <div className="prop-price">
                  {item.price} <span>{item.priceSuffix}</span>
                </div>

                <div className="prop-title">{item.title}</div>

                <div className="prop-tags">
                  {item.tags.map((tag, i) => (
                    <span className="prop-tag" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a href={`/${location}/real-estate`} className="prop-cta">
                  View Listings →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <a
            href={`/${location}/real-estate`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--red)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "700",
              textDecoration: "none",
              padding: "12px 28px",
              borderRadius: "100px",
            }}
          >
            🏠 View All Properties in {formattedLocation} →
          </a>
        </div>
      </div>
    </section>
  );
}
