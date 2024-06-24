import React from "react";

// Map weather condition codes to custom SVG icon URLs
const iconMap = {
  "01d": "clear-day",
  "01n": "clear-night",
  "02d": "partly-cloudy-day",
  "02n": "partly-cloudy-night",
  "03d": "cloudy",
  "03n": "cloudy",
  "04d": "cloudy",
  "04n": "cloudy",
  "09d": "rain",
  "09n": "rain",
  "10d": "partly-cloudy-day-rain",
  "10n": "partly-cloudy-night-rain",
  "11d": "thunderstorms",
  "11n": "thunderstorms",
  "13d": "partly-cloudy-day-snow",
  "13n": "partly-cloudy-day-snow",
  "50d": "mist",
  "50n": "mist",
};

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

  const weatherIconCode = weather.weather[0].icon;
  const iconUrl = `https://bmcdn.nl/assets/weather-icons/v2.0/fill/${iconMap[weatherIconCode]}.svg`;

  // Function to capitalize the first letter of each word in a string
  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get current date in desired format
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <img
        className="weather-icon"
        src={iconUrl}
        alt={weather.weather[0].description}
      />
      <div className="weather-temp">
        {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
      </div>
      <div className="weather-desc">
        {capitalizeFirstLetter(weather.weather[0].description)}
      </div>
      <div className="current-date">{currentDate}</div>
    </div>
  );
}

export default WeatherCard;
