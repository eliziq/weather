import { type CityResult } from '../types/location.types';

export const searchCities = async (query: string): Promise<CityResult[]> => {
  if (query.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`; //todo: check languages

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.results || [];
};

export const getCityFromCoords = async (lat: number, lon: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.address) return { city: 'Unknown', country: 'Unknown' };

  const location = {
    city: data.address.city || data.address.town || data.address.village || 'Unknown',
    country: data.address.country || 'Unknown',
  };

  return location;
};
