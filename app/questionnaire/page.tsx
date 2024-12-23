'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import WeatherSection from '@/components/WeatherSection';

interface FormData {
  accommodation: string;
  customAccommodation?: string;
  travelReason: string;
  customTravelReason?: string;
  packFor: string[];
  technology: string[];
  customTechnology?: string;
  swimming: boolean;
  activities: string[];
  customActivities?: string;
  eyewear: string;
  transportation: string;
  luggageType?: string;
  hasLaundry: boolean;
  hasHairDryer: boolean;
  formalEvents: boolean;
  religiousSites: boolean;
  medicalConditions: string;
  dietaryRequirements: string;
  skincare: string[];
}

export default function Questionnaire() {
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    accommodation: '',
    travelReason: '',
    packFor: [],
    technology: [],
    swimming: false,
    activities: [],
    eyewear: '',
    transportation: '',
    hasLaundry: false,
    hasHairDryer: false,
    formalEvents: false,
    religiousSites: false,
    medicalConditions: '',
    dietaryRequirements: '',
    skincare: [],
  });

  const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : null;
  const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : null;
  const tripDuration = startDate && endDate 
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image 
            src="/wut2pack.svg"
            alt="wut2pack Logo"
            width={24}
            height={24}
            className="dark:invert"
          />
          <span className="font-medium dark:text-white">wut2pack</span>
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-xl"
          aria-label="Toggle theme"
        >
          <span className="block w-6 h-6 text-center">
            {theme === 'dark' ? '☀️' : '🌙'}
          </span>
        </button>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 14) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Step {currentStep} of 14
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Where are you staying?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Hotel', 'Hostel', 'Airbnb', 'Camping', 'Other'].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFormData('accommodation', option)}
                    className={`p-4 rounded-lg border ${
                      formData.accommodation === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.accommodation === 'Other' && (
                <input
                  type="text"
                  placeholder="Please specify"
                  className="w-full p-2 border rounded-md mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.customAccommodation || ''}
                  onChange={(e) => updateFormData('customAccommodation', e.target.value)}
                />
              )}
            </div>
          )}

          {currentStep === 2 && tripDuration > 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Weather Information</h2>
              {searchParams.get('destLat') && searchParams.get('destLon') && startDate && endDate && (
                <WeatherSection
                  location={{
                    name: searchParams.get('destination') || '',
                    country: '',
                    lat: parseFloat(searchParams.get('destLat')!),
                    lon: parseFloat(searchParams.get('destLon')!),
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  onWeatherData={() => {}}
                />
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">What's the reason for your trip?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Holiday', 'Honeymoon', 'Backpacking', 'Adventure', 'Concert', 'Business', 'Other'].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFormData('travelReason', option)}
                    className={`p-4 rounded-lg border ${
                      formData.travelReason === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.travelReason === 'Other' && (
                <input
                  type="text"
                  placeholder="Please specify"
                  className="w-full p-2 border rounded-md mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.customTravelReason || ''}
                  onChange={(e) => updateFormData('customTravelReason', e.target.value)}
                />
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Who are you packing for?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Male', 'Female', 'Other', 'Baby'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      const newPackFor = formData.packFor.includes(option)
                        ? formData.packFor.filter(item => item !== option)
                        : [...formData.packFor, option];
                      updateFormData('packFor', newPackFor);
                    }}
                    className={`p-4 rounded-lg border ${
                      formData.packFor.includes(option)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">What technology are you bringing?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Laptop', 'Tablet', 'Camera', 'E-reader', 'Smart watch', 'None', 'Other'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (option === 'None') {
                        updateFormData('technology', []);
                      } else {
                        const newTech = formData.technology.includes(option)
                          ? formData.technology.filter(item => item !== option)
                          : [...formData.technology, option];
                        updateFormData('technology', newTech);
                      }
                    }}
                    className={`p-4 rounded-lg border ${
                      formData.technology.includes(option)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.technology.includes('Other') && (
                <input
                  type="text"
                  placeholder="Please specify"
                  className="w-full p-2 border rounded-md mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.customTechnology || ''}
                  onChange={(e) => updateFormData('customTechnology', e.target.value)}
                />
              )}
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Will you be swimming?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFormData('swimming', option === 'Yes')}
                    className={`p-4 rounded-lg border ${
                      (option === 'Yes' ? formData.swimming : !formData.swimming)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Any sports or outdoor activities planned?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Hiking', 'Running', 'Gym', 'Cycling', 'Skiing', 'None', 'Other'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (option === 'None') {
                        updateFormData('activities', []);
                      } else {
                        const newActivities = formData.activities.includes(option)
                          ? formData.activities.filter(item => item !== option)
                          : [...formData.activities, option];
                        updateFormData('activities', newActivities);
                      }
                    }}
                    className={`p-4 rounded-lg border ${
                      formData.activities.includes(option)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.activities.includes('Other') && (
                <input
                  type="text"
                  placeholder="Please specify"
                  className="w-full p-2 border rounded-md mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.customActivities || ''}
                  onChange={(e) => updateFormData('customActivities', e.target.value)}
                />
              )}
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Do you wear glasses or contacts?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Glasses', 'Contacts', 'Both', 'Neither'].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFormData('eyewear', option)}
                    className={`p-4 rounded-lg border ${
                      formData.eyewear === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 9 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">How are you traveling?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Flying', 'Driving', 'Train', 'Bus'].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFormData('transportation', option)}
                    className={`p-4 rounded-lg border ${
                      formData.transportation === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.transportation === 'Flying' && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2 dark:text-white">Luggage type:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Carry-on only', 'Checking bags'].map((option) => (
                      <button
                        key={option}
                        onClick={() => updateFormData('luggageType', option)}
                        className={`p-4 rounded-lg border ${
                          formData.luggageType === option
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                            : 'border-gray-200 dark:border-gray-700'
                        } hover:border-blue-500 transition-colors dark:text-white`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 10 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Accommodation Amenities</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="laundry"
                    checked={formData.hasLaundry}
                    onChange={(e) => updateFormData('hasLaundry', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="laundry" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Access to laundry facilities
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hairdryer"
                    checked={formData.hasHairDryer}
                    onChange={(e) => updateFormData('hasHairDryer', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="hairdryer" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Hair dryer provided
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 11 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Special Events</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="formal"
                    checked={formData.formalEvents}
                    onChange={(e) => updateFormData('formalEvents', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="formal" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Attending formal events (weddings, business meetings, fancy dinners)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="religious"
                    checked={formData.religiousSites}
                    onChange={(e) => updateFormData('religiousSites', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="religious" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Visiting religious sites (may require modest dress)
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 12 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Medical & Dietary Requirements</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Any medical conditions requiring special items?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., diabetes supplies, allergy medication"
                    value={formData.medicalConditions}
                    onChange={(e) => updateFormData('medicalConditions', e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Any dietary requirements?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., gluten-free, vegan"
                    value={formData.dietaryRequirements}
                    onChange={(e) => updateFormData('dietaryRequirements', e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 13 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Skincare Needs</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Sensitive skin',
                  'Acne-prone',
                  'Dry skin',
                  'Oily skin',
                  'Combination skin',
                  'None'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (option === 'None') {
                        updateFormData('skincare', []);
                      } else {
                        const newSkincare = formData.skincare.includes(option)
                          ? formData.skincare.filter(item => item !== option)
                          : [...formData.skincare, option];
                        updateFormData('skincare', newSkincare);
                      }
                    }}
                    className={`p-4 rounded-lg border ${
                      formData.skincare.includes(option)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    } hover:border-blue-500 transition-colors dark:text-white`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 14 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Review Your Answers</h2>
              <div className="space-y-4 text-sm dark:text-gray-300">
                <p><strong>Accommodation:</strong> {formData.accommodation}</p>
                <p><strong>Travel Reason:</strong> {formData.travelReason}</p>
                <p><strong>Packing For:</strong> {formData.packFor.join(', ')}</p>
                <p><strong>Technology:</strong> {formData.technology.join(', ')}</p>
                <p><strong>Swimming:</strong> {formData.swimming ? 'Yes' : 'No'}</p>
                <p><strong>Activities:</strong> {formData.activities.join(', ')}</p>
                <p><strong>Eyewear:</strong> {formData.eyewear}</p>
                <p><strong>Transportation:</strong> {formData.transportation}</p>
                {formData.transportation === 'Flying' && (
                  <p><strong>Luggage Type:</strong> {formData.luggageType}</p>
                )}
                <p><strong>Amenities:</strong> {[
                  formData.hasLaundry && 'Laundry',
                  formData.hasHairDryer && 'Hair Dryer'
                ].filter(Boolean).join(', ')}</p>
                <p><strong>Special Events:</strong> {[
                  formData.formalEvents && 'Formal Events',
                  formData.religiousSites && 'Religious Sites'
                ].filter(Boolean).join(', ')}</p>
                {formData.medicalConditions && (
                  <p><strong>Medical Conditions:</strong> {formData.medicalConditions}</p>
                )}
                {formData.dietaryRequirements && (
                  <p><strong>Dietary Requirements:</strong> {formData.dietaryRequirements}</p>
                )}
                <p><strong>Skincare Needs:</strong> {formData.skincare.join(', ')}</p>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Back
              </button>
            )}
            <button
              onClick={currentStep === 14 ? handleSubmit : handleNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
            >
              {currentStep === 14 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
