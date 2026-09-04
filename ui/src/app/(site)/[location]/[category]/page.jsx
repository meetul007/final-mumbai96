import ListingsArea from "@/components/listing/ListingsArea";
import ListingHero from "@/components/listing/ListingHero";
import TrustBar from "@/components/listing/TrustBar";
import ListingSEO from "@/components/listing/ListingSEO";
import NearbySection from "@/components/location/NearbySection";

import "./style.css";

// 🔥 Fetch function
async function getListings(location, category, page = 1, search = "", rating_min = "", tag = "") {
  try {
    const params = new URLSearchParams({ page, search });
    if (rating_min) params.set("rating_min", rating_min);
    if (tag) params.set("tag", tag);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/listing/${location}/${category}?${params}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function generateMetadata({ params, searchParams }) {
  const pr = await params;
  const searchPr = await searchParams;

  const page = parseInt(searchPr?.page || "1");
  const search = searchPr?.search || "";
  const rating_min = searchPr?.rating_min || "";
  const tag = searchPr?.tag || "";

  const { location, category } = pr;
  const data = await getListings(location, category, page, search, rating_min, tag);

  if (!data) return {};

  return {
    title: data.seo.title,
    description: data.seo.description,
  };
}

export default async function ListingPage({ params, searchParams }) {
  const pr = await params;
  const searchPr = await searchParams;

  const { location, category } = pr;
  const page = parseInt(searchPr?.page || "1");
  const perPage = 10;
  const search = searchPr?.search || "";
  const rating_min = searchPr?.rating_min || "";
  const tag = searchPr?.tag || "";

  const data = await getListings(location, category, page, search, rating_min, tag);
  if (!data) {
    return <div className="con">No data found</div>;
  }

  const total = data.pagination.total;

  return (
    <>
      {/* HERO */}
      <ListingHero
        location={data.location.name}
        locationSlug={data.location.slug}
        category={data.category.name}
        total={total}
        lastUpdated={data.lastUpdated}
        search={search}
      />

      <div className="con">
        <div className="pl-body">
          {/* LISTINGS (client-side load more) — key forces remount when filters change */}
          <ListingsArea
            key={`${rating_min}-${tag}-${search}`}
            initialListings={data.listings || []}
            location={data.location.slug}
            locationName={data.location.name}
            category={data.category.slug}
            categoryData={data.category}
            total={total}
            page={data.pagination.page}
            totalPages={data.pagination.pages}
            perPage={perPage}
            ratingMin={rating_min}
            tag={tag}
          />
        </div>
      </div>

      {/* TRUST BAR (below listings, above SEO — matches reference) */}
      <TrustBar location={data.location.slug} />

      {/* SEO CONTENT */}
      <ListingSEO location={data.location.slug} category={data.category.slug} />

      {/* NEARBY & OTHER CATEGORIES */}
      <NearbySection
        variant="listing"
        locationName={data.location.name}
        locationSlug={data.location.slug}
        category={data.category}
        nearbyLocations={data.nearby_locations || []}
        otherCategories={data.other_categories || []}
      />
    </>
  );
}
