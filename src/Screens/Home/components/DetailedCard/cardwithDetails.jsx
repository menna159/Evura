import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from 'react-router-dom';
import './cardwithDetails.css';

const CardwithDetails = ({ source, onClick }) => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleRating = (rate) => {
    setRating(rate);
    console.log("Rated:", rate);
  };

  return (
    <div
      className="card-container"
      onClick={onClick}
    >
      <div className='image-wrapper'><img
        src={source}
        className=" card-image"
        alt="Cosmetic Product"
      /></div>
      <div className="card-body p-3">
        <div className="text-section">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text.</p>
          <p><strong>$32.00 - $30.00</strong></p>
        </div>
        <Rating onClick={handleRating} ratingValue={rating} size={22} />
      </div>
    </div>
  );
};

export default CardwithDetails;
