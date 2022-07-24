import { IWeatherData } from 'App';
import React from 'react';

const Display = (data: IWeatherData) => {
  const { main, weather } = data;
  const [{ main: weatherMain }] = weather;

  return (
    <div className="display">
      <ul>
        <li>날씨: {weatherMain}</li>
        <li>기분: {main.feels_like}</li>
        <li>기온: {main.temp}</li>
        <li>최대 온도: {main.temp_max}</li>
        <li>최소 온도: {main.temp_min}</li>
        <li>기압 : {main.pressure}</li>
        <li>습기: {main.humidity}</li>
        {main?.grnd_level ? <li>대지 기압: {main?.grnd_level}</li> : null}
        {main?.sea_level ? <li>해수면 기압: {main?.sea_level}</li> : null}
      </ul>
    </div>
  );
};

export default Display;
