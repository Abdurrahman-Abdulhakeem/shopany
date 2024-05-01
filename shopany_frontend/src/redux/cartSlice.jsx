import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/useAxios";
import successToast from "../utils/successToast";
import errorToast from "../utils/errorToast";

let cachedData;
let lastTimeFetch;

let currentTime = new Date().getTime();

export const getCarts = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    // if(cachedData && currentTime - lastTimeFetch < 6000) {
    //   return cachedData;
    // }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    try {
      await delay(1000);

      const { data } = await axiosInstance.get(`carts/`);

      cachedData = data;
      lastTimeFetch = currentTime;
    
      return data;
    } catch (error) {
      console.log(error);
      errorToast(`Oops! ${error.message}`);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "products/addProductToCart",
  async (obj, thunkAPI) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    try {
      await delay(500)
      const { data } = await axiosInstance.post(`carts/`, obj);
      successToast(`${obj.cartName} has been added to your cart!`)
      return data;
    } catch (error) {
      if (error.message) return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const deleteCart = createAsyncThunk("delete/cart", async (id, thunkAPI) => {

//   try {

//     const {data} = axiosInstance.delete(`carts/${id}`);
//     return data

//   }catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// })


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    totalPrice: 0,
    loading: false,
    isModalOpen: false,
    error: false
  },
  reducers: {
    incrementCartItem: (state, action) => {
      const cart = state.carts.find((cart) => cart.cartId === action.payload);

      cart.quantity += 1;
      cart.amount = cart.quantity * cart.price;
      state.totalPrice = state.carts.reduce(
        (sum, cart) => sum + cart.amount,
        0
      );
    },

    decrementCartItem: (state, action) => {
      const cart = state.carts.find((cart) => cart.cartId === action.payload);
      if (cart.quantity > 1) {
        cart.quantity -= 1;
        cart.amount = cart.quantity * cart.price;

        state.totalPrice = state.carts.reduce(
          (sum, cart) => sum + cart.amount,
          0
        );
      } else {
        state.carts = state.carts.filter(
          (cart) => cart.cartId !== action.payload
        );
        state.totalPrice = state.carts.reduce(
          (sum, cart) => sum + cart.amount,
          0
        );
      }
    },

    deleteCartItem: (state, action) => {
      state.carts = state.carts.filter(
        (cart) => cart.cartId !== action.payload
      );
      state.totalPrice = state.carts.reduce(
        (sum, cart) => sum + cart.amount,
        0
      );
      errorToast(`Product removed, cart has been updated!`)
    },

    emptyCart: (state) => {
      state.carts = [];
      state.totalPrice = 0;
      state.loading = false;
      state.isModalOpen = false;
      errorToast("No Items in Cart");
    },

    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.loading = false;
        state.totalPrice = state.carts.reduce(
          (sum, cart) => sum + cart.amount,
          0
        );
      })
      .addCase(getCarts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCarts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {     
          state.carts.unshift(action.payload);
          state.loading = false;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        })
      .addCase(addProductToCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const cartState = (state) => state.cart;
export const {
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  emptyCart,
  openModal,
  closeModal,
} = cartSlice.actions;
export default cartSlice.reducer;
