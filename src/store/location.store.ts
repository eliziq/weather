import { create } from 'zustand';
import type { Location, locationParsed } from '../types/location.types';
import { getCityFromCoords } from '../api/location-api';

const BERLIN_LOCATION: Location = {
  latitude: 52.5244,
  longitude: 13.4105,
};

const BERLIN_PARSED: locationParsed = { city: 'Berlin', country: 'Germany' };

interface LocationState {
  location: Location;
  locationParsed: locationParsed;
  locationString: string;
  setLocation: (l: Location) => void;
  setFullLocation: (l: Location) => void;
  setParsedLocation: (l: locationParsed) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  location: BERLIN_LOCATION,
  locationParsed: BERLIN_PARSED,
  locationString: 'Berlin, Germany',

  setLocation: (location) => {
    set({ location });
  },

  setFullLocation: (location) => {
    set({ location });
    getCityFromCoords(location.latitude, location.longitude).then(({ city, country }) => {
      set({ locationParsed: { city, country } });
      set({ locationString: `${city}, ${country}` });
    });
  },
  setParsedLocation: (location: locationParsed) => {
    set({ locationParsed: location });
    set({ locationString: `${location.city}, ${location.country}` });
  },
}));

export default useLocationStore;
