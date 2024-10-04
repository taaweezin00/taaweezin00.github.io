// Event listener for city input changes
document.getElementById('city').addEventListener('input', function () {
  var city = this.value;
  getWeather(city);
});

// Function to get weather data
async function getWeather() {
  try {
      // Get the city name from input
      var city = document.getElementById('city').value;

      if (!city) {
          alert('Please enter a valid city name!');
          return;
      }

      console.log('City:', city);

      // Make API call to get weather forecast data
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params: {
              q: city,
              appid: '54a57bc234ad752a4f59e59cd372201d',
              units: 'metric'
          },
      });

      // Get current temperature from response
      const currentTemperature = response.data.list[0].main.temp;
      document.querySelector('.weather-temp').textContent = Math.round(currentTemperature) + 'ºC';

      // Process forecast data
      const forecastData = response.data.list;
      const dailyForecast = {};

      forecastData.forEach((data) => {
          const day = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
          if (!dailyForecast[day]) {
              dailyForecast[day] = {
                  minTemp: data.main.temp_min,
                  maxTemp: data.main.temp_max,
                  description: data.weather[0].description,
                  humidity: data.main.humidity,
                  windSpeed: data.wind.speed,
                  icon: data.weather[0].icon,
              };
          } else {
              dailyForecast[day].minTemp = Math.min(dailyForecast[day].minTemp, data.main.temp_min);
              dailyForecast[day].maxTemp = Math.max(dailyForecast[day].maxTemp, data.main.temp_max);
          }
      });

      // Update current day and weather details
      document.querySelector('.date-dayname').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      document.querySelector('.date-day').textContent = new Date().toUTCString().slice(5, 16);

      // Update current weather icon and description
      const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const currentWeatherIconCode = dailyForecast[currentDay].icon;
      document.querySelector('.weather-icon').innerHTML = getWeatherIcon(currentWeatherIconCode);
      document.querySelector('.location').textContent = response.data.city.name;
      document.querySelector('.weather-desc').textContent = capitalizeWords(dailyForecast[currentDay].description);
      document.querySelector('.humidity .value').textContent = dailyForecast[currentDay].humidity + ' %';
      document.querySelector('.wind .value').textContent = dailyForecast[currentDay].windSpeed + ' m/s';

      // Update weekly forecast
      const dayElements = document.querySelectorAll('.day-name');
      const tempElements = document.querySelectorAll('.day-temp');
      const iconElements = document.querySelectorAll('.day-icon');

      dayElements.forEach((dayElement, index) => {
          const day = Object.keys(dailyForecast)[index];
          const data = dailyForecast[day];
          dayElement.textContent = day;
          tempElements[index].textContent = `${Math.round(data.minTemp)}º / ${Math.round(data.maxTemp)}º`;
          iconElements[index].innerHTML = getWeatherIcon(data.icon);
      });

  } catch (error) {
      console.error('Error fetching data:', error.message);
      alert('Failed to retrieve weather data. Please try again later or check the city name.');
  }
}

// Helper function to get the weather icon
function getWeatherIcon(iconCode) {
  const iconBaseUrl = 'https://openweathermap.org/img/wn/';
  const iconSize = '@2x.png';
  return `<img src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
}

// Helper function to capitalize words
function capitalizeWords(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Automatically fetch weather on page load
document.addEventListener("DOMContentLoaded", function () {
  getWeather();
  setInterval(getWeather, 900000); // Update every 15 minutes
});
