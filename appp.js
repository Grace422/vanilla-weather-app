let now = new Date();

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let jour = daysOfWeek[now.getDay()];
let hours = now.getHours();
let mins = now.getMinutes();
let deta = document.querySelector('#date');
deta.innerHTML = `${jour} ${hours}:${mins}`;


function showCity(response){
    let h1 = document.querySelector('#city');
    h1.innerHTML = `${response.data.name}`;
    let description = document.querySelector('#description')
    description.innerHTML = `${response.data.weather[0].description}`
    let precipitation = document.querySelector('#prep');
    precipitation.innerHTML = `${response.data.main.pressure}`;
    let humidity = document.querySelector('#humid');
    humidity.innerHTML = `${response.data.main.humidity}`;
    let wind = document.querySelector('#wind');
    wind.innerHTML = `${response.data.wind.speed}`;
    let temperature = document.querySelector("#temp");
    temperature.innerHTML = `${response.data.main.temp}`;
    console.log(response.data);
}

function searchCity(city){
    let apiKey = '8c48afa47a9a9c24f3500c7039d50aaa';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}

function handleCity(){
    let searchInput = document.querySelector('#search');
    searchCity(searchInput);
}