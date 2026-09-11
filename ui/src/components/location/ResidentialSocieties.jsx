
// ResidentialSocieties.js
import styles from './locationPage.module.css';

export default function ResidentialSocieties({ location, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()) || "Bhayandar East";

  // Default data - exactly like HTML
  const displayItems = items && items.length > 0 ? items : [];

  const displayDescription = `Prominent housing societies and townships that define community life in ${formattedLocation}.`;

  return (
    <section className="guide-sec" id="societies">
      <div className="con">
        <p className="sl">Housing Societies</p>
        <h2 className="st">
          Residential Societies in  <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          {displayDescription}
        </p>

        <div className={styles.socGrid}>
          {displayItems.map((item, index) => (
            <div className={styles.socItem} key={index}>
              <img src={item.image} alt={item.name} width="200" height="200" />
              <div>
                <h3>{item.name}</h3>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}