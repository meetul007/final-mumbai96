import { getIcon } from "@/lib/iconMapper";

export default function CommuteSection({ location, description, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ");

  if (!items || items.length === 0) return null;

  return (
    <section className="guide-sec" id="commute">
      <div className="con">
        <p className="sl">Commute &amp; Connectivity</p>
        <h2 className="st">
          Getting Around <em>{formattedLocation}</em>
        </h2>
        <p className="sd">{description}</p>

        <div className="commute-box">
          {items.map((item, index) => (
            <div className="cb2" key={index}>
              <div className="cb2-icon">{getIcon(item)}</div>
              <div className="cb2-val">{item.distance || item.tag || ""}</div>
              <div className="cb2-lbl">{item.name}</div>
            </div>
          ))}
        </div>

        <div className="commute-detail-grid">
          {items.map((item, index) => (
            <div className="commute-card" key={index}>
              <div className="commute-card-body">
                <h5>{item.name}</h5>
                <p>
                  {item.distance
                    ? `${item.distance}${item.tag ? ` — ${item.tag}` : ""}`
                    : item.tag || `Key connectivity option in ${formattedLocation}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
