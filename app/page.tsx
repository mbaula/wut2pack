'use client'

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
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
        <nav className="flex items-center gap-6">
          <a href="#" className="hover:opacity-80 dark:text-white">Create</a>
          <a href="#" className="hover:opacity-80 dark:text-white">My Lists</a>
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-xl"
            aria-label="Toggle theme"
          >
            <span className="block w-6 h-6 text-center">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
          </button>
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-xl"
            aria-label="User profile"
          >
            <span className="block w-6 h-6 text-center">
              👤
            </span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        {/* Hero Section */}
        <div className="w-full max-w-4xl aspect-[16/9] relative rounded-2xl overflow-hidden mb-8">
          <Image
            src="/bg-pattern.svg"
            alt="Background pattern"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/10">
            <h1 className="text-5xl font-bold mb-4">Pack your bags</h1>
            <p className="text-lg max-w-2xl text-center">
              Generate a packing list in seconds. Say goodbye to overpacking and last-minute trips to the store.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-left mb-2 dark:text-white">Origin</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 [transition:background-color_0.2s_ease-in-out,color_0.1s_ease-in-out]"
                />
              </div>
              <div>
                <label className="block text-sm text-left mb-2 dark:text-white">Destination</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 [transition:background-color_0.2s_ease-in-out,color_0.1s_ease-in-out]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-left mb-2 dark:text-white">Trip dates</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    placeholder="Start date"
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 [transition:background-color_0.2s_ease-in-out,color_0.1s_ease-in-out]"
                  />
                  <input
                    type="date"
                    placeholder="End date"
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 [transition:background-color_0.2s_ease-in-out,color_0.1s_ease-in-out]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-left mb-2 dark:text-white">List name</label>
                <input
                  type="text"
                  placeholder="e.g., Summer vacation"
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 [transition:background-color_0.2s_ease-in-out,color_0.1s_ease-in-out]"
                />
              </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              Start Packing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
