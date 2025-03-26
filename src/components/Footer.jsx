import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>DunHuang Museum</h4>
          <p>Explore the rich history and cultural heritage of DunHuang caves and artifacts.</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <address>
            <p>o. 8, East Yangguan Road</p>
            <p>DunHuang, China</p>
            <p>Email: info@dunhuangmuseum.org</p>
            <p>Phone: +86 (937) 882 2981</p>
          </address>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} DunHuang Museum. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;