import React from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Button } from "@chakra-ui/react";
import { useFormValidation } from "@/hooks/useFormValidation";

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
  const { values, errors, handleChange, validateForm } = useFormValidation(
    initialValues,
    validationSchema
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login submitted!");
    }
  };

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
      </form>
    </div>
  );
};

export default Login;
