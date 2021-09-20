//weather for today
var apiKey = "6a802a95e3f557de793ca81b8cf06fe3"

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var cityName = document.querySelector(".cityName");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");

button.addEventListener('click', function(){
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + "&appid=" + apiKey + "&units=imperial")
    .then(response => response.json())
    .then (data => {
        console.log(data);
        var nameValue = data["name"]; 
        var tempValue = data["main"]["temp"];
        var descValue = data["weather"][0]["description"];
        var humidityValue = data["main"]["humidity"];

        cityName.innerHTML= 'City Name: ' + nameValue;
        temp.innerHTML = 'Temperature: ' + tempValue + "&degF;";
        desc.innerHTML = 'Description: ' + descValue;
        humidity.innerHTML = 'Humidity: ' + humidityValue + "%";
    })

    .catch(err => alert("Wrong City Name!"))

})