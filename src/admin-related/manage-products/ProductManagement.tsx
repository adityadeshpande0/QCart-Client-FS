import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Spinner,
  Text,
  Heading,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
} from "../apiQueries/adminRelatedApiCalls";
import { Edit, Trash2 } from "lucide-react";

const ProductManagement: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetAllProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [editProduct] = useEditProductMutation();

  const [actionError, setActionError] = useState<string | null>(null);
  const [isActing, setIsActing] = useState(false);

  const handleDelete = async (id: string) => {
    setIsActing(true);
    setActionError(null);
    try {
      await deleteProduct(id).unwrap();
      await refetch();
    } catch (err) {
      setActionError("Failed to delete product.");
    } finally {
      setIsActing(false);
    }
  };

  const handleEdit = async (product: any) => {
    setIsActing(true);
    setActionError(null);
    const updatedProduct = {
      ...product,
      title: product.title + " (Updated)",
    };
    try {
      await editProduct({ id: product._id, data: updatedProduct }).unwrap();
      await refetch();
    } catch (err) {
      setActionError("Failed to update product.");
    } finally {
      setIsActing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error fetching products.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <Heading
        size="lg"
        mb={6}
        color="indigo.700"
        textAlign="center"
        className="text-2xl sm:text-3xl font-bold"
      >
        Manage Products
      </Heading>

      {actionError && (
        <div className="text-center text-red-500 mb-6">{actionError}</div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.products?.map((product: any) => (
          <Box
            key={product._id}
            bg="white"
            rounded="2xl"
            shadow="lg"
            p={5}
            className="flex flex-col transition-all duration-300 hover:shadow-2xl"
          >
            <Image
              src={product.image}
              alt={product.title}
              rounded="md"
              className="object-cover h-48 w-full mb-4"
            />
            <Text fontWeight="bold" fontSize="lg" mb={1} truncate>
              {product.title}
            </Text>
            <Text color="gray.600" fontSize="sm">
              Category:{" "}
              <span className="font-medium">{product.category}</span>
            </Text>
            <Text color="gray.600" fontSize="sm">
              Price: <span className="font-medium">₹{product.price}</span>
            </Text>
            <Text color="gray.600" fontSize="sm" mb={4}>
              Stock: <span className="font-medium">{product.stock}</span>
            </Text>

            <Flex mt="auto" gap={3}>
              <Button
                size="sm"
                colorScheme="blue"
                className="flex-1"
                loading={isActing}
                onClick={() => handleEdit(product)}
              >
                <Icon as={Edit} boxSize={4} /> Edit
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                className="flex-1"
                loading={isActing}
                onClick={() => handleDelete(product._id)}
              >
                <Icon as={Trash2} boxSize={4} /> Delete
              </Button>
            </Flex>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
