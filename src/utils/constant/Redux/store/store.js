// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../Slice/productSlice.js"
import cartReducer from "../Slice/cartslice.js"

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
