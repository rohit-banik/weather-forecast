//Complete the Weather API Backend part using openweathermap api

const apikey = '32701b6c1fc4b7f97a3b073ee52e52d8';

var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var cityDisplay = document.getElementById('city');
var dateDisplay = document.getElementById('date');
var tempDisplay = document.getElementById('temp');
var weatherDisplay = document.getElementById('weather');
var minmaxtempDisplay = document.getElementById('hi-low');

var time = new Date();
var day = time.getDay();
var date = time.getDate();
var month = time.getMonth();
var year = time.getFullYear();

// document.getElementById('searchInput').addEventListener("input", async(e) => {
//     const searchInput = e.target.value;
//     geocoding(searchInput)
// })

const fetchWeather = () => {
    var searchInput = document.getElementById('searchInput').value;
    searchInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
    geocoding(searchInput)
}


let geocoding = (searchInput) => {
    if(searchInput == ''){
        cityDisplay.innerHTML = '';
        dateDisplay.innerHTML = 'Enter your city name in the Search box and press enter';
        tempDisplay.innerHTML = '';
        weatherDisplay.innerHTML = '';
        minmaxtempDisplay.innerHTML = '';
    }
    else{
        const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${apikey}`
        axios.get(geoURL)
        .then(res => {
            getWeather(res.data[0].lat, res.data[0].lon, searchInput)
        })
        .catch(err => {
            cityDisplay.innerHTML = "Not found";
            dateDisplay.innerHTML = '';
            tempDisplay.innerHTML = '';
            weatherDisplay.innerHTML = '';
            minmaxtempDisplay.innerHTML = '';
        })
    }
}

let getWeather = (latitude, longitude, searchInput) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
    axios.get(weatherURL)
    .then(res => {
        cityDisplay.innerHTML = searchInput == res.data.name ? res.data.name : searchInput;
        cityDisplay.innerHTML +=  ", "+res.data.sys.country;        
        dateDisplay.innerHTML = days[day] + " " + date + " " + months[month] + " " + year;
        tempDisplay.innerHTML = (res.data.main.temp-273.15).toFixed(1)+" &#xb0;C";
        weatherDisplay.innerHTML = (res.data.weather[0].main);
        minmaxtempDisplay.innerHTML = (res.data.main.temp_min-273.15).toFixed(1)+" &#xb0;C / "+ (res.data.main.temp_max-273.15).toFixed(1)+" &#xb0;C";
    })
}