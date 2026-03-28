import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-red-600 text-3xl font-bold tracking-wider cursor-pointer">
          CINESTREAM
        </Link>
        <div className="hidden md:flex space-x-6 text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/movies" className="hover:text-white transition">Movies</Link>
          <Link to="/tv" className="hover:text-white transition">TV Shows</Link>
          <Link to="/watchlist" className="hover:text-white transition">My List</Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="bg-gray-800/60 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-red-500 w-48 md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-400">🔍</button>
        </form>

        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-white hidden md:block">Hi, {user.name}</span>
            <button 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;