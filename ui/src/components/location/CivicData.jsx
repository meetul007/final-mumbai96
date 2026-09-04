export default function CivicData({ data, location }) {
  if (!data || Object.keys(data).length === 0) return null;

  const formattedLocation = location?.replace(/-/g, " ");

  const labels = {
    ward: "Municipal Ward",
    assembly_constituency: "Assembly Constituency",
    lok_sabha: "Lok Sabha Constituency",
    police_station: "Police Station",
  };

  const icons = {
    ward: "🏛️",
    assembly_constituency: "🗳️",
    lok_sabha: "🏢",
    police_station: "👮",
  };

  return (
    <section className="guide-sec" id="civic">
      <div className="con">
        <p className="sl">🏛️ Civic & Administration</p>
        <h2 className="st">
          Civic Information for <em>{formattedLocation}</em>
        </h2>

        <div className="civic-wrap">
          {Object.entries(data).map(([key, value]) => (
            <div className="civic-chip" key={key}>
              <div className="cv-icon">{icons[key] || "📌"}</div>
              <span className="cv-label">
                {labels[key] || key.replace(/_/g, " ")}
              </span>
              <span className="cv-val">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
