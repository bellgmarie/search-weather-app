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
  console.log(response.data);
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
  console.log(response.data.time);
  dateTime.innerHTML = trueTime(response.data.time * 1000);
  weatherImg.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherImg.setAttribute("alt", response.data.condition.description);
  farenheitTemp = response.data.temperature.current;
}
/*
let apiKey = "f0fc91db3aoa04a9t8419fe6b4378f88";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tokyo&key=${apiKey}&units=imperial`;
*/
// end default

function search(event) {
  let city = document.querySelector("#search-box");
  citySearch(city.value);
  console.log(city.value);
}
function citySearch(city) {
  let apiKey = "f0fc91db3aoa04a9t8419fe6b4378f88";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(defaultTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

////

function celsiusConvert(event) {
  event.preventDefault();
  let temperatureDefault = document.querySelector("#temperature");
  //remove active class and make inactive from farenheit link
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

let farenheitTemp = null;

let celsiusToggle = document.querySelector("#celsius");
celsiusToggle.addEventListener("click", celsiusConvert);

let farenheitToggle = document.querySelector(`#farenheit`);
farenheitToggle.addEventListener("click", farenheitConvert);

citySearch("Tokyo");
