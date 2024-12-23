'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryType, PackingItem } from '@/types/packingList';

interface EditingItem {
  id: string;
  name: string;
  quantity: number;
}

export default function PackingListPage() {
  const router = useRouter();
  const { packingList, tripDetails, setPackingList } = useTripStore();
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const { theme, setTheme } = useTheme();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    category: 'misc' as CategoryType
  });

  useEffect(() => {
    if (!packingList || !tripDetails) {
      router.push('/');
    }
  }, [packingList, tripDetails, router]);

  if (!packingList || !tripDetails) return null;

  const handleEdit = (item: PackingItem) => {
    setEditingItem({
      id: item.id,
      name: item.name,
      quantity: item.quantity
    });
  };

  const handleSave = () => {
    if (!editingItem) return;

    const updatedPackingList = {
      ...packingList,
      categories: {
        ...packingList.categories,
        ...Object.fromEntries(
          Object.entries(packingList.categories).map(([category, items]) => [
            category,
            items.map(item => 
              item.id === editingItem.id 
                ? { ...item, name: editingItem.name, quantity: editingItem.quantity }
                : item
            )
          ])
        )
      }
    };

    setPackingList(updatedPackingList);
    setEditingItem(null);
  };

  const handleDelete = (itemToDelete: PackingItem) => {
    const updatedPackingList = {
      ...packingList,
      categories: {
        ...packingList.categories,
        ...Object.fromEntries(
          Object.entries(packingList.categories).map(([category, items]) => [
            category,
            items.filter(item => item.id !== itemToDelete.id)
          ])
        )
      }
    };

    setPackingList(updatedPackingList);
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;

    const updatedPackingList = {
      ...packingList,
      categories: {
        ...packingList.categories,
        [newItem.category]: [
          ...packingList.categories[newItem.category],
          {
            id: `custom-${Date.now()}`,
            name: newItem.name.trim(),
            quantity: newItem.quantity,
            category: newItem.category,
            essential: false
          }
        ]
      }
    };

    setPackingList(updatedPackingList);
    setIsAddingItem(false);
    setNewItem({ name: '', quantity: 1, category: 'misc' });
  };

  const nonEmptyCategories = Object.entries(packingList.categories)
    .filter(([_, items]) => items.length > 0);

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

        <button
          onClick={() => setIsAddingItem(true)}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Item
        </button>

        {isAddingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Add New Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 dark:text-gray-300">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 dark:text-gray-300">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as CategoryType })}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {Object.keys(packingList.categories).map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setIsAddingItem(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nonEmptyCategories.map(([category, items]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 capitalize dark:text-white">
                {category}
              </h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li 
                    key={item.id} 
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 group p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {editingItem?.id === item.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="number"
                          min="1"
                          value={editingItem.quantity}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            quantity: parseInt(e.target.value) || 1
                          })}
                          className="w-16 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            name: e.target.value
                          })}
                          className="flex-1 p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                          onClick={handleSave}
                          className="p-1 text-green-500 hover:text-green-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                        <span className="flex-1">
                          {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}
                          {item.essential && <span className="text-xs text-blue-500 ml-1">*</span>}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1 text-blue-500 hover:text-blue-600"
                            aria-label="Edit item"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-1 text-red-500 hover:text-red-600"
                            aria-label="Delete item"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          * Essential items
        </p>
      </div>
    </main>
  );
} 