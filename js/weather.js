function getWeather() {
  const apiKey = '1b01b00a61b62f5bdc82e11572db3096'; // Replace with your actual API key
  const city = document.getElementById('city').value.trim();

  if (!city) {
      alert('Please enter a city');
      return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Fetch current weather data
  fetch(currentWeatherUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('City not found');
          }
          return response.json();
      })
      .then(data => {
          displayWeather(data);
      })
      .catch(error => {
          console.error('Error fetching current weather data:', error);
          alert('Error: ' + error.message);
      });

  // Fetch hourly forecast data
  fetch(forecastUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error fetching hourly forecast data');
          }
          return response.json();
      })
      .then(data => {
          displayHourlyForecast(data.list);
      })
      .catch(error => {
          console.error('Error fetching hourly forecast data:', error);
          alert('Error fetching hourly forecast data. Please try again.');
      });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');

  // Clear previous content
  tempDivInfo.innerHTML = '';
  weatherInfoDiv.innerHTML = '';

  const cityName = data.name;
  const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const temperatureHTML = `<p>${temperature}°C</p>`;
  const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;

  tempDivInfo.innerHTML = temperatureHTML;
  weatherInfoDiv.innerHTML = weatherHtml;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = description;

  // Show weather icon
  weatherIcon.style.display = 'block';
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  hourlyForecastDiv.innerHTML = ''; // Clear previous forecast

  const next24Hours = hourlyData.slice(0, 8); // Display next 24 hours (3-hour intervals)

  next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
          <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
          </div>
      `;

      hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

// Event listener for button click
document.getElementById('search-btn').addEventListener('click', getWeather);
