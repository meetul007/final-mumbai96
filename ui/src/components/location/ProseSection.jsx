export default function ProseSection({ location, sections = [] }) {
  const formattedLocation = location?.replace(/-/g, " ");

  return (
    <section className="prose">
      <div className="con">
        <div className="prose-i">
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
