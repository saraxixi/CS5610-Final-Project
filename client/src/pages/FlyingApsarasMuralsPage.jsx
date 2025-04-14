import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MuralCard from '../components/MuralCard';
import "../styles/MuralPage.css";
import flyingApsarasBanner from '../assets/images/flyingbanner.png';

const FlyingApsarasMuralsPage = () => {
  const [murals, setMurals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMurals = async () => {
      try {
        const response = await axios.get('/api/murals');
        const flyingApsarasMurals = response.data.filter(
          mural => mural.subcategory === 'flying apsaras'
        );
        const sorted = flyingApsarasMurals.sort((a, b) => b.rating - a.rating);
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
        style={{ backgroundImage: `url(${flyingApsarasBanner})` }}
      >
        <div className="mural-hero-content">
          <h1>Flying Apsaras</h1>
          <p>
            The Feitian, or flying apsaras, are a form of Buddhist artistic expression. 
            Introduced to inland China from India via the Western Regions, 
            they underwent more than a thousand years of evolution and refinement, 
            gradually developing into a distinctly Chinese visual form.
          </p>

          <header className="page-header align-left small-header">
            <h1 className="page-title">Flying Apsaras</h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">
              Explore the celestial flying figures of the Mogao Caves
            </p>
          </header>
        </div>
      </div>

      <div className="murals-grid">
        {murals.length > 0 ? (
          murals.map(mural => (
            <MuralCard key={mural._id} mural={mural} />
          ))
        ) : (
          <div className="no-results">No flying apsaras murals found.</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FlyingApsarasMuralsPage;
