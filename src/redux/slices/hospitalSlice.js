import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getAllHospitalAction = createAsyncThunk(
  "hospital/getAllHospital",
  async (_, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };

    try {
      const response = await axios.get(`${baseUrl}/facility`, config);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const findNearByHospitalAction = createAsyncThunk(
  "hospital/findNearByHospital",
  async (data, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    const { latitude, longitude, maxDistance } = data;
    const url = maxDistance
      ? `${baseUrl}/facility/nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`
      : `${baseUrl}/facility/nearby?latitude=${latitude}&longitude=${longitude}`;
    try {
      const response = await axios.get(url, config);
      return response?.data?.hospitals;
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const getSingleHospital = createAsyncThunk(
  "hospital/getSingleHospital",
  async (id, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const hospital = await axios.get(`${baseUrl}/facility/${id}`, config);
      return hospital.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const loginHospitalAction = createAsyncThunk(
  "hospital/loginHospital",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/facility/login`, data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    hospitals: [],
    nearByHospitals: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllHospitalAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHospitalAction.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(getAllHospitalAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findNearByHospitalAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findNearByHospitalAction.fulfilled, (state, action) => {
        state.loading = false;
        state.nearByHospitals = action.payload;
      })
      .addCase(findNearByHospitalAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(getSingleHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginHospitalAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginHospitalAction.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(loginHospitalAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hospitalSlice.reducer;
