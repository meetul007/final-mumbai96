export default function TemperaturePopulation({ population, weather }) {
  return (
    <div className="loc-stats">
      {/* Population */}
      <div>
        <div className="loc-stat-name">Est. Popl</div>

        <div className="loc-stat-value">{population}</div>
      </div>

      {/* Temperature */}
      <div>
        <div className="loc-stat-name">🌡 TEMP</div>

        <div className="loc-stat-value">
          {weather?.temp ? `${weather.temp}°C` : "--°C"}
        </div>
      </div>

      {/* Condition */}
      <div>
        <div className="loc-stat-name">☁ Weather</div>

        <div className="loc-stat-value">{weather?.condition || "--"}</div>
      </div>

      {/* Rain */}
      <div>
        <div className="loc-stat-name">🌧 Rain Chance</div>

        <div className="loc-stat-value">
          {weather?.rainChance !== undefined ? `${weather.rainChance}%` : "--"}
        </div>
      </div>
    </div>
  );
}
