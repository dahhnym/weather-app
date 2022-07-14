const BASE_URL = 'http://api.openweathermap.org';

export const fetchData = async (city: string) => {
  const response = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_API_KEY}`,
  );
  const responseJson = await response.json();
  return responseJson;
};

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`,
  );
  const responseJson = await response.json();
  return responseJson;
};
