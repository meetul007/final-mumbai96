// import { getIcon } from "@/lib/iconMapper"
// CommuteSection.js
import styles from './locationPage.module.css';

export default function CommuteSection({ location, description, items = [], detailsItems = [] }) {
  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()) || "Bhayandar East";

  // Default data - exactly like HTML
  const displayItems = items && items.length > 0 ? items : [
    {
      name: "Churchgate by Train",
      icon: "🚆",
      distance: "60-70 min",
      tag: "Train"
    },
    {
      name: "Andheri by Train",
      icon: "🚉",
      distance: "35 min",
      tag: "Train"
    },
    {
      name: "Autos & Share Autos",
      icon: "🛺",
      distance: "Abundant",
      tag: "Auto"
    },
    {
      name: "Highway via Mira Road",
      icon: "🛣️",
      distance: "WEH",
      tag: "Road"
    }
  ];

  // Detail items - exactly like HTML
  const detailItems = detailsItems && detailsItems.length > 0 ? detailsItems : [
    {
      name: "Western Railway - Bhayandar Station",
      description: "The lifeline of Bhayandar East - fast and slow locals to Churchgate, Borivali, Andheri and Virar. Bhayandar East sits on the east side of the station.",
      icon: "🚆",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=200&q=80"
    },
    {
      name: "Bus Routes from Bhayandar East",
      description: "MBMC buses connect Bhayandar East to Mira Road, Bhayandar West, Borivali and Dahisar, covering Indralok, Golden Nest and Navghar Road.",
      icon: "🚌",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=200&q=80"
    },
    {
      name: "Road Access from Bhayandar East",
      description: "Connected to the Western Express Highway via Mira Road and Dahisar - convenient for road trips to Borivali, Ghodbunder Road and Thane.",
      icon: "🛣️",
      image: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?w=200&q=80"
    },
    {
      name: "Upcoming Metro Access, Bhayandar East",
      description: "The proposed Metro Line 9 extension toward Mira-Bhayandar will give Bhayandar East faster connectivity to Dahisar and the metro network.",
      icon: "🚇",
      image: "https://images.unsplash.com/photo-1581262208435-41726149a759?w=200&q=80"
    }
  ];

  const displayDescription = description || `Bhayandar East runs on the Western Railway, with MBMC buses, autos and road links toward the highway adding to its connectivity.`;

  // Function to get icon
  const getIcon = (item) => {
    if (item.icon) return item.icon;
    if (item.emoji) return item.emoji;
    
    const icons = {
      "Churchgate by Train": "🚆",
      "Andheri by Train": "🚉",
      "Autos & Share Autos": "🛺",
      "Highway via Mira Road": "🛣️",
      "Western Railway - Bhayandar Station": "🚆",
      "Bus Routes from Bhayandar East": "🚌",
      "Road Access from Bhayandar East": "🛣️",
      "Upcoming Metro Access, Bhayandar East": "🚇"
    };
    return icons[item.name] || "📍";
  };

  return (
    <section className="guide-sec" id="commute">
      <div className="con">
        <p className="sl">Commute &amp; Connectivity</p>
        <h2 className="st">
          Getting Around <em>{formattedLocation}</em>
        </h2>
        <p className="sd">{displayDescription}</p>

        {/* Commute Box - 4 columns like HTML */}
        <div className={styles.commuteBox}>
          {displayItems.map((item, index) => (
            <div className={styles.cb2} key={index}>
              <div className={styles.cb2Icon}>{getIcon(item)}</div>
              <div className={styles.cb2Val}>{item.distance || item.tag || ""}</div>
              <div className={styles.cb2Lbl}>{item.name}</div>
            </div>
          ))}
        </div>

        {/* Commute Detail Grid - 2 columns like HTML */}
        <div className={styles.commuteDetailGrid}>
          {detailItems.map((item, index) => (
            <div className={styles.commuteCard} key={index}>
              {item.image && (
                <img src={item.image} alt={item.name} width="200" height="200" />
              )}
              <div className={styles.commuteCardBody}>
                <h3>{item.name}</h3>
                <p>{item.description || item.tag || `Key connectivity option in ${formattedLocation}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}