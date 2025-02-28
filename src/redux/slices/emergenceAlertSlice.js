import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getAllEmergenceAlertsAction = createAsyncThunk(
  "emergence/getAll",
  async (_, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.get(`${baseUrl}/emergence-alert`, config);
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
export const getSingleEmergenceAlertAction = createAsyncThunk(
  "emergence/getOne",
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
        `${baseUrl}/emergence-alert/${id}`,
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

export const assignHealthProfessionalAction = createAsyncThunk(
  "emergence/assign",
  async ({ emergenceId, ...data }, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.patch(
        `${baseUrl}/emergence-alert/assign-health-professionals/${emergenceId}`,
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

export const updateEmergenceAlertStatusAction = createAsyncThunk(
  "emergence/updateStatus",
  async ({ id, ...status }, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.patch(
        `${baseUrl}/emergence-alert/${id}`,
        status,
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

export const updateHealthProfessionalEmergenceAlertAction = createAsyncThunk(
  "emergence/updateHealthProfessional",
  async ({ id, ...data }, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.patch(
        `${baseUrl}/emergence-alert/assigned-health-professionals/status/${id}`,
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
const emergenceAlertSlice = createSlice({
  name: "emergence",
  initialState: {
    emergence: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleEmergenceAlertAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleEmergenceAlertAction.fulfilled, (state, action) => {
        state.loading = false;
        state.emergence = action.payload;
      })
      .addCase(getSingleEmergenceAlertAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignHealthProfessionalAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignHealthProfessionalAction.fulfilled, (state, action) => {
        state.loading = false;
        state.emergence = action.payload;
      })
      .addCase(assignHealthProfessionalAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmergenceAlertStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmergenceAlertStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.emergence = action.payload;
      })
      .addCase(updateEmergenceAlertStatusAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(
        updateHealthProfessionalEmergenceAlertAction.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        updateHealthProfessionalEmergenceAlertAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.emergence = action.payload;
        }
      )
      .addCase(
        updateHealthProfessionalEmergenceAlertAction.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(getAllEmergenceAlertsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEmergenceAlertsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.emergence = action.payload;
      })
      .addCase(getAllEmergenceAlertsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default emergenceAlertSlice.reducer;
