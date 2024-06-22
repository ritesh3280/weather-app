import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import SearchBox from "./components/SearchBox";
import { getWeather, getWeatherForecast } from "./api/weatherAPI";
import "./App.css";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Los Angeles");
  const [unit, setUnit] = useState("imperial");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeather(city, unit);
        setCurrentWeather(weatherData);

        const forecastData = await getWeatherForecast(city, unit);
        setForecast(forecastData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors: display an error message or fallback data
      }
    };

    fetchData();
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="app">
      <div className="main-content">
        <div className="left-panel">
          <SearchBox city={city} setCity={handleSearch} />
          <WeatherCard weather={currentWeather} unit={unit} />
        </div>
        <button onClick={toggleUnit}>°C / °F</button>
        <div className="right-panel">
          <Forecast forecast={forecast} unit={unit} />
          <WeatherDetails weather={currentWeather} />
        </div>
      </div>
    </div>
  );
};

export default App;
