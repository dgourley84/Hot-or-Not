//1. Link API for NASA Mars weather API 

const   MarsAPIKey          = "CMwtdMBbpXlbZlnpnMsZCn8HBeULLCwNBqv4A47F" // Nasa API Key
let     MarsQureyUrl        = "https://api.nasa.gov/insight_weather/?api_key=" + MarsAPIKey + "&feedtype=json&ver=1.0"; // Nasa Insight Weather query


//2. Like API for Weather one API
const   EarthAPIKey         = 'aef8ff579a371781a816a273903f8295'; //api key for the first call to get lat long
const   EarthAPIKeySecond   = '3e577ad9e250c4dd28d83578156049cc'; //api key for the second call to get weather

let     CityQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=perth&limit=1&appid=" + EarthAPIKey; // Earth Weather query


console.log('Mars' , MarsAPIKey); // console log of Mars Query

console.log('Earth', CityQueryURL); // console log of Earth Query