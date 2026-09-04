export default function GroupedListingSection({ groupKey, group, location }) {
  if (!group || !group.listings || group.listings.length === 0) return null;

  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="guide-sec" id={`group-${groupKey}`}>
      <div className="con">
        <p className="sl">
          {group.icon} {group.label}
        </p>
        <h2 className="st">
          {group.label} in <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          Verified {group.label.toLowerCase()} serving {formattedLocation} and
          nearby areas.
        </p>

        <div className="listing-grid">
          {group.listings.map((listing) => (
            <div className="listing-card" key={listing.id}>
              {listing.image && (
                <div className="listing-card-img">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="listing-card-body">
                <h3 className="listing-card-name">{listing.name}</h3>
                {listing.description && (
                  <p className="listing-card-desc">{listing.description}</p>
                )}
                {listing.address && (
                  <p className="listing-card-addr">{listing.address}</p>
                )}
                <div className="listing-card-meta">
                  {listing.rating > 0 && (
                    <span className="listing-card-rating">
                      ⭐ {listing.rating} ({listing.review_count || 0})
                    </span>
                  )}
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="listing-card-phone"
                    >
                      📞 {listing.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
