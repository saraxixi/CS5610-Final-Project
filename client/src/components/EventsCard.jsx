import React from "react";
import { FaUniversity, FaCalendarAlt } from "react-icons/fa";
import "../styles/EventsCard.css";

const EventsCard = ({ image, type, dateInfo, price, title, description }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-img" />
      <div className="event-content">
        <div className="event-tags">
          <span><FaUniversity /> {type}</span>
          <span><FaCalendarAlt /> {dateInfo}</span>
        </div>
        <div className="event-price">{price}</div>
        <h3 className="event-title">{title}</h3>
        <p className="event-desc">{description}</p>
        <button className="event-btn">
          Find out more <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default EventsCard;
