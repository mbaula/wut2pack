'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';

export default function PackingListPage() {
  const router = useRouter();
  const { packingList, tripDetails } = useTripStore();

  useEffect(() => {
    if (!packingList || !tripDetails) {
      router.push('/');
    }
  }, [packingList, tripDetails, router]);

  if (!packingList || !tripDetails) return null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">
            {tripDetails.listName}
          </h1>
          {tripDetails.startDate && tripDetails.endDate && (
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              From: {new Date(tripDetails.startDate).toLocaleDateString()} 
              To: {new Date(tripDetails.endDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="grid gap-6">
          {Object.entries(packingList.categories).map(([category, items]) => (
            items.length > 0 && (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 capitalize dark:text-white">
                  {category}
                </h2>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                      <span>{item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}</span>
                      {item.essential && <span className="text-xs text-blue-500">*</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          * Essential items
        </p>
      </div>
    </main>
  );
} 