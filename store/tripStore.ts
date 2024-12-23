import { create } from 'zustand';
import { PackingList } from '@/types/packingList';

interface TripDetails {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  listName: string;
}

interface TripStore {
  tripDetails: TripDetails | null;
  packingList: PackingList | null;
  setTripDetails: (details: TripDetails) => void;
  setPackingList: (list: PackingList) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  tripDetails: null,
  packingList: null,
  setTripDetails: (details) => set({ tripDetails: details }),
  setPackingList: (list) => set({ packingList: list })
})); 