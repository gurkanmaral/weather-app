
import Search from "../components/search/Search"
import "./Home.scss"
import { useState } from 'react'
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api';
import CurrentWeather from "../components/current-weather/CurrentWeather";
import Forecast from "../components/forecast/Forecast";

const getWeatherClass = (weatherId) => {
  // Define the mapping between weather condition codes and CSS classes
  const classMap = {
    800: 'weather-sunny',
    801: 'weather-cloudy',
    802: 'weather-cloudy',
    803: 'weather-cloudy',
    804: 'weather-cloudy',
    500: 'weather-rainy',
    501: 'weather-rainy',
    502: 'weather-rainy',
    503: 'weather-rainy',
    504: 'weather-rainy',
    511: 'weather-rainy',
    520: 'weather-rainy',
    521: 'weather-rainy',
    522: 'weather-rainy',
    531: 'weather-rainy',
    200: 'weather-thunderstorm',
    201: 'weather-thunderstorm',
    202: 'weather-thunderstorm',
    210: 'weather-thunderstorm',
    211: 'weather-thunderstorm',
    212: 'weather-thunderstorm',
    221: 'weather-thunderstorm',
    230: 'weather-thunderstorm',
    231: 'weather-thunderstorm',
    232: 'weather-thunderstorm',
  };

  return classMap[weatherId] || '';
};
const Home = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherClass, setWeatherClass] = useState('');

  const handleOnSearchChange = (searchData) =>{
    const [lat,lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch,forecastFetch])
    .then(async(response) => {
        const weatherResponse= await response[0].json();
        const forecastResponse= await response[1].json();
      
        const weatherClass = getWeatherClass(weatherResponse.weather[0].id);
        setWeatherClass(weatherClass);
        setCurrentWeather({city: searchData.label , ...weatherResponse});
        setForecast({city:searchData.label ,...forecastResponse});


      })
      .catch((err) => console.log(err))
    
      console.log(searchData)
}
console.log(currentWeather);
console.log(forecast);

  return (
    <div className={`home ${weatherClass}`}>
        <div className="home-container">
        <Search onSearchChange={handleOnSearchChange} />
          {currentWeather && <CurrentWeather data={currentWeather} />}
              {forecast && <Forecast data={forecast}  />}
      </div>
       
    </div>
  )
}

export default Home