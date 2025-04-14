import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/MuralPage.css';
import architectureBanner from '../assets/images/architecture-banner.png';
import animalBanner from '../assets/images/animal-banner.png';
import danceBanner from '../assets/images/dance-banner.png';
import flyingBanner from '../assets/images/flyingbanner.png';


const categoryConfig = {
  architecture: {
    banner: architectureBanner,
    title: "Architectural",
    subtitle:
      "In Chinese painting, there is a long-standing tradition of capturing the beauty of architecture. The Dunhuang murals feature a wide range of architectural depictions—palaces, city gates, temples, and residences."
  },
  animal: {
    banner: animalBanner,
    title: "Animal",
    subtitle:
      "The animal paintings in the Dunhuang Caves are centered around Buddhist themes. Exploring the history of these artworks not only offers a glimpse into the artistic styles and techniques of ancient times but also reveals the care and compassion that the artists poured into their creations."
  },
  dance: {
    banner: danceBanner,
    title: "Dance",
    subtitle:
      "The Dunhuang Caves gave rise to dazzling and richly varied dance imagery. These depictions can be broadly categorized into two types: celestial dances from the imagined world of deities and Buddhas, and secular dances reflecting life in the human world."
  },
  'flying apsaras': {
    banner: flyingBanner,
    title: "Flying Apsaras",
    subtitle:
      "The Feitian, or flying apsaras, are a form of Buddhist artistic expression. Introduced to inland China from India via the Western Regions, they underwent more than a thousand years of evolution and refinement, gradually developing into a distinctly Chinese visual form."
  }
};

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

  if (loading || error || !mural) {
    return (
      <div className="murals-page">
        <Navbar />
        <div className="murals-container">
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="error-message">{error || 'Mural not found.'}</div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  const category = mural.subcategory?.toLowerCase();
  const banner = categoryConfig[category]?.banner;
  const bannerTitle = categoryConfig[category]?.title || mural.title;
  const bannerSubtitle = categoryConfig[category]?.subtitle;

  return (
    <div className="murals-page">
      <Navbar />

      <div className="mural-hero" style={{ backgroundImage: `url(${banner})` }}>
        <div className="mural-hero-content">
          <h1>{bannerTitle}</h1>
          <p>{bannerSubtitle}</p>
        </div>
      </div>

      <div className="murals-container">
        <h2 className="detail-title">{mural.title}</h2>
        <p className="detail-subtitle">{mural.description}</p>

        <div className="mural-detail-images">
          {Array.isArray(mural.images) &&
            mural.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Mural ${idx + 1}`}
                className="mural-detail-image"
              />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MuralDetailPage;
