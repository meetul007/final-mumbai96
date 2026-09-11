

import { getIcon } from "@/lib/iconMapper";
import styles from "./locationPage.module.css";

export default function LocalLifeSection({
  location,
  description,
  items = [],
}) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className={styles.guideSec} id="locallife">
      <div className={styles.con}>
        <p className={styles.sl}>Local Life</p>

        <h2 className={styles.st}>
          Living in <em>
    {formattedLocation.split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")}
  </em>
        </h2>

        <p className={styles.sd}>{description}</p>

        <div className={styles.listGrid}>
          {items.map((item, index) => (
            <div className={styles.listItem} key={index}>
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <span className={styles.liIcon}>{getIcon(item)}</span>
              )}

              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
