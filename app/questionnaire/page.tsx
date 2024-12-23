'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import TemperatureInput from '@/components/TemperatureInput';
import Link from 'next/link';
import Image from 'next/image';
import { generatePackingList } from '@/utils/packingListGenerator';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';

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
  | 'temperature'
  | 'review';

export type Answers = {
  temperature: { min: number; max: number };
  activities: string[];
  swimming: boolean;
  specialEvents: string[];
  accommodation: string[];
  travelReason: string[];
  packingFor: string[];
  technology: string[];
  eyewear: string[];
  transportation: string[];
  amenities: string[];
  medical: string[];
  skincare: string[];
};

type Question = {
  title: string;
  options: string[];
  multiple: boolean;
  component?: React.ReactNode;
};

// Create a client component that uses useSearchParams
const SearchParamsComponent = () => {
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const [currentStep, setCurrentStep] = useState<QuestionStep>('accommodation')
  const [answers, setAnswers] = useState<Answers>({
    temperature: { min: 20, max: 25 },
    activities: [],
    swimming: false,
    specialEvents: [],
    accommodation: [],
    travelReason: [],
    packingFor: [],
    technology: [],
    eyewear: [],
    transportation: [],
    amenities: [],
    medical: [],
    skincare: []
  })
  const router = useRouter()
  const { setPackingList } = useTripStore()
  const tripDetails = useTripStore((state) => state.tripDetails)

  useEffect(() => {
    console.log('Current trip details:', tripDetails)
  }, [tripDetails])

  // Parse dates from URL parameters
  const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : null
  const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : null

  const questions: Record<QuestionStep, Question> = {
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
    },
    temperature: {
      title: 'What temperature range are you expecting?',
      options: [],
      multiple: false,
      component: (
        <div className="w-full">
          <TemperatureInput
            value={answers.temperature}
            onChange={(temp) => setAnswers(prev => ({ ...prev, temperature: temp }))}
          />
        </div>
      )
    },
    review: {
      title: 'Review Your Answers',
      options: [],
      multiple: false
    }
  }

  const handleAnswer = (questionKey: keyof Answers, value: string | boolean) => {
    setAnswers(prev => {
      if (typeof value === 'boolean') {
        return { ...prev, [questionKey]: value }
      }
      
      const currentAnswers = prev[questionKey] as string[]
      if (currentAnswers.includes(value as string)) {
        return {
          ...prev,
          [questionKey]: currentAnswers.filter(item => item !== value)
        }
      } else {
        if (!questions[questionKey].multiple) {
          return { ...prev, [questionKey]: [value as string] }
        }
        return {
          ...prev,
          [questionKey]: [...currentAnswers, value as string]
        }
      }
    })
  }

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
      'temperature',
      'review'
    ]

    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

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
      'temperature',
      'review'
    ]

    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleGenerateList = () => {
    if (!tripDetails) {
      console.error('No trip details found')
      router.push('/')
      return
    }

    const tripDuration = new Date(tripDetails.endDate).getTime() - new Date(tripDetails.startDate).getTime()
    const durationInDays = Math.ceil(tripDuration / (1000 * 60 * 60 * 24))

    const packingList = generatePackingList(
      answers,
      durationInDays,
      tripDetails.origin,
      tripDetails.destination
    )

    setPackingList(packingList)
    
    setTimeout(() => {
      router.push('/packing-list')
    }, 0)
  }

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
      'temperature',
      'review'
    ]

    const currentStepIndex = steps.indexOf(currentStep) + 1
    const totalSteps = steps.length

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
                {key === 'temperature' 
                  ? `Min: ${(value as { min: number; max: number }).min}°C, Max: ${(value as { min: number; max: number }).max}°C`
                  : key === 'swimming'
                  ? value ? 'Yes' : 'No'
                  : Array.isArray(value) 
                    ? value.join(', ') || 'None selected'
                    : value.toString()}
              </p>
            </div>
          ))}
          <button
            onClick={handleGenerateList}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Generate Packing List
          </button>
        </div>
      )
    }

    const question = questions[currentStep]
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
        {question.component ? (
          question.component
        ) : (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
              >
                <input
                  type={question.multiple ? "checkbox" : "radio"}
                  name={currentStep}
                  checked={
                    typeof answers[currentStep] === 'boolean'
                      ? answers[currentStep] === (option === 'Yes')
                      : (answers[currentStep] as string[]).includes(option)
                  }
                  onChange={() => {
                    if (currentStep === 'swimming') {
                      handleAnswer(currentStep, option === 'Yes')
                    } else {
                      handleAnswer(currentStep, option)
                    }
                  }}
                  className="form-checkbox h-5 w-5 text-blue-500 dark:bg-gray-700"
                />
                <span className="dark:text-white">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 z-10">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/wut2pack.svg"
            alt="wut2pack Logo"
            width={24}
            height={24}
            className="dark:invert"
          />
          <span className="font-medium dark:text-white">wut2pack</span>
        </Link>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
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
    </main>
  )
}

// Main page component
export default function QuestionnairePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent />
    </Suspense>
  )
}
