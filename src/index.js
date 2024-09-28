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
  days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let dayOfweek = document.querySelector(".day");
  dayOfweek.innerHTML = days[now.getDay()]; //getDay return a #. It uses # to find index
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
