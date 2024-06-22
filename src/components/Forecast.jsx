import React from "react";

function Forecast({ forecast, unit }) {
  const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0);

  return (
    <div className="forecast">
      {dailyForecast.map((item, index) => {
        const iconURL = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

        return (
          <div key="index" className="forecast-item">
            <div>
              {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </div>
            <img src={iconURL} alt={item.weather[0].description} />
            <div>
              Min: {item.main.temp_min}°{unit === "metric" ? "C" : "F"}
            </div>
            <div>
              Max: {item.main.temp_max}°{unit === "metric" ? "C" : "F"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Forecast;
