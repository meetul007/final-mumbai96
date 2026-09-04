export default function ListingSEO({
  location = "borivali-west",
  category = "dentists",
}) {
  const formattedLocation = location.replace(/-/g, " ");
  const formattedCategory = category.replace(/-/g, " ");

  return (
    <div className="pl-prose">
      <div className="con">
        <div className="prose-inner">
          <h2>
            Best <em>{formattedCategory}</em> in {formattedLocation}, Mumbai
          </h2>

          <p>
            Finding trusted {formattedCategory} in {formattedLocation} is now
            easier with Mumbai96. Every listing is verified so you can call
            directly, read real reviews, and choose the right service
            confidently.
          </p>

          <h3>What to look for</h3>
          <p>
            Look for verified professionals, real customer reviews, updated
            contact details, and transparent pricing. Mumbai96 ensures all
            listings meet these standards.
          </p>

          <h3>Services available</h3>
          <p>
            From basic services to specialised experts, {formattedLocation}{" "}
            offers a wide range of options across all budgets and needs.
          </p>

          <h3>About {formattedLocation}</h3>
          <p>
            {formattedLocation} is one of Mumbai's active neighbourhoods with a
            strong demand for local services. Mumbai96 connects residents
            directly with trusted businesses nearby.
          </p>
        </div>
      </div>
    </div>
  );
}
