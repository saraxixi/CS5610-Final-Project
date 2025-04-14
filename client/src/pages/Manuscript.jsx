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
    <div className="murals-page">
      <Navbar />

      <div className="mural-hero" style={{ backgroundImage: `url(${manuscriptBanner})` }}>
        <div className="mural-hero-content">
          <h1>Manuscripts</h1>
          <p>
            Explore the ancient treasures discovered in the Dunhuang Library Cave. These manuscripts provide insight into the history, religion, and daily life of ancient China.
          </p>
          <header className="page-header align-left small-header">
            <h1 className="page-title">Dunhuang Manuscripts</h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">Scrolls and scriptures from the Mogao Caves</p>
          </header>
        </div>
      </div>

      <div className="murals-container">
        <div className="murals-grid">
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
