const inputValue = document.querySelector(".location");
const btnsearch = document.querySelector('.btnSrearch');
const weatherImg =document.getElementById('weatherImg');
const title= document.querySelector('.title')
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity= document.getElementById('humidity');
const windSpeed= document.querySelector('.wind-speed');
const Notfound = document.querySelector('.weather-not-location-found');
const found = document.querySelector('.weather-found')

let datafunction;

btnsearch.addEventListener ('click' , ()=>{
    checkweather(inputValue.value);
    inputValue.value='';
})

async function checkweather (city) {
    const api_key = "bbaabe67fccc8674858d60f043198648";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`);
    const data = await weather_data.json();
    // console.log(data);
    datafunction =data;
    display(datafunction);
    changeImage (datafunction);
}



function display (data) {
    let datafu = data;  
    if( datafu.cod === `404`   ||  datafu.message == 'Nothing to geocode'){
        Notfound.style.display = 'flex';
        found.style.display = 'none';
        return;
    }
    Notfound.style.display = 'none';
    found.style.display = 'flex';
    title.innerHTML=`${ datafu.name}`
    temperature.innerHTML=`${Math.round( datafu.main.temp - 273.15)} <sup>°C</sup>`;
    description.innerHTML=`${ datafu.weather[0].description}`;
    humidity.textContent=`${ datafu.main.humidity}%`;
    windSpeed.innerHTML=`${ datafu.wind.speed}km-h`;
}


function changeImage (mainimage){
    let image = mainimage.weather[0].main;
    switch(image) {
        case 'Clouds' :
            weatherImg.scr = `/asstes/image/cloud.png`
            break;
        case 'Clear' :
            weatherImg.scr ='/asstes/image/clear.png';
            break;
        case 'Rain' :
            weatherImg.scr ='/asstes/image/rain.png';
            break;
        case 'Mist' :
            weatherImg.scr ='/asstes/image/mist.png';
            break;
        case 'Snow' :
            weatherImg.scr ='/asstes/image/snow.png';
            break;
    }
}


