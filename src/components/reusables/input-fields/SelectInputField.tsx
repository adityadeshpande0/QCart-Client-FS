import React from "react";
import { createListCollection, Portal, Select, Field } from "@chakra-ui/react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputFieldProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  value?: string;
  isDisabled?: boolean;
  invalid?: boolean;
  errorText?: string;
  inputSize?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const SelectInputField: React.FC<SelectInputFieldProps> = ({
  label,
  placeholder = "Select an option",
  options,
  onChange,
  value,
  isDisabled = false,
  invalid = false,
  errorText,
  inputSize = "sm",
}) => {
  const collection = createListCollection({
    items: options,
  });

  const handleValueChange = (details: { value: string[] | string }) => {
    if (onChange) {
      const selectedValue = Array.isArray(details.value) ? details.value[0] : details.value;
      onChange(selectedValue);
    }
  };

  return (
    <Field.Root className="w-full" invalid={invalid}>
      <Field.Label className="block text-sm font-medium text-gray-700">
        {label}
      </Field.Label>
      <Select.Root
        collection={collection}
        bgSize={inputSize}
        onValueChange={handleValueChange}
        className="w-full"
        disabled={isDisabled}
        value={value !== undefined ? [value] : undefined}
      >
        <Select.HiddenSelect />
        <Select.Control
          className={`w-full rounded-lg px-4 border text-sm text-gray-900 transition focus:outline-none focus:ring-2 ${
            invalid
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        >
          <Select.Trigger className="flex justify-between items-center w-full">
            <Select.ValueText placeholder={placeholder} />
            <Select.IndicatorGroup className="ml-2">
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner className="w-full">
            <Select.Content className="bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto w-full">
              {collection.items.map((item) => (
                <Select.Item
                  item={item}
                  key={item.value}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
                >
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      {invalid && errorText && (
        <Field.ErrorText className="text-sm text-red-500 mt-1">
          {errorText}
        </Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default SelectInputField;
