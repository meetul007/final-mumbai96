export default function UpcomingProjects({ location, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ");

  if (!items || items.length === 0) return null;

  const statusClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("ongoing") || s.includes("under construction"))
      return "ongoing";
    if (s.includes("upcoming") || s.includes("approved"))
      return "upcoming";
    if (s.includes("planning") || s.includes("proposed"))
      return "planned";
    if (s.includes("completed"))
      return "upcoming";
    return "planned";
  };

  return (
    <section className="guide-sec" id="upcoming-projects">
      <div className="con">
        <p className="sl">🚧 What&apos;s Coming Next</p>
        <h2 className="st">
          Upcoming Projects in <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          Infrastructure, real estate and redevelopment projects that will
          reshape {formattedLocation} over the next 3–5 years.
        </p>

        <div className="dev-grid">
          {items.map((item, i) => (
            <div className="dev-card" key={i}>
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="dev-card-ph">🏗️</div>
              )}
              <div className="dev-body">
                {item.status && (
                  <span className={`dev-status ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                )}
                <h5>{item.name}</h5>
                {item.developer && (
                  <p className="dev-developer">{item.developer}</p>
                )}
                {item.description && <p className="dev-desc">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
