var city = $(".city");
var weather = $(".weather");
var temp = $(".temp");
var description = $(".description");
var humidity = $(".humidity");
var wind = $(".wind");
var searchButton = $("#searchButton");
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`
)
  .then((res) => res.json())
  .then(function (response) {});

//forecast //
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?id=${cityid}&units=imperial&appid=${APIKey}`
)
  .then((res) => res.json())
  .then(function (response) {});

//take input from city and return weather data

//display weather for city for the next 5 days

//store in history table
