
// ResidentProfile.js
import styles from './locationPage.module.css';

export default function ResidentProfile({ location, items = [], description }) {
  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()) || "Bhayandar East";

  // Default data - exactly like HTML
  const displayItems = items && items.length > 0 ? items : [];

  const displayDescription = description || "Bhayandar East draws value-conscious families looking for affordable, spacious homes in large townships. Gujarati and North Indian families form a big share, alongside Marathi households and a growing migrant working population. Many residents are young salaried professionals and small business owners commuting to Andheri, Borivali and BKC.";

  return (
    <section className={`guide-sec ${styles.residentSection}`} id="residents">
      <div className={`con ${styles.container}`}>
        <p className={`sl ${styles.sectionLabel}`}>Resident Profile</p>
        <h2 className={`st ${styles.sectionTitle}`}>
          Who Lives in <em>{formattedLocation}</em>?
        </h2>
        <p className={`sd ${styles.sectionDesc}`}>
            An honest snapshot - the energy, the people, the pace. The kind of thing no other directory tells you.        </p>

        <div className={styles.profileWrap}>
          <div className={styles.profileImg}>
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" 
              alt={`${formattedLocation} residents community life`}
              width="800" 
              height="600" 
            />
          </div>
          
          <div>
            <p className={styles.profileDescription}>
              {displayDescription}
            </p>
            
            <div className={styles.profileStats}>
              {displayItems.map((item, i) => (
                <div className={styles.profileStat} key={i}>
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
        </div>
      </div>
    </section>
  );
}