$(document).ready(function() {
const city = document.getElementById("userinput").value;
var weather = $(".weather");
var temp = $(".temp");
var description = $(".description");
var humidity = $(".humidity");
var wind = $(".wind");
var searchButton = $("#submitButton");

//API call//
var api = 'https://api.openweathermap.org/data/2.5/weather?q='; 
var url =  'https://api.openweathermap.org/data/2.5/weather?q=London&appid=e8db7a3118009c80fecb82b6fe17e653'
var APIKey = '&appid=21654ecd640e44008364d3ec8f18f916';
var units = '&units=imperial'; 


document.getElementById('submitButton').addEventListener("click", console.log(city)); 
}); 
    // code for enter

 

function getCity() {
  console.log(city); }

function getWeather() {
     fetch(url)
    .then((res) => res.json())
    .then(function(response){
        console.log(response)
  }
    )}; 
   

//same day // 
  

//take input from city and return weather data

//display weather for city for the next 5 days

//store in history table

