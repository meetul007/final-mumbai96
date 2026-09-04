export default function ListingsHeader({
  total = 0,
  location = "",
  category = "",
  start = 1,
  end = 0,
}) {
  return (
    <div className="listings-header rv">
      <div className="lh-count">
        Showing <strong>{start}–{end}</strong> of <strong>{total}</strong>{" "}
        {category} in {location}
      </div>
    </div>
  );
}
