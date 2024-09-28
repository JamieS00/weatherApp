/*Goal: display the temp for city */
updateWeather = (response) => {
  let currentAPItemp = Math.round(response.data.temperature.current);
  //   console.log(currenttemp); //testing purposes
  let temp = document.querySelector(".temp-value");
  temp.innerHTML = currentAPItemp;

  //if user mistypes city(lower/upcase) it will display city name correctly
  let cityName = document.querySelector(".h1-city-name");
  cityName.innerHTML = response.data.city;

  //description of weather
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  //   console.log(response.data.condition.description);

  // Date & Time
  let now = new Date();
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfweek = document.querySelector("#day");
  dayOfweek.innerHTML = days[now.getDay()]; //getDay return a #. It uses # to find index

  //Time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let time = document.querySelector("#time");
  time.innerHTML = `${hours}:${minutes}`;

  //Humidity & Wind
  let humidity = document.querySelector("#humidity");
  let hum = response.data.temperature.humidity;
  humidity.innerHTML = `${hum}%`;
  let wind = document.querySelector("#wind");
  let speed = response.data.wind.speed;

  wind.innerHTML = `${speed}km/h`;
};

/*Goal: make api call & calls updateWeather func*/
searchCity = (city) => {
  let apiKey = "4ddbb61eb5o419b8d734a63d7f1t0b56";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //   console.log(apiUrl); //testing purposes
  axios.get(apiUrl).then(updateWeather); //api call
};

/*called every time user clicks submit form*/
handleSubmit = (event) => {
  event.preventDefault(); //stop page from reloading
  let Input = document.querySelector(".search-input");

  //calls funct , city = user input
  searchCity(Input.value);
};
let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSubmit);

//display NY by default
searchCity("New York");
