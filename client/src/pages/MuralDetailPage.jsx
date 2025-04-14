import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/MuralPage.css';

// banner images
import animalBanner from '../assets/images/animal-banner.png';
import danceBanner from '../assets/images/dance-banner.png';
import architectureBanner from '../assets/images/architecture-banner.png';
import flyingApsarasBanner from '../assets/images/flyingbanner.png';

const MuralDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [mural, setMural] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const subcategory = location.state?.subcategory || mural?.subcategory || '';

  // choose banner image based on subcategory
  let bannerImage;
  switch (subcategory.toLowerCase()) {
    case 'animal':
      bannerImage = animalBanner;
      break;
    case 'dance':
      bannerImage = danceBanner;
      break;
    case 'architecture':
      bannerImage = architectureBanner;
      break;
    case 'flying apsaras':
      bannerImage = flyingApsarasBanner;
      break;
    default:
      bannerImage = '/placeholder-image.jpg';
  }

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
    <>
      <Navbar />

      <div
        className="mural-hero"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="mural-hero-content">
          <h1>{mural.title}</h1>
          <p>{mural.subtitle}</p>
        </div>
      </div>

      <div className="murals-container">
        <h2 className="page-title" style={{ textAlign: 'center' }}>{mural.title}</h2>
        <p className="page-subtitle" style={{ textAlign: 'center', maxWidth: '900px', margin: '1rem auto 2rem' }}>
          {mural.description}
        </p>

        <div
          className="mural-detail-images"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '3rem'
          }}
        >
          {Array.isArray(mural.images) &&
            mural.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Mural ${idx + 1}`}
                style={{
                  maxWidth: '45%',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              />
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MuralDetailPage;
