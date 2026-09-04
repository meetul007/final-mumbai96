import { openableMapUrl } from "@/lib/mapUrl";
import { waLink } from "@/lib/whatsapp";
import ShareButton from "@/components/common/ShareButton";

export default function ListingCard({ data, index }) {
  const gallery = data.images?.gallery || [];
  const maxPhotos = 4;
  const directionsUrl = openableMapUrl(data.google_map_url, data.address);

  return (
    <div className={`lc ${data.featured ? "featured" : ""}`}>
      <div className="lc-inner">
        <div className="lc-rank">{String(index + 1).padStart(2, "0")}</div>

        <div className="lc-main">
          {/* Badges */}
          <div className="lc-badges">
            {data.verified && <span className="badge-v">✓ Verified</span>}
            <span className="badge-cat">{data.category}</span>
            {data.open && <span className="badge-open">● Open Now</span>}
          </div>

          {/* Name */}
          <div className="lc-name">
            <a href={data.url}>{data.name}</a>
          </div>

          {/* Rating */}
          <div className="lc-rating-row">
            <span className="lc-stars">{data.stars || "★★★★★"}</span>
            <span className="lc-score">{data.rating}</span>
            <span className="lc-revs">({data.reviews} reviews)</span>
            <span className="lc-sep">·</span>
            <span className="lc-exp">{data.experience}</span>
          </div>

          <p className="lc-desc">{data.description}</p>

          {/* Tags */}
          <div className="lc-chips">
            {data.tags?.map((tag, i) => (
              <span key={i} className="lc-chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="lc-addr">
            <span className="lc-addr-icon">📍</span>
            {data.address}
          </div>
        </div>

        {/* CTA */}
        <div className="lc-cta">
          {data.distance && <div className="lc-dist">{data.distance}</div>}

          {data.phone && (
            <a href={`tel:${data.phone}`} className="btn-call">
              📞 Call
            </a>
          )}
          {data.phone && (
            <a
              href={waLink(data.phone)}
              target="_blank" rel="noopener noreferrer" className="btn-wa"
            >
              💬 WhatsApp
            </a>
          )}

          {data.google_map_url && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dir"
            >
              🗺 Directions
            </a>
          )}

          <ShareButton url={data.url} title={data.name} />
        </div>
      </div>

      {/* ── Photo strip (only when there are actual images) ── */}
      {gallery.length > 0 && (
        <div className="lc-photos">
          {Array.from({ length: Math.min(gallery.length, maxPhotos) }).map((_, i) => {
            const photoUrl = gallery[i];
            const remaining =
              i === maxPhotos - 1 ? gallery.length - maxPhotos : 0;

            return (
              <div key={i} className="lc-photo">
                <img src={photoUrl} alt="" />
                {remaining > 0 && (
                  <div className="lc-photo-more">+{remaining}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
