
import styles from "./locationPage.module.css";

export default function SubAreas({ items = [], location, description }) {
  if (!items || items.length === 0) return null;

  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());

  return (
    <section className={styles.guideSec} id="subareas">
      <div className={styles.con}>
        <p className={styles.sl}>Micro-Localities</p>
        <h2 className={styles.st}>
          Areas Within <em>{formattedLocation}</em>
        </h2>
        {description && <p className={styles.sd}>{description}</p>}

        <div className={styles.subareaGrid}>
          {items.map((area, i) => (
            <div className={styles.subareaCard} key={i}>
              {area.image && (
                <img src={area.image} alt={`${area.name}`} loading="lazy" />
              )}
              <div className={styles.subareaOv}></div>
              <div className={styles.subareaBody}>
                <div className={styles.subareaTag}>
                  {area.tag || "Locality"}
                </div>
                <h3>{area.name}</h3>
                {area.description && <p>{area.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
