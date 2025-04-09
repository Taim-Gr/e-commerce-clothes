import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://dummyjson.com";
// const getFilteredProjects = async (gender, dressType) => {
//   const response = await axios.get(
//     `${baseUrl}/products/category/${`${gender}-${dressType}`}`
//   );
//   console.log(`${`${gender}-${dressType}`}`);
//   const json = await response.data.products;
//   console.log("category", json);
//   return json;
// };
export const fetchFilteredProjects = createAsyncThunk(
  "category/fetchFiltered",
  async (data) => {
    const response = await axios.get(
      `${baseUrl}/products/category/${`${data.gender}-${data.type}`}`
    );
    const json = await response.data.products;
    console.log("category", data);
    return json;
  }
);
export const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    isLoading: false,
    gender: "male",
    dressType: "shirts",
    priceRange: [0, 100],
    filteredResponse: [],
  },
  reducers: {
    genderHandler: (state, action) => {
      state.gender = action.payload.gender;
    },
    dressTypeHandler: (state, action) => {
      state.dressType = action.payload.dressType;
    },
    priceChangeHandler: (state, action) => {
      state.priceRange = action.payload.priceRange;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilteredProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("asdf", action);
        state.filteredResponse = action.payload;
      })
      .addCase(fetchFilteredProjects.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProjects.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export default categorySlice.reducer;
export const { genderHandler, dressTypeHandler, priceChangeHandler } =
  categorySlice.actions;
