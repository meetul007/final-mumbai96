import CelebritiesClient from "./CelebritiesClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const metadata = {
  title: "Mumbai Celebrities — Mumbai96",
  description: "Bollywood legends, Marathi natak artists, TV icons, digital influencers, top producers and sporting heroes — every celebrity who called Mumbai home.",
};

export default async function Page() {
  let initialData = {
    celebrities: [],
    featured: [],
    total: 0,
    pages: 0,
    categories: [],
  };

  try {
    const [mainRes, featuredRes] = await Promise.all([
      fetch(`${API_BASE}/api/public/celebrities?page=1&per_page=20`, { cache: "no-store" }),
      fetch(`${API_BASE}/api/public/celebrities?page=1&per_page=3`, { cache: "no-store" }),
    ]);

    if (mainRes.ok) {
      const json = await mainRes.json();
      initialData.celebrities = json.celebrities || [];
      initialData.total = json.pagination?.total || 0;
      initialData.pages = json.pagination?.pages || 0;
      initialData.categories = json.categories || [];
    }

    if (featuredRes.ok) {
      const json = await featuredRes.json();
      initialData.featured = (json.celebrities || []).slice(0, 3);
    }
  } catch (e) {}

  return <CelebritiesClient initialData={initialData} />;
}
