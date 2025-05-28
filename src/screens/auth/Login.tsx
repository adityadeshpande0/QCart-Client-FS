import React, { useState } from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Button } from "@chakra-ui/react";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
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
          value={form.email}
          onChange={(val) => handleChange("email", val)}
          invalid={!!errors.email}
          errorText={errors.email}
        />

        <TextInputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={form.password}
          onChange={(val) => handleChange("password", val)}
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
