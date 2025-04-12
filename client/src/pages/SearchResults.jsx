import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (query) {
      setLoading(true);
      // Simulate a search delay
      setTimeout(() => {
        searchWebsite(query);
      }, 500);
    }
  }, [query]);

  const searchWebsite = (searchQuery) => {
    // Simplified content data structure based on your website
    const websiteContent = [
      { 
        title: "Dunhuang Museum", 
        path: "/", 
        content: "Dunhuang was a major stop on the ancient Silk Road and is best known for the nearby Mogao murals. It preserves 735 murals from the 4th to 11th centuries.",
        type: "Page"
      },
      { 
        title: "Animal Murals", 
        path: "/mural/animal", 
        content: "Animal paintings in Dunhuang murals are centered around Buddhist content...",
        type: "Mural"
      },
      { 
        title: "Dance Murals", 
        path: "/mural/dance", 
        content: "The Dunhuang murals created dazzling and colorful dance images...",
        type: "Mural"
      },
      { 
        title: "Architecture Murals", 
        path: "/mural/architecture", 
        content: "The various architectural images of palaces, city gates, temples...",
        type: "Mural"
      },
      { 
        title: "Flying Apsaras", 
        path: "/mural/flying", 
        content: "Flying Apsaras were transmitted from India to China via the Silk Road...",
        type: "Mural"
      },
      { 
        title: "Manuscripts", 
        path: "/document", 
        content: "An encounter with thousand-year-old treasures including Essay on Destiny, Mahaparinirvana Sutra, and more.",
        type: "Document"
      },
      { 
        title: "Co-created Works", 
        path: "/creation", 
        content: "Creation awaits you here. Millennial Music and Dance, Nine-Colored Deer, and Celestial Music Fantasy.",
        type: "Creation"
      }
    ];

    // Simple search implementation
    const searchResults = websiteContent.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(searchResults);
    setLoading(false);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div id="search_results_page">
      <div className="search-header">
        <button className="back-button" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>

      <div className="search-results-content">
        <h1>Search Results for "{query}"</h1>
        
        {loading ? (
          <div className="loading-results">Loading results...</div>
        ) : results.length > 0 ? (
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-type">{result.type}</div>
                <h3><Link to={result.path}>{result.title}</Link></h3>
                <p>{result.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No results found for "{query}".</p>
            <p>Try different keywords or browse our categories from the menu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;