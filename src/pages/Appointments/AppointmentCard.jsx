/* eslint-disable react/prop-types */
import ModalPopUp from "../../components/shared/ModalPopUp";
import { useState } from "react";
import ScheduleAppointmentForm from "./ScheduleAppointmentForm";
import ConfirmAppointmentCancel from "./ConfirmAppointmentCancel";
import { dateFormatter, getStatusColor } from "../../lib/helpers";
import { Modal } from "flowbite-react";
import { useSelector } from "react-redux";

const AppointmentCard = ({ appointment }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const userRole = auth?.user?.role;
  function openModal() {
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }
  function openConfirmationModal() {
    setShowConfirmationModal(true);
  }
  function closeConfirmationModal() {
    setShowConfirmationModal(false);
  }
  function renderAppointmentUsers() {
    return userRole === "COMMUNITY_HEALTH_WORKER" ? (
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Pregnant Woman Details</h3>
        <div className="flex items-center space-x-4">
          <img
            src={appointment?.owner?.profileImageUrl}
            alt={appointment?.owner?.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">
              {appointment?.owner?.full_name}
            </p>
            <p className="text-sm text-gray-500">{appointment?.owner?.email}</p>
            <p className="text-sm text-gray-500">
              {appointment?.owner?.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Health Worker</h3>
        <div className="flex items-center space-x-4">
          <img
            src={appointment?.healthWorker?.profileImageUrl}
            alt={appointment?.healthWorker?.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">
              {appointment?.healthWorker?.full_name}
            </p>
            <p className="text-sm text-gray-500">
              {appointment?.healthWorker?.email}
            </p>
            <p className="text-sm text-gray-500">
              {appointment?.healthWorker?.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {!appointment && (
        <div className="bg-white rounded-lg shadow-md h-full p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            No appointments found
          </h2>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md h-full">
        {/* Header with status and type */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  appointment?.status
                )}`}
              >
                {appointment?.status}
              </span>
              <h2 className="mt-2 text-xl font-bold text-gray-900">
                {appointment?.type?.replace(/_/g, " ")}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Appointment ID</p>
              <p className="font-semibold">#{appointment.id}</p>
            </div>
          </div>
        </div>

        {/* Date and Time Section */}
        <div className="p-4 bg-blue-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Start Time</p>
              <p className="font-semibold text-gray-900">
                {dateFormatter(appointment?.start_date)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">End Time</p>
              <p className="font-semibold text-gray-900">
                {dateFormatter(appointment?.end_date)}
              </p>
            </div>
          </div>
        </div>

        {renderAppointmentUsers()}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Location</h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Address:</span>{" "}
              {appointment?.healthWorker?.location?.address}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Region:</span>{" "}
              {appointment?.healthWorker?.location?.region}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Province:</span>{" "}
              {appointment?.healthWorker?.location.province}
            </p>
          </div>
        </div>

        {/* Notes Section */}
        {appointment.notes && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
              {appointment.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reschedule
          </button>
          <button
            onClick={openConfirmationModal}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Modal */}
        {showConfirmationModal ? (
          <ModalPopUp
            showModal={showConfirmationModal}
            title="Cancel Appointment"
            closeModal={closeConfirmationModal}
          >
            <Modal.Body>
              <ConfirmAppointmentCancel
                appointmentId={appointment.id}
                closeModal={closeConfirmationModal}
                appointment={appointment}
                chwId={appointment?.healthWorker?.id}
              />
            </Modal.Body>
          </ModalPopUp>
        ) : (
          <ModalPopUp
            showModal={showModal}
            title="Appointment Details"
            closeModal={closeModal}
          >
            <Modal.Body>
              <ScheduleAppointmentForm
                appointment={appointment}
                title={"Reschedule Your Appointment"}
                closeModal={closeModal}
                chwId={appointment?.healthWorker?.id}
              />
            </Modal.Body>
          </ModalPopUp>
        )}
      </div>
    </>
  );
};
export default AppointmentCard;
