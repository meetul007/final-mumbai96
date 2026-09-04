import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";

export const metadata = {
  title:
    "Pets in Mumbai 2026 — Vet Hospitals, Dog Parks, Pet Adoption & Pet-Friendly Cafes | Mumbai96",
  description:
    "Complete guide to pets in Mumbai 2026. Dog-friendly parks, beaches, vet hospitals, pet adoption centres, BMC pet registration and pet-friendly cafes.",
  keywords:
    "pets mumbai, dog friendly parks mumbai, veterinary hospital mumbai, pet adoption mumbai, bspca mumbai, pet cafe mumbai, dog registration bmc",
  canonical: "https://mumbai96.vercel.app/pets-mumbai",
  openGraph: {
    title:
      "Pets in Mumbai 2026 — Vet Hospitals, Dog Parks, Pet Adoption & Pet-Friendly Cafes | Mumbai96",
    description:
      "Complete guide to pets in Mumbai 2026. Dog-friendly parks, beaches, vet hospitals, pet adoption centres, BMC pet registration and pet-friendly cafes.",
    url: "https://mumbai96.vercel.app/pets-mumbai",
    type: "article",
    siteName: "Mumbai96",
  },
};

const quickLinks = [
  { href: "/mumbai-local-train", icon: "🚂", label: "Local Train Guide" },
  { href: "/mumbai-real-estate-guide", icon: "💰", label: "Real Estate Intel" },
  { href: "/mumbai-monsoon", icon: "🌧️", label: "Monsoon Guide" },
  { href: "/senior-citizens-mumbai", icon: "👴", label: "Senior Citizens" },
  { href: "/story-of-mumbai-96", icon: "🏙️", label: "Story of Mumbai96" },
  { href: "/pets-mumbai", icon: "🐾", label: "Pets in Mumbai" },
  { href: "/mumbai-street-food", icon: "🥘", label: "Street Food" },
  { href: "/mumbai-sports", icon: "🏏", label: "Sports Hub" },
  { href: "/mumbai-education", icon: "🎓", label: "Education Hub" },
  { href: "/mumbai-startup-business", icon: "🚀", label: "Startup Guide" },
];

export default function PetsMumbaiPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Pets Mumbai" },
        ]}
        kicker="Mumbai96 · Pet Community · Dogs · Cats · Animal Welfare"
        title={
          <>
            Pets in <em>Mumbai</em>
            &nbsp;
            <span className="gold">2026</span>
          </>
        }
        stats={[
          { value: "95,000+", label: "Stray Dogs in Mumbai" },
          { value: "Mandatory", label: "BMC Pet Registration" },
          { value: "24x7", label: "BSPCA Emergency Vet" },
          { value: "Free", label: "Pet Adoption Available" },
        ]}
      />

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Pet-Friendly Mumbai</div>
                <h2 className="sec-title">
                  Parks, Beaches & Spaces <em>for Your Pet</em>
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏖️</div>
                    <div className="dc-title">Versova Dog Beach</div>
                    <div className="dc-body">
                      Mumbai&apos;s most famous dog-friendly beach. Informal
                      dog-run area at Versova Beach north end, early morning
                      5:30–8 AM. Dog community meets here daily. Nearest station:
                      Versova (Metro Line 1).
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌿</div>
                    <div className="dc-title">Jogger&apos;s Park, Bandra</div>
                    <div className="dc-body">
                      Pet-friendly morning walking zone at Bandstand Jogger&apos;s
                      Park. Most popular dog-walking spot in the western suburbs.
                      5–9 AM is the prime time — large community of dog owners.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏞️</div>
                    <div className="dc-title">Sanjay Gandhi National Park</div>
                    <div className="dc-body">
                      Pets allowed on main entry road and nature trails (except
                      safari zones). A 2-hour morning walk inside the park gates
                      (Borivali East entrance) is spectacular for dog exercise.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌊</div>
                    <div className="dc-title">Worli Sea Face & Carter Road</div>
                    <div className="dc-body">
                      Carter Road promenade (Bandra) and Worli Sea Face both popular
                      for dog walks. Early morning and evening. Carter Road has
                      pet-friendly cafes nearby.
                    </div>
                  </div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Vet Hospitals & Clinics</div>
                <h2 className="sec-title">
                  Mumbai&apos;s Best <em>Veterinary Hospitals</em>
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">BSPCA — Parel (24x7)</div>
                    <div className="dc-body">
                      India&apos;s oldest and most comprehensive animal hospital. Full
                      surgical facilities, ICU, diagnostics. 24x7 emergency. Bombay
                      Society for Prevention of Cruelty to Animals.
                    </div>
                    <a
                      href="https://bspca.org.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dc-cta"
                    >
                      📞 022-2413-6464
                    </a>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">
                      Dr. Shroff&apos;s Charity Vet Hospital
                    </div>
                    <div className="dc-body">
                      One of Mumbai&apos;s leading veterinary hospitals — surgery,
                      orthopaedics, oncology. Wadala. Also does affordable treatment
                      for low-income pet owners.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🏥</div>
                    <div className="dc-title">Cessna Lifeline (Multiple Branches)</div>
                    <div className="dc-body">
                      Mumbai&apos;s largest chain of vet clinics — branches in Malad,
                      Andheri, Bandra, Mulund, Thane. 24x7 emergency in select
                      branches. Good for routine care.
                    </div>
                  </div>
                </div>
                <div className="info-box">
                  <h4>📋 Pet Registration with BMC — Mandatory</h4>
                  <ul>
                    <li>
                      All pet dogs must be registered with BMC annually —
                      ₹100–₹500 per year depending on ward
                    </li>
                    <li>
                      Register online at MCGM portal or at your ward office with
                      Aadhaar + pet vaccination record
                    </li>
                    <li>
                      BMC issues a metal identification tag — dog must wear it at
                      all times
                    </li>
                    <li>
                      Annual rabies vaccination certificate required for licence
                      renewal
                    </li>
                    <li>
                      Non-registration can result in ₹500–₹2,000 penalty and BMC can
                      impound the unregistered pet
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Adopt Don&apos;t Shop</div>
                <h2 className="sec-title">
                  Pet Adoption in Mumbai — <em>Give a Home</em>
                </h2>
                <a
                  href="https://www.adoptapet.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🐾</div>
                  <div className="lc-body">
                    <div className="lc-title">Adopt A Pet India — Mumbai Chapter</div>
                    <div className="lc-desc">
                      India&apos;s largest pet adoption platform. Mumbai has hundreds
                      of dogs and cats listed for adoption every month
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://pawsindia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🐱</div>
                  <div className="lc-body">
                    <div className="lc-title">PAWS Mumbai — People for Animals Welfare</div>
                    <div className="lc-desc">
                      Regular adoption drives in Mumbai — cats, dogs, small animals.
                      Vaccination and neutering done pre-adoption
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
                <a
                  href="https://wsd.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="lc-icon">🐕</div>
                  <div className="lc-body">
                    <div className="lc-title">Welfare of Stray Dogs (WSD) Mumbai</div>
                    <div className="lc-desc">
                      40+ years of stray dog welfare in Mumbai. Adoption, ABC
                      sterilisation, advocacy and community feeding guidelines
                    </div>
                  </div>
                  <div className="lc-arrow">↗</div>
                </a>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Pet-Friendly Cafes</div>
                <h2 className="sec-title">
                  Mumbai&apos;s <em>Pet-Friendly</em> Cafes & Restaurants
                </h2>
                <div className="card-grid">
                  <div className="data-card">
                    <div className="dc-icon">☕</div>
                    <div className="dc-title">The Yoga House — Bandra</div>
                    <div className="dc-body">
                      Fully pet-friendly organic cafe in Bandra — outdoor seating,
                      dogs welcome, healthy food. A favourite of the Bandra
                      dog-walking community.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🍕</div>
                    <div className="dc-title">Out of the Blue — Bandra</div>
                    <div className="dc-body">
                      Iconic Bandra restaurant with outdoor pet-friendly terrace
                      seating. Accepts dogs on the outdoor section. Popular on
                      weekend mornings with pet parents.
                    </div>
                  </div>
                  <div className="data-card">
                    <div className="dc-icon">🌿</div>
                    <div className="dc-title">Elbo Room — Bandra</div>
                    <div className="dc-body">
                      Rooftop cafe with outdoor pet-friendly section. Good for evening
                      outings with dogs. Bandra West. Always call ahead to confirm pet
                      policy on the day.
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose rv">
                <h2>Pets in Mumbai — Complete Guide 2026</h2>
                <p>
                  Mumbai&apos;s pet community has exploded in the last five years —
                  post-pandemic pet adoptions, growing awareness of animal rights, and
                  Mumbai&apos;s young professional demographic has made this a
                  significant part of the city&apos;s culture. The key challenges remain:
                  housing societies that ban pets (illegally, in most cases) and limited
                  dedicated green spaces. But the community is vocal and growing.
                </p>
                <h3>Can a Housing Society Ban Pets?</h3>
                <p>
                  No. The Bombay High Court and various consumer forums have repeatedly
                  ruled that housing societies cannot ban pet dogs or cats. The Animal
                  Welfare Board of India guidelines explicitly state that residents have
                  the right to keep pets. Societies can set reasonable rules (leash in
                  common areas, no pets in lifts without permission) but cannot issue a
                  blanket pet ban. If your society has issued such a ban, approach the
                  Dy. Registrar of Co-operative Societies.
                </p>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  🐾 Pet <em>Emergencies</em>
                </div>
                <div className="sbw-body">
                  <a href="tel:02224136464" className="sb-row">
                    <span className="sb-row-label">🏥 BSPCA Parel</span>
                    <span className="sb-row-value--sm">2413-6464</span>
                  </a>
                  <a
                    href="https://bspca.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row"
                  >
                    <span className="sb-row-label">🌐 BSPCA Website</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
                  <a
                    href="https://pawsindia.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-row last"
                  >
                    <span className="sb-row-label">🐱 PAWS Adoption</span>
                    <span className="sb-row-value--cta">Visit ↗</span>
                  </a>
                </div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">
                  🔗 Quick <em>Links</em>
                </div>
                <div className="sbw-body">
                  {quickLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="quick-link">
                      <div className="ql-icon">{l.icon}</div>
                      <div className="ql-text">{l.label}</div>
                      <div className="ql-arrow">→</div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
