const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(cityName){

    if(cityName===""){
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        city.innerText = data.name;
        temperature.innerText = Math.round(data.main.temp) + "°C";
        humidity.innerText = data.main.humidity + "%";
        wind.innerText = data.wind.speed + " km/h";
        description.innerText = data.weather[0].description;

        const icon = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    }
    catch(error){
        alert("City not found!");
    }

}

searchBtn.addEventListener("click",()=>{

    getWeather(cityInput.value);

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){
        getWeather(cityInput.value);
    }

});