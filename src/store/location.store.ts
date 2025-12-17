import { create } from 'zustand';
import type { Location } from '../types/location.types';

const KYIV_LOCATION: Location = {
  latitude: 50.4501,
  longitude: 30.5234,
};

const BERLIN_LOCATION: Location = {
  latitude: 52.5244,
  longitude: 13.4105,
};

const useLocationStore = create<{
  location: Location;
  setLocation: (l: Location) => void;
}>((set) => ({
  location: BERLIN_LOCATION,
  setLocation: (location) => set({ location }),
}));

export default useLocationStore;
