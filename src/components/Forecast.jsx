import React from "react";

// Map weather condition codes to custom SVG icon names
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
  "13n": "partly-cloudy-night-snow",
  "50d": "mist",
  "50n": "mist",
};

function Forecast({ forecast, unit }) {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return null; // Or display a loading indicator/error message
  }

  const filterDailyForecast = (list) => {
    const dailyForecast = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US");
      if (!dailyForecast[date]) {
        dailyForecast[date] = [];
      }
      dailyForecast[date].push(item);
    });

    return Object.values(dailyForecast);
  };

  const dailyForecast = filterDailyForecast(forecast.list);

  const calculateDailyData = () => {
    const daysToShow = dailyForecast.slice(1, 5); // Start from tomorrow to next 4 days

    return daysToShow.map((items, index) => {
      // Group items into 8 intervals (24 hours)
      const groupedItems = [];
      for (let i = 0; i < items.length; i += 8) {
        groupedItems.push(items.slice(i, i + 8));
      }

      // Calculate min/max temperature for each group
      const dailyTemps = groupedItems.map((group) => {
        let minTemp = Infinity;
        let maxTemp = -Infinity;

        group.forEach((item) => {
          minTemp = Math.min(minTemp, item.main.temp_min || item.main.temp);
          maxTemp = Math.max(maxTemp, item.main.temp_max || item.main.temp);
        });

        return { minTemp: Math.round(minTemp), maxTemp: Math.round(maxTemp) };
      });

      // Find most frequent weather icon for the day
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

      let dayLabel;
      let dateLabel = new Date(items[0].dt * 1000).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });

      if (index === 0) {
        dayLabel = "Tomorrow";
      } else {
        dayLabel = new Date(items[0].dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        });
      }

      return {
        dayLabel: dayLabel,
        dateLabel: index > 0 ? dateLabel : null, // Show date label only for days after tomorrow
        minTemp: dailyTemps[0].minTemp, // Using the first group's min temp as representative
        maxTemp: dailyTemps[0].maxTemp, // Using the first group's max temp as representative
        mostFrequentIcon: mostFrequentIcon,
      };
    });
  };

  const dailyData = calculateDailyData();

  return (
    <div className="forecast">
      {dailyData.map((day, index) => {
        const iconUrl = `https://bmcdn.nl/assets/weather-icons/v2.0/fill/${
          iconMap[day.mostFrequentIcon]
        }.svg`;

        return (
          <div key={index} className="forecast-item">
            <div className="forecast-content">
              <div className="day-label">
                {day.dayLabel} {day.dateLabel && `, ${day.dateLabel}`}
              </div>
              <img src={iconUrl} alt="Weather Icon" className="weather-icon" />
              <div className="temp-label">
                <span className="max-temp">
                  {day.maxTemp}°{unit === "metric" ? "C" : "F"}
                </span>
                <span className="temp-separator"></span>
                <span className="min-temp">
                  {day.minTemp}°{unit === "metric" ? "C" : "F"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Forecast;
