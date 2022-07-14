import { fetchCurrentWeather, fetchData } from 'api';
import React from 'react';
import './App.css';
import { useState } from 'react';

interface IWeatherData {
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    main: string;
  };
}

function App() {
  const [cityName, setCityName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const geoData = await fetchData(cityName);
    const [{ lat, lon }] = geoData;
    const result = await fetchCurrentWeather(lat, lon);
    console.log('result', result);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search cities.."
          onChange={(e) => setCityName(e.target.value)}
        />
        <input type="submit" value="검색" />
      </form>
      <div className="display"> 날씨 표시</div>
    </div>
  );
}

export default App;
