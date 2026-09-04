import { getIcon } from "@/lib/iconMapper";

export default function LocalLifeSection({
  location,
  description,
  items = [],
}) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="guide-sec" id="locallife">
      <div className="con">
        <p className="sl">🏘️ Local Life</p>

        <h2 className="st">
          Living in <em>{formattedLocation}</em>
        </h2>

        <p className="sd">{description}</p>

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
      </div>
    </section>
  );
}
