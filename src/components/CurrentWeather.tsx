import { getWeatherData } from '../api/weather-api';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { getWeatherIcon } from '../utils/getWeatherIcon';

export const CurrrentWeather = () => {
  const queryClient = new QueryClient();

  const query = useQuery({
    queryKey: ['currentWeather'],
    queryFn: getWeatherData,
  });

  return (
    <div className="current-weather">
      {query.data ? (
        <>
          <div>
            <p>{query.data.timezone}</p>
            <p>{query.data.current.time.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div>
            <img className="weather-icon" src={getWeatherIcon(query.data.current.weather_code)} alt="" />
            <p>{query.data.current.temperature_2m}&deg;</p>
            <p>feels like {query.data.current.apparent_temperature}&deg;</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
