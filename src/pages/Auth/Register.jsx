/* eslint-disable react/prop-types */
import { Button, Label, TextInput, Card } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { registerAction } from "../../redux/slices/authSlice";
import { formFields, role } from "../../lib/constant";
import SelectInput from "../../components/shared/SelectInput";
import getLocation from "../../lib/helpers/getLocation";
import toast, { LoaderIcon } from "react-hot-toast";

const schema = yup
  .object({
    ...Object.fromEntries(
      formFields.map((field) => [
        field.name,
        yup.string().required(`${field.label} is required`),
      ])
    ),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: yup.string().required("User role is required"),
  })
  .required();

const FormField = ({ field, control, errors }) => (
  <div>
    <div className="mb-2 block">
      <Label htmlFor={field.name} value={field.label} />
    </div>
    <TextInput
      id={field.name}
      type={field.type}
      icon={field.icon}
      placeholder={field.placeholder}
      color={errors[field.name]?.message ? "failure" : "gray"}
      helperText={errors[field.name]?.message}
      {...control.register(field.name)}
    />
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: Object.fromEntries(
      formFields.map((field) => [field.name, ""])
    ),
  });

  const onSubmit = async (data) => {
    try {
      const { latitude, longitude } = await getLocation();

      const result = await dispatch(
        registerAction({
          ...data,
          location: {
            latitude,
            longitude,
            address: data.address,
            region: data.region,
            province: data.province,
          },
        })
      );

      result.meta.requestStatus === "fulfilled"
        ? navigate("/login")
        : toast.error(
            result.payload || "Registration failed. Please try again."
          );
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <HiHeart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">
              Mama Care Registration
            </h1>
            <p className="text-gray-500">
              Join our healthcare community for better care
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  control={control}
                  errors={errors}
                />
              ))}
              <SelectInput
                name="role"
                control={control}
                options={role}
                label="User Role"
                placeholder="Select user role"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                color="gray"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </Button>
              <Button type="submit" color="blue">
                {loading ? (
                  <LoaderIcon className="text-center mt-1" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
export default Register;
