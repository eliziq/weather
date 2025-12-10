import foggy from '../assets/images/weather/icon-fog.webp';
import cloudy from '../assets/images/weather/icon-overcast.webp';
import partiallyCloudy from '../assets/images/weather/icon-partly-cloudy.webp';
import rainy from '../assets/images/weather/icon-rain.webp';
import snowy from '../assets/images/weather/icon-snow.webp';
import storm from '../assets/images/weather/icon-storm.webp';
import sunny from '../assets/images/weather/icon-sunny.webp';

type WeatherIconMap = {
  [key: string]: string;
};

const weatherIconMap: WeatherIconMap = {
  '0': sunny,
  '1': sunny,
  '2': partiallyCloudy,
  '3': cloudy,
  '45': foggy,
  '48': foggy,
  '51': foggy,
  '53': foggy,
  '55': foggy,
  '56': foggy,
  '57': foggy,
  '61': rainy,
  '63': rainy,
  '65': rainy,
  '66': rainy,
  '67': rainy,
  '71': snowy,
  '73': snowy,
  '75': snowy,
  '77': snowy,
  '80': rainy,
  '81': rainy,
  '82': rainy,
  '85': snowy,
  '86': snowy,
  '95': storm,
  '96': storm,
  '99': storm,
};

export const getWeatherIcon = (weatherCode: number) => {
  return weatherIconMap[weatherCode.toString()] || sunny;
};
