import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SearchResults.css";

// Import the same background image used in other pages for consistency
import backgroundImage from "../assets/images/background2.jpg";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        content: "Dunhuang was a major stop on the ancient Silk Road and is best known for the nearby Mogao Caves. It preserves 735 caves from the 4th to 11th centuries.",
        type: "Page"
      },
      { 
        title: "Animal Murals", 
        path: "/mural/animal", 
        content: "Animal paintings in Dunhuang caves are centered around Buddhist content...",
        type: "Mural"
      },
      { 
        title: "Dance Murals", 
        path: "/mural/dance", 
        content: "The Dunhuang caves created dazzling and colorful dance images...",
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

  return (
    <>
      <Navbar />
      <div className="search-results-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="search-results-container">
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
      <Footer />
    </>
  );
};

export default SearchResults;