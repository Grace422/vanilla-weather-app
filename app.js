
let now = new Date();

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let days = daysOfWeek[now.getDay];
let mins = now.getMinutes;
let secs = now.getSeconds;
let date = document.querySelector('#date');
date.innerHTML = `${days} ${mins}:${secs}`;


function showCity(response){
    let h1 = document.querySelector('#city');
    h1.innerHTML = `${response.data.name}`;
    let description = document.querySelector('#description')
    description.innerHTML = `${response.data}`
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