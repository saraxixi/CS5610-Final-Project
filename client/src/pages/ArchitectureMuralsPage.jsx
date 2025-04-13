import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MuralCard from '../components/MuralCard';
import "../styles/MuralPage.css";

const ArchitectureMuralsPage = () => {
  const [murals, setMurals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMurals = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/murals');
        
        // Filter only architecture murals
        const architectureMurals = response.data.filter(mural => mural.subcategory === 'architecture');
        
        // Sort by rating (highest first)
        const sortedMurals = architectureMurals.sort((a, b) => b.rating - a.rating);
        
        setMurals(sortedMurals);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch murals. Please try again later.');
        setLoading(false);
        console.error('Error fetching murals:', err);
      }
    };
    
    fetchMurals();
  }, []);
  
  if (loading) {
    return (
      <div className="murals-page">
        <Navbar />
        <div className="murals-container">
          <div className="loading-container">
            <div className="loader"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="murals-page">
        <Navbar />
        <div className="murals-container">
          <div className="error-message">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="murals-page">
      <Navbar />
      <div className="murals-container">
        <header className="page-header">
          <h1 className="page-title">Architectural Features</h1>
          <p className="page-subtitle">
            Discover the architectural elements depicted in the Mogao Caves
          </p>
        </header>
        
        <div className="murals-grid">
          {murals.length > 0 ? (
            murals.map(mural => (
              <MuralCard key={mural._id} mural={mural} />
            ))
          ) : (
            <div className="no-results">
              No architecture murals found.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArchitectureMuralsPage;