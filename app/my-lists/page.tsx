'use client'

import { useSavedListsStore, SavedList } from '@/store/savedListsStore';
import { useTripStore } from '@/store/tripStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShareButton } from '@/components/ShareButton';

export default function MyLists() {
  const [mounted, setMounted] = useState(false);
  const { lists, fetchLists, isLoading, error, deleteList } = useSavedListsStore();
  const { setTripDetails, setPackingList } = useTripStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchLists();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading lists: {error.message}</div>;

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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this list?')) {
      try {
        await deleteList(id);
        toast.success('List deleted successfully');
      } catch (error) {
        toast.error('Failed to delete list');
      }
    }
  };

  const ThemeToggle = () => {
    if (!mounted) return null;
    
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>
    );
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
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white">My Packing Lists</h1>
            <Link 
              href="/"
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center"
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
                  className="group bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{list.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {list.origin} → {list.destination}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {list.startDate && new Date(new Date(list.startDate).getTime() + 86400000).toLocaleDateString()} - {list.endDate && new Date(new Date(list.endDate).getTime() + 86400000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:opacity-0 group-hover:md:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleView(list)}
                        className="flex-1 md:flex-none px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm md:text-base"
                      >
                        View & Edit
                      </button>
                      <ShareButton 
                        shareId={list.shareId || crypto.randomUUID()}
                        listId={list.id}
                      />
                      <button
                        onClick={() => handleDelete(list.id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm md:text-base"
                      >
                        Delete
                      </button>
                    </div>
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