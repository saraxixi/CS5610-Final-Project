import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBox, FaTruck, FaUniversity } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Artifacts.css";
import axios from "axios";
import ArtifactCard from "../components/ArtifactCard";

const Artifacts = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [allArtifacts, setAllArtifacts]   = useState([]);
  const [sortOption, setSortOption]       = useState("default");

  useEffect(() => {
    async function fetchTop3() {
      try {
        const res = await axios.get("/api/artifacts/top3");
        setCarouselItems(res.data);
      } catch (err) {
        console.error("Error fetching top3 artifacts:", err);
      }
    }
    fetchTop3();
  }, []);

  useEffect(() => {
    async function fetchList() {
      try {
        const url =
          sortOption === "default"
            ? "/api/artifacts"
            : `/api/artifacts?sort=${sortOption}`;
        const res = await axios.get(url);
        setAllArtifacts(res.data);
      } catch (err) {
        console.error("Error fetching artifacts:", err);
      }
    }
    fetchList();
  }, [sortOption]);

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
          showIndicators
          showStatus={false}
          autoPlay
          infiniteLoop
          interval={5000}
          swipeable
        >
          {carouselItems.map((item, idx) => (
            <div className="carousel-slide" key={idx}>
              <img src={item.images} alt={`Artifact ${idx + 1}`} />
              <div className="carousel-overlay">
                <h2>{item.title}</h2>
                <p>{item.overview ?? "Discover more from Dunhuang's legacy."}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Sort Control */}
      <div style={{ padding: "1rem", textAlign: "right" }}>
        <label>
          Sort by:&nbsp;
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="popular">Most Popular</option>
          </select>
        </label>
      </div>

      {/* Artifact Cards Section */}
      <div className="artifact-cards">
        <h2>Explore Our Artifacts</h2>
        <div className="artifact-card-container">
          {allArtifacts.map((item) => (
            <ArtifactCard
              key={item._id}
              id={item._id}
              image={item.images}
              title={item.title}
              buttonText="View Details"
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Artifacts;
