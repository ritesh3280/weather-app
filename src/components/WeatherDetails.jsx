import React from "react";

function WeatherDetails({ details }) {
  return (
    <div className="weather-details">
      <div>Wind: {details.wind.speed}</div>
      <div>Humidity: {details.main.humidity}</div>
      <div>Pressure: {details.main.pressure}</div>
      <div>Visibility: {details.visibility / 1000}</div>
    </div>
  );
}

export default WeatherDetails;
