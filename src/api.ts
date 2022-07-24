const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export const fetchLocationByCityName = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}q=${city}&appid=${process.env.REACT_APP_API_KEY}&lang=kr&units=metric`,
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log(err);
  }
};
