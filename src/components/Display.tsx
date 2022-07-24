import { IWeatherData } from 'App';
import React from 'react';
import styled from 'styled-components';

const Display = (data: IWeatherData) => {
  const { main, weather, name } = data;
  const [{ main: weatherMain, id, description }] = weather;

  // id(weather code)
  // 2xx 천둥번개
  // 3xx 이슬비
  // 5xx 비
  // 6xx 눈
  // 7xx 안개
  // 800 맑음
  // 80x 구름

  // id(weather code)의 첫째 자리 수
  const numberAtfirstIdxOfId = id.toString().at(0);

  let imageSrc = '';

  const getWeatherImageSrc = () => {
    if (id === 800) {
      imageSrc = `${process.env.PUBLIC_URL}/assets/clear.jpg`;
    }

    if (numberAtfirstIdxOfId === '2') {
      imageSrc = `${process.env.PUBLIC_URL}/assets/thunderstorm.jpg`;
      return imageSrc;
    } else if (numberAtfirstIdxOfId === '3') {
      imageSrc = `${process.env.PUBLIC_URL}/assets/drizzle.jpg`;
    } else if (numberAtfirstIdxOfId === '5') {
      imageSrc = `${process.env.PUBLIC_URL}/assets/rain.jpg`;
    } else if (numberAtfirstIdxOfId === '6') {
      imageSrc = `${process.env.PUBLIC_URL}/assets/snow.jpg`;
    } else if (numberAtfirstIdxOfId === '7') {
      imageSrc = `${process.env.PUBLIC_URL}/assets/atmosphere.jpg`;
    } else if (numberAtfirstIdxOfId === '8' && id.toString().at(2) !== '0') {
      imageSrc = `${process.env.PUBLIC_URL}/assets/clouds.jpg`;
    }
  };

  getWeatherImageSrc();

  return (
    <Container>
      {data.cod === '404' ? (
        <p>data.message</p>
      ) : (
        <>
          <Image src={imageSrc} />
          <CityName>{name}</CityName>
          <ul>
            <li>
              <Bold>날씨</Bold>: {`${weatherMain}, ${description}`}
            </li>
            <li>
              <Bold>기분</Bold>: {main.feels_like}
            </li>
            <li>
              <Bold>기온</Bold>: {main.temp}
            </li>
            <li>
              <Bold>최대 온도</Bold>: {main.temp_max}
            </li>
            <li>
              <Bold>최소 온도</Bold>: {main.temp_min}
            </li>
            <li>
              <Bold>기압</Bold> : {main.pressure}
            </li>
            <li>
              <Bold>습기</Bold>: {main.humidity}
            </li>
            {main?.grnd_level ? (
              <li>
                <Bold>대지 기압</Bold>: {main?.grnd_level}
              </li>
            ) : null}
            {main?.sea_level ? (
              <li>
                <Bold>해수면 기압</Bold>: {main?.sea_level}
              </li>
            ) : null}
          </ul>
        </>
      )}
    </Container>
  );
};

export default Display;

const CityName = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
`;

const Image = styled.img`
  height: 400px;
`;

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bold = styled.span`
  font-weight: bold;
`;
