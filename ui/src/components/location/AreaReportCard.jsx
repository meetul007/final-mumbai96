const LABELS = {
  transit: {
    label: "Connectivity",
    hint: "Rail, road, metro connectivity",
  },
  essentials: {
    label: "Daily Essentials",
    hint: "Malls, markets, pharmacies",
  },
  affordability: {
    label: "Affordability",
    hint: "Value for money vs nearby areas",
  },
  schools: {
    label: "Schools & Education",
    hint: "Quality of local schools & colleges",
  },
  green: {
    label: "Greenery & Quality of Life",
    hint: "Green spaces, clean roads, air",
  },
  safety: {
    label: "Safety",
    hint: "Community safety & family-friendliness",
  },
  cleanliness: {
    label: "Cleanliness",
    hint: "Street cleanliness, waste management",
  },
};

function StarRating({ score }) {
  const stars = Math.round(score || 0);
  return (
    <span className="stars">
      {"★".repeat(stars)}
      {"☆".repeat(5 - stars)}
    </span>
  );
}

export default function AreaReportCard({ data, location }) {
  const formattedLocation = location?.replace(/-/g, " ");

  if (!data || Object.keys(data).length === 0) return null;

  // Map the API keys to display items
  const items = Object.entries(LABELS)
    .filter(([key]) => data[key] !== undefined && data[key] !== null)
    .map(([key, meta]) => ({
      key,
      label: meta.label,
      hint: meta.hint,
      score: data[key],
    }));

  if (items.length === 0) return null;

  return (
    <section className="guide-sec" id="area-report-card">
      <div className="con">
        <p className="sl">📊 Mumbai96 Community Rating</p>
        <h2 className="st">
          <em>{formattedLocation}</em> — Area Report Card
        </h2>
        <p className="sd">
          Ratings based on Mumbai96 community inputs from residents and frequent
          visitors of {formattedLocation}. Updated periodically.
        </p>

        <div className="report-grid">
          {items.map((item) => (
            <div className="report-card" key={item.key}>
              <div className="rc-top">
                <span className="rc-label">{item.label}</span>
                <StarRating score={item.score} />
              </div>
              {item.hint && <p className="rc-hint">{item.hint}</p>}
            </div>
          ))}
        </div>

        {data.overall !== undefined && data.overall !== null && (
          <div className="report-overall">
            <span className="ro-label">Overall Rating</span>
            <span className="ro-score">
              {data.overall.toFixed(1)} / 5
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
