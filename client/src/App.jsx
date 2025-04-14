import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel_new';
import SearchResults from './pages/SearchResults';
import Studies from './pages/Studies';
import Exhibitions from './pages/Exhibitions';
import Manuscript from './pages/Manuscript';
import Artifacts from './pages/Artifacts';
import ArtifactDetails from './pages/ArtifactDetail';
import PaymentSuccess from './pages/PaymentSuccess';
// Import new mural pages
import AnimalMuralsPage from './pages/AnimalMuralsPage';
import DanceMuralsPage from './pages/DanceMuralsPage';
import ArchitectureMuralsPage from './pages/ArchitectureMuralsPage';
import FlyingApsarasMuralsPage from './pages/FlyingApsarasMuralsPage';
import { LanguageProvider } from './contexts/LanguageContext';
import "./styles/Global.css";

// Import firebase config
import { app, analytics, storage } from './firebase';

console.log("Firebase Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("All env variables:", import.meta.env);

function App() {
  return (
    <LanguageProvider>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/manuscript" element={<Manuscript />} />
          <Route path="/artifacts" element={<Artifacts />} />
          <Route path="/artifacts/:id" element={<ArtifactDetails />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          
          {/* Mural routes with original URL pattern */}
          <Route path="/mural/animal" element={<AnimalMuralsPage />} />
          <Route path="/mural/dance" element={<DanceMuralsPage />} />
          <Route path="/mural/architecture" element={<ArchitectureMuralsPage />} />
          <Route path="/mural/flying" element={<FlyingApsarasMuralsPage />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;