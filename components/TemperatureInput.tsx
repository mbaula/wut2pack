'use client'

import { useState } from 'react';

interface TemperatureInputProps {
  startDate: Date;
  endDate: Date;
  onChange: (temps: { min: number; max: number }) => void;
}

export default function TemperatureInput({ startDate, endDate, onChange }: TemperatureInputProps) {
  const [minTemp, setMinTemp] = useState<number>(20);
  const [maxTemp, setMaxTemp] = useState<number>(25);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, maxTemp);
    setMinTemp(newMin);
    onChange({ min: newMin, max: maxTemp });
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, minTemp);
    setMaxTemp(newMax);
    onChange({ min: minTemp, max: newMax });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Please enter expected temperatures for {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          This will help us recommend appropriate clothing for your trip
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Minimum Temperature (°C)
          </label>
          <input
            type="number"
            value={minTemp}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Maximum Temperature (°C)
          </label>
          <input
            type="number"
            value={maxTemp}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full"
            style={{ 
              width: `${((maxTemp - minTemp) / 50) * 100}%`,
              marginLeft: `${(minTemp + 25) / 50 * 100}%`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>-25°C</span>
          <span>25°C</span>
        </div>
      </div>
    </div>
  );
}
