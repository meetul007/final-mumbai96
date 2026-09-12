"use client";

import { useState } from "react";
import ListingCard from "./ListingCard";
import ListingsHeader from "./ListingsHeader";
import PromotedStrip from "./PromotedStrip";

const MAX_FEATURED = 3;

// Frontend-only way to feature a business or force its position — no
// backend/data change needed, just this file + a redeploy. Rarely needed
// now that the data itself carries "featured" + "featured_position" (see
// below), but useful for a quick one-off. Add "location/category/slug"
// entries — the ORDER they're listed in here is the order they'll show in,
// and it always wins over the data's own featured_position.
//
// Example:
//   const FEATURED_ORDER = [
//     "virar-west/street-food/misal-raja-kolhapuri-katta",
//   ];
const FEATURED_ORDER = [
  // "virar-west/street-food/burger-and-rolls",
];

// Decides which listings actually get the featured ribbon/badge (at most
// MAX_FEATURED) and what order the whole list shows in. Two sources feed
// this, in priority order:
//   1. FEATURED_ORDER above — always wins, in that exact order.
//   2. The business data itself: `featured: true` plus an optional numeric
//      `featured_position` (1, 2, 3 ...) — lower number shows first. A
//      business with `featured: true` and no position just falls in after
//      the ones that do have one, in whatever order the backend sent them.
//   3. Only the top MAX_FEATURED across #1 + #2 actually keep the featured
//      styling — anyone past the cap loses it and drops back to their
//      normal position (#4), not pinned near the top.
//   4. Everyone else — including anything unfeatured or bumped past the
//      cap — keeps the exact order the backend already returned them in
//      (e.g. sorted by rating/reviews). A business never stays stuck in a
//      "featured" position once it's no longer actually featured.
function applyFeaturedOrdering(items, location, category) {
  const priorityOf = (item, index) => {
    const path = `${location}/${category}/${item.business_slug}`;
    const overrideIndex = FEATURED_ORDER.indexOf(path);
    if (overrideIndex !== -1) return overrideIndex;
    if (!item.featured) return null;
    const base = FEATURED_ORDER.length;
    if (typeof item.featured_position === "number") {
      return base + item.featured_position;
    }
    return base + 100000 + index; // featured, but no explicit position
  };

  const featuredSorted = items
    .map((item, index) => ({ item, priority: priorityOf(item, index) }))
    .filter((x) => x.priority !== null)
    .sort((a, b) => a.priority - b.priority)
    .map((x) => x.item);

  const top = featuredSorted.slice(0, MAX_FEATURED);
  const topSet = new Set(top);

  const featuredTop = top.map((item) => ({ ...item, featured: true }));
  const everyoneElse = items
    .filter((item) => !topSet.has(item))
    .map((item) => ({ ...item, featured: false }));

  return [...featuredTop, ...everyoneElse];
}

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

      {applyFeaturedOrdering(listings, location, category).map((item, i) => (
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
