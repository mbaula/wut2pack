'use client'

import { useState } from 'react';

interface TemperatureInputProps {
  value: { min: number; max: number };
  onChange: (temps: { min: number; max: number }) => void;
  startDate?: Date;
  endDate?: Date;
}

const MIN_TEMP = -50;
const MAX_TEMP = 50;

export default function TemperatureInput({ value, onChange, startDate, endDate }: TemperatureInputProps) {
  const [minTemp, setMinTemp] = useState<number>(value.min);
  const [maxTemp, setMaxTemp] = useState<number>(value.max);
  const [minTempInput, setMinTempInput] = useState<string>(value.min.toString());
  const [maxTempInput, setMaxTempInput] = useState<string>(value.max.toString());

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMinTempInput(inputValue);
    
    // Only update if it's a valid number
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, MIN_TEMP), maxTemp - 1);
      setMinTemp(clampedValue);
      onChange({ min: clampedValue, max: maxTemp });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMaxTempInput(inputValue);
    
    // Only update if it's a valid number
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(Math.min(numValue, MAX_TEMP), minTemp + 1);
      setMaxTemp(clampedValue);
      onChange({ min: minTemp, max: clampedValue });
    }
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const tempRange = MAX_TEMP - MIN_TEMP;
    const tempValue = MIN_TEMP + (tempRange * percentage);
    
    // Determine if click is closer to min or max handle
    const distanceToMin = Math.abs(((minTemp - MIN_TEMP) / tempRange) * width - x);
    const distanceToMax = Math.abs(((maxTemp - MIN_TEMP) / tempRange) * width - x);
    
    if (distanceToMin < distanceToMax) {
      // Update min temperature
      const newMin = Math.min(Math.max(Math.round(tempValue), MIN_TEMP), maxTemp - 1);
      setMinTemp(newMin);
      setMinTempInput(newMin.toString());
      onChange({ min: newMin, max: maxTemp });
    } else {
      // Update max temperature
      const newMax = Math.max(Math.min(Math.round(tempValue), MAX_TEMP), minTemp + 1);
      setMaxTemp(newMax);
      setMaxTempInput(newMax.toString());
      onChange({ min: minTemp, max: newMax });
    }
  };

  const handleMinDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const slider = e.currentTarget.parentElement;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const width = rect.width;
    const tempRange = MAX_TEMP - MIN_TEMP;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = Math.max(0, Math.min(moveEvent.clientX - rect.left, width));
      const percentage = x / width;
      const newMin = Math.round(MIN_TEMP + (tempRange * percentage));
      const clampedMin = Math.min(Math.max(newMin, MIN_TEMP), maxTemp - 1);
      
      setMinTemp(clampedMin);
      setMinTempInput(clampedMin.toString());
      onChange({ min: clampedMin, max: maxTemp });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMaxDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const slider = e.currentTarget.parentElement;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const width = rect.width;
    const tempRange = MAX_TEMP - MIN_TEMP;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = Math.max(0, Math.min(moveEvent.clientX - rect.left, width));
      const percentage = x / width;
      const newMax = Math.round(MIN_TEMP + (tempRange * percentage));
      const clampedMax = Math.max(Math.min(newMax, MAX_TEMP), minTemp + 1);
      
      setMaxTemp(clampedMax);
      setMaxTempInput(clampedMax.toString());
      onChange({ min: minTemp, max: clampedMax });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Please enter expected temperatures{startDate && endDate ? ` for ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : ''}
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
            value={minTempInput}
            onChange={handleMinChange}
            onBlur={() => {
              const numValue = parseFloat(minTempInput);
              if (isNaN(numValue)) {
                setMinTempInput(minTemp.toString());
                return;
              }
              if (numValue < MIN_TEMP) {
                setMinTemp(MIN_TEMP);
                setMinTempInput(MIN_TEMP.toString());
              }
              if (numValue >= maxTemp) {
                setMinTemp(maxTemp - 1);
                setMinTempInput((maxTemp - 1).toString());
              }
              onChange({ min: minTemp, max: maxTemp });
            }}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
            Min: {MIN_TEMP}°C
          </span>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Maximum Temperature (°C)
          </label>
          <input
            type="number"
            value={maxTempInput}
            onChange={handleMaxChange}
            onBlur={() => {
              const numValue = parseFloat(maxTempInput);
              if (isNaN(numValue)) {
                setMaxTempInput(maxTemp.toString());
                return;
              }
              if (numValue > MAX_TEMP) {
                setMaxTemp(MAX_TEMP);
                setMaxTempInput(MAX_TEMP.toString());
              }
              if (numValue <= minTemp) {
                setMaxTemp(minTemp + 1);
                setMaxTempInput((minTemp + 1).toString());
              }
              onChange({ min: minTemp, max: maxTemp });
            }}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
            Max: {MAX_TEMP}°C
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div 
          className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer"
          onClick={handleSliderClick}
        >
          <div 
            className="h-full bg-blue-500 rounded-full"
            style={{ 
              width: `${((maxTemp - minTemp) / (MAX_TEMP - MIN_TEMP)) * 100}%`,
              marginLeft: `${((minTemp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100}%`
            }}
          />
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1.5 -ml-2 cursor-grab active:cursor-grabbing"
            style={{
              left: `${((minTemp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100}%`
            }}
            onMouseDown={handleMinDrag}
          />
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1.5 -ml-2 cursor-grab active:cursor-grabbing"
            style={{
              left: `${((maxTemp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100}%`
            }}
            onMouseDown={handleMaxDrag}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>{MIN_TEMP}°C</span>
          <span>{MAX_TEMP}°C</span>
        </div>
      </div>
    </div>
  );
}
