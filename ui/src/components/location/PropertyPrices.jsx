export default function PropertyPrices({ items = [], location }) {
  if (!items || items.length === 0) return null;

  const formattedLocation = location?.replace(/-/g, " ");
  const rental = items[0]?.rental || null;

  return (
    <section className="guide-sec" id="property">
      <div className="con">
        <p className="sl">🏠 Property & Real Estate</p>
        <h2 className="st">
          Property Prices in <em>{formattedLocation}</em>
        </h2>
        <p className="sd">
          Current residential property price ranges in {formattedLocation} (as
          of 2026).
        </p>

        <div className="property-table-wrapper">
          <table className="property-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Price Range</th>
                <th>Sub-area / Location</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td>{item.type}</td>
                  <td>{item.price}</td>
                  <td>{item.sub_area || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rental && (
          <p className="property-rental">
            <strong>Rental Range:</strong> {rental}
          </p>
        )}
      </div>
    </section>
  );
}
