// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    const cartProductsJson = localStorage.getItem("CartProducts");
    if (!cartProductsJson) return { cartItems: [], subTotalPrice: 0 };
    const cartProductsJs = JSON.parse(cartProductsJson);
    const data = await Promise.all(
      cartProductsJs.map(async (el) => {
        const response = await axios.get(
          `https://dummyjson.com/products/${el.id}`
        );
        return {
          id: el.id,
          quantity: el.quantity,
          imageUrl: response.data.images[0],
          productName: response.data.title,
          price: response.data.price,
        };
      })
    );
    const total = data.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return { cartItems: data, subTotalPrice: total };
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async function ({ userId, products }, thunkApi) {
    console.log(products);
    try {
      const response = await axios.post("https://dummyjson.com/carts/add", {
        userId,
        products: [
          {
            id: products.id,
            quantity: products.quantity,
          },
        ],
      });
      const storageData = localStorage.getItem("CartProducts");
      const JsData = JSON.parse(storageData);

      const existingProduct = JsData.find((p) => p.id === products.id);

      if (existingProduct) {
        existingProduct.quantity += products.quantity;
      } else {
        JsData.push({ id: products.id, quantity: products.quantity });
      }
      const cartJson = JSON.stringify(JsData);
      localStorage.setItem("CartProducts", cartJson);
      return cartJson;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    subTotalPrice: 0,
    status: "idle",
    error: null,
    currItemId: "0",
  },
  reducers: {
    setCurrItemId: (state, action) => {
      state.currItemId = action.payload;
    },
    addToQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
        const total = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        state.subTotalPrice = total;
      }
    },
    removeFromQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity -= 1;
      }
      const total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.subTotalPrice = total;
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((el) => el.id !== id);
      const total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.subTotalPrice = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.subTotalPrice = action.payload.subTotalPrice;
        state.status = "succeeded";
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const cartData = JSON.parse(action.payload);
        state.cartItems = cartData;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const {
  addToQuantity,
  removeFromQuantity,
  deleteFromCart,
  setCurrItemId,
} = cartSlice.actions;
export default cartSlice.reducer;
