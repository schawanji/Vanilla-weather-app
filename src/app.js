function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  return `${days[day]} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function getForecast(response) {
  let apiKey = `e4dfdc1dfbd9af8701deee7d18b22e9b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&units=metric&appid=${apiKey}
  `;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
  
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>

    <img
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt="Mist"
      width="36"
    />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}°</span>
      <span class="weather-forecast-temperature-min"> ${Math.round(
        forecastDay.temp.max
      )}°</span>
    </div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(`#temp`);
  let cityElement = document.querySelector(`#city`);
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind`);
  let dateElement = document.querySelector(`#date`);
  let iconElement = document.querySelector(`#icon`);

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `e4dfdc1dfbd9af8701deee7d18b22e9b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(`#city-input`);
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#temp`);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);

  temperatureElement.innerHTML = `${fahrenheitTemp}`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#temp`);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
search(`Sharon`);

let celsiusTemp = null;

let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener("click", displayCelsiusTemp);
