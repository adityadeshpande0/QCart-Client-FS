import React from "react";
import { Field, Input } from "@chakra-ui/react";

interface TextInputFieldProps {
    label: string;
    placeholder?: string;
    errorText?: string;
    invalid?: boolean;
    onChange?: (value: string) => void;
    value?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
    label,
    placeholder,
    errorText,
    invalid = false,
    onChange,
    value,
}) => {
    return (
        <Field.Root invalid={invalid}>
            <Field.Label>{label}</Field.Label>
            <Input
                onChange={e => onChange && onChange(e.target.value)}
                placeholder={placeholder}
                value={value}

            />
            {invalid && <Field.ErrorText>{errorText}</Field.ErrorText>}
        </Field.Root>
    );
};

export default TextInputField;