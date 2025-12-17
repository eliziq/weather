import { useState } from 'react';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { useWeather } from '../../hooks/useWeather';

import './hourly-forecast.css';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const HourlyForecast = () => {
  const [dayOffset, setDayOffset] = useState(0);

  const { data } = useWeather();

  const hourlyData = data?.hourly;

  if (!hourlyData) {
    return <div>Loading...</div>;
  }

  const todayIndex = hourlyData.time[0].getDay();

  const startIndex = dayOffset * 24;
  const hourlyDay = hourlyData.time.slice(startIndex, startIndex + 24);

  const rotatedDays = WEEK_DAYS.map((_, index) => ({
    label: WEEK_DAYS[(todayIndex + index) % 7],
    offset: index,
  }));

  return (
    <div className="hourly-forecast">
      <div className="hourly-header">
        <h4>Hourly Forecast </h4>
        <DaySelect days={rotatedDays} dayOffset={dayOffset} setDayOffset={setDayOffset} />
      </div>
      <div className="hourly-grid">
        {hourlyDay.map((time, index) => {
          const realIndex = startIndex + index;

          return (
            <HourlyCard
              key={realIndex}
              date={time}
              temperature={hourlyData.temperature_2m?.[realIndex]}
              weatherCode={hourlyData.weather_code?.[realIndex]}
            />
          );
        })}
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

interface DaySelectProps {
  days: { label: string; offset: number }[];
  dayOffset: number;
  setDayOffset: (v: number) => void;
}

const DaySelect = ({ days, dayOffset, setDayOffset }: DaySelectProps) => {
  return (
    <select value={dayOffset} onChange={(e) => setDayOffset(Number(e.target.value))}>
      {days.map(({ label, offset }) => (
        <option key={label} value={offset}>
          {label}
        </option>
      ))}
    </select>
  );
};
