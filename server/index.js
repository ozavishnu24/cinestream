import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";      
import userRoutes from "./routes/userRoutes.js";      
import Movie from "./models/Movie.js";                

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- UPDATED MIDDLEWARE ---
app.use(cors({
    origin: "https://cinestream-six-psi.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Database Connection
connectDB();

// --- ROUTES ---
app.get("/", (req, res) => res.send("CineStream API is running..."));
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Chatbot Route
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are a movie expert. Answer this: ${prompt}` }] }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const text = data.candidates[0].content.parts[0].text;
      return res.json({ reply: text });
    } else {
      throw new Error("Gemini model not available");
    }

  } catch (error) {
    console.log("AI unavailable, switching to Local Smart Search...");
    try {
      const keywords = prompt.toLowerCase();
      let foundMovies = [];

      if (keywords.includes("action")) {
        foundMovies = await Movie.find({ genre: "Action" }).limit(3);
      } else if (keywords.includes("comedy")) {
        foundMovies = await Movie.find({ genre: "Comedy" }).limit(3);
      } else if (keywords.includes("sci-fi") || keywords.includes("scifi")) {
        foundMovies = await Movie.find({ genre: "Sci-Fi" }).limit(3);
      } else if (keywords.includes("drama")) {
        foundMovies = await Movie.find({ genre: "Drama" }).limit(3);
      } else {
        foundMovies = await Movie.aggregate([{ $sample: { size: 3 } }]);
      }

      if (foundMovies.length > 0) {
        const movieTitles = foundMovies.map(m => m.title).join(", ");
        return res.json({ reply: `I'm currently offline, but based on your request, I recommend checking out: ${movieTitles}. Enjoy!` });
      } else {
        return res.json({ reply: "Sorry, I couldn't find any movies matching that description in our library." });
      }
    } catch (dbError) {
      return res.status(500).json({ reply: "I'm having trouble connecting to my brain right now. Please try again later." });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});