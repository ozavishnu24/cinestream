import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchMovies = async () => {
      if (query) {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/movies/search?query=${query}`);
        setMovies(res.data);
        setLoading(false);
      }
    };
    searchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-white mb-8">
        Search Results for: <span className="text-red-500">{query}</span>
      </h1>
      
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;