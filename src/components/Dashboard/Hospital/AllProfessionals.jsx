import { Mail, Phone, Search, User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalPopUp from "../../shared/ModalPopUp";
import { Modal } from "flowbite-react";
import AddProfessionalModal from "./AddProfessionalModal";

const getStatusColor = (status) => {
  switch (status) {
    case "in_service":
      return "bg-green-100 text-green-800";
    case "unavailable":
      return "bg-red-100 text-red-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};
const AllProfessionals = () => {
  const { hospitals } = useSelector((state) => state?.hospitals);
  const professionals = hospitals?.healthProfessionals;
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const filteredProfessionals = professionals?.filter(
    (prof) =>
      prof.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.healthcareFacility.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  function openModalHandler() {
    setOpenModal(true);
  }
  function closeModalHandler() {
    setOpenModal(false);
  }
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Healthcare Professionals
        </h1>
        <p className="text-gray-600">
          Manage and view healthcare professionals in your network
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search professionals or facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => openModalHandler()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Professional
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Professional
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Skills
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProfessionals?.length === 0 && (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 text-center" colSpan="5">
                  No professionals found
                </td>
              </tr>
            )}
            {filteredProfessionals?.map((prof) => (
              <tr key={prof.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>

                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800">
                        {prof.full_name}
                      </h3>
                      <p className="text-xs text-gray-600">ID: {prof.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{prof.email}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{prof.phone_number}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {prof.professional.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      prof.status
                    )}`}
                  >
                    {prof.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => console.log("Viewing professional")}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalPopUp
        closeModal={closeModalHandler}
        showModal={openModal}
        title="Add Professional"
      >
        <Modal.Body>
          <AddProfessionalModal
            closeModal={closeModalHandler}
            hospitalId={hospitals.id}
          />
        </Modal.Body>
      </ModalPopUp>
    </div>
  );
};
export default AllProfessionals;
