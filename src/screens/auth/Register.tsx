import React, { useState } from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Button } from "@chakra-ui/react";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const handleChange = (
    field: "name" | "email" | "password" | "confirmPassword" | "mobile",
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
    };

    if (!form.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    if (!form.mobile) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      alert("Registration submitted!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-indigo-600">
          Create an Account
        </h2>

        <TextInputField
          label="Name"
          placeholder="Enter your name"
          value={form.name}
          onChange={(val) => handleChange("name", val)}
          invalid={!!errors.name}
          errorText={errors.name}
        />

        <TextInputField
          label="Email Id"
          placeholder="Enter your email"
          value={form.email}
          onChange={(val) => handleChange("email", val)}
          invalid={!!errors.email}
          errorText={errors.email}
        />

        <TextInputField
          label="Mobile Number"
          placeholder="Enter your mobile number"
          value={form.mobile}
          onChange={(val) => handleChange("mobile", val)}
          invalid={!!errors.mobile}
          errorText={errors.mobile}
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

        <TextInputField
          label="Confirm Password"
          placeholder="Re-enter your password"
          type="password"
          value={form.confirmPassword}
          onChange={(val) => handleChange("confirmPassword", val)}
          invalid={!!errors.confirmPassword}
          errorText={errors.confirmPassword}
        />

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 text-base sm:text-lg"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
