import express from "express";
import authMiddleware from "../middleware/auth.js"; // We will create this next
import User from "../models/User.js";
import Movie from "../models/Movie.js";

const router = express.Router();

// Get User Watchlist
router.get("/watchlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("watchlist");
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to Watchlist
router.post("/watchlist", authMiddleware, async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }
    res.json({ message: "Added to watchlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from Watchlist
router.delete("/watchlist/:movieId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.watchlist = user.watchlist.filter(id => id.toString() !== req.params.movieId);
    await user.save();
    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;