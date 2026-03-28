
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    // Change: movie.id -> movie._id
    <Link to={`/movie/${movie._id}`} className="group relative block">
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
        <img 
          // Change: movie.poster -> movie.posterUrl
          src={movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-300 mt-1">
            <span>⭐ {movie.rating}</span>
            {/* Change: movie.year -> movie.releaseYear */}
            <span>{movie.releaseYear}</span>
          </div>
          <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-semibold transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;