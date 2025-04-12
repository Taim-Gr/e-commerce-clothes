import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://dummyjson.com";
const getProductInfo = async (productId) => {
  const response = await axios.get(`${baseUrl}/products/${productId}`);

  const json = await response.data;
  return json;
};
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
const getReleatedProducts = async (category) => {
  const response = await axios.get(
    `${baseUrl}/products/category/${category}?limit=4`
  );
  const json = await response.data.products;

  return json;
};
const getGenderProducts = async (gender) => {
  const categories = {
    men: ["mens-shirts", "mens-shoes", "mens-watches"],
    women: [
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
  };

  let allProducts = [];

  // Simple loop through each category
  for (const category of categories[gender]) {
    const response = await axios.get(
      `${baseUrl}/products/category/${category}`
    );
    allProducts = [...allProducts, ...response.data.products];
  }

  return {
    gender,
    products: allProducts,
  };
};

// Add new async thunk
export const fetchGenderProducts = createAsyncThunk(
  "products/genderProducts",
  async (gender, { rejectWithValue }) => {
    try {
      return await getGenderProducts(gender);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchReleatedProducts = createAsyncThunk(
  "products/releatedproducts",
  getReleatedProducts
);
export const fetchTopSellingProducts = createAsyncThunk(
  "products/topSelling",
  getTopSellingProducts
);
export const fetchMostPupolarProducts = createAsyncThunk(
  "products/mostPupolar",
  getLatestProducts
);
export const fetchProductInfo = createAsyncThunk(
  "products/showProduct",
  getProductInfo
);
export const apiSlice = createSlice({
  name: "apiSlice",
  initialState: {
    genderProducts: {
      men: [],
      women: [],
    },
    releatedProducts: [],
    topSellingProducsts: [],
    mostPupolarProducsts: [],
    productInfo: {
      title: "",
      description: "",
      rating: 0,
      images: [],
      price: 0,
      stock: 0,
      category: "",
      brand: "",
      thumbnail: "",
      reviews: [],
      warrantyInformation: "",
      availabilityStatus: "",
      shippingInformation: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    cleanProductInfo: (state, action) => {
      state.productInfo = {
        title: "",
        description: "",
        rating: 0,
        images: [],
        price: 0,
        stock: 0,
        category: "",
        brand: "",
        thumbnail: "",
        reviews: [],
        warrantyInformation: "",
        availabilityStatus: "",
        shippingInformation: "",
      };
    },
    cleanGenderProducts: (state, action) => {
      state.genderProducts = { men: [], women: [] };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
        state.topSellingProducsts = action.payload;
      })
      .addCase(fetchMostPupolarProducts.fulfilled, (state, action) => {
        state.mostPupolarProducsts = action.payload;
      })
      .addCase(fetchProductInfo.fulfilled, (state, action) => {
        state.productInfo = action.payload;
      })
      .addCase(fetchReleatedProducts.fulfilled, (state, action) => {
        state.releatedProducts = action.payload;
      })
      .addCase(fetchGenderProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenderProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.genderProducts[action.payload.gender] = action.payload.products;
      })
      .addCase(fetchGenderProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { cleanProductInfo, cleanGenderProducts } = apiSlice.actions;
export default apiSlice.reducer;
