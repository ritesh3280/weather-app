import React from "react";

function WeatherDetails({ weather }) {
  // Ensure weather object and necessary properties exist
  if (!weather || !weather.wind || !weather.main || !weather.visibility) {
    return <div>Loading weather details...</div>;
  }

  return (
    <div className="weather-details">
      <div className="detail-box">
        <div className="detail-label">Wind</div>
        <div className="detail-value">{weather.wind.speed} m/s</div>
      </div>
      <div className="detail-box">
        <div className="detail-label">Humidity</div>
        <div className="detail-value">{weather.main.humidity}%</div>
      </div>
      <div className="detail-box">
        <div className="detail-label">Pressure</div>
        <div className="detail-value">{weather.main.pressure} mb</div>
      </div>
      <div className="detail-box">
        <div className="detail-label">Visibility</div>
        <div className="detail-value">
          {Math.round(weather.visibility / 1000)} km
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
