
// var apikey = "6a802a95e3f557de793ca81b8cf06fe3"
// var city = "austin"


// //to get the key you need to sign in and make the free acount and get the API key specific to you

// //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// //go to this website or make this http reuqest which give that api and the city 
// //{} is in place of + signs 

// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey; 

 

// fetch(queryURL).then(function(res){
//     if (res.ok){
//     return  res.json()
//     }
// }).then(function(data){
//     console.log(data);
    
//     var lat = data.coord.lat  
//     var lon = data.coord.lon

//     var apiUrl=  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + apikey + "&units=imperial";

// fetch(apiUrl).then(function(res){
//     if (res.ok) {
//         return res.json() 
//     }
// }).then(function(data) {
//     console.log(data);
//     console.log(data.curren.temp)
// });

// // ICON data.daily[i].weather[0].icon
// });

// //data is an object, daily is an array, call that array at the index (in the loop) with the key weather and weather will be an array and it will be an array of [0]



//loop over the array for the five day forecast 

// for (i = 1; )

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
