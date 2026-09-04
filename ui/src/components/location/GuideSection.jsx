import { getIcon } from "@/lib/iconMapper";

export default function GuideSection({
  id,
  label,
  title,
  location,
  description,
  items = [],
  variant = "card", // 👈 NEW
  tags = [], // 👈 for food
  tips = null, // 👈 for nightlife
}) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="guide-sec" id={id}>
      <div className="con">
        <p className="sl">{label}</p>

        <h2 className="st">
          {title} in <em>{formattedLocation}</em>
        </h2>

        <p className="sd">{description}</p>

        {/* TAGS (only for food) */}
        {tags.length > 0 && (
          <div className="food-tags">
            {tags.map((tag, i) => (
              <span className="food-tag" key={i}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CARD VIEW (Places) */}
        {variant === "card" && (
          <div className="guide-grid">
            {items.map((item, index) => (
              <div className="guide-card" key={index}>
                <div className="guide-card-ph">{getIcon(item)}</div>

                <div className="guide-card-body">
                  <div className="guide-card-tag">{item.tag}</div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIST VIEW (Food / Nightlife) */}
        {variant === "list" && (
          <div className="list-grid">
            {items.map((item, index) => (
              <div className="list-item" key={index}>
                <span className="li-icon">{getIcon(item)}</span>
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TIP BOX (Nightlife only) */}
        {tips && (
          <div className="tip-box">
            <h4>{tips.title}</h4>
            <ul>
              {tips.points.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
