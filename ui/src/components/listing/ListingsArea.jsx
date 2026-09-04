"use client";

import { useState } from "react";
import ListingCard from "./ListingCard";
import ListingsHeader from "./ListingsHeader";
import PromotedStrip from "./PromotedStrip";

export default function ListingsArea({
  initialListings = [],
  location = "",
  locationName = "",
  category = "",
  categoryData = {},
  total = 0,
  page: initialPage = 1,
  totalPages = 1,
  perPage = 10,
  ratingMin = "",
  tag = "",
}) {
  const [listings, setListings] = useState(initialListings);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const hasMore = page < totalPages;
  const remaining = (totalPages - page) * perPage;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const params = new URLSearchParams({ page: nextPage });
      if (ratingMin) params.set("rating_min", ratingMin);
      if (tag) params.set("tag", tag);
      const res = await fetch(
        `${base}/api/public/listing/${location}/${category}?${params}`,
      );
      if (!res.ok) return;
      const data = await res.json();
      setListings((prev) => [...prev, ...data.listings]);
      setPage(nextPage);
    } catch (err) {
      console.error("Load more failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listings-area">
      <ListingsHeader
        start={(page - 1) * perPage + 1}
        end={Math.min(page * perPage, total)}
        total={total}
        location={locationName || location}
        category={category}
      />

      <PromotedStrip />

      {listings.map((item, i) => (
        <ListingCard
          key={item.business_slug}
          index={i}
          data={{
            name: item.business_name,
            url: `/${location}/${category}/${item.business_slug}`,
            rating: item.rating,
            reviews: item.review_count,
            address: item.address,
            phone: item.phone,
            description: item.description,
            tags: item.tags,
            images: item.images,
            verified: item.verified,
            open: item.open_now,
            featured: item.featured,
            experience: item.experience,
            distance: item.distance,
            google_map_url: item.google_map_url,
            category:
              categoryData?.emoji
                ? `${categoryData.emoji} ${categoryData.name}`
                : categoryData?.name || category,
            categoryEmoji: categoryData?.emoji || "📌",
            stars: "★★★★★",
          }}
        />
      ))}

      {hasMore && (
        <div className="load-more">
          <button
            onClick={loadMore}
            disabled={loading}
            className="load-more-btn"
          >
            {loading
              ? "Loading..."
              : `Load ${perPage} More Results (${remaining} remaining) ↓`}
          </button>
        </div>
      )}
    </div>
  );
}
