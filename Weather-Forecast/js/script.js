// 1. Get DOM elements
var currentLocation = getElement('current-location'),
    currentDate = getElement('current-date'),
    temperature = getElement('current-temperature'),
    weatherIcon = getElement('current-weather-icon'),
    weatherSummary = getElement('weather-summary'),
    humidity = getElement('current-humidity'),
    pressure = getElement('current-pressure'),
    windInfo = getElement('current-wind-info');

// 2. Customisation elements
var windDeg;
var windDerection;
var weatherData;
var date = new Date();
    currentDay = date.getDate(),
    currentDayInWeek = date.getDay(),
    daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    numberOfWeek = '';

var apiKey = '0bf520768cd1727acf2acac1e425daf9';

// helper function to get DOM elements
function getElement(id) {
    return document.getElementById(id);
}

// 3. Function to find current geo position
function getCurrentGeoPosition() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            fetchWeatherDataGeo(position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert('Your browser does not support Geolocation API!');
    }
}

// 4. Function to make HTTP request to 3rd party client
function fetchWeatherDataGeo(lat, long) {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            weatherData = data;
            console.log(weatherData)
            displayWeatherData();
        })
        .catch(function (err) {
            return err;
        })
}

// 5. Function to display date
function displayDate() {
  currentDate.innerHTML = daysInWeek[currentDayInWeek] + ', ' + currentDay + 'th';
}

// 6. Function to display data
function displayWeatherData() {
  if(weatherData.name && weatherData.sys.country) {
    currentLocation.innerHTML = weatherData.name + ', ' + weatherData.sys.country;
  };
  humidity.innerHTML = 'Humidity: ' + weatherData.main.humidity + ' %';
  pressure.innerHTML = 'Pressure: ' + transformFromHpaToMmHg() + ' mm Hg';
  temperature.innerHTML = transformFromKelvinToCelsius() + '°';

  var imgUrl = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@4x.png';
  weatherIcon.innerHTML = '<img src=' + imgUrl + '>';
  windDeg = weatherData.wind.deg;
  windInfo.innerHTML = 'Wind: ' + transformWindDeg() + ', ' + transformFromKnotsToMeters() + ' m/s';
  weatherSummary.innerHTML = weatherData.weather[0].main;
  words.value = "";
};

// helpers to transform data
function transformFromHpaToMmHg() {
  return (weatherData.main.pressure * 0.75).toFixed(); 
};

function transformFromKelvinToCelsius() {
  return (weatherData.main.temp - 273.15).toFixed(); 
};

function transformWindDeg() {
  if(windDeg > 337.5 || windDeg < 22.5) {
    return 'North';
  } else if (windDeg > 22.5 && windDeg < 67.5) {
    return "NorthEast";
  } else if (windDeg > 67.5 && windDeg < 112.5) {
    return "East";
  } else if (windDeg > 112.5 && windDeg < 157.5) {
    return "SouthEast";
  } else if (windDeg > 157.5 && windDeg < 202.5) {
    return 'South';
  } else if (windDeg > 202.5 && windDeg < 247.5) {
    return 'SouthWest';
  } else if (windDeg > 247.5 && windDeg < 292.5) {
    return 'West';
  } else if (windDeg > 292.5 && windDeg < 337.5) {
    return 'Northwest';
}};

function transformFromKnotsToMeters() {
  return (weatherData.wind.speed * 1.852).toFixed(1); 
};

getCurrentGeoPosition();
displayDate();