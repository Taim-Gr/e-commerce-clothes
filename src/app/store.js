import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../featuers/api/apiSlice";
export const store = configureStore({
  reducer: {
    fetchSlice: apiSlice,
  },
});
