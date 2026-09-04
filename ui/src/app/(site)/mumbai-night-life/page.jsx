// import "./style.css";

const MumbaiNightLife = () => {
  const areas = [
    {
      title: "Bandra West",
      tag: "Indie & Chill",
      desc: "Pubs, indie bars, live music cafés",
      img: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=600&q=80",
      alt: "Bandra West nightlife — pubs and indie bars",
    },
    {
      title: "Lower Parel",
      tag: "Premium",
      desc: "Premium clubs, rooftops, fine dining",
      img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
      alt: "Lower Parel clubs and premium nightlife Mumbai",
    },
    {
      title: "Andheri West",
      tag: "Budget-Friendly",
      desc: "Casual bars, sports bars, lounges",
      img: "https://images.unsplash.com/photo-1573055418049-c8e27d207f54?w=600&q=80",
      alt: "Andheri West bars and lounges Mumbai nightlife",
    },
    {
      title: "Juhu",
      tag: "Beachside",
      desc: "Beach bars, sea-view dining, celebs",
      img: "https://images.unsplash.com/photo-1505559765785-50e1be741a8d?w=600&q=80",
      alt: "Juhu beach nightlife and restaurants Mumbai",
    },
  ];

  const venues = [
    {
      type: "Cocktail Bars",
      title: "Craft Cocktail Bars",
      desc: "Curated cocktail menus, expert mixologists and intimate settings make Mumbai's craft bars a favourite for date nights and small groups.",
      img: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&q=80",
      alt: "Cocktail bar nightlife Mumbai",
      tags: ["Bandra", "Lower Parel", "Colaba"],
    },
    {
      type: "Sports Bars",
      title: "Sports Bars & Pubs",
      desc: "IPL and cricket match screenings, cold beer and a crowd that knows how to cheer — Mumbai's sports bar scene is legendary on match nights.",
      img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80",
      alt: "Sports bar Mumbai pub watching cricket",
      tags: ["Andheri", "Powai", "Thane"],
    },
    {
      type: "Late Night Food",
      title: "Late Night Restaurants",
      desc: "Post-club hunger hits hard — Mumbai doesn't disappoint with 24-hour dhabas, late-night biryani spots and after-hours cafés serving till 4 AM.",
      img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=600&q=80",
      alt: "Late night food Mumbai street food after dark",
      tags: ["Mohammed Ali Road", "Juhu", "Worli"],
    },
  ];

  const videos = [
    {
      src: "https://www.youtube.com/embed/KDSSCp12UPg",
      title: "Mumbai Nightlife Guide — Best Bars and Clubs",
      heading: "Mumbai Nightlife Tour",
      desc: "A visual walkthrough of Mumbai's best bars, clubs and rooftop spots across the city",
    },
    {
      src: "https://www.youtube.com/embed/8NJD1nKfFUQ",
      title: "Bandra West nightlife guide Mumbai bars",
      heading: "Bandra West Nightlife — Complete Guide",
      desc: "Exploring Bandra's pub and bar scene — India's favourite urban neighbourhood after dark",
    },
  ];

  const tips = [
    {
      icon: "🚕",
      title: "Always Use Registered Cabs",
      desc: "Use Ola or Uber for all late-night travel. Never board unmarked taxis after midnight. Share your live location with someone you trust.",
    },
    {
      icon: "👥",
      title: "Go in Groups",
      desc: "Mumbai's nightlife is best experienced in groups — and it's safer too. Avoid leaving venues alone after 1 AM, especially in less-crowded areas.",
    },
    {
      icon: "💳",
      title: "Limit Cash, Use Cards",
      desc: "Most venues accept UPI, cards and digital wallets. Carry minimal cash. Keep your phone charged — you'll need it for Ola/Uber and maps.",
    },
    {
      icon: "🍺",
      title: "Know Your Limits",
      desc: "Pace yourself — Mumbai's party culture can be intense. Designated drivers are always a good idea; many services like DriveMySafe are available in the city.",
    },
    {
      icon: "📱",
      title: "Check Closing Times",
      desc: "Alcohol service ends at 1:30 AM (weekdays) and 3 AM (weekends). Plan your transport before last orders — Ola/Uber surge pricing kicks in at peak exit times.",
    },
    {
      icon: "🆔",
      title: "Carry Valid ID",
      desc: "Most venues require a government-issued photo ID at the door — Aadhaar, Passport or Driving Licence. Age limit is 21+ for alcohol consumption in Maharashtra.",
    },
  ];

  const faqs = [
    {
      q: "What are the best nightlife areas in Mumbai?",
      a: "Bandra West (indie pubs, artsy bars), Lower Parel (premium clubs, hotel rooftops), Andheri West (casual bars, budget-friendly), Juhu (beach-side, celeb-spotting), Colaba (heritage pubs, jazz bars) and BKC (corporate crowd, cocktail bars). Each area has a distinct vibe — pick based on your crowd and budget.",
    },
    {
      q: "What time do clubs and bars close in Mumbai?",
      a: "Most Mumbai venues serve alcohol until 1:30 AM on weekdays and 3 AM on weekends. Some premium clubs with special licences extend to 5 AM. Kitchen timings vary — always call ahead to confirm.",
    },
    {
      q: "Is Mumbai nightlife safe for solo women and tourists?",
      a: "Mumbai is generally considered one of India's safest cities for nightlife. Stick to well-known venues, use Ola/Uber for transport, and stay in groups after midnight. Reputed venues in Bandra, Lower Parel and Colaba have good security and staff trained in crowd management.",
    },
    {
      q: "What is the legal drinking age in Mumbai?",
      a: "The legal drinking age in Maharashtra (and thus Mumbai) is 21 years. Most venues will ask for photo ID at the entrance. Carry your Aadhaar, Passport or Driving Licence.",
    },
    {
      q: "How much does a night out in Mumbai cost?",
      a: "It varies widely. A casual pub night in Andheri costs ₹1000–2000 per person. A night at a premium Lower Parel club with entry, drinks and late-night food can cost ₹4000–8000. Rooftop cocktail bars average ₹1500–3000 per person for drinks.",
    },
  ];

  return (
    <>
      <section className="hero" aria-label="Mumbai Nightlife hero">
        {/* Background Image Layer */}
        <div
          className="hero-bg"
          role="img"
          aria-label="Mumbai nightlife city skyline at night"
        />

        {/* Overlay */}
        <div className="hero-ov" />

        {/* Content */}
        <div className="hero-c">
          <div className="badge">
            <span></span>
            Travel · Mumbai Nightlife
          </div>

          <h1>
            Mumbai <em>Nightlife</em> Guide 2026
          </h1>

          <p className="hero-sub">
            From rooftop bars in Bandra to underground clubs in Lower Parel —
            the definitive guide to Mumbai's after-dark scene, curated by
            Mumbaikars for Mumbaikars.
          </p>

          <div className="hero-pills">
            {[
              "🍹 Rooftop Bars",
              "🎵 Live Music",
              "🕺 Premium Clubs",
              "🌙 Late Night Food",
              "🍺 Pub Crawls",
            ].map((pill, i) => (
              <span key={i} className="pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>
      <nav className="bc" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span> › </span>

        <a href="/travel" style={{ color: "rgba(255,255,255,.45)" }}>
          Travel
        </a>

        <span> › </span>

        <span>Mumbai Nightlife</span>
      </nav>

      <section className="areas">
        <div className="con">
          <p className="sl">Nightlife by Area</p>

          <h2 className="st">
            Mumbai&apos;s Best <em>Nightlife Neighbourhoods</em>
          </h2>

          <p className="sd">
            Each area of Mumbai has its own after-dark personality. Here&apos;s
            where to go based on your vibe.
          </p>

          <div className="area-grid">
            {areas.map((area, i) => (
              <div key={i} className="area-card">
                <img src={area.img} alt={area.alt} loading="lazy" />

                <div className="area-card-ov" />

                <div className="area-card-body">
                  <div className="area-tag">{area.tag}</div>
                  <h3>{area.title}</h3>
                  <p>{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cs">
        <div className="con">
          <div className="cg">
            {/* IMAGE */}
            <div className="ci">
              <img
                src="https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?w=800&q=80"
                alt="Rooftop bar Mumbai with city skyline view at night"
                loading="lazy"
              />
              <span className="it">Rooftop Bars</span>
            </div>

            {/* CONTENT */}
            <div className="cb">
              <p className="sl">Sky-High Sipping</p>

              <h3>Best Rooftop Bars in Mumbai</h3>

              <p>
                Nothing beats Mumbai&apos;s city skyline with a cocktail in
                hand. The city&apos;s rooftop bar scene has exploded in recent
                years — from swanky hotel terraces in Lower Parel to indie
                rooftops in Bandra with skyline views and craft beer menus.
              </p>

              <p>
                Mumbai&apos;s best rooftop venues combine great drinks with the
                city&apos;s electric energy — especially on weekends when the
                whole city seems to light up at once. Most require reservations
                on weekends; book ahead on Dineout or Zomato.
              </p>

              <div className="tb">
                <h4>🔥 Top Rooftop Bar Areas in Mumbai</h4>

                <ul>
                  <li>Lower Parel — premium hotel rooftops, sea views</li>
                  <li>
                    Bandra-Kurla Complex (BKC) — corporate crowd, cocktail bars
                  </li>
                  <li>Bandra West — indie terraces, fairy lights, live DJ</li>
                  <li>
                    South Mumbai (Colaba, Marine Drive) — heritage views, sea
                    breeze
                  </li>
                  <li>Worli — Bandra-Worli Sea Link views from rooftop bars</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cs">
        <div className="con">
          <div className="cg r">
            {/* IMAGE */}
            <div className="ci">
              <img
                src="https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80"
                alt="Premium nightclub Mumbai dance floor"
                loading="lazy"
              />
              <span className="it">Clubs</span>
            </div>

            {/* CONTENT */}
            <div className="cb">
              <p className="sl">Dance All Night</p>

              <h3>Best Clubs in Mumbai — 2026 Guide</h3>

              <p>
                Mumbai&apos;s club scene is one of India&apos;s most vibrant — a
                mix of international DJs, Bollywood nights, EDM events and
                underground house music parties. The city has a venue for every
                genre and every wallet.
              </p>

              <p>
                Premium clubs in Lower Parel and BKC dominate the weekend scene
                — expect cover charges ranging from ₹500 to ₹3000 depending on
                the event and guest list. Bandra and Andheri offer more
                accessible options for a casual night out without the premium
                dress codes.
              </p>

              <div className="tb">
                <h4>🔥 What to expect at Mumbai clubs</h4>

                <ul>
                  <li>Most clubs open by 10 PM, peak hours 11 PM–2 AM</li>
                  <li>
                    Alcohol served until 1:30 AM (weekdays), 3 AM (weekends)
                  </li>
                  <li>Dress code strictly enforced at premium venues</li>
                  <li>Cover charges typically include 1–2 drinks</li>
                  <li>Guest list (via Insider / BookMyShow) gets discounts</li>
                  <li>Ola/Uber surge pricing after 1 AM — plan your exit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs">
        <div className="con">
          <div className="cg">
            {/* IMAGE */}
            <div className="ci">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"
                alt="Live music venue pub Mumbai nightlife"
                loading="lazy"
              />
              <span className="it">Live Music</span>
            </div>

            {/* CONTENT */}
            <div className="cb">
              <p className="sl">Indie & Live</p>

              <h3>Live Music Venues & Casual Pubs in Mumbai</h3>

              <p>
                Mumbai has a thriving indie music scene that often gets
                overshadowed by the big clubs — but for many Mumbaikars, these
                intimate gig venues in Bandra and Andheri are the real heart of
                the city&apos;s nightlife. From jazz bars in Colaba to indie
                rock nights in Versova, the live music calendar is packed
                year-round.
              </p>

              <p>
                Check platforms like Insider.in and BookMyShow regularly for
                upcoming gigs. Weekday shows are cheaper and less crowded — a
                great option for music lovers who prefer the music over the
                crowd.
              </p>

              <div className="tb">
                <h4>🔥 Best areas for live music in Mumbai</h4>

                <ul>
                  <li>Bandra West — indie pubs, open mics, jazz nights</li>
                  <li>Colaba — jazz bars and heritage pub culture</li>
                  <li>Andheri West — comedy nights, rock venues</li>
                  <li>Versova — artist community, artsy cafés with gigs</li>
                  <li>Dadar — Marathi music and cultural performances</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="venues-sec">
        <div className="con">
          <p className="sl">After Dark</p>

          <h2 className="st" style={{ color: "#fff" }}>
            Mumbai&apos;s Iconic{" "}
            <em style={{ color: "#d4af37" }}>Nightlife Spots</em>
          </h2>

          <p className="sd">
            The venues Mumbaikars keep coming back to — by category and vibe.
          </p>

          <div className="venue-grid">
            {venues.map((venue, i) => (
              <div key={i} className="venue-card">
                <img src={venue.img} alt={venue.alt} loading="lazy" />

                <div className="venue-body">
                  <div className="vtype">{venue.type}</div>

                  <h4>{venue.title}</h4>

                  <p>{venue.desc}</p>

                  <div className="venue-meta">
                    {venue.tags.map((tag, idx) => (
                      <span key={idx} className="venue-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="video-sec">
        <div className="con">
          <p className="sl">See Mumbai After Dark</p>

          <h2 className="st">
            Mumbai Nightlife — <em>Watch & Explore</em>
          </h2>

          <p className="sd">
            Get a feel for Mumbai&apos;s nightlife scene before you head out —
            curated videos from the city after dark.
          </p>

          <div className="video-grid">
            {videos.map((video, i) => (
              <div key={i}>
                <div className="vid-wrap">
                  <iframe
                    src={video.src}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="vid-meta">
                  <h4>{video.heading}</h4>
                  <p>{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="tips-dark">
        <div className="con">
          <p className="sl" style={{ color: "#d4af37" }}>
            Stay Safe, Stay Smart
          </p>

          <h2 className="st" style={{ color: "#fff" }}>
            Mumbai Nightlife <em style={{ color: "#d4af37" }}>Safety Tips</em>
          </h2>

          <p className="sd">
            Mumbai is one of India&apos;s safest cities for nightlife — but
            smart habits make the night better for everyone.
          </p>

          <div className="tips-grid">
            {tips.map((tip, i) => (
              <div key={i} className="tip-c">
                <span className="ic">{tip.icon}</span>

                <h4>{tip.title}</h4>

                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="faq-sec">
        <div className="con">
          <p className="sl">Frequently Asked Questions</p>

          <h2 className="st">
            Mumbai Nightlife — <em>Common Questions</em>
          </h2>

          <div className="fq-list">
            {faqs.map((item, i) => (
              <div key={i} className="fqi">
                <div className="fqq">{item.q}</div>

                <div className="fqa">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="prose">
        <div className="con">
          <div className="prose-i">
            <h2>Mumbai Nightlife — The Complete 2026 Guide</h2>

            <p>
              Mumbai never really sleeps — and its nightlife is a reflection of
              the city itself: diverse, energetic, democratic and endlessly
              evolving. From the colonial-era pubs of Colaba to the rooftop
              cocktail culture of Lower Parel, from Bollywood-soundtrack-heavy
              clubs in Andheri to intimate jazz bars in Bandra, there is a
              version of Mumbai nightlife for every mood and every pocket.
            </p>

            <h3>How Mumbai&apos;s nightlife scene evolved</h3>

            <p>
              Mumbai&apos;s transformation into a world-class nightlife city
              happened gradually — beginning with the pub culture of the 1990s
              in Colaba and growing rapidly through the 2000s as Lower
              Parel&apos;s textile mills were redeveloped into premium
              entertainment zones. Today, the city has one of Asia&apos;s most
              sophisticated bar scenes, rivalling Bangkok and Singapore in terms
              of cocktail creativity and venue variety.
            </p>

            <h3>Seasonal highlights</h3>

            <p>
              Mumbai&apos;s nightlife peaks between October and March — the
              city&apos;s winter months when the weather is ideal for rooftop
              and outdoor venues. The monsoon (June–September) shifts the scene
              indoors, with cosy bar nights and rainy-evening jazz sessions
              becoming city favourites. New Year&apos;s Eve and Diwali see the
              biggest events of the year, with venues booking out weeks in
              advance.
            </p>

            <h3>Finding events in Mumbai</h3>

            <p>
              The best sources for Mumbai nightlife events are Insider.in,
              BookMyShow and dedicated venue Instagram pages. Facebook groups
              like &quot;Mumbai Nightlife&quot; and WhatsApp communities for
              specific venues are also surprisingly active and well-curated.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MumbaiNightLife;
