/*Goal: display the temp for city */
displayTemp = (response) => {
  let currentAPItemp = Math.round(response.data.temperature.current);
  //   console.log(currenttemp); //testing purposes

  let temp = document.querySelector(".temp-value");
  temp.innerHTML = currentAPItemp;
};

/*Goal: make api call & update UI based on city*/
searchCity = (city) => {
  let apiKey = "4ddbb61eb5o419b8d734a63d7f1t0b56";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //   console.log(apiUrl); //testing purposes
  axios.get(apiUrl).then(displayTemp); //api call
};

/*This is called ever time user clicks submit form*/
handleSubmit = (event) => {
  event.preventDefault(); //stop page from reloading
  let cityName = document.querySelector(".h1-city-name");
  let Input = document.querySelector(".search-input");
  cityName.innerHTML = Input.value;

  //calls funct , city = user input
  searchCity(Input.value);
};
let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSubmit);

//display NY by default
searchCity("New York");
