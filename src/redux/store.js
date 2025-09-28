import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userRedux/userSlice';
import productsReducer from './ProductsRedux/Products'
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer
  }
});
