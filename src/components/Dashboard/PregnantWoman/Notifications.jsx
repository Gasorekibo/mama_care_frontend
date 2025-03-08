/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  clearNotification,
} from "../../../redux/slices/notificationSlice";
import { useCallback, useEffect } from "react";

export const NotificationComponent = ({ notifications, openModal }) => {
  const dispatch = useDispatch();
  function handleReadNotification(notificationId) {
    dispatch({
      type: "notification/readNotification",
      payload: notificationId,
    });
    dispatch(clearNotification(notificationId));
  }
  // Function to play notification sound
  const playNotificationSound = useCallback(() => {
    const audio = new Audio("../../public/notification-sound.mp3");
    audio.play().catch((error) => console.log("Error playing sound:", error));
  }, []);
  useEffect(() => {
    if (notifications.length > 0) {
      playNotificationSound();
    }
  }, [notifications.length, playNotificationSound]);

  return (
    <div className="fixed top-4 right-14 z-20">
      {!notifications.length && (
        <p className="bg-blue-500 rounded-md text-white shadow-md text-sm p-2 relative top-10">
          No New notification
        </p>
      )}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white shadow-lg rounded-lg p-4 mb-2 max-w-sm animate-slideIn"
        >
          <div
            onClick={() => { handleReadNotification(notification?.id); openModal(notification?.senderUser?.id); console.log(notification)}}
            className="flex justify-between items-start cursor-pointer"
          >
            <div>
              <p className="font-medium">{notification.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(
                  notification.timestamp || notification?.createdAt
                ).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => dispatch(clearNotification(notification.id))}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
