import type { LocationDetails } from '$lib/types/location-details';
import continentData from '$lib/definitions/data/continent-populations.json';
import countryData from '$lib/definitions/data/countries-table.json';
import cityData from '$lib/definitions/data/world-city-listing-table.json';
import usCityData from '$lib/definitions/data/us-cities-table.json';

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
      population: city.pop2023,
      country: city.country
    };
    cities.set(city.city.toLowerCase(), location);
  }
  for (let city of usCityData) {
    let location: LocationDetails = {
      available: true,
      population: city.pop2023,
      country: "United States"
    };
    cities.set(city.name.toLowerCase(), location);
  }
  return cities;
}

export let Continents: Map<string, LocationDetails> = loadContinents();
export let Countries: Map<string, LocationDetails> = loadCountries();
export let Cities: Map<string, LocationDetails> = loadCities();