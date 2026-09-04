export default function ServiceSection({
  location,
  category,
  emoji,
  description,
  image,
  benefits = [],
  faq,
  reverse = false,
  slug = null,
}) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="cs">
      <div className="con">
        <div className={`cg ${reverse ? "r" : ""}`}>
          {/* IMAGE */}
          <div className="ci">
            {image ? (
              <img
                src={image}
                alt={`${category} in ${formattedLocation}`}
                loading="lazy"
              />
            ) : (
              <div className="ci-placeholder">
                <span className="ci-placeholder-emoji">{emoji || "📌"}</span>
              </div>
            )}
            <span className="it">{emoji ? <><span className="ci-emoji">{emoji}</span> {category}</> : category}</span>
          </div>

          {/* CONTENT */}
          <div className="cb">
            <div className="ch">
              <div className="chl">
                <p className="sl">Local Services · {formattedLocation}</p>

                <h3>
                  {category} in {formattedLocation}
                </h3>
              </div>

              <a href={`/${location}/${slug}`} className="cl">
                View All →
              </a>
            </div>

            <p>{description}</p>

            {/* BENEFITS */}
            <div className="tb">
              <h4>
                ⭐ Why use Mumbai96 to find {category.toLowerCase()} in{" "}
                {formattedLocation}?
              </h4>

              <ul>
                {benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            {faq && (
              <div className="faq">
                <div className="fqi">
                  <div className="fqq">{faq.question}</div>
                  <div className="fqa">{faq.answer}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
