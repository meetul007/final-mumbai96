export async function performSearch(query, router) {
  if (!query.trim()) return;

  const encoded = encodeURIComponent(query);
  const fallbackRoute = `/know-mumbai?q=${encoded}`;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/public/search?q=${encoded}`,
    );

    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();

    if (data?.redirect) {
      router.push(`${data.redirect}?q=${encoded}`);
    } else {
      router.push(fallbackRoute);
    }
  } catch (err) {
    console.error(err);
    router.push(fallbackRoute);
  }
}
