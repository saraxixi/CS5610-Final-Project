import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MuralCard from '../components/MuralCard';
import "../styles/MuralPage.css";
import architectureBanner from '../assets/images/architecture-banner.png';

const ArchitectureMuralsPage = () => {
  const [murals, setMurals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMurals = async () => {
      try {
        const response = await axios.get('/api/murals');
        const architectureMurals = response.data.filter(
          mural => mural.subcategory === 'architecture'
        );
        const sorted = architectureMurals.sort((a, b) => b.rating - a.rating);
        setMurals(sorted);
      } catch (err) {
        console.error('Error fetching murals:', err);
        setError('Failed to fetch murals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMurals();
  }, []);

  if (loading || error) {
    return (
      <div className="murals-page">
        <Navbar />
        <div className="murals-container">
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="error-message">{error}</div>
          )}
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
        style={{ backgroundImage: `url(${architectureBanner})` }}
      >
        <div className="mural-hero-content">
          <h1>Architectural</h1>
          <p>
            In Chinese painting, there is a long-standing tradition of capturing 
            the beauty of architecture. The Dunhuang murals feature a wide range 
            of architectural depictions—palaces, city gates, temples, and residences. 
          </p>

          <header className="page-header align-left small-header">
            <h1 className="page-title">Architectural Features</h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">
              Discover the architectural elements depicted in the Mogao Caves
            </p>
          </header>
        </div>
      </div>

      <div className="murals-container">
        <div className="murals-grid">
          {murals.length > 0 ? (
            murals.map(mural => (
              <MuralCard key={mural._id} mural={mural} />
            ))
          ) : (
            <div className="no-results">No architecture murals found.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArchitectureMuralsPage;
