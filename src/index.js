/*Goal: display city(h1) based on user input*/
displayCityName = (event) => {
  console.log("inside");
  event.preventDefault(); //stop page from reloading
  let cityName = document.querySelector(".h1-city-name");
  let Input = document.querySelector(".search-input");

  cityName.innerHTML = Input.value;
};
let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", displayCityName);
console.log("come onnnn");
