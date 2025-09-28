import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SaleCard } from '../Card/CardPage';
import 'swiper/css';
import 'swiper/css/navigation';
import './Sale.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscountedProducts } from '../../../../redux/ProductsRedux/Products';
import { absoluteUrl } from '../../../../api/client';

const SaleProducts = () => {
  const dispatch = useDispatch();
  const { discounted: products, totalPages, loading, error } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    dispatch(fetchDiscountedProducts({ pageNumber: page, pageSize }));
  }, [dispatch, page]);

  return (
    <>
      { error ? (
        <p>{error}</p>
      ) : products.length>0&&(
        <div className="position-relative container-fluid my-4 pickup-container px-5">
          <div className="sale-title-wrapper">
             <h5 className="sale-title">{t("Sale")}</h5> 
             </div>

          {/* Swiper with discounted products */}
          <Swiper
            modules={[Navigation]}
            dir={isRTL ? 'rtl' : 'ltr'}
            navigation={{
              nextEl: isRTL ? '.pickup-prev' : '.pickup-next',
              prevEl: isRTL ? '.pickup-next' : '.pickup-prev',
            }}
            breakpoints={{
              0: { slidesPerView: 3, spaceBetween: 7, slidesPerGroup: 3 },
              480: { slidesPerView: 3, spaceBetween: 9, slidesPerGroup: 3 },
              768: { slidesPerView: 3, spaceBetween: 11, slidesPerGroup: 3 },
              992: { slidesPerView: 3.5, spaceBetween: 13, slidesPerGroup: 3 },
              1200: { slidesPerView: 4, spaceBetween: 15, slidesPerGroup: 4 },
            }}
            className="pickup-swiper"
          >
            {products?.map((product, idx) => (
              <SwiperSlide key={idx}>
                
                <SaleCard
                  source={product.photoUrl 
      ? absoluteUrl(product.photoUrl) // 👈 prepend API base
      : "/placeholder.png"}
                    salePercent={product.discount}
                  onClick={() => navigate('/Product-details', { state: { product } })}
                />

              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="pagination-sale-btn mx-2"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              {t("Previous")}
            </button>
            
            <button
              className="pagination-sale-btn mx-2"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              {t("Next")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export default SaleProducts;
