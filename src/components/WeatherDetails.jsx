import React from "react";

function WeatherDetails({ weather, unit }) {
  // Ensure weather object and necessary properties exist
  if (!weather || !weather.wind || !weather.main || !weather.visibility) {
    return <div>Loading weather details...</div>;
  }

  // Convert wind speed to km/h for metric units and to mph for imperial units
  const windSpeed =
    unit === "imperial"
      ? {
          value: (weather.wind.speed * 2.237).toFixed(2),
          unit: " mph",
        }
      : {
          value: (weather.wind.speed * 3.6).toFixed(2),
          unit: " km/h",
        };

  // Pressure remains the same, mb for both units
  const pressure = { value: weather.main.pressure, unit: " mb" };

  // Convert visibility from meters to miles if unit is imperial
  const visibility =
    unit === "imperial"
      ? {
          value: (weather.visibility / 1609).toFixed(2),
          unit: " miles",
        }
      : {
          value: (weather.visibility / 1000).toFixed(2),
          unit: " km",
        };

  return (
    <div className="weather-details">
      <div className="detail-box">
        <div className="detail-label">
          <h3>Wind</h3>
        </div>
        <div className="detail-value">
          <h2>
            {windSpeed.value}
            <span className="unit">{windSpeed.unit}</span>
          </h2>
        </div>
      </div>
      <div className="detail-box">
        <div className="detail-label">
          <h3>Humidity</h3>
        </div>
        <div className="detail-value">
          <h2>
            {weather.main.humidity}
            <span className="unit">%</span>
          </h2>
        </div>
      </div>
      <div className="detail-box">
        <div className="detail-label">
          <h3>Pressure</h3>
        </div>
        <div className="detail-value">
          <h2>
            {pressure.value}
            <span className="unit">{pressure.unit}</span>
          </h2>
        </div>
      </div>
      <div className="detail-box">
        <div className="detail-label">
          <h3>Visibility</h3>
        </div>
        <div className="detail-value">
          <h2>
            {visibility.value}
            <span className="unit">{visibility.unit}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
