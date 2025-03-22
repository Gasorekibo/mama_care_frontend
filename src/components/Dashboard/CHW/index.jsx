import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentsAction } from "../../../redux/slices/appointmentsSlice";
import { getAllEducationAction } from "../../../redux/slices/educationSlice";
import getAllChwData from "../../../lib/helpers/getChwData";
import { dateFormatter } from "../../../lib/helpers/index";
import LoadingSpinner from "../../shared/LoadingSpinner";

const CHWDashboard = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state?.auth);
  const { appointments, loading } = useSelector((state) => state?.appointments);
  const { education, loading: fetchingEducations } = useSelector(
    (state) => state?.education
  );
  const chwData = getAllChwData(auth?.user?.id, appointments, education);

  useEffect(() => {
    dispatch(getAllAppointmentsAction());
    dispatch(getAllEducationAction());
  }, [dispatch]);

  if (loading && fetchingEducations) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Community Health Worker Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Your Profile Information
            </h2>
          </div>

          <div className="p-6 flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
                <img
                  src={auth?.user?.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {auth?.user?.full_name || "Not Available"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Community Health Worker
              </p>
              <p className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {chwData?.trainingContent?.length || 0} Training Materials
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </h4>
                <p className="text-gray-800">
                  {auth?.user?.email || "Not Available"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Phone Number
                </h4>
                <p className="text-gray-800">
                  {auth?.user?.phoneNumber || "Not Available"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Member Since
                </h4>
                <p className="text-gray-800">
                  {dateFormatter(auth?.user?.createdAt) || "Not Available"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Address
                </h4>
                <p className="text-gray-800">
                  {auth?.user?.location?.address || "Not Available"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  City/Province
                </h4>
                <p className="text-gray-800">
                  {auth?.user?.location?.region || "Not Available"},{" "}
                  {auth?.user?.location?.province || ""}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Coordinates
                </h4>
                <p className="text-gray-800 text-sm">
                  {auth?.user?.location?.latitude || "N/A"},{" "}
                  {auth?.user?.location?.longitude || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Missed Visits Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Missed Visits</h2>
            <span className="bg-white text-red-600 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {chwData?.missedVisits?.length || 0}
            </span>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {chwData?.missedVisits?.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No missed visits found
              </p>
            ) : (
              chwData?.missedVisits?.map((visit) => (
                <div
                  key={visit?.id}
                  className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={
                          visit?.owner?.profileImageUrl || "/default-avatar.png"
                        }
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {visit?.owner?.full_name || "Unknown Client"}
                      </h3>
                      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span>{" "}
                          {visit?.owner?.phoneNumber || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Date:</span>{" "}
                          {dateFormatter(visit?.start_date)}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {visit?.notes?.slice(0, 100) || "No notes available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Appointments Card */}
        <div className="md:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Upcoming Appointments
            </h2>
            <span className="bg-white text-blue-600 text-lg font-bold px-3 py-1 rounded-full">
              {chwData?.upComingAppointments?.length || 0} scheduled
            </span>
          </div>

          <div className="p-4">
            {chwData?.upComingAppointments?.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No upcoming appointments found
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chwData?.upComingAppointments?.map((appointment) => (
                  <div
                    key={appointment?.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img
                          src={
                            appointment?.owner?.profileImageUrl ||
                            "/default-avatar.png"
                          }
                          alt="Client"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {appointment?.owner?.full_name || "Unknown Client"}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {dateFormatter(appointment?.start_date)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span>
                        {appointment?.owner?.phoneNumber || "N/A"}
                      </p>
                      <p className="text-gray-600 text-xs">
                        <span className="font-medium">Location:</span>
                        {appointment?.owner?.location?.address || "N/A"}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {appointment?.notes?.slice(0, 100) ||
                          "No notes available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CHWDashboard;
