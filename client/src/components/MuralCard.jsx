import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MuralCard.css';

const MuralCard = ({ mural }) => {
  const displayImage = mural.images 
    ? (Array.isArray(mural.images) && mural.images.length > 0 
        ? mural.images[0] 
        : mural.images) 
    : '/placeholder-image.jpg';

  return (
    <Link to={`/murals/${mural._id}`} state={{ subcategory: mural.subcategory }} className="mural-card">
      <div className="mural-image-container">
        <img 
          src={displayImage} 
          alt={mural.title || "Mural"} 
          className="mural-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-image.jpg";
          }}
        />
      </div>
      <div className="mural-info">
        <h2 className="mural-title">{mural.title}</h2>
        <p className="mural-location">{mural.location}</p>
        <div className="mural-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span 
              key={i} 
              className={`star ${i < mural.rating ? 'filled' : ''}`}
            >★</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default MuralCard;
