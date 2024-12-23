import { PackingItem } from '@/types/packingList';

export const BASE_ITEMS: PackingItem[] = [
  // Documents
  {
    id: 'passport',
    name: 'Passport',
    category: 'documents',
    quantity: 1,
    essential: true,
    conditions: {
      activities: ['International Travel']
    }
  },
  {
    id: 'id-card',
    name: 'ID Card',
    category: 'documents',
    quantity: 1,
    essential: true
  },
  {
    id: 'travel-insurance',
    name: 'Travel Insurance Documents',
    category: 'documents',
    quantity: 1,
    essential: true,
    conditions: {
      activities: ['International Travel']
    }
  },

  // Clothing - Temperature dependent
  {
    id: 'winter-coat',
    name: 'Winter Coat',
    category: 'clothing',
    quantity: 1,
    essential: false,
    conditions: {
      temperature: { max: 10 }
    }
  },
  {
    id: 'light-jacket',
    name: 'Light Jacket',
    category: 'clothing',
    quantity: 1,
    essential: false,
    conditions: {
      temperature: { min: 10, max: 20 }
    }
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    category: 'clothing',
    quantity: 1, // Will be calculated based on duration
    essential: true
  },
  {
    id: 'swimsuit',
    name: 'Swimsuit',
    category: 'clothing',
    quantity: 1,
    essential: false,
    conditions: {
      swimming: true
    }
  },
  {
    id: 'formal-wear',
    name: 'Formal Outfit',
    category: 'clothing',
    quantity: 1,
    essential: false,
    conditions: {
      specialEvents: ['Formal Dinner', 'Business Meeting', 'Wedding']
    }
  },

  // Footwear
  {
    id: 'walking-shoes',
    name: 'Comfortable Walking Shoes',
    category: 'clothing',
    quantity: 1,
    essential: true
  },
  {
    id: 'hiking-boots',
    name: 'Hiking Boots',
    category: 'clothing',
    quantity: 1,
    essential: false,
    conditions: {
      activities: ['Hiking', 'Trekking', 'Camping']
    }
  },
  {
    id: 'flip-flops',
    name: 'Flip Flops',
    category: 'clothing',
    quantity: 1,
    essential: false,
    conditions: {
      swimming: true
    }
  },

  // Electronics
  {
    id: 'phone-charger',
    name: 'Phone Charger',
    category: 'electronics',
    quantity: 1,
    essential: true
  },
  {
    id: 'power-adapter',
    name: 'International Power Adapter',
    category: 'electronics',
    quantity: 1,
    essential: false,
    conditions: {
      activities: ['International Travel']
    }
  },
  {
    id: 'laptop',
    name: 'Laptop',
    category: 'electronics',
    quantity: 1,
    essential: false,
    conditions: {
      technology: ['Laptop']
    }
  },

  // Toiletries
  {
    id: 'toothbrush',
    name: 'Toothbrush',
    category: 'toiletries',
    quantity: 1,
    essential: true
  },
  {
    id: 'toothpaste',
    name: 'Toothpaste',
    category: 'toiletries',
    quantity: 1,
    essential: true
  },
  {
    id: 'sunscreen',
    name: 'Sunscreen',
    category: 'toiletries',
    quantity: 1,
    essential: false,
    conditions: {
      temperature: { min: 20 }
    }
  },

  // Medical
  {
    id: 'prescription-meds',
    name: 'Prescription Medications',
    category: 'medical',
    quantity: 1,
    essential: true,
    conditions: {
      medical: ['Medications']
    }
  },
  {
    id: 'first-aid',
    name: 'First Aid Kit',
    category: 'medical',
    quantity: 1,
    essential: false,
    conditions: {
      activities: ['Hiking', 'Camping', 'Remote Travel']
    }
  },

  // Accessories
  {
    id: 'sunglasses',
    name: 'Sunglasses',
    category: 'accessories',
    quantity: 1,
    essential: false,
    conditions: {
      eyewear: ['Sunglasses']
    }
  },
  {
    id: 'prescription-glasses',
    name: 'Prescription Glasses',
    category: 'accessories',
    quantity: 1,
    essential: true,
    conditions: {
      eyewear: ['Prescription Glasses']
    }
  },
  {
    id: 'umbrella',
    name: 'Umbrella',
    category: 'accessories',
    quantity: 1,
    essential: false,
    conditions: {
      activities: ['Rainy Season Travel']
    }
  },

  // Activities
  {
    id: 'beach-towel',
    name: 'Beach Towel',
    category: 'activities',
    quantity: 1,
    essential: false,
    conditions: {
      swimming: true,
      accommodation: ['Hotel', 'Airbnb'] // Not needed if staying with friends/family who can provide
    }
  },
  {
    id: 'hiking-backpack',
    name: 'Hiking Backpack',
    category: 'activities',
    quantity: 1,
    essential: false,
    conditions: {
      activities: ['Hiking', 'Trekking']
    }
  }
];

// Helper function to calculate clothing quantities
export function calculateClothingQuantity(itemName: string, duration: number): number {
  switch (itemName.toLowerCase()) {
    case 't-shirts':
    case 'underwear':
    case 'socks':
      return Math.min(duration + 2, 10); // Pack for each day plus 2 extra, max 10
    case 'pants':
    case 'shorts':
      return Math.ceil(duration / 3); // One pair for every 3 days
    case 'formal-wear':
      return 1; // Usually one formal outfit is enough
    default:
      return 1;
  }
} 