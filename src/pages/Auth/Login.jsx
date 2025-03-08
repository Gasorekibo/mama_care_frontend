import { Button, Card, Label, TextInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { HiHeart, HiLockClosed, HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/authSlice";
import toast, { LoaderIcon } from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUserRole, setLoginUserRole] = useState("user");
  const { loading } = useSelector((state) => state.auth);
  function handleUserRole(role) {
    setLoginUserRole(role);
  }
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    if (loginUserRole === "user") {
      const result = await dispatch(loginAction(data));

      if (result?.payload?.user?.id) {
        return navigate(`/profile/${result?.payload?.user?.id}`);
      } else {
        if (result?.error?.message === "Network Error") {
          toast.error(
            "Network Error! Please check your internet connection and Try again"
          );
        } else {
          toast.error("Invalid Credentials! Please try again");
        }
      }
    } else {
      const dataToSend = {
        ...data,
        userType: "hospital",
      };
      const result = await dispatch(loginAction(dataToSend));
      if (result?.payload?.user?.id) {
        return navigate(`/profile/${result?.payload?.user?.id}`);
      } else {
        if (result?.error?.message === "Network Error") {
          toast.error(
            "Network Error! Please check your internet connection and Try again"
          );
        } else {
          toast.error("Invalid Credentials! Please try again");
        }
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8 pt-40">
      <div className="max-w-xl mx-auto" style={{ maxWidth: "400px", color: "blue" , backgroundColor: "green"}}>
        <Card className="shadow-xl border-0">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-50 rounded-full">
                  <HiHeart className="h-12 w-12 text-blue-600 animate-pulse" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-500">
                Access your Mama Care healthcare account
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6">
              <div className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="email"
                        type="email"
                        icon={HiMail}
                        placeholder="you@example.com"
                        required={true}
                        className="mt-1"
                        sizing="lg"
                      />
                    )}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        id="password"
                        type="password"
                        icon={HiLockClosed}
                        placeholder="••••••••"
                        {...field}
                        required={true}
                        className="mt-1"
                        sizing="lg"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleUserRole("user")}
                    type="submit"
                    color="blue"
                    disabled={loading && loginUserRole==="user"}
                    className="w-full"
                    size="lg"
                  >
                    {loading && loginUserRole==="user" ? (
                      <LoaderIcon className="mx-auto" />
                    ) : (
                      "Sign in as User"
                    )}
                  </Button>
                  <Button
                    type="submit"
                    color="blue"
                    onClick={() => handleUserRole("hospital")}
                    disabled={loading && loginUserRole==="hospital"}
                    className="w-full"
                    size="lg"
                  >
                    {loading && loginUserRole=== "hospital" ? (
                      <LoaderIcon className="mx-auto" />
                    ) : (
                      "Sign in as Hospital"
                    )}
                  </Button>
                </div>

                <p className="text-center text-md font-semibold">
                  Don&apos;t have an account?
                </p>
                <Button
                  type="button"
                  color="gray"
                  onClick={() => navigate("/register")}
                  className="w-full text-gray-600 hover:text-blue-600 bg-transparent hover:bg-blue-50 border border-gray-200"
                  size="lg"
                >
                  Create new account
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
