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