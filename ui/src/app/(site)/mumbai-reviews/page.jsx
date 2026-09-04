import ReviewsClient from "./ReviewsClient";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const metadata = {
  title: "Mumbai Reviews — Mumbai96",
  description: "Real reviews from real Mumbaikars — builders, brokers, contractors, doctors, service providers and more. Read before you deal. Write to help others.",
};

export default async function Page() {
  let initialReviews = [];

  try {
    const res = await fetch(`${API}/api/public/reviews?per_page=100&sort=newest`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      initialReviews = (data.reviews || []).map(r => ({
        ...r,
        id: r.id || 'api-' + r.id,
        date: r.created_at ? r.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
        helpful: r.helpful_count || 0,
      }));
    }
  } catch (e) {}

  return <ReviewsClient initialReviews={initialReviews} />;
}
