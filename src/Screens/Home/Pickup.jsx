import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './components/card';

const Pickup = () => {
  const ImagesSource = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  const navigate = useNavigate();

  return (
    <div className="container my-4 overflow-hidden">
      <h5>Best Seller</h5>
      <div className="row g-3">
        {ImagesSource.map((source, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-3">
            <Card source={source} onClick={() => navigate('/Product-details')} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pickup;
