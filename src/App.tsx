import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Partnership from './pages/Partnership';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import ImpactHub from './pages/ImpactHub';
import FlagshipProduct from './pages/FlagshipProduct';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/flagship" element={<FlagshipProduct />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/impact" element={<ImpactHub />} />
      </Routes>
    </Router>
  );
}
