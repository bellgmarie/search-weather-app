//DATE CHANGE STUFF*
function trueTime(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let dates = date.getDate();
  let hour = date.getHours();
  if (hour > 12) {
    hour = hour - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  let month = months[date.getMonth()];

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

  let year = date.getFullYear();
  return `${day} <br /> ${month} ${dates}, ${year}<br />${hour}:${minutes} o'clock`;
}

//SEARCH STUFF

function defaultTemperature(response) {
  let cityName = document.querySelector("#cityName");
  let temperatureNumber = document.querySelector("#temperature");
  let windSpeed = document.querySelector("#wind");
  let humidityPer = document.querySelector("#humid");
  let weatherDescript = document.querySelector("#temperature-description");
  let dateTime = document.querySelector("#dateTime");
  let weatherImg = document.querySelector("#image");

  farenheitTemp = response.data.temperature.current;

  cityName.innerHTML = response.data.city;
  temperatureNumber.innerHTML = Math.round(response.data.temperature.current);
  windSpeed.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + "mph";
  humidityPer.innerHTML =
    "Humidity: " + Math.round(response.data.temperature.humidity) + "%";
  weatherDescript.innerHTML = response.data.condition.description;

  dateTime.innerHTML = trueTime(response.data.time * 1000);
  weatherImg.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherImg.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}
// end default

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box");
  citySearch(city.value);
  console.log(city.value);
}
function citySearch(city) {
  let apiKey = "f0fc91db3aoa04a9t8419fe6b4378f88";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(defaultTemperature);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f0fc91db3aoa04a9t8419fe6b4378f88";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecasts);
  console.log(apiUrl);
}
function displayForecasts(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2 each">

    <div class="forecast-date">
   ${formatDay(forecastDay.time)}</div>
 <img src="${forecastDay.condition.icon_url}" 
      alt="${forecastDay.condition.icon}" width="80px">
<div class="forecast-temp">

      <span class="forecast-max">${Math.round(
        forecastDay.temperature.maximum
      )}°</span> /
      <span class="forecast-min">${Math.round(forecastDay.temperature.minimum)}°
      
     </span>
  </div>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function celsiusConvert(event) {
  event.preventDefault();
  let temperatureDefault = document.querySelector("#temperature");

  farenheitToggle.classList.remove("active");
  celsiusToggle.classList.add("active");
  let celsiusTemp = ((farenheitTemp - 32) * 5) / 9;
  temperatureDefault.innerHTML = Math.round(celsiusTemp);
}
function farenheitConvert(event) {
  event.preventDefault();
  let temperatureDefault = document.querySelector("#temperature");
  farenheitToggle.classList.add("active");
  celsiusToggle.classList.remove("active");
  temperatureDefault.innerHTML = Math.round(farenheitTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let farenheitTemp = null;

let celsiusToggle = document.querySelector("#celsius");
celsiusToggle.addEventListener("click", celsiusConvert);

let farenheitToggle = document.querySelector(`#farenheit`);
farenheitToggle.addEventListener("click", farenheitConvert);

let apiKey = "f0fc91db3aoa04a9t8419fe6b4378f88";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tokyo&key=${apiKey}&units=imperial`;

citySearch("Tokyo");

/*
<div class="col-2 each" >
    <div class="forecast-date">
   Tue</div>
      <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" 
      alt="" width="80px">
      <div class="forecast-temp">
      <span class="forecast-max">18°</span> / <span class="forecast-min">16°</span>
  </div>
</div> 
https://api.shecodes.io/weather/v1/current?query=Tokyo&key=f0fc91db3aoa04a9t8419fe6b4378f88&units=imperial 

*/
