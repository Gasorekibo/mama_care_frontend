import { io } from "socket.io-client";
import { addNotification } from "../slices/notificationSlice";
import { addMessage } from "../slices/chatSlice";
export const socketMiddleware = (store) => {
  let socket;

  return (next) => (action) => {
    if (action.type === "socket/connect") {
      const token = store.getState().auth.auth?.access_token;
      socket = io("http://localhost:3000", {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle socket events
      socket.on("connect", () => {
        store.dispatch({ type: "socket/connected" });
      });

      socket.on("pending-messages", (messages) => {
        store.dispatch({ type: "chat/setPendingMessages", payload: messages });
      });

      socket.on("new-message", (message) => {
        store.dispatch(addMessage(message));
        store.dispatch(
          addNotification({
            id: Date.now(),
            type: "chat",
            content: `New message  ${message.content.substring(0, 15)}...`,
            timestamp: new Date().toISOString(),
          })
        );
      });

      socket.on("pending-notifications", (notifications) => {
        store.dispatch({
          type: "notifications/setPendingNotifications",
          payload: notifications,
        });
      });
      socket.on("emergency-alert-response", (response) => {
        store.dispatch(
          addNotification({
            id: Date.now(),
            type: "emergency",
            content: `Emergency alert sent to ${response.notifiedHospitals} hospitals`,
            timestamp: new Date().toISOString(),
          })
        );
      });
    }

    if (action.type === "chat/sendMessage") {
      socket.emit("send-message", action.payload);
    }
    if (action.type === "chat/readMessage") {
      socket.emit("read-message", action.payload);
    }

    if (action.type === "notification/readNotification") {
      socket.emit("read-notification", action.payload);
    }
    if (action.type === "emergency/sendAlert") {
      socket.emit("send-emergence-alert", action.payload);
    }
    return next(action);
  };
};
