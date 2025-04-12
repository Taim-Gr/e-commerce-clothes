import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../featuers/api/apiSlice";
import categorySlice from "../featuers/api/categorySlice";
import cartSlice from "../featuers/api/cartSlice";
export const store = configureStore({
  reducer: {
    fetchSlice: apiSlice,
    categorySlice,
    cart: cartSlice,
  },
});
