'use client'

import { useSavedListsStore, SavedList } from '@/store/savedListsStore';
import { useTripStore } from '@/store/tripStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function MyLists() {
  const { lists, deleteList } = useSavedListsStore();
  const { setTripDetails, setPackingList } = useTripStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleView = (list: SavedList) => {
    setTripDetails({
      origin: list.origin,
      destination: list.destination,
      startDate: list.startDate,
      endDate: list.endDate,
      listName: list.name,
    });
    setPackingList(list.items);
    router.push('/packing-list');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this list?')) {
      deleteList(id);
      toast.success('List deleted successfully');
    }
  };

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

      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold dark:text-white">My Packing Lists</h1>
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Create New List
            </Link>
          </div>
          
          {lists.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No saved lists yet.</p>
          ) : (
            <div className="grid gap-4">
              {lists.map((list) => (
                <div 
                  key={list.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{list.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {list.origin} → {list.destination}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(list.startDate).toLocaleDateString()} - {new Date(list.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(list)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      View & Edit
                    </button>
                    <button
                      onClick={() => handleDelete(list.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 