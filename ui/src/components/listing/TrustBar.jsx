export default function TrustBar({ location = "borivali-west" }) {
  const formattedLocation = location.replace(/-/g, " ");

  const items = [
    {
      icon: "✅",
      title: "Verified Listings",
      desc: "Every business confirmed",
    },
    {
      icon: "⭐",
      title: "Real Reviews",
      desc: "From local Mumbaikars",
    },
    {
      icon: "📞",
      title: "Direct Contact",
      desc: "No middlemen, no commission",
    },
    {
      icon: "🏘️",
      title: "Hyperlocal",
      desc: `${formattedLocation} only`,
    },
    {
      icon: "🆓",
      title: "100% Free",
      desc: "For all users",
    },
  ];

  return (
    <div className="trust-bar">
      <div className="trust-inner">
        {items.map((item, i) => (
          <div key={i} className="trust-item">
            <div className="trust-icon">{item.icon}</div>
            <div className="trust-text">
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
