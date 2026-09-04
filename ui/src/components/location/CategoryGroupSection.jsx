export default function CategoryGroupSection({ group, location }) {
  if (!group || !group.categories || group.categories.length === 0)
    return null;

  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="cat-grid-sec" id={`cat-group-${group.key}`}>
      <div className="con">
        <p className="sl">
          {group.icon} {group.label}
        </p>
        <h2 className="st">
          {group.label} in <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          From {group.label.toLowerCase()} — the everyday essentials in{" "}
          {formattedLocation}.
        </p>

        <div className="cat-grid">
          {group.categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/${location}/${cat.slug}`}
              className="cat-card"
            >
              <span className="cat-emoji">{cat.emoji || "📌"}</span>
              <span className="cat-name">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
