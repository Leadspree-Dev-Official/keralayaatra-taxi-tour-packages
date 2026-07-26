export interface CabType {
  id: string;
  name: string;
  category: "Sedan" | "SUV" | "Tempo" | "Luxury";
  seats: number;
  luggage: number;
  ratePerKm: number;
  baseFare: number;
  freeKmPerDay: number;
  driverAllowancePerDay: number;
  features: string[];
  imageUrl: string;
}

export interface DestinationType {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestSeason: string;
  distanceFromKochi: string;
  transitTime: string;
  topAttractions: string[];
  imageUrl: string;
}

export interface TourPackageType {
  id: string;
  name: string;
  duration: string;
  destinations: string[];
  priceStarting: number;
  highlights: string[];
  includes: string[];
  imageUrl: string;
  recommendedCab: string;
}

export interface HomestayResortType {
  id: string;
  name: string;
  type: "Heritage Homestay" | "Luxury Resort" | "Treehouse" | "Houseboat";
  location: string;
  pricePerNight: number;
  rating: number;
  features: string[];
  description: string;
  imageUrl: string;
}

export interface BookingInquiryType {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  startDate: string;
  durationDays: number;
  travelersCount: number;
  serviceRequested: "Taxi" | "Tour Package" | "Homestay/Resort" | "Full Custom Trip";
  serviceName: string; // package name, cab name or homestay name
  cabPreference?: string;
  notes?: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  dateSubmitted: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  transitTime: string;
  transitCostEst: number;
  stayRecommendation: string;
}

export interface GeneratedItineraryType {
  title: string;
  overview: string;
  days: ItineraryDay[];
  recommendedFleet: string;
  totalEstimatedCostRange: string;
  curatedTips: string[];
}
