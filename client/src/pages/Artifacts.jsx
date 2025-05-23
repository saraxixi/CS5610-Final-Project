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
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchTopArtifacts = async () => {
      try {
        const res = await axios.get("/api/artifacts/top3");
        setCarouselItems(res.data);
      } catch (err) {
        console.error("Error fetching artifacts:", err);
      }
    };

    const fetchAllArtifacts = async () => {
      try {
        const res = await axios.get("/api/artifacts");
        setAllArtifacts(res.data);
      } catch (err) {
        console.error("Error fetching all artifacts:", err);
      }
    };
    fetchAllArtifacts();
    fetchTopArtifacts();
  }, []);

  useEffect(() => {
    if (allArtifacts.length > 0) {
      sortArtifacts(sortOption);
    }
  }, [sortOption]);
  
  const sortArtifacts = (option) => {
    const sorted = [...allArtifacts];
    switch (option) {
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "purchaseCount":
        sorted.sort((a, b) => b.purchaseCount - a.purchaseCount);
        break;
      case "createdAt":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        return; // do nothing
    }
    setAllArtifacts(sorted);
  };
  
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
          {carouselItems.map((item, index) => (
            <div className="carousel-slide" key={index}>
              <img src={item.images} alt={`Artifact ${index + 1}`} />
              <div className="carousel-overlay">
                <h2>{item.title}</h2>
                <p>{item.overview || "Discover more from Dunhuang's legacy."}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Artifact Cards Section */}
      <div className="artifact-cards">
        <div className="artifact-header">
          <h2>Explore Our Artifacts</h2>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="artifact-sort-dropdown"
          >
            <option value="default">Sort By</option>
            <option value="price">Price (Low to High)</option>
            <option value="purchaseCount">Most Purchased</option>
            <option value="createdAt">Newest</option>
          </select>
        </div>
        <div className="artifact-card-container">
          {allArtifacts.map((item, index) => (
            <ArtifactCard
              key={index}
              id={item._id}
              image={item.images}
              title={item.title}
              buttonText="View Details"
              onClick={() => console.log(`Clicked on ${item.title}`)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Artifacts;
