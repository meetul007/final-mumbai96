export default function ListingHero({
  location = "borivali-west",
  locationSlug = "",
  category = "dentists",
  total = 0,
  lastUpdated = "March 2026",
  search = "",
}) {
  const formattedLocation = location.replace(/-/g, " ");
  const formattedCategory = category.replace(/-/g, " ");
  const hrefSlug = locationSlug || location;

  return (
    <div className="pl-hero">
      <div className="pl-hero-grid"></div>

      <div className="con">
        <div className="pl-hero-inner">
          {/* Eyebrow */}
          <div className="pl-eyebrow">
            Mumbai96 · {formattedLocation} · {formattedCategory}
          </div>

          {/* Title */}
          <h1 className="pl-h1">
            Best <em>{formattedCategory}</em> in {formattedLocation}
          </h1>

          {/* Search hidden per request */}

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pl-result-bar">
        <div className="con">
          <div className="pl-rb-inner">
            {/* Breadcrumb */}
            <nav className="bc">
              <a href="/">Home</a>
              <span className="bc-sep">/</span>

              <a href={`/${hrefSlug}`}>{formattedLocation}</a>

              <span className="bc-sep">/</span>

              <span>{formattedCategory}</span>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
