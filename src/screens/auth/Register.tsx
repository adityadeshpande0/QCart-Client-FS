import React, { useState } from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";

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
    <form onSubmit={handleSubmit}>
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
        value={form.password}
        onChange={(val) => handleChange("password", val)}
        invalid={!!errors.password}
        errorText={errors.password}
      />
      <TextInputField
        label="Confirm Password"
        placeholder="Re-enter your password"
        value={form.confirmPassword}
        onChange={(val) => handleChange("confirmPassword", val)}
        invalid={!!errors.confirmPassword}
        errorText={errors.confirmPassword}
      />
      <button type="submit" style={{ marginTop: "1rem" }}>
        Register
      </button>
    </form>
  );
};

export default Register;
