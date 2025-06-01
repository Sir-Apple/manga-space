import './App.css';
import Home from './Components/Home';
import DetailsPage from './Components/DetailsPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Genre from './Components/Genre';
import Trending from './Components/Trending';
import Search from './Components/Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manga/:slug" element={<DetailsPage />} />
        <Route path="/genre/:slug" element={<Genre />} />
        <Route path="/trending/:slug" element={<Trending />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
