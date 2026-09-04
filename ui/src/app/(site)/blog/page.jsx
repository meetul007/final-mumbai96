import Link from "next/link";
// import "./style.css";
import Subscriber from "@/components/common/subscribe";

async function getBlogs(page = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/blogs?page=${page}&per_page=10`,
    { cache: "no-store" },
  );
  return res.json();
}

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1");

  const data = await getBlogs(page);

  return (
    <>
      {/* HERO */}
      <div className="blog-hero">
        <div className="bh-grid"></div>
        <div className="bh-glow1"></div>
        <div className="bh-glow2"></div>

        <div className="con">
          <div className="bh-inner">
            <div className="bh-eyebrow">Mumbai96 · Stories from the City</div>

            <h1 className="bh-h1">
              The Mumbai
              &nbsp;
              <span className="line-accent">Journal.</span>
            </h1>

            <p className="bh-desc">
              Neighbourhood deep-dives, hidden gems, Mumbaikar life, food trails
              and everything that makes this city the greatest on earth.
            </p>
          </div>
        </div>

        {/* CATEGORY (STATIC FOR NOW) */}
        <div className="con">
          <div className="bh-cats">
            <Link href={`?`} className="bh-cat on">
              All Stories
              <span className="ct-count">{data.pagination?.total || 0}</span>
            </Link>
          </div>
        </div>

        {/* FEATURED BLOG */}
        {data.top_blog && (
          <div className="featured-wrap">
            <div className="con">
              <div className="featured-card rv">
                <div className="fc-img">
                  <div className="fc-img-overlay"></div>
                  <div className="fc-img-emoji">
                    <img src={data.top_blog.image} />
                  </div>
                  <span className="fc-img-tag">⭐ Editor's Pick</span>
                </div>

                <div className="fc-body">
                  <div className="fc-cat">Featured</div>

                  <h2 className="fc-title">
                    <Link href={`/blog/${data.top_blog.slug}`}>
                      {data.top_blog.title}
                    </Link>
                  </h2>

                  <p className="fc-excerpt">{data.top_blog.excerpt}</p>

                  <div className="fc-meta">
                    <span className="fc-date">{data.top_blog.created_at}</span>
                    <span className="fc-dot"></span>
                    <span className="fc-read">
                      {data.top_blog.reading_time} min read
                    </span>
                  </div>

                  <Link
                    href={`/blog/${data.top_blog.slug}`}
                    className="fc-read-btn"
                  >
                    Read Story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WAVE */}
      <div className="wave-transition">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,60 L0,30 Q180,0 360,30 Q540,60 720,30 Q900,0 1080,30 Q1260,60 1440,30 L1440,60 Z"
            fill="#FAFAF7"
          />
        </svg>
      </div>

      {/* BODY */}
      <div className="blog-body">
        <div className="con">
          <div className="sec-label">Latest Stories</div>
          <div className="sec-title">
            Fresh From <em>the City</em>
          </div>

          <div className="blog-layout">
            {/* POSTS */}
            <div>
              {data.blogs?.map((post) => (
                <div key={post.slug} className="post-card rv">
                  <div className="pc-img">
                    <div className="pc-img-emoji">
                      <img src={post.image} />
                    </div>
                    <span className="pc-cat-pill">Blog</span>
                  </div>

                  <div className="pc-body">
                    <div>
                      <div className="pc-cat">Blog</div>

                      <div className="pc-title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </div>

                      <p className="pc-excerpt">{post.excerpt}</p>
                    </div>

                    <div className="pc-footer">
                      <div className="pc-meta">
                        <div className="pc-avatar">👤</div>
                        <span className="pc-author">{post.author?.name}</span>
                        <span className="pc-dot">·</span>
                        <span className="pc-date">{post.created_at}</span>
                        <span className="pc-mins">{post.reading_time} min</span>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="pc-read">
                        Read →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* PAGINATION */}
              {data.pagination?.has_next && (
                <div className="load-area">
                  <Link href={`?page=${page + 1}`} className="load-btn">
                    Load More Stories
                  </Link>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="blog-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">
                  Most <em>Read</em>
                </div>

                <div className="sbw-body">
                  {data.blogs?.slice(0, 5).map((p, i) => (
                    <div key={p.slug} className="popular-post">
                      <div className="pp-num">
                        {(i + 1).toString().padStart(2, "0")}
                      </div>

                      <div className="pp-info">
                        <div className="pp-cat">Blog</div>

                        <Link href={`/blog/${p.slug}`} className="pp-title">
                          {p.title}
                        </Link>

                        <div className="pp-meta">
                          {p.created_at} · {p.reading_time} min ·{" "}
                          {p.total_views} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NEWSLETTER */}
              <div className="newsletter-widget">
                <div className="nlw-title">
                  Mumbai<em>96</em> Newsletter
                </div>

                <p className="nlw-desc">
                  One weekly email. Best Mumbai stories.
                </p>

                <Subscriber />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
