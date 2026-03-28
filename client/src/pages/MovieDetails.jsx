import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Ensure path is correct

const MovieDetails = () => {
  const { id } = useParams();
  const { user, api } = useAuth(); // api should be an axios instance with auth headers
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // 1. Fetch Movie Details
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(res.data);

        // 2. Check if movie is already in user's watchlist (if logged in)
        if (user) {
          try {
            const watchlistRes = await api.get("/api/user/watchlist");
            const isAdded = watchlistRes.data.some(item => item._id === id);
            setInWatchlist(isAdded);
          } catch (err) {
            console.error("Error checking watchlist status:", err);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, user, api]);

  const handleAddToWatchlist = async () => {
    if (!user) {
      alert("Please login to add movies to your watchlist");
      return;
    }
    try {
      await api.post("/api/user/watchlist", { movieId: movie._id });
      setInWatchlist(true);
      alert("Added to Watchlist!");
    } catch (err) {
      console.error("Failed to add to watchlist:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      <span className="ml-4 text-xl">Loading...</span>
    </div>
  );

  if (!movie) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Movie Not Found</h2>
      <Link to="/" className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition">Go Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative -mt-64 z-10 px-6 md:px-12 max-w-6xl mx-auto pb-20">
        <h1 className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-lg text-white">
          {movie.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-8">
          <span className="bg-red-600 px-2 py-1 rounded text-white text-xs font-bold tracking-wider">HD</span>
          <span className="flex items-center text-yellow-500 font-bold text-lg">
            ⭐ {movie.rating}
          </span>
          <span className="text-gray-400">|</span>
          <span>{movie.releaseYear}</span>
          <span className="text-gray-400">|</span>
          <div className="flex gap-2">
            {movie.genre?.map((g, index) => (
              <span key={index} className="border border-gray-600 px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition">
                {g}
              </span>
            ))}
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl">
          {movie.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <a 
            href={movie.trailerUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105"
          >
            <span className="mr-2 text-xl">▶</span> Watch Now
          </a>
          
          <button 
            onClick={handleAddToWatchlist}
            disabled={inWatchlist}
            className={`flex items-center justify-center font-bold py-4 px-10 rounded-lg transition-all backdrop-blur-sm ${
              inWatchlist 
                ? "bg-gray-600/50 text-gray-400 cursor-not-allowed" 
                : "bg-gray-700/80 hover:bg-gray-600 text-white"
            }`}
          >
            <span className="mr-2 text-xl">{inWatchlist ? "✓" : "+"}</span> 
            {inWatchlist ? "In My List" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;