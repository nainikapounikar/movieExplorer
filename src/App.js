import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/theme.css";
import "./styles/custom-theme.css";
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import WatchlistPage from './pages/Watchlist'; // if exists or create one

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
