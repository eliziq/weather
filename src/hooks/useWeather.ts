import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '../api/weather-api';
import useLocationStore from '../store/location.store';

export const useWeather = () => {
  const location = useLocationStore((s) => s.location);

  return useQuery({
    queryKey: ['weather', { ...location }],
    queryFn: () => getWeatherData(location),
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });
};
