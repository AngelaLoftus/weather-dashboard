//weather for today
var apiKey = "6a802a95e3f557de793ca81b8cf06fe3"

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var cityName = document.querySelector(".cityName");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

var temp1 = document.getElementById("temp1"); 
var temp2 = document.getElementById("temp2"); 
var temp3 = document.getElementById("temp3"); 
var temp4 = document.getElementById("temp4"); 
var temp5 = document.getElementById("temp5"); 

var humidity = document.querySelector(".humidity");
var humidity1 = document.getElementById("humidity1");
var humidity2 = document.getElementById("humidity2");
var humidity3 = document.getElementById("humidity3");
var humidity4 = document.getElementById("humidity4");
var humidity5 = document.getElementById("humidity5");

var windspeed = document.getElementById("windspeed");
var windspeed1 = document.getElementById("windspeed1");
var windspeed2 = document.getElementById("windspeed2");
var windspeed3 = document.getElementById("windspeed3");
var windspeed4 = document.getElementById("windspeed4");
var windspeed5 = document.getElementById("windspeed5");

var icon = document.getElementById("icon");
var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var icon3 = document.getElementById("icon3");
var icon4 = document.getElementById("icon4");
var icon5 = document.getElementById("icon5");


var date1 = document.getElementById("date1");

var historyEl = document.getElementById("history");
let searchHistory = [];
let lat; 
let long;


function getSearchHistory() {
    let storedHistory = localStorage.getItem("cityNames");
    if (storedHistory) { 
        searchHistory = JSON.parse(storedHistory);
    }
    renderSearchHistory(); 
}

function renderSearchHistory () {
    historyEl.innerHTML = "";
    for (let i = searchHistory.length - 1; i > 0; i--){
        let button = document.createElement("button");
        button.setAttribute("aria-controls", "today-forecast");
        button.setAttribute("type", "button");
        button.classList.add("history-button", "buttonHistory");
        button.setAttribute("data-search", searchHistory[i]);
        button.textContent(searchHistory[i]);
        historyEl.append(button);
    }
}

function addToSearchHistory () {
    //TBD
}

function fetchFiveDayWeather() {
    console.log("Entered function fetch five day weather");
    let oneCallApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
    fetch(oneCallApiUrl)
        .then(function (response) {
            return(response.json());
        }).then(function(data) { 
            console.log(data);
            returnFiveDayForecast(data);
        })
        .catch(function (error){
            console.log(error);
        });
};

function returnFiveDayForecast(data) {
        console.log("DATA", data);

            //repeat this for all five days
            //
            var temp1Value = data.list[0].main.temp;
            console.log(temp1Value);

            var humidity1Value = data.list[0].main.humidity;
            console.log(humidity1Value);
            
            var windspeedValue1 = data.list[0].wind.speed;
            console.log(windspeedValue1);
            
            let weatherIcon1 = data.list[0].weather[0].icon;
            console.log(weatherIcon1);
            
            var date1Value = data.list[0].dt_txt.split(" ")[0];
            console.log(date1Value);


            icon1.setAttribute( "src", "https://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png");
            
            temp1.innerHTML = Math.floor((temp1Value-273.15)*(9/5) + 32);
            humidity1.innerHTML = humidity1Value;
            windspeed1.innerHTML = windspeedValue1;
            date1.innerHTML = date1Value;
             // let weatherIcon = data.weather[0].icon;
            // lat = data.coord.lat;
            // console.log("lat", lat);
            // long = data.coord.lon;
            // console.log("long", long);
            // console.log("icon", data.weather[0].icon); 
            
            // cityName.innerHTML= 'City Name: ' + nameValue + "(" + month + "/" + day + "/" + year + ")";
            // temp.innerHTML = 'Temperature: ' + tempValue + "&degF;";
            // desc.innerHTML = 'Description: ' + descValue;
            // humidity.innerHTML = 'Humidity: ' + humidityValue + "%";
            // windspeed.innerHTML = 'Wind Speed: ' + windspeedValue + " MPH";
            // icon.setAttribute( "src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
}

//render UV index function for day 1


let geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputValue.value + "&appid=" + apiKey;
// function getLatLong () {
//     fetch(geoApiUrl)
//     .then( function (res){ 
//         return res.json();

//     }).then( function (data) {
//         if (! data[0] ) {
//             alert("Cannot get lat or long");
//         } else {
//             console.log(data[0]);
//             handleSearchData();
//             addToSearchHistory();
//         } 
//     }).catch(function (error) {
//         console.log(error);
//     });
// };


//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


function handleSearchData () {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + "&appid=" + apiKey + "&units=imperial")
        .then(response => response.json())
        .then (data => {
            console.log("date", data.dt); 
            const currentDate = new Date(data.dt * 1000);
            const day = currentDate.getDate();
            let month = currentDate.getMonth()+1;
            let year = currentDate.getFullYear();
    
            console.log(data);
            var nameValue = data["name"]; 
            var tempValue = data["main"]["temp"];
            var descValue = data["weather"][0]["description"];
            var humidityValue = data["main"]["humidity"];
            var windspeedValue = data.wind.speed;
            let weatherIcon = data.weather[0].icon;
            lat = data.coord.lat;
            console.log("lat", lat);
            long = data.coord.lon;
            console.log("long", long);
            console.log("icon", data.weather[0].icon); 
            
            cityName.innerHTML= 'City Name: ' + nameValue + "(" + month + "/" + day + "/" + year + ")";
            temp.innerHTML = 'Temperature: ' + tempValue + "&degF;";
            desc.innerHTML = 'Description: ' + descValue;
            humidity.innerHTML = 'Humidity: ' + humidityValue + "%";
            windspeed.innerHTML = 'Wind Speed: ' + windspeedValue + " MPH";
            icon.setAttribute( "src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            fetchFiveDayWeather();

})
};

button.addEventListener('click', handleSearchData);

function handleSearchClick(e) {
    let button = e.target;
    let searchCity = button.getAttribute("data-search");
    console.log(searchCity);
    inputValue.value = searchCity;
    handleSearchData();

}
historyEl.addEventListener('click',  handleSearchClick);
// function handleSearchHistoryClick() {
//     //we will work on this next time! 
// }

// getSearchHistory();
// searchHistoryEl.addEventListener("click", handleSearchHistoryClick );