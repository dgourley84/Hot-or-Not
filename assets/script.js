
//1. API Keys
const   EarthAPIKey         =   'aef8ff579a371781a816a273903f8295';             //api key for the first call to get lat long
const   EarthAPIKeySecond   =   '3e577ad9e250c4dd28d83578156049cc';             //api key for the second call to get weather
const   UnslplashClientID   =   'w6vbNd5lE3IKHzZsFY23l9srICMIUyv0YXK-OdBrOSQ';  //api key for Unsplash

//2. global const
const   cityInput           =   document.getElementById('input-city-name');   //obtain input from HTML
const   submitCity          =   document.getElementById('btn-search');        //button for search submission
const   displayImageDiv        =   document.getElementById('image-Div');      //div for the display of images of the city


console.log(cityInput.value);


//3. Global variables 
let     CityQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=perth&limit=1&appid=" + EarthAPIKey; // Earth Weather query
let     UnsplashQueryUrl = 'https://api.unsplash.com/search/photos?query=perth&client_id=' + UnslplashClientID; // Unsplash query
let     randomNumber = Math.floor(Math.random()*11);





console.log('Earth', CityQueryURL); // console log of Earth Query

console.log('Unsplash', UnsplashQueryUrl); //console log of images


function getEarthWeather(){
    return fetch(CityQueryURL)
    .then(function(data){
        return data.json();
    })
    .then(function(result){
    console.log(result);
})
}

function getLocationImage(){
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

getEarthWeather();
getLocationImage();
