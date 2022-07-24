import React, { useState } from 'react';
import { fetchLocationByCityName } from './../api';
import { useQuery } from 'react-query';
import { IProps } from 'App';

const Search = ({ setData, setIsLoading, isLoading }: IProps) => {
  const [cityName, setCityName] = useState('');

  // 버튼 클릭했을 시 데이터 fetch하기
  const useGetDataAfterClick = () =>
    useQuery(['get/locationData'], () => fetchLocationByCityName(cityName), {
      enabled: false,
    });

  const { refetch, status, isError } = useGetDataAfterClick();

  const changeLoadingStatus = (prev: boolean) => {
    setIsLoading(!prev);
  };

  const resetInputField = () => {
    setCityName('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetInputField();
    const { data } = await refetch();
    changeLoadingStatus(isLoading);
    if (status === 'idle' || status === 'success') {
      setData(data);
    } else if (isError) {
      console.log('error occurred');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search cities.."
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <input type="submit" value="검색" />
      </form>
    </>
  );
};

export default Search;
