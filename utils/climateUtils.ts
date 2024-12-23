interface ClimateZone {
  name: string;
  seasonalAdvice: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
  tempRanges: {
    spring: { min: number; max: number };
    summer: { min: number; max: number };
    autumn: { min: number; max: number };
    winter: { min: number; max: number };
  };
}

// Simplified climate zones based on latitude
const climateZones: Record<string, ClimateZone> = {
  tropical: {
    name: "Tropical",
    seasonalAdvice: {
      spring: "Pack for warm and humid weather with possibility of rain",
      summer: "Pack for hot and humid weather with afternoon showers likely",
      autumn: "Pack for warm and humid weather with possibility of rain",
      winter: "Pack for warm weather with lower humidity",
    },
    tempRanges: {
      spring: { min: 23, max: 32 },
      summer: { min: 25, max: 35 },
      autumn: { min: 23, max: 32 },
      winter: { min: 20, max: 30 },
    },
  },
  subtropical: {
    name: "Subtropical",
    seasonalAdvice: {
      spring: "Pack layers for mild to warm weather",
      summer: "Pack for hot and humid weather",
      autumn: "Pack layers for mild to warm weather",
      winter: "Pack warm clothes with some lighter layers",
    },
    tempRanges: {
      spring: { min: 15, max: 25 },
      summer: { min: 20, max: 32 },
      autumn: { min: 15, max: 25 },
      winter: { min: 8, max: 18 },
    },
  },
  temperate: {
    name: "Temperate",
    seasonalAdvice: {
      spring: "Pack layers with rain protection",
      summer: "Pack light clothes with some warm layers",
      autumn: "Pack warm layers with rain protection",
      winter: "Pack warm winter clothing",
    },
    tempRanges: {
      spring: { min: 8, max: 18 },
      summer: { min: 15, max: 25 },
      autumn: { min: 8, max: 18 },
      winter: { min: 0, max: 10 },
    },
  },
  cold: {
    name: "Cold",
    seasonalAdvice: {
      spring: "Pack warm layers with rain protection",
      summer: "Pack light to medium warm clothing",
      autumn: "Pack warm layers with rain protection",
      winter: "Pack very warm winter clothing",
    },
    tempRanges: {
      spring: { min: 0, max: 10 },
      summer: { min: 10, max: 20 },
      autumn: { min: 0, max: 10 },
      winter: { min: -10, max: 5 },
    },
  },
};

export function getClimateZone(latitude: number): string {
  const abs_lat = Math.abs(latitude);
  if (abs_lat <= 23.5) return 'tropical';
  if (abs_lat <= 35) return 'subtropical';
  if (abs_lat <= 55) return 'temperate';
  return 'cold';
}

export function getSeason(date: Date, isNorthernHemisphere: boolean): 'spring' | 'summer' | 'autumn' | 'winter' {
  const month = date.getMonth();
  
  // Northern hemisphere seasons
  if (isNorthernHemisphere) {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }
  
  // Southern hemisphere seasons
  if (month >= 2 && month <= 4) return 'autumn';
  if (month >= 5 && month <= 7) return 'winter';
  if (month >= 8 && month <= 10) return 'spring';
  return 'summer';
}

export function getWeatherAdvice(latitude: number, date: Date): {
  advice: string;
  tempRange: { min: number; max: number };
  confidence: 'high' | 'medium' | 'low';
} {
  const climateZone = climateZones[getClimateZone(latitude)];
  const isNorthernHemisphere = latitude > 0;
  const season = getSeason(date, isNorthernHemisphere);
  
  // Calculate how far in the future the date is
  const daysAhead = Math.floor((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const confidence = daysAhead <= 5 ? 'high' : daysAhead <= 30 ? 'medium' : 'low';

  return {
    advice: climateZone.seasonalAdvice[season],
    tempRange: climateZone.tempRanges[season],
    confidence,
  };
}
