/* eslint-disable react/prop-types */
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { getHealthMetrics } from "../../../lib/helpers/getAllHealthMetrics";
import toast from "react-hot-toast";

const BasicHealthRecords = ({ data, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  const [editValue, setEditValue] = useState("");

  const healthMetrics = getHealthMetrics(data);

  const handleEdit = (metric) => {
    setEditingMetric(metric);
    if (metric.type === "bloodPressure") {
      setEditValue(
        `${data?.bloodPressure?.systolic}/${data?.bloodPressure?.diastolic}`
      );
    } else if (metric?.type === "bloodSugar") {
      setEditValue(
        `${data?.bloodSugar?.fasting}/${data?.bloodSugar?.postMeal}`
      );
    } else {
      setEditValue(metric?.value?.toString());
    }
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editingMetric) return;

    let updatedValue = editValue;

    if (editingMetric.type === "bloodPressure") {
      const [systolic, diastolic] = editValue.split("/");
      updatedValue = {
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic),
      };
    } else if (editingMetric.type === "bloodSugar") {
      const [fasting, postMeal] = editValue.split("/");
      updatedValue = {
        fasting: parseInt(fasting),
        postMeal: parseInt(postMeal),
      };
    } else if (editingMetric.type === "number") {
      updatedValue = parseFloat(editValue);
    }
    if (isNaN(parseInt(updatedValue))) {
      return toast.error("Please enter a valid number");
    }
    onUpdate(editingMetric.key, updatedValue);
    setIsModalOpen(false);
    setEditingMetric(null);
    setEditValue("");
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {healthMetrics.map((metric) => (
          <div
            key={metric.key}
            className={`p-4 rounded-lg ${
              metric.critical ? "bg-white shadow-sm" : "bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(metric)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(metric.key)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold">{metric.value}</span>
              <span className="text-sm text-gray-500">{metric.unit}</span>
            </div>
          </div>
        ))}

        {/* Alert Section */}
        {(data?.urineProtein === "Positive" ||
          data?.swellingLevel !== "None") && (
          <div className="col-span-2 md:col-span-3 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">
              Health Alerts
            </h4>
            <ul className="space-y-2">
              {data?.urineProtein === "Positive" && (
                <li className="text-yellow-700">
                  • Protein detected in urine - Please consult your healthcare
                  provider
                </li>
              )}
              {data?.swellingLevel !== "None" && (
                <li className="text-yellow-700">
                  • {data?.swellingLevel} swelling detected - Monitor and report
                  changes
                </li>
              )}
            </ul>
          </div>
        )}
        {/* Symptom Tracking & Recommendations */}
        <div className="col-span-2 md:col-span-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Current Symptoms</h3>
            <div className="space-y-3">
              {data?.symptoms?.map((symptom, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white p-3 rounded-lg"
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span className="capitalize">{symptom}</span>
                  <span className="text-sm text-gray-500 ml-auto">Mild</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flowbite Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow p-6 max-w-md w-full mx-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">
              Edit {editingMetric?.label}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingMetric?.type === "bloodPressure"
                  ? "Systolic/Diastolic"
                  : editingMetric?.type === "bloodSugar"
                  ? "Fasting/Post Meal"
                  : editingMetric?.label}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={
                  editingMetric?.type === "bloodPressure"
                    ? "120/80"
                    : editingMetric?.type === "bloodSugar"
                    ? "85/140"
                    : `Enter ${editingMetric?.label.toLowerCase()}`
                }
              />
              {(editingMetric?.type === "bloodPressure" ||
                editingMetric?.type === "bloodSugar") && (
                <p className="text-sm text-gray-500 mt-1">
                  Use format: number/number
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicHealthRecords;
