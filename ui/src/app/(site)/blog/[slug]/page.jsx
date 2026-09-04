import Link from "next/link";
import "./style.css";
import SidebarTOC from "@/components/common/sidebartoc/SideBarToc";

async function getBlog(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/blog/${slug}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getBlog(slug);

  const title = data.seo?.title || data.title;

  const description = data.seo?.description || data.excerpt;

  const image = data.image;

  const url = `https://mumbai96.com/blog/${slug}`;

  return {
    title,
    description,

    keywords: data.hashtags?.join(", "),

    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const data = await getBlog(slug);
  return (
    <>
      {/* HERO */}
      <div className="art-hero">
        <div className="ah-bg"></div>
        <div className="ah-grid" style={{ background: data.image }}></div>

        <div className="con">
          <div className="ah-inner">
            {/* BREADCRUMB */}
            <div className="ah-bc">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <span>{data.title}</span>
            </div>

            <div className="ah-cat">{data.category?.name || "Blog"}</div>

            <h1 className="ah-title">{data.title}</h1>

            <p className="ah-excerpt">{data.excerpt}</p>

            {/* META */}
            <div className="ah-meta">
              <div className="ah-author">
                <div className="ah-avatar">🖊️</div>
                <div className="ah-author-info">
                  <strong>{data.author?.name}</strong>
                  <span>{data.author?.tagline}</span>
                </div>
              </div>

              <div className="ah-sep"></div>

              <div className="ah-stat">
                <strong>{data.created_at}</strong>
                <span>Published</span>
              </div>

              <div className="ah-sep"></div>

              <div className="ah-stat">
                <strong>{data.reading_time} min</strong>
                <span>Read Time</span>
              </div>

              <div className="ah-sep"></div>

              <div className="ah-stat">
                <strong>{data.total_views}</strong>
                <span>Views</span>
              </div>
            </div>

            {/* TAGS */}
            <div className="ah-tags">
              {data.hashtags?.map((tag, i) => (
                <span key={i} className="ah-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="art-body">
        <div className="con">
          <div className="art-layout">
            {/* CONTENT */}
            <main>
              <div className="art-content">
                <div className="art-toc">
                  <div className="toc-title">📋 In This Story</div>

                  <ul className="toc-list">
                    {data.toc?.map((item) => (
                      <li
                        key={item.id}
                        className={`toc-item ${item.level === "h3" ? "sub" : ""}`}
                      >
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* HTML CONTENT FROM API */}
                <div
                  className="art-prose"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />

                {/* AUTHOR CARD */}
                <div className="art-foot">
                  <div className="af-author-card">
                    <div className="af-avatar-lg">🖊️</div>
                    <div className="af-info">
                      <strong>{data.author?.name}</strong>
                      <span>{data.author?.tagline}</span>
                      <p>{data.author?.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* SIDEBAR */}
            <aside className="art-sidebar">
              <SidebarTOC toc={data.toc} />

              {/* RELATED BLOGS */}
              {data.related_blogs?.length > 0 && (
                <div className="sb-widget">
                  <div className="sbw-head">
                    More <em>Like This</em>
                  </div>

                  <div className="sbw-body">
                    {data.related_blogs?.map((b) => (
                      <div key={b.slug} className="related-post">
                        <div className="rp-thumb">📰</div>

                        <div className="rp-info">
                          <div className="rp-cat">Blog</div>

                          <Link href={`/blog/${b.slug}`} className="rp-title">
                            {b.title}
                          </Link>

                          <div className="rp-meta">
                            {b.created_at} · {b.reading_time} min
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EXPLORE LOCATION */}
              {data.location && (
                <div className="explore-card">
                  <div className="ec-icon">📍</div>
                  <div className="ec-title">Explore {data.location.name}</div>

                  <p className="ec-desc">
                    Find services, restaurants and local businesses in{" "}
                    {data.location.name}.
                  </p>

                  <Link href={`/${data.location.slug}`} className="ec-btn">
                    View Neighbourhood →
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
