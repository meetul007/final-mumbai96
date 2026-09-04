import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButtons } from "./ShareButtons";
import { FaqItem } from "./FaqItem";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getCelebrity(slug) {
  try {
    const res = await fetch(
      `${API_BASE}/api/public/celebrities/${slug}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const pr = await params;
  const data = await getCelebrity(pr.slug);
  if (!data || !data.celebrity) {
    return { title: "Celebrity Not Found | Mumbai96" };
  }
  const c = data.celebrity;
  return {
    title: c.page_title || `${c.full_name} – Age, Bio, Family & Mumbai Home | Mumbai96`,
    description: c.meta_description || `Complete profile of ${c.full_name} — age, family, Mumbai home and career highlights.`,
    keywords: c.meta_keywords,
    alternates: { canonical: c.canonical_url },
    openGraph: {
      title: c.og_title || `${c.full_name} | Mumbai96`,
      description: c.og_description,
      url: c.canonical_url,
      type: "profile",
      siteName: "Mumbai96",
    },
    robots: "index, follow",
  };
}

function cleanMeta(val) {
  if (!val) return null;
  const parts = val.split(":").map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const key = parts[0];
  const rest = parts.slice(1).join(":");
  return { key, value: rest };
}

export default async function CelebrityDetailPage({ params }) {
  const pr = await params;
  const data = await getCelebrity(pr.slug);
  if (!data || !data.celebrity) {
    notFound();
  }
  const c = data.celebrity;

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: c.full_name,
        alternateName: c.schema_alternate_names
          ? c.schema_alternate_names
              .split(",")
              .map((s) => s.trim())
          : [],
        birthDate: c.date_of_birth,
        birthPlace: { "@type": "Place", name: c.birth_city },
        gender: c.gender,
        nationality: c.nationality,
        jobTitle: c.profession,
        homeLocation: {
          "@type": "Place",
          name: `${c.mumbai_home_name || ""} ${c.mumbai_neighbourhood || ""} Mumbai`,
        },
        spouse: c.spouse ? { "@type": "Person", name: c.spouse } : undefined,
        url: c.canonical_url,
        sameAs: [c.wikipedia_url, c.instagram_handle ? `https://instagram.com/${c.instagram_handle}` : null].filter(Boolean),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mumbai96.vercel.app/" },
          { "@type": "ListItem", position: 2, name: "Celebrities", item: "https://mumbai96.vercel.app/celebrities" },
          { "@type": "ListItem", position: 3, name: c.full_name, item: c.canonical_url },
        ],
      },
    ],
  };

  return (
    <div className="celeb-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* HERO */}
      <header className="celeb-profile-hero" role="banner">
        <div className="celeb-hero-bg-pattern" aria-hidden="true"></div>
        <div className="celeb-hero-bg-text" aria-hidden="true">
          {c.name_line1 || c.first_name}
        </div>

        <div className="celeb-hero-inner">
          <nav className="celeb-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/celebrities">Celebrities</Link>
            <span>›</span>
            <span aria-current="page">{c.full_name}</span>
          </nav>

          <div className="celeb-photo-col">
            <div className="celeb-photo-frame">
              {c.wikipedia_image_url ? (
                <img
                  src={c.wikipedia_image_url}
                  alt={`${c.full_name} – ${c.subcategory || c.profession}`}
                  width="280"
                  height="340"
                />
              ) : (
                <div className="celeb-photo-placeholder" role="img" aria-label={`${c.full_name} photo`}>
                  {c.emoji}
                </div>
              )}
              <div className="celeb-photo-badge">
                <div className="celeb-photo-badge-text">
                  {c.category === "actor" || c.category === "actress" ? "BOLLYWOOD STAR" : c.category === "sports" ? "SPORTS ICON" : c.category === "music" ? "MUSIC LEGEND" : "MUMBAI STAR"}
                </div>
              </div>
            </div>
              <ShareButtons fullName={c.full_name} />
          </div>

          <div className="celeb-info-col">
            <span className="celeb-category-tag">{c.hero_tag || c.subcategory || c.profession}</span>
            <h1 className="celeb-profile-name">
              {c.name_line1}
              &nbsp;
              <em>{c.name_line2}</em>
            </h1>
            <p className="celeb-profile-subtitle">{c.subtitle}</p>

            <div className="celeb-stats-bar" role="list">
              <div className="celeb-stat-item">
                <div className="celeb-stat-label">Age</div>
                <div className="celeb-stat-value highlight">{c.age || "—"}</div>
              </div>
              <div className="celeb-stat-item">
                <div className="celeb-stat-label">Gender</div>
                <div className="celeb-stat-value">{c.gender || "—"}</div>
              </div>
              <div className="celeb-stat-item">
                <div className="celeb-stat-label">Marital</div>
                <div className="celeb-stat-value">{c.marital_status || "—"}</div>
              </div>
              {c.children_count > 0 && (
                <div className="celeb-stat-item">
                  <div className="celeb-stat-label">Children</div>
                  <div className="celeb-stat-value highlight">{c.children_count}</div>
                </div>
              )}
              <div className="celeb-stat-item">
                <div className="celeb-stat-label">Films/Works</div>
                <div className="celeb-stat-value highlight">{c.total_works || "—"}</div>
              </div>
            </div>

            <div className="celeb-quick-facts">
              {c.date_of_birth && (
                <div className="celeb-qf-item">
                  <span className="celeb-qf-icon">📅</span>
                  <div>
                    <span className="celeb-qf-label">Born</span>
                    <span className="celeb-qf-val">{c.date_of_birth}</span>
                  </div>
                </div>
              )}
              <div className="celeb-qf-item">
                <span className="celeb-qf-icon">📍</span>
                <div>
                  <span className="celeb-qf-label">Mumbai Home</span>
                  <span className="celeb-qf-val">{c.mumbai_home_name || "—"}, {c.mumbai_neighbourhood || "—"}</span>
                </div>
              </div>
              {c.spouse && (
                <div className="celeb-qf-item">
                  <span className="celeb-qf-icon">💍</span>
                  <div>
                    <span className="celeb-qf-label">Spouse</span>
                    <span className="celeb-qf-val">{c.spouse}</span>
                  </div>
                </div>
              )}
              {c.children_names && (
                <div className="celeb-qf-item">
                  <span className="celeb-qf-icon">👶</span>
                  <div>
                    <span className="celeb-qf-label">Children</span>
                    <span className="celeb-qf-val">{c.children_names}</span>
                  </div>
                </div>
              )}
              {c.birth_city && (
                <div className="celeb-qf-item">
                  <span className="celeb-qf-icon">🏙️</span>
                  <div>
                    <span className="celeb-qf-label">Birth City</span>
                    <span className="celeb-qf-val">{c.birth_city}</span>
                  </div>
                </div>
              )}
              {c.religion && (
                <div className="celeb-qf-item">
                  <span className="celeb-qf-icon">🏛️</span>
                  <div>
                    <span className="celeb-qf-label">Religion</span>
                    <span className="celeb-qf-val">{c.religion}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="celeb-profile-body">
        <main id="celeb-detail-main">
          {/* BIO */}
          {(c.bio_para_1 || c.bio_para_2 || c.bio_para_3) && (
            <section className="celeb-content-section">
              <div className="celeb-section-header">
                <span className="celeb-section-icon">📖</span>
                <h2 className="celeb-section-title-sm">
                  BIOGRAPHY <em>& STORY</em>
                </h2>
              </div>
              <div className="celeb-bio-text">
                {c.bio_para_1 && <p>{c.bio_para_1}</p>}
                {c.bio_para_2 && <p>{c.bio_para_2}</p>}
                {c.bio_para_3 && <p>{c.bio_para_3}</p>}
              </div>
            </section>
          )}

          {/* WORKS */}
          {c.works && c.works.length > 0 && (
            <section className="celeb-content-section">
              <div className="celeb-section-header">
                <span className="celeb-section-icon">🎬</span>
                <h2 className="celeb-section-title-sm">
                  NOTABLE <em>WORKS</em>
                </h2>
              </div>
              <div className="celeb-works-grid">
                {c.works.map((w, i) => (
                  <article key={i} className="celeb-work-card">
                    <div className="celeb-work-year">{w.year}</div>
                    <h3 className="celeb-work-title">{w.title}</h3>
                    <p className="celeb-work-role">{w.role}</p>
                    {w.badge && <span className="celeb-work-badge">{w.badge}</span>}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* AWARDS */}
          {c.awards && c.awards.length > 0 && (
            <section className="celeb-content-section">
              <div className="celeb-section-header">
                <span className="celeb-section-icon">🏆</span>
                <h2 className="celeb-section-title-sm">
                  AWARDS & <em>HONOURS</em>
                </h2>
              </div>
              <div className="celeb-awards-list">
                {c.awards.map((a, i) => (
                  <div key={i} className="celeb-award-item">
                    <div className="celeb-award-icon">🏅</div>
                    <div>
                      <div className="celeb-award-name">{a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {c.faqs && c.faqs.length > 0 && (
            <section className="celeb-content-section">
              <div className="celeb-section-header">
                <span className="celeb-section-icon">❓</span>
                <h2 className="celeb-section-title-sm">
                  PEOPLE ALSO <em>ASK</em>
                </h2>
              </div>
              <div className="celeb-faq-list">
              {c.faqs.map((f, i) => (
                <FaqItem key={i} question={f.question} answer={f.answer} />
              ))}
              </div>
            </section>
          )}
        </main>

        {/* SIDEBAR */}
        <aside className="celeb-sidebar">
          <div className="celeb-sidebar-card">
            <h2 className="celeb-sidebar-card-title">📋 FULL PROFILE</h2>
            {[
              ["Full Name", c.full_name],
              ["Date of Birth", c.date_of_birth],
              ["Age", c.age ? `${c.age} years` : null],
              ["Gender", c.gender],
              ["Birth City", c.birth_city],
              ["Mumbai Home", c.mumbai_neighbourhood],
              ["Nationality", c.nationality],
              ["Profession", c.profession],
              ["Marital Status", c.marital_status],
              ["Spouse", c.spouse],
              ["Children", c.children_count > 0 ? `${c.children_count} (${c.children_names || ""})` : "None"],
              ["Net Worth", c.net_worth],
              ["Debut", c.debut_work],
              ["Total Works", c.total_works],
              ["Awards", c.awards_count_label],
            ].filter(([, v]) => v).map(([label, val], i) => (
              <div key={i} className="celeb-info-row">
                <span className="celeb-info-key">{label}</span>
                <span className="celeb-info-val">{val}</span>
              </div>
            ))}
          </div>

          {c.neighbourhood_slug && (
            <div className="celeb-neighbourhood-card">
              <h3>📍 {c.mumbai_neighbourhood?.toUpperCase()}</h3>
              <p>{c.neighbourhood_desc}</p>
              <Link href={`/${c.neighbourhood_slug}`} className="celeb-neighbourhood-link">
                Explore {c.mumbai_neighbourhood} →
              </Link>
            </div>
          )}

          {c.related && c.related.length > 0 && (
            <div className="celeb-sidebar-card">
              <h2 className="celeb-sidebar-card-title">⭐ MORE MUMBAI STARS</h2>
              <div className="celeb-related-celebs">
                {c.related.map((r, i) => (
                  <Link key={i} href={`/celebrities/${r.slug}`} className="celeb-related-card">
                    <div className="celeb-related-avatar">{r.emoji}</div>
                    <div>
                      <div className="celeb-related-name">{r.name}</div>
                      <div className="celeb-related-prof">{r.area || ""}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
