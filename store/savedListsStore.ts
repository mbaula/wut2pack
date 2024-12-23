import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PackingList } from '@/types/packingList';

export interface SavedList {
  id: string;
  name: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  items: PackingList;
  createdAt: string;
}

interface SavedListsStore {
  lists: SavedList[];
  addList: (list: SavedList) => void;
  updateListName: (id: string, newName: string) => void;
  updateList: (id: string, list: Partial<SavedList>) => void;
  deleteList: (id: string) => void;
}

export const useSavedListsStore = create<SavedListsStore>()(
  persist(
    (set) => ({
      lists: [],
      addList: (list) => set((state) => ({ lists: [...state.lists, list] })),
      updateList: (id, updatedList) => set((state) => ({
        lists: state.lists.map(list => 
          list.id === id ? { ...list, ...updatedList } : list
        )
      })),
      updateListName: (id, newName) => set((state) => ({
        lists: state.lists.map(list => list.id === id ? { ...list, name: newName } : list)
      })),
      deleteList: (id) => set((state) => ({
        lists: state.lists.filter(list => list.id !== id)
      })),
    }),
    { name: 'saved-packing-lists' }
  )
); 