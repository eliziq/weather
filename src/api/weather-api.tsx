import { fetchWeatherApi } from 'openmeteo';
import type { Location } from '../types/location.types';
import type { WeatherUnitParams } from '../types/units.types';

const params = {
  latitude: 50.4547,
  longitude: 30.5238,
  daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
  hourly: ['temperature_2m', 'weather_code'],
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'is_day',
    'apparent_temperature',
    'wind_speed_10m',
    'wind_direction_10m',
    'rain',
    'showers',
    'snowfall',
    'cloud_cover',
    'weather_code',
    'precipitation',
  ],
  timezone: 'auto',
};

const url = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (location: Location, unitParams: WeatherUnitParams) => {
  const responses = await fetchWeatherApi(url, { ...params, ...location, ...unitParams });

  const response = responses[0];

  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
  );

  // Attributes for timezone and location

  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();

  const start = Number(hourly?.time() ?? 0);
  const end = Number(hourly?.timeEnd() ?? 0);
  const hourlyInterval = hourly?.interval() || 3600;
  const dailyInterval = daily?.interval() || 86400;

  const hours = hourlyInterval > 0 ? Math.round((end - start) / hourlyInterval) : 0;

  const getVarValue = (source: any, index: number) => {
    return source?.variables(index)?.value() ?? 0;
  };

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: current ? new Date(Number(current.time()) * 1000) : new Date(),
      temperature_2m: Math.round(Math.round(getVarValue(current, 0))),
      relative_humidity_2m: Math.round(Math.round(getVarValue(current, 1))),
      is_day: getVarValue(current, 2),
      apparent_temperature: Math.round(getVarValue(current, 3)),
      wind_speed_10m: Math.round(getVarValue(current, 4)),
      wind_direction_10m: getVarValue(current, 5),
      rain: getVarValue(current, 6),
      showers: getVarValue(current, 7),
      snowfall: getVarValue(current, 8),
      cloud_cover: getVarValue(current, 9),
      weather_code: getVarValue(current, 10),
      precipitation: Math.round(getVarValue(current, 11) * 10) / 10,
    },
    hourly: {
      time: Array.from({ length: hours + 1 }, (_, i) => new Date((start + i * hourlyInterval) * 1000)),
      temperature_2m: hourly?.variables(0)!.valuesArray(),
      weather_code: hourly?.variables(1)!.valuesArray(),
    },
    daily: {
      time: Array.from(
        { length: daily ? (Number(daily.timeEnd()) - Number(daily.time())) / dailyInterval : 0 },
        (_, i) => new Date((Number(daily?.time() ?? 0) + i * dailyInterval) * 1000)
      ),
      weather_code: daily?.variables(0)!.valuesArray(),
      temperature_2m_max: daily?.variables(1)!.valuesArray(),
      temperature_2m_min: daily?.variables(2)!.valuesArray(),
    },
    timezone,
  };

  // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
  console.log(
    `\nCurrent time: ${weatherData.current.time}\n`,
    `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
    `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
    `\nCurrent is_day: ${weatherData.current.is_day}`,
    `\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
    `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
    `\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`,
    `\nCurrent rain: ${weatherData.current.rain}`,
    `\nCurrent showers: ${weatherData.current.showers}`,
    `\nCurrent snowfall: ${weatherData.current.snowfall}`,
    `\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
    `\nCurrent weather_code: ${weatherData.current.weather_code}`,
    `\nCurrent precipitation: ${weatherData.current.precipitation}`
  );
  console.log('\nHourly data:\n', weatherData.hourly);
  console.log('\nDaily data:\n', weatherData.daily);

  return weatherData;
};
