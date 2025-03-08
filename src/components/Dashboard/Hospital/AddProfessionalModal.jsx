/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import FormInput from "../../shared/InputText";
import * as yup from "yup";
import { Button } from "flowbite-react";
import { addNewHealthProfessional } from "../../../redux/slices/hospitalSlice";
import toast from "react-hot-toast";
function AddProfessionalModal({ closeModal }) {
  const dispatch = useDispatch();
  const schema = yup.object({
    full_name: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone_number: yup.string().required("Phone number is required"),
    professional: yup.string().required("Professional is required"),
  });
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      professional: [],
    },
  });
  const onSubmit = async (data) => {
    const response = await dispatch(addNewHealthProfessional(data));
    if (response.error) {
      toast.error(response.payload);
    } else {
      closeModal();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-10">
      <FormInput
        control={control}
        name="full_name"
        label="Full Name"
        placeholder="Enter full name"
      />
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter email"
      />
      <FormInput
        control={control}
        name="phone_number"
        label="Phone Number"
        placeholder="Enter phone number"
      />
      <FormInput
        control={control}
        name="professional"
        label="professional"
        placeholder="Enter professional Comma separated"
      />
      <div className="flex justify-end space-x-4 py-4">
        <Button
          type="button"
          color="orange"
          onClick={() => reset()}
          className="bg-orange-400 hover:bg-orange-300 text-white"
        >
          Clear
        </Button>
        <Button type="submit" color="blue">
          Add New
        </Button>
      </div>
    </form>
  );
}

export default AddProfessionalModal;
