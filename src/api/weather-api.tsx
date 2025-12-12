import { fetchWeatherApi } from 'openmeteo';

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

export const getWeatherData = async () => {
  const responses = await fetchWeatherApi(url, params);
  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone()?.replace('Kiev', 'Kyiv');
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
  );

  // Attributes for timezone and location

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const start = Number(hourly.time());
  const end = Number(hourly.timeEnd());
  const interval = hourly.interval();

  const hours = Math.round((end - start) / interval);

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: Math.round(current.variables(0)!.value()),
      relative_humidity_2m: Math.round(current.variables(1)!.value()),
      is_day: current.variables(2)!.value(),
      apparent_temperature: Math.round(current.variables(3)!.value()),
      wind_speed_10m: Math.round(current.variables(4)!.value()),
      wind_direction_10m: current.variables(5)!.value(),
      rain: current.variables(6)!.value(),
      showers: current.variables(7)!.value(),
      snowfall: current.variables(8)!.value(),
      cloud_cover: current.variables(9)!.value(),
      weather_code: current.variables(10)!.value(),
      precipitation: Math.round(current.variables(11)!.value() * 10) / 10,
    },
    hourly: {
      time: Array.from({ length: hours + 1 }, (_, i) => new Date((start + i * interval + utcOffsetSeconds) * 1000)),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
    },
    daily: {
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      weather_code: daily.variables(0)!.valuesArray(),
      temperature_2m_max: daily.variables(1)!.valuesArray(),
      temperature_2m_min: daily.variables(2)!.valuesArray(),
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
