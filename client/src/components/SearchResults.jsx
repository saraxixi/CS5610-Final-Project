import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/SearchResults.css'; 

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

  if (loading) {
    return <div className="search-results"><h2>Searching for "{query}"...</h2></div>;
  }

  if (error) {
    return <div className="search-results"><h2>Error: {error}</h2></div>;
  }

  const allEmpty = Object.values(results).every(arr => !arr.length);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>

      {allEmpty ? (
        <div className="no-results">
          <p>No results found for "{query}".</p>
          <p>Try different keywords or browse our categories from the menu.</p>
        </div>
      ) : (
        Object.entries(results).map(([category, items]) => (
          items.length > 0 && (
            <div key={category} className="search-category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              {items.map(item => (
                <div key={item._id} className="search-item">
                  <h4>{item.title || item.name}</h4>
                  <p>{item.description?.slice(0, 100) || item.significance?.slice(0, 100)}...</p>
                </div>
              ))}
            </div>
          )
        ))
      )}
    </div>
  );
};

export default SearchResults;
