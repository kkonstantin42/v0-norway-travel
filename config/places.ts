export interface Place {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  crowdLevel: 'low' | 'medium' | 'high';
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromBergen: number; // in km
  category: string;
  bestTime: string;
}

export const places: Place[] = [
  {
    id: 'trolltunga',
    name: 'Trolltunga',
    shortDescription: 'Iconic rock formation jutting horizontally out of the mountain.',
    description: 'Trolltunga (The Troll\'s Tongue) is one of Norway\'s most spectacular scenic cliffs. The rock formation juts horizontally out of the mountain about 700 meters above Lake Ringedalsvatnet. The hike to Trolltunga is approximately 27 km round trip and takes 10-12 hours. The reward is one of the most photographed spots in Norway with breathtaking views of the surrounding fjords and mountains.',
    images: [
      '/images/trolltunga-1.jpg',
      '/images/trolltunga-2.jpg',
    ],
    crowdLevel: 'high',
    coordinates: { lat: 60.1241, lng: 6.7400 },
    distanceFromBergen: 180,
    category: 'Hiking',
    bestTime: 'June - September',
  },
  {
    id: 'preikestolen',
    name: 'Preikestolen',
    shortDescription: 'Dramatic cliff rising 604m above the Lysefjord.',
    description: 'Preikestolen, also known as The Pulpit Rock, is a steep cliff which rises 604 meters above the Lysefjord. The top of the cliff is approximately 25 by 25 meters, almost flat, and is a famous tourist attraction. The hike is about 8 km round trip and takes 4-5 hours, making it more accessible than Trolltunga while still offering spectacular views.',
    images: [
      '/images/preikestolen-1.jpg',
      '/images/preikestolen-2.jpg',
    ],
    crowdLevel: 'high',
    coordinates: { lat: 58.9864, lng: 6.1873 },
    distanceFromBergen: 260,
    category: 'Hiking',
    bestTime: 'April - October',
  },
  {
    id: 'geirangerfjord',
    name: 'Geirangerfjord',
    shortDescription: 'UNESCO World Heritage fjord with stunning waterfalls.',
    description: 'Geirangerfjord is a fjord in the Sunnmøre region of Møre og Romsdal county. It is a UNESCO World Heritage Site since 2005. The fjord is 15 km long and is surrounded by majestic snow-capped mountain peaks, wild waterfalls cascading down steep cliff faces, and lush green vegetation. The Seven Sisters and The Suitor waterfalls are among the most famous.',
    images: [
      '/images/geirangerfjord-1.jpg',
      '/images/geirangerfjord-2.jpg',
    ],
    crowdLevel: 'medium',
    coordinates: { lat: 62.1008, lng: 7.0939 },
    distanceFromBergen: 350,
    category: 'Fjord',
    bestTime: 'May - September',
  },
  {
    id: 'lofoten',
    name: 'Lofoten Islands',
    shortDescription: 'Dramatic mountains rising from the Arctic sea.',
    description: 'The Lofoten Islands are an archipelago in northern Norway known for dramatic mountains, open sea, sheltered bays, beaches, and untouched lands. The islands offer excellent fishing, nature attractions including the northern lights and midnight sun, and quaint fishing villages. The area has a rich Viking history and is one of the most scenic regions in Norway.',
    images: [
      '/images/lofoten-1.jpg',
      '/images/lofoten-2.jpg',
    ],
    crowdLevel: 'medium',
    coordinates: { lat: 68.2095, lng: 14.0224 },
    distanceFromBergen: 1100,
    category: 'Islands',
    bestTime: 'Year-round',
  },
  {
    id: 'flam',
    name: 'Flåm Railway',
    shortDescription: 'One of the steepest railway lines in the world.',
    description: 'The Flåm Railway (Flåmsbana) is a 20 km long railway line between Myrdal and Flåm in Aurland, Norway. Due to the steep gradient, it is one of the steepest standard gauge railway lines in the world. The journey offers spectacular views of mountains, waterfalls, and deep valleys. The train stops at Kjosfossen waterfall where you can step out and admire the view.',
    images: [
      '/images/flam-1.jpg',
      '/images/sognefjord-1.jpg',
    ],
    crowdLevel: 'medium',
    coordinates: { lat: 60.8628, lng: 7.1137 },
    distanceFromBergen: 170,
    category: 'Railway',
    bestTime: 'Year-round',
  },
  {
    id: 'bergen',
    name: 'Bryggen, Bergen',
    shortDescription: 'UNESCO-listed colorful wooden houses from the Hanseatic era.',
    description: 'Bryggen in Bergen is a series of commercial buildings lining up the eastern side of the Vågen harbor. Bryggen has since 1979 been on the UNESCO list for World Cultural Heritage sites. The colorful wooden buildings date back to the Hanseatic League\'s trading empire. Today, the area houses museums, shops, restaurants, and provides a beautiful walkway along the harbor.',
    images: [
      '/images/bryggen-1.jpg',
      '/images/geirangerfjord-1.jpg',
    ],
    crowdLevel: 'high',
    coordinates: { lat: 60.3975, lng: 5.3220 },
    distanceFromBergen: 0,
    category: 'Cultural',
    bestTime: 'Year-round',
  },
  {
    id: 'nordkapp',
    name: 'North Cape',
    shortDescription: 'The northernmost point of mainland Europe.',
    description: 'North Cape (Nordkapp) is often referred to as the northernmost point of Europe (though technically that honor belongs to nearby Knivskjellodden). The 307m high cliff offers stunning views of the Barents Sea and is a popular destination to experience the midnight sun in summer and northern lights in winter. The North Cape Hall provides exhibitions about the area\'s history and nature.',
    images: [
      '/images/nordkapp-1.jpg',
      '/images/lofoten-2.jpg',
    ],
    crowdLevel: 'low',
    coordinates: { lat: 71.1685, lng: 25.7838 },
    distanceFromBergen: 2100,
    category: 'Landmark',
    bestTime: 'May - August',
  },
  {
    id: 'sognefjord',
    name: 'Sognefjord',
    shortDescription: 'Norway\'s longest and deepest fjord.',
    description: 'Sognefjord is the largest fjord in Norway and the second longest in the world, stretching 205 km inland. At its deepest, it measures 1,308 meters. The fjord is surrounded by steep mountains that rise up to 1,700 meters above the water. Along its shores, you\'ll find charming villages, stave churches, and access to some of Norway\'s best hiking trails including the famous Aurlandsdalen valley.',
    images: [
      '/images/sognefjord-1.jpg',
      '/images/flam-1.jpg',
    ],
    crowdLevel: 'low',
    coordinates: { lat: 61.1872, lng: 7.1031 },
    distanceFromBergen: 150,
    category: 'Fjord',
    bestTime: 'May - September',
  },
];
