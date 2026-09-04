export default function WhySection({ location, items = [] }) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="why">
      <div className="con">
        <p className="sl">Why Mumbai96?</p>

        <h2 className="st">
          Why Mumbaikars Trust <em>Mumbai96</em>
        </h2>

        <div className="wg">
          {items.map((item, index) => (
            <div className="wc" key={index}>
              <div className="ic">{item.icon}</div>

              <h4>{item.title}</h4>

              <p>{item.description.replace("{location}", formattedLocation)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
