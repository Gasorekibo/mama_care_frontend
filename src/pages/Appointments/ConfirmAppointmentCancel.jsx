import { useDispatch } from "react-redux";
import { reScheduleAppointment } from "../../redux/slices/appointmentsSlice";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
function ConfirmAppointmentCancel({
  appointmentId,
  closeModal,
  chwId,
  appointment,
}) {
  const dispatch = useDispatch();
  async function deleteConfirmed() {
    const dataToSubmit = {
      start_date: "",
      end_date: "",
      type: appointment?.type,
      notes: appointment?.notes,
      status: "CANCELLED",
      chwId,
      id: appointmentId,
    };
    const response = await dispatch(reScheduleAppointment(dataToSubmit));
    if(response?.error) {
      toast.error(response?.payload);
    } else {
      await toast.success("Appointment Cancelled Successfully");
      closeModal();
    }
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h1 className="text-xl font-semibold text-center text-gray-700 mb-6">
        Are you sure you want to cancel this appointment?
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={deleteConfirmed}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Yes
        </button>
        <button
          onClick={closeModal}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default ConfirmAppointmentCancel;
