export type Location = {
  latitude: number;
  longitude: number;
};

export type locationParsed = {
  city: string;
  country: string;
}

export interface CityResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}
