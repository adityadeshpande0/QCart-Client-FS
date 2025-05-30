import React from "react";
import TextInputField from "@/components/reusables/input-fields/TextInputField";
import { Alert, Button } from "@chakra-ui/react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAddNewProductsMutation } from "../apiQueries/adminRelatedApiCalls";

const initialValues = {
  title: "",
  category: "",
  price: "",
  image: "",
  stock: "",
};

const validationSchema = {
  title: { required: true },
  category: { required: true },
  price: { required: true, pattern: /^\d+$/ },
  image: { required: true },
  stock: { required: true, pattern: /^\d+$/ },
};

const AddNewProducts: React.FC = () => {
  const { values, errors, handleChange, validateForm, setValues } =
    useFormValidation(initialValues, validationSchema);
  const [addNewProduct, { isError, isSuccess, data }] =
    useAddNewProductsMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitting product:", values);
      setValues(initialValues);
      addNewProduct(values);
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
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl"
      >
        {alertStatus && alertMessage && (
          <Alert.Root status={alertStatus}>
            <Alert.Indicator />
            <Alert.Title>{alertMessage}</Alert.Title>
          </Alert.Root>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <TextInputField
            label="Category"
            placeholder="Enter category"
            value={values.category}
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
  );
};

export default AddNewProducts;
