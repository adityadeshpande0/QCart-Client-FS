import { useState, useCallback } from "react";

type ValidationRule<T> = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string, values: T) => string | null;
};

type ValidationSchema<T> = {
  [K in keyof T]: ValidationRule<T>;
};

type Errors<T> = {
  [K in keyof T]?: string;
};

export function useFormValidation<T>(
  initialValues: T,
  validationSchema: ValidationSchema<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  const validateField = useCallback(
    (name: keyof T, value: string) => {
      const rules = validationSchema[name];
      let error = "";

      if (rules.required && !value.trim()) {
        error = "This field is required";
      } else if (rules.minLength && value.length < rules.minLength) {
        error = `Minimum length is ${rules.minLength}.`;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        error = `Maximum length is ${rules.maxLength}.`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        error = "Invalid format";
      } else if (rules.custom) {
        const customError = rules.custom(value, values);
        if (customError) error = customError;
      }

      setErrors((prev) => ({ ...prev, [name]: error }));
      return error === "";
    },
    [validationSchema, values]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => {
        if (prev[name as keyof T] === value) return prev;
        return { ...prev, [name]: value };
      });

      validateField(name as keyof T, value);
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    let isValid = true;
    (Object.keys(validationSchema) as (keyof T)[]).forEach((field) => {
      const valid = validateField(field, values[field] as unknown as string);
      if (!valid) isValid = false;
    });
    return isValid;
  }, [values, validateField, validationSchema]);

  return {
    values,
    errors,
    handleChange,
    validateForm,
    setValues,
    setErrors,
  };
}
