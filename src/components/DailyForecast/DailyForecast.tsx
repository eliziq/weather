import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { useWeather } from '../../hooks/useWeather';

import './daily-forecast.css';

export const DailyForecast = () => {
   const { data } = useWeather();

  const dailyData = data?.daily;

  return (
    <div className="daily-forecast">
      <h4>Daily forecast</h4>
      <div className="daily-grid">
        {dailyData &&
          dailyData.time.map((time, index) => (
            <DailyCard
              key={index}
              date={time}
              maxTemp={dailyData.temperature_2m_max?.[index]}
              minTemp={dailyData.temperature_2m_min?.[index]}
              weatherCode={dailyData.weather_code?.[index]}
            />
          ))}
      </div>
    </div>
  );
};

interface DailyDataProps {
  date: Date;
  maxTemp?: number;
  minTemp?: number;
  weatherCode?: number;
}

const DailyCard = ({ date, maxTemp, minTemp, weatherCode }: DailyDataProps) => {
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  maxTemp = Math.round(maxTemp!);
  minTemp = Math.round(minTemp!);
  return (
    <div className="glass-card">
      <h4>{day}</h4>
      <img className="weather-icon-daily" src={getWeatherIcon(weatherCode!)} alt="weather icon" />
      <div className="daily-temp">
        <h5>{maxTemp}°</h5>
        <h5>{minTemp}°</h5>
      </div>
    </div>
  );
};
