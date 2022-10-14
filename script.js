//DATE CHANGE STUFF
let now = new Date();
console.log(now.getDate());
let dateTime = document.querySelector(".dateTime");
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;
console.log(minutes);
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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

let month = months[now.getMonth()];

dateTime.innerHTML = `${day} <br /> ${month} ${date}, ${year}<br />${hour}:${minutes} o'clock`;
//SEARCH STUFF

function defaultTemperature(response) {
  console.log(response.data);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + "mph";
  document.querySelector("#humid").innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
}

let apiKey = "c3a3993027e6129d50f3eb164a7e386a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(defaultTemperature);
//
function weatherDescription(response) {
  console.log(response.data.name);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
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
