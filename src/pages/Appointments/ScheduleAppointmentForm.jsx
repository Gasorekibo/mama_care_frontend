/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import FormInput from "../../components/shared/InputText";
import SelectInput from "../../components/shared/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  createAppointmentAction,
  reScheduleAppointment,
} from "../../redux/slices/appointmentsSlice";
import { appointmentStatus, appointmentType } from "../../lib/constant";
const ScheduleAppointmentForm = ({ title, closeModal, chwId, appointment }) => {
  const { auth } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      start_date: "",
      end_date: "",
      type: "",
      notes: "",
    },
  });
  const onSubmit = async (data) => {
    if (!appointment) {
      if (Object.values(data).some((ele) => !ele)) {
        return toast.error("All fields are required");
      } else if (data?.end_date < data?.start_date) {
        return toast.error("End Date cannot be less than Start Date");
      }
      try {
        const dataToSubmit = {
          start_date: new Date(data?.start_date)?.toISOString(),
          end_date: new Date(data?.end_date)?.toISOString(),
          type: data?.type,
          notes: data?.notes,
          chwId,
        };
        const response = await dispatch(createAppointmentAction(dataToSubmit));

        if (response?.error) {
          toast.error(response?.payload);
        } else {
          await toast.success("Appointment Scheduled Successfully");
          closeModal();
        }
      } catch (error) {
        toast.error(error?.message);
      }
    } else {
      if (
        (data?.start_date && !data?.end_date) ||
        (data?.end_date && !data?.start_date)
      ) {
        return toast.error("Start Date and End Date are required");
      }

      if (Object?.values(data)?.every((ele) => !ele)) {
        return toast.error("At least one field is required");
      }
      const dataToSubmit = {
        start_date: data?.start_date
          ? new Date(data?.start_date)?.toISOString()
          : "",
        end_date: data?.end_date ? new Date(data?.end_date)?.toISOString() : "",
        type: data?.type ? data?.type : appointment?.type,
        notes: data?.notes ? data?.notes : appointment?.notes,
        status: data?.status ? data?.status : appointment?.status,
        id: appointment?.id,
        chwId,
      };
      const response = await dispatch(reScheduleAppointment(dataToSubmit));
      if (response?.error) {
        toast.error(response?.payload);
      } else {
        await toast.success("Appointment Rescheduled Successfully");
        closeModal();
      }
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Start Date and Time */}
        <div className="space-y-2">
          <FormInput
            name="start_date"
            label="Start Date and Time"
            control={control}
            type="datetime-local"
            placeholder="Start Date and Time"
            required={true}
            className="mt-1"
            sizing="lg"
          />
        </div>

        {/* End Date and Time */}
        <div className="space-y-2">
          <FormInput
            name="end_date"
            label="End Date and Time"
            control={control}
            type="datetime-local"
            placeholder="End Date and Time"
            required={true}
            className="mt-1"
            sizing="lg"
          />
        </div>

        {/* Appointment Type */}
        <div className="space-y-2">
          <SelectInput
            label="Appointment Type"
            name="type"
            control={control}
            options={appointmentType}
            className="mt-1"
            placeholder="Select Appointment Type"
          />
        </div>
        {auth?.user?.role === "COMMUNITY_HEALTH_WORKER" && (
          <div className="space-y-2">
            <SelectInput
              label="Appointment Status"
              name="status"
              control={control}
              options={appointmentStatus}
              className="mt-1"
              placeholder="Select Appointment Status"
            />
          </div>
        )}
        {/* Notes */}
        <div className="space-y-2">
          <FormInput
            control={control}
            name="notes"
            label="Notes"
            multiline={true}
            placeholder="Add any additional notes here..."
            rows={4}
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 px-5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default ScheduleAppointmentForm;
