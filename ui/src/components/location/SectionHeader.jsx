export default function SectionHeader({
  label,
  title,
  highlight,
  description,
}) {
  return (
    <>
      <p className="sl">{label}</p>
      <h2 className="st">
        {title} {highlight && <em>{highlight}</em>}
      </h2>
      {description && <p className="sd">{description}</p>}
    </>
  );
}
