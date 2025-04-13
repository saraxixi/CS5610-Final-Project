import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get('q');
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>

      {Object.entries(results).map(([category, items]) => (
        items.length > 0 && (
          <div key={category}>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            {items.map(item => (
              <div key={item._id}>
                <h4>{item.title || item.name}</h4>
                <p>{item.description?.slice(0, 100)}...</p>
              </div>
            ))}
          </div>
        )
      ))}
    </div>
  );
};

export default SearchResults;
