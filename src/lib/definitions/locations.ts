import type { LocationDetails } from '$lib/types/location-details';
import continentData from '$lib/definitions/data/continent-populations.json';
import countryData from '$lib/definitions/data/countries-table.json';
import cityData from '$lib/definitions/data/geonames-all-cities-with-a-population-50000.json';

function loadContinents() {
  let continents: Map<string, LocationDetails> = new Map();
  for (let continent of continentData) {
    let location: LocationDetails = {
      available: true,
      population: continent.population
    };
    continents.set(continent.continent.toLowerCase(), location);
  }
  return continents;
}

function loadCountries() {
  let countries: Map<string, LocationDetails> = new Map();
  for (let country of countryData) {
    let location: LocationDetails = {
      available: true,
      population: country.pop2023
    };
    countries.set(country.country.toLowerCase(), location);
  }
  return countries;
}

function loadCities() {
  let cities: Map<string, LocationDetails> = new Map();
  for (let city of cityData) {
    let location: LocationDetails = {
      available: true,
      population: city.population,
      country: city.country
    };
    cities.set(city.name.toLowerCase(), location);
  }
  return cities;
}

export let Continents: Map<string, LocationDetails> = loadContinents();
export let Countries: Map<string, LocationDetails> = loadCountries();
export let Cities: Map<string, LocationDetails> = loadCities();