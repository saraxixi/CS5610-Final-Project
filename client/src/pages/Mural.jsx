import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MuralCard from '../components/MuralCard';
import "../styles/ManuscriptPage.css"; // Using the same styling

const MuralsPage = () => {
  const [murals, setMurals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  // Categories based on your requirements
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'animal', name: '动物' },
    { id: 'dance', name: '舞蹈' },
    { id: 'architecture', name: '建筑' },
    { id: 'flying-apsaras', name: '飞天' }
  ];
  
  useEffect(() => {
    // Set active category based on URL query parameter if it exists
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    
    const fetchMurals = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/artifacts');
        setMurals(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch murals. Please try again later.');
        setLoading(false);
        console.error('Error fetching murals:', err);
      }
    };
    
    fetchMurals();
  }, [categoryParam]);
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Update URL with the selected category
    if (category === 'all') {
      navigate('/murals');
    } else {
      navigate(`/murals?category=${category}`);
    }
  };
  
  // Filter murals based on active category
  const filteredMurals = activeCategory === 'all' 
    ? murals 
    : murals.filter(mural => mural.category === activeCategory);
  
  if (loading) return <div className="loading-container"><div className="loader"></div></div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="manuscripts-page">
      <Navbar />
      <div className="manuscripts-container">
        <div className="page-header">
          <h1 className="page-title">敦煌壁画</h1>
          <p className="page-subtitle">(Dunhuang Murals)</p>
        </div>
        
        <div className="category-tabs">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="manuscripts-grid">
          {filteredMurals.length === 0 ? (
            <div className="no-results">暂无壁画在此分类。</div>
          ) : (
            filteredMurals.map(mural => (
              <MuralCard key={mural._id} mural={mural} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MuralsPage;