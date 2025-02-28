/* eslint-disable react/prop-types */
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  MessageCircle,
  Activity,
  UserPen,
} from "lucide-react";
import ScheduleAppointmentForm from "../../../pages/Appointments/ScheduleAppointmentForm";
import { Modal } from "flowbite-react";
import ModalPopUp from "../../shared/ModalPopUp";
import { useState } from "react";

function UserList({ user, openModal, auth }) {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const latestRecord = user.pregnancyHealthRecords[0];
  function openAppointmentModal() {
    setShowAppointmentModal(true);
  }
  function closeAppointmentModal() {
    setShowAppointmentModal(false);
  }
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={user?.profileImageUrl}
          alt={user?.full_name}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {user?.full_name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>
                  {user?.location?.region}, {user?.location?.province}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal(user?.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
              >
                <MessageCircle size={18} />
                Chat
              </button>
              {user?.role === "COMMUNITY_HEALTH_WORKER" && (
                <button
                  onClick={openAppointmentModal}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Calendar size={18} />
                  Book
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={16} />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={16} />
              <span>{user?.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>Joined: {formatDate(user?.createdAt)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserPen size={26} />
                <span>{user?.role}</span>
              </div>
            </div>

            {latestRecord?.weekOfPregnancy &&
              (auth?.user?.role === "COMMUNITY_HEALTH_WORKER" ||
                auth?.role === "ADMIN") && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Activity size={16} />
                  <span>Week {latestRecord?.weekOfPregnancy} of Pregnancy</span>
                </div>
              )}
          </div>

          {latestRecord &&
            (auth?.user?.role === "COMMUNITY_HEALTH_WORKER" ||
              auth?.role === "ADMIN") && (
              <div className="mt-3 p-2 bg-blue-50 rounded-md">
                <p className="text-xs text-blue-600 font-medium">
                  Latest Health Record ({formatDate(latestRecord.date)})
                </p>
                <div className="mt-1 grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <span>
                    BP: {latestRecord.bloodPressure.systolic}/
                    {latestRecord.bloodPressure.diastolic}
                  </span>
                  <span>Weight: {latestRecord.weight}kg</span>
                  <span>Mood: {latestRecord.mood}</span>
                </div>
              </div>
            )}
        </div>
      </div>
      <ModalPopUp
        showModal={showAppointmentModal}
        closeModal={closeAppointmentModal}
        title={`Schedule Appointment with ${user?.full_name}`}
      >
        <Modal.Body>
          <ScheduleAppointmentForm closeModal={closeAppointmentModal} chwId={user?.id} />
        </Modal.Body>
      </ModalPopUp>
    </div>
  );
}

export default UserList;
