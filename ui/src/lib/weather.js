const locationMap = {
  "virar west": { lat: 19.4559, lon: 72.8114 },
  "virar east": { lat: 19.458, lon: 72.83 },
  "andheri east": { lat: 19.1136, lon: 72.8697 },
  "borivali west": { lat: 19.2307, lon: 72.8567 },
};

function mapWeatherCode(code) {
  if (code === 0) return "☀ Clear";
  if ([1, 2].includes(code)) return "🌤 Partly Cloudy";
  if (code === 3) return "☁ Cloudy";
  if ([45, 48].includes(code)) return "🌫 Fog";
  if ([51, 53, 55].includes(code)) return "🌦 Drizzle";
  if ([61, 63, 65].includes(code)) return "🌧 Rain";
  if ([71, 73, 75].includes(code)) return "❄ Snow";
  if ([95].includes(code)) return "⛈ Thunderstorm";
  return "☁ Weather";
}

export async function getWeather(slug) {
  const normalized = (slug || "").replace(/-/g, " ").toLowerCase().trim();
  let loc = locationMap[normalized];

  if (!loc && normalized) {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(normalized + " mumbai")}&count=1&language=en&format=json`,
        { next: { revalidate: 86400 } },
      );

      if (geoRes.ok) {
        const geo = await geoRes.json();
        const first = geo?.results?.[0];
        if (first?.latitude && first?.longitude) {
          loc = { lat: first.latitude, lon: first.longitude };
        }
      }
    } catch {
      // Use null fallback below.
    }
  }

  if (!loc) return null;

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&hourly=precipitation_probability`,
    {
      next: { revalidate: 600 }, // cache 10 mins
    },
  );

  if (!res.ok) return null;

  const data = await res.json();

  return {
    temp: Math.round(data.current_weather.temperature),
    condition: mapWeatherCode(data.current_weather.weathercode),
    rainChance: data.hourly?.precipitation_probability?.[0] ?? 0,
  };
}
