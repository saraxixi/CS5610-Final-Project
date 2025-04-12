import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel_new';
import SearchResults from './pages/SearchResults';
import Studies from './pages/Studies';
import History from './pages/History';
import Exhibitions from './pages/Exhibitions';
import Manuscript from './pages/Manuscript';
import Mural from './pages/Mural';
import { LanguageProvider } from './contexts/LanguageContext';
import "./styles/Global.css";

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
          <Route path="/history" element={<History />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/manuscripts" element={<Manuscript />} />
          <Route path="/murals" element={<Mural />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;