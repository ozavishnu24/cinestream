
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/movies`);
        setMovies(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="px-6 md:px-12 py-8 bg-gray-900">
      <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
      
      {loading ? (
        <div className="text-center text-gray-400 py-10">Loading movies...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            // Change: key={movie.id} -> key={movie._id}
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;