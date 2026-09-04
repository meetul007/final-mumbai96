// import "./style.css";

const ForiegnTourist = () => {
  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Foreign Tourists Mumbai Guide hero">
        <div
          className="hero-bg"
          role="img"
          aria-label="International tourists at Gateway of India Mumbai"
        ></div>
        <div className="hero-ov"></div>

        <div className="hero-c">
          <div className="badge">
            <span></span> Travel · International Visitors
          </div>

      <h1>
            Mumbai for <em>Foreign Tourists</em>
          </h1>
          <p className="hero-sub">
            Welcome to India's Maximum City. Everything international visitors
            need to know before, during and after their Mumbai trip — visa,
            safety, transport, money, culture and the best experiences the city
            has to offer.
          </p>
          <div className="hero-pills">
            <span className="pill">✈️ Visa & Entry</span>
            <span className="pill">🛡️ Safety Tips</span>
            <span className="pill">💰 Money Guide</span>
            <span className="pill">🍛 Must-Eat Food</span>
            <span className="pill">🗺️ Top Attractions</span>
          </div>
        </div>
      </section>
      {/* BREADCRUMB */}
      <nav className="bc" aria-label="Breadcrumb">
        <a href="/">Home</a> › <a href="/travel">Travel</a> › Foreign Tourists
      </nav>
      {/* ESSENTIALS */}
      <section className="essentials">
        <div className="con">
          <p className="sl">Before You Arrive</p>
          <h2 className="st">
            Essential Info for <em>International Visitors</em>
          </h2>
          <div className="ess-grid">
            <div className="ess-card">
              <span className="ic">📋</span>
              <h4>Visa Required</h4>
              <p>
                Most nationalities need e-Visa or stamp visa. Apply at
                indianvisaonline.gov.in
              </p>
            </div>
            <div className="ess-card">
              <span className="ic">✈️</span>
              <h4>Airport: BOM</h4>
              <p>
                Chhatrapati Shivaji Maharaj International Airport — Terminal 2
                for international flights
              </p>
            </div>
            <div className="ess-card">
              <span className="ic">💱</span>
              <h4>Currency: INR</h4>
              <p>
                Indian Rupee. Exchange at airport or authorised changers. 1 USD
                ≈ ₹94–96 (2026)
              </p>
            </div>
            <div className="ess-card">
              <span className="ic">🌡️</span>
              <h4>Climate</h4>
              <p>
                Tropical. Best Oct–Feb (22–30°C). Monsoon June–Sep. Very humid
                May–Sep.
              </p>
            </div>
            <div className="ess-card">
              <span className="ic">🔌</span>
              <h4>Power: 230V</h4>
              <p>
                Type C/D/M plugs. 230V / 50Hz. Bring a universal travel adapter.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* VISA SECTION */}
      <section className="cs">
        <div className="con">
          <div className="cg">
            <div className="ci">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
                alt="Mumbai Chhatrapati Shivaji Maharaj International Airport Terminal 2"
                loading="lazy"
              />
              <span className="it">Arrival</span>
            </div>
            <div className="cb">
              <p className="sl">Getting Here</p>
              <h3>Visa, Entry & Airport Arrival</h3>
              <p>
                Almost all foreign nationals require a visa to enter India. The
                Indian e-Visa is available for citizens of over 166 countries —
                apply online at the official Indian government e-Visa portal
                (indianvisaonline.gov.in) at least 4 business days before
                travel. Tourist e-Visas are available for 30 days, 1 year and 5
                years.
              </p>
              <p>
                Mumbai's international airport — Chhatrapati Shivaji Maharaj
                International Airport (BOM) — is one of India's busiest. All
                international flights use Terminal 2 (T2). The airport is in
                Andheri East, about 30 km from South Mumbai (Colaba). Allow
                45–75 minutes by cab to reach central hotels depending on
                traffic.
              </p>
              <div className="tb">
                <h4>✅ Arrival checklist for international tourists</h4>
                <ul>
                  <li>Valid passport + printed e-Visa approval (or visa sticker)</li>
                  <li>Filled immigration form (available on aircraft or at airport)</li>
                  <li>Hotel booking confirmation</li>
                  <li>Return flight booking confirmation</li>
                  <li>Some INR cash for immediate needs (exchange at airport)</li>
                  <li>Install Ola/Uber app before landing — easiest airport transfer</li>
                </ul>
              </div>
              <div className="warning-box">
                <h4>⚠️ Avoid Unofficial Taxi Touts</h4>
                <p>
                  At Mumbai Airport, ignore anyone approaching you with "taxi,
                  taxi" outside the arrival hall. Use the official pre-paid
                  taxi counters inside the terminal or book Ola/Uber via app.
                  Always safer, always cheaper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SAFETY */}
      <section className="cs">
        <div className="con">
          <div className="cg r">
            <div className="ci">
              <img
                src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80"
                alt="Marine Drive Mumbai safe area for tourists at night"
                loading="lazy"
              />
              <span className="it">Safety</span>
            </div>
            <div className="cb">
              <p className="sl">Your Safety in Mumbai</p>
              <h3>Is Mumbai Safe for International Tourists?</h3>
              <p>
                Mumbai is generally considered one of India's safest cities for
                international tourists, and significantly safer than many other
                major global cities for travellers. The city has a high police
                presence in tourist areas, a relatively tolerant social culture
                and a population well-accustomed to welcoming visitors from
                around the world.
              </p>
              <p>
                Petty theft and scams targeting tourists exist, as in any major
                city — the most common include overcharging by unofficial taxi
                drivers, fake tour guides near tourist landmarks and currency
                exchange scams. Being informed is your best defence.
              </p>
              <div className="tb">
                <h4>✅ Safety tips for international visitors</h4>
                <ul>
                  <li>Always use Ola / Uber — never unmarked cabs</li>
                  <li>Keep a copy of your passport; leave original in hotel safe</li>
                  <li>Avoid flashing expensive gadgets in crowded markets</li>
                  <li>Stay in well-lit, busy areas after midnight</li>
                  <li>Trust your gut — if something feels off, walk away</li>
                  <li>Know emergency numbers: Police 100, Ambulance 108</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DO & DON'T */}
      <section className="dodont">
        <div className="con">
          <p className="sl">Cultural Etiquette</p>
          <h2 className="st">
            Mumbai Culture — <em>Dos & Don'ts</em>
          </h2>
          <p className="sd">
            Mumbai is a cosmopolitan city with a rich, layered culture. A few
            simple guidelines will help you connect with locals and avoid
            unintentional offence.
          </p>
          <div className="dd-grid">
            <div className="dd-card do">
              <h4>✅ Do This in Mumbai</h4>
              <ul>
                <li>Remove shoes before entering temples, mosques and many homes</li>
                <li>Dress modestly at religious sites — cover shoulders and knees</li>
                <li>Use your right hand when giving or receiving money, gifts or food</li>
                <li>Learn a few words of Hindi or Marathi — Mumbaikars truly appreciate it</li>
                <li>Ask before photographing local people, especially at religious sites or markets</li>
                <li>Bargain politely at street markets — it's expected and part of the culture</li>
                <li>Try street food — it's what makes Mumbai, Mumbai</li>
                <li>Carry small denominations — street food stalls rarely have change for large notes</li>
              </ul>
            </div>
            <div className="dd-card dont">
              <h4>✕ Avoid in Mumbai</h4>
              <ul>
                <li>Do not point feet towards religious icons or elders — considered disrespectful</li>
                <li>Do not photograph military installations, airports or border areas</li>
                <li>Avoid public displays of affection in conservative areas and religious sites</li>
                <li>Do not accept food or drinks from strangers on trains or public spaces</li>
                <li>Don't change money with unofficial street-side money changers</li>
                <li>Do not enter private areas of temples or mosques without invitation</li>
                <li>Avoid discussing religion or politics with strangers in public</li>
                <li>Don't ignore the monsoon — flash floods can disrupt travel rapidly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="money-sec">
        <div className="con">
          <p className="sl" style={{ color: "var(--gold)" }}>
            Money & Payments
          </p>
          <h2 className="st" style={{ color: "#fff" }}>
            Handling Money in <em style={{ color: "var(--gold)" }}>Mumbai</em>
          </h2>
          <p className="sd">
            India is rapidly moving cashless — but having some INR cash remains
            essential for international tourists.
          </p>
          <div className="m-grid">
            <div className="m-card">
              <span className="mic">💵</span>
              <h4>Cash & Exchange</h4>
              <p>
                Exchange at Mumbai Airport (Terminal 2) for convenience on
                arrival, or at authorised money changers in tourist areas for
                slightly better rates. Avoid street-side exchange.
              </p>
              <span className="m-tag">Recommended</span>
            </div>
            <div className="m-card">
              <span className="mic">💳</span>
              <h4>International Cards</h4>
              <p>
                Visa and Mastercard accepted at hotels, restaurants and major
                shops. Forex charges apply — check with your bank. Carry some
                cash for street food, autos and small vendors.
              </p>
              <span className="m-tag">Widely Accepted</span>
            </div>
            <div className="m-card">
              <span className="mic">📱</span>
              <h4>UPI & Digital Payments</h4>
              <p>
                India's UPI payment system is near-universal in Mumbai but
                typically requires an Indian bank account. Some apps now support
                international accounts — check before travelling.
              </p>
              <span className="m-tag">For Locals Mainly</span>
            </div>
          </div>
        </div>
      </section>
      <section className="attr-sec">
        <div className="con">
          <p className="sl">See & Do</p>
          <h2 className="st">
            Top Attractions for <em>International Visitors</em>
          </h2>
          <p className="sd">
            The Mumbai experiences that make it onto every international
            traveller's bucket list — with insider context from Mumbai96.
          </p>
          <div className="attr-grid">
            <div className="attr-card">
              <img
                src="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80"
                alt="Gateway of India Mumbai top tourist attraction"
                loading="lazy"
              />
              <div className="attr-body">
                <span className="attr-tag">Must-Visit · Free</span>
                <h3>Gateway of India & Harbour Cruise</h3>
                <p>
                  Start every Mumbai visit here. Take the ferry to Elephanta
                  Caves. Best at dawn or dusk when the harbour lights up. Free
                  to visit; ferry tickets from ₹200.
                </p>
              </div>
            </div>
            <div className="attr-card">
              <img
                src="https://images.unsplash.com/photo-1574502124654-c34cde16ffdb?w=600&q=80"
                alt="CSMT railway station heritage building Mumbai"
                loading="lazy"
              />
              <div className="attr-body">
                <span className="attr-tag">UNESCO Heritage</span>
                <h3>Chhatrapati Shivaji Maharaj Terminus</h3>
                <p>
                  Visit early morning when it's less crowded — see the Victorian
                  Gothic architecture and watch thousands of Mumbaikars pour
                  through India's busiest station.
                </p>
              </div>
            </div>
            <div className="attr-card">
              <img
                src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80"
                alt="Elephanta Caves UNESCO Mumbai ferry heritage"
                loading="lazy"
              />
              <div className="attr-body">
                <span className="attr-tag">UNESCO Caves</span>
                <h3>Elephanta Island Caves</h3>
                <p>
                  A 65-minute ferry from Gateway of India to this ancient island
                  of rock-cut Shiva temples. Open Tue–Sun. Allow a half day.
                  Ferries from ₹250 return.
                </p>
              </div>
            </div>
            <div className="attr-card">
              <img
                src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&q=80"
                alt="Marine Drive sunset sea Mumbai promenade"
                loading="lazy"
              />
              <div className="attr-body">
                <span className="attr-tag">Iconic Promenade</span>
                <h3>Marine Drive at Sunset</h3>
                <p>
                  Watch Mumbai's famous sunset over the Arabian Sea from this
                  3.6 km arc. Return at 9 PM to see the city's skyline lit up —
                  the "Queen's Necklace" in full glory.
                </p>
              </div>
            </div>
            <div className="attr-card">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
                alt="Dharavi Mumbai community tour social enterprise"
                loading="lazy"
              />
              <div className="attr-body">
                <span className="attr-tag">Cultural Immersion</span>
                <h3>Dharavi — Responsible Tours</h3>
                <p>
                  Book a responsible guided tour of Dharavi through operators
                  like Reality Tours. An eye-opening, respectful introduction to
                  one of Asia's most entrepreneurial communities.
                </p>
              </div>
            </div>
            <div className="attr-card">
              <img
                src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80"
                alt="Juhu Beach Mumbai street food sunset"
                loading="lazy"
              />
              <div className="attr-body">
                <span className="attr-tag">Beach & Street Food</span>
                <h3>Juhu Beach Street Food Walk</h3>
                <p>
                  Visit at 5–8 PM for the full street food experience — Pav
                  Bhaji, Bhel Puri, Chaat, Kulfi and sugarcane juice on the
                  beach. Bollywood celebrities live nearby — celeb-spotting is a
                  thing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="video-sec">
        <div className="con">
          <p className="sl">See It First</p>
          <h2 className="st">
            Mumbai — <em>Through Visitors' Eyes</em>
          </h2>
          <p className="sd">
            International travel creators share their Mumbai experiences — the
            good, the challenging and the unforgettable.
          </p>
          <div className="video-grid">
            <div>
              <div className="vid-wrap">
                <iframe
                  src="https://www.youtube.com/embed/ZNEm96OPZJY"
                  title="First time in Mumbai India travel guide"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="vid-meta">
                <h4>First Time in Mumbai — Everything You Need to Know</h4>
                <p>
                  An honest, helpful introduction to Mumbai for first-time
                  international visitors
                </p>
              </div>
            </div>
            <div>
              <div className="vid-wrap">
                <iframe
                  src="https://www.youtube.com/embed/4dEHoNaGF20"
                  title="Mumbai street food guide for tourists Gateway of India"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="vid-meta">
                <h4>Mumbai Street Food — Visitor's Food Tour</h4>
                <p>
                  Discovering Mumbai's legendary street food culture with a
                  first-time international visitor's perspective
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="budget">
        <div className="con">
          <p className="sl">Plan Your Spend</p>
          <h2 className="st">
            Mumbai on a Budget — <em>What Things Cost</em>
          </h2>
          <p className="sd">
            Mumbai can be incredibly affordable or surprisingly expensive —
            depending entirely on how you travel. Here's a realistic breakdown
            by travel style.
          </p>
          <div className="b-grid">
            <div className="b-card">
              <h4>Budget Traveller</h4>
              <div className="b-price">₹2,500–4,000 / day (~USD 30–50)</div>
              <ul>
                <li>Hostel dorm or budget guesthouse in Colaba</li>
                <li>Street food meals (Vada Pav ₹20, Pav Bhaji ₹80)</li>
                <li>Local train travel across the city</li>
                <li>Free sightseeing (Marine Drive, Dharavi walk)</li>
                <li>Auto-rickshaws for short trips in suburbs</li>
              </ul>
            </div>
            <div className="b-card">
              <h4>Mid-Range</h4>
              <div className="b-price">₹8,000–15,000 / day (~USD 95–180)</div>
              <ul>
                <li>3-star hotel in South Mumbai or Bandra</li>
                <li>Mix of restaurant dining and street food</li>
                <li>Ola/Uber for most travel</li>
                <li>Elephanta Caves ferry + entry</li>
                <li>One evening at a bar or rooftop venue</li>
              </ul>
            </div>
            <div className="b-card">
              <h4>Luxury</h4>
              <div className="b-price">₹30,000+ / day (~USD 360+)</div>
              <ul>
                <li>5-star hotel (Taj Mahal Palace, Four Seasons, Oberoi)</li>
                <li>Fine dining at award-winning Mumbai restaurants</li>
                <li>Private guided city tours</li>
                <li>Premium spa treatments</li>
                <li>Helicopter tour over Mumbai skyline</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-sec">
        <div className="con">
          <p className="sl">Frequently Asked Questions</p>
          <h2 className="st">
            Foreign Tourists in Mumbai — <em>Common Questions</em>
          </h2>
          <div className="fq-list">
            <div className="fqi">
              <div className="fqq">Do I need a visa to visit Mumbai?</div>
              <div className="fqa">
                Most foreign nationals require a visa. Citizens of over 166
                countries can apply for an Indian e-Visa online at
                indianvisaonline.gov.in. Apply at least 4 business days before
                travel. Citizens of Nepal and Bhutan are exempt. Always verify
                with the Indian embassy in your country as visa rules can
                change.
              </div>
            </div>
            <div className="fqi">
              <div className="fqq">
                How do I get from Mumbai Airport to the city?
              </div>
              <div className="fqa">
                The easiest option is Ola or Uber — book in the app before you
                exit the terminal. Fares to South Mumbai (Colaba) are typically
                ₹700–1200 depending on traffic. Pre-paid taxi counters inside
                the terminal are also reliable. The Mumbai Metro Line 1 connects
                Andheri to Versova and is useful if your hotel is in the western
                suburbs.
              </div>
            </div>
            <div className="fqi">
              <div className="fqq">
                Is the tap water safe to drink in Mumbai?
              </div>
              <div className="fqa">
                Tap water in Mumbai is not safe to drink for international
                tourists. Stick to sealed bottled mineral water (Bisleri,
                Aquafina, Kinley — widely available). At restaurants, always ask
                for bottled or filtered water. Ice in high-end restaurants is
                generally safe; exercise caution at street-food stalls.
              </div>
            </div>
            <div className="fqi">
              <div className="fqq">
                What SIM card should international tourists get in Mumbai?
              </div>
              <div className="fqa">
                You can purchase an Indian SIM card (Airtel or Jio are the best
                networks) at the airport or at authorised stores. You'll need
                your passport and a passport-sized photo. SIM activation can
                take 24 hours. Alternatively, international eSIM services work
                well in Mumbai as 4G/5G coverage is excellent.
              </div>
            </div>
            <div className="fqi">
              <div className="fqq">
                What should I wear as a tourist in Mumbai?
              </div>
              <div className="fqa">
                Mumbai is casual and cosmopolitan — smart casual clothes are
                fine for most areas. For temples and mosques, cover shoulders
                and knees. In markets and crowded areas, avoid jewellery that's
                easy to snatch. In summer/monsoon, light breathable fabrics are
                essential due to the humidity. Comfortable walking shoes are a
                must.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="prose">
        <div className="con">
          <div className="prose-i">
            <h2>Mumbai for International Tourists — The Full Picture</h2>
            <p>
              Mumbai rewards curious travellers. It's a city that doesn't reveal
              itself immediately — its beauty is in the layers. The grandeur of
              the Taj Mahal Palace Hotel standing beside the Gateway of India;
              the incredible human choreography of a rush-hour local train; the
              smell of Irani chai and bun maska in a 100-year-old café in Fort;
              the way the city lights up Marine Drive at night like a string of
              diamonds laid along the sea.
            </p>
            <h3>Why Mumbai is unlike any other city in the world</h3>
            <p>
              Mumbai is the city of maximum contrasts: extreme wealth and
              extreme poverty existing within metres of each other; the world's
              most expensive private residence (Antilia) visible from Asia's
              largest informal settlement (Dharavi); Bollywood's global glamour
              produced in the same city where the Dabbawala delivers your office
              lunch with six-sigma efficiency. To visit Mumbai is to understand
              India — in all its beautiful, bewildering, wonderful complexity.
            </p>
            <h3>Using Mumbai96 as an international visitor</h3>
            <p>
              Mumbai96 is a platform built by Mumbaikars — designed to help
              anyone find exactly what they need in this vast city. For
              international tourists, our Mumbai guides provide exact
              location-wise breakdowns of what to see, eat and experience; and
              our content is always written from a local perspective, not a
              tourist-brochure one.
            </p>
            <h3>A final word for first-time visitors</h3>
            <p>
              Mumbai will probably overwhelm you on arrival. The noise, the
              density, the heat, the traffic — it's a lot. Give yourself 24
              hours to settle in before forming any opinions. Because within a
              day or two, something shifts — and Mumbai starts to reveal its
              incredible warmth, energy and generosity of spirit. Most visitors
              who come for 3 days end up wishing they'd stayed for 7. That's
              Mumbai for you.
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="cta-sec">
        <h2>Explore More of Mumbai on Mumbai96</h2>
        <p>
          Complete Mumbai guide — built by Mumbaikars to help every visitor
          (and every resident) find exactly what they need in this
          extraordinary vibrant city.
        </p>
        <a href="/" className="cta-btn">
          🗺️ Explore Mumbai on Mumbai96
        </a>
      </section>

    </>
  );
};

export default ForiegnTourist;
