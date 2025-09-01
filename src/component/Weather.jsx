import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const API_KEY = "fb60c79979934840ab561834250109"

const Weather = () => {
  const [city, setCity] = useState("London")
  const [weather, setWeather] = useState(null)

  const search = async (query) => {
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setWeather(data)
    } catch (error) {
      console.error("Error fetching weather:", error)
    }
  }

  useEffect(() => {
    search("London")
  }, [])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder='Search city...' 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search(city)}
        />
        <img src={search_icon} alt="search" onClick={() => search(city)} />
      </div>

      {weather && (
        <>
          <img src={weather.current.condition.icon} alt="" className='weather-icon'/>
          <p className='temperature'>{weather.current.temp_c}°C</p>
          <p className='location'>{weather.location.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weather.current.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weather.current.wind_kph} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
