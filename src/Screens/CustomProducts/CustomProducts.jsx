import React, { useEffect, useState } from 'react';
import CardwithDetails from '../Home/components/DetailedCard/cardwithDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../Home/components/All Products/AllProducts.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { absoluteUrl } from '../../api/client';
const CustomProducts = () => {
  const location=useLocation();
  const { categoryName = {}, products = [] } = location.state || {};
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
return (
    <div className="container-fluid my-4 px-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className='align-self-center'>{i18n.language=='en'? categoryName.en:categoryName.ar}</h3>
      </div>

      <Swiper
        modules={[Navigation]}
        dir={isRTL ? 'rtl' : 'ltr'}
        navigation={{
          // Swap button selectors if RTL
          nextEl: isRTL ? '.choosen-prev' : '.choosen-next',
          prevEl: isRTL ? '.choosen-next' : '.choosen-prev',
        }}
        slidesPerGroup={1}
        className="allProduct-swiper"
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 10, slidesPerGroup: 3 },
          480: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
          768: { slidesPerView: 3, spaceBetween: 15, slidesPerGroup: 3 },
          992: { slidesPerView: 3.5, spaceBetween: 20, slidesPerGroup: 3 },
          1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
        }}
      >
        {products?.map((product, idx) => (
          <SwiperSlide key={idx}>
            <CardwithDetails
              product={{
                title:!isRTL?product.nameEn:product.nameAr,
                description: !isRTL?product.notesEn:product.notesAr,
                price: product.price,
                source: product.photoUrl?absoluteUrl(product.photoUrl):null,
              }}
              onClick={() => navigate('/Product-details', { state: { product } })}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom navigation buttons */}
      <div className="choosen-prev custom-choosen-arrow">‹</div>
      <div className="choosen-next custom-choosen-arrow">›</div>
    </div>
  );
};

export default CustomProducts;
