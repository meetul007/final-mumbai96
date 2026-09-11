
import styles from './locationPage.module.css';

export default function GuideSection({
  id,
  label,
  title,
  location,
  description,
  items = [],
  variant = "card",
  tags = [],
  tips = null,
}) {
  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()) || "Bhayandar East";
  

  // Default items if empty
  const displayItems = items && items.length > 0 ? items :[];

  // Function to get icon based on item or id
  const getIcon = (item) => {
    if (item.icon) return item.icon;
    
    const icons = {
      places: "🏙️",
      food: "🍽️",
      nightlife: "🌙",
      schools: "🏫",
      hospitals: "🏥",
      banks: "🏦",
      markets: "🛒",
      employers: "🏢",
      societies: "🏘️",
      events: "🎪",
      developments: "🏗️"
    };
    return icons[id] || "📍";
  };

  // Get default tips for nightlife
  const getDefaultTips = () => {
    if (id === 'nightlife') {
      return {
        title: "After Hours in Bhayandar East",
        points: [
          "Auto rickshaws & share autos easily available till late",
          "Food delivery apps active till midnight",
          "Last local trains - check Western Railway timings",
          "Mostly a quiet, safe residential area at night"
        ]
      };
    }
    return null;
  };

  const displayTips = tips || getDefaultTips();

  // Get default tags for food
  const getDefaultTags = () => {
    if (id === 'food') {
      return ["Gujarati Thalis", "Punjabi Dhabas", "Farsan & Snacks", "Chaat Corners", "South Indian", "Street Pav Bhaji", "Chinese Stalls", "Sweet Shops"];
    }
    return [];
  };

  const displayTags = tags.length > 0 ? tags : getDefaultTags();

  // Function to get section title
  const getSectionTitle = () => {
    const titles = {
      places: "Places to See",
      food: "Food to Explore",
      nightlife: "Evenings",
      schools: "Schools & Colleges",
      hospitals: "Hospitals & Healthcare",
      banks: "Banks & ATMs",
      markets: "Markets & Shopping",
      employers: "Work & Business",
      societies: "Residential Societies",
      events: "Local Events",
      developments: "Upcoming Projects"
    };
    return titles[id] || title;
  };

  // Function to get section label
  const getSectionLabel = () => {
    const labels = {
      places: "Places to See",
      food: "Food to Explore",
      nightlife: "Nightlife",
      schools: "Education",
      hospitals: "Healthcare",
      banks: "Banking & Finance",
      markets: "Markets & Shopping",
      employers: "Business & Employment",
      societies: "Housing Societies",
      events: "Events & Festivals",
      developments: "What's Coming Next"
    };
    return labels[id] || label;
  };

  // Function to get section description
  const getSectionDescription = () => {
    const descs = {
      places: `Landmarks, leisure spots and local gems worth exploring in ${formattedLocation}.`,
      food: `${formattedLocation} is a budget-friendly food belt - Gujarati and Punjabi eateries, chaat corners, farsan shops, South Indian joints and lively street food along Navghar Road.`,
      nightlife: `${formattedLocation} is a family-first suburb - evenings revolve around cinemas, late-night street food, garden walks and the buzz of the Navghar Road market rather than clubs.`,
      schools: `From reputed SSC and CBSE schools to a well-known degree college - ${formattedLocation} has solid educational options for every stage.`,
      hospitals: `From multi-speciality hospitals to 24-hour clinics - here's where ${formattedLocation} residents go for medical care.`,
      banks: `All major Indian banks are well-represented across ${formattedLocation} - branches along Navghar Road, Indralok, Golden Nest and the station belt.`,
      markets: `Beyond the showrooms - the sabzi mandis, township markets and local street bazaars that keep ${formattedLocation} running every day.`,
      employers: `${formattedLocation} is largely residential, with local trade, retail and small industry driving employment, plus easy commutes to nearby job hubs.`
    };
    return descs[id] || description || `Explore ${formattedLocation} with Mumbai96.`;
  };

  const displayTitle = getSectionTitle();
  const displayLabel = getSectionLabel();
  const displayDescription = getSectionDescription();

  return (
    <section className={styles.guideSec} id={id}>
      <div className={styles.con}>
        <p className={styles.sl}>{displayLabel}</p>

        <h2 className={styles.st}>
          {displayTitle} in <em>{formattedLocation.split(" ").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ")}</em>
        </h2>

        <p className={styles.sd}>{displayDescription}</p>

        {/* TAGS (only for food) */}
        {displayTags.length > 0 && (
          <div className={styles.foodTags}>
            {displayTags.map((tag, i) => (
              <span className={styles.foodTag} key={i}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CARD VIEW (Places) */}
        {variant === "card" && 
         id !== "schools" && 
         id !== "hospitals" && 
         id !== "banks" && 
         id !== "markets" && 
         id !== "employers" && (
          <div className={styles.guideGrid}>
            {displayItems.map((item, index) => (
              <div className={styles.guideCard} key={index}>
                <div className={styles.guideCardPh}>{getIcon(item)}</div>
                <div className={styles.guideCardBody}>
                  {item.tag && <div className={styles.guideCardTag}>{item.tag}</div>}
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIST VIEW (Food / Nightlife) */}
        {variant === "list" && 
         id !== "schools" && 
         id !== "hospitals" && 
         id !== "banks" && 
         id !== "markets" && 
         id !== "employers" && (
          <div className={styles.listGrid}>
            {displayItems.map((item, index) => (
              <div className={styles.listItem} key={index}>
                <span className={styles.liIcon}>{getIcon(item)}</span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SCHOOL VIEW (Schools - exactly like HTML) */}
        {id === "schools" && (
          <div className={styles.schoolList}>
            {displayItems.map((item, index) => (
              <div className={styles.schoolItem} key={index}>
                <img src={item.image} alt={item.name} width="200" height="200" />
                <div className={styles.schoolItemBody}>
                  <h3>{item.name}</h3>
                   <div className={styles.schoolMetaRow}>
    {item.location && <span>{item.location}</span>}
    {item.badge && <div className={styles.schoolBadge}>{item.badge}</div>}
  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HOSPITAL VIEW (Hospitals - exactly like HTML) */}
        {id === "hospitals" && (
          <div className={styles.hospGrid}>
            {displayItems.map((item, index) => (
              <div className={styles.hospCard} key={index}>
                <img src={item.image} alt={item.name} width="400" height="240" />
                <div className={styles.hospCardBody}>
                  <div className={styles.hospType}>{item.type}</div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BANK VIEW (Banks - exactly like HTML) */}
        {id === "banks" && (
          <div className={styles.bankGrid}>
            {displayItems.map((item, index) => (
              <div className={styles.bankChip} key={index}>
                <img src={item.image} alt={item.name} width="300" height="180" />
                {item.name}
              </div>
            ))}
          </div>
        )}

        {/* MARKET VIEW (Markets - exactly like HTML) */}
        {id === "markets" && (
          <div className={styles.marketGrid}>
            {displayItems.map((item, index) => (
              <div className={styles.marketCard} key={index}>
                <img src={item.image} alt={item.name} width="600" height="400" />
                <div className={styles.marketOv}></div>
                <div className={styles.marketBody}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPLOYER VIEW (Employers - exactly like HTML) */}
        {id === "employers" && (
          <div className={styles.employerGrid}>
            {displayItems.map((item, index) => (
              <div className={styles.employerCard} key={index}>
                <img src={item.image} alt={item.name} width="400" height="220" />
                <div className={styles.employerCardBody}>
                  <span className={styles.employerSector}>{item.sector}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TIP BOX (Nightlife only) */}
        {displayTips && (
          <div className={styles.tipBox}>
            <h4>{`After Hours in ${formattedLocation}`}</h4>
            <ul>
              {displayTips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}