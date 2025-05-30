import React from "react";
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
import { useGetAllProductsQuery } from "../apiQueries/adminRelatedApiCalls";
import { Edit, Trash2 } from "lucide-react";

const ProductManagement: React.FC = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({});

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
        mb={10}
        color="indigo.700"
        textAlign="center"
        className="text-2xl sm:text-3xl font-bold"
      >
        Manage Products
      </Heading>

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
              Category: <span className="font-medium">{product.category}</span>
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
                onClick={() => {
                  console.log("Edit product", product._id);
                }}
              >
                <Icon as={Edit} boxSize={4} /> Edit
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                
                className="flex-1"
                onClick={() => console.log("Delete product", product._id)}
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
