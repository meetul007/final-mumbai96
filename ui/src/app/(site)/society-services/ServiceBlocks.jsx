export function ServiceCard({
  featured,
  icon,
  badges,
  title,
  description,
  scopeItems,
  ctas,
}) {
  return (
    <div className={`svc-card${featured ? " featured" : ""}`}>
      <div className="sc-top">
        <span className="sc-icon">{icon}</span>
        {badges ? <div className="sc-badges">{badges}</div> : null}
      </div>
      <div className="sc-title">{title}</div>
      <div className="sc-desc">{description}</div>
      <div className="sc-scope">
        <div className="sc-scope-label">Includes</div>
        <ul>
          {scopeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="sc-cta">{ctas}</div>
    </div>
  );
}

export function CategorySection({ icon, title, subtitle, badge, children }) {
  return (
    <div className="cat-section rv">
      <div className="cat-label">
        <span className="cat-label-icon">{icon}</span>
        <div className="cat-label-text">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span className="cat-label-badge">{badge}</span>
      </div>
      <div className="services-grid">{children}</div>
    </div>
  );
}
