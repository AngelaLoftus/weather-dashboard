//weather for today
var apiKey = "6a802a95e3f557de793ca81b8cf06fe3"

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var cityName = document.querySelector(".cityName");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var windspeed = document.getElementById("windspeed");
var icon = document.getElementById("icon");
var historyEl = document.getElementById("history");
let searchHistory = [];

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

button.addEventListener('click', function(){
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
        console.log("icon", data.weather[0].icon); 
        
        cityName.innerHTML= 'City Name: ' + nameValue + "(" + month + "/" + day + "/" + year + ")";
        temp.innerHTML = 'Temperature: ' + tempValue + "&degF;";
        desc.innerHTML = 'Description: ' + descValue;
        humidity.innerHTML = 'Humidity: ' + humidityValue + "%";
        windspeed.innerHTML = 'Wind Speed: ' + windspeedValue + " MPH";
        icon.setAttribute( "src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        
    })

    .catch(err => alert("Wrong City Name!"))

})
// function handleSearchHistoryClick() {
//     //we will work on this next time! 
// }

// getSearchHistory();
// searchHistoryEl.addEventListener("click", handleSearchHistoryClick );