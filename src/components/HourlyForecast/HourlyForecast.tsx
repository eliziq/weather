import { useState } from 'react';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { useWeather } from '../../hooks/useWeather';
import { Dropdown } from '../shared/Dropdown/Dropdown';
import { Skeleton } from '../shared/Skeleton/Skeleton';

import './hourly-forecast.css';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const HourlyForecast = () => {
  const [dayOffset, setDayOffset] = useState(0);

  const { data, isLoading } = useWeather();

  const hourlyData = data?.hourly;

  if (!hourlyData || isLoading) {
    return <Skeleton />;
  }

  const todayIndex = hourlyData.time[0].getDay();

  const startIndex = dayOffset * 24;
  const hourlyDay = hourlyData.time.slice(startIndex, startIndex + 24);

  const rotatedDays = WEEK_DAYS.map((_, index) => ({
    label: WEEK_DAYS[(todayIndex + index) % 7],
    offset: index,
  }));

  return (
    <div className="hourly-forecast glass-card">
      <div className="hourly-header">
        <h4>Hourly Forecast </h4>
        <DayDropdown days={rotatedDays} dayOffset={dayOffset} setDayOffset={setDayOffset} />
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
  temperature = temperature ? Math.round(temperature) : undefined;
  return (
    <div className="glass-card">
      <div className="hourly-card-left">
        {weatherCode !== undefined ? <img src={getWeatherIcon(weatherCode)} alt="" /> : ''}
        <h5>{date.getHours()}:00</h5>
      </div>
      <h5>{temperature !== undefined ? `${temperature}°` : '--'}</h5>
    </div>
  );
};

interface DaySelectProps {
  days: { label: string; offset: number }[];
  dayOffset: number;
  setDayOffset: (v: number) => void;
}

const DayDropdown = ({ days, dayOffset, setDayOffset }: DaySelectProps) => {
  const data = days.map(({ label, offset }) => ({ label, id: offset.toString() }));
  return (
    <Dropdown
      id="day"
      title="Day"
      data={data}
      selectedId={dayOffset.toString()}
      onSelect={(id) => setDayOffset(Number(id))}
    />
  );
};
