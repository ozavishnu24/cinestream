const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-red-600 font-bold text-2xl mb-4">CINESTREAM</h3>
          <p className="text-gray-500 text-sm">Your ultimate destination for movies and TV shows.</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/movies" className="hover:text-white">Movies</a></li>
            <li><a href="/tv" className="hover:text-white">TV Shows</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white text-2xl">📘</a>
            <a href="#" className="hover:text-white text-2xl">🐦</a>
            <a href="#" className="hover:text-white text-2xl">📷</a>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-600 text-xs mt-8">
        © 2024 CineStream Project. Built with React & Node.js.
      </div>
    </footer>
  );
};

export default Footer;
