
import Link from "next/link";
import styles from "./locationPage.module.css";

export default function NearbySection({
  locations = [],
  variant = "location",
  // Listing variant props (unrelated to this module — left as-is):
  locationName = "",
  locationSlug = "",
  category = {},
  nearbyLocations = [],
  otherCategories = [],
}) {
  // ── Location page variant (matches reference design) ──
  if (variant === "location") {
    return (
      <section className={styles.nearby}>
        <div className={styles.con}>
          <p className={styles.sl}>Explore Nearby</p>
          <h2 className={styles.st}>Nearby Areas in the Mumbai Region</h2>
          <div className={styles.ng}>
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/${loc.slug}`} className={styles.nc}>
                📍 {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Category listing page variant (out of scope for this module — untouched) ──
  const catEmoji = category.emoji || "📌";
  const catName = category.name || "Services";
  const catSlug = category.slug || "";

  return (
    <section className="nearby">
      <div className="con">
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