import React, { useState } from 'react';
// import Header from './HeaderSection/Header';
import { SecondHeader } from './SecondHeader';
import Pickup from './Pickup';
import ChoosenForyou from './ChoosenForyou';
// import SignInDialog from './components/signInDialog';

export const Home = () => {

  return (
    <>
     
      <Pickup />
      <ChoosenForyou />
    </>
  );
};
