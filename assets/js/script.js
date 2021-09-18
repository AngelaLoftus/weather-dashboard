
var apikey = "6a802a95e3f557de793ca81b8cf06fe3"
var city = "austin"


//to get the key you need to sign in and make the free acount and get the API key specific to you

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//go to this website or make this http reuqest which give that api and the city 
//{} is in place of + signs 

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey; 

//make request
//then if the response is OK
//then do something with data

fetch(queryURL).then(function(res){
    if (res.ok){
    return  res.json()
    }
}).then(function(data){
    console.log(data);
    
    var lat = data.coord.lat  
    var lon = data.coord.lon

    var apiUrl=  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + apikey;

fetch(apiUrl).then(function(res){
    if (res.ok) {
        return res.json() 
    }
}).then(function(data) {
    console.log(data);
});

// ICON data.daily[i].weather[0].icon
});

//data is an object, daily is an array, call that array at the index (in the loop) with the key weather and weather will be an array and it will be an array of [0]



//loop over the array for the five day forecast 