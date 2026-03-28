import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { user, api } = useAuth();
  const [movies, setMovies] = useState([]);

  // Function to fetch watchlist
  const fetchWatchlist = async () => {
    if (user) {
      try {
        const res = await api.get("/api/user/watchlist");
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching watchlist", error);
      }
    }
  };

  // Function to remove movie
  const handleRemove = async (movieId) => {
    try {
      await api.delete(`/api/user/watchlist/${movieId}`);
      // Filter out the removed movie from state to update UI instantly
      setMovies(movies.filter((m) => m._id !== movieId));
    } catch (error) {
      console.error("Error removing movie", error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h2 className="text-2xl mb-4">Please log in to view your watchlist</h2>
        <Link to="/login" className="bg-red-600 px-6 py-2 rounded">Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>
      
      {movies.length === 0 ? (
        <p className="text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="relative group">
              
              {/* Movie Card Link */}
              <Link to={`/movie/${movie._id}`} className="block">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
                  </div>
                </div>
              </Link>

              {/* REMOVE BUTTON (Appears on Hover) */}
              <button 
                onClick={() => handleRemove(movie._id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                title="Remove from Watchlist"
              >
                ✕
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;