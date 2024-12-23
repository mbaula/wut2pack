'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryType, PackingItem } from '@/types/packingList';
import { useSavedListsStore } from '@/store/savedListsStore';
import { toast } from 'react-hot-toast';
import { ShareButton } from '@/components/ShareButton';
import { supabase } from '@/lib/supabase';

interface EditingItem {
  id: string;
  name: string;
  quantity: number;
}

interface PageProps {
  params: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface PackingListPageProps extends PageProps {
  isShared?: boolean;
  shareId?: string;
}

export default function PackingListPage({ 
  params,
  searchParams,
  isShared = false, 
  shareId 
}: PackingListPageProps) {
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
  const { addList, lists, updateList, getListByShareId } = useSavedListsStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [listName, setListName] = useState(tripDetails?.listName || '');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isShared && (!packingList || !tripDetails)) {
      router.push('/');
    }
  }, [packingList, tripDetails, router, isShared]);

  useEffect(() => {
    if (!shareId) return;
    
    const channel = supabase
      .channel(`list_${shareId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'lists',
        filter: `share_id=eq.${shareId}`,
      }, async (payload) => {
        const updatedList = await getListByShareId(shareId);
        if (updatedList) {
          setPackingList(updatedList.items);
          setListName(updatedList.name);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [shareId, getListByShareId, setPackingList]);

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
          ...(packingList.categories[newItem.category] || []),
          {
            id: crypto.randomUUID(),
            name: newItem.name,
            quantity: newItem.quantity,
            category: newItem.category,
            essential: true
          }
        ]
      }
    };

    setPackingList(updatedPackingList);
    setNewItem({
      name: '',
      quantity: 1,
      category: 'misc' as CategoryType
    });
    setIsAddingItem(false);
    toast.success('Item added successfully');
  };

  const handleAddNonEssential = (itemToAdd: PackingItem) => {
    const updatedPackingList = {
      ...packingList,
      categories: {
        ...packingList.categories,
        [itemToAdd.category]: [
          ...packingList.categories[itemToAdd.category].filter(item => 
            !(item.id === itemToAdd.id && !item.essential)
          ),
          {
            ...itemToAdd,
            id: `${itemToAdd.id}-added-${Date.now()}`,
            essential: true
          }
        ]
      }
    };

    setPackingList(updatedPackingList);
  };

  const essentialItems = Object.entries(packingList.categories).reduce((acc, [category, items]) => {
    const essentials = items.filter(item => item.essential);
    if (essentials.length > 0) {
      acc[category as CategoryType] = essentials;
    }
    return acc;
  }, {} as Record<CategoryType, PackingItem[]>);

  const nonEssentialItems = Object.entries(packingList.categories).reduce((acc, [category, items]) => {
    const nonEssentials = items.filter(item => !item.essential);
    if (nonEssentials.length > 0) {
      acc[category as CategoryType] = nonEssentials;
    }
    return acc;
  }, {} as Record<CategoryType, PackingItem[]>);

  const handleSaveList = async () => {
    try {
      if (isShared && shareId) {
        const sharedList = await getListByShareId(shareId);
        if (sharedList) {
          await updateList(sharedList.id, {
            name: listName,
            items: packingList,
            origin: tripDetails.origin,
            destination: tripDetails.destination,
            startDate: tripDetails.startDate,
            endDate: tripDetails.endDate,
            isShared: true
          });
          toast.success('List updated successfully!');
        }
      } else {
        const existingList = lists.find(l => 
          l.origin === tripDetails.origin && 
          l.destination === tripDetails.destination && 
          l.startDate === tripDetails.startDate && 
          l.endDate === tripDetails.endDate
        );

        if (existingList) {
          await updateList(existingList.id, {
            name: listName,
            items: packingList,
            origin: tripDetails.origin,
            destination: tripDetails.destination,
            startDate: tripDetails.startDate,
            endDate: tripDetails.endDate,
            isShared: existingList.isShared
          });
          toast.success('List updated successfully!');
        } else {
          await addList({
            name: listName,
            items: packingList,
            origin: tripDetails.origin,
            destination: tripDetails.destination,
            startDate: tripDetails.startDate,
            endDate: tripDetails.endDate,
            isShared: false
          });
          toast.success('List saved successfully!');
        }
        router.push('/my-lists');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save list');
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {isEditingName ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  autoFocus
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                />
              </div>
            ) : (
              <h1 className="text-3xl font-bold dark:text-white" onClick={() => setIsEditingName(true)}>
                {listName}
              </h1>
            )}
            <div className="flex gap-2">
              <ShareButton 
                shareId={lists.find(l => 
                  l.origin === tripDetails.origin && 
                  l.destination === tripDetails.destination && 
                  l.startDate === tripDetails.startDate && 
                  l.endDate === tripDetails.endDate
                )?.shareId || ''}
              />
              <button
                onClick={handleSaveList}
                className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition-colors"
              >
                Save List
              </button>
            </div>
          </div>
          {tripDetails.startDate && tripDetails.endDate && (
            <p className="text-gray-600 dark:text-gray-400">
              From: {isShared 
                ? new Date(tripDetails.startDate + 'T12:00:00').toLocaleDateString()
                : new Date(new Date(tripDetails.startDate).getTime() + 86400000).toLocaleDateString()
              } - {isShared 
                ? new Date(tripDetails.endDate + 'T12:00:00').toLocaleDateString()
                : new Date(new Date(tripDetails.endDate).getTime() + 86400000).toLocaleDateString()
              }
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

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Essential Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(packingList.categories).map(([category, items]) => {
              const essentialItems = items.filter(item => item.essential);
              return essentialItems.length > 0 ? (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                  <h3 className="text-lg font-medium mb-3 capitalize dark:text-white">{category}</h3>
                  <ul className="space-y-2">
                    {essentialItems.map((item) => (
                      <li 
                        key={item.id} 
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 group p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
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
              ) : null;
            })}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Other things you may need:</h2>
          <div className="flex flex-wrap gap-2 pb-4">
            {Object.entries(packingList.categories).flatMap(([category, items]) =>
              items
                .filter(item => !item.essential)
                .map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddNonEssential(item)}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow hover:shadow-md transition-shadow dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <span>{item.name}</span>
                    <span className="w-4 h-4 inline-flex items-center justify-center rounded-full text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                      </svg>
                    </span>
                  </button>
                ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 