import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { CurrentDetails } from '../CurrentDetails';
import { useWeather } from '../../hooks/useWeather';

import './current-weather.css';

export const CurrrentWeather = () => {
  const { data } = useWeather();

  const currentData = data?.current;

  return (
    <div className="current-weather">
      {currentData ? (
        <>
          <div className="temperature-card">
            <div className="location-info">
              <h3>{data?.timezone}</h3>
              <h5>{currentData.time.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h5>
            </div>
            <div className="weather-info">
              <img className="weather-icon" src={getWeatherIcon(currentData.weather_code)} alt="" />
              <h3 className="current-temp">{currentData.temperature_2m}&deg;</h3>
            </div>
          </div>
          <CurrentDetails title="Feels like" value={currentData.apparent_temperature + '°'} />
          <CurrentDetails title="Humidity" value={currentData.relative_humidity_2m + '%'} />
          <CurrentDetails title="Wind" value={currentData.wind_speed_10m + ' km/h'} />
          <CurrentDetails title="Precipitation" value={currentData.precipitation + ' mm'} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
