function formatDate(today) {
  let date = today.getDate();
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

let dateElement = document.querySelector("h3");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(city) {
  let apiKey = "0co6f665befca7taef26af3653b7a034";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function searchLocation(position) {
  let apiKey = "0co6f665befca7taef26af3653b7a034";
  let lon = position.data.coordinates.longitude;
  let lat = position.data.coordinates.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
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
