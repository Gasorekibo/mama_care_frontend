import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getSingleEmergenceAlertAction,
  updateEmergenceAlertStatusAction,
  updateHealthProfessionalEmergenceAlertAction,
} from "../../../redux/slices/emergenceAlertSlice";

import PatientData from "./EmergenceTabs/PatientData";
import MapRoute from "./EmergenceTabs/MapRoute";
import OverViewTab from "./EmergenceTabs/OverViewTab";
import TeamTab from "./EmergenceTabs/TeamTab";
import { dateFormatter } from "../../../lib/helpers";
import toast from "react-hot-toast";
import { STATUS, TABS } from "../../../lib/constant";


// Status constants


function EmergencePage() {
  const { emergenceId } = useParams();
  const dispatch = useDispatch();

  const { emergence, loading, error } = useSelector(
    (state) => state?.emergence
  );

  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const [etaMinutes, setEtaMinutes] = useState(null);
  const [localUpdateCounter, setLocalUpdateCounter] = useState(0);

  useEffect(() => {
    if (emergenceId) {
      dispatch(getSingleEmergenceAlertAction(emergenceId));
    }
  }, [dispatch, emergenceId, localUpdateCounter]);
  useEffect(() => {
    if (emergence?.location && emergence?.assignedFacility?.location) {
      // In a real implementation, use a routing API for accurate ETA calculation
      // This is a placeholder simulation
      setEtaMinutes(Math.floor(Math.random() * 15) + 5);
    }
  }, [emergence]);

  const handleDispatchTeam = useCallback(async () => {
    if (!emergence?.assignedHealthProfessionals?.length) {
      return;
    }

    const healthProfessionalIds = emergence.assignedHealthProfessionals.map(
      (hp) => hp.id
    );
    const data = {
      id: emergenceId,
      status: STATUS.IN_SERVICE,
      healthProfessionalsId: healthProfessionalIds,
    };

    try {
      await dispatch(updateHealthProfessionalEmergenceAlertAction(data));
      setLocalUpdateCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to dispatch team:", error);
    }
  }, [dispatch, emergenceId, emergence?.assignedHealthProfessionals]);

  const handleResolveEmergency = useCallback(async () => {
    const data = {
      id: emergenceId,
      status: STATUS.RESOLVED,
      isResolved: true,
    };

    try {
      await dispatch(updateEmergenceAlertStatusAction(data));
      setLocalUpdateCounter((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to resolve emergency", error?.message);
    }
  }, [dispatch, emergenceId]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-medium">Error loading emergency data</p>
        <p>{error}</p>
        <button
          className="mt-2 bg-red-200 hover:bg-red-300 text-red-800 px-4 py-2 rounded"
          onClick={() => setLocalUpdateCounter((prev) => prev + 1)}
        >
          Retry
        </button>
      </div>
    );
  }

  // Render empty state
  if (!emergence) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">No emergency data found for ID: {emergenceId}</p>
        <Link
          to="/dashboard"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Destructure emergence data for easier access
  const {
    user,
    assignedFacility,
    emergencyType,
    createdAt,
    isResolved,
    location,
    status,
  } = emergence;

  const healthRecord = user?.pregnancyHealthRecords?.[0] || {};
  const isEmergencyResolved = isResolved || status === STATUS.RESOLVED;
  const isOnScene = status === STATUS.ON_SCENE;
  const isEnRoute = status === STATUS.EN_ROUTE;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Status Bar */}
      <div
        className={`mb-6 p-4 rounded-lg ${
          isEmergencyResolved ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Emergency #{emergenceId} - {emergencyType}
            </h1>
            <p className="text-gray-700">
              Reported at: {dateFormatter(createdAt)}
            </p>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <span
              className={`inline-block h-3 w-3 rounded-full mr-2 ${
                isEmergencyResolved ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span className="font-semibold">
              {isEmergencyResolved ? "RESOLVED" : "Active"}{" "}
              {status && `- ${status}`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {!isEmergencyResolved && !isEnRoute && (
          <button
            onClick={handleDispatchTeam}
            disabled={!emergence?.assignedHealthProfessionals?.length}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 px-6 rounded-lg shadow transition"
          >
            Dispatch Response Team
          </button>
        )}

        {!isEmergencyResolved && isOnScene && (
          <button
            onClick={handleResolveEmergency}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow transition"
          >
            Mark as Resolved
          </button>
        )}

        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-6 rounded-lg shadow transition">
          Contact Patient
        </button>

        {user?.id && (
          <Link
            to={`/dashboard/patient/${user.id}`}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-6 rounded-lg shadow transition"
          >
            View Full Patient Record
          </Link>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b">
        <nav className="flex flex-wrap space-x-2 md:space-x-4">
          {Object.entries({
            [TABS.OVERVIEW]: "Overview",
            [TABS.PATIENT]: "Patient Data",
            [TABS.MAP]: "Location & Route",
            [TABS.TEAM]: "Response Team",
          }).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-2 px-4 transition ${
                activeTab === key
                  ? "border-b-2 border-blue-500 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {activeTab === TABS.OVERVIEW && (
          <OverViewTab
            emergencyType={emergencyType}
            etaMinutes={etaMinutes}
            createdAt={createdAt}
            isResolved={isEmergencyResolved}
            status={status}
            user={user}
            healthRecord={healthRecord}
          />
        )}

        {activeTab === TABS.PATIENT && (
          <PatientData healthRecord={healthRecord} user={user} />
        )}

        {activeTab === TABS.MAP && (
          <MapRoute
            user={user}
            assignedFacility={assignedFacility}
            etaMinutes={etaMinutes}
            location={location}
          />
        )}

        {activeTab === TABS.TEAM && (
          <TeamTab
            responders={emergence?.assignedHealthProfessionals}
            status={status}
            createdAt={createdAt}
            handleDispatchTeam={handleDispatchTeam}
            handleResolveEmergency={handleResolveEmergency}
          />
        )}
      </div>
    </div>
  );
}

export default EmergencePage;
