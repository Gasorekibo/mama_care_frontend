/* eslint-disable react/prop-types */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Button, Checkbox } from "flowbite-react";
import { MapPin, Phone, Mail, Clock, Hospital, Lock, Tag } from "lucide-react";
import toast from "react-hot-toast";
import FormInput from "../../components/shared/InputText";
import { addNewHospitalAction } from "../../redux/slices/hospitalSlice";

function AddNewHospital({ closeModal }) {
  const dispatch = useDispatch();

  // Define validation schema
  const schema = yup.object({
    name: yup.string().required("Hospital name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    location: yup.object({
      latitude: yup.number().required("Latitude is required"),
      longitude: yup.number().required("Longitude is required"),
      region: yup.string().required("Region is required"),
      province: yup.string().required("Province is required"),
      address: yup.string().required("Address is required"),
    }),
    servicesOffered: yup.string().required("At least one service is required"),
    contactNumber: yup
      .string()
      .required("Contact number is required")
      .matches(/^\d+$/, "Must be only digits"),
    email: yup.string().email("Invalid email").required("Email is required"),
    hasEmergencyServices: yup.boolean(),
    openingTime: yup.string().required("Opening time is required"),
    closingTime: yup.string().required("Closing time is required"),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      password: "",
      location: {
        latitude: "",
        longitude: "",
        region: "",
        province: "",
        address: "",
      },
      servicesOffered: "",
      contactNumber: "",
      email: "",
      hasEmergencyServices: false,
      openingTime: "06:00",
      closingTime: "23:00",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Format the data to match your API expectations
      const formattedData = {
        name: data.name,
        password: data.password,
        location: {
          latitude: parseFloat(data.location.latitude),
          longitude: parseFloat(data.location.longitude),
          region: data.location.region,
          province: data.location.province,
          address: data.location.address,
        },
        servicesOffered: data.servicesOffered
          .split(",")
          .map((service) => service.trim()),
        contactNumber: data.contactNumber,
        email: data.email,
        hasEmergencyServices: data.hasEmergencyServices,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
      };

      // Dispatch action to add hospital - replace with your actual action
      const response = await dispatch(addNewHospitalAction(formattedData));
      if (response?.error) {
        toast.error(response.payload || "Failed to register hospital");
      } else {
        reset();
        if (closeModal) closeModal();
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 px-4 py-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Register New Hospital
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <Hospital className="mr-2 h-5 w-5 text-blue-600" />
          Hospital Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            control={control}
            name="name"
            label="Hospital Name"
            placeholder="Enter hospital name"
          />

          <FormInput
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Create a secure password"
            icon={Lock}
          />

          <FormInput
            control={control}
            name="email"
            label="Email Address"
            placeholder="hospital@example.com"
            icon={Mail}
          />

          <FormInput
            control={control}
            name="contactNumber"
            label="Contact Number"
            placeholder="Enter contact number"
            icon={Phone}
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-blue-600" />
          Location Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            control={control}
            name="location.latitude"
            label="Latitude"
            placeholder="Enter latitude coordinates"
          />

          <FormInput
            control={control}
            name="location.longitude"
            label="Longitude"
            placeholder="Enter longitude coordinates"
          />

          <FormInput
            control={control}
            name="location.region"
            label="Region"
            placeholder="Enter region"
          />

          <FormInput
            control={control}
            name="location.province"
            label="Province"
            placeholder="Enter province"
          />

          <div className="md:col-span-2">
            <FormInput
              control={control}
              name="location.address"
              label="Address"
              placeholder="Enter full address"
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <Tag className="mr-2 h-5 w-5 text-blue-600" />
          Services & Hours
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormInput
              control={control}
              name="servicesOffered"
              label="Services Offered"
              placeholder="Enter services separated by commas (e.g., Pediatrie, Prenatal, Surgery)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple services with commas
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="hasEmergencyServices"
              render={({ field }) => (
                <Checkbox
                  id="hasEmergencyServices"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <label htmlFor="hasEmergencyServices" className="text-gray-700">
              Offers Emergency Services
            </label>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700 mb-1">
                Opening Time
              </label>
              <Controller
                control={control}
                name="openingTime"
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      type="time"
                      name="openingTime"
                      id="openingTime"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      value={field.value}
                     
                      onChange={field.onChange}

                    />
                  </div>
                )}
              />
              {errors?.openingTime?.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.openingTime.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closing Time
              </label>
              <Controller
                control={control}
                name="closingTime"
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      type="time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
              {errors?.closingTime?.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.closingTime.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 py-4">
        <Button
          type="button"
          color="light"
          onClick={() => reset()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Reset
        </Button>
        <Button
          type="button"
          color="orange"
          onClick={() => reset()}
          className="bg-orange-400 hover:bg-orange-300 text-white"
        >
          Clear
        </Button>
        <Button type="submit" color="blue">
          Register Hospital
        </Button>
      </div>
    </form>
  );
}

export default AddNewHospital;
