/* eslint-disable react/prop-types */
import AppointmentCard from "./AppointmentCard";
import classNames from "classnames";
export const AppointmentsGrid = ({ appointments, isOnModal }) => {
  return (
    <div className="container mx-auto p-6">
      <div className={ classNames(isOnModal ? "grid-cols-1" : "grid grid-cols-1 md:grid-cols-2 gap-4")}>
        {appointments?.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};
