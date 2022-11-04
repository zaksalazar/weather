var city = $("London");
var weather = $(".weather");
var temp = $(".temp");
var description = $(".description");
var humidity = $(".humidity");
var wind = $(".wind");
var searchButton = $("#searchButton");
var input = $("#city"); 
//API call//

var api = 'https://api.openweathermap.org/data/2.5/weather?q='; 
var url = api + input.Value() + apiKey + units;
var apiKey = $(".apiKey");
var units = '&units=imperial'; 

$("#searchButton").on("click", weatherAsk())

function weatherAsk(){
    var url = api + city + apiKey + units; 
    loadJSON(url, gotData);
    console.log(city); 
}; 

//forecast //
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?id=${cityid}&units=imperial&appid=${APIKey}`
)
  .then((res) => res.json())
  .then(function (response) {});

//take input from city and return weather data

//display weather for city for the next 5 days

//store in history table
