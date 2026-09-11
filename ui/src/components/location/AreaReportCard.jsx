
// AreaReportCard.js
import styles from './locationPage.module.css';

export default function AreaReportCard({ data, location }) {
  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()) || "Bhayandar East";

  // Default data - exactly like HTML
  const displayData = data && Object.keys(data).length > 0 ? data : {
    affordability: 5,
    essentials: 5,
    connectivity: 3,
    safety: 4,
    schools: 4,
    healthcare: 4,
    overall: 4.2
  };

  // Display items - exactly like HTML
  const displayItems = [
    {
      key: "affordability",
      label: "Affordability in Bhayandar East",
      hint: "Among the most affordable pockets in the MMR",
      score: displayData.affordability || 5
    },
    {
      key: "essentials",
      label: "Daily Essentials in Bhayandar East",
      hint: "Markets, farsan, groceries and pharmacies everywhere",
      score: displayData.essentials || 5
    },
    {
      key: "connectivity",
      label: "Connectivity in Bhayandar East",
      hint: "Good train link; far from south Mumbai, awaiting Metro",
      score: displayData.connectivity || 3
    },
    {
      key: "safety",
      label: "Safety in Bhayandar East",
      hint: "Quiet, family-friendly and generally very safe",
      score: displayData.safety || 4
    },
    {
      key: "schools",
      label: "Schools & Education",
      hint: "Good SSC/CBSE options & a known degree college",
      score: displayData.schools || 4
    },
    {
      key: "healthcare",
      label: "Healthcare Access",
      hint: "Local hospitals plus top facilities nearby on Mira Road",
      score: displayData.healthcare || 4
    }
  ];

  // Function to get icon based on key - exactly like HTML images
  const getIcon = (key) => {
    const icons = {
      affordability: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&q=80",
      essentials: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=100&q=80",
      connectivity: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=100&q=80",
      safety: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=100&q=80",
      schools: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&q=80",
      healthcare: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&q=80"
    };
    return icons[key] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&q=80";
  };

  // Star rating function
  const renderStars = (score) => {
    const stars = Math.round(score || 0);
    return (
      <div className={styles.stars}>
        {"⭐".repeat(stars)}
        {"☆".repeat(5 - stars)}
      </div>
    );
  };

  return (
    <section className="guide-sec" id="reportcard">
      <div className="con">
        <p className="sl">Mumbai96 Community Rating</p>
        <h2 className="st">
          <em>{formattedLocation}</em> — Area Report Card
        </h2>
        <p className="sd">
          Ratings based on Mumbai96 community inputs from residents and frequent
          visitors of {formattedLocation}. Updated periodically.
        </p>

        <div className={styles.reportGrid}>
          {displayItems.map((item) => (
            <div className={styles.reportCard} key={item.key}>
              <div className={styles.rcIcon}>
                <img src={getIcon(item.key)} alt={item.label} width="100" height="100" />
              </div>
              <h3>{item.label}</h3>
              {renderStars(item.score)}
              <div className={styles.rcNote}>{item.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}