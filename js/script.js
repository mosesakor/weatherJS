const getWeatherForCity = () => {

  const getWeather = document.getElementById('getWeather');

  const cityName = () => {
    return Object.values(Array.from(document.querySelectorAll('input')).reduce((a, input) => ({...a, [input.id]: input.value}), {}));
  }

  const apiKey = 'dcbf4249ce0845cdf9417eb964e01a9f';

  getWeather.onclick = render;

  async function fetchWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName()}&appid=${apiKey}`);
    const weatherData = await response.json();
    console.log(weatherData)
    return weatherData
  };

  async function render() {
    const response = await fetchWeather();
    renderWeather(response);
  };

};


const renderWeather = (apiData) => {

  const weatherInfo = document.getElementById('weatherInfo');

  const kelvinToCelcius = (temperature) => {
    return Math.floor(temperature - 273.15);
  };
  
  (function () {
    let childCount = weatherInfo.childElementCount;
    while (childCount > 1) {
      weatherInfo.removeChild(weatherInfo.lastChild);
      childCount -= 1
    }
  })();

  

  const location = document.createElement('h1');
  const tempContainer = document.createElement('div')
  const temperature = document.createElement('span');
  const weather = document.createElement('p');
  const icon = document.createElement('img');

  location.textContent = `${apiData.name}, ${apiData.sys.country}`;
  temperature.textContent = `${kelvinToCelcius(apiData.main.temp)}°C`;
  weather.textContent = `Feels like ${kelvinToCelcius(apiData.main.feels_like)}°C | ${apiData.weather[0]['description']} | Humidity: ${apiData.main.humidity}%`;
  icon.src = `../icons/${apiData.weather[0].icon}.png`
  tempContainer.id = 'tempContainer'

  tempContainer.append(temperature, icon)
  weatherInfo.append(location, tempContainer, weather);
}

getWeatherForCity();
