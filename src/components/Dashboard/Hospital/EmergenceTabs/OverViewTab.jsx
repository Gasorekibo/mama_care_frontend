/* eslint-disable react/prop-types */
import { calculateTrimester, dateFormatter } from '../../../../lib/helpers';

function OverViewTab({emergencyType, etaMinutes, createdAt, isResolved, status, user, healthRecord}) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Emergency Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Type:</span>
              <span>{emergencyType}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span
                className={
                  isResolved || status === "Resolved"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {isResolved || status === "Resolved" ? "Resolved" : "Active"} -{" "}
                {status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Reported:</span>
              <span>{dateFormatter(createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">ETA:</span>
              <span>
                {etaMinutes ? `${etaMinutes} minutes` : "Calculating..."}
              </span>
            </div>
          </div>
        </div>

        {/* Patient Summary */}
        <div className="bg-pink-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Patient Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{user?.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Pregnancy Week:</span>
              <span>
                Week {healthRecord?.weekOfPregnancy} (
                {calculateTrimester(healthRecord?.weekOfPregnancy)} Trimester)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Blood Pressure:</span>
              <span
                className={
                  parseInt(healthRecord?.bloodPressure?.systolic) > 140
                    ? "text-red-600 font-bold"
                    : ""
                }
              >
                {healthRecord?.bloodPressure?.systolic}/
                {healthRecord?.bloodPressure?.diastolic} mmHg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Recent Symptoms:</span>
              <span>{healthRecord?.symptoms?.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="md:col-span-2 bg-red-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Critical Alerts</h2>
          <div className="space-y-3">
            {parseInt(healthRecord?.bloodPressure?.systolic) > 140 && (
              <div className="bg-red-100 p-3 rounded flex items-center">
                <span className="text-red-600 font-bold mr-2">⚠️</span>
                <div>
                  <p className="font-semibold">High Blood Pressure</p>
                  <p>
                    Systolic pressure of {healthRecord?.bloodPressure?.systolic}{" "}
                    mmHg indicates possible pre-eclampsia
                  </p>
                </div>
              </div>
            )}
            {healthRecord?.swellingLevel === "Severe" && (
              <div className="bg-red-100 p-3 rounded flex items-center">
                <span className="text-red-600 font-bold mr-2">⚠️</span>
                <div>
                  <p className="font-semibold">Severe Swelling</p>
                  <p>
                    Patient reported severe swelling which could indicate fluid
                    retention or pre-eclampsia
                  </p>
                </div>
              </div>
            )}
            {healthRecord?.symptoms?.some((s) => s.includes("Vomitting")) && (
              <div className="bg-yellow-100 p-3 rounded flex items-center">
                <span className="text-yellow-600 font-bold mr-2">⚠️</span>
                <div>
                  <p className="font-semibold">Frequent Vomiting</p>
                  <p>
                    Patient is experiencing vomiting that could lead to
                    dehydration
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverViewTab
