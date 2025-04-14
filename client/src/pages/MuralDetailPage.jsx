import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/MuralPage.css';

const MuralDetailPage = () => {
  const { id } = useParams();
  const [mural, setMural] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMural = async () => {
      try {
        const response = await axios.get(`/api/murals/${id}`);
        setMural(response.data);
      } catch (err) {
        setError('Failed to fetch mural details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMural();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !mural) return <div>{error || 'Mural not found.'}</div>;

  return (
    <div className="murals-page">
      <Navbar />
      <div className="murals-container">
        <h1>{mural.title}</h1>
        <p><strong>Period:</strong> {mural.period}</p>
        <p><strong>Location:</strong> {mural.location}</p>
        <p>{mural.description}</p>
        {mural.images?.map((img, index) => (
          <img key={index} src={img} alt={mural.title} style={{ maxWidth: '100%', marginTop: '1rem' }} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MuralDetailPage;
