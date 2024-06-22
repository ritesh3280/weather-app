import React from "react";

function WeatherCard({ weather, unit }) {
  // Check if weather is undefined or its properties are undefined
  if (
    !weather ||
    !weather.main ||
    !weather.weather ||
    weather.weather.length === 0
  ) {
    return null; // Or display a loading indicator/error message
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  // Function to capitalize the first letter of each word in a string
  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <div className="weather-temp">
        {weather.main.temp}°{unit === "metric" ? "C" : "F"}
      </div>
      <div className="weather-desc">
        {capitalizeFirstLetter(weather.weather[0].description)}
      </div>
    </div>
  );
}

export default WeatherCard;
