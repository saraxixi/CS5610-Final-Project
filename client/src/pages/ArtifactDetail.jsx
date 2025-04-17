import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ArtifactDetail.css";

const ArtifactDetail = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [artifact, setArtifact] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("about");

  const handleAddToFavorites = async () => {
    try {
      await axios.post(`/api/users/${userId}/favorites`, {
        artifactId: artifact._id
      });
      alert("Saved to favorites!");
    } catch (error) {
      console.error("Add to favorites failed", error);
      alert("Failed to save.");
    }
  };

  useEffect(() => {
    axios.get(`/api/artifacts/${id}`)
      .then(res => setArtifact(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!artifact) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="artifact-detail-container">
        {/* Image Section */}
        <div className="artifact-image-section">
          <h2 className="artifact-title">{artifact.title}</h2>
          {artifact.images && (
            <img
              src={Array.isArray(artifact.images) ? artifact.images[0] : artifact.images}
              alt={artifact.title}
              className="artifact-main-image"
            />
          )}
          {artifact.sale && <div className="sale-badge">Sale</div>}

          {/* Tabs Below Image */}
          <div className="artifact-tabs">
            <button
              className={activeTab === "about" ? "active" : ""}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={activeTab === "info" ? "active" : ""}
              onClick={() => setActiveTab("info")}
            >
              Product Information
            </button>
          </div>

          <div className="artifact-tab-content">
            {activeTab === "about" && <p>{artifact.about}</p>}
            {activeTab === "info" && <p>{artifact.overview}</p>}
          </div>
        </div>

        {/* Info Section */}
        <div className="artifact-info-section">
          <p className="price">
            ${artifact.price}{" "}
          </p>
          <p className="in-stock">IN STOCK</p>

          <div className="quantity-control">
            <label>Quantity</label>
            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToFavorites}>Add to basket</button>

          <details>
            <summary>Delivery</summary>
            <p>Standard shipping 3-5 days. Free over $100.</p>
          </details>

          <details>
            <summary>Returns and FAQs:</summary>
            <p>Return within 30 days. See FAQs for more info.</p>
          </details>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtifactDetail;
