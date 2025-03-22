import { Activity, AlertCircle, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSingleHospital } from "../../../redux/slices/hospitalSlice";
import { NotificationComponent } from "../PregnantWoman/Notifications";

import ProfileCard from "./EmergenceTabs/ProfileCard";
import EmergenceCard from "./EmergenceCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/LoadingSpinner";

const HospitalDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const { hospitals, loading, error } = useSelector((state) => state.hospitals);
  const { notifications } = useSelector((state) => state?.notifications);
  useEffect(() => {
    dispatch({ type: "socket/connect" });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getSingleHospital(id));
  }, [dispatch, id]);
  function handleToggleNotification() {
    setShowNotification(!showNotification);
  }
  const pendingEmergencies = hospitals?.emergencyAlerts?.filter(
    (emergence) => emergence?.status === "PENDING"
  );
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div
        className="absolute top-4 right-4 rounded-full  p-1 z-50 hover:bg-gray-300"
        onClick={handleToggleNotification}
      >
        <p
          className="inline cursor-pointer relative rounded-full focus:outline-none transition"
          onClick={handleToggleNotification}
        >
          <Bell size={34} className="text-2xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-sm w-4 h-4 flex items-center justify-center">
            {notifications?.length}
          </span>
        </p>
      </div>

      {showNotification && (
        <NotificationComponent notifications={notifications} />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p className="text-gray-500">Welcome back, {hospitals?.name}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <ProfileCard hospitals={hospitals} />

        {/* Services Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Available Services
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              {hospitals?.servicesOffered?.map((service, idx) => (
                <div
                  key={service || idx}
                  className="bg-blue-50 rounded-lg p-3 hover:bg-blue-100 transition-colors"
                >
                  <p className="text-blue-700 font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Alerts */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Active Emergency Alerts
            </h2>
          </div>
          {!pendingEmergencies?.length && (
            <div className="p-6">
              <p className="text-gray-700 text-center">
                No active emergency alerts
              </p>
            </div>
          )}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingEmergencies?.map((emergency) => (
                <EmergenceCard
                  id={id}
                  key={emergency?.id}
                  emergency={emergency}
                  professionals={hospitals?.healthProfessionals}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
