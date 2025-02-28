import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import usersReducer from "../slices/userSlice";
import educationReducer from "../slices/educationSlice";
import hospitalReducer from "../slices/hospitalSlice";
import chatReducer from "../slices/chatSlice";
import notificationReducer from "../slices/notificationSlice";
import { healthRecordsSlice } from "../slices/healthRecordsSlice";
import appointmentsReducer from "../slices/appointmentsSlice";
import { socketMiddleware } from "../middleware/socketMiddleware";
import emergenceReducer from "../slices/emergenceAlertSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    education: educationReducer,
    hospitals: hospitalReducer,
    //appointment: appointmentReducer,
    healthRecord: healthRecordsSlice.reducer,
    appointments: appointmentsReducer,
    chat: chatReducer,
    notifications: notificationReducer,
    emergence: emergenceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(socketMiddleware),
});

export default store;
