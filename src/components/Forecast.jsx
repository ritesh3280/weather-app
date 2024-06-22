import React from "react";

function Forecast({ forecast, unit }) {
  // Check if forecast is undefined or its list property is undefined
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return null; // Or display a loading indicator/error message
  }

  // Function to filter forecast data to get one entry per day
  const filterDailyForecast = (list) => {
    const dailyForecast = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US");
      // Check if we already have an entry for this day
      if (!dailyForecast[date]) {
        dailyForecast[date] = [];
      }
      dailyForecast[date].push(item);
    });

    // Convert object back to array
    return Object.values(dailyForecast);
  };

  // Filter forecast data to get one entry per day
  const dailyForecast = filterDailyForecast(forecast.list);

  // Function to calculate min/max temperatures and most frequent icon for each day
  const calculateDailyData = () => {
    // Take today and the next 4 days
    const daysToShow = dailyForecast.slice(0, 5);

    return daysToShow.map((items, index) => {
      // Calculate min/max temperatures for the day
      let minTemp = Infinity;
      let maxTemp = -Infinity;

      items.forEach((item) => {
        if (item.main.temp_min < minTemp) {
          minTemp = item.main.temp_min;
        }
        if (item.main.temp_max > maxTemp) {
          maxTemp = item.main.temp_max;
        }
      });

      // Round minTemp and maxTemp to nearest whole number
      minTemp = Math.round(minTemp);
      maxTemp = Math.round(maxTemp);

      // Calculate most frequent weather icon
      const iconCountMap = {};
      let maxIconCount = 0;
      let mostFrequentIcon = "";

      items.forEach((item) => {
        const icon = item.weather[0].icon;
        if (iconCountMap[icon]) {
          iconCountMap[icon]++;
        } else {
          iconCountMap[icon] = 1;
        }

        if (iconCountMap[icon] > maxIconCount) {
          maxIconCount = iconCountMap[icon];
          mostFrequentIcon = icon;
        }
      });

      // Determine the day label based on index
      let dayLabel;
      if (index === 0) {
        dayLabel = "Today";
      } else if (index === 1) {
        dayLabel = "Tomorrow";
      } else {
        dayLabel = new Date(items[0].dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        });
      }

      // Return daily data
      return {
        dayLabel: dayLabel,
        minTemp: minTemp,
        maxTemp: maxTemp,
        mostFrequentIcon: mostFrequentIcon,
      };
    });
  };

  // Get daily data
  const dailyData = calculateDailyData();

  return (
    <div className="forecast">
      {dailyData.map((day, index) => {
        const iconURL = `http://openweathermap.org/img/wn/${day.mostFrequentIcon}@2x.png`;

        return (
          <div key={index} className="forecast-item">
            <div className="forecast-content">
              <div className="day-label">{day.dayLabel}</div>
              <img src={iconURL} alt="Weather Icon" className="weather-icon" />
              <div className="temp-label">
                Min: {day.minTemp}°{unit === "metric" ? "C" : "F"}
              </div>
              <div className="temp-label">
                Max: {day.maxTemp}°{unit === "metric" ? "C" : "F"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Forecast;
