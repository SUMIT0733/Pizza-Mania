import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import cartReducer from './features/cart/CartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  },
});

export default store;
