let now = new Date();

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let jour = daysOfWeek[now.getDay()];
let hours = now.getHours();
let mins = now.getMinutes();
let deta = document.querySelector('#date');
deta.innerHTML = `${jour} ${hours}:${mins}`;

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return days[day];
}


function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector('#forecast');

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index){
        if (index < 6){
        forecastHTML = forecastHTML +
            `<div class="col-2">
                <div class="weather-forecast-date">
                    ${formatDay(forecastDay.dt)}
                </div>
                <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42px">
                <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max">
                        ${Math.round(forecastDay.temp.max)}°
                    </span>
                    <span class="weather-forecast-temperature-min">
                        ${Math.round(forecastDay.temp.min)}°
                    </span>
                </div>
            </div>`;
        }
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

let button = document.querySelector('#submit');
button.addEventListener("click", handleCity);


// create a new keyboard event and set the key to "Enter"
const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
  });
  
  // dispatch the event on some DOM element
  document.getElementById('submit').dispatchEvent(event);