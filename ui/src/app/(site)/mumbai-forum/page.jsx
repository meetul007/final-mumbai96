import ForumClient from "./ForumClient";

export const metadata = {
  title: "Mumbai Forum — Mumbai96",
  description: "Ask, answer, and share knowledge with fellow Mumbaikars. From traffic updates to property advice — get answers from people who know Mumbai best.",
};

export default async function Page() {
  let initialQuestions = [];
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${base}/api/public/forum?per_page=50`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      initialQuestions = data.questions || [];
    }
  } catch (e) {}

  return <ForumClient initialQuestions={initialQuestions} />;
}
