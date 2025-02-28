/* eslint-disable react/prop-types */
import { AppointmentsGrid } from "./AppointmentGrid";

function PregnantAppointments({ appointments, isOnModal }) {
  return (
    <>
      {!appointments?.length && (
        <div className="text-center p-4">
          <h2 className="text-xl font-bold text-gray-900">
            No Appointment Scheduled Yet
          </h2>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Schedule Now
          </button>
        </div>
      )}
      <AppointmentsGrid appointments={appointments} isOnModal={isOnModal} />
    </>
  );
}

export default PregnantAppointments;
