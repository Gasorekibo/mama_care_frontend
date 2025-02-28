import { dateFormatter } from "../../../../lib/helpers";

/* eslint-disable react/prop-types */
function PatientData({ user, healthRecord }) {
  const renderVitalSignsIndicator = (value, normal, unit, label) => {
    let statusColor = "bg-green-100 text-green-800";
    if (value > normal.high) statusColor = "bg-red-100 text-red-800";
    else if (value < normal.low) statusColor = "bg-yellow-100 text-yellow-800";

    return (
      <div className="flex justify-between items-center p-2 border-b">
        <span>{label}</span>
        <div className={`px-3 py-1 rounded-full ${statusColor}`}>
          {value} {unit}
        </div>
      </div>
    );
  };
  // Calculate pregnancy trimester
  const calculateTrimester = (week) => {
    if (week <= 12) return "First";
    if (week <= 27) return "Second";
    return "Third";
  };
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Info */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 bg-blue-100">
            <h2 className="text-xl font-semibold">Patient Information</h2>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-center mb-4">
              <img
                src={user?.profileImageUrl}
                alt="Patient"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{user?.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone:</span>
              <span>{user?.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Address:</span>
              <span>{user?.location?.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Region:</span>
              <span>
                {user?.location?.region}, {user?.location?.province}
              </span>
            </div>
          </div>
        </div>

        {/* Pregnancy Status */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 bg-pink-100">
            <h2 className="text-xl font-semibold">Pregnancy Status</h2>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Week:</span>
              <span>{healthRecord?.weekOfPregnancy} weeks</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Trimester:</span>
              <span>{calculateTrimester(healthRecord?.weekOfPregnancy)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Current Weight:</span>
              <span>{healthRecord?.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Fetal Heart Rate:</span>
              <span>{healthRecord?.fetalHeartRate} bpm</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Fetal Movements:</span>
              <span>{healthRecord?.fetalMovements} movements</span>
            </div>
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-semibold mb-2">Recent Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {healthRecord?.symptoms?.map((symptom, idx) => (
                  <span
                    key={idx}
                    className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 bg-green-100">
            <h2 className="text-xl font-semibold">Vital Signs</h2>
          </div>
          <div className="p-4">
            {renderVitalSignsIndicator(
              `${healthRecord?.bloodPressure?.systolic}/${healthRecord?.bloodPressure?.diastolic}`,
              { low: "90/60", high: "140/90" },
              "mmHg",
              "Blood Pressure"
            )}
            {renderVitalSignsIndicator(
              healthRecord?.temperature,
              { low: 36.1, high: 37.8 },
              "°C",
              "Temperature"
            )}
            {renderVitalSignsIndicator(
              healthRecord?.bloodSugar?.fasting,
              { low: 70, high: 95 },
              "mg/dL",
              "Fasting Blood Sugar"
            )}
            {renderVitalSignsIndicator(
              healthRecord?.bloodSugar?.postMeal,
              { low: 70, high: 140 },
              "mg/dL",
              "Post-Meal Blood Sugar"
            )}
            {renderVitalSignsIndicator(
              healthRecord?.hemoglobinLevel,
              { low: 11, high: 15 },
              "g/dL",
              "Hemoglobin"
            )}
            {renderVitalSignsIndicator(
              healthRecord?.ironLevel,
              { low: 30, high: 160 },
              "μg/dL",
              "Iron Level"
            )}
          </div>
        </div>

        {/* Health Records */}
        <div className="md:col-span-3 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 bg-yellow-100">
            <h2 className="text-xl font-semibold">
              Additional Health Information
            </h2>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nutrition */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Nutrition</h3>
              <div className="space-y-2 bg-gray-50 p-3 rounded">
                <div className="flex justify-between">
                  <span>Daily Calories:</span>
                  <span>{healthRecord?.nutrition?.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein Intake:</span>
                  <span>{healthRecord?.nutrition?.protein} g</span>
                </div>
                <div className="flex justify-between">
                  <span>Hydration:</span>
                  <span>{healthRecord?.nutrition?.hydration} L</span>
                </div>
                <div className="flex justify-between">
                  <span>Supplements:</span>
                  <span>
                    {healthRecord?.nutrition?.supplements?.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Exercise & Rest */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Exercise & Rest</h3>
              <div className="space-y-2 bg-gray-50 p-3 rounded">
                <div className="flex justify-between">
                  <span>Exercise Type:</span>
                  <span>{healthRecord?.exercise?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{healthRecord?.exercise?.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Intensity:</span>
                  <span>{healthRecord?.exercise?.intensity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sleep Hours:</span>
                  <span>{healthRecord?.sleepHours} hours</span>
                </div>
              </div>
            </div>

            {/* Mood & Wellbeing */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Mood & Wellbeing</h3>
              <div className="space-y-2 bg-gray-50 p-3 rounded">
                <div className="flex justify-between">
                  <span>Current Mood:</span>
                  <span>{healthRecord?.mood}</span>
                </div>
                <div className="flex justify-between">
                  <span>Swelling Level:</span>
                  <span
                    className={
                      healthRecord?.swellingLevel === "Severe"
                        ? "text-red-600 font-bold"
                        : ""
                    }
                  >
                    {healthRecord?.swellingLevel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Vitamin D Level:</span>
                  <span>{healthRecord?.vitaminD} ng/mL</span>
                </div>
              </div>
            </div>

            {/* Additional Tests */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Additional Tests</h3>
              <div className="space-y-2 bg-gray-50 p-3 rounded">
                <div className="flex justify-between">
                  <span>Urine Protein:</span>
                  <span
                    className={
                      healthRecord?.urineProtein === "Positive"
                        ? "text-red-600 font-bold"
                        : ""
                    }
                  >
                    {healthRecord?.urineProtein}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Check Date:</span>
                  <span>{dateFormatter(healthRecord?.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientData;
