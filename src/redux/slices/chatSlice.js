import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const createEmergencyAlert = createAsyncThunk(
  'chat/createEmergencyAlert',
  async (alertData, { dispatch }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      dispatch({
        type: "emergency/sendAlert",
        payload: alertData
      });
      return alertData; 
    } catch (error) {
      throw error; 
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
    activeChat: null,
    emergencyAlerts: [],
    currentEmergency: null,
  },
  reducers: {
    setPendingMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    markMessageAsRead: (state, action) => {
      const message = state.messages.find((m) => m.id === action.payload);
      if (message) {
        message.read = true;
      }
    },
    updateEmergencyStatus: (state, action) => {
      const { emergencyId, status } = action.payload;
      const emergency = state.emergencyAlerts.find(
        (alert) => alert.id === emergencyId
      );
      if (emergency) {
        emergency.status = status;
      }
      if (state.currentEmergency?.id === emergencyId) {
        state.currentEmergency.status = status;
      }
    },
    clearCurrentEmergency: (state) => {
      state.currentEmergency = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmergencyAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmergencyAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEmergency = action.payload;
        state.emergencyAlerts.push(action.payload);
      })
      .addCase(createEmergencyAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPendingMessages,
  addMessage,
  setActiveChat,
  markMessageAsRead,
  updateEmergencyStatus,
  clearCurrentEmergency,
} = chatSlice.actions;

export default chatSlice.reducer;
