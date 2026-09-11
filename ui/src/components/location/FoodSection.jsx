

import { getIcon } from "@/lib/iconMapper";
import styles from "./locationPage.module.css";

export default function FoodSection({
  location,
  description,
  tags = [],
  items = [],
}) {
  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());

  return (
    <section className={styles.guideSec} id="food">
      <div className={styles.con}>
        <p className={styles.sl}>Food to Explore</p>

        <h2 className={styles.st}>
          Food to Explore in <em>{formattedLocation}</em>
        </h2>

        <p className={styles.sd}>{description}</p>

        {/* TAGS */}
        <div className={styles.foodTags}>
          {tags.map((tag, i) => (
            <span className={styles.foodTag} key={i}>
              {tag}
            </span>
          ))}
        </div>

        {/* LIST ITEMS */}
        <div className={styles.listGrid}>
          {items.map((item, i) => (
            <div className={styles.listItem} key={i}>
              <span className={styles.liIcon}>{getIcon(item)}</span>
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