import React from 'react';
import '../styles/ManuscriptCard.css'; // Using the same styling

const MuralCard = ({ mural }) => {
  // Use the first image in the array or a placeholder
  const displayImage = mural.images && mural.images.length > 0 
    ? mural.images[0] 
    : '/assets/placeholder-mural.jpg';

  return (
    <div className="manuscript-card">
      <div className="manuscript-image-container">
        <img 
          src={displayImage} 
          alt={mural.title} 
          className="manuscript-image"
        />
      </div>
      <div className="manuscript-info">
        <h3 className="manuscript-title">{mural.title}</h3>
        <p className="manuscript-period">
          <span className="period-label">所属年代: </span>
          <span className="period-value">{mural.period}</span>
        </p>
        <p className="manuscript-description">{mural.description}</p>
      </div>
    </div>
  );
};

export default MuralCard;