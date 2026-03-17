import { useEffect } from 'react';

import { CitySearch } from '../components/CitySearch/CitySearch';
import { CurrrentWeather } from '../components/CurrentWeather/CurrentWeather';
import { DailyForecast } from '../components/DailyForecast/DailyForecast';
import { HourlyForecast } from '../components/HourlyForecast/HourlyForecast';
import { getUsersLocation } from '../utils/getUsersLocation';

export const WeatherPage = () => {
  useEffect(() => {
    getUsersLocation();
  }, []);

  return (
    <>
      <h1>How's the sky looking today?</h1>
      <CitySearch />
      <CurrrentWeather />
      <DailyForecast />
      <HourlyForecast />
    </>
  );
};
