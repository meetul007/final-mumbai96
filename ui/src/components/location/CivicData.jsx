
import styles from "./locationPage.module.css";

export default function CivicData({ data, location, description }) {
  const formattedLocation = location?.replace(/-/g, " ");

  const resolvedData = data && Object.keys(data).length > 0 ? data : [];
  const resolvedDescription =
    description ||
    `The essential administrative and civic facts every resident and visitor should know about ${formattedLocation}.`;

  return (
    <section className={styles.guideSec} id="civicdata">
      <div className={styles.con}>
        <p className={styles.sl}>Area at a Glance</p>
        <h2 className={styles.st}>
          Civic Data - <em>
    {formattedLocation.split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")}
  </em>
        </h2>
        <p className={styles.sd}>{resolvedDescription}</p>

        <div className={styles.civicWrap}>
          {Object.entries(resolvedData).map(([key, entry]) => {
            const label = entry?.label || key.replace(/_/g, " ");
            const value = entry?.value ?? entry;
            const image = entry?.image;

            return (
              <div className={styles.civicChip} key={key}>
                {image && (
                  <img src={image} alt={`${label} ${formattedLocation}`} />
                )}
                <div className={styles.cvLabel}>{label}</div>
                <div className={styles.cvVal}>{value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}