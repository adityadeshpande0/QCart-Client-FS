import React from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Button, Checkbox } from "@chakra-ui/react";
import { useFormValidation } from "@/hooks/useFormValidation";
import PageWrapper from "@/components/animations/PageWrapper";
import { useUpdateAddressMutation } from "../userProfileApiQueries";

const initialValues = {
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  label: "",
  isDefault: false,
};

const validationSchema = {
  street: { required: true },
  city: { required: true },
  state: { required: true },
  zipCode: { required: true, pattern: /^[0-9]{5,6}$/ },
  country: { required: true },
  label: { required: true },
  isDefault: { required: false },
};

const AddNewAddress: React.FC = () => {
  const { values, errors, handleChange, validateForm } = useFormValidation(
    initialValues,
    validationSchema
  );
  const [updateAddress] = useUpdateAddressMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateAddress(values)
        .unwrap()
        .then((response) => {
          console.log("Address added successfully:", response);
          window.location.reload(); // Reload to reflect changes
        })
        .catch((error) => {
          console.error("Failed to add address:", error);
          // Optionally, show an error message
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 py-6">
      <PageWrapper className="w-full max-w-md sm:max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-600">
            Add Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInputField
              label="Street"
              placeholder="e.g. Aundh Ravet Road"
              value={values.street}
              onChange={(val) =>
                handleChange({ target: { name: "street", value: val } } as any)
              }
              invalid={!!errors.street}
              errorText={errors.street}
            />

            <TextInputField
              label="City"
              placeholder="e.g. Pune"
              value={values.city}
              onChange={(val) =>
                handleChange({ target: { name: "city", value: val } } as any)
              }
              invalid={!!errors.city}
              errorText={errors.city}
            />

            <TextInputField
              label="State"
              placeholder="e.g. MH"
              value={values.state}
              onChange={(val) =>
                handleChange({ target: { name: "state", value: val } } as any)
              }
              invalid={!!errors.state}
              errorText={errors.state}
            />

            <TextInputField
              label="Zip Code"
              placeholder="e.g. 411057"
              value={values.zipCode}
              onChange={(val) =>
                handleChange({ target: { name: "zipCode", value: val } } as any)
              }
              invalid={!!errors.zipCode}
              errorText={errors.zipCode}
            />

            <TextInputField
              label="Country"
              placeholder="e.g. IND"
              value={values.country}
              onChange={(val) =>
                handleChange({ target: { name: "country", value: val } } as any)
              }
              invalid={!!errors.country}
              errorText={errors.country}
            />

            <TextInputField
              label="Label"
              placeholder="e.g. Home, Work"
              value={values.label}
              onChange={(val) =>
                handleChange({ target: { name: "label", value: val } } as any)
              }
              invalid={!!errors.label}
              errorText={errors.label}
            />
          </div>

          <Checkbox.Root
            checked={values.isDefault}
            variant="solid"
            className="flex items-center space-x-2"
            onChange={(e) =>
              handleChange({
                target: {
                  name: "isDefault",
                  value: (e.target as HTMLInputElement).checked,
                },
              } as any)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control className="border border-gray-500" />
            <Checkbox.Label>Set as default</Checkbox.Label>
          </Checkbox.Root>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 text-sm sm:text-base"
          >
            Save Address
          </Button>
        </form>
      </PageWrapper>
    </div>
  );
};

export default AddNewAddress;
