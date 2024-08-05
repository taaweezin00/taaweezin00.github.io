const apiKey = '1b01b00a61b62f5bdc82e11572db3096'; // แทนที่ด้วย API Key ของคุณ
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  if (city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
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
        weatherInfo.innerHTML = `<p>Error fetching data: ${error}</p>`;
        console.error('There was a problem with the fetch operation:', error);
      });
  } else {
    weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
  }
});
