
// LocalEvents.js
import styles from './locationPage.module.css';

export default function LocalEvents({ location, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ") || "Bhayandar East";

  // Default data - exactly like HTML
  const displayItems = items && items.length > 0 ? items : [];

  const displayDescription = `From grand Ganesh and Navratri celebrations to society events and food fairs - ${formattedLocation}'s calendar is always full.`;

  return (
    <section className="guide-sec" id="events">
      <div className="con">
        <p className="sl">Events &amp; Festivals</p>
        <h2 className="st">
          Local Events in <em>{formattedLocation.split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")}</em>
        </h2>
        <p className="sd">
          {displayDescription}
        </p>

        <div className={styles.eventsGrid}>
          {displayItems.map((item, index) => (
            <div className={styles.eventCard} key={index}>
              {item.image ? (
                <img src={item.image} alt={item.name} width="400" height="320" />
              ) : (
                <div className={styles.eventCardPh}>🎉</div>
              )}
              <div className={styles.eventBody}>
                {item.date && <div className={styles.eventMonth}>{item.date}</div>}
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
