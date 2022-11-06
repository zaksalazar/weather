$(document).ready(function () {
  const getCity = $("#userinput");
  var city = "";
  var weather = $(".weather");
  var temp = $('#temp');
  var description = $(".description");
  var humidity = $(".humidity");
  var wind = $(".wind");
  var searchButton = $("#submitButton");
  var currentTemperature = $('#temperature');
  var yourCity = $('#yourCity');

  //event handler//
  $("#submitButton").on("click", getCityName);
  // code for event handler 
  function getCityName(event) {
    if (getCity.val().trim() !== "") {
      const city = getCity.val().trim(); 
      getWeather(city);
      getForecast (city);
      addToHistory(city)
    }
  }
//Current Day: This function will pull the searched for city and populate the card with relevant data 
  function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=21654ecd640e44008364d3ec8f18f916`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res); 
        const cityName = res.name
        console.log(cityName);
        const weathericon= res.weather[0].icon;
        const iconurl="http://openweathermap.org/img/wn/"+ weathericon +"@2x.png" 
        var icon = document.createElement('img');
        icon.src = iconurl 
        localStorage.setItem('cityName',JSON.stringify(cityName)) 
        document.getElementById("yourCity").textContent = cityName
        document.getElementById("dayicon").innerHTML = ""
        document.getElementById('dayicon').appendChild(icon)
        document.getElementById('temperature').textContent =res.main.temp
        document.getElementById('description').textContent = res.weather[0].description
        document.getElementById('RH').textContent = res.main.humidity
        document.getElementById('windSpeed').textContent = res.wind.speed  
        document.getElementById('yourCity').html =(cityName);
      });
      
  }

  //5 day forecast //
  function getForecast(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=21654ecd640e44008364d3ec8f18f916`)
    .then((res) => res.json())
      .then((res) => {
        console.log(res); 
        const cityName = res.name
        document.getElementById("weatherContainer").innerHTML = ""
        for ( let i = 0; i < res.list.length; i+=8){
          const date = res.list[i].dt_txt.split(" ")[0]
          const temp = res.list[i].main.temp
          const wind = res.list[i].wind.speed
          const RH = res.list[i].main.humidity
          const icon = res.list[i].weather[0].icon
          const iconurl="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
          const cityCard =`
            <div class="icons">
              <p class="weather" id="day1">${date}</p>
              <div class="image">
                <img src=${iconurl} class="imgClass" id="img1" />
              </div>
              <p class="minValues" id="day1temp">Temp:${temp} </p>
              <p class="maxValues" id="day1Max">Wind Speed:${wind} </p>
              <p class="maxValues" id="day1Max">Humidity:${RH} </p>
            </div>
          `
          document.getElementById("weatherContainer").innerHTML += cityCard
        }
      })  
      }
      //Daynamically add the passed city on the search history
function addToHistory(city){
  const container = document.getElementById('historyContainer')
  const historyButton = document.createElement('button')
  historyButton.classList.add('historyBtn')
  historyButton.innerHTML = city 
  container.appendChild(historyButton);
}
// display the past search again when the list group item is clicked in search history

//call getWeather & get forecast from button(city) but do not add to history. 
$('.historyBtn').on('click', historyClick)
function historyClick(city){
  getWeather(city);
  getForecast(city);
}
      
})
