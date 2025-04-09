import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../featuers/api/apiSlice";
import categorySlice from "../featuers/api/categorySlice";
export const store = configureStore({
  reducer: {
    fetchSlice: apiSlice,
    categorySlice,
  },
});
