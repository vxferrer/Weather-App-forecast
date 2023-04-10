// Current Date

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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// display Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(
            forecastDay.time
          )}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt=""
            width="40px"
          />
          <div class="weather-forecast-temps">
            <span class="weather-forecast-temp-min">${Math.round(
              forecastDay.temperature.minimum
            )}</span>
            <span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temperature.maximum
            )}</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Forecast data

function getForecast(coordinates) {
  let apiKey = "c70ecc49382165cd35t78baf90cceboa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
// Search Weather

function showWeather(response) {
  let temperature = Math.round(celsiusTemp);
  let humidity = Math.round(response.data.temperature.humidity);
  let wind = Math.round(response.data.wind.speed);
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let condition = response.data.condition.description;
  let city = response.data.city;
  let icon = response.data.condition.icon;
  let tempElement = document.querySelector("#temperature");
  let humElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels-like");
  let conditionElement = document.querySelector("#summary");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#time");
  let iconElement = document.querySelector("#weather-icon");

  celsiusTemp = response.data.temperature.current;

  tempElement.innerHTML = temperature;
  humElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
  feelsElement.innerHTML = `Feels like ${feelsLike}ºC`;
  conditionElement.innerHTML = condition;
  cityElement.innerHTML = city;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );

  getForecast(response.data.coordinates);
}

// Search engine

function SearchWeather(city) {
  let apiKey = "c70ecc49382165cd35t78baf90cceboa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let InputElement = document.querySelector("#city-input");
  SearchWeather(InputElement.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

SearchWeather("Malaga");

//

function displayFarDegree(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  // remove the active class from celsius
  celsiusLink.classList.remove("active");
  // then we add the active to farhenheit
  farLink.classList.add("active");
  let farCurrentTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farCurrentTemp);
}

function displayCelDegree(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let farLink = document.querySelector("#Far-link");
farLink.addEventListener("click", displayFarDegree);
let celsiusLink = document.querySelector("#Cel-link");
celsiusLink.addEventListener("click", displayCelDegree);
