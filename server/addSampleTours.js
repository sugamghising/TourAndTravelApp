// Sample script to add tours to the database
// Run this with: node addSampleTours.js

const tours = [
  {
    title: "Everest Base Camp Trek",
    description:
      "Experience the ultimate Himalayan adventure with a 14-day trek to the base of Mount Everest, the world's highest peak. Journey through Sherpa villages, ancient monasteries, and breathtaking mountain landscapes.",
    location: "Everest Region, Nepal",
    price: 1299.99,
    duration: "14 days",
    images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800"],
    maxGroupSize: 12,
    availableDates: [
      "2025-11-15T00:00:00.000Z",
      "2025-12-01T00:00:00.000Z",
      "2026-01-15T00:00:00.000Z",
    ],
  },
  {
    title: "Annapurna Circuit Trek",
    description:
      "One of the world's most diverse trekking routes, the Annapurna Circuit offers stunning views of the Annapurna massif and takes you through lush forests, arid landscapes, and high mountain passes.",
    location: "Annapurna Region, Nepal",
    price: 999.99,
    duration: "12 days",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    maxGroupSize: 15,
    availableDates: [
      "2025-11-20T00:00:00.000Z",
      "2025-12-10T00:00:00.000Z",
      "2026-01-20T00:00:00.000Z",
    ],
  },
  {
    title: "Kathmandu Cultural Heritage Tour",
    description:
      "Immerse yourself in the rich culture and history of Kathmandu Valley. Visit UNESCO World Heritage sites, ancient temples, and experience traditional Nepali culture and cuisine.",
    location: "Kathmandu Valley, Nepal",
    price: 499.99,
    duration: "5 days",
    images: ["https://images.unsplash.com/photo-1558447105-615aaed2b0f3?w=800"],
    maxGroupSize: 20,
    availableDates: [
      "2025-11-10T00:00:00.000Z",
      "2025-11-25T00:00:00.000Z",
      "2025-12-05T00:00:00.000Z",
      "2025-12-20T00:00:00.000Z",
    ],
  },
  {
    title: "Langtang Valley Trek",
    description:
      "Known as the 'Valley of Glaciers', Langtang offers stunning mountain scenery close to Kathmandu. Trek through rhododendron forests, traditional Tamang villages, and high alpine meadows.",
    location: "Langtang Region, Nepal",
    price: 799.99,
    duration: "8 days",
    images: [
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
    ],
    maxGroupSize: 15,
    availableDates: [
      "2025-11-18T00:00:00.000Z",
      "2025-12-02T00:00:00.000Z",
      "2025-12-18T00:00:00.000Z",
    ],
  },
  {
    title: "Poon Hill Sunrise Trek",
    description:
      "Perfect for beginners! A short trek offering spectacular sunrise views over the Annapurna and Dhaulagiri ranges. Experience authentic mountain villages and warm Gurung hospitality.",
    location: "Ghorepani, Nepal",
    price: 399.99,
    duration: "4 days",
    images: ["https://images.unsplash.com/photo-1552799446-159ba9523315?w=800"],
    maxGroupSize: 20,
    availableDates: [
      "2025-11-08T00:00:00.000Z",
      "2025-11-15T00:00:00.000Z",
      "2025-11-22T00:00:00.000Z",
      "2025-12-01T00:00:00.000Z",
    ],
  },
  {
    title: "Manaslu Circuit Trek",
    description:
      "One of Nepal's most spectacular and less-crowded trekking routes. Circle the eighth highest mountain in the world through remote villages, lush valleys, and high mountain passes.",
    location: "Manaslu Region, Nepal",
    price: 1499.99,
    duration: "16 days",
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
    ],
    maxGroupSize: 10,
    availableDates: ["2025-11-12T00:00:00.000Z", "2025-12-05T00:00:00.000Z"],
  },
];

console.log("=== Sample Tours Data ===");
console.log(
  "Copy and paste this data into MongoDB or use the API to create tours:"
);
console.log(JSON.stringify(tours, null, 2));
console.log("\n=== MongoDB Insert Command ===");
console.log("db.tours.insertMany(" + JSON.stringify(tours, null, 2) + ")");
