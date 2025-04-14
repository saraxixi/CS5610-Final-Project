import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ArtifactCard.css';


const ArtifactCard = ({ image, title, buttonText, id }) => {
  const navigate = useNavigate();

  return (
    <div className="artifact-card">
      <div className="artifact-image-wrapper">
        <img src={image} alt={title} className="artifact-image" />
      </div>
      <h3 className="artifact-title">{title}</h3>
      <button className="artifact-button" onClick={() => navigate(`/artifacts/${id}`)}>
        <span>{buttonText}</span> <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default ArtifactCard;
