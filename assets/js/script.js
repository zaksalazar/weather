$(document).ready(function () {
  const getCity = $("#userinput");
  var city = "";
  var weather = $(".weather");
  var temp = $('#temp');
  var description = $(".description");
  var humidity = $(".humidity");
  var wind = $(".wind");
  var searchButton = $("#submitButton");

  //API call//
  $("#submitButton").on("click", getCityName);
  // code for enter
  function getCityName(event) {
    if (getCity.val().trim() !== "") {
      city = getCity.val().trim();

    }
  }

  function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=21654ecd640e44008364d3ec8f18f916`)
      .then((res) => res.json())
      .then(function (response) {
        console.log(response);
        const tempF = response.main.temp;
        tempF.html(tempF).tofixed(2)="&#8457"
      });
  }


  //same day //

  //take input from city and return weather data

  //display weather for city for the next 5 days

  //store in history table
});
