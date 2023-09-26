import json
import os

RAW_FILEPATHS = [os.path.abspath(os.path.join(os.path.dirname(__file__), "raw_data", filename)) for filename in 
                 ["continent-populations.json", "countries-table.json", "world-city-listing-table.json"]]
PARSED_FILEPATHS = [os.path.abspath(os.path.join(os.path.dirname(__file__), "parsed_data", filename)) for filename in 
                    ["continents.json", "countries.json", "cities.json"]]

def main():
  with open(RAW_FILEPATHS[0], "r") as f:
    data = json.load(f)
    continents = {}
    for continent in data:
      continents[continent["continent"]] = {"available": True, "population": continent["population"]}
    with open(PARSED_FILEPATHS[0], "w") as f:
      json.dump(continents, f, indent=2)

  with open(RAW_FILEPATHS[1], "r") as f:
    data = json.load(f)
    countries = {}
    for country in data:
      countries[country["country"]] = {"available": True, "population": country["pop2023"]}
    with open(PARSED_FILEPATHS[1], "w") as f:
      json.dump(countries, f, indent=2)

  with open(RAW_FILEPATHS[2], "r") as f:
    data = json.load(f)
    cities = {}
    for city in data:
      cities[city["city"]] = {"available": True, "population": city["pop2023"], "country": city["country"]}
    with open(PARSED_FILEPATHS[2], "w") as f:
      json.dump(cities, f, indent=2)


if __name__ == '__main__':
  main()