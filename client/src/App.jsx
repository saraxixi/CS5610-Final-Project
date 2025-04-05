import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import { LanguageProvider } from './contexts/LanguageContext';
import Chatbot from './components/Chatbot';
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
        </Routes>
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}

export default App;