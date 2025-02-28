/* eslint-disable react/prop-types */
import {
  Card,
  Accordion,
  Tabs,
  Badge,
  Avatar,
  Button,
  Progress,
} from "flowbite-react";
import {
  CalendarIcon,
  ClipboardListIcon,
  HeartIcon,
  PhoneIcon,
  MailIcon,
  UserIcon,
  ChartBarIcon,
  MapPinCheck,
} from "lucide-react";
import { useState } from "react";
import { dateFormatter } from "../../../lib/helpers";

const PregnantWomanInfo = ({ womanData }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const calculateProgress = (currentWeek) => {
    const totalWeeks = 40;
    return Math.min((currentWeek / totalWeeks) * 100, 100);
  };
  const latestRecord =
    womanData?.pregnancyHealthRecords[
      womanData?.pregnancyHealthRecords?.length - 1
    ];
  const progress = calculateProgress(latestRecord?.weekOfPregnancy);

  // Determine blood pressure status
  const getBPStatus = (systolic, diastolic) => {
    if (systolic > 140 || diastolic > 90)
      return { color: "failure", text: "High" };
    if (systolic < 90 || diastolic < 60)
      return { color: "warning", text: "Low" };
    return { color: "success", text: "Normal" };
  };

  const latestBPStatus = getBPStatus(
    latestRecord?.bloodPressure?.systolic,
    latestRecord?.bloodPressure?.diastolic
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header with profile */}
      <div className="mb-4 bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar img={womanData?.profileImageUrl} rounded size="lg" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{womanData?.full_name}</h1>
            <div className="text-gray-600 flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center">
                <MailIcon className="w-4 h-4 mr-1" />
                {womanData?.email}
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-1" />
                {womanData?.phoneNumber}
              </div>
              <div className="flex items-center">
                <MapPinCheck className="w-4 h-4 mr-1" />
                {womanData?.location.province}, {womanData?.location.region}
              </div>
            </div>
          </div>
          <Badge color="blue" size="lg" className="mt-2 md:mt-0">
            Week {latestRecord?.weekOfPregnancy}
          </Badge>
        </div>

        {/* Pregnancy Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700">
              Pregnancy Progress
            </span>
            <span className="text-sm font-medium text-blue-700">
              {progress.toFixed(0)}%
            </span>
          </div>
          <Progress progress={progress} color="blue" />
        </div>
      </div>

      <Tabs className="mb-4" onActiveTabChange={(tab) => setActiveTab(tab)}>
        <Tabs.Item
          title="Profile"
          icon={UserIcon}
          active={activeTab === "profile"}
        >
          <Card className="mb-4">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Personal Information
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Full Name:</p>
                <p className="text-gray-700">{womanData?.full_name}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p className="text-gray-700">{womanData?.email}</p>
              </div>
              <div>
                <p className="font-semibold">Phone Number:</p>
                <p className="text-gray-700">{womanData?.phoneNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Role:</p>
                <p className="text-gray-700">
                  {womanData?.role.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Member Since:</p>
                <p className="text-gray-700">
                  {dateFormatter(womanData?.createdAt)}
                </p>
              </div>
              <div>
                <p className="font-semibold">Last Updated:</p>
                <p className="text-gray-700">
                  {dateFormatter(womanData?.updatedAt)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Location Details
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Address:</p>
                <p className="text-gray-700">{womanData?.location.address}</p>
              </div>
              <div>
                <p className="font-semibold">Province:</p>
                <p className="text-gray-700">{womanData?.location.province}</p>
              </div>
              <div>
                <p className="font-semibold">Region:</p>
                <p className="text-gray-700">{womanData?.location.region}</p>
              </div>
              <div>
                <p className="font-semibold">Coordinates:</p>
                <p className="text-gray-700">
                  {womanData?.location.latitude.toFixed(4)},{" "}
                  {womanData?.location.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </Card>
        </Tabs.Item>

        <Tabs.Item
          title="Health Records"
          icon={ClipboardListIcon}
          active={activeTab === "healthRecords"}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Current stats cards */}
            <Card>
              <div className="flex flex-col items-center">
                <HeartIcon className="w-8 h-8 text-red-500 mb-2" />
                <h5 className="text-lg font-semibold mb-1">Blood Pressure</h5>
                <div className="flex items-center">
                  <p className="text-xl font-bold">
                    {latestRecord?.bloodPressure?.systolic}/
                    {latestRecord?.bloodPressure?.diastolic}
                  </p>
                  <Badge color={latestBPStatus.color} className="ml-2">
                    {latestBPStatus.text}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center">
                <ChartBarIcon className="w-8 h-8 text-blue-500 mb-2" />
                <h5 className="text-lg font-semibold mb-1">Current Weight</h5>
                <p className="text-xl font-bold">{latestRecord?.weight} kg</p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center">
                <HeartIcon className="w-8 h-8 text-pink-500 mb-2" />
                <h5 className="text-lg font-semibold mb-1">Fetal Heart Rate</h5>
                <p className="text-xl font-bold">
                  {latestRecord?.fetalHeartRate} bpm
                </p>
              </div>
            </Card>
          </div>

          <Accordion className="mb-4">
            <Accordion.Panel>
              <Accordion.Title>
                Latest Pregnancy Health Record (
                {dateFormatter(latestRecord?.date)})
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Week of Pregnancy:</p>
                    <p className="text-gray-700">
                      {latestRecord?.weekOfPregnancy}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Weight:</p>
                    <p className="text-gray-700">{latestRecord?.weight} kg</p>
                  </div>
                  <div>
                    <p className="font-semibold">Blood Pressure:</p>
                    <p className="text-gray-700">
                      {latestRecord?.bloodPressure?.systolic}/
                      {latestRecord?.bloodPressure?.diastolic}
                      <Badge color={latestBPStatus.color} className="ml-2">
                        {latestBPStatus.text}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Fetal Heart Rate:</p>
                    <p className="text-gray-700">
                      {latestRecord?.fetalHeartRate} bpm
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Hemoglobin Level:</p>
                    <p className="text-gray-700">
                      {latestRecord?.hemoglobinLevel} g/dL
                    </p>
                  </div>
                  {latestRecord?.bloodSugar && (
                    <div>
                      <p className="font-semibold">Blood Sugar:</p>
                      <p className="text-gray-700">
                        Fasting: {latestRecord?.bloodSugar.fasting} mg/dL,
                        Post-meal: {latestRecord?.bloodSugar.postMeal} mg/dL
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">Mood:</p>
                    <p className="text-gray-700">{latestRecord?.mood}</p>
                  </div>
                  {latestRecord?.symptoms && (
                    <div>
                      <p className="font-semibold">Symptoms:</p>
                      <div className="flex flex-wrap gap-1">
                        {latestRecord?.symptoms.map((symptom, index) => (
                          <Badge key={index} color="purple" className="mr-1">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {latestRecord?.nutrition && (
                    <div className="col-span-1 md:col-span-2">
                      <p className="font-semibold">Nutrition:</p>
                      <ul className="list-disc list-inside text-gray-700 pl-2">
                        <li>
                          Calories: {latestRecord?.nutrition.calories} kcal
                        </li>
                        <li>Protein: {latestRecord?.nutrition.protein} g</li>
                        <li>
                          Hydration: {latestRecord?.nutrition.hydration} L
                        </li>
                        <li>
                          Supplements:{" "}
                          {latestRecord?.nutrition.supplements.join(", ")}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>

          <Card>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Health Records History
            </h5>
            <div className="space-y-4">
              {womanData?.pregnancyHealthRecords.map((record, index) => (
                <div
                  key={record.id}
                  className={`border p-4 rounded-lg ${
                    index === womanData?.pregnancyHealthRecords.length - 1
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="font-semibold">Record #{record.id}</h6>
                    <p className="text-gray-600 text-sm">
                      {dateFormatter(record.date)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Week:</span>
                      {record.weekOfPregnancy}
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span>{" "}
                      {record.weight} kg
                    </div>
                    <div>
                      <span className="font-medium">BP:</span>{" "}
                      {record.bloodPressure?.systolic}/
                      {record.bloodPressure?.diastolic}
                    </div>
                    <div>
                      <span className="font-medium">Hb:</span>{" "}
                      {record.hemoglobinLevel} g/dL
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {record.symptoms &&
                      record.symptoms.map((symptom, i) => (
                        <Badge key={i} color="blue" size="sm">
                          {symptom}
                        </Badge>
                      ))}
                  </div>
                  <Button
                    size="xs"
                    color="light"
                    className="mt-2"
                    onClick={() => {}}
                  >
                    View details
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </Tabs.Item>

        <Tabs.Item
          title="Checkups"
          icon={CalendarIcon}
          active={activeTab === "checkups"}
        >
          <Card>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Health Checkup History
            </h5>
            {womanData?.healthCheckups.length > 0 ? (
              <div className="space-y-4">
                {womanData?.healthCheckups.map((checkup) => (
                  <div
                    key={checkup.id}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h6 className="font-semibold">
                        Checkup on {dateFormatter(checkup.date)}
                      </h6>
                      <Badge color="blue">ID: {checkup.id}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="font-medium">Blood Pressure:</p>
                        <p className="text-gray-700">
                          {checkup.bloodPressure?.systolic}/
                          {checkup.bloodPressure?.diastolic}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Weight:</p>
                        <p className="text-gray-700">{checkup.weight} kg</p>
                      </div>
                      <div>
                        <p className="font-medium">Hemoglobin Level:</p>
                        <p className="text-gray-700">
                          {checkup.hemoglobinLevel} g/dL
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium mb-2">Notes:</p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded">
                        {checkup.notes}
                      </p>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Recommended Actions:</p>
                      <ul className="list-disc list-inside pl-2">
                        {checkup.recommendedActions.map((action, index) => (
                          <li key={index} className="text-gray-700">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 p-4 text-center">
                No health checkups recorded yet.
              </div>
            )}
          </Card>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default PregnantWomanInfo;
