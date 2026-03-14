import { create } from 'zustand';
import {
  UNIT_SYSTEMS,
  API_VALUES,
  DISPLAY_LABELS,
  type UnitSystem,
  type WeatherUnitParams,
} from '../types/units.types';

interface UnitsState {
  currentSystem: UnitSystem;
  toggleSystem: () => void;
  setSystem: (system: UnitSystem) => void;
  getUnits: () => WeatherUnitParams;
  getDisplayUnits: () => Record<string, string>;
}

const useUnitsStore = create<UnitsState>((set, get) => ({
  currentSystem: UNIT_SYSTEMS.METRIC,
  toggleSystem: () =>
    set((state) => ({
      currentSystem: state.currentSystem === UNIT_SYSTEMS.METRIC ? UNIT_SYSTEMS.IMPERIAL : UNIT_SYSTEMS.METRIC,
    })),
  setSystem: (system) => set({ currentSystem: system }),
  getUnits: () => {
    const currentSystem = get().currentSystem;
    return {
      temperature_unit: API_VALUES.temp[currentSystem],
      wind_speed_unit: API_VALUES.wind[currentSystem],
      precipitation_unit: API_VALUES.precip[currentSystem],
    };
  },
  getDisplayUnits: () => {
    const currentSystem = get().currentSystem;
    return {
      temp: DISPLAY_LABELS.temp[currentSystem],
      wind: DISPLAY_LABELS.wind[currentSystem],
      precip: DISPLAY_LABELS.precip[currentSystem],
    };
  },
}));

export default useUnitsStore;
