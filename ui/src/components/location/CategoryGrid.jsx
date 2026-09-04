export default function CategoryGrid({
  location,
  title,
  description,
  categories = [],
}) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="ql">
      <div className="con">
        <p className="sl">{categories.length}+ Categories</p>

        <h2 className="st">
          {title || `Find Any Service in ${formattedLocation}`}
        </h2>

        <p className="sd">
          {description ||
            `Mumbai96 covers ${categories.length}+ categories — from dentists to architects, salons to tiffin services.`}
        </p>

        <div className="qlg">
          {categories.map((cat, index) => (
            <a key={index} href={`/${location}/${cat.slug}`} className="qlc">
              <span className="qli">{cat.icon}</span>
              <span className="qln">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
