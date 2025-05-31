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
  Alert,

  VStack,
} from "@chakra-ui/react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useEditProductMutation,
} from "../apiQueries/adminRelatedApiCalls";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
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
      <Flex justify="center" align="center" minH="80vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert.Root status="error" mt={10}>
      
        Error fetching products.
      </Alert.Root>
    );
  }

  const hasProducts = data?.products?.length > 0;

  return (
    <Box minH="100vh" bg="gray.50" px={4} py={10}>
      <Heading size="lg" mb={6} color="indigo.700" textAlign="center">
        Manage Products
      </Heading>

      {actionError && (
        <Text textAlign="center" color="red.500" mb={4}>
          {actionError}
        </Text>
      )}

      {!hasProducts ? (
        <VStack gap={6} mt={10}>
          <Text fontSize="xl" color="gray.600">
            No products available.
          </Text>
          <Button
            colorScheme="teal"
            onClick={() => navigate("/manage-products/add")}
          >
            <Plus size={18} /> Add Product
          </Button>
        </VStack>
      ) : (
        <Box>
          <Flex justify="flex-end" mb={6}>
            <Button
              colorScheme="teal"
              onClick={() => navigate("/manage-products/add")}
            >
              <Plus size={18} /> Add Product
            </Button>
          </Flex>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.products.map((product: any) => (
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
                    flex={1}
                    loading={isActing}
                    onClick={() => handleEdit(product)}
                  >
                    <Icon as={Edit} boxSize={4} mr={2} /> Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    flex={1}
                    loading={isActing}
                    onClick={() => handleDelete(product._id)}
                  >
                    <Icon as={Trash2} boxSize={4} mr={2} /> Delete
                  </Button>
                </Flex>
              </Box>
            ))}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default ProductManagement;
