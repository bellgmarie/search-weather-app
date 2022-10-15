//DATE CHANGE STUFF

//popovers
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
    minutes = `0 + ${minutes}`;
  }
  console.log(minutes);
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

  cityName.innerHTML = response.data.name;
  temperatureNumber.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + "mph";
  humidityPer.innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  weatherDescript.innerHTML = response.data.weather[0].description;
  dateTime.innerHTML = trueTime(response.data.dt * 1000);
}

let apiKey = "c3a3993027e6129d50f3eb164a7e386a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(defaultTemperature);
//
function weatherDescription(response) {
  console.log(response.data.name);
  let cityName = document.querySelector("#cityName");
  let temperatureNumber = document.querySelector("#temperature");
  let windSpeed = document.querySelector("#wind");
  let humidityPer = document.querySelector("#humid");
  let weatherDescript = document.querySelector("#temperature-description");

  cityName.innerHTML = response.data.name;
  temperatureNumber.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + "mph";
  humidityPer.innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  weatherDescript.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let apiKey = "c3a3993027e6129d50f3eb164a7e386a";
  let city = document.querySelector("#search-box").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(weatherDescription);
}
/*


  
}


//https://api.openweathermap.org/data/2.5/weather?q=new york&appid=c3a3993027e6129d50f3eb164a7e386a&units=imperial
// TEMP CHANGE STUFF
/* */
function convertToFarenheit(event) {
  event.preventDefault();
  let apiKey = "c3a3993027e6129d50f3eb164a7e386a";
  let city = document.querySelector("#search-box").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(weatherDescription);
}
let farenheitYep = document.querySelector("#farenheit");
farenheitYep.addEventListener("click", convertToFarenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let apiKey = "c3a3993027e6129d50f3eb164a7e386a";
  let city = document.querySelector("#search-box").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherDescription);
}
let celsiusYep = document.querySelector("#celsius");
celsiusYep.addEventListener("click", convertToCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//API STUFF

//let city = "New York";

//function showTemperature(response) {
//console.log(response);
// let temperature = Math.round(response.data.main.temp);
// let temperatureElement = document.querySelector("#temperature");
// let description = document.querySelector("#temperature-description");

// temperatureElement.innerHTML = `${temperature}°F`;
/// description.innerHTML = response.data.weather[0].description;
//}
//axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
