
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: [{ type: String }], // Array of strings like ["Action", "Sci-Fi"]
  releaseYear: { type: Number },
  rating: { type: Number },
  posterUrl: { type: String },
  trailerUrl: { type: String },
  type: { type: String, enum: ['movie', 'tv'], default: 'movie' },
});

export default mongoose.model("Movie", movieSchema);