import { useState, useEffect } from "react";
import {
  AlertCircle,
  Clock,
  Phone,
  Hospital,
  CheckCircle,
  Activity,
  X,
  Filter,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmergenceAlertsAction } from "../../../redux/slices/emergenceAlertSlice";
import { dateFormatter } from "../../../lib/helpers";

const PatientEmergencyDashboard = () => {
  // State for emergencies and UI
  const [emergencies, setEmergencies] = useState([]);
  const [filteredEmergencies, setFilteredEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    const { emergence, loading:emergenceLoading } = useSelector((state) => state.emergence);
  const { auth } = useSelector((state) => state.auth);
  const myEmergence = emergence?.filter(
    (emergence) => emergence?.user?.id === auth?.user?.id
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEmergenceAlertsAction());
  }, [dispatch]);
  // Parse and format the actual data

  
  useEffect(() => {
    const unresolved = myEmergence?.filter(
      (emergency) => !emergency.isResolved
    );
    setEmergencies(unresolved);
    setFilteredEmergencies(unresolved);
    setLoading(false);
  }, []);
    if (emergenceLoading)
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );

  // Filter functions
  const filterEmergencies = (filter) => {
    setActiveFilter(filter);
    setFilterMenuOpen(false);

    if (filter === "all") {
      setFilteredEmergencies(emergencies);
    } else {
      const filtered = emergencies.filter(
        (emergency) => emergency.status === filter
      );
      setFilteredEmergencies(filtered);
    }
  };

  const cancelEmergency = (id) => {
    toast.success(`Emergency #${id} has been cancelled`);
    const updatedEmergencies = emergencies.filter(
      (emergency) => emergency.id !== id
    );
    setEmergencies(updatedEmergencies);
    setFilteredEmergencies((prevFiltered) =>
      prevFiltered.filter((emergency) => emergency.id !== id)
    );
  };

  const refreshEmergencies = () => {
    setLoading(true);
    // In a real app, this would fetch fresh data from the API
    setTimeout(() => {
      toast.success("Emergencies refreshed");
      setLoading(false);
    }, 800);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            In Progress
          </span>
        );
      case "RESOLVED":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {status}
          </span>
        );
    }
  };

  const callFacility = (phoneNumber) => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
      toast.success(`Calling ${phoneNumber}`);
    } else {
      toast.error("Phone number not available");
    }
  };

  const callProfessional = (phoneNumber, name) => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
      toast.success(`Calling ${name}`);
    } else {
      toast.error("Phone number not available");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <AlertCircle className="mr-2 text-red-500" />
            My Emergency Requests
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredEmergencies?.length} active emergencies
          </p>
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={refreshEmergencies}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>

          <div className="relative inline-block">
            <button
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>

            {filterMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                <ul className="py-1">
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        activeFilter === "all"
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => filterEmergencies("all")}
                    >
                      All Emergencies
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        activeFilter === "PENDING"
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => filterEmergencies("PENDING")}
                    >
                      Pending
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        activeFilter === "IN_PROGRESS"
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => filterEmergencies("IN_PROGRESS")}
                    >
                      In Progress
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        activeFilter === "RESOLVED"
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => filterEmergencies("RESOLVED")}
                    >
                      Resolved
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredEmergencies?.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No emergencies found
          </h3>
          <p className="text-gray-500 mb-4">
            {activeFilter !== "all"
              ? `You don't have any ${activeFilter
                  .toLowerCase()
                  .replace("_", " ")} emergencies.`
              : "You don't have any active emergency requests."}
          </p>
          <button
            onClick={() => filterEmergencies("all")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View all emergencies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEmergencies?.map((emergency) => (
            <div
              key={emergency.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-3">
                        Emergency #{emergency.id}
                      </span>
                      {getStatusBadge(emergency.status)}
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {dateFormatter(emergency.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => cancelEmergency(emergency.id)}
                    className="text-gray-400 hover:text-red-500"
                    title="Cancel emergency"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start text-sm">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-medium text-gray-900">
                        {emergency.emergencyType}
                      </p>
                    </div>
                  </div>

                  {emergency.assignedFacility && (
                    <div className="flex items-start text-sm">
                      <Hospital className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-gray-500">Assigned Facility</p>
                        <p className="font-medium text-gray-900">
                          {emergency.assignedFacility.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() =>
                              callFacility(
                                emergency.assignedFacility.contactNumber
                              )
                            }
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </button>
                          {emergency.assignedFacility.openingTime &&
                            emergency.assignedFacility.closingTime && (
                              <span className="text-xs text-gray-500 ml-2">
                                {emergency.assignedFacility.openingTime.slice(
                                  0,
                                  5
                                )}{" "}
                                -{" "}
                                {emergency.assignedFacility.closingTime.slice(
                                  0,
                                  5
                                )}
                              </span>
                            )}
                        </div>

                        {emergency.assignedFacility.servicesOffered &&
                          emergency.assignedFacility.servicesOffered.length >
                            0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500">Services:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {emergency.assignedFacility.servicesOffered.map(
                                  (service, index) => (
                                    <span
                                      key={index}
                                      className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                                    >
                                      {service}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  )}

                  {emergency.assignedHealthProfessionals &&
                    emergency.assignedHealthProfessionals.length > 0 && (
                      <div className="flex items-start text-sm">
                        <Activity className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-gray-500">
                            Assigned Professionals
                          </p>
                          <div className="space-y-1 mt-1">
                            {emergency.assignedHealthProfessionals.map(
                              (professional) => (
                                <div
                                  key={professional.id}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-medium text-blue-800">
                                      {professional.full_name.charAt(0)}
                                    </div>
                                    <span className="text-gray-900">
                                      {professional.full_name}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      callProfessional(
                                        professional.phone_number,
                                        professional.full_name
                                      )
                                    }
                                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center"
                                  >
                                    <Phone className="w-3 h-3 mr-1" />
                                    Call
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientEmergencyDashboard;
