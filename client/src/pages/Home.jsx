import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
import "../styles/Home.css";

// images
import bannerImage from "../assets/images/banner.png";
import backgroundImage from "../assets/images/background2.jpg";
import background3Image from "../assets/images/background3.png";
import background4Image from "../assets/images/background4.png";
import deerImage from "../assets/images/deer.png";
import danceImage from "../assets/images/dance.png";
import architectureImage from "../assets/images/architecture.png";
import apsaraImage from "../assets/images/apsara.png";
import sutraImage from "../assets/images/sutra.png";
import create1Image from "../assets/images/create1.png";
import create2Image from "../assets/images/create2.png";
import create3Image from "../assets/images/create3.png";

const Home = () => {
  const [artifacts, setArtifacts] = useState([]);
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole === "admin";

  useEffect(() => {
    console.log("userRole:", userRole);
    console.log("isAdmin:", isAdmin);

    fetch('http://localhost:4000/api/artifacts')
      .then(res => res.json())
      .then(data => setArtifacts(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artifact?")) return;
    try {
      await fetch(`http://localhost:4000/api/artifacts/${id}`, {
        method: 'DELETE'
      });
      setArtifacts(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete artifact.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div id="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="banner-content">
          <div className="banner-text">
            <h1>DunHuang Museum</h1>
            <p>
              Dunhuang was a major stop on the ancient Silk Road and is best known for the nearby Mogao murals.
              It preserves 735 murals from the 4th to 11th centuries, over 3,000 painted sculptures, 45,000 square meters
              of murals, and five wooden structures from the Tang and Song dynasties.
            </p>
            <Link to="/DunhuangMuseum" className="learn-more-btn">Learn More</Link>
          </div>
        </div>
      </div>

      {/* Mural Themes Section */}
      <div className="mural-themes-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="mural-themes-content">
          <div className="section-header">
            <h2>Murals</h2>
            <p>Abundant murals for your enjoyment</p>
          </div>
          <div className="theme-cards">
            {/* Theme Cards */}
            <div className="theme-card">
              <div className="theme-image"><img src={deerImage} alt="Animal Theme" /></div>
              <h3>Animals</h3>
              <p>
                Animal paintings in Dunhuang murals are centered around Buddhist content. Exploring the history 
                of animal paintings in Dunhuang murals not only allows viewers to feast their eyes on ancient 
                expression forms and techniques.
              </p>
              <div className="materials-count"><span>12</span> materials collected</div>
            </div>
            <div className="theme-card">
              <div className="theme-image"><img src={danceImage} alt="Dance Theme" /></div>
              <h3>Dance</h3>
              <p>
                The Dunhuang murals created dazzling and colorful dance images, such as: celestial musicians 
                playing music and dancing along heavenly palace railings, celestial musicians in large sutra 
                tableaux who occupy prominent positions.
              </p>
              <div className="materials-count"><span>12</span> materials collected</div>
            </div>
            <div className="theme-card">
              <div className="theme-image"><img src={architectureImage} alt="Architecture Theme" /></div>
              <h3>Architecture</h3>
              <p>
                In Chinese painting, reflecting architectural beauty has a long history. Throughout dynasties, 
                numerous wooden structures were created based on political systems, living customs, aesthetic 
                consciousness, and construction techniques.
              </p>
              <div className="materials-count"><span>12</span> materials collected</div>
            </div>
            <div className="theme-card">
              <div className="theme-image"><img src={apsaraImage} alt="Flying Apsaras Theme" /></div>
              <h3>Flying Apsaras</h3>
              <p>
              Flying Apsaras is a form of Buddhist art. It was transmitted from India through the Western Regions 
                to inland China, and after more than a thousand years of evolution and development, it gradually 
                perfected and formed a sinicized style.
              </p>
              <div className="materials-count"><span>12</span> materials collected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Manuscripts Section */}
      <div className="manuscripts-section" style={{ backgroundImage: `url(${background3Image})` }}>
        <div className="manuscripts-content">
          <div className="section-header">
            <h2>Manuscripts</h2>
            <p>An encounter with thousand-year-old treasures</p>
          </div>
          <div className="manuscripts-display">
            <div className="manuscripts-list">
              <ul>
                <li>Selections: Essay on Destiny</li>
                <li>Mahaparinirvana Sutra Volume 1, Chapter on Longevity</li>
                <li>Mahayana Amitayus Sutra Essential Teachings</li>
                <li>Guiyijun Government Office Wine Calendar</li>
                <li>Lotus Sutra Volume 2, Chapter on Parables</li>
                <li>Tang Dynasty Jingyun 2nd Year (711 CE) Zhang Junyi Merit Notification</li>
              </ul>
            </div>
            <div className="manuscript-image">
              <img src={sutraImage} alt="Ancient Sutra" />
            </div>
          </div>
        </div>
      </div>

      {/* Co-created Works Section */}
      <div className="co-creation-section" style={{ backgroundImage: `url(${background4Image})` }}>
        <div className="co-creation-content">
          <div className="section-header">
            <h2>Co-created Works</h2>
            <p>Creation awaits you here</p>
          </div>
          <div className="creation-cards">
            <div className="creation-card">
              <div className="creation-image"><img src={create1Image} alt="Millennial Music and Dance" /></div>
              <h3>Millennial Music and Dance</h3>
              <p>
                This creation is based on the north wall mural of Cave 220 from the Tang Dynasty in Dunhuang's 
                Mogao murals, digitally redrawing the iconic grand orchestra and Dipankara Bodhisattva scenes. 
                Based on research into the original mural's colors, this piece attempts to recreate the vibrant 
                colors of the mural from a thousand years ago.
              </p>
            </div>
            <div className="creation-card creation-card-middle">
              <div className="creation-image"><img src={create2Image} alt="Nine-Colored Deer" /></div>
              <h3>Nine-Colored Deer</h3>
              <p>
                A three-dimensional model created based on the nine-colored deer image from the Deer King Jataka 
                story painting in Cave 257 of the Mogao murals.
              </p>
            </div>
            <div className="creation-card">
              <div className="creation-image"><img src={create3Image} alt="Celestial Music Fantasy" /></div>
              <h3>Celestial Music Fantasy</h3>
              <p>
                The imagery is inspired by the "Instruments Playing Themselves" image from the Tang Dynasty Cave 220 
                mural in Dunhuang's Mogao murals, redrawing representative instruments including the jie drum, 
                ornate-edge ruan, fang-xiang, konghou, jilou drum, flute, and others.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
};

export default Home;
