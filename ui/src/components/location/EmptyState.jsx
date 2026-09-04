export default function EmptyState({ category, location }) {
  const formattedLocation = location.replace(/-/g, " ");

  return (
    <section className="empty-sec">
      <div className="con">
        <div className="empty-box">
          <div className="empty-icon">📍</div>

          <h2 className="empty-title">
            No listings yet for{" "}
            <em>
              {category} in {formattedLocation}
            </em>
          </h2>

          <p className="empty-desc">
            We're building verified listings for this category. Be the first to
            list your business on Mumbai96.
          </p>

          <div className="empty-actions">
            <a href="/auth/login" className="empty-btn primary">
              ➕ Add Your Business
            </a>

            <a href={`/${location}`} className="empty-btn ghost">
              ← Explore Other Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
