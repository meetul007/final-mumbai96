export default function AboutSection({
  location,
  title,
  description1,
  description2,
  commute,
  tag,
  image,
  stats = [],
}) {
  return (
    <section className="about">
      <div className="con">
        <div className="ag">
          {/* LEFT CONTENT */}
          <div>
            <p className="sl">About the Area</p>

            <h2>{title}</h2>

            <p dangerouslySetInnerHTML={{ __html: description1 }}></p>

            {stats.length > 0 && (
              <div className="civic-wrap" style={{ marginTop: "20px" }}>
                {stats.map((stat, i) => (
                  <div className="civic-chip" key={i}>
                    <span className="cv-val">{stat.value}</span>
                    <span className="cv-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="ai">
            {image ? (
              <img
                src={image}
                alt={`${location} Mumbai neighbourhood`}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div className="ai-placeholder">
                <span className="ai-placeholder-emoji">📍</span>
                <span className="ai-placeholder-text">{location}</span>
              </div>
            )}
            <div className="aic">📍 {location} — Mumbai</div>
          </div>
        </div>
      </div>
    </section>
  );
}
