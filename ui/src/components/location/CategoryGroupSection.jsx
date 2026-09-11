
  // CategoryGroupSection.js
  import styles from './locationPage.module.css';

  export default function CategoryGroupSection({ group, location }) {
    if (!group || !group.categories || group.categories.length === 0)
      return null;

    const formattedLocation = location?.replace(/-/g, " ") || "Bhayandar East";

    // Function to get icon
    const getEmoji = (cat) => {
      if (cat.emoji) return cat.emoji;
      // Default emojis based on category name
      const emojis = {
        "Gujarati Restaurants": "🍛",
        "Punjabi Restaurants": "🍖",
        "South Indian Restaurants": "🥘",
        "Street Food": "🌮",
        "Cafes & Coffee Shops": "☕",
        "Bakeries": "🥐",
        "Ice Cream Shops": "🍦",
        "Juice Shops": "🥤",
        "Real Estate Agents": "🏠",
        "Flats for Rent": "🏢",
        "Flats for Sale": "🔑",
        "PG Accommodation": "🛏️",
        "Office Space for Rent": "🏬",
        "Clothing Stores": "👗",
        "Jewellery Shops": "💍",
        "Mobile Phone Shops": "📱",
        "Electronics Stores": "💻",
        "Grocery Stores": "🛒",
        "Hospitals": "🏥",
        "Dentists": "🦷",
        "Gynecologists": "👩‍⚕️",
        "Pediatricians": "🧒",
        "Diagnostic Centres": "🔬",
        "Plumbers": "🪠",
        "Electricians": "⚡",
        "Painters": "🎨",
        "Carpenters": "🪚",
        "Pest Control": "🐛",
        "Car Dealers": "🚗",
        "Bike Dealers": "🛵",
        "Car Repair Shops": "🔧",
        "Bike Repair Shops": "🛠️",
        "Car Wash Services": "🚿"
      };
      return emojis[cat.name] || "📌";
    };

    // Get label and description
    // const getLabel = () => {
    //   const labels = {
    //     restaurants: "Food, Real Estate & Health",
    //     real_estate: "Food, Real Estate & Health",
    //     shopping: "Clinics, Shopping & Home Services",
    //     home_services: "Clinics, Shopping & Home Services",
    //     electronics_repair: "Clinics, Shopping & Home Services",
    //     hospitals: "Culture, Spirituality & Medical Specialists",
    //     doctors: "Culture, Spirituality & Medical Specialists",
    //     automotive: "Automobiles, Entertainment & Education",
    //     entertainment: "Automobiles, Entertainment & Education",
    //     spa_beauty: "Wellness, Beauty & Events",
    //     fitness: "Wellness, Beauty & Events",
    //     sports: "Wellness, Beauty & Events",
    //     wedding_events: "Care, Community & Safety",
    //     religion_community: "Care, Community & Safety",
    //     professional_services: "Care, Community & Safety",
    //     coaching: "Repairs, Tutoring & Hospitality",
    //     schools: "Repairs, Tutoring & Hospitality",
    //     childcare: "Repairs, Tutoring & Hospitality",
    //     banks_finance: "Finance, Insurance & Home Decor",
    //     miscellaneous: "Finance, Insurance & Home Decor"
    //   };
    //   return labels[group.key] || group.label;
    // };
    const getLabel = () => {
  const labels = {
    // ✅ YE POSITION LABELS ADD KAREN (merged groups ke liye)
    "pos-0": "Food, Real Estate & Health",
    "pos-1": "Clinics, Shopping & Home Services",
    "pos-2": "Automobiles, Entertainment & Education",
    "pos-3": "Culture, Spirituality & Medical Specialists",
    "pos-4": "Wellness, Beauty & Events",
    "pos-5": "Care, Community & Safety",
    "pos-6": "Repairs, Tutoring & Hospitality",
    "pos-7": "Finance, Insurance & Home Decor",
    // "pos-8": "Miscellaneous",
    
    // ✅ OLD LINES (already hain)
    restaurants: "Food, Real Estate & Health",
    real_estate: "Food, Real Estate & Health",
    cClinics: "Clinics, Shopping & Home Services",
    shopping: "Clinics, Shopping & Home Services",
    home_services: "Clinics, Shopping & Home Services",
    electronics_repair: "Clinics, Shopping & Home Services",
    hospitals: "Culture, Spirituality & Medical Specialists",
    doctors: "Culture, Spirituality & Medical Specialists",
    automotive: "Automobiles, Entertainment & Education",
    entertainment: "Automobiles, Entertainment & Education",
    spa_beauty: "Wellness, Beauty & Events",
    fitness: "Wellness, Beauty & Events",
    sports: "Wellness, Beauty & Events",
    wedding_events: "Care, Community & Safety",
    religion_community: "Care, Community & Safety",
    professional_services: "Care, Community & Safety",
    coaching: "Repairs, Tutoring & Hospitality",
    schools: "Repairs, Tutoring & Hospitality",
    childcare: "Repairs, Tutoring & Hospitality",
    finance_insurance: "Finance, Insurance & Home Decor",
    banks_finance: "Finance, Insurance & Home Decor",
    miscellaneous: "Miscellaneous"
  };
  return labels[group.key] || group.label;
};

    // Get description
    const getDescription = () => {
      const descs = {
// ✅ YE POSITION DESCRIPTIONS ADD KAREN
    "pos-0": `From street food to pharmacies — the everyday essentials in ${formattedLocation}.`,
    "pos-1": `Dental care, retail stores, and home maintenance services in ${formattedLocation}.`,
    "pos-2": `Temples, community events, and specialist doctors serving ${formattedLocation}.`,
    "pos-3": `From car dealers to gaming zones and coaching classes in ${formattedLocation}.`,
    "pos-4": `Salons, gyms, wedding planners and event services in ${formattedLocation}.`,
    "pos-5": `Pet care, elder care, NGOs, security and emergency services in ${formattedLocation}.`,
    "pos-6": `AC repair, exam coaching, PG accommodation and more in ${formattedLocation}.`,
    "pos-7": `CAs, loan providers, insurance, architects and decor stores in ${formattedLocation}.`,
    // "pos-8": `Miscellaneous services in ${formattedLocation}.`,
// old 
        restaurants: `From street food to pharmacies — the everyday essentials in ${formattedLocation}.`,
        real_estate: `From street food to pharmacies — the everyday essentials in ${formattedLocation}.`,
        shopping: `Dental care, retail stores, and home maintenance services in ${formattedLocation}.`,
        home_services: `Dental care, retail stores, and home maintenance services in ${formattedLocation}.`,
        electronics_repair: `Dental care, retail stores, and home maintenance services in ${formattedLocation}.`,
        hospitals: `Temples, community events, and specialist doctors serving ${formattedLocation}.`,
        doctors: `Temples, community events, and specialist doctors serving ${formattedLocation}.`,
        automotive: `From car dealers to gaming zones and coaching classes in ${formattedLocation}.`,
        entertainment: `From car dealers to gaming zones and coaching classes in ${formattedLocation}.`,
        spa_beauty: `Salons, gyms, wedding planners and event services in ${formattedLocation}.`,
        fitness: `Salons, gyms, wedding planners and event services in ${formattedLocation}.`,
        sports: `Salons, gyms, wedding planners and event services in ${formattedLocation}.`,
        wedding_events: `Pet care, elder care, NGOs, security and emergency services in ${formattedLocation}.`,
        religion_community: `Pet care, elder care, NGOs, security and emergency services in ${formattedLocation}.`,
        professional_services: `Pet care, elder care, NGOs, security and emergency services in ${formattedLocation}.`,
        coaching: `AC repair, exam coaching, PG accommodation and more in ${formattedLocation}.`,
        schools: `AC repair, exam coaching, PG accommodation and more in ${formattedLocation}.`,
        childcare: `AC repair, exam coaching, PG accommodation and more in ${formattedLocation}.`,
        finance_insurance: "Finance, Insurance & Home Decor", // ✅ यह add करें
        banks_finance: `CAs, loan providers, insurance, architects and decor stores in ${formattedLocation}.`,
        miscellaneous: `CAs, loan providers, insurance, architects and decor stores in ${formattedLocation}.`
      };
      return descs[group.key] || `Explore ${group.label} in ${formattedLocation}.`;
    };

    const displayLabel = getLabel();
    const displayDescription = getDescription();

    return (
      <section className={styles.catGridSec} id={`cat-group-${group.key}`}>
        <div className={styles.con}>
          {/* <p className={styles.sl}>
            {group.icon} {displayLabel}
          </p> */}
          <h2 className={styles.category_st}>
            {displayLabel} 
          </h2>
          <p className={styles.category_sd}>
            {displayDescription}
          </p>

          <div className={styles.catGrid}>
            {group.categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/${location}/${cat.slug}`}
                className={styles.catCard}
                title={`${cat.name} in ${formattedLocation}`}
              >
                <span className={styles.catEmoji}>{getEmoji(cat)}</span>
                <span className={styles.catName}>{cat.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }