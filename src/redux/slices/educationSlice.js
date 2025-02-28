import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getAllEducationAction = createAsyncThunk(
  "education/getAll",
  async (_, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.get(`${baseUrl}/education-content`, config);
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

export const addEducationAction = createAsyncThunk(
  "education/add",
  async (education, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.post(
        `${baseUrl}/education-content`,
        education,
        config
      );
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

export const deleteEducationAction = createAsyncThunk(
  "education/add",
  async (educationId, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.delete(
        `${baseUrl}/education-content/${educationId}`,
        config
      );
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

const educationSlice = createSlice({
  name: "education",
  initialState: {
    education: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEducationAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEducationAction.fulfilled, (state, action) => {
        state.loading = false;
        state.education = action.payload;
      })
      .addCase(getAllEducationAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEducationAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEducationAction.fulfilled, (state, action) => {
        state.loading = false;
        state.education.push(action.payload);
      })
      .addCase(addEducationAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default educationSlice.reducer;
