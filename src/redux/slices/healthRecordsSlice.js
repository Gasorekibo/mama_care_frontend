import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const fetchHealthRecords = createAsyncThunk(
  "healthRecords/fetchHealthRecords",
  async (id, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.get(
        `${baseUrl}/p-health-record/${id}`,
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

export const updateHealthRecord = createAsyncThunk(
  "healthRecords/updateHealthRecord",
  async ({ id, key, value }, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.patch(
        `${baseUrl}/p-health-record/${id}`,
        { id, key, value },
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

export const createHealthRecord = createAsyncThunk(
  "healthRecords/createHealthRecord",
  async (data, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.post(
        `${baseUrl}/p-health-record/${data?.id}`,
        data,
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

export const updateHealthRecordAttOnce = createAsyncThunk("healthRecord/updateAll",async (data, { rejectWithValue, getState })=> { 
  const user = getState()?.auth?.auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.access_token}`,
    }
  };
  try {
    const response = await axios.patch(
      `${baseUrl}/p-health-record/all/${data?.id}`,
      data,
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
})

export const healthRecordsSlice = createSlice({
  name: "healthRecords",
  initialState: {
    healthRecords: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHealthRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.healthRecords = action.payload;
      })
      .addCase(fetchHealthRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateHealthRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHealthRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.healthRecords = action.payload;
      })
      .addCase(updateHealthRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default healthRecordsSlice.reducer;
