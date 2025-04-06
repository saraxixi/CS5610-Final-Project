import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import GoogleTranslate from './GoogleTranslate';

const Navbar = () => {
  const isAdmin = localStorage.getItem("userRole") === "admin";
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
=======
  const isLoggedIn = !!localStorage.getItem("userId");
>>>>>>> main

  return (
    <header className='navbar'>
      <div className='navbar-container'>
        <nav className='navbar-menu'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/studies">Studies</Link></li>
            <li><Link to="/history">History</Link></li>
            <li className="dropdown">
              <Link to="/mural">Mural</Link>
              <ul className='dropdown-menu'>
                <li><Link to="/mural/animal">Animal</Link></li>
                <li><Link to="/mural/dance">Dance</Link></li>
                <li><Link to="/mural/architecture">Architecture</Link></li>
                <li><Link to="/mural/flying">Flying</Link></li>
              </ul>
            </li>
            <li><Link to="/document">Document</Link></li>
            <li><Link to="/creation">Creation</Link></li>
            <GoogleTranslate />
          </ul>
        </nav>
        <div className='navbar-right'>
<<<<<<< HEAD
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder='search' 
              className='search-box'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {localStorage.getItem("userId") ? (
=======
          <input type="text" placeholder='search' className='search-box' />
          {isLoggedIn ? (
>>>>>>> main
            <>
              {isAdmin && (
                <Link to="/admin" className="admin-button">
                  Admin Panel
                </Link>
              )}
<<<<<<< HEAD
=======
              <Link to="/profile" className="profile-btn">
                Profile
              </Link>
>>>>>>> main
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
