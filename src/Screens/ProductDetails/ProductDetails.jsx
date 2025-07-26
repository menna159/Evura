import React, { useState } from 'react';
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Carousel } from 'react-bootstrap';
import './productDetails.css'
const ProductDetails = () => {
  const [heartHovered, setHeartHovered] = useState(false);
  const images = [
    "1.jpg",
    "1.jpg",
    "1.jpg"
  ];

  return (
    <div className="container my-5 overflow-hidden">
      <div className="row g-5 align-items-start ">
        {/* Product Carousel */}
        <div className="col-md-5">
          <Carousel style={{color:"black"}}>
            {images.map((src, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 rounded"
                  src={src}
                  alt={`Slide ${index + 1}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <h4 className="fw-bold">Product Title</h4>
          <h5 className="text-muted mb-3">Product Subtitle</h5>
          <p className="fw-bold fs-4 d-inline">$74.00 </p>
          <p className="text-muted d-inline">
            Or <strong>$18.50</strong> off your Sephora order when you open and use a Sephora Credit Card today.
          </p>
          <p className="mt-3"><strong>Size:</strong> 0.5 oz / 15 ml</p>

          {/* Quantity Select + Add to Basket */}
          <div className="d-flex align-items-center mb-3">
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: '#E50046',
                borderTopLeftRadius: '2rem',
                borderBottomLeftRadius: '2rem',
                border: 0,
                color: 'white',
                padding: '0.1rem 1rem',
                height: "3.7rem",
                marginRight: "0.2rem",
                fontSize:"1rem"
              }}
            >
              <select
                className="fw-bold"
                style={{
                  backgroundColor: '#E50046',
                  border: "none",
                  color: "white",
                  
                }}
              >
                {[1, 2, 3, 4, 5].map((num, index) => (
                  <option key={index} value={num} style={{ backgroundColor: "white", color: "black" }}>
                    {num}
                  </option>
                ))}
              </select>
            </button>

            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: '#E50046',
                borderTopRightRadius: '2rem',
                borderBottomRightRadius: "2rem",
                border: 0,
                color: 'white',
                height: "3.7rem",
                padding: '0.3rem 2rem',
                minWidth: '220px',
                marginRight: "0.2rem"
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <span className="fw-bold">Add to Basket</span>
                <small>Get it shipped</small>
              </div>
            </button>

            <span
              onMouseEnter={() => setHeartHovered(true)}
              onMouseLeave={() => setHeartHovered(false)}
              style={{ cursor: 'pointer', fontSize: '1.8rem', marginLeft: '1rem' }}
            >
              {heartHovered ? <VscHeartFilled color="#E50046" /> : <VscHeart />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
