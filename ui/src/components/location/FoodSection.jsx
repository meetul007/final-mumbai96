import { getIcon } from "@/lib/iconMapper";

export default function FoodSection({
  location,
  description,
  tags = [],
  items = [],
}) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="guide-sec" id="food">
      <div className="con">
        <p className="sl">🍽️ Food to Explore</p>

        <h2 className="st">
          Food to Explore in <em>{formattedLocation}</em>
        </h2>

        <p className="sd">{description}</p>

        {/* TAGS */}
        <div className="food-tags">
          {tags.map((tag, i) => (
            <span className="food-tag" key={i}>
              {tag}
            </span>
          ))}
        </div>

        {/* LIST ITEMS */}
        <div className="list-grid">
          {items.map((item, i) => (
            <div className="list-item" key={i}>
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
