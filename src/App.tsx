import React, { useState, Dispatch, SetStateAction } from 'react';
import './App.css';
import Search from 'components/Search';
import Display from 'components/Display';

export interface IWeatherData {
  main: {
    feels_like: number;
    grnd_level?: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

export interface IProps {
  setData: Dispatch<SetStateAction<IWeatherData>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const defaultData = {
  main: {
    feels_like: 0,
    grnd_level: 0,
    humidity: 0,
    pressure: 0,
    sea_level: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  weather: [
    {
      main: '',
      description: '',
    },
  ],
};

function App() {
  const [data, setData] = useState<IWeatherData>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="App">
      <Search
        setData={setData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      {!isLoading ? <Display {...data} /> : null}
    </div>
  );
}

export default App;
