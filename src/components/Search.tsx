import React, { useState } from 'react';
import { fetchLocationByCityName } from './../api';
import { useQuery } from 'react-query';
import { IProps } from 'App';
import styled from 'styled-components';

const Search = ({ setData, setIsLoading }: IProps) => {
  const [cityName, setCityName] = useState('');

  // 버튼 클릭했을 시 데이터 fetch하기
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
    const { data, status } = await refetch();
    setIsLoading(false);
    console.log('데이터', data);
    console.log('status', status);
    if (data.cod === '404') {
      setData(data);
    }
    if (status === 'idle' || status === 'success') {
      setData(data);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Enter a city name in English"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <Button type="submit" value="Search" />
      </Form>
    </>
  );
};

export default Search;

const Form = styled.form`
  margin-bottom: 2rem;
`;

const InputField = styled.input`
  border: solid 1px #535353;
  box-sizing: border-box;
  height: 40px;
  width: 15rem;
  border-radius: 1.2rem;
  font-size: 1.03rem;
  padding: 0.9rem;
  margin-right: 0.6rem;
`;

const Button = styled.input`
  border: solid 1px #498ff7;
  color: #fff;
  background: #498ff7;
  height: 40px;
  width: 4.7rem;
  border-radius: 1.2rem;
  font-weight: bold;
`;
