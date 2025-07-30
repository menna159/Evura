import React, { useState } from 'react';
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Carousel } from 'react-bootstrap';
import './productDetails.css';

const ProductDetails = () => {
  const [heartHovered, setHeartHovered] = useState(false);
  const [selected, setSelected] = useState('');

  const images = ["1.jpg", "1.jpg", "1.jpg"];
  const Colors = ['red', 'green', 'blue', 'brown','purple'];

  return (
    <div className="container my-5 overflow-hidden">
      <div className="row g-5 align-items-start">
        {/* Product Carousel */}
        <div className="col-md-5">
          <Carousel className="product-carousel">
            {images.map((src, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100  carousel-image"
                  src={src}
                  alt={`Slide ${index + 1}`}
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
            <button type="button" className=" quantity-button">
              <select className="quantity-select">
                {[1, 2, 3, 4, 5].map((num, index) => (
                  <option key={index} value={num} className='quantity-option'>{num}</option>
                ))}
              </select>
            </button>

            <button type="button" className=" add-to-basket-button">
              <div className="d-flex flex-column align-items-center">
                <span className="fw-bold">Add to Basket</span>
                <small>Get it shipped</small>
              </div>
            </button>

            <span
              onMouseEnter={() => setHeartHovered(true)}
              onMouseLeave={() => setHeartHovered(false)}
              className="wishlist-icon"
            >
              {heartHovered ? <VscHeartFilled color="#E50046" /> : <VscHeart />}
            </span>
          </div>

          {/* Color Selection */}
          <div>
            <strong className='mb-5'>Color :</strong>
            <div className="color-options">
              {Colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-box ${selected === color ? 'selected' : ''}`}
                  onClick={() => setSelected(color)}
                >
                  <img src='1.jpg' alt="" className='color-Image'/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
