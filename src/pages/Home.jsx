import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

// images
import bannerImage from "../assets/images/banner.png";

const Home = () => {
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
    </>
  );
}

export default Home;