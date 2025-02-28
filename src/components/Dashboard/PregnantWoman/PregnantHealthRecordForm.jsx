/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import FormInput from "../../shared/InputText";
import SelectInput from "../../shared/SelectInput";
import { useDispatch } from "react-redux";
import {
  createHealthRecord,
  updateHealthRecordAttOnce,
} from "../../../redux/slices/healthRecordsSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  defaultValueForHealthRecord,
  healthRecordFormField,
} from "../../../lib/constant";

const PregnancyHealthRecordForm = ({ isForUpdate, closeModal, userId }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = userId || params.id;
  function checkRequiredField(arr, fields) {
    if (arr.every((el) => el !== "" && el !== null && el !== undefined)) {
      return true;
    } else {
      throw new Error(`Field ${fields.join(" and ")} is required`);
    }
  }
  const { handleSubmit, control, reset } = useForm({
    defaultValues: defaultValueForHealthRecord,
  });
  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,

        bloodPressure: { systolic: data?.systolic, diastolic: data?.diastolic },
        bloodSugar: { fasting: data?.fasting, postMeal: data?.postMeal },
        nutrition: {
          calories: data?.calories,
          protein: data?.protein,
          hydration: data?.hydration,
          supplements: data?.supplements?.split(",") || [],
        },
        exercise: {
          duration: data?.duration,
          type: data?.type,
          intensity: data?.intensity,
        },

        id: id,
      };
      if (isForUpdate) {
        const updatedField = Object.keys(dataToSend).filter(
          (key) =>
            dataToSend[key] !== "" &&
            dataToSend[key] !== null &&
            dataToSend[key] !== undefined &&
            dataToSend[key].length &&
            dataToSend[key].length
        );
        const dataToUpdate = {};
        updatedField.forEach((field) => {
          if (
            (field === "systolic" || field === "diastolic") &&
            checkRequiredField(
              [dataToSend["systolic"], dataToSend["diastolic"]],
              ["systolic", "diastolic"]
            )
          ) {
            dataToUpdate["bloodPressure"] = {
              systolic: dataToSend["systolic"],
              diastolic: dataToSend["diastolic"],
            };
          } else if (
            (field === "fasting" || field === "postMeal") &&
            checkRequiredField(
              [dataToSend["fasting"], dataToSend["postMeal"]],
              ["fasting", "postMeal"]
            )
          ) {
            dataToUpdate["bloodSugar"] = {
              fasting: dataToSend["fasting"],
              postMeal: dataToSend["postMeal"],
            };
          } else if (
            (field === "calories" ||
              field === "protein" ||
              field === "hydration" ||
              field === "supplements") &&
            checkRequiredField(
              [
                dataToSend["calories"],
                dataToSend["protein"],
                dataToSend["hydration"],
              ],
              ["calories", "protein", "hydration"]
            )
          ) {
            dataToUpdate["nutrition"] = {
              calories: dataToSend["calories"],
              protein: dataToSend["protein"],
              hydration: dataToSend["hydration"],
              supplements: dataToSend["supplements"]?.split(",") || [],
            };
          } else if (
            (field === "duration" ||
              field === "type" ||
              field === "intensity") &&
            checkRequiredField(
              [
                dataToSend["duration"],
                dataToSend["type"],
                dataToSend["intensity"],
              ],
              ["duration", "type", "intensity"]
            )
          ) {
            dataToUpdate["exercise"] = {
              duration: dataToSend["duration"],
              type: dataToSend["type"],
              intensity: dataToSend["intensity"],
            };
          } else if (field === "contractions") {
            dataToUpdate[field] = dataToSend[field]?.split(",");
          }
          dataToUpdate[field] = dataToSend[field];
        });

        const response = await dispatch(
          updateHealthRecordAttOnce(dataToUpdate)
        );

        if (response?.error) {
          toast.error(response?.payload);
        } else {
          toast.success("Health Record Updated Successfully");
          closeModal();
        }
      } else {
        const response = await dispatch(createHealthRecord(dataToSend));
        if (response?.error) {
          toast.error(response?.payload);
          reset();
        } else {
          toast.success("Health Record Created Successfully");
          reset();
        }
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Comprehensive Pregnancy Health Record
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {healthRecordFormField.map(
              ({ section, icon, fields, selectFields }) => (
                <div className="space-y-4" key={section}>
                  <h2 className="text-xl font-semibold text-blue-700 flex items-center">
                    {icon && icon}
                    {section}
                  </h2>
                  {fields?.map(({ name, label, type }) => (
                    <FormInput
                      key={name}
                      name={name}
                      label={label}
                      control={control}
                      type={type || "text"}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      required={true}
                      className="mt-1"
                      sizing="lg"
                      rules={
                        !isForUpdate && { required: "This field is required" }
                      }
                    />
                  ))}
                  {selectFields?.map(({ label, name, options }) => (
                    <SelectInput
                      key={name}
                      label={label}
                      name={name}
                      control={control}
                      options={options.map((opt) => ({
                        label: opt,
                        value: opt,
                      }))}
                      className="mt-1"
                      placeholder={`Select ${label}`}
                      rules={
                        !isForUpdate && { required: "This field is required" }
                      }
                    />
                  ))}
                </div>
              )
            )}
          </div>

          <button
            type="submit"
            className="w-full lg:my-4 bg-blue-600 text-white py-2.5 px-5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium"
          >
            Save Health Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default PregnancyHealthRecordForm;
