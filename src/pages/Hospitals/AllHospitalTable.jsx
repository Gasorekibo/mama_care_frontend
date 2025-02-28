/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Clock,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
const AllHospitalTable = ({ hospitals }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentHospitals = hospitals?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(hospitals.length / itemsPerPage);

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
          <Building className="h-6 w-6" />
          Registered Hospitals
        </h2>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Hospital
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Info
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Hours
              </th>
              <th scope="col" className="px-6 py-3">
                Services
              </th>
              <th scope="col" className="px-6 py-3">
                Emergency Alerts
              </th>
            </tr>
          </thead>
          <tbody>
            {currentHospitals.map((hospital) => (
              <tr
                key={hospital.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={hospital.profilePicture}
                      alt={hospital.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {hospital.name}
                      </p>
                      <p className="text-xs text-gray-500">ID: {hospital.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{hospital.contactNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{hospital.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-1">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium">{hospital.location.address}</p>
                      <p className="text-xs text-gray-500">
                        {hospital.location.province}, {hospital.location.region}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>Opens: {formatTime(hospital.openingTime)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span>Closes: {formatTime(hospital.closingTime)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {hospital.servicesOffered.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        hospital.emergencyAlerts.some(
                          (alert) => !alert.isResolved
                        )
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    />
                    <span className="font-medium">
                      {hospital.emergencyAlerts.length} Alert
                      {hospital.emergencyAlerts.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-700">
          Showing {firstIndex + 1}-{Math.min(lastIndex, hospitals.length)} of{" "}
          {hospitals.length}
        </span>
        <div className="inline-flex gap-2">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AllHospitalTable;
