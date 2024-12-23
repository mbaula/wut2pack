'use client'

import { useState, useEffect } from 'react';

interface Location {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

interface CityInputProps {
  label: string;
  value: string;
  onChange: (value: string, location: Location | null) => void;
}

export default function CityInput({ label, value, onChange }: CityInputProps) {
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        
        const data: Location[] = await response.json();
        
        // Filter out duplicates based on name, state, and country
        const uniqueResults = data.reduce((acc: Location[], current) => {
          const isDuplicate = acc.some(item => 
            item.name === current.name && 
            item.state === current.state && 
            item.country === current.country
          );
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);
        
        // Sort results based on search relevance
        const sortedResults = uniqueResults
          .sort((a, b) => {
            const aRelevance = calculateRelevance(a.name, value);
            const bRelevance = calculateRelevance(b.name, value);
            return bRelevance - aRelevance;
          })
          .map(({ name, state, country, lat, lon }) => ({
            name,
            state,
            country,
            lat,
            lon
          }));

        setSuggestions(sortedResults);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  // Calculate relevance score based on how well the city name matches the search
  const calculateRelevance = (cityName: string, search: string): number => {
    const normalizedCity = cityName.toLowerCase();
    const normalizedSearch = search.toLowerCase();
    
    // Exact match gets highest score
    if (normalizedCity === normalizedSearch) return 1;
    
    // Starts with search term gets high score
    if (normalizedCity.startsWith(normalizedSearch)) return 0.8;
    
    // Contains search term gets medium score
    if (normalizedCity.includes(normalizedSearch)) return 0.5;
    
    // Otherwise, low relevance
    return 0;
  };

  return (
    <div className="relative">
      <label className="block text-sm text-left mb-2 dark:text-white">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value, null);
        }}
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 [transition:background-color_0.2s_ease-in-out,color_0.1s_ease-in-out]"
        placeholder="Enter a city"
      />
      {isLoading && (
        <div className="absolute right-2 top-9">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.name}-${suggestion.state || ''}-${suggestion.country}-${index}`}
              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
                index < suggestions.length - 1 ? 'border-b dark:border-gray-600' : ''
              }`}
              onClick={() => {
                onChange(suggestion.name, suggestion);
                setSuggestions([]);
              }}
            >
              <div className="text-sm dark:text-white">
                {suggestion.name}
                {suggestion.state && `, ${suggestion.state}`}
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  ({suggestion.country})
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
