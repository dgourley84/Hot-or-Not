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
const   mainCardEl          =   document.getElementById('mainCard');          //html element to insert today's weather result
const   whattoWearEL        =   document.getElementById('whatToWear');        //html element to insert what to wear today
const   whatToWearTomEL     =   document.getElementById('wearTommorrow');     //html element to insert what to wear today
const   forecastCard        =   document.getElementById('forecast');          //html element to insert tomorrow's weather result


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
    const cityName = result[0].name;
    console.log('cityName = ', cityName);
    
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
        let conditions = result.daily[0].weather[0].description; //weather conditions description
        console.log('conditions = ',conditions);
        let description = result.daily[0].weather[0].id; // log the weather conditions so that this can be used to call the outfits required.
        console.log('weatherCoditions = ', description );
        let feelsLike = result.daily[0].feels_like.day; //feels like weather conditions
        console.log('feels like = ',feelsLike);
        let tempMin = result.daily[0].temp.min; // min temp for the day
        console.log('min temp = ',tempMin);
        let tempMax = result.daily[0].temp.max; // max temp for the day
        console.log('max temp = ',tempMax);
        //create main card with city data for the weather
        mainCardEl.innerHTML = 
                        `<div class="flex mb-4 justify-between items-center">
                            <div>
                                <h5 class="mb-0 font-medium text-xl">${cityName}</h5>
                                <h6 class="mb-0">${moment.unix(date).format("dddd, MMMM Do YYYY")}</h6><small>${conditions}</small>
                            </div>
                            <div class="text-right">
                                <h3 class="font-bold text-4xl mb-0"><span> ${temp}&#176;C</span></h3>
                            </div>
                        </div>
                        <div class="block sm:flex justify-between items-center flex-wrap">
                            <div class="w-full sm:w-1/2">
                                <div class="flex mb-2 justify-between items-center"><span>Temp</span><small class="px-2 inline-block">${temp}&#176;C</small></div>
                            </div>
                            <div class="w-full sm:w-1/2">
                                <div class="flex mb-2 justify-between items-center"><span>Feels like</span><small class="px-2 inline-block">${feelsLike}&#176;C</small></div>
                            </div>
                            <div class="w-full sm:w-1/2">
                                <div class="flex mb-2 justify-between items-center"><span>Temp min</span><small class="px-2 inline-block">${tempMin}&#176;C</small></div>
                            </div>
                            <div class="w-full sm:w-1/2">
                                <div class="flex mb-2 justify-between items-center"><span>Temp max</span><small class="px-2 inline-block">${tempMax}&#176;C</small></div>
                            </div>
                        </div>`;


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
                            
                            whattoWearEL.innerHTML = `
                            <div>
                            <img src="${TopOutfitImage}" alt="${TopOutFit_Alt}" class="inline-block h-auto">
                            <img src="${MiddleOutfitImage}" alt="${MiddleOutFit_Alt}" class="inline-block h-auto">
                            <img src="${BottomOutfitImage}" alt="${BottomOutFit_Alt}" class="inline-block h-auto"> 
                            </div>
                            `
        
        //  create tomorrows forecast so you can plan next day outfit
        //  iterate over the next record to present the forecast weather

                                for (let i=1; i <=5; i++){
                                let dateF = result.daily[i].dt; // date - dt field
                                console.log('date[0] = ', dateF );
                                let tempF = result.daily[i].temp.day; // temp - temp
                                console.log('temp[0] = ', tempF );
                                let iconF = result.daily[i].weather[0].icon; // icon - weather.0.icon
                                console.log('icon[0] = ', iconF );
                                let descriptionF = result.daily[i].weather[0].id; // icon - weather.0.icon
                                console.log('weatherCoditions = ', descriptionF);
                                let conditionsF = result.daily[i].weather[0].description; //weather conditions description
                                console.log('conditions = ',conditionsF);
                                let feelsLikeF = result.daily[i].feels_like.day; //feels like weather conditions
                                console.log('feels like = ',feelsLikeF);
                                let tempMinF = result.daily[i].temp.min; // min temp for the day
                                console.log('min temp = ',tempMinF);
                                let tempMaxF = result.daily[i].temp.max; // max temp for the day
                                console.log('max temp = ',tempMaxF);
                                    forecastCard.innerHTML = 
                                    `<div class="flex mb-4 justify-between items-center">
                                        <div>
                                            <h5 class="mb-0 font-medium text-xl">${cityInput.value}</h5>
                                            <h6 class="mb-0">${moment.unix(dateF).format("dddd, MMMM Do YYYY")}</h6><small>${conditionsF}</small>
                                        </div>
                                        <div class="text-right">
                                        <h3 class="font-bold text-4xl mb-0"><span> ${tempF}&#176;C</span></h3>
                                        </div>
                                    </div>
                                    <div class="block sm:flex justify-between items-center flex-wrap">
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Temp</span><small class="px-2 inline-block">${tempF}&#176;C</small></div>
                                        </div>
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Feels like</span><small class="px-2 inline-block">${feelsLikeF}&#176;C</small></div>
                                        </div>
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Temp min</span><small class="px-2 inline-block">${tempMinF}&#176;C</small></div>
                                        </div>
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Temp max</span><small class="px-2 inline-block">${tempMaxF}&#176;C</small></div>
                                        </div>
                                    </div>`;

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

                                            
                                            whatToWearTomEL.innerHTML = `
                                            <div>
                                            <img src="${topImageForecast}" alt="${topImageForecast_Atl}" class="inline-block h-auto">
                                            <img src="${middleImageForecast}" alt="${middleImageForecast_Atl}" class="inline-block h-auto">
                                            <img src="${bottomImageForecast}" alt="${bottomImageForecast_Atl}" class="inline-block h-auto"> 
                                            </div>
                                            `     


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
        btn.setAttribute("class","history-btn py-2 px-4 w-full font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white")
  
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



//in the list of previous searches when user clicks on item the following happens:
//1. take the city name value and push to the display city span
//      this will then update the the header for the current weather box

//2. take the city name value and push into the api call in the getUserChoice
//      this is done to once again obtain the lat and the lono

//3. take the City name value and push into the API call for unsplash to get city background and then also start the request for the what to wear images.
//      this is to obtain a top bottom and middle outfit choice.

//4. refresh the list in the previous values to put the item at the top
//      store city name so that the search can be redone without typing in again
//      present the historical search on side bar so that it can be selected
//      present this in reverse order

$(function(){
    $(".history-btn").click(function() {
        var fired_button = $(this).html()
        console.log('here is city name', fired_button)
        
        let     UnsplashQueryUrl = 'https://api.unsplash.com/search/photos?query=' + fired_button +'&client_id=' + UnslplashClientID; // Unsplash query
    
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
        
                let     PreviousCityQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + fired_button + "&limit=1&appid=" + EarthAPIKey;

                console.log(PreviousCityQueryURL);  // console log of Earth Query
            
                return fetch(PreviousCityQueryURL)
                .then(function(data){
                    return data.json();
                })
                .then(function(result){
                console.log(result);
                const lat =result[0].lat;
                console.log(lat);
                const lon = result[0].lon;
                console.log(lon);
                const cityName = result[0].name;
                console.log('cityName = ', cityName);
                
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
                    let conditions = result.daily[0].weather[0].description; //weather conditions description
                    console.log('conditions = ',conditions);
                    let description = result.daily[0].weather[0].id; // log the weather conditions so that this can be used to call the outfits required.
                    console.log('weatherCoditions = ', description );
                    let feelsLike = result.daily[0].feels_like.day; //feels like weather conditions
                    console.log('feels like = ',feelsLike);
                    let tempMin = result.daily[0].temp.min; // min temp for the day
                    console.log('min temp = ',tempMin);
                    let tempMax = result.daily[0].temp.max; // max temp for the day
                    console.log('max temp = ',tempMax);
                    //create main card with city data for the weather
                    mainCardEl.innerHTML = 
                                    `<div class="flex mb-4 justify-between items-center">
                                        <div>
                                            <h5 class="mb-0 font-medium text-xl">${fired_button}</h5>
                                            <h6 class="mb-0">${moment.unix(date).format("dddd, MMMM Do YYYY")}</h6><small>${conditions}</small>
                                        </div>
                                        <div class="text-right">
                                            <h3 class="font-bold text-4xl mb-0"><span> ${temp}&#176;C</span></h3>
                                        </div>
                                    </div>
                                    <div class="block sm:flex justify-between items-center flex-wrap">
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Temp</span><small class="px-2 inline-block">${temp}&#176;C</small></div>
                                        </div>
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Feels like</span><small class="px-2 inline-block">${feelsLike}&#176;C</small></div>
                                        </div>
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Temp min</span><small class="px-2 inline-block">${tempMin}&#176;C</small></div>
                                        </div>
                                        <div class="w-full sm:w-1/2">
                                            <div class="flex mb-2 justify-between items-center"><span>Temp max</span><small class="px-2 inline-block">${tempMax}&#176;C</small></div>
                                        </div>
                                    </div>`;
            
            
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
                                        
                                        whattoWearEL.innerHTML = `
                                        <div>
                                        <img src="${TopOutfitImage}" alt="${TopOutFit_Alt}" class="inline-block h-auto">
                                        <img src="${MiddleOutfitImage}" alt="${MiddleOutFit_Alt}" class="inline-block h-auto">
                                        <img src="${BottomOutfitImage}" alt="${BottomOutFit_Alt}" class="inline-block h-auto">
                                        </div>
                                        `
                    
                    //  create tomorrows forecast so you can plan next day outfit
                    //  iterate over the next record to present the forecast weather
            
                                            for (let i=1; i <=5; i++){
                                            let dateF = result.daily[i].dt; // date - dt field
                                            console.log('date[0] = ', dateF );
                                            let tempF = result.daily[i].temp.day; // temp - temp
                                            console.log('temp[0] = ', tempF );
                                            let iconF = result.daily[i].weather[0].icon; // icon - weather.0.icon
                                            console.log('icon[0] = ', iconF );
                                            let descriptionF = result.daily[i].weather[0].id; // icon - weather.0.icon
                                            console.log('weatherCoditions = ', descriptionF);
                                            let conditionsF = result.daily[i].weather[0].description; //weather conditions description
                                            console.log('conditions = ',conditionsF);
                                            let feelsLikeF = result.daily[i].feels_like.day; //feels like weather conditions
                                            console.log('feels like = ',feelsLikeF);
                                            let tempMinF = result.daily[i].temp.min; // min temp for the day
                                            console.log('min temp = ',tempMinF);
                                            let tempMaxF = result.daily[i].temp.max; // max temp for the day
                                            console.log('max temp = ',tempMaxF);
                                                forecastCard.innerHTML = 
                                                `<div class="flex mb-4 justify-between items-center">
                                                    <div>
                                                        <h5 class="mb-0 font-medium text-xl">${cityInput.value}</h5>
                                                        <h6 class="mb-0">${moment.unix(dateF).format("dddd, MMMM Do YYYY")}</h6><small>${conditionsF}</small>
                                                    </div>
                                                    <div class="text-right">
                                                    <h3 class="font-bold text-4xl mb-0"><span> ${tempF}&#176;C</span></h3>
                                                    </div>
                                                </div>
                                                <div class="block sm:flex justify-between items-center flex-wrap">
                                                    <div class="w-full sm:w-1/2">
                                                        <div class="flex mb-2 justify-between items-center"><span>Temp</span><small class="px-2 inline-block">${tempF}&#176;C</small></div>
                                                    </div>
                                                    <div class="w-full sm:w-1/2">
                                                        <div class="flex mb-2 justify-between items-center"><span>Feels like</span><small class="px-2 inline-block">${feelsLikeF}&#176;C</small></div>
                                                    </div>
                                                    <div class="w-full sm:w-1/2">
                                                        <div class="flex mb-2 justify-between items-center"><span>Temp min</span><small class="px-2 inline-block">${tempMinF}&#176;C</small></div>
                                                    </div>
                                                    <div class="w-full sm:w-1/2">
                                                        <div class="flex mb-2 justify-between items-center"><span>Temp max</span><small class="px-2 inline-block">${tempMaxF}&#176;C</small></div>
                                                    </div>
                                                </div>`;
            
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
            
                                                        
                                                        whatToWearTomEL.innerHTML = `
                                                        <div>
                                                        <img src="${topImageForecast}" alt="${topImageForecast_Atl}" class="inline-block h-auto">
                                                        <img src="${middleImageForecast}" alt="${middleImageForecast_Atl}" class="inline-block h-auto">
                                                        <img src="${bottomImageForecast}" alt="${bottomImageForecast_Atl}" class="inline-block h-auto">
                                                        </div>
                                                        `     
                                                    })
                                                })
                                            })
                                        }
                                    })
                                })
                        })
                })
            })
        })
});
});

//upon clicking search in the city button the following should happen:
//1. Take the City name value and push to the display city span
//      this is done as a header for the current weather box

//2. Take the City name value and push into the api call in getUserChoice
//      this is done to obtain the lat and long so the call can get the info

//3. take the City name value and push into the API call for unsplash to get city background and then also start the request for the what to wear images.
//      this is to obtain a top bottom and middle outfit choice.

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
});
//upon loading of page publish 
initSearchHistory();