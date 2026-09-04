import LostFoundClient from "./LostFoundClient";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const metadata = {
  title: "Mumbai Lost & Found — Mumbai96",
  description: "Free community lost and found board for Mumbaikars. Post lost items, report found belongings, and help reunite Mumbai's community.",
};

export default async function Page() {
  let initialListings = [];
  try {
    const res = await fetch(`${API}/api/public/lost-found?per_page=50`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      initialListings = data.listings || [];
    }
  } catch (e) {}

  return <LostFoundClient initialListings={initialListings} />;
}
