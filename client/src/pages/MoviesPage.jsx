import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Fetch only type=movie
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/movies?type=movie`);
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;