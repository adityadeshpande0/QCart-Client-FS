import React from "react";
import { Field, Input } from "@chakra-ui/react";

interface TextInputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  errorText?: string;
  invalid?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  inputSize?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  inputClassName?: string;
  inputOutline?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  errorText,
  type = "text",
  invalid = false,
  onChange,
  value,
  inputSize,
  inputOutline = "1px solid",
}) => {
  return (
    <Field.Root className="w-full" invalid={invalid}>
      <Field.Label className="block text-sm font-medium text-gray-700">
        {label}
      </Field.Label>
      <Input
        size={inputSize}
        type={type}
        className={`w-full rounded-lg px-4 py-2 border text-sm transition focus:outline-none focus:ring-2 ${
          invalid
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
        outline={inputOutline}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {invalid && (
        <Field.ErrorText className="text-sm text-red-500 mt-1">
          {errorText}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default TextInputField;
