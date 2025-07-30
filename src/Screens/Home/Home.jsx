import React, { useState } from 'react';
// import Header from './HeaderSection/Header';
import { SecondHeader } from '../../core/HeaderSection/Second-Header/SecondHeader';
import BestSeller from './components/BestSeller/BestSeller';
import AllProducts from './components/All Products/AllProducts';
// import SignInDialog from './components/signInDialog';

export const Home = () => {

  return (
    <>
       <BestSeller />
      <AllProducts />
    </>
  );
};
