import os
import json
import csv

RAW_PATH = os.path.join(os.path.dirname(__file__), "data", "geonames-all-cities-with-a-population-500.csv")
JSON_PATH = os.path.join(os.path.dirname(__file__), "data", "geonames-all-cities-with-a-population-50000.json")

def main():
  with open(RAW_PATH, 'r') as f:
    reader = csv.reader(f, delimiter=';')
    next(reader)
    data = []
    for row in reader:
      if (int(row[14]) < 50000):
        continue
      data.append({
        "name": row[1],
        "population": int(row[14]),
        "country": row[19]
      })
    with open(JSON_PATH, 'w') as f:
      json.dump(data, f)

if __name__ == "__main__":
  main()