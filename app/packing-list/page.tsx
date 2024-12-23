'use client'

import { useSearchParams } from 'next/navigation';
import { PackingList, CategoryType } from '@/types/packingList';

const categoryDisplayNames: Record<CategoryType, string> = {
  documents: 'Documents',
  clothing: 'Clothing',
  accessories: 'Accessories',
  toiletries: 'Toiletries',
  electronics: 'Electronics',
  medical: 'Medical',
  activities: 'Activities',
  essentials: 'Essentials',
  misc: 'Miscellaneous'
};

export default function PackingListPage() {
  const searchParams = useSearchParams();
  const packingListData = searchParams.get('data');
  const packingList: PackingList = packingListData ? JSON.parse(packingListData) : { categories: {} };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Packing List</h1>
      
      <div className="grid gap-6">
        {Object.entries(categoryDisplayNames).map(([category, displayName]) => {
          const items = packingList.categories[category as CategoryType];
          if (!items?.length) return null;

          return (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">{displayName}</h2>
              <ul className="space-y-2">
                {items.map(item => (
                  <li 
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={item.id}
                        className="h-5 w-5 rounded border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor={item.id} className="text-gray-800 dark:text-gray-200">
                        {item.name}
                        {item.essential && (
                          <span className="ml-2 text-xs text-red-500">*</span>
                        )}
                      </label>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        * Essential items
      </p>
    </main>
  );
} 