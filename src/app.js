let apiKey = `e4dfdc1dfbd9af8701deee7d18b22e9b`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector(`#temp`);
  let cityElement = document.querySelector(`#city`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

axios.get(apiUrl).then(displayTemperature);
