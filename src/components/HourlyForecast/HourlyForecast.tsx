import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '../../api/weather-api';
import { getWeatherIcon } from '../../utils/getWeatherIcon';

import './hourly-forecast.css';

export const HourlyForecast = () => {
  const query = useQuery({
    queryKey: ['currentWeather'],
    queryFn: getWeatherData,
  });

  const hourlyData = query.data?.hourly;
  const hourlyToday = hourlyData?.time.slice(0, 8); //temporary limit to 8 hours

  return (
    <div className="hourly-forecast">
      <h4>Hourly forecast</h4>
      <div className="hourly-grid">
        {hourlyData &&
          hourlyToday?.map((time, index) => (
            <HourlyCard
              key={index}
              date={time}
              temperature={hourlyData.temperature_2m?.[index]}
              weatherCode={hourlyData.weather_code?.[index]}
            />
          ))}
      </div>
    </div>
  );
};

interface HourlyCardProps {
  date: Date;
  temperature?: number;
  weatherCode?: number;
}

const HourlyCard = ({ date, temperature, weatherCode }: HourlyCardProps) => {
  temperature = Math.round(temperature!);
  return (
    <div className="glass-card">
      <div className="hourly-card-left">
        <img src={getWeatherIcon(weatherCode!)} alt="" />
        <h5>{date.getHours()}:00</h5>
      </div>
      <h5>{temperature}°</h5>
    </div>
  );
};
