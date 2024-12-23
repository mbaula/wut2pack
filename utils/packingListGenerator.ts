import { PackingItem, PackingList, CategoryType, Answers } from '@/types/packingList';
import { BASE_ITEMS } from '@/data/packingItems';

type AccommodationItems = {
  [key: string]: PackingItem[];
};

const accommodationSpecificItems: AccommodationItems = {
  'Hotel': [
    { id: 'hotel-card', name: 'Hotel Loyalty Card', category: 'documents', quantity: 1, essential: false },
    { id: 'safe-code', name: 'Room Safe Lock Code', category: 'documents', quantity: 1, essential: false },
  ],
  'Hostel': [
    { id: 'padlock', name: 'Padlock', category: 'essentials', quantity: 1, essential: true },
    { id: 'sleep-mask', name: 'Sleep Mask', category: 'accessories', quantity: 1, essential: false },
    { id: 'ear-plugs', name: 'Ear Plugs', category: 'accessories', quantity: 1, essential: false },
    { id: 'shower-shoes', name: 'Shower Shoes/Flip-flops', category: 'toiletries', quantity: 1, essential: false },
    { id: 'quick-dry-towel', name: 'Quick-dry Towel', category: 'toiletries', quantity: 1, essential: false },
  ],
  'Airbnb/Vacation Rental': [
    { id: 'property-access', name: 'Property Access Instructions', category: 'documents', quantity: 1, essential: true },
    { id: 'host-contact', name: 'Host Contact Info', category: 'documents', quantity: 1, essential: true },
  ],
  'Camping': [
    { id: 'tent', name: 'Tent', category: 'activities', quantity: 1, essential: true },
    { id: 'sleeping-bag', name: 'Sleeping Bag', category: 'activities', quantity: 1, essential: true },
    { id: 'sleeping-pad', name: 'Sleeping Pad', category: 'activities', quantity: 1, essential: true },
    { id: 'headlamp', name: 'Headlamp/Flashlight', category: 'activities', quantity: 1, essential: true },
    { id: 'multi-tool', name: 'Multi-tool', category: 'essentials', quantity: 1, essential: true },
    { id: 'camping-stove', name: 'Camping Stove', category: 'activities', quantity: 1, essential: false },
    { id: 'water-filter', name: 'Water Filter/Purifier', category: 'activities', quantity: 1, essential: true },
    { id: 'matches', name: 'Matches/Lighter', category: 'essentials', quantity: 1, essential: true },
  ],
  'Resort': [
    { id: 'resort-booking', name: 'Resort Booking Confirmation', category: 'documents', quantity: 1, essential: true },
    { id: 'resort-schedule', name: 'Resort Activity Schedule', category: 'documents', quantity: 1, essential: false },
  ],
};

type TravelReasonItems = {
  [key: string]: PackingItem[];
};

const travelReasonSpecificItems: TravelReasonItems = {
  'Business': [
    { id: 'business-suit', name: 'Business Suit', category: 'clothing', quantity: 1, essential: true },
    { id: 'dress-shoes', name: 'Dress Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'business-cards', name: 'Business Cards', category: 'documents', quantity: 1, essential: false },
    { id: 'laptop', name: 'Laptop', category: 'electronics', quantity: 1, essential: true },
    { id: 'work-documents', name: 'Work Documents', category: 'documents', quantity: 1, essential: true },
    { id: 'portable-charger', name: 'Portable Charger', category: 'electronics', quantity: 1, essential: false },
  ],
  'Wedding': [
    { id: 'formal-attire', name: 'Formal Attire', category: 'clothing', quantity: 1, essential: true },
    { id: 'dress-shoes', name: 'Dress Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'wedding-gift', name: 'Wedding Gift/Card', category: 'misc', quantity: 1, essential: true },
    { id: 'wedding-invitation', name: 'Wedding Invitation', category: 'documents', quantity: 1, essential: true },
  ],
  'Conference': [
    { id: 'conference-badge', name: 'Conference Badge/Registration', category: 'documents', quantity: 1, essential: true },
    { id: 'business-casual', name: 'Business Casual Outfits', category: 'clothing', quantity: 3, essential: true },
    { id: 'notebook', name: 'Notebook/Tablet', category: 'electronics', quantity: 1, essential: true },
    { id: 'business-cards', name: 'Business Cards', category: 'documents', quantity: 1, essential: true },
  ],
  'Study': [
    { id: 'laptop', name: 'Laptop', category: 'electronics', quantity: 1, essential: true },
    { id: 'study-materials', name: 'Study Materials', category: 'documents', quantity: 1, essential: true },
    { id: 'notebooks', name: 'Notebooks', category: 'misc', quantity: 2, essential: true },
    { id: 'student-id', name: 'Student ID', category: 'documents', quantity: 1, essential: true },
  ],
  'Adventure': [
    { id: 'hiking-boots', name: 'Hiking Boots', category: 'clothing', quantity: 1, essential: true },
    { id: 'backpack', name: 'Day Backpack', category: 'accessories', quantity: 1, essential: true },
    { id: 'first-aid', name: 'First Aid Kit', category: 'medical', quantity: 1, essential: true },
    { id: 'water-bottle', name: 'Water Bottle', category: 'activities', quantity: 1, essential: true },
    { id: 'compass', name: 'Compass/GPS', category: 'electronics', quantity: 1, essential: false },
  ],
  'Honeymoon': [
    { id: 'evening-wear', name: 'Evening Wear', category: 'clothing', quantity: 2, essential: true },
    { id: 'dress-shoes', name: 'Dress Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'romantic-attire', name: 'Romantic Attire', category: 'clothing', quantity: 1, essential: false },
    { id: 'camera', name: 'Camera', category: 'electronics', quantity: 1, essential: false },
  ],
  'Family Visit': [
    { id: 'family-gifts', name: 'Family Gifts', category: 'misc', quantity: 1, essential: false },
    { id: 'family-photos', name: 'Family Photos', category: 'misc', quantity: 1, essential: false },
    { id: 'casual-clothes', name: 'Casual Clothes', category: 'clothing', quantity: 1, essential: true },
  ],
  'Vacation/Holiday': [
    { id: 'casual-clothes', name: 'Casual Clothes', category: 'clothing', quantity: 1, essential: true },
    { id: 'camera', name: 'Camera', category: 'electronics', quantity: 1, essential: false },
    { id: 'travel-guide', name: 'Travel Guide/Maps', category: 'documents', quantity: 1, essential: false },
    { id: 'day-bag', name: 'Day Bag', category: 'accessories', quantity: 1, essential: true },
  ]
};

type PackingForItems = {
  [key: string]: PackingItem[];
};

const packingForSpecificItems: PackingForItems = {
  'Male Adult': [
    { id: 'mens-underwear', name: 'Men\'s Underwear', category: 'clothing', quantity: 1, essential: true },
    { id: 'mens-deodorant', name: 'Men\'s Deodorant', category: 'toiletries', quantity: 1, essential: true },
    { id: 'razor', name: 'Razor/Shaving Kit', category: 'toiletries', quantity: 1, essential: false },
    { id: 'mens-socks', name: 'Men\'s Socks', category: 'clothing', quantity: 1, essential: true },
  ],
  'Female Adult': [
    { id: 'womens-underwear', name: 'Women\'s Underwear', category: 'clothing', quantity: 1, essential: true },
    { id: 'womens-deodorant', name: 'Women\'s Deodorant', category: 'toiletries', quantity: 1, essential: true },
    { id: 'feminine-products', name: 'Feminine Hygiene Products', category: 'toiletries', quantity: 1, essential: true },
    { id: 'womens-socks', name: 'Women\'s Socks', category: 'clothing', quantity: 1, essential: true },
    { id: 'hair-accessories', name: 'Hair Accessories', category: 'accessories', quantity: 1, essential: false },
  ],
  'Child': [
    { id: 'kids-clothes', name: 'Kids Clothes', category: 'clothing', quantity: 1, essential: true },
    { id: 'kids-shoes', name: 'Kids Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'kids-entertainment', name: 'Entertainment/Toys', category: 'misc', quantity: 1, essential: false },
    { id: 'kids-snacks', name: 'Snacks', category: 'misc', quantity: 1, essential: true },
    { id: 'kids-medicine', name: 'Children\'s Medicine', category: 'medical', quantity: 1, essential: true },
  ],
  'Baby/Infant': [
    { id: 'diapers', name: 'Diapers', category: 'essentials', quantity: 1, essential: true },
    { id: 'wipes', name: 'Baby Wipes', category: 'essentials', quantity: 1, essential: true },
    { id: 'baby-food', name: 'Baby Food/Formula', category: 'essentials', quantity: 1, essential: true },
    { id: 'baby-clothes', name: 'Baby Clothes', category: 'clothing', quantity: 1, essential: true },
    { id: 'baby-medicine', name: 'Baby Medicine', category: 'medical', quantity: 1, essential: true },
    { id: 'baby-monitor', name: 'Baby Monitor', category: 'electronics', quantity: 1, essential: false },
    { id: 'stroller', name: 'Stroller/Carrier', category: 'essentials', quantity: 1, essential: true },
    { id: 'baby-blanket', name: 'Baby Blanket', category: 'essentials', quantity: 1, essential: true },
  ],
  'Senior': [
    { id: 'medications', name: 'Medications', category: 'medical', quantity: 1, essential: true },
    { id: 'medical-info', name: 'Medical Information Card', category: 'documents', quantity: 1, essential: true },
    { id: 'mobility-aids', name: 'Mobility Aids', category: 'medical', quantity: 1, essential: false },
    { id: 'reading-glasses', name: 'Reading Glasses', category: 'accessories', quantity: 1, essential: false },
    { id: 'emergency-contacts', name: 'Emergency Contacts List', category: 'documents', quantity: 1, essential: true },
  ]
};

type TechnologyItems = {
  [key: string]: PackingItem[];
};

const technologySpecificItems: TechnologyItems = {
  'Laptop': [
    { id: 'laptop', name: 'Laptop', category: 'electronics', quantity: 1, essential: true },
    { id: 'laptop-charger', name: 'Laptop Charger', category: 'electronics', quantity: 1, essential: true },
    { id: 'laptop-case', name: 'Laptop Case/Sleeve', category: 'electronics', quantity: 1, essential: false },
    { id: 'mouse', name: 'Mouse', category: 'electronics', quantity: 1, essential: false },
  ],
  'Tablet': [
    { id: 'tablet', name: 'Tablet', category: 'electronics', quantity: 1, essential: true },
    { id: 'tablet-charger', name: 'Tablet Charger', category: 'electronics', quantity: 1, essential: true },
    { id: 'tablet-case', name: 'Tablet Case', category: 'electronics', quantity: 1, essential: false },
  ],
  'Camera': [
    { id: 'camera', name: 'Camera', category: 'electronics', quantity: 1, essential: true },
    { id: 'camera-charger', name: 'Camera Charger', category: 'electronics', quantity: 1, essential: true },
    { id: 'memory-cards', name: 'Memory Cards', category: 'electronics', quantity: 1, essential: true },
    { id: 'camera-bag', name: 'Camera Bag', category: 'electronics', quantity: 1, essential: false },
    { id: 'extra-battery', name: 'Extra Camera Battery', category: 'electronics', quantity: 1, essential: false },
  ],
  'Gaming Device': [
    { id: 'gaming-device', name: 'Gaming Device', category: 'electronics', quantity: 1, essential: true },
    { id: 'device-charger', name: 'Device Charger', category: 'electronics', quantity: 1, essential: true },
    { id: 'games', name: 'Games', category: 'electronics', quantity: 1, essential: false },
    { id: 'headphones', name: 'Headphones', category: 'electronics', quantity: 1, essential: true },
  ],
  'Work Equipment': [
    { id: 'work-phone', name: 'Work Phone', category: 'electronics', quantity: 1, essential: true },
    { id: 'work-documents', name: 'Work Documents', category: 'documents', quantity: 1, essential: true },
    { id: 'work-accessories', name: 'Work Accessories', category: 'electronics', quantity: 1, essential: false },
  ],
};

const swimmingItems: PackingItem[] = [
  { id: 'swimsuit', name: 'Swimsuit', category: 'clothing', quantity: 1, essential: true },
  { id: 'beach-towel', name: 'Beach/Pool Towel', category: 'toiletries', quantity: 1, essential: true },
  { id: 'sunscreen', name: 'Sunscreen', category: 'toiletries', quantity: 1, essential: true },
  { id: 'goggles', name: 'Swimming Goggles', category: 'accessories', quantity: 1, essential: false },
  { id: 'flip-flops', name: 'Flip-flops/Water Shoes', category: 'clothing', quantity: 1, essential: true },
  { id: 'waterproof-bag', name: 'Waterproof Phone Case/Bag', category: 'accessories', quantity: 1, essential: false },
  { id: 'after-sun', name: 'After-Sun Lotion', category: 'toiletries', quantity: 1, essential: false },
];

type ActivityItems = {
  [key: string]: PackingItem[];
};

const activitySpecificItems: ActivityItems = {
  'Hiking': [
    { id: 'hiking-boots', name: 'Hiking Boots', category: 'clothing', quantity: 1, essential: true },
    { id: 'hiking-socks', name: 'Hiking Socks', category: 'clothing', quantity: 3, essential: true },
    { id: 'backpack', name: 'Day Backpack', category: 'activities', quantity: 1, essential: true },
    { id: 'water-bottle', name: 'Water Bottle', category: 'activities', quantity: 1, essential: true },
    { id: 'hiking-poles', name: 'Hiking Poles', category: 'activities', quantity: 1, essential: false },
    { id: 'first-aid', name: 'First Aid Kit', category: 'medical', quantity: 1, essential: true },
  ],
  'Beach': [
    { id: 'beach-bag', name: 'Beach Bag', category: 'accessories', quantity: 1, essential: true },
    { id: 'beach-umbrella', name: 'Beach Umbrella', category: 'activities', quantity: 1, essential: false },
    { id: 'beach-blanket', name: 'Beach Blanket', category: 'activities', quantity: 1, essential: true },
    { id: 'waterproof-sunscreen', name: 'Waterproof Sunscreen', category: 'toiletries', quantity: 1, essential: true },
  ],
  'Sightseeing': [
    { id: 'comfortable-shoes', name: 'Comfortable Walking Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'day-bag', name: 'Day Bag/Backpack', category: 'accessories', quantity: 1, essential: true },
    { id: 'guidebook', name: 'Guidebook/Maps', category: 'misc', quantity: 1, essential: false },
    { id: 'portable-charger', name: 'Portable Phone Charger', category: 'electronics', quantity: 1, essential: true },
  ],
  'Shopping': [
    { id: 'foldable-bag', name: 'Foldable Shopping Bag', category: 'accessories', quantity: 1, essential: false },
    { id: 'comfortable-shoes-shopping', name: 'Comfortable Shoes', category: 'clothing', quantity: 1, essential: true },
  ],
  'Sports': [
    { id: 'sports-clothes', name: 'Sports Clothes', category: 'clothing', quantity: 2, essential: true },
    { id: 'sports-shoes', name: 'Sports Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'sports-equipment', name: 'Sports Equipment', category: 'activities', quantity: 1, essential: false },
    { id: 'water-bottle-sports', name: 'Water Bottle', category: 'activities', quantity: 1, essential: true },
  ],
  'Gym/Fitness': [
    { id: 'workout-clothes', name: 'Workout Clothes', category: 'clothing', quantity: 2, essential: true },
    { id: 'gym-shoes', name: 'Gym Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'gym-towel', name: 'Gym Towel', category: 'toiletries', quantity: 1, essential: true },
    { id: 'water-bottle-gym', name: 'Water Bottle', category: 'activities', quantity: 1, essential: true },
  ],
  'Skiing/Winter Sports': [
    { id: 'ski-jacket', name: 'Ski Jacket', category: 'clothing', quantity: 1, essential: true },
    { id: 'ski-pants', name: 'Ski Pants', category: 'clothing', quantity: 1, essential: true },
    { id: 'thermal-underwear', name: 'Thermal Underwear', category: 'clothing', quantity: 2, essential: true },
    { id: 'ski-socks', name: 'Ski Socks', category: 'clothing', quantity: 3, essential: true },
    { id: 'ski-gloves', name: 'Ski Gloves', category: 'accessories', quantity: 1, essential: true },
    { id: 'ski-goggles', name: 'Ski Goggles', category: 'accessories', quantity: 1, essential: true },
    { id: 'hand-warmers', name: 'Hand Warmers', category: 'accessories', quantity: 1, essential: false },
  ],
};

type EyewearItems = {
  [key: string]: PackingItem[];
};

const eyewearSpecificItems: EyewearItems = {
  'Glasses': [
    { id: 'glasses', name: 'Prescription Glasses', category: 'accessories', quantity: 1, essential: true },
    { id: 'glasses-case', name: 'Glasses Case', category: 'accessories', quantity: 1, essential: true },
    { id: 'glasses-cleaner', name: 'Glasses Cleaning Kit', category: 'accessories', quantity: 1, essential: false },
    { id: 'backup-glasses', name: 'Backup Glasses', category: 'accessories', quantity: 1, essential: false },
  ],
  'Contact Lenses': [
    { id: 'contacts', name: 'Contact Lenses', category: 'medical', quantity: 1, essential: true },
    { id: 'contact-solution', name: 'Contact Solution', category: 'medical', quantity: 1, essential: true },
    { id: 'contact-case', name: 'Contact Lens Case', category: 'medical', quantity: 1, essential: true },
    { id: 'backup-contacts', name: 'Backup Contact Lenses', category: 'medical', quantity: 1, essential: true },
  ],
  'Sunglasses': [
    { id: 'sunglasses', name: 'Sunglasses', category: 'accessories', quantity: 1, essential: true },
    { id: 'sunglasses-case', name: 'Sunglasses Case', category: 'accessories', quantity: 1, essential: false },
  ],
};

type TransportationItems = {
  [key: string]: PackingItem[];
};

const transportationSpecificItems: TransportationItems = {
  'Plane': [
    { id: 'boarding-pass', name: 'Boarding Pass', category: 'documents', quantity: 1, essential: true },
    { id: 'passport', name: 'Passport', category: 'documents', quantity: 1, essential: true },
    { id: 'tsa-lock', name: 'TSA-Approved Lock', category: 'accessories', quantity: 1, essential: false },
    { id: 'luggage-tag', name: 'Luggage Tag', category: 'accessories', quantity: 1, essential: true },
    { id: 'neck-pillow', name: 'Travel Neck Pillow', category: 'accessories', quantity: 1, essential: false },
    { id: 'compression-socks', name: 'Compression Socks', category: 'clothing', quantity: 1, essential: false },
    { id: 'eye-mask', name: 'Sleep Eye Mask', category: 'accessories', quantity: 1, essential: false },
  ],
  'Train': [
    { id: 'train-ticket', name: 'Train Ticket', category: 'documents', quantity: 1, essential: true },
    { id: 'train-pass', name: 'Rail Pass', category: 'documents', quantity: 1, essential: false },
    { id: 'book-entertainment', name: 'Book/Entertainment', category: 'misc', quantity: 1, essential: false },
    { id: 'snacks', name: 'Snacks', category: 'misc', quantity: 1, essential: false },
  ],
  'Car': [
    { id: 'drivers-license', name: 'Driver\'s License', category: 'documents', quantity: 1, essential: true },
    { id: 'car-insurance', name: 'Car Insurance Documents', category: 'documents', quantity: 1, essential: true },
    { id: 'car-charger', name: 'Car Phone Charger', category: 'electronics', quantity: 1, essential: true },
    { id: 'car-snacks', name: 'Road Trip Snacks', category: 'misc', quantity: 1, essential: false },
    { id: 'emergency-kit', name: 'Car Emergency Kit', category: 'medical', quantity: 1, essential: true },
    { id: 'car-maps', name: 'Offline Maps/GPS', category: 'electronics', quantity: 1, essential: false },
  ],
  'Bus': [
    { id: 'bus-ticket', name: 'Bus Ticket', category: 'documents', quantity: 1, essential: true },
    { id: 'travel-pillow', name: 'Travel Pillow', category: 'accessories', quantity: 1, essential: false },
    { id: 'bus-entertainment', name: 'Entertainment Device', category: 'electronics', quantity: 1, essential: false },
    { id: 'bus-snacks', name: 'Snacks', category: 'misc', quantity: 1, essential: false },
  ],
  'Cruise Ship': [
    { id: 'cruise-docs', name: 'Cruise Documents', category: 'documents', quantity: 1, essential: true },
    { id: 'passport-cruise', name: 'Passport', category: 'documents', quantity: 1, essential: true },
    { id: 'formal-wear', name: 'Formal Wear', category: 'clothing', quantity: 1, essential: true },
    { id: 'motion-sickness', name: 'Motion Sickness Medication', category: 'medical', quantity: 1, essential: false },
    { id: 'cruise-card-holder', name: 'Cruise Card Holder/Lanyard', category: 'accessories', quantity: 1, essential: false },
    { id: 'water-shoes', name: 'Water Shoes', category: 'clothing', quantity: 1, essential: false },
  ],
  'Multiple Modes': [
    { id: 'universal-adapter', name: 'Universal Power Adapter', category: 'electronics', quantity: 1, essential: true },
    { id: 'backup-charger', name: 'Backup Power Bank', category: 'electronics', quantity: 1, essential: true },
    { id: 'travel-docs', name: 'All Travel Documents', category: 'documents', quantity: 1, essential: true },
    { id: 'travel-insurance', name: 'Travel Insurance Documents', category: 'documents', quantity: 1, essential: true },
    { id: 'multi-weather', name: 'Multi-Weather Clothing', category: 'clothing', quantity: 1, essential: true },
  ],
};

type SpecialEventItems = {
  [key: string]: PackingItem[];
};

const specialEventItems: SpecialEventItems = {
  'Formal Dinner': [
    { id: 'formal-attire', name: 'Formal Attire', category: 'clothing', quantity: 1, essential: true },
    { id: 'dress-shoes', name: 'Dress Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'formal-accessories', name: 'Formal Accessories (Tie/Jewelry)', category: 'accessories', quantity: 1, essential: true },
    { id: 'evening-bag', name: 'Evening Bag/Clutch', category: 'accessories', quantity: 1, essential: false },
    { id: 'dress-socks', name: 'Dress Socks', category: 'clothing', quantity: 1, essential: true },
  ],
  'Business Meeting': [
    { id: 'business-suit', name: 'Business Suit/Professional Attire', category: 'clothing', quantity: 1, essential: true },
    { id: 'business-shoes', name: 'Business Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'business-documents', name: 'Business Documents', category: 'documents', quantity: 1, essential: true },
    { id: 'business-cards', name: 'Business Cards', category: 'documents', quantity: 1, essential: true },
    { id: 'portfolio', name: 'Portfolio/Notebook', category: 'misc', quantity: 1, essential: false },
  ],
  'Wedding': [
    { id: 'wedding-attire', name: 'Wedding Appropriate Attire', category: 'clothing', quantity: 1, essential: true },
    { id: 'wedding-shoes', name: 'Formal Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'wedding-gift', name: 'Wedding Gift/Card', category: 'misc', quantity: 1, essential: true },
    { id: 'wedding-invite', name: 'Wedding Invitation', category: 'documents', quantity: 1, essential: true },
    { id: 'wedding-accessories', name: 'Wedding Accessories', category: 'accessories', quantity: 1, essential: false },
  ],
  'Party': [
    { id: 'party-outfit', name: 'Party Outfit', category: 'clothing', quantity: 1, essential: true },
    { id: 'party-shoes', name: 'Party Shoes', category: 'clothing', quantity: 1, essential: true },
    { id: 'party-gift', name: 'Party Gift/Card', category: 'misc', quantity: 1, essential: false },
  ],
  'Religious Service': [
    { id: 'modest-attire', name: 'Modest/Appropriate Attire', category: 'clothing', quantity: 1, essential: true },
    { id: 'head-covering', name: 'Head Covering (if required)', category: 'clothing', quantity: 1, essential: false },
    { id: 'religious-items', name: 'Religious Items', category: 'misc', quantity: 1, essential: false },
  ],
};

type MedicalItems = {
  [key: string]: PackingItem[];
};

const medicalItems: MedicalItems = {
  'Prescription Medications': [
    { id: 'prescriptions', name: 'Prescription Medications', category: 'medical', quantity: 1, essential: true },
    { id: 'prescription-copies', name: 'Prescription Copies', category: 'documents', quantity: 1, essential: true },
    { id: 'pill-organizer', name: 'Pill Organizer', category: 'medical', quantity: 1, essential: false },
    { id: 'medical-info', name: 'Medical Information Card', category: 'documents', quantity: 1, essential: true },
  ],
  'First Aid Kit': [
    { id: 'first-aid-kit', name: 'First Aid Kit', category: 'medical', quantity: 1, essential: true },
    { id: 'bandages', name: 'Bandages/Band-aids', category: 'medical', quantity: 1, essential: true },
    { id: 'pain-relief', name: 'Pain Relief Medication', category: 'medical', quantity: 1, essential: true },
    { id: 'antiseptic', name: 'Antiseptic Wipes', category: 'medical', quantity: 1, essential: true },
  ],
  'Mobility Aids': [
    { id: 'mobility-device', name: 'Mobility Device', category: 'medical', quantity: 1, essential: true },
    { id: 'device-accessories', name: 'Device Accessories/Parts', category: 'medical', quantity: 1, essential: true },
    { id: 'medical-documents', name: 'Medical Device Documentation', category: 'documents', quantity: 1, essential: true },
  ],
  'Special Diet': [
    { id: 'dietary-snacks', name: 'Special Diet Snacks', category: 'misc', quantity: 1, essential: true },
    { id: 'dietary-card', name: 'Dietary Restrictions Card', category: 'documents', quantity: 1, essential: true },
    { id: 'supplements', name: 'Dietary Supplements', category: 'medical', quantity: 1, essential: false },
  ],
  'Allergies': [
    { id: 'allergy-meds', name: 'Allergy Medications', category: 'medical', quantity: 1, essential: true },
    { id: 'epipen', name: 'Epinephrine Auto-Injector', category: 'medical', quantity: 1, essential: true },
    { id: 'allergy-card', name: 'Allergy Information Card', category: 'documents', quantity: 1, essential: true },
    { id: 'medical-bracelet', name: 'Medical Alert Bracelet', category: 'accessories', quantity: 1, essential: true },
  ],
};

type TemperatureBasedItems = {
  cold: PackingItem[];
  mild: PackingItem[];
  warm: PackingItem[];
  hot: PackingItem[];
};

const temperatureBasedItems: TemperatureBasedItems = {
  cold: [ // Below 10°C
    { 
      id: 'winter-coat', 
      name: 'Winter Coat', 
      category: 'clothing', 
      quantity: 1, 
      essential: true,
      conditions: { temperature: { max: 10 } }
    },
    { 
      id: 'thermal-underwear', 
      name: 'Thermal Underwear', 
      category: 'clothing', 
      quantity: 2, 
      essential: true,
      conditions: { temperature: { max: 5 } }
    },
    { 
      id: 'winter-boots', 
      name: 'Winter Boots', 
      category: 'clothing', 
      quantity: 1, 
      essential: true,
      conditions: { temperature: { max: 5 } }
    },
    { 
      id: 'wool-socks', 
      name: 'Wool Socks', 
      category: 'clothing', 
      quantity: 3, 
      essential: true,
      conditions: { temperature: { max: 10 } }
    },
    { 
      id: 'gloves', 
      name: 'Gloves/Mittens', 
      category: 'accessories', 
      quantity: 1, 
      essential: true,
      conditions: { temperature: { max: 10 } }
    },
    { 
      id: 'winter-hat', 
      name: 'Winter Hat', 
      category: 'accessories', 
      quantity: 1, 
      essential: true,
      conditions: { temperature: { max: 10 } }
    },
    { 
      id: 'scarf', 
      name: 'Scarf', 
      category: 'accessories', 
      quantity: 1, 
      essential: true,
      conditions: { temperature: { max: 10 } }
    }
  ],
  mild: [ // 10-20°C
    { 
      id: 'light-jacket', 
      name: 'Light Jacket/Sweater', 
      category: 'clothing', 
      quantity: 1, 
      essential: true,
      conditions: { temperature: { min: 10, max: 20 } }
    },
    { 
      id: 'long-sleeve-shirts', 
      name: 'Long Sleeve Shirts', 
      category: 'clothing', 
      quantity: 3, 
      essential: true,
      conditions: { temperature: { min: 10, max: 20 } }
    },
    { 
      id: 'light-layers', 
      name: 'Layering Pieces', 
      category: 'clothing', 
      quantity: 2, 
      essential: true,
      conditions: { temperature: { min: 10, max: 20 } }
    }
  ],
  warm: [ // 20-25°C
    { 
      id: 'short-sleeve-shirts', 
      name: 'Short Sleeve Shirts', 
      category: 'clothing', 
      quantity: 3, 
      essential: true,
      conditions: { temperature: { min: 20, max: 25 } }
    },
    { 
      id: 'light-pants', 
      name: 'Light Weight Pants', 
      category: 'clothing', 
      quantity: 2, 
      essential: true,
      conditions: { temperature: { min: 20, max: 25 } }
    },
    { 
      id: 'sun-hat', 
      name: 'Sun Hat', 
      category: 'accessories', 
      quantity: 1, 
      essential: false,
      conditions: { temperature: { min: 20 } }
    }
  ],
  hot: [ // Above 25°C
    { 
      id: 'shorts', 
      name: 'Shorts', 
      category: 'clothing', 
      quantity: 3, 
      essential: true,
      conditions: { temperature: { min: 25 } }
    },
    { 
      id: 'tank-tops', 
      name: 'Tank Tops/Sleeveless Shirts', 
      category: 'clothing', 
      quantity: 3, 
      essential: true,
      conditions: { temperature: { min: 25 } }
    },
    { 
      id: 'sandals', 
      name: 'Sandals', 
      category: 'clothing', 
      quantity: 1, 
      essential: false,
      conditions: { temperature: { min: 25 } }
    },
    { 
      id: 'cooling-towel', 
      name: 'Cooling Towel', 
      category: 'accessories', 
      quantity: 1, 
      essential: false,
      conditions: { temperature: { min: 30 } }
    },
    { 
      id: 'portable-fan', 
      name: 'Portable Fan', 
      category: 'accessories', 
      quantity: 1, 
      essential: false,
      conditions: { temperature: { min: 30 } }
    }
  ]
};

type InternationalTravelItems = PackingItem[];

const internationalTravelItems: InternationalTravelItems = [
  { 
    id: 'passport', 
    name: 'Passport', 
    category: 'documents', 
    quantity: 1, 
    essential: true 
  },
  { 
    id: 'visa-docs', 
    name: 'Visa Documentation', 
    category: 'documents', 
    quantity: 1, 
    essential: true 
  },
  { 
    id: 'travel-insurance', 
    name: 'Travel Insurance Documents', 
    category: 'documents', 
    quantity: 1, 
    essential: true 
  },
  { 
    id: 'vaccination-records', 
    name: 'Vaccination Records', 
    category: 'documents', 
    quantity: 1, 
    essential: true 
  },
  { 
    id: 'currency-exchange', 
    name: 'Foreign Currency/Exchange Info', 
    category: 'documents', 
    quantity: 1, 
    essential: true 
  },
  { 
    id: 'universal-adapter', 
    name: 'Universal Power Adapter', 
    category: 'electronics', 
    quantity: 1, 
    essential: true 
  },
  { 
    id: 'embassy-info', 
    name: 'Embassy Contact Information', 
    category: 'documents', 
    quantity: 1, 
    essential: false 
  },
  { 
    id: 'customs-forms', 
    name: 'Customs Declaration Forms', 
    category: 'documents', 
    quantity: 1, 
    essential: true 
  },
  { 
    id: 'translation-device', 
    name: 'Translation Device/App', 
    category: 'electronics', 
    quantity: 1, 
    essential: false 
  },
  { 
    id: 'medication-letter', 
    name: 'Prescription Medication Letter', 
    category: 'documents', 
    quantity: 1, 
    essential: false,
    conditions: {
      medical: ['Prescription Medications']
    }
  }
];

export function generatePackingList(
  answers: Answers,
  tripDuration: number,
  origin?: string,
  destination?: string
): PackingList {
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
    nonEssentialItems: [],
  };

  // Create a Map to track items by ID
  const itemsMap = new Map<string, PackingItem>();

  // Add base items to map
  BASE_ITEMS.forEach(item => {
    itemsMap.set(item.id, item);
  });

  // Add accommodation-specific items
  answers.accommodation.forEach(accType => {
    const specificItems = accommodationSpecificItems[accType] || [];
    specificItems.forEach(item => {
      itemsMap.set(item.id, item);
    });
  });

  // Add travel reason-specific items
  answers.travelReason.forEach(reason => {
    const reasonItems = travelReasonSpecificItems[reason] || [];
    reasonItems.forEach(item => {
      itemsMap.set(item.id, item);
    });
  });

  // Add packing-for specific items
  answers.packingFor.forEach(personType => {
    const personItems = packingForSpecificItems[personType] || [];
    personItems.forEach(item => {
      itemsMap.set(item.id, item);
    });
  });

  // Add technology-specific items
  answers.technology.forEach(tech => {
    if (tech !== 'None') {
      const techItems = technologySpecificItems[tech] || [];
      techItems.forEach(item => {
        itemsMap.set(item.id, item);
      });
    }
  });

  // Add activity-specific items
  answers.activities.forEach(activity => {
    if (activity !== 'None') {
      const activityItems = activitySpecificItems[activity] || [];
      activityItems.forEach(item => {
        itemsMap.set(item.id, item);
      });
    }
  });

  // Add eyewear-specific items
  answers.eyewear.forEach(eyewear => {
    if (eyewear !== 'None') {
      const eyewearItems = eyewearSpecificItems[eyewear] || [];
      eyewearItems.forEach(item => {
        itemsMap.set(item.id, item);
      });
    }
  });

  // Add swimming items if swimming is true
  if (answers.swimming) {
    swimmingItems.forEach(item => {
      itemsMap.set(item.id, item);
    });
  }

  // Add transportation-specific items
  answers.transportation.forEach(transport => {
    const transportItems = transportationSpecificItems[transport] || [];
    transportItems.forEach(item => {
      itemsMap.set(item.id, item);
    });
  });

  // Add special event items
  answers.specialEvents.forEach(event => {
    if (event !== 'None') {
      const eventItems = specialEventItems[event] || [];
      eventItems.forEach(item => {
        itemsMap.set(item.id, item);
      });
    }
  });

  // Add medical items
  answers.medical.forEach(medicalNeed => {
    if (medicalNeed !== 'None') {
      const medicalSpecificItems = medicalItems[medicalNeed] || [];
      medicalSpecificItems.forEach(item => {
        itemsMap.set(item.id, item);
      });
    }
  });

  // Add temperature-based items
  const { min: minTemp, max: maxTemp } = answers.temperature;

  // Add cold weather items if minimum temperature is low
  if (minTemp <= 10) {
    temperatureBasedItems.cold.forEach(item => {
      if (shouldIncludeItem(item, answers, tripDuration)) {
        itemsMap.set(item.id, item);
      }
    });
  }

  // Add mild weather items for moderate temperatures
  if (minTemp <= 20 && maxTemp >= 10) {
    temperatureBasedItems.mild.forEach(item => {
      if (shouldIncludeItem(item, answers, tripDuration)) {
        itemsMap.set(item.id, item);
      }
    });
  }

  // Add warm weather items
  if (maxTemp >= 20) {
    temperatureBasedItems.warm.forEach(item => {
      if (shouldIncludeItem(item, answers, tripDuration)) {
        itemsMap.set(item.id, item);
      }
    });
  }

  // Add hot weather items if maximum temperature is high
  if (maxTemp >= 25) {
    temperatureBasedItems.hot.forEach(item => {
      if (shouldIncludeItem(item, answers, tripDuration)) {
        itemsMap.set(item.id, item);
      }
    });
  }

  // Convert map back to array and filter/process items
  Array.from(itemsMap.values()).forEach(item => {
    if (shouldIncludeItem(item, answers, tripDuration)) {
      const quantity = calculateQuantity(item, tripDuration);
      const categoryItems = list.categories[item.category];
      if (categoryItems) {
        categoryItems.push({
          ...item,
          quantity,
        });
      }
    }
  });

  // Add international travel items if origin and destination are in different countries
  if (origin && destination && isInternationalTravel(origin, destination)) {
    internationalTravelItems.forEach(item => {
      if (shouldIncludeItem(item, answers, tripDuration)) {
        itemsMap.set(item.id, item);
      }
    });
  }

  return list;
}

function isInternationalTravel(origin: string, destination: string): boolean {
  // Extract country codes from the city strings (assuming format "City, Country")
  const originCountry = origin.split(',').pop()?.trim() || '';
  const destCountry = destination.split(',').pop()?.trim() || '';
  
  return originCountry !== destCountry && originCountry !== '' && destCountry !== '';
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
  if (item.conditions?.swimming !== undefined) {
    if (item.conditions.swimming !== answers.swimming) return false;
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
      // Handle socks as a special case
      if (item.name.toLowerCase().includes('socks')) {
        // If we already have a socks item, don't add more
        if (item.name.toLowerCase().includes('dress') || 
            item.name.toLowerCase().includes('wool') || 
            item.name.toLowerCase().includes('thermal')) {
          return 1; // Special socks get 1 pair
        }
        return Math.min(tripDuration + 2, 10); // Regular socks get trip duration + 2, max 7
      }
      
      if (item.name.toLowerCase().includes('underwear')) {
        return Math.min(tripDuration + 2, 10); // Pack for each day plus 2 extra, max 7
      }
      if (item.name.toLowerCase().includes('shirt') || 
          item.name.toLowerCase().includes('top')) {
        return Math.min(Math.ceil(tripDuration / 2) + 1, 10); // One shirt for every 2 days plus 1 extra, max 5
      }
      break;
    case 'toiletries':
      return 1; // Usually one of each toiletry item
    default:
      return item.quantity;
  }

  return item.quantity;
} 