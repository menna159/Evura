import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Card } from '../Card/CardPage';
import 'swiper/css';
import 'swiper/css/navigation';
import './BestSeller.css';

const BestSeller = () => {
  const ImagesSource = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg',
    '2.jpg', '3.jpg', '4.jpg', '1.jpg',
    '1.jpg', '2.jpg', '3.jpg', '4.jpg'
  ];
  const navigate = useNavigate();

  return (
    <div className="position-relative container-fluid my-4 pickup-container px-5">
      <h5>Best Seller</h5>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.pickup-next',
          prevEl: '.pickup-prev',
        }}
        onSwiper={(swiper) => {
          // Ensure swiper updates navigation
          setTimeout(() => {
            swiper.params.navigation.prevEl = '.pickup-prev';
            swiper.params.navigation.nextEl = '.pickup-next';
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
breakpoints={{
     0: {
    slidesPerView: 3,
    spaceBetween: 7,
    slidesPerGroup: 3,

  },
  480: {
    slidesPerView: 3,
    spaceBetween: 9,
    slidesPerGroup: 3,

  },
  768: {
    slidesPerView: 3,
    spaceBetween: 11,
    slidesPerGroup: 3,

  },
  992: {
    slidesPerView: 3.5,
    spaceBetween: 13,
    slidesPerGroup: 3,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 15,
    slidesPerGroup: 4,
  }
  }}
        className="pickup-swiper"
      >
        {ImagesSource.map((source, idx) => (
          <SwiperSlide key={idx}>
            <Card source={source} onClick={() => navigate('/Product-details')} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pickup-prev custom-Pick-arrow">‹</div>
      <div className="pickup-next custom-Pick-arrow">›</div>
    </div>
  );
};

export default BestSeller;
