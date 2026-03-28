import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const TVShowsPage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      // Fetch only type=tv
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/movies?type=tv`);
      setShows(res.data);
    };
    fetchShows();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-white mb-8">TV Shows</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {shows.map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
    </div>
  );
};

export default TVShowsPage;