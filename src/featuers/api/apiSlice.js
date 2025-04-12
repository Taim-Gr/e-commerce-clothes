import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://dummyjson.com";

// Helper functions with error handling
const getProductInfo = async (productId) => {
  try {
    const response = await axios.get(`${baseUrl}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};

const getTopSellingProducts = async () => {
  try {
    const [response1, response2] = await Promise.all([
      axios.get(`${baseUrl}/products/category/mens-shirts?limit=5&skip=4`),
      axios.get(`${baseUrl}/products/category/womens-dresses?limit=3`),
    ]);
    return [...response1.data.products, ...response2.data.products];
  } catch (error) {
    throw new Error(`Failed to fetch top products: ${error.message}`);
  }
};

const getLatestProducts = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/products/category/mens-shirts?limit=4`
    );
    return response.data.products;
  } catch (error) {
    throw new Error(`Failed to fetch latest products: ${error.message}`);
  }
};

const getReleatedProducts = async (category) => {
  try {
    const response = await axios.get(
      `${baseUrl}/products/category/${category}?limit=4`
    );
    return response.data.products;
  } catch (error) {
    throw new Error(`Failed to fetch related products: ${error.message}`);
  }
};

const getGenderProducts = async (gender) => {
  try {
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

    const requests = categories[gender].map((category) =>
      axios.get(`${baseUrl}/products/category/${category}`)
    );

    const responses = await Promise.all(requests);
    const allProducts = responses.flatMap((response) => response.data.products);

    return { gender, products: allProducts };
  } catch (error) {
    throw new Error(`Failed to fetch ${gender} products: ${error.message}`);
  }
};

// Async thunks with rejectWithValue
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
  async (category, { rejectWithValue }) => {
    try {
      return await getReleatedProducts(category);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTopSellingProducts = createAsyncThunk(
  "products/topSelling",
  async (_, { rejectWithValue }) => {
    try {
      return await getTopSellingProducts();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMostPupolarProducts = createAsyncThunk(
  "products/mostPupolar",
  async (_, { rejectWithValue }) => {
    try {
      return await getLatestProducts();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProductInfo = createAsyncThunk(
  "products/showProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return await getProductInfo(productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Redux slice
export const apiSlice = createSlice({
  name: "apiSlice",
  initialState: {
    genderProducts: { men: [], women: [] },
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
    cleanProductInfo: (state) => {
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
    cleanGenderProducts: (state) => {
      state.genderProducts = { men: [], women: [] };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTopSellingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topSellingProducsts = action.payload;
      })
      .addCase(fetchTopSellingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMostPupolarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMostPupolarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.mostPupolarProducsts = action.payload;
      })
      .addCase(fetchMostPupolarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.productInfo = action.payload;
      })
      .addCase(fetchProductInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReleatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReleatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.releatedProducts = action.payload;
      })
      .addCase(fetchReleatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

export const { cleanProductInfo, cleanGenderProducts, clearError } =
  apiSlice.actions;
export default apiSlice.reducer;
