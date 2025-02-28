import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentsAction } from "../../redux/slices/appointmentsSlice";
import PregnantAppointments from "./PregnantAppointments";
function AllAppointments() {
  const { appointments } = useSelector((state) => state.appointments);

  const { auth } = useSelector((state) => state.auth);
  const loggedInUser = auth?.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointmentsAction());
  }, [dispatch]);
  const pregnantAppointments = appointments.filter(
    (appointment) => appointment?.owner?.id === loggedInUser?.id
  );
  const chwAppointments = appointments.filter(
    (appointment) => appointment?.healthWorker?.id === loggedInUser?.id
  );
  return (
    <Fragment>
      {loggedInUser?.role === "COMMUNITY_HEALTH_WORKER" ? (
        <PregnantAppointments appointments={chwAppointments} />
      ) : (
        <PregnantAppointments appointments={pregnantAppointments}/>
      )}
    </Fragment>
  );
}

export default AllAppointments;
