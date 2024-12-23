'use client'

import { useEffect, useState } from 'react';
import TemperatureInput from './TemperatureInput';

interface WeatherSectionProps {
  location: {
    name: string;
    state?: string;
    country: string;
    lat: number;
    lon: number;
  };
  startDate: Date;
  endDate: Date;
  onWeatherData: (data: WeatherData) => void;
}

interface WeatherData {
  forecast?: {
    date: Date;
    temp: { min: number; max: number };
    description: string;
  }[];
  userInput?: {
    temp: { min: number; max: number };
  };
}

export default function WeatherSection({ location, startDate, endDate, onWeatherData }: WeatherSectionProps) {
  const [forecast, setForecast] = useState<WeatherData['forecast']>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchForecast = async () => {
      if (!location) return;

      setLoading(true);
      setError(undefined);

      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
        if (!apiKey) {
          throw new Error('API key not configured');
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch forecast');
        }

        const data = await response.json();
        
        // Process and filter forecast data for the next 5 days
        const processedForecast = data.list
          .filter((item: any) => {
            const date = new Date(item.dt * 1000);
            return date >= startDate && date <= new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000);
          })
          .reduce((acc: any[], item: any) => {
            const date = new Date(item.dt * 1000).toDateString();
            const existing = acc.find(x => new Date(x.date).toDateString() === date);
            
            if (existing) {
              existing.temp.min = Math.min(existing.temp.min, item.main.temp_min);
              existing.temp.max = Math.max(existing.temp.max, item.main.temp_max);
            } else {
              acc.push({
                date: new Date(item.dt * 1000),
                temp: {
                  min: item.main.temp_min,
                  max: item.main.temp_max
                },
                description: item.weather[0].description
              });
            }
            
            return acc;
          }, []);

        setForecast(processedForecast);
        onWeatherData({ forecast: processedForecast });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [location, startDate, onWeatherData]);

  const handleUserTemperatureInput = (temps: { min: number; max: number }) => {
    onWeatherData({
      forecast,
      userInput: {
        temp: temps
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        Error loading weather data: {error}
      </div>
    );
  }

  const needsUserInput = new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) < endDate;

  return (
    <div className="space-y-4">
      {forecast && forecast.length > 0 && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-3 dark:text-white">5-Day Forecast</h3>
          <div className="space-y-2">
            {forecast.map((day) => (
              <div key={day.date.toISOString()} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  {day.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <span className="text-gray-800 dark:text-gray-200">
                  {Math.round(day.temp.min)}°C - {Math.round(day.temp.max)}°C
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {needsUserInput && (
        <div>
          <h3 className="text-lg font-medium mb-3 dark:text-white">Extended Stay Temperature</h3>
          <TemperatureInput
            startDate={new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000)}
            endDate={endDate}
            onChange={handleUserTemperatureInput}
          />
        </div>
      )}
    </div>
  );
}
