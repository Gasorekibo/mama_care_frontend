import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPendingNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationAsRead: (state, action) => {
      state.notifications = state.notifications.map((notif) => {
        if (notif.id === action.payload) {
          return { ...notif, read: true };
        }
        return notif;
      });
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
  },
});

export const {
  setPendingNotifications,
  addNotification,
  clearNotification,
  markNotificationAsRead,
} = notificationSlice.actions;
export default notificationSlice.reducer;
