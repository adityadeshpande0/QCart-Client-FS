import React, { useState } from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Alert, Button, FileUpload, Text } from "@chakra-ui/react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAddNewProductsMutation } from "../apiQueries/adminRelatedApiCalls";
import { HardDriveUpload } from "lucide-react";
import SelectInputField from "@/components/reusables/input-fields/SelectInputField";
import { productCategories } from "../utils/SelectorValues";

const unitOptions = [
  { label: "Pieces", value: "pcs" },
  { label: "Kilograms", value: "kg" },
  { label: "Liters", value: "liters" },
  { label: "Meters", value: "meters" },
  { label: "Packs", value: "packs" },
];

const initialValues = {
  title: "",
  category: "",
  price: "",
  image: "",
  stock: "",
  units: "",
  unitValue: "",
};

const validationSchema = {
  title: { required: true },
  category: { required: true },
  price: { required: true, pattern: /^\d+(\.\d{1,2})?$/ },
  image: { required: true },
  stock: { required: true, pattern: /^\d+$/ },
  units: { required: true },
  unitValue: { required: false, pattern: /^\d+(\.\d+)?$/ },
};

const AddNewProducts: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const { values, errors, handleChange, validateForm, setValues } =
    useFormValidation(initialValues, validationSchema);

  const [addNewProduct, { isError, isSuccess, data }] =
    useAddNewProductsMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setExcelFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        ...values,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        unitValue: values.unitValue ? parseFloat(values.unitValue) : undefined,
      };
      addNewProduct(payload);
      setValues(initialValues);
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) return;
    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      await addNewProduct(formData);
      setExcelFile(null);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const alertStatus = isSuccess ? "success" : isError ? "error" : null;
  const alertMessage = isSuccess
    ? data?.message || "Product added successfully!"
    : isError
    ? (errors as any)?.data?.error ||
      "There was an error processing your request"
    : null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      {alertStatus && alertMessage && (
        <div className="max-w-6xl mx-auto mb-6">
          <Alert.Root status={alertStatus}>{alertMessage}</Alert.Root>
        </div>
      )}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bulk Upload */}
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4">
              Bulk Upload
            </h2>
            <Text fontSize="md" className="text-gray-600 mb-6">
              Upload a .xlsx file to add multiple products at once. Make sure
              the document matches the expected format.
            </Text>

            <FileUpload.Root>
              <FileUpload.HiddenInput onChange={handleFileSelect} />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <HardDriveUpload className="mr-2" /> Choose File
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleExcelUpload}
              disabled={!excelFile}
              colorScheme="blue"
              size="lg"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Upload Excel
            </Button>
          </div>
        </div>

        {/* Manual Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
            Add New Product
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextInputField
              label="Title"
              placeholder="Enter product title"
              value={values.title}
              onChange={(val) =>
                handleChange({ target: { name: "title", value: val } } as any)
              }
              invalid={!!errors.title}
              errorText={errors.title}
            />
            <SelectInputField
              label="Category"
              placeholder="Select Category"
              value={values.category}
              options={productCategories}
              onChange={(val) =>
                handleChange({ target: { name: "category", value: val } } as any)
              }
              invalid={!!errors.category}
              errorText={errors.category}
            />
            <TextInputField
              label="Price"
              placeholder="Enter price"
              value={values.price}
              onChange={(val) =>
                handleChange({ target: { name: "price", value: val } } as any)
              }
              invalid={!!errors.price}
              errorText={errors.price}
            />
            <TextInputField
              label="Image URL"
              placeholder="Enter image URL"
              value={values.image}
              onChange={(val) =>
                handleChange({ target: { name: "image", value: val } } as any)
              }
              invalid={!!errors.image}
              errorText={errors.image}
            />
            <TextInputField
              label="Stock"
              placeholder="Enter stock quantity"
              value={values.stock}
              onChange={(val) =>
                handleChange({ target: { name: "stock", value: val } } as any)
              }
              invalid={!!errors.stock}
              errorText={errors.stock}
            />
            <SelectInputField
              label="Units"
              placeholder="Select units"
              value={values.units}
              options={unitOptions}
              onChange={(val) =>
                handleChange({ target: { name: "units", value: val } } as any)
              }
              invalid={!!errors.units}
              errorText={errors.units}
            />
            <TextInputField
              label="Unit Value"
              placeholder="Optional (e.g. 0.5)"
              value={values.unitValue}
              onChange={(val) =>
                handleChange({ target: { name: "unitValue", value: val } } as any)
              }
              invalid={!!errors.unitValue}
              errorText={errors.unitValue}
            />
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              size="lg"
              colorScheme="indigo"
              className="px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProducts;
