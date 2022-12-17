function formatDate(today) {
  let date = today.getDate();
  // if (date < 20) {
  //   date = `${date}th`;
  // }
  // if ((date = (((1 !== date) == 21) !== date) == 31)) {
  //   date = `${date}st`;
  // }
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = [today.getDay()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${date} <br/> ${hour}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
            <div class="date">
              ${day} 
            </div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png" alt="" width="45" />
            <div class="date-temp">
              <span class="date-temp-max">18°</span><span class="date-temp-min">12°</span>
            </div>
          </div>
         `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let dateElement = document.querySelector("h3");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(city) {
  let apiKey = "0co6f665befca7taef26af3653b7a034";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function searchLocation(position) {
  console.log(position);
  let apiKey = "0co6f665befca7taef26af3653b7a034";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${position.longitude}&lat=${position.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function weatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#it-s").innerHTML = `It's: ${Math.round(
    response.data.temperature.current
  )}°C`;
  document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);
  document.querySelector("alt", response.data.condition.description);

  celsiusCurrentTemp = response.data.temperature.current;
  celsiusFeelsTemp = response.data.temperature.feels_like;

  searchLocation(response.data.coordinates);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector("#it-s");
  let fahrenheitCurrentTemp = (celsiusCurrentTemp * 9) / 5 + 32;
  currentTemperatureElement.innerHTML = `It's: ${Math.round(
    fahrenheitCurrentTemp
  )} °F`;
  let feelsTemp = document.querySelector("#feels-like");
  let fahrenheitFeelsTemp = (celsiusFeelsTemp * 9) / 5 + 32;
  feelsTemp.innerHTML = `Feels like: ${Math.round(fahrenheitFeelsTemp)} °F`;
}
let fahrenheit = document.querySelector(".btn-group #fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector("#it-s");
  currentTemperatureElement.innerHTML = `It's: ${Math.round(
    celsiusCurrentTemp
  )}°C`;
  let feelsTemperatureElement = document.querySelector("#feels-like");
  feelsTemperatureElement.innerHTML = `Feels like:${Math.round(
    celsiusFeelsTemp
  )}°C`;
}
let celsiusTemp = null;

let celsius = document.querySelector(".btn-group #celsius");
celsius.addEventListener("click", convertToCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

search("Edinburgh");
