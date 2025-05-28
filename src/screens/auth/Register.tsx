import React from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Alert, Button } from "@chakra-ui/react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "./authApiQuery";
import PageWrapper from "@/components/animations/PageWrapper";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
};

const validationSchema = {
  name: {
    required: true,
  },
  email: {
    required: true,
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
  confirmPassword: {
    required: true,
    custom: (value: string, values: typeof initialValues) =>
      value !== values.password ? "Passwords do not match" : null,
  },
  mobile: {
    required: true,
    pattern: /^[0-9]{10}$/,
  },
};

const Register: React.FC = () => {
  const [register, { isSuccess, isError, data }] = useRegisterUserMutation();
  const navigation = useNavigate();
  const { values, errors, handleChange, validateForm, setValues } =
    useFormValidation(initialValues, validationSchema);
  const handleResetFields = () => {
    setValues({ ...initialValues });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      register({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.mobile,
      })
        .unwrap()
        .then(() => {
          handleResetFields();
          navigation("/login");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          alert("Registration failed. Please try again.");
        });
    }
  };
  const alertStatus = isSuccess ? "success" : isError ? "error" : null;
  const alertMessage = isSuccess
    ? data?.message || "You are successfully registered !"
    : isError
    ? (errors as any)?.data?.error ||
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
            Create an Account
          </h2>

          <TextInputField
            label="Name"
            placeholder="Enter your name"
            value={values.name}
            onChange={(val) =>
              handleChange({
                target: { name: "name", value: val },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            invalid={!!errors.name}
            errorText={errors.name}
          />

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
            label="Mobile Number"
            placeholder="Enter your mobile number"
            value={values.mobile}
            onChange={(val) =>
              handleChange({
                target: { name: "mobile", value: val },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            invalid={!!errors.mobile}
            errorText={errors.mobile}
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

          <TextInputField
            label="Confirm Password"
            placeholder="Re-enter your password"
            type="password"
            value={values.confirmPassword}
            onChange={(val) =>
              handleChange({
                target: { name: "confirmPassword", value: val },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            invalid={!!errors.confirmPassword}
            errorText={errors.confirmPassword}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 text-base sm:text-lg"
          >
            Register
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigation("/login")}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </div>
        </form>
      </PageWrapper>
    </div>
  );
};

export default Register;
