import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import GoogleTranslate from './GoogleTranslate';

const Navbar = () => {
  const isAdmin = localStorage.getItem("userRole") === "admin";
  const isLoggedIn = !!localStorage.getItem("userId");
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className='navbar'>
      <div className='navbar-container'>
        <nav className='navbar-menu'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/studies">Studies</Link></li>
            <li><Link to="/exhibitions">Exhibitions</Link></li>
            <li className="dropdown">
              <Link to="/mural/animal">Murals</Link>
              <ul className='dropdown-menu'>
                <li><Link to="/mural/animal">Animals</Link></li>
                <li><Link to="/mural/dance">Dance</Link></li>
                <li><Link to="/mural/architecture">Architecture</Link></li>
                <li><Link to="/mural/flying">Flying Apsaras</Link></li>
              </ul>
            </li>
            <li><Link to="/manuscript">Manuscripts</Link></li>
            <li><Link to="/artifacts">Artifacts</Link></li>
            <GoogleTranslate />
          </ul>
        </nav>
        <div className='navbar-right'>
          <form onSubmit={handleSearch} className='search-form'>
            <input
              type="text"
              placeholder="Search"
              className="search-box"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="admin-button">
                  Admin Panel
                </Link>
              )}
              <Link to="/profile" className="profile-btn">
                Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="login-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className='login-btn'>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;