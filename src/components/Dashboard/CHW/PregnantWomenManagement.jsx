/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../../redux/slices/userSlice";
import { Calendar, Eye, Phone, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalPopUp from "../../shared/ModalPopUp";
import { Modal } from "flowbite-react";
import PregnantWomanInfo from "./PregnantWomanInfo";
import { getAllAppointmentsAction } from "../../../redux/slices/appointmentsSlice";
import PregnantAppointments from "../../../pages/Appointments/PregnantAppointments";
import PregnancyHealthRecordForm from "../PregnantWoman/PregnantHealthRecordForm";

const PregnantWomenManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState({
    details: false,
    edit: false,
    appointments: false,
  });
  const [selectedWoman, setSelectedWoman] = useState(null);

  const { appointments } = useSelector((state) => state.appointments);
  const { users } = useSelector((state) => state.users);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUserAction());
    dispatch(getAllAppointmentsAction());
  }, [dispatch]);

  const pregnantWomen =
    users?.filter((user) => user.role === "PREGNANT_WOMAN") || [];

  const pregnantAppointments = selectedWoman
    ? appointments.filter(
        (appointment) =>
          appointment?.owner?.id === selectedWoman?.id &&
          appointment?.healthWorker?.id === auth?.user?.id
      )
    : [];
  const openModal = (modalType, woman = null) => {
    if (woman) setSelectedWoman(woman);
    setModalState({ ...modalState, [modalType]: true });
  };

  const closeModal = (modalType) => {
    setModalState({ ...modalState, [modalType]: false });
    if (modalType === "edit") setSelectedWoman(null);
  };
  const EmptyState = () => (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No Pregnant Women Data Found
      </h2>
      <p className="text-gray-600 mb-6">
        Add new patient entries to manage pregnancy care.
      </p>
      <button
        onClick={() => navigate(`/profile/${auth?.user?.id}/new-entry`)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
      >
        Add New Patient
      </button>
    </div>
  );
  // Patient table row component
  const PatientRow = ({ woman }) => (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {woman?.full_name?.charAt(0) || "?"}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {woman?.full_name || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">Patient ID: #{woman.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900 flex items-center gap-2">
          <Phone className="size-4" />
          {woman?.phoneNumber || "N/A"}
        </p>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-blue-600">
          {woman?.pregnancyHealthRecords[0]?.weekOfPregnancy || "Not specified"}{" "}
          weeks
        </span>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900">
          {woman?.lastCheckup
            ? new Date(woman.lastCheckup).toLocaleDateString()
            : "No checkup"}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal("details", woman)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="View Details"
            aria-label="View patient details"
          >
            <Eye />
          </button>
          <button
            onClick={() => openModal("edit", woman)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
            title="Edit Information"
            aria-label="Edit patient information"
          >
            <SquarePen />
          </button>
          <button
            onClick={() => openModal("appointments", woman)}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Schedule Appointment"
            aria-label="View and schedule appointments"
          >
            <Calendar />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto px-4">
      {!pregnantWomen.length ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex justify-between items-center my-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Pregnant Women Management
            </h1>
            <button
              onClick={() => navigate(`/profile/${auth?.user?.id}/new-entry`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              New Entry
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Patient Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contact Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pregnancy Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Checkup
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pregnantWomen.map((woman) => (
                  <PatientRow key={woman.id} woman={woman} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modals */}
      <ModalPopUp
        showModal={modalState.details}
        closeModal={() => closeModal("details")}
        title={`Patient Details: ${selectedWoman?.full_name || "Patient"}`}
      >
        <Modal.Body>
          <PregnantWomanInfo womanData={selectedWoman} />
        </Modal.Body>
      </ModalPopUp>

      <ModalPopUp
        showModal={modalState.appointments}
        closeModal={() => closeModal("appointments")}
        title={`Appointments: ${selectedWoman?.full_name || "Patient"}`}
      >
        <Modal.Body>
          <PregnantAppointments appointments={pregnantAppointments} isOnModal={true}/>
        </Modal.Body>
      </ModalPopUp>

      {/* Edit Modal */}

      <ModalPopUp
        showModal={modalState.edit}
        closeModal={() => closeModal("edit")}
        title={`Edit ${selectedWoman?.full_name || "Patient"} Information`}
      >
        <Modal.Body>
          <PregnancyHealthRecordForm isForUpdate={true} userId={selectedWoman?.id} />
        </Modal.Body>
      </ModalPopUp>
    </div>
  );
};

export default PregnantWomenManagement;
