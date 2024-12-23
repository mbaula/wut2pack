import { create } from 'zustand';
import { PackingList } from '@/types/packingList';
import { supabase } from '@/lib/supabase';

export interface SavedList {
  id: string;
  name: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  items: PackingList;
  createdAt: string;
  shareId: string;
  isShared: boolean;
  user_id?: string;
}

interface SavedListsStore {
  lists: SavedList[];
  isLoading: boolean;
  error: Error | null;
  fetchLists: () => Promise<void>;
  addList: (list: Omit<SavedList, 'id' | 'createdAt' | 'shareId'>) => Promise<void>;
  updateList: (id: string, updates: Partial<SavedList>) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  getListByShareId: (shareId: string) => Promise<SavedList | null>;
}

export const useSavedListsStore = create<SavedListsStore>((set, get) => ({
  lists: [],
  isLoading: false,
  error: null,

  fetchLists: async () => {
    set({ isLoading: true });
    try {
      // Get accessible list IDs from localStorage
      const accessibleLists = localStorage.getItem('accessibleLists') || '[]';
      const listIds = JSON.parse(accessibleLists);

      // Fetch actual list data from Supabase
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .in('id', listIds)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedLists = data.map(list => ({
        id: list.id,
        name: list.name,
        origin: list.origin,
        destination: list.destination,
        startDate: list.start_date?.split('T')[0],
        endDate: list.end_date?.split('T')[0],
        items: list.items,
        createdAt: list.created_at,
        shareId: list.share_id,
        isShared: list.is_shared,
        user_id: list.user_id
      }));

      set({ lists: formattedLists, error: null });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  addList: async (list) => {
    try {
      const { data, error } = await supabase
        .from('lists')
        .insert([{
          name: list.name,
          origin: list.origin,
          destination: list.destination,
          start_date: list.startDate,
          end_date: list.endDate,
          items: list.items,
          is_shared: list.isShared
        }])
        .select()
        .single();

      if (error) throw error;

      // Add new list ID to accessible lists in localStorage
      const accessibleLists = JSON.parse(localStorage.getItem('accessibleLists') || '[]');
      accessibleLists.push(data.id);
      localStorage.setItem('accessibleLists', JSON.stringify(accessibleLists));

      // Update state with new list
      const newList = {
        id: data.id,
        name: data.name,
        origin: data.origin,
        destination: data.destination,
        startDate: data.start_date,
        endDate: data.end_date,
        items: data.items,
        createdAt: data.created_at,
        shareId: data.share_id,
        isShared: data.is_shared
      };

      set(state => ({
        lists: [newList, ...state.lists]
      }));
    } catch (error) {
      set({ error: error as Error });
      throw error;
    }
  },

  updateList: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('lists')
        .update({
          name: updates.name,
          items: updates.items,
          is_shared: updates.isShared,
          start_date: updates.startDate,
          end_date: updates.endDate,
          origin: updates.origin,
          destination: updates.destination
        })
        .eq('id', id);

      if (error) throw error;

      // Update state
      set(state => ({
        lists: state.lists.map(list =>
          list.id === id ? { ...list, ...updates } : list
        )
      }));
    } catch (error) {
      console.error('Update error:', error);
      set({ error: error as Error });
      throw error;
    }
  },

  deleteList: async (id) => {
    try {
      const { error } = await supabase
        .from('lists')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        lists: state.lists.filter(list => list.id !== id)
      }));
    } catch (error) {
      set({ error: error as Error });
      throw error;
    }
  },

  getListByShareId: async (shareId) => {
    try {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('share_id', shareId)
        .single();

      if (error) throw error;

      console.log('Raw data from Supabase:', data); // Debug log

      return {
        id: data.id,
        name: data.name,
        origin: data.origin,
        destination: data.destination,
        startDate: data.start_date?.split('T')[0],    // Match the camelCase property names
        endDate: data.end_date?.split('T')[0],        // Match the camelCase property names
        items: data.items,
        createdAt: data.created_at,
        shareId: data.share_id,
        isShared: data.is_shared
      };
    } catch (error) {
      set({ error: error as Error });
      return null;
    }
  }
})); 