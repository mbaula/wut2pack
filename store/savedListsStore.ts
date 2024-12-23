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
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ 
        lists: data.map(list => ({
          id: list.id,
          name: list.name,
          origin: list.origin,
          destination: list.destination,
          startDate: list.start_date,
          endDate: list.end_date,
          items: list.items,
          createdAt: list.created_at,
          shareId: list.share_id,
          isShared: list.is_shared
        })),
        error: null 
      });
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

      set(state => ({
        lists: [{
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
        }, ...state.lists]
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
          is_shared: updates.isShared
        })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        lists: state.lists.map(list =>
          list.id === id ? { ...list, ...updates } : list
        )
      }));
    } catch (error) {
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