import React from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Alert, Button } from "@chakra-ui/react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./authApiQuery";
import PageWrapper from "@/components/animations/PageWrapper";

const initialValues = { email: "", password: "" };

const validationSchema = {
  email: {
    required: true,
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
};

const Login: React.FC = () => {
  const [loginUser, { isSuccess, isError, data, error }] =
    useLoginUserMutation();
  console.log(data?.user?.isAdmin, "isAdmin status from login response");
  const { values, errors, handleChange, validateForm, setValues } =
    useFormValidation(initialValues, validationSchema);
  const handleResetFields = () => {
    setValues({ ...initialValues });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser({ email: values.email, password: values.password })
        .unwrap()
        .then((response) => {
          localStorage.setItem("token", response?.token);
          if (response?.user?.isAdmin) {
            navigation("/admin-dashboard");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    }
  };

  const navigation = useNavigate();
  const alertStatus = isSuccess ? "success" : isError ? "error" : null;
  const alertMessage = isSuccess
    ? data?.message || "You are successfully logged in!"
    : isError
    ? (error as any)?.data?.error ||
      "There was an error processing your request"
    : null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 py-8">
      <PageWrapper className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6"
        >
          {alertStatus && alertMessage && (
            <Alert.Root status={alertStatus}>
              <Alert.Indicator />
              <Alert.Title>{alertMessage}</Alert.Title>
            </Alert.Root>
          )}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-indigo-600">
            Login to Your Account
          </h2>

          <TextInputField
            label="Email Id"
            placeholder="Enter your email"
            value={values.email}
            onChange={(val) =>
              handleChange({
                target: { name: "email", value: val },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            invalid={!!errors.email}
            errorText={errors.email}
          />

          <TextInputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={values.password}
            onChange={(val) =>
              handleChange({
                target: { name: "password", value: val },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            invalid={!!errors.password}
            errorText={errors.password}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 text-base sm:text-lg"
          >
            Login
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => navigation("/signup")}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </div>
        </form>
      </PageWrapper>
    </div>
  );
};

export default Login;
