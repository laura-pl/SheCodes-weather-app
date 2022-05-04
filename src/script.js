function getDayTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}, ${currentHours}:${currentMinutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = searchInput.value;
  } else {
    h1.innerHTML = "London";
  }

  let cityConditions = `${apiEndpoint}?q=${h1.innerHTML}&appid=${apiKey}&units=${units}`;
  axios.get(cityConditions).then(showCurrentConditions);
}
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
  return `${hours}:${minutes}`;
}

function showCurrentConditions(response) {
  console.log(response);
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#sunrise").innerHTML = formatDate(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatDate(
    response.data.sys.sunset * 1000
  );
}

function showCurrentLocation(event) {
  function findCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let cityApiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(cityApiUrl).then(showCurrentConditions);
  }
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let now = new Date();
let todayDayTime = document.querySelector("#today-day-time");
todayDayTime.innerHTML = getDayTime(now);

let cityInputForm = document.querySelector("#city-input-form");
cityInputForm.addEventListener("submit", searchCity);

let apiKey = "da76ca3ad8e7d0f63f4ade5c3628fca4";
let units = "metric";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let h1 = document.querySelector("h1");
let cityTemp = `${apiEndpoint}?q=${h1.innerHTML}&appid=${apiKey}&units=${units}`;

axios.get(cityTemp).then(showCurrentConditions);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", showCurrentLocation);
