// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "./models/Movie.js";

dotenv.config();

const items = [
  // --- HOLLYWOOD MOVIES ---
  {
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge.",
    genre: ["Sci-Fi", "Action"],
    releaseYear: 2024,
    rating: 8.8,
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
    type: "movie"
  },
  {
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    genre: ["Drama", "History"],
    releaseYear: 2023,
    rating: 8.5,
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80",
    type: "movie"
  },
  {
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham.",
    genre: ["Action", "Crime"],
    releaseYear: 2022,
    rating: 7.8,
    posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80",
    type: "movie"
  },

  // --- INDIAN MOVIES ---
  {
    title: "RRR",
    description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country.",
    genre: ["Action", "Drama"],
    releaseYear: 2022,
    rating: 9.0,
    posterUrl: "https://images.unsplash.com/photo-1611816055460-618287c870bd?w=500&q=80",
    type: "movie"
  },
  {
    title: "3 Idiots",
    description: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
    genre: ["Comedy", "Drama"],
    releaseYear: 2009,
    rating: 9.2,
    posterUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80",
    type: "movie"
  },
  {
    title: "Dangal",
    description: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.",
    genre: ["Action", "Biography"],
    releaseYear: 2016,
    rating: 8.9,
    posterUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80",
    type: "movie"
  },
  {
    title: "Bahubali",
    description: "In ancient India, an adventurous and daring man becomes involved in a decades old feud between two warring people.",
    genre: ["Action", "War"],
    releaseYear: 2015,
    rating: 8.7,
    posterUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=500&q=80",
    type: "movie"
  },

  // --- HOLLYWOOD TV SHOWS ---
  {
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces.",
    genre: ["Drama", "Fantasy"],
    releaseYear: 2016,
    rating: 8.7,
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80",
    type: "tv"
  },
  {
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    genre: ["Crime", "Drama"],
    releaseYear: 2008,
    rating: 9.5,
    posterUrl: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&q=80",
    type: "tv"
  },

  // --- INDIAN TV SHOWS ---
  {
    title: "Sacred Games",
    description: "A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.",
    genre: ["Crime", "Thriller"],
    releaseYear: 2018,
    rating: 8.7,
    posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80",
    type: "tv"
  },
  {
    title: "Mirzapur",
    description: "Akhandanand Tripathi made millions exporting carpets and became the mafia don of Mirzapur. His son Munna stops at nothing to continue his father's legacy.",
    genre: ["Action", "Crime"],
    releaseYear: 2018,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80",
    type: "tv"
  },
  {
    title: "The Family Man",
    description: "A working man from the National Investigation Agency tries to protect the nation from terrorism, while also keeping his family safe from his secret job.",
    genre: ["Action", "Drama"],
    releaseYear: 2019,
    rating: 8.8,
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80",
    type: "tv"
  },
  {
    title: "Kota Factory",
    description: "Vasu, a 16-year-old, moves to Kota from Vidisha to prepare for the IIT entrance exam. He experiences the life of a student in the city.",
    genre: ["Drama", "Comedy"],
    releaseYear: 2019,
    rating: 9.0,
    // FIXED IMAGE LINK
    posterUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80", 
    type: "tv"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");
    await Movie.deleteMany();
    console.log("Old data cleared...");
    await Movie.insertMany(items);
    console.log("Movies & TV Shows (Indian & Hollywood) added successfully!");
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();