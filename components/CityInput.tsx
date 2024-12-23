'use client'

import { useState, useEffect } from 'react';

interface Location {
  name: string;
  state?: string;
  country: string;
}

interface CityInputProps {
  label: string;
  value: string;
  onChange: (value: string, location: Location | null) => void;
}

export default function CityInput({ label, value, onChange }: CityInputProps) {
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!isFocused || !inputValue || inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        
        const data: Location[] = await response.json();
        
        // Remove duplicates based on name, state, and country
        const uniqueLocations = data.reduce((acc: Location[], curr) => {
          const isDuplicate = acc.some(item => 
            item.name === curr.name && 
            item.state === curr.state && 
            item.country === curr.country
          );
          if (!isDuplicate) {
            acc.push(curr);
          }
          return acc;
        }, []);

        setSuggestions(uniqueLocations);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue, isFocused]);

  return (
    <div className="relative">
      <label className="block text-sm text-left mb-2 dark:text-white">
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value, null);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // Delay hiding suggestions to allow click to register
          setTimeout(() => setIsFocused(false), 200);
        }}
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        placeholder="Enter a city"
      />
      {suggestions.length > 0 && isFocused && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.name}-${suggestion.state || ''}-${suggestion.country}-${index}`}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                const formattedValue = `${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ''}, ${suggestion.country}`;
                setInputValue(formattedValue);
                setIsFocused(false);
                setSuggestions([]);
                onChange(formattedValue, suggestion);
              }}
            >
              <div className="text-sm dark:text-white">
                {suggestion.name}
                {suggestion.state && (
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    {suggestion.state},
                  </span>
                )}
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  {suggestion.country}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
