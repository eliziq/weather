import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../api/location-api';

export const useCitySearch = (query: string) => {
  return useQuery({
    queryKey: ['city-search', query],
    queryFn: () => searchCities(query),
    enabled: query.length >= 2, // Only run if user typed 2+ chars
    staleTime: 1000 * 60 * 60,   // Cache city results for an hour
  });
};