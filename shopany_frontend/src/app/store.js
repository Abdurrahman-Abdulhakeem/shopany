import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    cart: cartReducer,
    product: productReducer
  },
});
