// https://github.com/jan-rus/country-in-text-detector/
declare module 'country-in-text-detector' {
  type CountryResult = {
    iso3166: string;
    name: string;
    type: 'country';
    matches: string[];
  };

  type CityResult = {
    iso3166: string;
    name: string;
    countryName: string;
    type: 'city';
    matches: string[];
  };

  export function detect(text: string): Array<CountryResult | CityResult>;
}
