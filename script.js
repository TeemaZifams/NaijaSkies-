
const apiKey = 'c8912625c348ad5ab840990a5f3c44f2';  // Replace with your OpenWeatherMap API key
let isMetric = true; // Toggle between Celsius and Fahrenheit

// Toggle temperature units
function toggleUnits() {
    isMetric = !isMetric;
    getWeather();
}

async function getWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Current weather data
        const units = isMetric ? 'metric' : 'imperial';
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=$Lagos,NG&appid=$abc123xyz&units=$metric`
        );
        const weatherData = await weatherResponse.json();

        if (weatherResponse.ok) {
            displayCurrentWeather(weatherData);
            getForecast(city, units);
        } else {
            alert('City not found');
        }
    } catch (error) {
        alert('Failed to fetch weather data');
    }
}

function displayCurrentWeather(data) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const unitSymbol = isMetric ? '°C' : '°F';
    const weatherDetails = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><img src="${iconUrl}" alt="${data.weather[0].description}"> ${data.weather[0].description}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} ${unitSymbol}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} ${isMetric ? 'm/s' : 'mph'}</p>
        <p><strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p><strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    `;
    document.getElementById('current-weather-details').innerHTML = weatherDetails;
}

async function getForecast(city, units) {
    try {
        // 5-day forecast data
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=$lagos,NG&appid=${apiKey}ap&units=${units}`
        );
        const forecastData = await forecastResponse.json();
        
        if (forecastResponse.ok) {
            displayForecast(forecastData);
        } else {
            alert('Failed to fetch forecast data');
        }
    } catch (error) {
        alert('Failed to fetch forecast data');
    }
}

function displayForecast(data) {
    const unitSymbol = isMetric ? '°C' : '°F';
    const forecastDetails = data.list.slice(0, 5).map(item => `
        <div>
            <p><strong>${new Date(item.dt * 1000).toLocaleDateString()}</strong></p>
            <p><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}"> ${item.weather[0].description}</p>
            <p><strong>Temp:</strong> ${item.main.temp} ${unitSymbol}</p>
            <p><strong>Humidity:</strong> ${item.main.humidity}%</p>
        </div>
    `).join('');
    document.getElementById('forecast-details').innerHTML = forecastDetails;
}