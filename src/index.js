/*Goal: display the temp for city */
displayTemp = (response) => {
  let currentAPItemp = Math.round(response.data.temperature.current);
  //   console.log(currenttemp); //teing purposes

  let temp = document.querySelector(".temp-value");
  temp.innerHTML = currentAPItemp;
};

/*Goal:make api call & update UI based on city*/
searchCity = (city) => {
  let apiKey = "4ddbb61eb5o419b8d734a63d7f1t0b56";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //   console.log(apiUrl); //testing purposes
  axios.get(apiUrl).then(refreshTemp); //api call
};

/*Goal: display city(h1) based on user input*/
displayCityName = (event) => {
  event.preventDefault(); //stop page from reloading
  let cityName = document.querySelector(".h1-city-name");
  let Input = document.querySelector(".search-input");
  cityName.innerHTML = Input.value;

  //calls funct , city = name user enters
  searchCity(Input.value);
};
let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", displayCityName);
