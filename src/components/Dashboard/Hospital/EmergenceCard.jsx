/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPopUp from "../../shared/ModalPopUp";
import { Modal } from "flowbite-react";
import ResponseTeamTable from "./EmergenceTabs/ResponseTeamTable";
function EmergenceCard({ emergency, id, professionals }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  function showModalHandler() {
    setShowModal(true);
  }
  function closeModalHandler() {
    setShowModal(false);
  }
  return (
    <>
      <div className="bg-red-50 rounded-lg p-4 border border-red-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={emergency?.user?.profileImageUrl || "/api/placeholder/48/48"}
              alt="Patient"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-700">
              {emergency?.emergencyType}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Patient:</span>{" "}
                {emergency?.user?.full_name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{" "}
                {emergency?.user?.role}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Location:</span>{" "}
                {emergency?.location?.latitude || "N/A"},{" "}
                {emergency?.location?.longitude || "N/A"}
              </p>
              <div className="flex justify-between md:mt-4">
                <button
                  onClick={showModalHandler}
                  className=" text-blue-500 font-medium text-left border-blue-500 border px-2 py-1 rounded-lg"
                >
                  Take it
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/profile/${id}/hospital/emergence/${emergency?.id}`
                    )
                  }
                  className=" text-blue-500 font-medium text-left border-blue-500 border px-2 py-1 rounded-lg"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalPopUp
        showModal={showModal}
        title="Assign Profession to Emergency"
        closeModal={closeModalHandler}
      >
        <Modal.Body>
          <ResponseTeamTable
            isForAssigning={true}
            responders={professionals || []}
            emergencyId={emergency?.id}
            closeModal={closeModalHandler}
          />
        </Modal.Body>
      </ModalPopUp>
    </>
  );
}

export default EmergenceCard;
