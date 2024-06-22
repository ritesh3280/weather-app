import React from "react";

function WeatherCard({ weather }) {
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      <img src={iconUrl} alt={weather.weather[0].description} />

      <div className="weather-temp">{weather.temp}</div>

      <div className="weather-temp-range">
        Min: {weather.temp_min}°{unit === "metric" ? "C" : "F"} | Max:
        {weather.temp.max}°{unit === "metric" ? "C" : "F"}
      </div>
      
      <div className="weather-desc">{weather.weather[0].description}</div>
    </div>
  );
}

export default WeatherCard;
