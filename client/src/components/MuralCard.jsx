import React from 'react';
import '../styles/MuralCard.css'; // Import the dedicated CSS file

const MuralCard = ({ mural }) => {
  // Safeguard against missing mural data
  if (!mural) {
    return <div className="mural-card mural-card-error">Missing mural data</div>;
  }

  // Use the first image in the array, or the single image string, or a placeholder
  const displayImage = mural.images 
    ? (Array.isArray(mural.images) && mural.images.length > 0 
        ? mural.images[0] 
        : mural.images) 
    : '/placeholder-image.jpg';

  return (
    <div className="mural-card">
      <div className="mural-image-container">
        <img 
          src={displayImage} 
          alt={mural.title || "Mural image"} 
          className="mural-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-image.jpg";
          }}
        />
      </div>
      <div className="mural-info">
        <h2 className="mural-title">{mural.title || "Untitled Mural"}</h2>
        <p className="mural-period">
          <span className="period-label">Period: </span>
          <span className="period-value">{mural.period || "Unknown"}</span>
        </p>
        <div className="mural-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span 
              key={i} 
              className={`star ${i < (mural.rating || 0) ? 'filled' : ''}`}
            >★</span>
          ))}
        </div>
        <div className="mural-divider"></div>
        <p className="mural-location">
          <span className="location-label">Location: </span>
          {mural.location || "Unknown location"}
        </p>
        <p className="mural-description">{mural.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default MuralCard;