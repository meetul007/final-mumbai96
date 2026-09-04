export default function NearbySection({
  location = "borivali-west",
  category = "dentists",
}) {
  const formattedLocation = location.replace(/-/g, " ");

  const services = [
    { name: "Skin Doctors", icon: "🩺", slug: "skin-doctors" },
    { name: "Gyms & Fitness", icon: "🏋️", slug: "gyms" },
    { name: "Salons", icon: "💈", slug: "salons" },
    { name: "Hospitals", icon: "🏥", slug: "hospitals" },
    { name: "Pharmacies", icon: "💊", slug: "pharmacies" },
    { name: "Eye Doctors", icon: "👁️", slug: "eye-doctors" },
    { name: "Physiotherapy", icon: "🧘", slug: "physiotherapy" },
    { name: "Path Labs", icon: "🔬", slug: "pathology-labs" },
  ];

  const nearbyLocations = [
    "borivali-east",
    "kandivali-west",
    "dahisar-west",
    "goregaon-west",
  ];

  return (
    <div className="nearby">
      <div className="con">
        <div className="nb-kicker">Also in {formattedLocation}</div>
        <div className="nb-title">Other Services Nearby</div>

        <div className="nb-grid">
          {services.map((s, i) => (
            <a key={i} href={`/${location}/${s.slug}`} className="nb-card">
              {s.icon} {s.name}
            </a>
          ))}
        </div>

        <div className="nb-also-title">{category} in Nearby Neighbourhoods</div>

        <div className="nb-also">
          {nearbyLocations.map((loc, i) => {
            const formatted = loc.replace(/-/g, " ");
            return (
              <a key={i} href={`/${loc}/${category}`} className="nb-also-card">
                🦷 {category} in <br />
                <strong>{formatted}</strong>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
