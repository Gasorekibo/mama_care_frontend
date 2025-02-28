export default function getAllChwData(id, appointments, educationContent) {
  const appointment = appointments.filter(
    (appointment) => appointment.healthWorker?.id === id
  );
  const missedVisits = appointment.filter(
    (appointment) => appointment?.status === "MISSED"
  );
  const trainingContent = educationContent.filter(
    (content) => content?.author?.id === id
  );
  const upComingAppointments = appointment.filter(
    (appointment) => appointment?.start_date >= new Date().toISOString()
  );
  const chwData = {
    appointment,
    missedVisits,
    trainingContent,
    upComingAppointments,
  };
  return chwData;
}
