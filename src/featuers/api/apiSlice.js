import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://dummyjson.com";
const getTopSellingProducts = async () => {
  const response1 = await axios.get(
    `${baseUrl}/products/category/mens-shirts?limit=${5}&skip=${4}`
  );
  const response2 = await axios.get(
    `${baseUrl}/products/category/womens-dresses?limit=${3}`
  );
  const json1 = await response1.data.products;
  const json2 = await response2.data.products;
  const alljsons = [...json1, ...json2];
  return alljsons;
};
const getLatestProducts = async () => {
  const response = await axios.get(
    `${baseUrl}/products/category/mens-shirts?limit=${4}`
  );
  const json = await response.data.products;
  return json;
};
export const fetchTopSellingProducts = createAsyncThunk(
  "products/topSelling",
  getTopSellingProducts
);
export const fetchMostPupolarProducts = createAsyncThunk(
  "products/mostPupolar",
  getLatestProducts
);
export const apiSlice = createSlice({
  name: "apiSlice",
  initialState: {
    topSellingProducsts: [],
    mostPupolarProducsts: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
        console.log("topSelling", action);
        state.topSellingProducsts = action.payload;
      })
      .addCase(fetchMostPupolarProducts.fulfilled, (state, action) => {
        state.mostPupolarProducsts = action.payload;
        console.log("mostpopular", action);
      });
  },
});
export default apiSlice.reducer;
