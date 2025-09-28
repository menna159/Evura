import React from 'react';
import { useSelector } from 'react-redux';
import SaleProducts from './components/Sale/Sale';
import AllProducts from './components/All Products/AllProducts';
import HeartLoader from '../../core/Loader/HeartLoader';

export const Home = () => {
  const saleLoading = useSelector((state) => state.products.loading.discounted);
  const allProductsLoading = useSelector((state) => state.products.loading.all);
  const isLoading = saleLoading || allProductsLoading;
  
  return (
    <div className="position-relative">
      {/* Overlay loader */}
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center vh-100 position-absolute bg-dark top-0 start-0 w-100 bg-white bg-opacity-75">
          <HeartLoader isLoading={true} />
        </div>
      )}

      {/* Keep rendering children so they can fetch */}
    <SaleProducts />
      <AllProducts />
    </div>
  );
};
