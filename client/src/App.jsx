import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Wrap App
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import SearchResults from "./pages/SearchResults";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import MoviesPage from "./pages/MoviesPage";       
import TVShowsPage from "./pages/TVShowsPage";  


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
          <Navbar />
          
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<><Hero /><MovieGrid /></>} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/tv" element={<TVShowsPage />} />
            </Routes>
          </div>

          <Footer />
          <ChatBot />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App