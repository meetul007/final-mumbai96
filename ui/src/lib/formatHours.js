export function formatTime(time) {
  if (!time) return "";

  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);

  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${m} ${suffix}`;
}

export function isOpenNow(openingHours) {
  if (!openingHours) return false;

  const now = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayKey = days[now.getDay()];

  const today = openingHours[todayKey];

  if (!today || today.closed) return false;

  const currentTime = now.getHours() * 60 + now.getMinutes();

  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);

  const openTime = oh * 60 + om;
  const closeTime = ch * 60 + cm;

  return currentTime >= openTime && currentTime <= closeTime;
}
