import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ManuscriptCard from '../components/ManuscriptCard';
import "../styles/ManuscriptPage.css";

const ManuscriptsPage = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/manuscripts');
        setManuscripts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch manuscripts. Please try again later.');
        setLoading(false);
        console.error('Error fetching manuscripts:', err);
      }
    };
    
    fetchManuscripts();
  }, []);
  
  if (loading) return <div className="loading-container"><div className="loader"></div></div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="manuscripts-page">
      <Navbar />
      <div className="manuscripts-container">
        <div className="page-header">
          <h1 className="page-title">Manuscripts</h1>
        </div>
        
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