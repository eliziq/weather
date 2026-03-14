export const UNIT_SYSTEMS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
} as const;

export type UnitSystem = (typeof UNIT_SYSTEMS)[keyof typeof UNIT_SYSTEMS];

export const API_VALUES: Record<string, Record<UnitSystem, string>> = {
  temp: {
    [UNIT_SYSTEMS.METRIC]: 'celsius',
    [UNIT_SYSTEMS.IMPERIAL]: 'fahrenheit',
  },
  wind: {
    [UNIT_SYSTEMS.METRIC]: 'kmh',
    [UNIT_SYSTEMS.IMPERIAL]: 'mph',
  },
  precip: {
    [UNIT_SYSTEMS.METRIC]: 'mm',
    [UNIT_SYSTEMS.IMPERIAL]: 'inch',
  },
} as const;

export const DISPLAY_LABELS: Record<string, Record<UnitSystem, string>> = {
  temp: {
    [UNIT_SYSTEMS.METRIC]: '°C',
    [UNIT_SYSTEMS.IMPERIAL]: '°F',
  },
  wind: {
    [UNIT_SYSTEMS.METRIC]: 'km/h',
    [UNIT_SYSTEMS.IMPERIAL]: 'mph',
  },
  precip: {
    [UNIT_SYSTEMS.METRIC]: 'mm',
    [UNIT_SYSTEMS.IMPERIAL]: 'in',
  },
};

export interface WeatherUnitParams {
  temperature_unit: string;
  wind_speed_unit: string;
  precipitation_unit: string;
}
