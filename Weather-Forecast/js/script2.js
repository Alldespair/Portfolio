window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

var words = document.querySelector('.words');
var cityName;

function getWeather() {
  cityName = words.value;
  fetchWeatherData();
};
  
words.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    getWeather();
  };
});

function getVoice() {
  recognition.start();
};

recognition.addEventListener('result', function (event) {
  cityName = Array.from(event.results)
    .map(function (result) {
      return result[0];
    })
    .map(function (result) {
      return result.transcript;
    })
    .join('');

    fetchWeatherData();
});

function fetchWeatherData() {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey)
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
};