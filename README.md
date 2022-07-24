# weather-app

### 요구사항

- [x] 여러 국가를 선택할 수 있다.
- [x] 날씨의 상태에 따라 다른 이미지 표시
- [x] 날씨 정보 표시
  - 날씨, 기분, 기압, 습기, 최소/최대 온도, 해수면 기압, 대지 기압
    - 해수면 기압, 대지 기압 : 특정 도시 한정 표시

### 구현사항
- 도시를 검색하여 해당 도시의 날씨 정보 표시
- 날씨 상태별 다른 이미지 표시

### 적용 기술

- React
- TypeScript
- React query

### 배포URL

https://dahhnym.github.io/weather-app

### 프로젝트 실행방법

- 레포지토리를 clone 받거나, 압축 해제 후 yarn install을 통해 환경 세팅 합니다.
- src 폴더에 .env 파일을 생성 후 환경변수를 설정합니다.
  - [환경변수 설정 방법](https://valentinakim.notion.site/API-KEY-0521aa82924a49369fe48d74366afcc4)
- yarn start로 서버를 구동하여 실행합니다.

<br>

### 프로젝트 설명

```jsx
// src/components/Search.tsx

// 버튼 클릭했을 시 데이터 fetch하기
// 렌더링 시 자동으로 쿼리가 호출 되는 것이 아닌 submit 이벤트 발생 시 query 실행
const useGetDataAfterClick = () =>
  useQuery(['get/locationData'], () => fetchLocationByCityName(cityName), {
    enabled: false,
  });

const { refetch } = useGetDataAfterClick();

const resetInputField = () => {
  setCityName('');
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  resetInputField();

  // refetch 후 받아온 데이터
  const { data, status } = await refetch();
  setIsLoading(false);

  // 404 에러 발생시, 에러 데이터를 state에 저장
  if (data.cod === '404') {
    setData(data);
  }
  // 정상적으로 데이터 가져온 경우
  if (status === 'idle' || status === 'success') {
    setData(data);
  }
};
```

```jsx
// src/components/Display.tsx

  const { main, weather, name } = data;
  const [{ main: weatherMain, id, description }] = weather;

  // ...

  // 날씨 상태에 따라 다른 이미지 보여주기
  // weather code에 따라 다른 이미지 경로
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

// ...

  return (
    <Container>
      <Image src={imageSrc} />
      <CityName>{name}</CityName>
      <ul>
        <!-- 날씨 정보 표시 -->
      </ul>
    </Container>
  );
```

```jsx
// src/App.tsx

const [data, setData] = useState<IWeatherData>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Container>
      <Search
        setData={setData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />

      <!-- loading 중이지 않고 404 에러가 나지 않는 경우 Display 컴포넌트 렌더링 -->
      {!isLoading && data.cod !== '404' ? <Display {...data} /> : null}
      <!-- 404 에러 발생시 에러메세지 표시-->
      {data.cod === '404' ? <p>Error : {data.message}</p> : null}
    </Container>
  );
```
