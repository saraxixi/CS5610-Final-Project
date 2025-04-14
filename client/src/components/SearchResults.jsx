import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SearchResults.css'; 
import bannerImg from '../assets/images/banner1.png'; 

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get('q');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load search results.');
        setLoading(false);
      });
  }, [query]);

  const allEmpty = Object.values(results).every(arr => !arr.length);

  return (
    <>
      <Navbar />

      <div className="search-hero" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="search-hero-content">
          <h1>Search Results</h1>
          <p>Explore what we found for "{query}"</p>
        </div>
      </div>

      <div className="search-results">
        <h2>Search Results for "{query}"</h2>

        {loading ? (
          <p className="loading-message">Searching...</p>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : allEmpty ? (
          <div className="no-results">
            <p>No results found for "{query}".</p>
            <p>Try different keywords or browse our categories from the menu.</p>
          </div>
        ) : (
          <div className="search-results-wrapper">
            {Object.entries(results).map(([category, items]) => (
              items.length > 0 && (
                <div key={category} className="search-category">
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  {items.map(item => (
                    <div key={item._id} className="search-item">
                      <h4>
                        <Link to={`/${category.toLowerCase()}/${item._id}`}>
                          {item.title || item.name}
                        </Link>
                      </h4>
                      <p>
                        {item.description?.slice(0, 100) || item.significance?.slice(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SearchResults;


