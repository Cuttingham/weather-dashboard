var APIKey='5e5540730dd5014e7b7b15496a9f4c01';
var city = 'COLUMBUS';
// var city = document.getElementByID('city-name');
var weatherHeaderEl=document.getElementById('weather-header');
var tempEl = documeent.getElementById('temp-today');
var windEl = document.getElementById('wind-today');
var uvEl = document.getElementById('uv-today');
var humidityEl=document.getElementById('humidity-today');
var historyEl = document.getElementById('history');
var foreCastEl = document.getElementById('forecast-container');

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city



function currentWeather(){
    var requestURL='https://api.openweathermap.org/data/2.5/weather?q='+city +"&APPID=" +APIKey;
    console.log(requestURL);
  fetch(requestURL)
    .then(function(response){
       return response.json();
    })
    .then(function(data){
        console.log(data);
        forecastCall(data.id);
    });
    
}
function forecastCall(cityGet){
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id="+cityGet+"&appid="+APIKey;
  fetch(forecastURL)
  .then(function(response){
   return response.json();
  })
  .then(function(data){
    console.log(data);
  })
}
    


    
    currentWeather();
    
    
