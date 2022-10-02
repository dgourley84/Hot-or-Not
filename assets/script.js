import { weatherConditions } from "./weatherConditionsArray.js";

//1. API Keys
const   EarthAPIKey         =   'aef8ff579a371781a816a273903f8295';             //api key for the first call to get lat long
const   EarthAPIKeySecond   =   '3e577ad9e250c4dd28d83578156049cc';             //api key for the second call to get weather
const   UnslplashClientID   =   'w6vbNd5lE3IKHzZsFY23l9srICMIUyv0YXK-OdBrOSQ';  //api key for Unsplash


//2. global const
const   cityInput           =   document.getElementById('input-city-name');   //obtain input from HTML
const   submitCity          =   document.getElementById('btn-search');        //button for search submission
const   previousInput       =   document.getElementById('previous-list');     //obtain input from previous selection.
const   cityNameEl          =   document.getElementById('cityName');          //element to insert city name
const   tempEl              =   document.getElementById('currentTemp');       //current temp of the city element
const   dateEl              =   document.getElementById('currentDate');       //current date element for the city request
const   mainCardEl          =   document.getElementById('mainCard');          //html element to insert the result of the current search
const   mainCardTopEl       =   document.getElementById('topImageMain');
const   mainCardMiddeEl     =   document.getElementById('middleImageMain');
const   mainCardBottomEl    =   document.getElementById('bottomImageMain');
const   forecastCard        =   document.getElementById('forecast');


//3. Global variables 
let     randomNumber            = Math.floor(Math.random()*11);
let     randomNumberSecondary   = Math.floor(Math.random()*11);
let     cityList                = [];  //list of previous cities searched


function getEarthWeather(){

    let     CityQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=1&appid=" + EarthAPIKey;

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
    
    //Obtain weather data for the current card to fill in the main card.
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
        let icon = result.daily[0].weather[0].icon; // icon - weather.0.icon
        console.log('icon[0] = ', icon );
        let description = result.daily[0].weather[0].id; // log the weather conditions so that this can be used to call the outfits required.
        console.log('weatherCoditions = ', description );
        //create main card with city data for the weather
        mainCardEl.innerHTML = `
        <h3 class="city name">${cityInput.value}</h3>
            <ul class="date">${moment.unix(date).format("dddd, MMMM Do YYYY")}</ul>
            <ul class="temperature">Temp: ${temp}&#176;C</ul>
            <img src="http://openweathermap.org/img/wn//${icon}@4x.png">`;
        
            //obtain the outfit images based on the weather coditions
            let     UnsplashQueryTopUrl = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[description].top +'&client_id=' + UnslplashClientID; // Unsplash query
            return fetch(UnsplashQueryTopUrl) 
            .then(function(data){
                return data.json();
                })
                .then(function(data){
                console.log(data);
                let TopOutfitImage = data.results[randomNumber].urls.thumb;
                console.log('Top image url = ',TopOutfitImage);
                let TopOutFit_Alt = data.results[randomNumber].alt_description;
                console.log('Top image description' , TopOutFit_Alt);
                var topImageMain = document.createElement('div');
                topImageMain.innerHTML = `<img src="${TopOutfitImage}" alt="${TopOutFit_Alt}" class="inline-block h-auto">`;
                mainCardEl.appendChild(topImageMain);

                    weatherConditions[description].middle; //obtain images for the middle part of an outfit
                    console.log(weatherConditions[description].middle);
                    let     UnsplashQueryMiddleUrl = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[description].middle +'&client_id=' + UnslplashClientID; // Unsplash query
                    console.log('middle', UnsplashQueryMiddleUrl); //console log of top images
                    return fetch(UnsplashQueryMiddleUrl) 
                    .then(function(data){
                    return data.json();
                    })
                    .then(function(data){
                    console.log(data);
                    let MiddleOutfitImage = data.results[randomNumber].urls.thumb;
                    console.log('middle image url = ',MiddleOutfitImage);
                    let MiddleOutFit_Alt = data.results[randomNumber].alt_description;
                    console.log('middle image description' , MiddleOutFit_Alt);                    
                        var middleImageMain = document.createElement('div');
                        middleImageMain.innerHTML = `<img src="${MiddleOutfitImage}" alt="${MiddleOutFit_Alt}" class="inline-block h-auto">`;    
                        topImageMain.insertAdjacentElement('afterend',middleImageMain);
                            
                        weatherConditions[description].bottom; //obtain images for the bottom part of an outfit
                        console.log(weatherConditions[description].bottom);
                        let     UnsplashQueryBottomUrl = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[description].bottom +'&client_id=' + UnslplashClientID; // Unsplash query
                        console.log('bottom', UnsplashQueryBottomUrl); //console log of top images
                        return fetch(UnsplashQueryBottomUrl) 
                        .then(function(data){
                        return data.json();
                        })
                        .then(function(data){
                            console.log(data);
                            let BottomOutfitImage = data.results[randomNumber].urls.thumb;
                            console.log('Bottome image url = ',BottomOutfitImage);
                            let BottomOutFit_Alt = data.results[randomNumber].alt_description;
                            console.log('image description' , BottomOutFit_Alt);                            
                            var bottomImageMain = document.createElement('div');
                            bottomImageMain.innerHTML = `<img src="${BottomOutfitImage}" alt="${BottomOutFit_Alt}" class="inline-block">`;        
                            middleImageMain.insertAdjacentElement('afterend', bottomImageMain);
                        
        //create 5 days forecast in mini boxes
        //  iterate over the 5 records to present the forecast weather

                                for (let i=1; i <=5; i++){
                                let dateF = result.daily[i].dt; // date - dt field
                                console.log('date[0] = ', dateF );
                                let tempF = result.daily[i].temp.day; // temp - temp
                                console.log('temp[0] = ', tempF );
                                let iconF = result.daily[i].weather[0].icon; // icon - weather.0.icon
                                console.log('icon[0] = ', iconF );
                                let descriptionF = result.daily[i].weather[0].id; // icon - weather.0.icon
                                console.log('weatherCoditions = ', descriptionF);
                                    forecastCard.innerHTML = `
                                        <ul class="date">${moment.unix(dateF).format("dddd, MMMM Do YYYY")}</ul>
                                        <ul class="temperature">Temp: ${tempF}&#176;C</ul>
                                        <img src="http://openweathermap.org/img/wn//${iconF}@4x.png">`;

                                weatherConditions[descriptionF].top; //obtain images for the top part of an outfit
                                console.log(weatherConditions[descriptionF].top);
                                let     UnsplashQueryTopUrlF = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[descriptionF].top +'&client_id=' + UnslplashClientID; // Unsplash query
                                console.log('top', UnsplashQueryTopUrlF); //console log of top images
                                return fetch(UnsplashQueryTopUrlF)
                                .then(function(data){
                                    return data.json();
                                })
                                .then(function(data){
                                    console.log(data);
                                    let topImageForecast = data.results[randomNumberSecondary].urls.thumb;
                                    console.log(topImageForecast);
                                    let topImageForecast_Atl = data.results[randomNumberSecondary].alt_description;
                                    console.log(topImageForecast_Atl);
                                    var topImgF = document.createElement('div');
                                    topImgF.innerHTML = `<img src="${TopOutfitImage}" alt="${TopOutFit_Alt}" class="inline-block h-auto">`;
                                    forecastCard.appendChild(topImgF);

                                    weatherConditions[descriptionF].middle; //obtain images for the middle part of an outfit
                                    console.log(weatherConditions[descriptionF].middle);
                                    let     UnsplashQueryMiddleUrlF = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[descriptionF].middle +'&client_id=' + UnslplashClientID; // Unsplash query
                                    console.log('middle', UnsplashQueryMiddleUrlF); //console log of top images
                                    return fetch(UnsplashQueryMiddleUrlF)
                                    .then(function(data){
                                        return data.json();
                                    })
                                    .then(function(data){
                                        console.log(data);
                                        let middleImageForecast = data.results[randomNumberSecondary].urls.thumb;
                                        console.log(middleImageForecast);
                                        let middleImageForecast_Atl = data.results[randomNumberSecondary].alt_description;
                                        console.log(middleImageForecast_Atl);
                                        var middleImgF = document.createElement('div');
                                        middleImgF.innerHTML = `<img src="${MiddleOutfitImage}" alt="${MiddleOutFit_Alt}" class="inline-block h-auto">`;    
                                        topImgF.insertAdjacentElement('afterend',middleImgF);

                                            weatherConditions[descriptionF].bottom; //obtain images for the bottom part of an outfit
                                            console.log(weatherConditions[descriptionF].bottom);
                                            let     UnsplashQueryBottomUrlF = 'https://api.unsplash.com/search/photos?query=' + weatherConditions[descriptionF].bottom +'&client_id=' + UnslplashClientID; // Unsplash query
                                            console.log('bottom', UnsplashQueryBottomUrlF); //console log of top images
                                            return fetch(UnsplashQueryBottomUrlF)
                                                .then(function(data){
                                            return data.json();
                                            })
                                                .then(function(data){
                                            console.log(data);
                                            let bottomImageForecast = data.results[randomNumberSecondary].urls.thumb;
                                            console.log(bottomImageForecast);
                                            let bottomImageForecast_Atl = data.results[randomNumberSecondary].alt_description;
                                            console.log(bottomImageForecast_Atl);
                                            var bottomImgF = document.createElement('div');
                                            bottomImgF.innerHTML = `<img src="${bottomImageForecast}" alt="${bottomImageForecast_Atl}" class="inline-block h-auto">`;    
                                            topImgF.insertAdjacentElement('afterend',bottomImgF);
                                        })
                                    })
                                })
                            }
                        })
                    })
            })
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
        btn.setAttribute("class","bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded")
  
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
  
    localStorage.setItem('cityList', JSON.stringify(cityList));
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
    cityInput.value ='';
})

//upon loading of page publish 
initSearchHistory();