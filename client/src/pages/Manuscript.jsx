import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ManuscriptCard from '../components/ManuscriptCard';
import "../styles/MuralPage.css";
import manuscriptBanner from '../assets/images/banner-two.png';

const ManuscriptsPage = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const response = await axios.get('/api/manuscripts');
        setManuscripts(response.data);
      } catch (err) {
        console.error('Error fetching manuscripts:', err);
        setError('Failed to fetch manuscripts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchManuscripts();
  }, []);

  if (loading || error) {
    return (
      <div className="murals-page">
        <Navbar />
        <div className="murals-container">
          {loading ? (
            <div className="loading-container"><div className="loader"></div></div>
          ) : (
            <div className="error-message">{error}</div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="manuscripts-page">
      <Navbar />

      <div className="manuscript-hero" style={{ backgroundImage: `url(${manuscriptBanner})` }}>
        <div className="manuscript-hero-overlay">
          <div className="manuscript-hero-text">
            <h1 className="manuscript-hero-title">Manuscripts</h1>
            <p className="manuscript-hero-text">Explore the ancient treasures discovered in the Dunhuang Library Cave. These manuscripts provide insight into the history, religion, and daily life of ancient China.</p>
          </div>
        </div>
      </div>

      <div className="manuscripts-container">
        <div className="manuscripts-grid">
          {manuscripts.map(manuscript => (
            <ManuscriptCard key={manuscript._id} manuscript={manuscript} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManuscriptsPage;
