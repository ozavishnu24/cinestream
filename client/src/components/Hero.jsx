
const Hero = () => {
  // Mock data for the hero section
  const movie = {
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future.",
    releaseYear: 2024,
    rating: 8.8,
    genres: ["Sci-Fi", "Action", "Adventure"],
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop" // Placeholder image
  };

  return (
    <div 
      className="relative h-[85vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${movie.backdrop})` }}
    >
      {/* Gradient Overlay to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        
        <div className="flex items-center space-x-4 text-gray-200 mb-4">
          <span className="text-yellow-400 font-semibold">⭐ {movie.rating}</span>
          <span>|</span>
          <span>{movie.releaseYear}</span>
          <span>|</span>
          <span>{movie.genres.join(", ")}</span>
        </div>

        <p className="text-lg text-gray-300 mb-8 line-clamp-3">
          {movie.overview}
        </p>

        <div className="flex space-x-4">
          <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
            ▶ Watch Now
          </button>
          <button className="flex items-center bg-gray-700/80 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            + Add to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;