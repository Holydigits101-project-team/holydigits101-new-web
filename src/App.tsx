import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Partnership from './pages/Partnership';
import Scout from './pages/Scout';
import About from './pages/About';
import Contact from './pages/Contact';
import ImpactHub from './pages/ImpactHub';
import FlagshipProduct from './pages/FlagshipProduct';
import TeamMembers from './pages/TeamMembers';
import Waitlist from './pages/Waitlist';

// import Team from './pages/Team';
// import Gallery from './pages/Gallery';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/flagship" element={<FlagshipProduct />} />
        <Route path="/scout" element={<Scout />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team-members" element={<TeamMembers />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/impact" element={<ImpactHub />} />
      </Routes>
    </Router>
  );
}
