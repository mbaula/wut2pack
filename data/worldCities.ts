interface CityData {
  name: string;
  population: number;  // in millions
  country: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export const WORLD_CITIES: CityData[] = [
  {
    name: "Tokyo",
    population: 37.4,
    country: "Japan",
    coordinates: { lat: 35.6762, lon: 139.6503 }
  },
  {
    name: "Delhi",
    population: 32.9,
    country: "India",
    coordinates: { lat: 28.6139, lon: 77.2090 }
  },
  {
    name: "Shanghai",
    population: 27.8,
    country: "China",
    coordinates: { lat: 31.2304, lon: 121.4737 }
  },
  {
    name: "São Paulo",
    population: 22.4,
    country: "Brazil",
    coordinates: { lat: -23.5505, lon: -46.6333 }
  },
  {
    name: "Mexico City",
    population: 22.1,
    country: "Mexico",
    coordinates: { lat: 19.4326, lon: -99.1332 }
  },
  {
    name: "Cairo",
    population: 21.8,
    country: "Egypt",
    coordinates: { lat: 30.0444, lon: 31.2357 }
  },
  {
    name: "Mumbai",
    population: 21.3,
    country: "India",
    coordinates: { lat: 19.0760, lon: 72.8777 }
  },
  {
    name: "Beijing",
    population: 20.9,
    country: "China",
    coordinates: { lat: 39.9042, lon: 116.4074 }
  },
  {
    name: "Dhaka",
    population: 21.7,
    country: "Bangladesh",
    coordinates: { lat: 23.8103, lon: 90.4125 }
  },
  {
    name: "Osaka",
    population: 19.1,
    country: "Japan",
    coordinates: { lat: 34.6937, lon: 135.5023 }
  },
  {
    name: "New York City",
    population: 18.8,
    country: "United States",
    coordinates: { lat: 40.7128, lon: -74.0060 }
  },
  {
    name: "Karachi",
    population: 16.8,
    country: "Pakistan",
    coordinates: { lat: 24.8607, lon: 67.0011 }
  },
  {
    name: "Buenos Aires",
    population: 15.4,
    country: "Argentina",
    coordinates: { lat: -34.6037, lon: -58.3816 }
  },
  {
    name: "Istanbul",
    population: 15.2,
    country: "Turkey",
    coordinates: { lat: 41.0082, lon: 28.9784 }
  },
  {
    name: "Kolkata",
    population: 14.9,
    country: "India",
    coordinates: { lat: 22.5726, lon: 88.3639 }
  },
  {
    name: "Manila",
    population: 14.4,
    country: "Philippines",
    coordinates: { lat: 14.5995, lon: 120.9842 }
  },
  {
    name: "Lagos",
    population: 14.4,
    country: "Nigeria",
    coordinates: { lat: 6.5244, lon: 3.3792 }
  },
  {
    name: "Rio de Janeiro",
    population: 13.6,
    country: "Brazil",
    coordinates: { lat: -22.9068, lon: -43.1729 }
  },
  {
    name: "Los Angeles",
    population: 12.5,
    country: "United States",
    coordinates: { lat: 34.0522, lon: -118.2437 }
  },
  {
    name: "Moscow",
    population: 12.5,
    country: "Russia",
    coordinates: { lat: 55.7558, lon: 37.6173 }
  },
  {
    name: "Paris",
    population: 11.1,
    country: "France",
    coordinates: { lat: 48.8566, lon: 2.3522 }
  },
  {
    name: "London",
    population: 9.4,
    country: "United Kingdom",
    coordinates: { lat: 51.5074, lon: -0.1278 }
  },
  {
    name: "Toronto",
    population: 6.3,
    country: "Canada",
    coordinates: { lat: 43.6532, lon: -79.3832 }
  },
  {
    name: "Singapore",
    population: 5.7,
    country: "Singapore",
    coordinates: { lat: 1.3521, lon: 103.8198 }
  },
  {
    name: "Sydney",
    population: 5.3,
    country: "Australia",
    coordinates: { lat: -33.8688, lon: 151.2093 }
  },
  // Add more cities as needed...
];

// Helper function to find a city by name
export const findCityByName = (name: string): CityData | undefined => {
  return WORLD_CITIES.find(city => 
    city.name.toLowerCase() === name.toLowerCase()
  );
};

// Helper function to get city population
export const getCityPopulation = (name: string): number => {
  const city = findCityByName(name);
  return city ? city.population : 0;
};
