import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/useAxios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await delay(1000);

      const { data } = await axiosInstance.get("products/");

      return data;
    } catch (error) {
      if (error.message) return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },

  reducers: {
    incrementProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.productId === action.payload
      );
      product.quantity++;
    },

    decrementProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.productId === action.payload
      );
      if (product.quantity > 1) {
        product.quantity--;
      }
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const productState = (state) => state.product;
export const {
  incrementProduct,
  decrementProduct,
//   updateExistProduct,

} = productSlice.actions;
export default productSlice.reducer;
