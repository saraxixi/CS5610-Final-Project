import React from 'react';
import '../styles/ManuscriptCard.css';

const ManuscriptCard = ({ manuscript }) => {
  // Use the first image in the array or a placeholder
  const displayImage = manuscript.images && manuscript.images.length > 0 
    ? manuscript.images[0] 
    : '/assets/placeholder-manuscript.jpg';
    

  return (
    <div className="manuscript-card">
      <div className="manuscript-image-container">
        <img 
          src={displayImage} 
          alt={manuscript.title} 
          className="manuscript-image"
        />
      </div>
      <div className="manuscript-info">
        <h3 className="manuscript-title">{manuscript.title}</h3>
        <p className="manuscript-period">
          <span className="period-label">Period: </span>
          <span className="period-value">{manuscript.period}</span>
        </p>
        <p className="manuscript-description">{manuscript.description}</p>
      </div>
    </div>
  );
};

export default ManuscriptCard;