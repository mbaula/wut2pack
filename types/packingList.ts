export type CategoryType = 
  | 'essentials'
  | 'clothing'
  | 'accessories'
  | 'toiletries'
  | 'electronics'
  | 'documents'
  | 'medical'
  | 'activities'
  | 'misc';

export interface PackingItem {
  id: string;
  name: string;
  category: CategoryType;
  quantity: number;
  essential: boolean;
  conditions?: {
    temperature?: {
      min?: number;
      max?: number;
    };
    activities?: string[];
    accommodation?: string[];
    duration?: {
      min?: number;
      max?: number;
    };
    swimming?: boolean;
    specialEvents?: string[];
    eyewear?: string[];
    technology?: string[];
    medical?: string[];
  };
}

export interface PackingList {
  categories: {
    [key in CategoryType]: PackingItem[];
  };
}

export type Answers = {
  temperature: { min: number; max: number };
  activities: string[];
  swimming: boolean;
  specialEvents: string[];
  accommodation: string[];
  amenities: string[];
  transportation: string[];
  medical: string[];
  technology: string[];
  eyewear: string[];
  packingFor: string[];
};