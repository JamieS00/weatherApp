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

  //Time & date
  let dayOfweek = document.querySelector("#day");
  let time = document.querySelector("#time");

  formatDate = (now) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let hours = now.getHours();
    let minutes = now.getMinutes();

    //adds leading 0 to min if < 10
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    dayOfweek.innerHTML = days[now.getDay()]; //getDay return a #. It uses # to find index
    time.innerHTML = `${hours}:${minutes}`;

    //once weather is updated then calls forecast func with city from api
    getForecast(response.data.city);
  };
  let now = new Date(response.data.time * 1000);
  formatDate(now);

  //Humidity & Wind
  let humidity = document.querySelector("#humidity");
  let hum = response.data.temperature.humidity;
  humidity.innerHTML = `${hum}%`;
  let wind = document.querySelector("#wind");
  let speed = response.data.wind.speed;
  wind.innerHTML = `${speed}km/h`;

  //Weather Icons - injecting src w/ img instead of text based on the condition from api
  let iconElement = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji-icon" />`;
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

formatDay = (timestamp) => {
  let date = new Date(timestamp * 1000); // bc its in miliseconds
  let day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return day[date.getDay()]; //.getDay gives you # , in this case: index for day array
};

//forecast from api
getForecast = (city) => {
  let apiKey = `4ddbb61eb5o419b8d734a63d7f1t0b56`;
  let apiForecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiForecastURL).then(displayForecast);
};

//displays the forecast by looping through days array
displayForecast = (response) => {
  let forecastHtml = ""; //start w/ empty string

  //daily - in api should show array(7)
  response.data.daily.forEach((days, index) => {
    // want forecast for only 5 days
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `        
        <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(days.time)}</div> 
            <div class="weather-forecast-icon">
                <img src= "${
                  days.condition.icon_url
                }" class="weather-forecast-icon">
            </div>
            <div class="weather-forecast-temps">
              <div class="forecast-Temp">
                <strong>${Math.round(days.temperature.maximum)}°</strong>
              </div>
              <div class="forecast-Temp"> ${Math.round(
                days.temperature.minimum
              )}°</div>
            </div>
          </div>
          `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
};

// displayForecast();
//display NY by default
searchCity("New York");
