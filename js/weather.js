const apiKey = '1b01b00a61b62f5bdc82e11572db3096'; // Replace with your API Key
const city = 'Bangkok'; // Replace with the city you want to query
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

// Fetch data from OpenWeatherMap
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log data to console for debugging
    if (data.cod === 200) {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    } else {
      weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  })
  .catch(error => {
    weatherInfo.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    console.error('There was a problem with the fetch operation:', error);
  });
