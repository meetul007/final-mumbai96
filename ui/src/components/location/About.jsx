
import styles from "./locationPage.module.css";

export default function AboutSection({
  location,
  title,
  description1,
  description2,
  commute,
  tag,
  image,
  stats = [],
}) {
  return (
    <section className={styles.about}>
      <div className={styles.con}>
        <div className={styles.ag}>
          {/* LEFT CONTENT */}
          <div>
            <p className={styles.sl}>About the Area</p>

            <h2>{title}</h2>

            <p dangerouslySetInnerHTML={{ __html: description1 }}></p>

            {description2 && (
              <p dangerouslySetInnerHTML={{ __html: description2 }}></p>
            )}

            {(commute || tag) && (
              <p>
                {commute && (
                  <>
                    <strong>Commute:</strong> {commute}
                  </>
                )}
                {commute && tag && <>&nbsp;|&nbsp;</>}
                {tag && (
                  <>
                    <strong>Tag:</strong> {tag}
                  </>
                )}
              </p>
            )}

            {stats.length > 0 && (
              <div className={styles.ahs}>
                {stats.map((stat, i) => (
                  <div className={styles.ahc} key={i}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className={styles.ai}>
            {image ? (
              <img
                src={image}
                alt={`${location} Mumbai neighbourhood`}
                loading="lazy"
              />
            ) : (
              <span>📍</span>
            )}
            <div className={styles.aic}>📍 {location} — Mumbai</div>
          </div>
        </div>
      </div>
    </section>
  );
}