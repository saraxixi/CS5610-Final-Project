import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import SearchResults from './pages/SearchResults';
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
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;