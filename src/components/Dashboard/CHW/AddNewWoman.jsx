/* eslint-disable react/prop-types */
import { useState } from "react";
import PregnancyHealthRecordForm from "../PregnantWoman/PregnantHealthRecordForm";
import { Button, Label, TextInput } from "flowbite-react";
import SelectInput from "../../shared/SelectInput";
import { formFields, role } from "../../../lib/constant";
import toast from "react-hot-toast";
import { registerAction } from "../../../redux/slices/authSlice";
import getLocation from "../../../lib/helpers/getLocation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { sendEmail } from "../../../redux/slices/emailSlice";
import LoadingSpinner from "../../shared/LoadingSpinner";
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
function AddNewWoman() {
  const [isDoneRegister, setIsDoneRegister] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [newUserId, setNewUserId] = useState(null);
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
      if (result?.error) {
        throw new Error(result?.payload);
      } else {
         const emailData = {
                    recipients: [data?.email],
                    subject: `Your Credential for Mama-Care`,
                    html: (
                      <div>
                        <h5>
                          Hello you have been registered as a new user in Mama-Care. Here is your credential:
                        </h5>
                        <p>
                          Email: {data.email}
                        </p>
                        <p>
                          Password: {data.password}
                        </p>
                        <p>Phone Number: {data?.phoneNumber}</p>
                        <p>Note: Please credentials should be kept confidentially as you will use them to login to Mama care.</p>
                      </div>
                    ),
                  };
                  dispatch(sendEmail(emailData));
        console.log(data)
        setNewUserId(result?.payload?.id);
        setIsDoneRegister(true);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };
  return (
    <div>
      <h1 className="text-center text-2xl font-extrabold text-blue-700">
        Register New User
      </h1>
      {!isDoneRegister ? (
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

          <Button className="w-full" type="submit" color="blue">
            {loading ? (
              <LoadingSpinner/>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      ) : (
        <PregnancyHealthRecordForm isForUpdate={false} userId={newUserId} />
      )}
    </div>
  );
}

export default AddNewWoman;
