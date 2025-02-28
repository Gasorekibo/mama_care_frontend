import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import ModalPopUp from "./ModalPopUp";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
function HospitalCard({ hospital }) {
  const [showModal, setShowModal] = useState(false);
  function openModal() {
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-4 relative">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
        <div className="relative group/image overflow-hidden cursor-pointer">
          <img
            src={hospital?.profilePicture}
            alt="Hospital"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
            <div className="p-4 transform translate-y-full group-hover/image:translate-y-0 transition-transform duration-300">
              <div className="mb-2">
                <h1 className="font-extrabold mb-2 text-xl underline">
                  Our Services
                </h1>
                <p className="grid grid-cols-3 gap-2 font-semibold text-sm">
                  {hospital?.servicesOffered?.map((service) => (
                    <span key={service} className="text-gray-800">
                      {service}
                    </span>
                  ))}
                </p>
              </div>
              <div className="col-span-2">
                <h1 className="font-extrabold mb-2 text-xl underline">
                  More Info
                </h1>

                <p className="font-semibold">
                  Phone:
                  <span className="font-normal mx-2">
                    {hospital?.contactNumber}
                  </span>
                </p>
                <p className="font-semibold">
                  Email:
                  <span className="font-normal mx-2">{hospital?.email}</span>
                </p>
                <p className="font-semibold">
                  Open:
                  <span className="font-normal mx-2">
                    {hospital?.openingTime}
                  </span>
                </p>

                <p className="font-semibold">
                  Close:
                  <span className="font-normal mx-2">
                    {hospital?.closingTime}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {hospital?.name}
          </h2>

          <div className="flex justify-between gap-16 items-center">
            <div className="flex items-center">
              <img
                src={hospital?.profilePicture || "https://i.pravatar.cc/300"}
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <span className="text-gray-800 font-semibold">
                {hospital.owner || "Gasore Mugwaneza"}
              </span>
            </div>
            <div className="text-gray-600">
              <p>
                {hospital?.location?.province} - {hospital?.location?.region}{" "}
                {hospital?.location?.address}
              </p>
            </div>
          </div>

          <Button
            onClick={() => openModal()}
            color="blue"
            className="bg-blue-700 hover:bg-blue-800 mx-auto mt-4"
          >
            Book Now
          </Button>
        </div>
      </div>
      <ModalPopUp showModal={showModal} closeModal={closeModal}>
        <Modal.Body>
          <div className="lg:h-screen lg:w-screen lg:max-w-screen-lg lg:relative lg:-left-28 bg-white dark:bg-gray-800 rounded-lg">
            <img
              className="w-full h-80 object-cover rounded-t-lg"
              src={hospital?.profilePicture}
              alt="Hospital Profile"
            />

            <div className="p-8 lg:p-12">
              <h3 className="mb-1 text-slate-900 font-semibold flex justify-between">
                {hospital?.name}
                <span className="px-2 rounded-full  text-white relative -top-8">
                  {hospital?.location?.province} - {hospital?.location?.region}{" "}
                  {hospital?.location?.address}
                </span>
              </h3>
              Booking Form goes here
              <div className="flex justify-end gap-4">
                <Button
                  color="red"
                  className="bg-red-600 text-white hover:bg-red-700 hover:text-red-600"
                  onClick={closeModal}
                >
                  Delete
                </Button>
                <Button color="gray" onClick={closeModal}>
                  <IoMdClose className="items-center size-5" /> Close
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <IoMdClose
          className="absolute top-2 -right-[270px] size-7 cursor-pointer hover:bg-gray-200 hover: rounded-md hover:text-red-600"
          onClick={() => closeModal()}
        />
      </ModalPopUp>
    </div>
  );
}

HospitalCard.propTypes = {
  hospital: PropTypes.object.isRequired,
};

export default HospitalCard;
