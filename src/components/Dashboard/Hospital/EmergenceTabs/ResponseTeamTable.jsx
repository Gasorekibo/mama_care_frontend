/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { assignHealthProfessionalAction } from "../../../../redux/slices/emergenceAlertSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function ResponseTeamTable({
  responders,
  emergencyId,
  closeModal,
  isForAssigning,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProfessionals, setSelectedProfessionals] = useState([]);

  const handleCheckboxChange = (responderId) => {
    setSelectedProfessionals((prev) => {
      if (prev.includes(responderId)) {
        return prev.filter((id) => id !== responderId);
      } else {
        return [...prev, responderId];
      }
    });
  };
  const getFormattedData = () => {
    return {
      healthProfessionals: selectedProfessionals.map((id) => ({ id })),
    };
  };
  const handleAssignProfessionals = async () => {
    const data = getFormattedData();
    const dataToSend = {
      emergenceId: emergencyId,
      ...data,
    };
    const result = await dispatch(assignHealthProfessionalAction(dataToSend));
    if (result.error) {
      toast.error(result.payload);
    } else {
      closeModal();
      navigate(
        `/profile/${result?.payload?.assignedFacility?.id}/hospital/emergence/${result?.payload?.id}`
      );
    }
  };

  return (
    <div className="md:col-span-2 bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 bg-blue-100">
        <h2 className="text-xl font-semibold">Response Team</h2>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {isForAssigning && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responders?.map((responder) => (
                <tr key={responder.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center">
                        {responder.full_name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {responder.full_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {responder?.professional[0] || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  responder.status === "unavailable"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : responder.status === "available"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                    >
                      {responder.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isForAssigning && (
                      <input
                        type="checkbox"
                        checked={selectedProfessionals.includes(responder.id)}
                        onChange={() => handleCheckboxChange(responder.id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isForAssigning && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAssignProfessionals}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              disabled={selectedProfessionals.length === 0}
            >
              Assign Selected Professionals
            </button>
          </div>
        )}

        {selectedProfessionals.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              Selected {selectedProfessionals.length} health professional(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponseTeamTable;
