$(document).ready(function () {
  renderSavedHistoryBtns();
  const getCity = $("#userinput");
  var city = "";
  var weather = $(".weather");
  var temp = $("#temp");
  var description = $(".description");
  var humidity = $(".humidity");
  var wind = $(".wind");
  var searchButton = $("#submitButton");
  var currentTemperature = $("#temperature");
  var yourCity = $("#yourCity");

  //event handler//
  $("#submitButton").on("click", getCityName);
  // code for event handler
  function getCityName(event) {
    if (getCity.val().trim() !== "") {
      const city = getCity.val().trim();
      getWeather(city);
      getForecast(city);
      addToHistory(city);
    }
  }
  //Current Day: This function will pull the searched for city and populate the card with relevant data
  function getWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=21654ecd640e44008364d3ec8f18f916`
    )
      .then((res) => res.json())
      .then((res) => {
        renderWeather(res);
        //check localStorage for history then add to local storage //
        var history = localStorage.getItem("history");
        if (history === null) {
          history = [res];
          localStorage.setItem("history", JSON.stringify(history));
        } else {
          history = JSON.parse(history);
          history.push(res);
          localStorage.setItem("history", JSON.stringify(history));
        }
      });
  }

  //5 day forecast //
  function getForecast(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=21654ecd640e44008364d3ec8f18f916`
    )
      .then((res) => res.json())
      .then((res) => {
        renderForecast(res);
        // add forecast History to local storage //
        var forecastHistory = localStorage.getItem("forecastHistory");
        if (forecastHistory === null) {
          forecastHistory = [res];
          localStorage.setItem(
            "forecastHistory",
            JSON.stringify(forecastHistory)
          );
        } else {
          forecastHistory = JSON.parse(forecastHistory);
          forecastHistory.push(res);
          localStorage.setItem(
            "forecastHistory",
            JSON.stringify(forecastHistory),
            console.log("1", "forecastHistory")
          );
        }
      });
  }
  //Daynamically add the past city on the search history
  function addToHistory(city) {
    const container = document.getElementById("historyContainer");
    const historyButton = document.createElement("button");
    historyButton.classList.add("historyBtn");
    historyButton.innerHTML = city;
    container.appendChild(historyButton);
  }

  function renderSavedHistoryBtns() {
    var savedHistory = localStorage.getItem("history");
    savedHistory = JSON.parse(savedHistory);
    if (savedHistory !== null) {
      for (let i = 0; i < savedHistory.length; i++) {
        addToHistory(savedHistory[i].name);
      }
    }
  }

  //call getWeather & get forecast from button(city) but do not add to history.
  $(".historyBtn").on("click", historyClick);
  function historyClick(event) {
    var savedHistory = localStorage.getItem("history");
    savedHistory = JSON.parse(savedHistory);
    for (let i = 0; i < savedHistory.length; i++) {
      if (event.target.textContent === savedHistory[i].name) {
        renderWeather(savedHistory[i]);
      }
    }
    var forecastHistory = localStorage.getItem("forecastHistory");
    forecastHistory = JSON.parse(forecastHistory);
    for (let i = 0; i < forecastHistory.length; i++) {
      console.log('here') 
      console.log(event.target.textContent , forecastHistory[i] )
      if (event.target.textContent === forecastHistory[i].city.name) {
        renderForecast(forecastHistory[i]);
      }
    }
  }

  function renderWeather(weatherData) {
    const cityName = weatherData.name;
    const weathericon = weatherData.weather[0].icon;
    const iconurl =
      "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
    var icon = document.createElement("img");
    icon.src = iconurl;
    document.getElementById("yourCity").textContent = cityName;
    document.getElementById("dayicon").innerHTML = "";
    document.getElementById("dayicon").appendChild(icon);
    document.getElementById("temperature").textContent = weatherData.main.temp;
    document.getElementById("description").textContent =
      weatherData.weather[0].description;
    document.getElementById("RH").textContent = weatherData.main.humidity;
    document.getElementById("windSpeed").textContent = weatherData.wind.speed;
    document.getElementById("yourCity").html = cityName;
  }

  function renderForecast(forecast) {
    console.log("here")
    const cityName = forecast.name;
    document.getElementById("weatherContainer").innerHTML = "";
    if (! forecast.list) return 
    for (let i = 0; i < forecast.list.length; i += 8) {
      const date = forecast.list[i].dt_txt.split(" ")[0];
      const temp = forecast.list[i].main.temp;
      const wind = forecast.list[i].wind.speed;
      const RH = forecast.list[i].main.humidity;
      const icon = forecast.list[i].weather[0].icon;
      const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const cityCard = `
            <div class="icons">
              <p class="weather" id="day1">${date}</p>
              <div class="image">
                <img src=${iconurl} class="imgClass" id="img1" />
              </div>
              <p class="minValues" id="day1temp">Temp:${temp} </p>
              <p class="maxValues" id="day1Max">Wind Speed:${wind} </p>
              <p class="maxValues" id="day1Max">Humidity:${RH} </p>
            </div>
          `;
      document.getElementById("weatherContainer").innerHTML += cityCard;
    }
  }
});
