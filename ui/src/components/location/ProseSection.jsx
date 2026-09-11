
import styles from "./locationPage.module.css";

export default function ProseSection({ location, sections = [] }) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className={styles.prose}>
      <div className={styles.con}>
        <div className={styles.proseI}>
          <h2>Best Services in {formattedLocation}, Mumbai — Mumbai96 Guide</h2>
          {sections.map((sec, index) => (
            <div key={index}>
              <h3>{sec.name}</h3>
              <p>{sec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
