import React from "react";
import { Field, Input } from "@chakra-ui/react";

interface TextInputFieldProps {
  label: string;
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
  invalid = false,
  onChange,
  value,
  inputSize,
  inputClassName = "p-2",
  inputOutline = "1px solid",
}) => {
  return (
    <Field.Root className="p-2" invalid={invalid}>
      <Field.Label>{label}</Field.Label>
      <Input
        size={inputSize}
        className={inputClassName}
        outline={inputOutline}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {invalid && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  );
};

export default TextInputField;
