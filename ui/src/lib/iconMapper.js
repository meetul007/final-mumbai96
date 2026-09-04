export function getIcon(item) {
  const text =
    `${item?.title || ""} ${item?.name || ""} ${item?.description || ""}`.toLowerCase();

  if (text.includes("airport") || text.includes("flight")) return "✈️";
  if (text.includes("train") || text.includes("rail")) return "🚆";
  if (text.includes("metro")) return "🚇";
  if (text.includes("mall") || text.includes("shopping")) return "🛍️";
  if (
    text.includes("temple") ||
    text.includes("mosque") ||
    text.includes("church")
  )
    return "🕌";
  if (text.includes("hospital") || text.includes("clinic")) return "🏥";
  if (text.includes("school") || text.includes("education")) return "🏫";
  if (text.includes("food") || text.includes("restaurant")) return "🍽️";
  if (text.includes("bar") || text.includes("night")) return "🍻";
  if (text.includes("park") || text.includes("garden")) return "🌳";
  if (text.includes("business") || text.includes("office")) return "🏢";
  if (text.includes("market")) return "🛒";

  return "📍";
}
