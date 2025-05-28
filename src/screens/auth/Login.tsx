import React from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Button } from "@chakra-ui/react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./authApiQuery";

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
  const [loginUser] = useLoginUserMutation();
  const { values, errors, handleChange, validateForm } = useFormValidation(
    initialValues,
    validationSchema
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(values.email, values.password);
      loginUser({ email: values.email, password: values.password })
        .unwrap()
        .then(() => {
          alert("Login successful!");
        })
        .catch((error: any) => {
          console.error("Login failed:", error);
          alert("Login failed. Please check your credentials.");
        });
      alert("Login submitted!");
    }
  };
  const navigation = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6"
      >
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
    </div>
  );
};

export default Login;
