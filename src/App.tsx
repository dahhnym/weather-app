import React, { useState, Dispatch, SetStateAction } from 'react';
import './App.css';
import Search from 'components/Search';
import Display from 'components/Display';
import styled from 'styled-components';

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
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  cod?: string;
  message?: string;
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
  name: '',
  weather: [
    {
      id: 0,
      main: '',
      description: '',
    },
  ],
};

function App() {
  const [data, setData] = useState<IWeatherData>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Container>
      <Search
        setData={setData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      {!isLoading && data.cod !== '404' ? <Display {...data} /> : null}
      {data.cod === '404' ? <p>Error : {data.message}</p> : null}
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
