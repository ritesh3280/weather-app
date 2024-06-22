import axios from "axios";

const API_KEY = "1453cc6a00fa9267982c2bc06702a5c3";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const getWeather = async (city, unit) => {
  return axios.get(
    `${BASE_URL}weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
};

export const getWeatherForecast = async (city, unit) => {
  return axios.get(
    `${BASE_URL}forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );
};
