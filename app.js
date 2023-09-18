let now = new Date();

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let jour = daysOfWeek[now.getDay()];
let hours = now.getHours();
let mins = now.getMinutes();
let deta = document.querySelector('#date');
deta.innerHTML = `${jour} ${hours}:${mins}`;


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
}

let celTemp = null;

function searchCity(city){
    let apiKey = '8c48afa47a9a9c24f3500c7039d50aaa';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics`;
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
    let franTemperature = (celTemp * 9)/5 + 32;
    tempElement.innerHTML = Math.round(franTemperature);
}
function ShowCelsiusTemp(event){
    event.preventDefault();
    let tempElement = document.querySelector('#temp');
    tempElement.innerHTML = Math.round(celTemp);
}

let button = document.querySelector('#submit');
button.addEventListener("click", handleCity);

let fahen = document.querySelector('#fran');
fahen.addEventListener("click", ShowFranTemp);

let celsius = document.querySelector('#cel');
celsius.addEventListener("click", ShowCelsiusTemp);