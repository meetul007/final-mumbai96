
import styles from "./locationPage.module.css";

export default function PropertyPrices({ items = [], location, description, note }) {
  if (!items || items.length === 0) return null;

  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());

  return (
    <section className={styles.guideSec} id="property">
      <div className={styles.con}>
        <p className={styles.sl}>Real Estate</p>
        <h2 className={styles.st}>
          Property Prices in <em>{formattedLocation}</em>
        </h2>
         <p className={styles.sd}>An area-by-area breakdown of current property rates in {formattedLocation} Based on local listings data - updated May 2026.</p>

        <div className={styles.propGrid}>
          {items.map((item, i) => (
            <div className={styles.propCard} key={i}>
              {item.image && (
                <img src={item.image} alt={item.sub_area || item.type} />
              )}
              <div>
                <div className={styles.priceLbl}>
                  {item.sub_area ? `${item.sub_area} - ` : ""}
                  {item.type}
                </div>
                <div className={styles.price}>{item.price}</div>
                {item.rental && (
                  <div className={styles.priceLbl}>Rent: {item.rental}</div>
                )}
              </div>
            </div>
          ))}
        </div>

         <p className={styles.propNote}>* Prices are indicative based on local property listings data, May 2026. Actual rates vary by floor, building age and specific sub-area. Always verify with a registered real estate agent.</p>
      </div>
    </section>
  );
}
