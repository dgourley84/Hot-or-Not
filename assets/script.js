import { weatherConditions } from "./weatherConditionsArray.js";

//1. API Keys
const   EarthAPIKey         =   'aef8ff579a371781a816a273903f8295';             //api key for the first call to get lat long
const   EarthAPIKeySecond   =   '3e577ad9e250c4dd28d83578156049cc';             //api key for the second call to get weather
const   UnslplashClientID   =   'w6vbNd5lE3IKHzZsFY23l9srICMIUyv0YXK-OdBrOSQ';  //api key for Unsplash


//2. global const
const   cityInput           =   document.getElementById('input-city-name');   //obtain input from HTML
const   submitCity          =   document.getElementById('btn-search');        //button for search submission
const   previousInput       =   document.getElementById('previous-list'); //obtain input from previous selection.



//3. Global variables 
let     randomNumber = Math.floor(Math.random()*11);
let     cityList = [];  //list of previous cities searched


function getEarthWeather(){

    let     CityQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=1&appid=" + EarthAPIKey;

    console.log(CityQueryURL);  // console log of Earth Query

    return fetch(CityQueryURL)
    .then(function(data){
        return data.json();
    })
    .then(function(result){
    console.log(result);
    const lat =result[0].lat;
    console.log(lat);
    const lon = result[0].lon;
    console.log(lon);
    
    var QueryURLLonLat = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=hourly,minutely&appid=" + EarthAPIKeySecond;
    console.log(QueryURLLonLat);

    return fetch(QueryURLLonLat)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        console.log(result);

        let date = result.daily[0].dt; // date - dt field
        console.log('date[0] = ', date );
        let temp = result.daily[0].temp.day; // temp - temp
        console.log('temp[0] = ', temp );
        let humidity = result.daily[0].humidity; // humidity - humidity field
        console.log('humidity[0] = ', humidity );
        let windSpeed = result.daily[0].wind_speed; // wind speed - wind_speed
        console.log('windspeed', windSpeed);
        let icon = result.daily[0].weather[0].icon; // icon - weather.0.icon
        console.log('icon[0] = ', icon );
        let description = result.daily[0].weather[0].id; // icon - weather.0.icon
        console.log('weatherCoditions = ', description );

        
        weatherConditions[description].top; //obtain images for the top part of an outfit
        console.log(weatherConditions[description].top);
        let     UnsplashQueryTopUrl = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[description].top +'&client_id=' + UnslplashClientID; // Unsplash query
        console.log('top', UnsplashQueryTopUrl); //console log of top images
        
        weatherConditions[description].middle; //obtain images for the middle part of an outfit
        console.log(weatherConditions[description].middle);
        let     UnsplashQueryMiddleUrl = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[description].middle +'&client_id=' + UnslplashClientID; // Unsplash query
        console.log('middle', UnsplashQueryMiddleUrl); //console log of top images
        
        weatherConditions[description].bottom; //obtain images for the bottom part of an outfit
        console.log(weatherConditions[description].bottom);
        let     UnsplashQueryBottomUrl = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[description].bottom +'&client_id=' + UnslplashClientID; // Unsplash query
        console.log('bottom', UnsplashQueryBottomUrl); //console log of top images

})
})
}

function getLocationImage(){
    let     UnsplashQueryUrl = 'https://api.unsplash.com/search/photos?query=' + cityInput.value +'&client_id=' + UnslplashClientID; // Unsplash query
    
    console.log('Unsplash', UnsplashQueryUrl); //console log of images

    return fetch(UnsplashQueryUrl) 
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        console.log(data);
        let allImages = data.results[randomNumber].urls.regular;
        console.log('image url = ',allImages);
        let altDescription = data.results[randomNumber].alt_description;
        console.log('image description' , altDescription)
        
        document.body.style.backgroundImage = `url(${allImages})`
    })
}

var storeCityList = function(event){
    // event.preventDefault();
    if(localStorage.getItem('cityList')){
        // //get current local storage values
        var storedCities = JSON.parse(localStorage.getItem('cityList'));
        //add new city to city list
        storedCities.push({name: cityInput.value});
        cityList = storedCities;
        //saving amended array to local storage
        localStorage.setItem('cityList',JSON.stringify(storedCities));
    }
    else {
        var storedCities = [{name: cityInput.value}]
        localStorage.setItem('cityList', JSON.stringify(storedCities));
    }
    console.log('StoreCityLength', cityList.length)
}

function displayCityList(event){
    previousInput.innerHTML = "";
    console.log('cityLengthinDisplayCities', cityList.length)
    // Start at end of history array and count down to show the most recent at the top.
    for (var i = cityList.length -1 ; i >= 0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        // btn.setAttribute("aria-controls", "today forecast");
        btn.classList.add("history-btn", "btn-history");
        btn.setAttribute("id", "previousCityBtn");
  
        // `data-search` allows access to city name when click handler is invoked
        btn.setAttribute("data-search", cityList[i]);
        btn.textContent = cityList[i].name;
        
        previousInput.append(btn);
    }
}

function appendToHistory(search) {
    // If there is no search term return the function
    if (cityList.indexOf(search) !== -1) {
      return;
    }
    cityList.push(search);
  
    localStorage.setItem('search-history', JSON.stringify(cityList));
    storeCityList(search);
}

function initSearchHistory() {
    var storedCityList = localStorage.getItem('cityList');
    if (storedCityList) {
        cityList = JSON.parse(storedCityList);
        console.log(cityList);
    }
    let event;
    displayCityList(event);
}

//upon clicking search in the city button the following should happen:
//1. Take the City name value and push to the display city span
//      this is done as a header for the current weather box

//2. Take the City name value and push into the api call in getUserChoice
//      this is done to obtain the lat and long so the call can get the info

//3. Save the value to localStorage
//      this is done so item 4 has values to present

//4. Present the value as a button in the previous-list table
//      store city name so that the search can be redone without typing in again
//      present the historical search on side bar so that it can be selected
//      present this in reverse order

submitCity.addEventListener('click', function(event){
    storeCityList(event);
    displayCityList(event);
    getEarthWeather();
    getLocationImage();
})

//upon loading of page publish 
initSearchHistory();