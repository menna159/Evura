import React, { useState } from 'react';
// import Header from './HeaderSection/Header';
import { SecondHeader } from './HeaderSection/Second-Header/SecondHeader';
import Pickup from './components/Pickup/Pickup';
import ChoosenForyou from './components/All Products/AllProducts';
// import SignInDialog from './components/signInDialog';

export const Home = () => {

  return (
    <>
     
      <Pickup />
      <ChoosenForyou />
    </>
  );
};
