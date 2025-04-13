import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MuralCard from '../components/MuralCard';
import "../styles/MuralPage.css";
import animalBanner from '../assets/images/animal-banner.png';

const AnimalMuralsPage = () => {
  const [murals, setMurals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMurals = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/murals');
        
        // Filter only animal murals
        const animalMurals = response.data.filter(mural => 
          mural.subcategory && mural.subcategory.toLowerCase() === 'animal'
        );
        
        // Sort by rating (highest first)
        const sortedMurals = animalMurals.sort((a, b) => b.rating - a.rating);
        
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
    <div
      className="mural-hero"
      style={{ backgroundImage: `url(${animalBanner})` }}
    >
      <div className="mural-hero-content">
        <h1>Animal</h1>
        <p>
        The animal paintings in the Dunhuang Caves are centered around Buddhist themes. 
        Exploring the history of these artworks not only offers a glimpse into 
        the artistic styles and techniques of ancient times but also reveals the care and 
        compassion that the artists poured into their creations.
        </p>
        <header className="page-header align-left small-header">
        <h1 className="page-title">Animal Murals</h1>
        <div className="title-underline"></div>
        <p className="page-subtitle">
          Explore animal-themed murals from the Mogao Caves
        </p>
      </header>
      /</div>
    </div>

    <div className="murals-container">
      <div className="murals-grid">
        {murals.length > 0 ? (
          murals.map(mural => (
            <MuralCard key={mural._id} mural={mural} />
          ))
        ) : (
          <div className="no-results">
            No animal murals found.
          </div>
        )}
      </div>
    </div>

    <Footer />
  </div>
);
}

export default AnimalMuralsPage;