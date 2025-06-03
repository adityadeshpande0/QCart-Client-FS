import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../apiQueries/adminRelatedApiCalls";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Separator,
  Collapsible,
} from "@chakra-ui/react";

const socket = io(import.meta.env.VITE_PORT_SOCKET_URL, {
  withCredentials: true,
});

const ManageOrders: React.FC = () => {
  const { data, refetch } = useGetAllOrdersQuery({});
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [openUser, setOpenUser] = useState<string | null>(null);
  const [ordersData, setOrdersData] = useState<any[]>([]);

  // Initialize local state from fetched data
  useEffect(() => {
    if (data?.data) {
      setOrdersData(data.data);
    }
  }, [data]);

  // Socket.io setup for real-time updates
  useEffect(() => {
    socket.connect();
    socket.emit("join-admin");

    socket.on("new-order", () => {
      refetch();
    });

    socket.on("order-status-updated", (update: any) => {
      setOrdersData((prev) =>
        prev.map((user) => {
          const orders = user.orders.map((order: any) => {
            if (order.orderId === update.orderId) {
              return {
                ...order,
                status: update.status,
                dispatchedAt: update.dispatchedAt,
                deliveredAt: update.deliveredAt,
              };
            }
            return order;
          });
          return {
            ...user,
            orders,
          };
        })
      );
    });

    return () => {
      socket.off("new-order");
      socket.off("order-status-updated");
      socket.disconnect();
    };
  }, [refetch]);

  // Handler for updating order status
  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      // Optionally refetch or rely on socket event for UI update
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 px-4 py-6">
      <Text className="text-2xl font-bold mb-6">Manage Orders</Text>
      <VStack gap={6} align="stretch">
        {ordersData.map((user: any) => (
          <Box
            key={user.userDetails.id}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <Collapsible.Root
              open={openUser === user.userDetails.id}
              onOpenChange={() =>
                setOpenUser(
                  openUser === user.userDetails.id ? null : user.userDetails.id
                )
              }
            >
              <Collapsible.Trigger asChild>
                <HStack justify="space-between" w="full" cursor="pointer">
                  <Heading size="md">
                    {user.userDetails.name} ({user.userDetails.email})
                  </Heading>
                  <Button size="sm" variant="outline">
                    {openUser === user.userDetails.id
                      ? "Hide Orders"
                      : "View Orders"}
                  </Button>
                </HStack>
              </Collapsible.Trigger>

              <Collapsible.Content>
                <VStack gap={4} mt={4}>
                  {user.orders.map((order: any) => (
                    <Box
                      key={order.orderId}
                      className="w-full bg-gray-50 border rounded-lg p-4"
                    >
                      <Text fontWeight="bold">Status: {order.status}</Text>
                      <Text>Total: ₹{order.totalAmount}</Text>
                      <Text>
                        Date: {new Date(order.createdAt).toLocaleString()}
                      </Text>
                      {order.dispatchedAt && (
                        <Text>
                          Dispatched At:{" "}
                          {new Date(order.dispatchedAt).toLocaleString()}
                        </Text>
                      )}
                      {order.deliveredAt && (
                        <Text>
                          Delivered At:{" "}
                          {new Date(order.deliveredAt).toLocaleString()}
                        </Text>
                      )}
                      <Separator my={2} />
                      <VStack gap={3} align="stretch">
                        {order.products.map((product: any) => (
                          <HStack
                            key={product.productId}
                            gap={4}
                            align="center"
                          >
                            <Image
                              src={product.image}
                              alt={product.title || "Product image"}
                              boxSize="60px"
                              objectFit="cover"
                              className="rounded-lg"
                            />
                            <Box>
                              <Text fontWeight="medium">{product.title}</Text>
                              <Text>Qty: {product.quantity}</Text>
                              <Text>Subtotal: ₹{product.subtotal}</Text>
                            </Box>
                          </HStack>
                        ))}
                      </VStack>

                      {/* Status update buttons */}
                      <HStack gap={4} mt={3}>
                        {order.status === "Placed" && (
                          <Button
                            size="sm"
                            className="bg-black px-4 text-white hover:bg-gray-800 transition"
                            colorScheme="blue"
                            loading={isUpdating}
                            onClick={() =>
                              handleStatusUpdate(order.orderId, "Dispatched")
                            }
                          >
                            Mark as Dispatched
                          </Button>
                        )}
                        {order.status === "Dispatched" && (
                          <Button
                            size="sm"
                            colorScheme="green"
                            loading={isUpdating}
                            onClick={() =>
                              handleStatusUpdate(order.orderId, "Delivered")
                            }
                          >
                            Mark as Delivered
                          </Button>
                        )}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Collapsible.Content>
            </Collapsible.Root>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ManageOrders;
