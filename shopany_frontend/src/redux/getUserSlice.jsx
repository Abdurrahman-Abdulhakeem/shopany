import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/useAxios";
import errorToast from "../utils/errorToast";

export const getUser = createAsyncThunk("getUser/user", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("api/v1/user/");
    localStorage.setItem("active-user", JSON.stringify(data));
    return data;
  } catch (error) {
    let errorMsg = "";
    if (error.response && error.response.data.error) {
      errorMsg = error.response.data.error[0];
    } else if (error.response && error.response.message) {
      errorMsg = error.response.message;
    } else if (error.response && error.response.data.detail) {
      errorMsg = error.response.data.detail;
    } else {
      errorMsg = error.message;
    }
    errorToast(errorMsg);
    console.log(errorMsg, error);
    return thunkAPI.rejectWithValue(errorMsg);
  }
});

const getUserSlice = createSlice({
  name: "getUser",
  initialState: {
    userData: null,
  },
  loading: false,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const getUserState = (state) => state.getUser;
export default getUserSlice.reducer;
