import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserAction } from "../../../redux/slices/userSlice";
import { toast } from "react-hot-toast";
import {
  fetchHealthRecords,
  updateHealthRecord,
} from "../../../redux/slices/healthRecordsSlice";
import DietRecommendations from "./PregnantWomanDietRecommendation";
import { LoaderIcon } from "react-hot-toast";
import PregnancyHealthRecordForm from "./PregnantHealthRecordForm";
import ModalPopUp from "../../shared/ModalPopUp";
import BasicHealthRecords from "./BasicHealthRecords";
import { Modal } from "flowbite-react";
const PregnancyDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  function openModal() {
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    users: { pregnancyHealthRecords },
    loading,
  } = useSelector((state) => state.users);

  const [healthData, setHealthData] = useState(pregnancyHealthRecords?.[0]);

  useEffect(() => {
    dispatch(getUserAction(id));
  }, [id, dispatch]);

  const handleUpdateMetric = async (key, value) => {
    await dispatch(updateHealthRecord({ id, key, value }));
    const result = await dispatch(
      fetchHealthRecords(pregnancyHealthRecords?.[0]?.id)
    );
    if (result.error) {
      toast.error(result?.payload);
    }
    setHealthData(result.payload);
  };

  const handleDeleteMetric = (key) => {
    console.log("Deleting:", key);
  };

  if (loading || !pregnancyHealthRecords) {
    return <LoaderIcon className="mx-auto z-50" />;
  }
  const healthRecord = healthData || pregnancyHealthRecords?.[0];
  const pregnantTrimester =
    healthRecord?.weekOfPregnancy <= 14
      ? 1
      : healthRecord?.weekOfPregnancy <= 28
      ? 2
      : 3;

  if (!healthRecord) {
    return <PregnancyHealthRecordForm isForUpdate={false} />;
  }
  return (
    <div className="md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 mb-6 flex justify-between items-center">
          <h1 className="text-center">Overview</h1>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg md:absolute md:right-6 md:top-32"
          >
            Edit Health Records
          </button>
        </div>
        <ModalPopUp
          showModal={showModal}
          closeModal={closeModal}
          title="Edit Health Records"
        >
          
          <Modal.Body>
            <PregnancyHealthRecordForm
              isForUpdate={true}
              closeModal={closeModal}
            />
          </Modal.Body>
        </ModalPopUp>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <BasicHealthRecords
              data={healthRecord}
              onUpdate={handleUpdateMetric}
              onDelete={handleDeleteMetric}
            />
          </div>

          {/* Nutrition & Hydration */}
          <div className="bg-gray-50 p-4 rounded-lg lg: space-y-6">
            <h3 className="text-lg font-semibold mb-4">
              Daily Nutrition Goals
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Calories</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (healthRecord?.nutrition?.calories / 2300) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span>{healthRecord?.nutrition?.calories || 0}/2300</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Protein (g)</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (healthRecord?.nutrition?.protein / 75) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span>{healthRecord?.nutrition?.protein || 0}/75</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Water (L)</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-400 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (healthRecord?.nutrition?.hydration / 2.3) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span>{healthRecord?.nutrition?.hydration || 0}/2.3</span>
              </div>
            </div>
            <DietRecommendations trimester={pregnantTrimester} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyDashboard;
