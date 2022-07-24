const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export const fetchLocationByCityName = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}q=${city}&appid=${process.env.REACT_APP_API_KEY}&lang=kr&units=metric`,
    );
    // if (response.status === 404) {
    //   // throw new Error('Not Found. 해당 지역을 찾을 수 없습니다.');
    //   alert('error 발생');
    // } else if (!response.ok) {
    //   throw new Error(`Error 발생`);
    // }
    const responseJson = await response.json();
    console.log('fetchLocation', responseJson);
    return responseJson;
  } catch (err) {
    console.log(err);
  }
};
