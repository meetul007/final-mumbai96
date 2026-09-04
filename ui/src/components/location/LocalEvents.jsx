export default function LocalEvents({ location, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ");

  if (!items || items.length === 0) return null;

  return (
    <section className="guide-sec" id="local-events">
      <div className="con">
        <p className="sl">🎉 Events &amp; Festivals</p>
        <h2 className="st">
          Local Events in <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          From grand festivals to community gatherings — {formattedLocation}
          &apos;s calendar reflects its vibrant culture.
        </p>

        <div className="events-grid">
          {items.map((item, i) => (
            <div className="event-card" key={i}>
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="event-card-ph">🎉</div>
              )}
              <div className="event-body">
                {item.date && <span className="event-month">{item.date}</span>}
                <h5>{item.name}</h5>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
