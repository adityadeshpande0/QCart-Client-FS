import React, { useState } from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";

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
      // Handle login logic here
      alert("Login submitted!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        value={form.password}
        onChange={(val) => handleChange("password", val)}
        invalid={!!errors.password}
        errorText={errors.password}
      />
      <button type="submit" style={{ marginTop: "1rem" }}>
        Login
      </button>
    </form>
  );
};

export default Login;
