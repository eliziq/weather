import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '../api/weather-api';
import useLocationStore from '../store/location.store';
import useUnitsStore from '../store/units.store';

export const useWeather = () => {
  const location = useLocationStore((s) => s.location);
  const currentSystem = useUnitsStore((s) => s.currentSystem);
  const getUnits = useUnitsStore((s) => s.getUnits);

  const unitParams = getUnits();

  return useQuery({
    queryKey: ['weather', { ...location, system: currentSystem}],
    queryFn: () => getWeatherData(location, unitParams),
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });
};
