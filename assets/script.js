
//1. API Keys
const   EarthAPIKey         =   'aef8ff579a371781a816a273903f8295';             //api key for the first call to get lat long
const   EarthAPIKeySecond   =   '3e577ad9e250c4dd28d83578156049cc';             //api key for the second call to get weather
const   UnslplashClientID   =   'w6vbNd5lE3IKHzZsFY23l9srICMIUyv0YXK-OdBrOSQ';  //api key for Unsplash

//2. global const
const   cityInput           =   document.getElementById('input-city-name');   //obtain input from HTML
const   submitCity          =   document.getElementById('btn-search');        //button for search submission
const   displayImageDiv     =   document.getElementById('image-Div');         //div for the display of images of the city


//3. Global variables 
// let     CityQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=perth&limit=1&appid=" + EarthAPIKey; // Earth Weather query
// let     UnsplashQueryUrl = 'https://api.unsplash.com/search/photos?query=perth&client_id=' + UnslplashClientID; // Unsplash query
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
        
        //create image on html page
        displayImageDiv.innerHTML = `
        <img  src="${allImages}"  alt="${altDescription}" id="imageDisplay">
        </div>
        `
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



submitCity.addEventListener('click', function(event){
    storeCityList(event);
    getEarthWeather();
    getLocationImage();
})