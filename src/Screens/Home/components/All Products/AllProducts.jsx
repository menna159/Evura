import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { fetchProducts } from "../../../../redux/ProductsRedux/Products";
import CardwithDetails from "../DetailedCard/cardwithDetails";
import { absoluteUrl } from "../../../../api/client";
const AllProducts = () => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  
  const { all: products, totalPages, loading, error } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const pageSize = 4; 

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber: page, pageSize }));
  }, [dispatch, page]);

  const isRTL = i18n.dir() === 'rtl';

  if (error) return <p>{t('Error loading products')}</p>;

  return (
    <div className="container-fluid my-4 px-5 position-relative">
      <div className="d-flex justify-content-center align-items-center mb-3 mt-5">
        <h3 className="title">{t('Products')}</h3>
      </div>

      <Swiper
        modules={[Navigation]}
        dir={isRTL ? 'rtl' : 'ltr'}
        navigation={{
          nextEl: isRTL ? '.choosen-prev' : '.choosen-next',
          prevEl: isRTL ? '.choosen-next' : '.choosen-prev',
        }}
        slidesPerGroup={1}
        className="allProduct-swiper"
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {products?.map((product, idx) => (
          <SwiperSlide key={idx}>
            <CardwithDetails
              product={{
                title: !isRTL ? product.nameEn : product.nameAr,
                description: !isRTL ? product.notesEn : product.notesAr,
                price: product.price,
                source: product.photoUrl 
      ?absoluteUrl(product.photoUrl) 
      : "/placeholder.png",
              }}
              onClick={() => navigate('/Product-details', { state: { product } })}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="choosen-prev custom-choosen-arrow">‹</div>
      <div className="choosen-next custom-choosen-arrow">›</div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-4">
        <button 
          className="pagination-btn mx-2" 
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          {t('Previous')}
        </button>
        
        <button 
          className="pagination-btn mx-2" 
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          {t('Next')}
        </button>
      </div>
    </div>
  );
};
export default AllProducts;