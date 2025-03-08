import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ambulance, Bell } from "lucide-react";
import {
  setActiveChat,
  markMessageAsRead,
  addMessage,
  createEmergencyAlert,
} from "../../../redux/slices/chatSlice";
import { NotificationComponent } from "./Notifications";
import { getAllUserAction } from "../../../redux/slices/userSlice";
import UserList from "./UserList";
import { Modal } from "flowbite-react";
import Chat from "../../shared/Chat";
import ModalPopUp from "../../shared/ModalPopUp";
import getLocation from "../../../lib/helpers/getLocation";
import toast from "react-hot-toast";
import { findNearByHospitalAction } from "../../../redux/slices/hospitalSlice";
import { sendEmail } from "../../../redux/slices/emailSlice";

const EmergenceAlert = () => {
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [showModal, setShowModal] = useState(false);
  function openModal(id) {
    dispatch(setActiveChat(id));
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }

  const { notifications } = useSelector((state) => state.notifications);
  const [showNotification, setShowNotification] = useState(false);
  const [ourMessages, setOurMessages] = useState([]);

  const { messages, activeChat } = useSelector((state) => state.chat);
  const { auth } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { loading, error, currentEmergency } = useSelector(
    (state) => state.chat
  );
  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "socket/connect" });
  }, [dispatch]);

  useEffect(() => {
    async function getUserLocation() {
      try {
        const { latitude, longitude } = await getLocation();
        setUserLocation({ latitude, longitude });
      } catch (error) {
        toast.error(error);
      }
    }
    getUserLocation();
  }, [dispatch]);
  const sendMessage = (content) => {
    if (activeChat && content.trim()) {
      const newMessage = {
        id: Date.now(),
        content,
        sender: { id: auth.user.id },
        receiver: { id: activeChat },
        read: false,
        createdAt: new Date().toISOString(),
      };

      dispatch(addMessage(newMessage));
      dispatch({
        type: "chat/sendMessage",
        payload: {
          receiverId: activeChat,
          content,
        },
      });
    }
  };
  function handleToggleNotification() {
    setShowNotification(!showNotification);
  }
  const handleReadMessage = (messageId) => {
    dispatch({
      type: "chat/readMessage",
      payload: messageId,
    });
    dispatch(markMessageAsRead(messageId));
  };
  useEffect(() => {
    if (!activeChat) {
      setOurMessages(messages);
      return;
    }
    const filteredMessages = messages.filter(
      (msg) => msg?.sender?.id === activeChat || msg.receiver?.id === activeChat
    );
    setOurMessages(filteredMessages);
  }, [messages, activeChat]);
  const userToChatWith =
    Array.isArray(users) &&
    users?.filter(
      (user) => user?.id !== auth?.user?.id && user?.role !== "ADMIN"
    );
  // =============================== Emergence Alert ===============================
  async function handleEmergencyAlert() {
    const searchParams = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      maxDistance: 60,
    };
    // First find nearby hospitals
    dispatch(findNearByHospitalAction(searchParams)).then(() => {
      // Only create alert if hospitals are found
      if (nearByHospitals && nearByHospitals.length > 0) {
        const alertData = {
          location: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          emergencyType: "Medical Emergency",
          hospitalIds: nearByHospitals.map((hospital) => hospital.id),
          senderInfo: {
            id: auth.user.id,
            name: auth.user.full_name,
            role: auth.user.role,
          },
        };
        dispatch(createEmergencyAlert(alertData)).then(() => {
          // ======= send Email to nearby hospitals =========
          const emailData = {
            recipients: nearByHospitals.map((hos) => hos?.email) || [],
            subject: `Mama-Care New Emergence Alert from ${auth?.user?.full_name}`,
            html: (
              <div>
                <h5>
                  Hello there is a new emergence alert triggered. Be the first
                  one to respond on it.
                </h5>
                <p>
                  The location was triggered to you because you are close the
                  emergence point located at: 
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${userLocation.latitude},${userLocation.longitude}`}
                  >
                    {userLocation.latitude}, {userLocation.longitude}
                  </a>
                </p>
              </div>
            ),
          };
          dispatch(sendEmail(emailData));
        });
      }
    });
  }
  const { nearByHospitals, error: hospitalError } = useSelector(
    (state) => state.hospitals
  );
  useEffect(() => {
    if (hospitalError) {
      toast.error(hospitalError?.message);
    }
  }, [hospitalError, nearByHospitals]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Show success toast when emergency alert is sent
  useEffect(() => {
    if (currentEmergency) {
      toast.success(`Emergency alert sent to nearby hospitals`);
    }
  }, [currentEmergency]);

  return (
    <>
      <div
        className="absolute top-4 right-4 rounded-full  p-1 z-50 hover:bg-gray-300"
        onClick={handleToggleNotification}
      >
        <p
          className="inline cursor-pointer relative rounded-full focus:outline-none transition"
          onClick={handleToggleNotification}
        >
          <Bell size={34} className="text-2xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-sm w-4 h-4 flex items-center justify-center">
            {notifications?.length}
          </span>
        </p>
      </div>

      {showNotification && (
        <NotificationComponent notifications={notifications} openModal={openModal} />
      )}

      {userToChatWith?.length > 0 &&
        userToChatWith?.map((user) => (
          <UserList
            key={user?.id}
            user={user}
            setActiveChat={setActiveChat}
            openModal={openModal}
            auth={auth}
          />
        ))}
      {auth?.user?.role === "PREGNANT_WOMAN" && (
        <button
          onClick={handleEmergencyAlert}
          disabled={loading}
          className="bg-red-500 absolute right-3 bottom-20 md:font-bold animate-bounce flex gap-1 md:gap-3 p-3 text-white md:absolute md:right-0 md:bottom-0 md:p-8 md:text-xl rounded-full md:shadow-lg md:mr-4 md:mb-4 md:z-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            "Sending Alert..."
          ) : (
            <>
              Emergency Alert
              <Ambulance
                size={20}
                className="text-white font-extrabold animate-ping"
              />
            </>
          )}
        </button>
      )}

      <ModalPopUp
        showModal={showModal}
        closeModal={closeModal}
        title={`Talk to ${
          userToChatWith
            ? userToChatWith?.find((user) => user?.id === activeChat)?.full_name
            : "Our User"
        }`}
      >
        <Modal.Body>
          <Chat
            ourMessages={ourMessages}
            auth={auth}
            sendMessage={sendMessage}
            handleReadMessage={handleReadMessage}
          />
        </Modal.Body>
      </ModalPopUp>
    </>
  );
};
export default EmergenceAlert;
