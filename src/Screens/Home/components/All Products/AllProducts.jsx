import React from 'react';
import CardwithDetails from '../DetailedCard/cardwithDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './AllProducts.css';
import { useNavigate } from 'react-router-dom';

const ChoosenForyou = () => {
  const ImagesSource = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg',
    '2.jpg', '3.jpg', '4.jpg', '1.jpg',
    '1.jpg', '2.jpg', '3.jpg', '4.jpg'
  ];
 const navigate=useNavigate();
  return (
    <div className="container-fluid my-4 px-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Our Products</h5>
        {/* Optional: Add custom nav buttons */}
       
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.choosen-next',
          prevEl: '.choosen-prev',
        }}
        slidesPerGroup={1}
        className="allProduct-swiper"
        breakpoints={{
           0: {
    slidesPerView: 3,
    spaceBetween: 10,
    slidesPerGroup: 3,

  },
  480: {
    slidesPerView: 3,
    spaceBetween: 12,
    slidesPerGroup: 3,

  },
  768: {
    slidesPerView: 3,
    spaceBetween: 15,
    slidesPerGroup: 3,

  },
  992: {
    slidesPerView: 3.5,
    spaceBetween: 20,
    slidesPerGroup: 3,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 24,
    slidesPerGroup: 4,
  }
        }}
      >
        {ImagesSource.map((source, idx) => (
          <SwiperSlide key={idx}>
            <CardwithDetails source={source} onClick={()=>navigate('/Product-details')}/>
          </SwiperSlide>
        ))}
      </Swiper>



<div className="choosen-prev custom-choosen-arrow">‹</div>
<div className="choosen-next custom-choosen-arrow">›</div>
    </div>
  );
};

export default ChoosenForyou;
