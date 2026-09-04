export default function ResidentProfile({ location, items = [], description }) {
  const formattedLocation = location?.replace(/-/g, " ");

  if (!items || items.length === 0) return null;

  return (
    <section className="guide-sec" id="residents">
      <div className="con">
        <p className="sl">👥 Resident Profile</p>
        <h2 className="st">
          Who Lives in <em>{formattedLocation}</em>?
        </h2>
        <p className="sd">
          A warm, community-minded cross-section of Mumbai — here&apos;s who
          you&apos;ll find calling {formattedLocation} home.
        </p>

        {description ? (
          <div className="profile-wrap">
            <div>
              <p style={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.8, fontWeight: 300, marginBottom: "16px" }}>
                {description}
              </p>
            </div>
            <div className="profile-stats">
              {items.map((item, i) => (
                <div className="profile-stat" key={i}>
                  <strong>{item.segment}</strong>
                  <span>
                    {item.description
                      ? item.description
                      : item.percentage !== undefined && item.percentage !== null
                        ? `${item.percentage}%`
                        : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="profile-stats">
            {items.map((item, i) => (
              <div className="profile-stat" key={i}>
                <strong>{item.segment}</strong>
                <span>
                  {item.description
                    ? item.description
                    : item.percentage !== undefined && item.percentage !== null
                      ? `${item.percentage}%`
                      : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
