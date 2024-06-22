import axios from "axios";

const API_KEY = "1453cc6a00fa9267982c2bc06702a5c3";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const fetchWeatherData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data; // Extract data from response
  } catch (error) {
    throw error; // Rethrow the error for centralized error handling
  }
};

export const getWeather = async (city, unit) => {
  const endpoint = `${BASE_URL}weather?q=${city}&units=${unit}&appid=${API_KEY}`;
  return fetchWeatherData(endpoint);
};

export const getWeatherForecast = async (city, unit) => {
  const endpoint = `${BASE_URL}forecast?q=${city}&units=${unit}&appid=${API_KEY}`;
  return fetchWeatherData(endpoint);
};
