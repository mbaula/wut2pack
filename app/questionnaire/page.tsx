'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';

type QuestionStep = 
  | 'accommodation'
  | 'travelReason'
  | 'packingFor'
  | 'technology'
  | 'swimming'
  | 'activities'
  | 'eyewear'
  | 'transportation'
  | 'amenities'
  | 'specialEvents'
  | 'medical'
  | 'skincare'
  | 'review';

interface Answers {
  accommodation: string[];
  travelReason: string[];
  packingFor: string[];
  technology: string[];
  swimming: boolean;
  activities: string[];
  eyewear: string[];
  transportation: string[];
  amenities: string[];
  specialEvents: string[];
  medical: string[];
  skincare: string[];
}

export default function Questionnaire() {
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState<QuestionStep>('accommodation');
  const [answers, setAnswers] = useState<Answers>({
    accommodation: [],
    travelReason: [],
    packingFor: [],
    technology: [],
    swimming: false,
    activities: [],
    eyewear: [],
    transportation: [],
    amenities: [],
    specialEvents: [],
    medical: [],
    skincare: []
  });

  const questions = {
    accommodation: {
      title: 'Where will you be staying?',
      options: [
        'Hotel',
        'Hostel',
        'Airbnb/Vacation Rental',
        'Friend/Family',
        'Camping',
        'Resort',
        'Other'
      ],
      multiple: true
    },
    travelReason: {
      title: 'What\'s the main reason for your trip?',
      options: [
        'Vacation/Holiday',
        'Business',
        'Wedding',
        'Conference',
        'Family Visit',
        'Honeymoon',
        'Adventure',
        'Study',
        'Other'
      ],
      multiple: true
    },
    packingFor: {
      title: 'Who are you packing for?',
      options: [
        'Male Adult',
        'Female Adult',
        'Child',
        'Baby/Infant',
        'Senior',
        'Other'
      ],
      multiple: true
    },
    technology: {
      title: 'What technology will you need?',
      options: [
        'Laptop',
        'Tablet',
        'Camera',
        'Gaming Device',
        'Work Equipment',
        'None'
      ],
      multiple: true
    },
    swimming: {
      title: 'Will you be swimming or doing water activities?',
      options: ['Yes', 'No'],
      multiple: false
    },
    activities: {
      title: 'What activities are you planning?',
      options: [
        'Hiking',
        'Beach',
        'Sightseeing',
        'Shopping',
        'Sports',
        'Gym/Fitness',
        'Skiing/Winter Sports',
        'None'
      ],
      multiple: true
    },
    eyewear: {
      title: 'Do you need any eyewear?',
      options: [
        'Glasses',
        'Contact Lenses',
        'Sunglasses',
        'None'
      ],
      multiple: true
    },
    transportation: {
      title: 'How will you be traveling?',
      options: [
        'Plane',
        'Train',
        'Car',
        'Bus',
        'Cruise Ship',
        'Multiple Modes'
      ],
      multiple: true
    },
    amenities: {
      title: 'What amenities will be provided?',
      options: [
        'Towels',
        'Toiletries',
        'Hair Dryer',
        'Iron',
        'Laundry',
        'Kitchen',
        'Not Sure'
      ],
      multiple: true
    },
    specialEvents: {
      title: 'Any special events to pack for?',
      options: [
        'Formal Dinner',
        'Business Meeting',
        'Wedding',
        'Party',
        'Religious Service',
        'None'
      ],
      multiple: true
    },
    medical: {
      title: 'Any medical or health considerations?',
      options: [
        'Prescription Medications',
        'First Aid Kit',
        'Mobility Aids',
        'Special Diet',
        'Allergies',
        'None'
      ],
      multiple: true
    },
    skincare: {
      title: 'Skincare and weather protection needs?',
      options: [
        'Sunscreen',
        'Moisturizer',
        'Lip Balm',
        'Insect Repellent',
        'Cold Weather Protection',
        'None'
      ],
      multiple: true
    }
  };

  const handleAnswer = (questionKey: keyof Answers, value: string | boolean) => {
    setAnswers(prev => {
      if (typeof value === 'boolean') {
        return { ...prev, [questionKey]: value };
      }
      
      const currentAnswers = prev[questionKey] as string[];
      if (currentAnswers.includes(value as string)) {
        return {
          ...prev,
          [questionKey]: currentAnswers.filter(item => item !== value)
        };
      } else {
        if (!questions[questionKey].multiple) {
          return { ...prev, [questionKey]: [value as string] };
        }
        return {
          ...prev,
          [questionKey]: [...currentAnswers, value as string]
        };
      }
    });
  };

  const nextStep = () => {
    const steps: QuestionStep[] = [
      'accommodation',
      'travelReason',
      'packingFor',
      'technology',
      'swimming',
      'activities',
      'eyewear',
      'transportation',
      'amenities',
      'specialEvents',
      'medical',
      'skincare',
      'review'
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: QuestionStep[] = [
      'accommodation',
      'travelReason',
      'packingFor',
      'technology',
      'swimming',
      'activities',
      'eyewear',
      'transportation',
      'amenities',
      'specialEvents',
      'medical',
      'skincare',
      'review'
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderQuestion = () => {
    const steps: QuestionStep[] = [
      'accommodation',
      'travelReason',
      'packingFor',
      'technology',
      'swimming',
      'activities',
      'eyewear',
      'transportation',
      'amenities',
      'specialEvents',
      'medical',
      'skincare',
      'review'
    ];
    const currentStepIndex = steps.indexOf(currentStep) + 1;
    const totalSteps = steps.length;

    if (currentStep === 'review') {
      return (
        <div className="space-y-6">
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStepIndex / totalSteps) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Step {currentStepIndex} of {totalSteps}
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Review Your Answers</h2>
          {Object.entries(answers).map(([key, value]) => (
            <div key={key} className="border-b pb-4 dark:border-gray-700">
              <h3 className="font-medium mb-2 capitalize dark:text-white">{key}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {Array.isArray(value) ? value.join(', ') : value.toString()}
              </p>
            </div>
          ))}
          <button
            onClick={() => {
              // Handle submission
              console.log('Final answers:', answers);
            }}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Generate Packing List
          </button>
        </div>
      );
    }

    const question = questions[currentStep];
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStepIndex / totalSteps) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Step {currentStepIndex} of {totalSteps}
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">{question.title}</h2>
        <div className="space-y-3">
          {question.options.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              <input
                type={question.multiple ? "checkbox" : "radio"}
                checked={
                  typeof answers[currentStep] === 'boolean'
                    ? answers[currentStep] === (option === 'Yes')
                    : (answers[currentStep] as string[]).includes(option)
                }
                onChange={() => {
                  if (currentStep === 'swimming') {
                    handleAnswer(currentStep, option === 'Yes');
                  } else {
                    handleAnswer(currentStep, option);
                  }
                }}
                className="form-checkbox h-5 w-5 text-blue-500 dark:bg-gray-700"
              />
              <span className="dark:text-white">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed right-4 top-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      <div className="max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
          {renderQuestion()}
          
          <div className="flex justify-between pt-4 gap-4">
            <button
              onClick={prevStep}
              className={`px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 ${
                currentStep === 'accommodation' ? 'invisible' : ''
              }`}
            >
              ← Back
            </button>
            {currentStep !== 'review' && (
              <button
                onClick={nextStep}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
