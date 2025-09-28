import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from 'react-router-dom';
import './cardwithDetails.css';
import { useTranslation } from 'react-i18next';

const CardwithDetails = ({ source, onClick,product }) => {
  const navigate = useNavigate();
  const [t,i18n]=useTranslation();
   const formatPrice = (value) => {
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
  }).format(value);

  return `${formattedNumber} ${t("EGP")}`;
};
  return (
    <div
      className="card-container"
      onClick={onClick}
    >
      <div className='image-wrapper'><img
        src={product.source}
        className=" card-image"
        alt="Cosmetic Product"
      /></div>
      <div className="card-body p-3">
        <div className="text-section">
          <h5 className="card-title text-center ">{product.title}</h5>
          {/* <p className="card-text">{product.description}</p> */}
          <div className='d-flex justify-content-center'>
            <strong className='price'>{product?.price?formatPrice(product?.price):""} </strong> 
          </div>
            
          
        </div>
      </div>
    </div>
  );
};

export default CardwithDetails;
