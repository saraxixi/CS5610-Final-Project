import React from "react";
import "../styles/ExhibitionCard.css";

const ExhibitionCard = ({ title, subtitle, image, startDate, endDate, buttonColor }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  const formatDate = (date) => {
    return isValidDate(date)
      ? date.toLocaleDateString("en-GB", { day: "numeric", month: "long" })
      : "Invalid Date";
  };

  const formatYear = (date) => {
    return isValidDate(date) ? date.getFullYear() : "";
  };

  return (
    <div className="exhibition-card">
      <div className="left">
        <h2 className="title">{title}</h2>
        <h3 className="subtitle">{subtitle}</h3>

        <div className="info-row">
          <div className="date-group">
            <p className="date">{formatDate(start)} – {formatDate(end)}</p>
            <p className="year">{formatYear(start)}</p>
          </div>
          <button className={`book-btn circle ${buttonColor}`}>View</button>
        </div>
      </div>

      <div className="right">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default ExhibitionCard;
