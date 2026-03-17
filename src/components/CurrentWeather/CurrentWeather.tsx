import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { CurrentDetails } from '../CurrentDetails';
import { useWeather } from '../../hooks/useWeather';
import useLocationStore from '../../store/location.store';

import useUnitsStore from '../../store/units.store';

import './current-weather.css';

export const CurrrentWeather = () => {
  const { data } = useWeather();
  const location = useLocationStore((s) => s.locationString);
  const getLabels = useUnitsStore((s) => s.getDisplayUnits);

  const { temp, wind, precip } = getLabels();

  const currentData = data?.current;

  return (
    <div className="current-weather">
      {currentData ? (
        <>
          <div className="temperature-card">
            <div className="location-info">
              <h3>{location}</h3>
              <h5>{currentData.time.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h5>
            </div>
            <div className="weather-info">
              <img className="weather-icon" src={getWeatherIcon(currentData.weather_code)} alt="" />
              <h3 className="current-temp">{currentData.temperature_2m}&deg;</h3>
            </div>
          </div>
          <CurrentDetails title="Feels like" value={currentData.apparent_temperature + temp} />
          <CurrentDetails title="Humidity" value={currentData.relative_humidity_2m + '%'} />
          <CurrentDetails title="Wind" value={currentData.wind_speed_10m + wind} />
          <CurrentDetails title="Precipitation" value={currentData.precipitation + precip} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
