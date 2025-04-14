import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBox, FaTruck, FaUniversity } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import carousel1 from "../assets/images/carousel1.png";
import carousel2 from "../assets/images/carousel2.png";
import carousel3 from "../assets/images/carousel3.png";

import "../styles/Artifacts.css";

const Artifacts = () => {
  return (
    <>
      <Navbar />
      {/* Banner Section */}
      <div className="artifact-banner">
        <div className="artifact-feature">
          <FaBox className="artifact-icon" />
          <p>Our postage charges include all duties</p>
        </div>
        <div className="artifact-feature">
          <FaTruck className="artifact-icon" />
          <p>Free UK standard delivery on orders over $100</p>
        </div>
        <div className="artifact-feature">
          <FaUniversity className="artifact-icon" />
          <p>Every purchase supports the Dunhuang Museum</p>
        </div>
      </div>

      {/* Carousel Section */}

      <div className="carousel-container">
        <Carousel
          showThumbs={false}
          showArrows={false}
          showIndicators={true}
          showStatus={false}
          autoPlay
          infiniteLoop
          interval={5000}
          swipeable
        >
          <div className="carousel-slide">
            <img src={carousel1} alt="Slide 1" />
            <div className="carousel-overlay">
              <h2>First blooms of the season</h2>
              <p>Celebrate the end of winter with fashion, homeware and jewellery<br />featuring show-stopping florals</p>
              <a href="#" className="carousel-button">Shop now →</a>
            </div>
          </div>

          <div className="carousel-slide">
            <img src={carousel2} alt="Slide 2" />
            <div className="carousel-overlay">
              <h2>First blooms of the season</h2>
              <p>Celebrate the end of winter with fashion, homeware and jewellery<br />featuring show-stopping florals</p>
              <a href="#" className="carousel-button">Shop now →</a>
            </div>
          </div>

          <div className="carousel-slide">
            <img src={carousel3} alt="Slide 3" />
            <div className="carousel-overlay">
              <h2>First blooms of the season</h2>
              <p>Celebrate the end of winter with fashion, homeware and jewellery<br />featuring show-stopping florals</p>
              <a href="#" className="carousel-button">Shop now →</a>
            </div>
          </div>
        </Carousel>
      </div>

      <Footer />
    </>
  );
};

export default Artifacts;
