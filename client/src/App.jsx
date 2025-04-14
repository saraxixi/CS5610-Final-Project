import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel_new';
import SearchResults from './components/SearchResults';
import Studies from './pages/Studies';
import Exhibitions from './pages/Exhibitions';
import Manuscript from './pages/Manuscript';
// Import new mural pages
import AnimalMuralsPage from './pages/AnimalMuralsPage';
import DanceMuralsPage from './pages/DanceMuralsPage';
import ArchitectureMuralsPage from './pages/ArchitectureMuralsPage';
import FlyingApsarasMuralsPage from './pages/FlyingApsarasMuralsPage';
import { LanguageProvider } from './contexts/LanguageContext';

import MuralDetailPage from './pages/MuralDetailPage';
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
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/manuscript" element={<Manuscript />} />
          
          {/* Mural routes with original URL pattern */}
          <Route path="/mural/animal" element={<AnimalMuralsPage />} />
          <Route path="/mural/dance" element={<DanceMuralsPage />} />
          <Route path="/mural/architecture" element={<ArchitectureMuralsPage />} />
          <Route path="/mural/flying" element={<FlyingApsarasMuralsPage />} />

          <Route path="/murals/:id" element={<MuralDetailPage />} />
          
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;