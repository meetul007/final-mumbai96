
// UpcomingProjects.js
import styles from './locationPage.module.css';

export default function UpcomingProjects({ location, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ") || "Bhayandar East";

  // Default data - exactly like HTML
  const displayItems = items && items.length > 0 ? items :[];

  const displayDescription = `Infrastructure, real estate and redevelopment projects that will reshape ${formattedLocation} over the next 3–5 years.`;

  // Function to get status class
  const getStatusClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("ongoing") || s.includes("under construction") || s.includes("in progress")) {
      return styles.ongoing;
    }
    if (s.includes("upcoming") || s.includes("approved")) {
      return styles.upcoming;
    }
    if (s.includes("planning") || s.includes("proposed") || s.includes("future") ||s.includes("planned")) {
      return styles.planned;
    }
    if (s.includes("completed")) {
      return styles.upcoming;
    }
    return styles.planned;
  };

  return (
    <section className="guide-sec" id="developments">
      <div className="con">
        <p className="sl">What&apos;s Coming Next</p>
        <h2 className="st">
          Upcoming Projects in <em>{formattedLocation.split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")}</em>
        </h2>
        <p className="sd">
          {displayDescription}
        </p>

        <div className={styles.devGrid}>
          {displayItems.map((item, index) => (
            <div className={styles.devCard} key={index}>
              {item.image ? (
                <img src={item.image} alt={item.name} width="400" height="220" />
              ) : (
                <div className={styles.devCardPh}>🏗️</div>
              )}
              <div className={styles.devCardBody}>
                {item.status && (
                  <span className={`${styles.devStatus} ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                )}
                <h3>{item.name}</h3>
                {item.developer && <p className={styles.devDeveloper}>{item.developer}</p>}
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}