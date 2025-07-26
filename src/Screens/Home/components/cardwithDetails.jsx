import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from 'react-router-dom';

const CardwithDetails = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    console.log("Rated:", rate);
  };
  const navigate=useNavigate();
  return (
    <div
      className="card border-0"
      onClick={() => navigate('/Product-details')}
        style={{
        width: '18rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor:"pointer"
      }}
    >
      <img
        src="/1.jpg"
        className="card-img-top"
        alt="Cosmetic Product"
      />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text.</p>
        <p><strong>$32.00 - $30.00</strong></p>

        <Rating onClick={handleRating} ratingValue={rating} size={25} />
      </div>
    </div>
  );
};

export default CardwithDetails;
