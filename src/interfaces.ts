export interface ICountryData {
  name: { official: string; common: string };
  population: string;
  region: string;
  capital: string;
  flags: { png: string; svg: string };
  nativeName: string;
  subRegion: string;
  currencies: Record<string, { name: string; symbol: string }>[];
  topLevelDomain: string[];
  languages: string[];
  borderCountries: string[];
}
