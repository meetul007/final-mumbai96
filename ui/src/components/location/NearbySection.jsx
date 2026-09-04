import Link from "next/link";

export default function NearbySection({
  locations = [],
  variant = "location",
  // Listing variant props:
  locationName = "",
  locationSlug = "",
  category = {},
  nearbyLocations = [],
  otherCategories = [],
}) {
  // ── Location page variant (backward compatible) ──
  if (variant === "location") {
    return (
      <section className="nearby">
        <div className="con">
          <p className="sl">Explore Nearby</p>
          <h2 className="st">Nearby Neighbourhoods</h2>
          <div className="ng">
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/${loc.slug}`} className="nc">
                📍 {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Category listing page variant ──
  const catEmoji = category.emoji || "📌";
  const catName = category.name || "Services";
  const catSlug = category.slug || "";

  return (
    <section className="nearby">
      <div className="con">
        {/* Also in {locationName} */}
        {otherCategories.length > 0 && (
          <>
            <p className="nb-kicker">Also in {locationName}</p>
            <h2 className="nb-title">Other Services Nearby</h2>
            <div className="nb-also">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locationSlug}/${cat.slug}`}
                  className="nb-also-card"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </>
        )}

        {/* {catName} in Nearby Neighbourhoods */}
        {nearbyLocations.length > 0 && (
          <>
            <p className="nb-also-title">
              {catEmoji} {catName} in Nearby Neighbourhoods
            </p>
            <div className="nb-grid">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}/${catSlug}`}
                  className="nb-card"
                >
                  <span>{catEmoji}</span>
                  <span>
                    {catName} in <strong>{loc.name}</strong>
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Fallback: plain locations list if no structured data */}
        {otherCategories.length === 0 && nearbyLocations.length === 0 && locations.length > 0 && (
          <div className="nb-grid">
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/${loc.slug}`} className="nb-card">
                📍 {loc.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
