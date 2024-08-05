const apiKey = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'; // แทนที่ด้วย API Key ของคุณ
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  if (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
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
      });
  } else {
    weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
  }
});
