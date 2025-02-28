import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const getAllAppointmentsAction = createAsyncThunk(
  "appointments/getAll",
  async (_, { rejectWithValue, getState }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    try {
      const response = await axios.get(`${baseUrl}/appointments`, config);
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

export const reScheduleAppointment = createAsyncThunk(
  "appointments/reSchedule",
  async ({ id, ...data }, { getState, rejectWithValue }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };

    try {
      const response = await axios.patch(
        `${baseUrl}/appointments/${id}`,
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
export const editApointmentAction = createAsyncThunk(
  "appointments/edit",
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

export const createAppointmentAction = createAsyncThunk(
  "appointments/create",
  async ({ chwId, ...data }, { getState, rejectWithValue }) => {
    const user = getState()?.auth?.auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    };
    console.log('called',chwId, data)
    try {
      const response = await axios.post(
        `${baseUrl}/appointments/${chwId}`,
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
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointmentsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAppointmentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAllAppointmentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editApointmentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(editApointmentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(editApointmentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(reScheduleAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reScheduleAppointment.fulfilled, (state, { payload }) => {
      state.appointments = state.appointments.map((appointment) =>
        appointment.id === payload.id ? payload : appointment
      );
      state.loading = false;
    });
    builder.addCase(reScheduleAppointment.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(createAppointmentAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAppointmentAction.fulfilled, (state, { payload }) => {
      state.appointments.push(payload);
      state.loading = false;
    });
    builder.addCase(createAppointmentAction.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export default appointmentsSlice.reducer;
