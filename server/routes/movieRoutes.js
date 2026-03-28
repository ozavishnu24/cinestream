// server/routes/movieRoutes.js
import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// @route   GET /api/movies (and /api/movies?type=tv)
router.get("/", async (req, res) => {
  try {
    const { type } = req.query; // Get the type from URL query (?type=tv)
    
    let filter = {};
    if (type) {
      filter.type = type; // If type is sent, filter by it
    }

    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/movies/search?query=batman
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const movies = await Movie.find({
      title: { $regex: query, $options: "i" } // Case-insensitive search
    });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/movies/:id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;