
const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');

const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');

const footer = document.querySelector('.footer');

const APIKey = 'edd89ecaa2d6c0474b3aceaf6e436508';

const weatherImages = {
    Clear: 'images/clear.png',
    Rain: 'images/rain.png',
    Snow: 'images/snow.png',
    Clouds: 'images/cloud.png',
    Haze: 'images/mist.png',
    Mist: 'images/mist.png',
    Drizzle: 'images/rain.png',
    Thunderstorm: 'images/rain.png'
};

async function getWeather() {

    const city = input.value.trim();

    if (!city) return;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        );

        const data = await response.json();

        if (data.cod !== 200) {

            container.style.height = '400px';

            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';

            error404.style.display = 'block';
            error404.classList.add('fadeIn');

            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const weatherType = data.weather[0].main;

        image.src = weatherImages[weatherType] || '';

        temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
        description.innerHTML = data.weather[0].description;

        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${Math.round(data.wind.speed)} Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';

        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');

        container.style.height = '590px';

    } catch (error) {

        console.error('Error fetching weather:', error);

        container.style.height = '400px';

        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';

        error404.style.display = 'block';
        error404.classList.add('fadeIn');
    }
}

searchBtn.addEventListener('click', getWeather);

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

const year = new Date().getFullYear();

footer.innerHTML = `${year} Copyright © 
<a href="https://anasskoutit.vercel.app" target="_blank">Anass Koutit</a>`;
