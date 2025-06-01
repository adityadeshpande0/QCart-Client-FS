import React from "react";
import {
  Box,
  Heading,
  Spinner,
  Alert,
  VStack,
  HStack,
  Text,
  Image,
  Separator,
  Badge,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useGetOrdersQuery } from "../userProfileApiQueries";
import { AlertCircleIcon } from "lucide-react";

const OrdersSection: React.FC = () => {
  const { data, isLoading, isError } = useGetOrdersQuery({});

  const handleCancelOrder = (orderId: string) => {
    console.log("Cancel Order ID:", orderId);
    // You can later replace this with an API call to cancel the order
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert.Root status="error" my={4}>
        <HStack>
          <AlertCircleIcon />
          <Text>Failed to load orders.</Text>
        </HStack>
      </Alert.Root>
    );
  }

  if (!data || data.length === 0 || data.orders.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No orders found.</Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" gap={6}>
      <Heading size="md" mb={2}>
        Your Orders
      </Heading>
      {data.orders.map((order: any) => (
        <Box
          key={order._id}
          borderWidth="1px"
          borderRadius="lg"
          p={5}
          boxShadow="sm"
          bg="white"
        >
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="bold">Order ID: {order._id}</Text>
            <Badge
              colorScheme={
                order.status === "Cancelled"
                  ? "red"
                  : order.status === "Delivered"
                  ? "green"
                  : "yellow"
              }
            >
              {order.status}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </Text>
          <Separator mb={3} />
          <Stack gap={4}>
            {order.products.map((item: any) => (
              <HStack key={item._id} align="start">
                <Image
                  boxSize="60px"
                  objectFit="cover"
                  src={
                    item.productId.image !== "na"
                      ? item.productId.image
                      : undefined
                  }
                  alt={item.productId.title}
                  borderRadius="md"
                />
                <Box flex="1">
                  <Text fontWeight="semibold">{item.productId.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {item.quantity} × ₹{item.price} / {item.productId.units}
                  </Text>
                </Box>
                <Text fontWeight="bold">₹{item.subtotal}</Text>
              </HStack>
            ))}
          </Stack>
          <Separator my={3} />
          <Flex justify="space-between" align="center" mt={3}>
            <Box w="120px">
              {order.status !== "Cancelled" && (
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </Button>
              )}
            </Box>

            <HStack>
              <Text fontWeight="bold" textAlign="right">
                Total Amount:
              </Text>
              <Text fontWeight="bold" color="blue.600">
                ₹{order.totalAmount}
              </Text>
            </HStack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default OrdersSection;
