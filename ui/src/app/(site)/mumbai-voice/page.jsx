import VoiceClient from "./VoiceClient";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const metadata = {
  title: "Mumbai Voice — Mumbai96",
  description: "Vote on area issues. Raise complaints. Start discussions. This is your platform to be heard — by your community, by local authorities, and by Mumbai itself.",
};

export default async function Page() {
  let initialTopics = [];
  let initialPagination = null;

  try {
    const res = await fetch(`${API}/api/public/voice?per_page=10&sort=newest`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.topics && data.topics.length > 0) {
        initialTopics = data.topics.map(t => ({
          ...t,
          handle: null,
          time: t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Just now',
        }));
        initialPagination = data.pagination || null;
      }
    }
  } catch (e) {}

  return <VoiceClient initialTopics={initialTopics} initialPagination={initialPagination} />;
}
