import { PackingItem, PackingList, CategoryType, Answers } from '@/types/packingList';
import { BASE_ITEMS } from '@/data/packingItems';

export function generatePackingList(answers: Answers, tripDuration: number): PackingList {
  const list: PackingList = {
    categories: {
      essentials: [],
      clothing: [],
      accessories: [],
      toiletries: [],
      electronics: [],
      documents: [],
      medical: [],
      activities: [],
      misc: [],
    },
  };

  // Filter and add items based on conditions
  BASE_ITEMS.forEach(item => {
    if (shouldIncludeItem(item, answers, tripDuration)) {
      const quantity = calculateQuantity(item, tripDuration);
      list.categories[item.category].push({
        ...item,
        quantity,
      });
    }
  });

  return list;
}

function shouldIncludeItem(item: PackingItem, answers: Answers, tripDuration: number): boolean {
  if (!item.conditions) return true;

  // Check temperature conditions
  if (item.conditions.temperature) {
    const { min, max } = item.conditions.temperature;
    if (min !== undefined && answers.temperature.min < min) return false;
    if (max !== undefined && answers.temperature.max > max) return false;
  }

  // Check activities
  if (item.conditions.activities) {
    if (!item.conditions.activities.some(activity => answers.activities.includes(activity))) {
      return false;
    }
  }

  // Check swimming
  if (item.conditions.swimming !== undefined && item.conditions.swimming !== answers.swimming) {
    return false;
  }

  // Check special events
  if (item.conditions.specialEvents) {
    if (!item.conditions.specialEvents.some(event => answers.specialEvents.includes(event))) {
      return false;
    }
  }

  return true;
}

function calculateQuantity(item: PackingItem, tripDuration: number): number {
  // Basic quantity calculation based on trip duration
  switch (item.category) {
    case 'clothing':
      if (item.name.includes('Underwear') || item.name.includes('Socks')) {
        return Math.min(tripDuration + 2, 10); // Pack for each day plus 2 extra, max 10
      }
      if (item.name.includes('Shirt') || item.name.includes('Top')) {
        return Math.ceil(tripDuration / 2); // One shirt for every 2 days
      }
      break;
    case 'toiletries':
      return 1; // Usually one of each toiletry item
    default:
      return item.quantity;
  }

  return item.quantity;
} 