

import LocationHero from "@/components/location/LocationHero";
import ServiceSection from "@/components/location/ServiceSection";

import Link from "next/link";
import AboutSection from "@/components/location/About";
import GuideSection from "@/components/location/GuideSection";
import FoodSection from "@/components/location/FoodSection";
import CommuteSection from "@/components/location/CommuteSection";
import LocalLifeSection from "@/components/location/LocalLifeSection";
import WhySection from "@/components/location/WhySection";
import ProseSection from "@/components/location/ProseSection";
import NearbySection from "@/components/location/NearbySection";
import SubAreas from "@/components/location/SubAreas";
import PropertyPrices from "@/components/location/PropertyPrices";
import FaqSection from "@/components/location/FaqSection";
import CivicData from "@/components/location/CivicData";
import GroupedListingSection from "@/components/location/GroupedListingSection";
import CharacterVibe from "@/components/location/CharacterVibe";
import ResidentProfile from "@/components/location/ResidentProfile";
import LocalEvents from "@/components/location/LocalEvents";
import UpcomingProjects from "@/components/location/UpcomingProjects";
import ResidentialSocieties from "@/components/location/ResidentialSocieties";
import AreaReportCard from "@/components/location/AreaReportCard";
import CategoryGroupSection from "@/components/location/CategoryGroupSection";
import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
// import MicroLocalities from './../../../components/location/MicroLocalities';

export const revalidate = 600;

// const STATIC_DATA_DIR = path.join(process.cwd(), "src", "data", "locations-static");
const STATIC_DATA_DIR = path.join(process.cwd(), "src", "data", "live-location");

const STATIC_ONLY_MODE = process.env.LOCATION_DATA_SOURCE === "static";


const LOCATION_REGIONS = {
  // ── Central Mumbai ──────────────────────────
  "dadar-east":                 { slug: "central-mumbai", label: "Central Mumbai" },
  "dadar-west":                 { slug: "central-mumbai", label: "Central Mumbai" },
  "lower-parel-east":           { slug: "central-mumbai", label: "Central Mumbai" },
  "lower-parel-west":           { slug: "central-mumbai", label: "Central Mumbai" },
  "matunga":                    { slug: "central-mumbai", label: "Central Mumbai" },
  "prabhadevi":                 { slug: "central-mumbai", label: "Central Mumbai" },
  "sion":                       { slug: "central-mumbai", label: "Central Mumbai" },
  "wadala":                     { slug: "central-mumbai", label: "Central Mumbai" },

  // ── Central Suburbs ─────────────────────────
  "bhandup":                    { slug: "central-suburbs", label: "Central Suburbs" },
  "ghatkopar-east":             { slug: "central-suburbs", label: "Central Suburbs" },
  "ghatkopar-west":             { slug: "central-suburbs", label: "Central Suburbs" },
  "kurla":                      { slug: "central-suburbs", label: "Central Suburbs" },
  "mulund-east":                { slug: "central-suburbs", label: "Central Suburbs" },
  "mulund-west":                { slug: "central-suburbs", label: "Central Suburbs" },
  "powai":                      { slug: "central-suburbs", label: "Central Suburbs" },
  "vikhroli":                   { slug: "central-suburbs", label: "Central Suburbs" },

  // ── Harbour Suburbs ─────────────────────────
  "chembur":                    { slug: "harbour-suburbs", label: "Harbour Suburbs" },

  // ── Mira-Bhayandar ──────────────────────────
  "bhayandar-east":             { slug: "mira-bhayandar", label: "Mira-Bhayandar" },
  "bhayandar-west":             { slug: "mira-bhayandar", label: "Mira-Bhayandar" },
  "mira-road-east":             { slug: "mira-bhayandar", label: "Mira-Bhayandar" },
  "uttan":                      { slug: "mira-bhayandar", label: "Mira-Bhayandar" },

  // ── Mumbai City ─────────────────────────────
  "mahim":                      { slug: "mumbai-city", label: "Mumbai City" },

  // ── South Mumbai ────────────────────────────
  "altamount-road":             { slug: "south-mumbai", label: "South Mumbai" },
  "breach-candy":               { slug: "south-mumbai", label: "South Mumbai" },
  "byculla":                    { slug: "south-mumbai", label: "South Mumbai" },
  "charni-road":                { slug: "south-mumbai", label: "South Mumbai" },
  "churchgate":                 { slug: "south-mumbai", label: "South Mumbai" },
  "colaba":                     { slug: "south-mumbai", label: "South Mumbai" },
  "cuffe-parade":               { slug: "south-mumbai", label: "South Mumbai" },
  "fort":                       { slug: "south-mumbai", label: "South Mumbai" },
  "grant-road":                 { slug: "south-mumbai", label: "South Mumbai" },
  "kalbadevi":                  { slug: "south-mumbai", label: "South Mumbai" },
  "mahalaxmi":                  { slug: "south-mumbai", label: "South Mumbai" },
  "malabar-hill":               { slug: "south-mumbai", label: "South Mumbai" },
  "marine-lines":               { slug: "south-mumbai", label: "South Mumbai" },
  "mumbai-central":             { slug: "south-mumbai", label: "South Mumbai" },
  "pedder-road":                { slug: "south-mumbai", label: "South Mumbai" },
  "tardeo":                     { slug: "south-mumbai", label: "South Mumbai" },
  "worli":                      { slug: "south-mumbai", label: "South Mumbai" },

  // ── Western Suburbs ─────────────────────────
  "andheri-east":               { slug: "western-suburbs", label: "Western Suburbs" },
  "andheri-west":               { slug: "western-suburbs", label: "Western Suburbs" },
  "bandra-east":                { slug: "western-suburbs", label: "Western Suburbs" },
  "bandra-west":                { slug: "western-suburbs", label: "Western Suburbs" },
  "bkc":                        { slug: "western-suburbs", label: "Western Suburbs" },
  "borivali-east":              { slug: "western-suburbs", label: "Western Suburbs" },
  "borivali-west":              { slug: "western-suburbs", label: "Western Suburbs" },
  "dahisar-east":               { slug: "western-suburbs", label: "Western Suburbs" },
  "dahisar-west":               { slug: "western-suburbs", label: "Western Suburbs" },
  "gorai":                      { slug: "western-suburbs", label: "Western Suburbs" },
  "goregaon-east":              { slug: "western-suburbs", label: "Western Suburbs" },
  "goregaon-west":              { slug: "western-suburbs", label: "Western Suburbs" },
  "jogeshwari-east":            { slug: "western-suburbs", label: "Western Suburbs" },
  "jogeshwari-west":            { slug: "western-suburbs", label: "Western Suburbs" },
  "juhu":                       { slug: "western-suburbs", label: "Western Suburbs" },
  "kandivali-east":             { slug: "western-suburbs", label: "Western Suburbs" },
  "kandivali-west":             { slug: "western-suburbs", label: "Western Suburbs" },
  "khar-east":                  { slug: "western-suburbs", label: "Western Suburbs" },
  "khar-west":                  { slug: "western-suburbs", label: "Western Suburbs" },
  "madh-marve-island":          { slug: "western-suburbs", label: "Western Suburbs" },
  "malad-east":                 { slug: "western-suburbs", label: "Western Suburbs" },
  "malad-west":                 { slug: "western-suburbs", label: "Western Suburbs" },
  "naigaon-east":               { slug: "western-suburbs", label: "Western Suburbs" },
  "naigaon-west":               { slug: "western-suburbs", label: "Western Suburbs" },
  "nalasopara-east":            { slug: "western-suburbs", label: "Western Suburbs" },
  "nalasopara-west":            { slug: "western-suburbs", label: "Western Suburbs" },
  "pali-hill":                  { slug: "western-suburbs", label: "Western Suburbs" },
  "santacruz-east":             { slug: "western-suburbs", label: "Western Suburbs" },
  "santacruz-west":             { slug: "western-suburbs", label: "Western Suburbs" },
  "vasai-east":                 { slug: "western-suburbs", label: "Western Suburbs" },
  "vasai-west":                 { slug: "western-suburbs", label: "Western Suburbs" },
  "versova":                    { slug: "western-suburbs", label: "Western Suburbs" },
  "vile-parle-east":            { slug: "western-suburbs", label: "Western Suburbs" },
  "vile-parle-west":            { slug: "western-suburbs", label: "Western Suburbs" },
  "virar-east":                 { slug: "western-suburbs", label: "Western Suburbs" },
  "virar-west":                 { slug: "western-suburbs", label: "Western Suburbs" },

};

function getRegion(locationSlug) {
  return LOCATION_REGIONS[locationSlug] || { slug: "south-mumbai", label: "South Mumbai" };
}

function toDisplayName(slug) {
  return (slug || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// Build a quick lookup: group_key → group data
function buildGroupMap(categoryGroups) {
  const map = {};
  if (categoryGroups) {
    for (const g of categoryGroups) {
      map[g.key] = g;
    }
  }
  return map;
}

const getLocationData = cache(async (slug) => {
  if (!slug) return null;

  // 1) Prefer local static file
  try {
    const staticFilePath = path.join(STATIC_DATA_DIR, `${slug}.json`);
    const raw = await fs.readFile(staticFilePath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch {
    // No static file for this slug
  }

  // 2) Static-only mode
  if (STATIC_ONLY_MODE) {
    return null;
  }

  // 3) Fallback to remote API
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/location/${slug}`,
      {
        next: { revalidate: 600 },
      },
    );

    if (!res.ok) throw new Error("Failed");

    return res.json();
  } catch (err) {
    return null;
  }
});

export async function generateMetadata({ params }) {
  const pr = await params;
  const slug = pr?.location;

  const data = await getLocationData(slug);

  if (data) {
    const title =
      data.seo_title ||
      `${data.name} Mumbai - Complete Local Guide 2026 | Mumbai96`;
    const description =
      data.seo_description ||
      `Complete guide to ${data.name}, Mumbai - property prices, schools, hospitals, commute and local services. Mumbai96.`;

    return {
      title,
      description,
      keywords: data.seo_keywords || `${data.name} Mumbai, ${data.name} guide`,
      openGraph: {
        title: title,
        description: description,
        type: "website",
        locale: "en_IN",
        siteName: "Mumbai96",
        url: `https://mumbai96.vercel.app/${slug}`,
        images: data.image
          ? [{ url: data.image, width: 1200, height: 630 }]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: data.image ? [data.image] : [],
      },
      alternates: {
        canonical: `https://mumbai96.vercel.app/${slug}`,
      },
    };
  }

  return {
    title: "Location Guide | Mumbai96",
    description: "Explore Mumbai neighbourhoods with Mumbai96.",
  };
}

export default async function LocationPage({ params }) {
  const pr = await params;
  const location = pr?.location;
  const region = getRegion(location);

  const data = await getLocationData(location);
  console.log(data);

  if (!data) {
    return <div className="container py-5">Location not found</div>;
  }

  const formattedLocation = data?.name || toDisplayName(location);

  // Build food tags array
  const foodTags = data.food_tags
    ? data.food_tags.split(",").map((t) => t.trim())
    : [];

  // Build highlight stats
  const highlights = [
    { value: data.population || "—", label: "Est. Popul. 2026" },
    { value: data.municipal_body || "—", label: "Municipal Body" },
    {
      value: typeof data.civic_data?.ward === "object"
        ? data.civic_data.ward.value
        : data.civic_data?.ward || "—",
      label: "Ward",
    },
    {
      value: typeof data.civic_data?.assembly_constituency === "object"
        ? data.civic_data.assembly_constituency.value
        : data.civic_data?.assembly_constituency || "—",
      label: "Assembly",
    },
  ];

  const visibleHighlights = highlights.filter(
    (h) => h.value !== "—" && h.value !== "",
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: data.name,
    description: data.seo_description || data.about,
    url: `https://mumbai96.vercel.app/${location}`,
    containedInPlace: {
      "@type": "City",
      name: "Mumbai",
    },
  };

  const sections = data.category_sections || [];

  const renderGroup = (index) => {
  const section = sections[index];
  if (!section || !section.categories || section.categories.length === 0) {
    return null;
  }
  return (
    <CategoryGroupSection
      key={section.key || `section-${index}`}
      group={{
        key: section.key || `section-${index}`,
        label: section.heading,        // component label use karta hai
        heading: section.heading,       // ya heading — dono support
        icon: '',
        categories: section.categories,
      }}
      location={location}
    />
  );
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <LocationHero
        location={formattedLocation}
        regionLabel={region.label}
        weatherKey={location}
        population={data.population}
        image={data.image}
        tagline={`Places · Food · Property · Nightlife · People · Services · Local Life — your complete guide to ${formattedLocation}.`}
        icon_image={data.location_icon}
        badge={`Mumbai · ${formattedLocation}`}
        stats={visibleHighlights}
      />

      {/* ── Breadcrumb ── */}
      <nav className="bc">
        <Link href={"/"}> Home › </Link>
        <Link href={`/${region.slug}`}>{region.label} › </Link>
        {formattedLocation}
      </nav>


      <AboutSection
  location={location}
  title={data?.about_title}
  description1={data.about}
  commute={data.about_commute}
  tag={data.about_tag}
  stats={data.about_stats || []}
  image={data?.image}
/>

      {/* ── Places to See ── */}
      <GuideSection
        id="places"
        label="📍 Places to See"
        title="Places to See"
        location={location}
        description="Landmarks, leisure spots and local gems worth exploring."
        items={data.places_to_visit}
      />

      {/* ── Food ── */}
      <FoodSection
        location={location}
        description={`${formattedLocation} has a diverse food scene with local specialities and popular eateries.`}
        tags={foodTags}
        items={data.food}
      />

      {/* ── Nightlife ── */}
      <GuideSection
        id="nightlife"
        label="🌙 Nightlife"
        title="Nightlife"
        location={location}
        description="After dark — bars, lounges and evening spots."
        items={data?.night_life}
        variant="list"
        tips={data?.night_life_tips}
      />

      {/* ── Category Group 0: Food, Real Estate & Health ── */}
      {renderGroup(0)}

      {/* ── Sub-Areas ── */}
      <SubAreas
        items={data.sub_areas}
        location={location}
        description={`${location} is a collection of distinct micro-areas, each with its own character, community and livability quotient.`}
      />

      {/* ── Character / Vibe ── */}
      <CharacterVibe
        location={location}
        items={data.character_vibe}
        description={data.character_vibe_description}
        image={data.character_vibe_image}
      />

      {/* ── Category Group 1: Clinics, Shopping & Home Services ── */}
      {renderGroup(1)}

      {/* ── Resident Profile ── */}
      <ResidentProfile
        location={location}
        items={data.resident_profile}
        description={data.resident_profile_description}
        image={data.resident_profile_image}
      />

      {/* ── Property Prices ── */}
      <PropertyPrices
        items={data.property_prices}
        location={location}
        // note={data.property_note}
      />

      {/* ── Category Group 2: Culture, Spirituality & Medical Specialists ── */}
      {renderGroup(2)}

      {/* ── Schools ── */}
      <GuideSection
        id="schools"
        label="🏫 Schools"
        title="Schools"
        location={location}
        description={`Notable schools and educational institutions in ${formattedLocation}.`}
        items={data?.schools}
        variant="list"
      />

      {/* ── Hospitals ── */}
      <GuideSection
        id="hospitals"
        label="🏥 Hospitals"
        title="Hospitals & Healthcare"
        location={location}
        description={`Major hospitals and healthcare facilities serving ${formattedLocation}.`}
        items={data?.hospitals}
        variant="list"
      />

      {/* ── Category Group 3: Automobiles, Entertainment & Education ── */}
      {renderGroup(3)}

      {/* ── Banks / Markets ── */}
      <GuideSection id="banks" location={location} items={data.banks} />
      <GuideSection id="markets" location={location} items={data.markets} />

      {/* ── Grouped Listings ── */}
      {data.grouped_listings &&
        Object.entries(data.grouped_listings).map(([groupKey, group]) => (
          <GroupedListingSection
            key={groupKey}
            groupKey={groupKey}
            group={group}
            location={location}
          />
        ))}

      {/* ── Category Group 4: Wellness, Beauty & Events ── */}
      {renderGroup(4)}

      {/* ── Commute ── */}
      <CommuteSection
        location={location}
        description={data.commute_description || `${formattedLocation} is one of Mumbai's well-connected areas...`}
        items={data.travelling_connectivity}
      />

      {/* ── Major Employers ── */}
      <GuideSection
        id="employers"
        label="🏢 Major Employers"
        title="Major Employers"
        location={location}
        description={`Key employers and economic drivers in ${formattedLocation}.`}
        items={data?.major_employers}
        variant="list"
      />

      {/* ── Residential Societies ── */}
      <ResidentialSocieties
        items={data.residential_societies}
        location={location}
      />

      {/* ── Local Events ── */}
      <LocalEvents items={data.local_events} location={location} />

      {/* ── Upcoming Projects ── */}
      <UpcomingProjects items={data.upcoming_projects} location={location} />

      {/* ── Category Group 5: Care, Community & Safety ── */}
      {renderGroup(5)}

      {/* ── Civic Data ── */}
      <CivicData data={data.civic_data} location={location} />

      {/* ── Area Report Card ── */}
      <AreaReportCard data={data.area_report_card} location={location} />

      {/* ── Local Life ── */}
      <LocalLifeSection
        location={location}
        description={`Everything you need to know about daily life, housing and community in ${formattedLocation}.`}
        items={data.living_style}
      />

      {/* ── Category Group 6: Repairs, Tutoring & Hospitality ── */}
      {renderGroup(6)}

      {/* ── FAQ ── */}
      {/* <FaqSection items={data.faq} location={location} /> */}

      {/* ── Per-category Service Sections ── */}
      {data.categories?.slice(0, 10).map((cat, index) => (
        <ServiceSection
          location={location}
          category={cat.name}
          emoji={cat.emoji}
          image={cat.image}
          description={cat.description}
          benefits={[
            "Verified listings with real Mumbaikar reviews",
            "Direct phone numbers — call instantly",
            "Updated availability and contact details",
            "Compare multiple options before you decide",
          ]}
          faq={{
            question: `How do I find the best ${cat.name} in ${formattedLocation}?`,
            answer: `Browse Mumbai96's ${formattedLocation} listings, read reviews from locals and call directly. Our verified directory makes it easy.`,
          }}
          key={`service-${cat.slug}-${location}`}
          slug={cat.slug}
          reverse={index % 2}
        />
      ))}

      {/* ── Category Group 7: Finance, Insurance & Home Decor ── */}
      {renderGroup(7)}

      {/* ── Why Mumbai96 ── */}
      <WhySection
        location={location}
        items={[
          {
            icon: "✅",
            title: "Trusted Businesses",
            description: `Every business in ${formattedLocation} on Mumbai96 is verified for contact accuracy and legitimacy.`,
          },
          {
            icon: "⭐",
            title: "Real Reviews from Mumbaikars",
            description: `Genuine reviews from ${formattedLocation} residents - no fake ratings, no paid promotions.`,
          },
          {
            icon: "📞",
            title: "Direct Contact - No Middlemen",
            description: `Call any ${formattedLocation} business directly from Mumbai96 - no middlemen, no commissions.`,
          },
          {
            icon: "🏘️",
            title: "Local - Mumbai Region Only",
            description: `Built for Mumbai's localities - ${formattedLocation}-specific results, not generic national listings.`,
          },
          {
            icon: "🔄",
            title: "Updated Promptly",
            description: `Listings are regularly updated - you always get current numbers and information for ${formattedLocation}.`,
          },
          {
            icon: "🆓",
            title: "Free for All Users",
            description: `Finding any service in ${formattedLocation} on Mumbai96 is completely free for residents.`,
          },
        ]}
      />

      {/* ── Prose ── */}
      <ProseSection location={location} sections={data.best_services} />

      {/* ── Nearby ── */}
      <NearbySection locations={data.nearby_locations} />
    </>
  );
}