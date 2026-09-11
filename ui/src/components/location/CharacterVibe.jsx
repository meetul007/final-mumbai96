
import styles from "./locationPage.module.css";

const DUMMY_ITEMS = [
  { keyword: "Family-First" },
  { keyword: "Affordable" },
  { keyword: "Township Living" },
  { keyword: "Diverse Community" },
  { keyword: "Bustling Markets" },
  { keyword: "Safe & Residential" },
  { keyword: "Fast Developing" },
];

const DUMMY_DESCRIPTION =
  "<p>Bhayandar East is a busy, value-driven township suburb. Mornings begin with the rush to Bhayandar station, snack shops open early, and Navghar Road hums with shoppers through the day. It's affordable Mumbai living - bigger homes for the money, large townships, and a denser, more bustling feel than the western side.</p><p>The area has a diverse mix - Gujarati, North Indian, Marathi and a growing migrant population drawn by affordable housing. Festivals, society events and community markets are central to life here, giving Bhayandar East a lively, neighbourly energy.</p>";
const DUMMY_IMAGE =
  "https://images.unsplash.com/photo-1561612217-4f5d0b4c6ea8?w=800&q=80";

export default function CharacterVibe({ location, items, description, image }) {
  const formattedLocation = location?.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());

  const resolvedItems = items && items.length > 0 ? items : DUMMY_ITEMS;
  const resolvedDescription = description || DUMMY_DESCRIPTION;
  const resolvedImage = image || DUMMY_IMAGE;

  return (
    <section className={styles.guideSec} id="character-vibe">
      <div className={styles.con}>
        <p className={styles.sl}>Character &amp; Vibe</p>
        <h2 className={styles.st}>
          What Makes <em>{formattedLocation}</em> Tick
        </h2>
        <p className={styles.sd}>
          An honest snapshot — the energy, the people, the pace. The kind of
          thing no other directory tells you.
        </p>

        <div className={styles.vibeWrap}>
          <div className={styles.vibeImg}>
            <img
              src={resolvedImage}
              alt={`${formattedLocation} community street life`}
            />
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: resolvedDescription }}
            ></div>
            <div className={styles.vibeTags}>
              {resolvedItems.map((item, i) => (
                <span className={styles.vibeTag} key={i}>
                  {item.keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}