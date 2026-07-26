import { CabType, DestinationType, TourPackageType, HomestayResortType } from "./types";

export const destinations: DestinationType[] = [
  {
    id: "munnar",
    name: "Munnar",
    tagline: "The Tea Garden Paradise of Kerala",
    description: "Nestled 1,600 meters above sea level, Munnar is a breathtaking hill station famous for its endless rolling tea plantations, mist-covered valleys, waterfalls, and rare wildlife like the Nilgiri Tahr.",
    bestSeason: "September to May",
    distanceFromKochi: "130 km",
    transitTime: "4.5 hours winding mountain drive",
    topAttractions: ["Eravikulam National Park", "Mattupetty Dam", "Tea Museum", "Top Station", "Letchmi Hills Trail"],
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "alleppey",
    name: "Alleppey (Alappuzha)",
    tagline: "The Venice of the East",
    description: "Famous for its intricate network of emerald canals, lagoons, and palm-fringed backwaters. Renting a traditional luxury Kettuvallam (houseboat) here is the ultimate iconic Kerala experience.",
    bestSeason: "October to March",
    distanceFromKochi: "55 km",
    transitTime: "1.5 hours smooth coastal drive",
    topAttractions: ["Punnamada Lake Backwaters", "Alleppey Beach & Lighthouse", "Marari Beach", "Pathiramanal Island Bird Watching"],
    imageUrl: "https://images.unsplash.com/photo-1593693411515-c202e974eb27?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kovalam",
    name: "Kovalam",
    tagline: "Iconic Crescent Beaches & Ayurvedic Healing",
    description: "A world-renowned beach destination featuring three adjacent crescent beaches. Famous for its massive red-and-white striped lighthouse, golden sands, and authentic Ayurvedic wellness resorts.",
    bestSeason: "November to February",
    distanceFromKochi: "220 km",
    transitTime: "5 hours drive (or direct fly-in to Trivandrum)",
    topAttractions: ["Lighthouse Beach", "Hawah Beach", "Samudra Beach", "Ayurvedic Massage Centers", "Vellayani Lake"],
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "thekkady",
    name: "Thekkady",
    tagline: "Spice Gardens & Periyar Wildlife Reserve",
    description: "Kerala's premier jungle escape. Explore the Periyar Tiger Reserve via lake cruises, walk through organic spice plantations yielding cardamom, pepper, and cinnamon, and enjoy bamboo rafting.",
    bestSeason: "September to April",
    distanceFromKochi: "155 km",
    transitTime: "5 hours scenic spice hills drive",
    topAttractions: ["Periyar Lake Boating & Tiger Reserve", "Elephant Junction", "Spice Plantation Walks", "Bamboo Rafting & Jungle Patrol"],
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "varkala",
    name: "Varkala",
    tagline: "Majestic Red Cliffs & Sacred Springwaters",
    description: "A stunning coastal town famous for its dramatic red cliffs overlooking the Arabian Sea, hippie cliffside cafes, surfing spots, and the ancient 2,000-year-old Janardanaswamy Temple.",
    bestSeason: "October to April",
    distanceFromKochi: "170 km",
    transitTime: "4 hours drive south",
    topAttractions: ["Papanasam Cliff Beach", "Janardanaswamy Temple", "Kapil Lake & Backwaters", "Anjengo Fort", "Cliff Cafe Sunset Trail"],
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800"
  }
];

export const cabs: CabType[] = [
  {
    id: "etios",
    name: "Toyota Etios / Maruti Dzire",
    category: "Sedan",
    seats: 4,
    luggage: 2,
    ratePerKm: 16,
    baseFare: 2400,
    freeKmPerDay: 150,
    driverAllowancePerDay: 400,
    features: [
      "Well-maintained Sedan",
      "Air Conditioned (A/C)",
      "Polite Tourist-certified Driver",
      "Carrier for luggage if needed",
      "Aux / Bluetooth Audio Connection",
      "Perfect for couples or small families"
    ],
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    category: "SUV",
    seats: 7,
    luggage: 4,
    ratePerKm: 24,
    baseFare: 3600,
    freeKmPerDay: 150,
    driverAllowancePerDay: 450,
    features: [
      "Premium, Spacious SUV",
      "Dual Air Conditioning",
      "Extremely comfortable rear Captain chairs",
      "Highly experienced mountain driver",
      "Mineral Water & Tissue box complimentary",
      "Perfect for long distances & families"
    ],
    imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "tempo",
    name: "Force Tempo Traveller (A/C)",
    category: "Tempo",
    seats: 12,
    luggage: 8,
    ratePerKm: 28,
    baseFare: 4800,
    freeKmPerDay: 150,
    driverAllowancePerDay: 500,
    features: [
      "12-Seater Luxury Pushback Seats",
      "High-power Air Conditioning",
      "LCD Screen & Sound System",
      "Large top and rear luggage carrier",
      "Ideal for groups, corporate outings, or joint families",
      "Friendly English & Hindi speaking driver"
    ],
    imageUrl: "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?auto=format&fit=crop&q=80&w=600"
  }
];

export const packages: TourPackageType[] = [
  {
    id: "classic-kerala",
    name: "Classic Kerala Hills & Backwaters Tour",
    duration: "5 Nights / 6 Days",
    destinations: ["Kochi", "Munnar", "Thekkady", "Alleppey Houseboat"],
    priceStarting: 16500,
    highlights: [
      "Stay 2 nights in romantic, mist-clad Munnar hills",
      "Jungle boat cruise in Periyar Tiger Reserve",
      "21-hour overnight cruise on a traditional private luxury Houseboat",
      "Cochin sightseeing: Dutch Palace, Fort Kochi Chinese Fishing Nets"
    ],
    includes: [
      "A/C Private Sedan for the entire tour including transfers",
      "Fuel, toll, parking, and driver allowance",
      "Premium double room stays on CP basis (breakfast included)",
      "All meals included on the houseboat day",
      "Sightseeing guides at historical locations"
    ],
    recommendedCab: "Toyota Etios / Maruti Dzire",
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kerala-romance",
    name: "Honeymoon In Kerala - Hills, Houseboat & Beaches",
    duration: "6 Nights / 7 Days",
    destinations: ["Munnar Treehouse", "Alleppey Houseboat", "Kovalam Beach", "Kochi"],
    priceStarting: 24500,
    highlights: [
      "1 Night stay in a luxury wooden Treehouse in Munnar",
      "Candlelit dinner, flower decoration, & honeymoon cake in Houseboat",
      "Romantic sunset walk on Kovalam Lighthouse Beach",
      "Ayurvedic massage package at an ocean-view resort"
    ],
    includes: [
      "Premium A/C SUV (Innova Crysta) with professional driver",
      "Honeymoon special treats (Candlelit dinner, cake, fresh fruit basket)",
      "Premium resort stays with breakfast",
      "Complimentary traditional Ayurveda massage for two"
    ],
    recommendedCab: "Toyota Innova Crysta",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "quick-escape",
    name: "Short Weekend Retreat - Munnar & Cochin",
    duration: "2 Nights / 3 Days",
    destinations: ["Kochi", "Munnar Hillstation"],
    priceStarting: 8900,
    highlights: [
      "Perfect escape from Kochi, Bengaluru, or Chennai",
      "Visit Cheeyappara & Valara waterfalls",
      "Tea estate safari & Munnar Town spice shopping",
      "Professional pickup & drop directly at COK airport / railway station"
    ],
    includes: [
      "A/C Sedan with dedicated local tourist driver",
      "2 Nights stay at Munnar standard cottage",
      "Daily breakfast",
      "Vite-customized scheduling & sightseeing logistics"
    ],
    recommendedCab: "Toyota Etios / Maruti Dzire",
    imageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&q=80&w=800"
  }
];

export const homestays: HomestayResortType[] = [
  {
    id: "heritage-tharavad",
    name: "Mariya Tharavad Heritage Homestay",
    type: "Heritage Homestay",
    location: "Alleppey Backwaters",
    pricePerNight: 3200,
    rating: 4.9,
    features: ["150-Year Old Teakwood Architecture", "Organic Backyard Farm", "Host Cooked Traditional Kerala Meals", "Canoe Ride Included"],
    description: "Immerse yourself in authentic Kerala life inside this carefully preserved traditional wood tharavad. Hosted by the Kurup family, enjoy warm hospitality, home-cooked Karimeen Pollichathu, and spectacular backwater canal views.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "tea-valley-resort",
    name: "The Leaf Resort & Spa Munnar",
    type: "Luxury Resort",
    location: "Munnar Hills",
    pricePerNight: 6500,
    rating: 4.8,
    features: ["Infinity Pool Overlooking Tea Valleys", "In-house Ayurvedic Spa", "Organic Tea Tasting Walks", "Private Cottages"],
    description: "Perched majestically on the misty slopes of Munnar, The Leaf Resort offers peaceful luxury. Relax in your private cottage with views of organic orchards, indulge in rejuvenating spa sessions, and swim in our heated outdoor pool.",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "varkala-cliff-nest",
    name: "Niranjana Cliffside Eco Resort",
    type: "Luxury Resort",
    location: "Varkala Cliff",
    pricePerNight: 4800,
    rating: 4.7,
    features: ["100% Ocean View", "Yoga & Meditation Deck", "Direct Private Beach Access", "Vegan/Organic Dining"],
    description: "Located right on Varkala's famous cliff edge. Step out of your beach cottage directly onto Papanasam beach. Known for sunrise yoga, clean oceans, surf boards, and a peaceful green lifestyle.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
  }
];
