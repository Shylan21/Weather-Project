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
  let lon = position.coordinates.longitude;
  let lat = position.coordinates.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
  console.log(apiUrl);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function weatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#min").innerHTML = `Min: ${Math.round(
    response.data.temperature
  )}°C`;
  document.querySelector("#max").innerHTML = `Max: ${Math.round(
    response.data.temperature
  )}°C`;
  document.querySelector("#wind").innerHTML = Math.round(response.wind.speed);
  document.querySelector("#humidity").innerHTML = response.temperature.humidity;
  document.querySelector("#description").innerHTML =
    response.condition.description[0];
  document.querySelector("#icon").setAttribute("src");
  document.querySelector("alt", response.condition[0].description);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector(".min-max");
//   temperatureElement.innerHTML = `66° / 75°`;
// }
// let fahrenheit = document.querySelector(".btn-group #fahrenheit");
// fahrenheit.addEventListener("click", convertToFahrenheit);
// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector(".min-max");
//   temperatureElement.innerHTML = `19° / 24°`;
// }

// let celsius = document.querySelector(".btn-group #celsius");
// celsius.addEventListener("click", convertToCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

search("Edinburgh");
