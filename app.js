let now = new Date();

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let jour = daysOfWeek[now.getDay()];
let hours = now.getHours();
let mins = now.getMinutes();
let deta = document.querySelector('#date');
deta.innerHTML = `${jour} ${hours}:${mins}`;


function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement = document.querySelector('#forecast');

    let forecastHTML = `<div class="row">`;
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach(function(day){
        forecastHTML = forecastHTML +
            `<div class="col-2">
                <div class="weather-forecast-date">
                    ${day}
                </div>
                <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="" width="42px">
                <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max">
                        18°
                    </span>
                    <span class="weather-forecast-temperature-min">
                        12°
                    </span>
                </div>
            </div>`;
    });
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = '97bed167ec49bff56e6c1b63daef9c86';
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function showCity(response){
    let h1 = document.querySelector('#city');
    h1.innerHTML = response.data.name;
    let description = document.querySelector('#description')
    description.innerHTML = response.data.weather[0].description;
    let precipitation = document.querySelector('#prep');
    precipitation.innerHTML = Math.round(response.data.main.pressure);
    let humidity = document.querySelector('#humid');
    humidity.innerHTML = Math.round(response.data.main.humidity);
    let wind = document.querySelector('#wind');
    wind.innerHTML = Math.round(response.data.wind.speed);
    let temperature = document.querySelector("#temp");
    temperature.innerHTML = Math.round(response.data.main.temp);
    let iconElement = document.querySelector('#icon');
    iconElement.setAttribute("src",  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
    celTemp = response.data.main.temp;
    console.log(response.data);

    getForecast(response.data.coord);

}

let celTemp = null;

displayForecast()


function searchCity(city){
    let apiKey = '97bed167ec49bff56e6c1b63daef9c86';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}
function handleCity(event){
    event.preventDefault();
    let searchInput = document.querySelector('#search');
    searchCity(searchInput.value);
}

function ShowFranTemp(event){
    event.preventDefault();
    let tempElement = document.querySelector('#temp');
    
    celsius.classList.remove('active');
    fahen.classList.add('active');
    let franTemperature = (celTemp * 9)/5 + 32;
    tempElement.innerHTML = Math.round(franTemperature);
}
function ShowCelsiusTemp(event){
    event.preventDefault();
    let tempElement = document.querySelector('#temp');

    celsius.classList.add('active');
    fahen.classList.remove('active');
    tempElement.innerHTML = Math.round(celTemp);
}

let button = document.querySelector('#submit');
button.addEventListener("click", handleCity);

let fahen = document.querySelector('#fran');
fahen.addEventListener("click", ShowFranTemp);

let celsius = document.querySelector('#cel');
celsius.addEventListener("click", ShowCelsiusTemp);
