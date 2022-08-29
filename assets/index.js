var APIKey='5e5540730dd5014e7b7b15496a9f4c01';
// var city = 'COLUMBUS';
var cityEl = document.getElementById('city-name');
var weatherHeaderEl=document.getElementById('weather-header');
var tempEl = document.getElementById('temp-today');
var windEl = document.getElementById('wind-today');
var uvEl = document.getElementById('uv-today');
var humidityEl=document.getElementById('humidity-today');
var historyEl = document.getElementById('history');
var foreCastEl = document.getElementById('forecast-container');
var searchBtn  = document.getElementById('searchBtn');
var iconEl = document.getElementById('icon');
var savedData = [];
var mainEl = document.getElementById('main');

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



function getLatLon(){
    city = cityEl.value;
   
    saveData(city);
    var requestURL='https://api.openweathermap.org/data/2.5/weather?q='+city +"&APPID=" +APIKey;
    console.log(requestURL);
  fetch(requestURL)
    .then(function(response){
       return response.json();
    })
    .then(function(data){
      
        lat = data.coord.lat;
      
        lon =data.coord.lon;
        
        currentWeather(lat,lon);
    });
    
}
// function forecastCall(cityGet){
//     var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id="+cityGet+"&appid="+APIKey;
//   fetch(forecastURL)
//   .then(function(response){
//    return response.json();
//   })
//   .then(function(data){
//     console.log(data);
//   })
// }
    
function currentWeather(lat,lon){
    var requestURL="https://api.openweathermap.org/data/2.5/onecall?" +
    "lat=" + lat +
      "&lon=" + lon + 
      "&units=metric" +
   "&appid=ff9a02b937539db6bdc17cba9723e9a6";
    fetch(requestURL)
        .then(function(response){
            return response.json();

        })
        .then (function(data){
            console.log(data);
            displayToday(data);
            displayForecast(data);

        })
}

function displayToday(data){
    //Displays today and the Name of the entered city
let timestamp=data.daily[0].dt;
let date = new Date(timestamp *1000);
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
let calendar = month + '/' + day + '/' + year;
weatherHeaderEl.textContent = city + ' ' + calendar;
 //displays icon for weather
let iconImg = data.daily[0].weather[0].icon;
iconEl.innerHTML="<img class='figure-img img-fluid' src=" + "'https://openweathermap.org/img/wn/" + iconImg + "@2x.png'" + "/>";
//displays temperature
let temp = data.daily[0].temp.day;
tempEl.textContent= temp + "°C";
//displays wind
let wind = data.daily[0].wind_speed;
windEl.textContent = wind + 'MPH';
;
//displays UV
let uv =data.daily[0].uvi;
uvEl.textContent = uv;
if(uv<=2){
    uvEl.setAttribute("class", 'bg-success p-1');
}
if(uv<=8){
    uvEl.setAttribute('class', 'bg-warning p-1 px-3 rounded-3');
}
else{
    uvEl.setAttribute('class','bg-danger p-1');
}




//displays Humidity
let humidity =data.daily[0].humidity;
humidityEl.textContent=humidity + "%";
}
function displayForecast(data){
    for(var i =1;i<6;i++){
        //get time 
        let timestamp =data.daily[i].dt
        let date = new Date(timestamp *1000);
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        let calendar = month + '/' + day + '/' + year;
       
        //create card
        var dayContainer = document.createElement('div')
        dayContainer.setAttribute('class',"card d-md-inline-block bg-info mx-1 p-4 text-center  ");
        //create place for time
        let calendarContainer = document.createElement('p');
        calendarContainer.textContent=calendar;
        dayContainer.appendChild(calendarContainer);
        //get icon
        let iconImg=data.daily[i].weather[0].icon;
        let iconCard = document.createElement("p");
       
        iconCard.innerHTML="<img class='figure-img img-fluid' src=" + "'https://openweathermap.org/img/wn/" + iconImg + "@2x.png'" + "/>";
        dayContainer.appendChild(iconCard);
        //get temp

        let temp = data.daily[i].temp.day;
        let tempCard = document.createElement('p');
        tempCard.textContent="Temperature: "+temp +'°C';
        dayContainer.appendChild(tempCard);
        //get wind speed
        let wind = data.daily[i].wind_speed;
        let windCard = document.createElement('p');
        windCard.textContent='Wind Speed: ' +wind +" mph";
        dayContainer.appendChild(windCard);
        //get humidity
        let humidity = data.daily[i].humidity;
        let humidityCard = document.createElement('p');
        humidityCard.textContent = "Humidity: " +humidity + "%";
        dayContainer.appendChild(humidityCard);

        foreCastEl.appendChild(dayContainer);
    }

};

   function saveData (city){
    savedData.push(city);
    let saveDataBtn =document.createElement("button");
    saveDataBtn.textContent=city;
    historyEl.appendChild(saveDataBtn);
    localStorage.setItem("savedData",JSON.stringify(savedData));
   } 

    function initShowData(){
        var showData=JSON.parse(localStorage.getItem("savedData"))
        for(let i =0;i<showData.length;i++){
            let saveDataBtn=document.createElement("button");
            saveDataBtn.textContent=showData[i];
            historyEl.appendChild(saveDataBtn);
            // saveDataBtn.addEventListener('click',historyBtnHandle(showData));
        }
    }

    // function historyBtnHandle(btn){
    //     console.log(btn.value);
    //attempting to capture data from stored buttons, unsuccessful
    // }
    
initShowData();
searchBtn.addEventListener('click',getLatLon);
