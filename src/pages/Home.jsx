import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

// images
import bannerImage from "../assets/images/banner.png";

const Home = () => {

  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/artifacts')
      .then(res => res.json())
      .then(data => setArtifacts(data))
      .catch(err => console.error(err));
  }, []);


  return (
    <>
      <Navbar />
      {/* Banner */}
      <div id="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="banner-content">
          <div className="banner-text">
            <h1>DunHuang Museum</h1>
            <Link to="/DunhuangMuseum" className="learn-more-btn">Learn More</Link>
          </div>
        </div>
      </div>

      {/* Artifacts */}
      <div className="artifacts-container">
        {artifacts.map(artifact => (
          <div key={artifact._id} className="artifact-card">
            <h3>{artifact.title}</h3>
            <img src={artifact.images[0]} alt={artifact.title} style={{width: '200px'}} />
            <p>{artifact.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;