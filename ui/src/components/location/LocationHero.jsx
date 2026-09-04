import { getWeather } from "@/lib/weather";
import TemperaturePopulation from "./TempraturePopulation";

export default async function LocationHero({
  location,
  regionLabel,
  weatherKey,
  population,
  tagline,
  image,
  icon_image,
}) {
  const weather = await getWeather(weatherKey || location);

  return (
    <section className="loc-hero">
      {image && (
        <div
          className="loc-hero-bg"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}
      <div className="loc-hero-overlay"></div>
      <div className="loc-hero-content">
        <div className="loc-hero-badge">
          <span></span> {regionLabel || "Mumbai"} · {location}
        </div>
        <h1 className="loc-hero-title">
          Explore <em>{location}</em>
        </h1>
        <p className="loc-hero-sub">
          {tagline ||
            `Places · Food · Property · Nightlife · People · Services · Local Life — your complete guide to ${location}.`}
        </p>
        <TemperaturePopulation population={population || "8L+"} weather={weather} />
      </div>
      <div className="loc-hero-media">
        {icon_image ? (
          <img src={icon_image} alt={location} />
        ) : (
          <div className="loc-hero-icon-placeholder">
            {location?.charAt(0) || "M"}
          </div>
        )}
      </div>
    </section>
  );
}
