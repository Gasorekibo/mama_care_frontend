import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const registerAction = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/register`,
        userData,
        config
      );
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkAuthAction = createAsyncThunk(
  "user/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      if (!userFromLocalStorage)
        return rejectWithValue("User is not authenticated");
      const response = await axios.post(`${baseUrl}/auth/check-auth`, {
        token: userFromLocalStorage?.access_token,
      });
      if (!response.data.valid)
        return rejectWithValue("You are currently signed out");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "User is not authenticated"
      );
    }
  }
);

export const loginAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/login`,
        userData,
        config
      );
      if (!response.data.access_token)
        return rejectWithValue("Invalid credentials");
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutAction = createAsyncThunk("user/logout", () =>
  localStorage.removeItem("userInfo")
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    isCheckingAuth: true,
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
    builder.addCase(registerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.auth = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(checkAuthAction.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isCheckingAuth = false;
      state.auth = {
        ...action.payload,
        access_token: userFromLocalStorage?.access_token,
      };
    });

    builder.addCase(checkAuthAction.rejected, (state) => {
      state.isLoggedIn = false;
      state.isCheckingAuth = false;
      state.auth = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
