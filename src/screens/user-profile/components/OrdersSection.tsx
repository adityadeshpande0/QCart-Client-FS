import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Box,
  Heading,
  Spinner,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Stack,
  Button,
  Flex,
  Separator,
  Collapsible,
  Timeline,
} from "@chakra-ui/react";
import {
  useCancelOrderMutation,
  useGetOrdersQuery,
} from "../userProfileApiQueries";
import { AlertCircleIcon } from "lucide-react";
import { LuCheck, LuPackage, LuShip } from "react-icons/lu";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/screens/auth/authSlice";

// ⛓️ Connect socket (with credentials)
const socket = io(import.meta.env.VITE_API_BASE_URL, {
  withCredentials: true,
});

const OrdersSection: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetOrdersQuery({});
  const [cancelOrder] = useCancelOrderMutation();
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [openTimeline, setOpenTimeline] = useState<boolean>(false);
  const userData = useAppSelector(selectUser);

  const userId = userData?._id;
  useEffect(() => {
    socket.on("order-status-updated", ({ orderId, status }) => {
      console.log(`Order ${orderId} status changed to ${status}`);
      refetch();
    });

    return () => {
      socket.off("order-status-updated");
    };
  }, []);

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId)
      .unwrap()
      .then(() => {
        refetch();
      });
  };
  useEffect(() => {
    if (userId) {
      socket.connect();
      socket.emit("join-user", userId);
    }
  }, [userId]);

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={10} color="red.500">
        <HStack justify="center">
          <AlertCircleIcon />
          <Text>Failed to load orders.</Text>
        </HStack>
      </Box>
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

      {[...data.orders]
        .sort((a: any, b: any) => {
          if (a.status === "Cancelled" && b.status !== "Cancelled") return 1;
          if (a.status !== "Cancelled" && b.status === "Cancelled") return -1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })
        .map((order: any) => {
          const isOpen = openOrderId === order._id;

          const TIMELINE_STEPS = [
            { key: "placed", label: "Order Confirmed", icon: LuCheck },
            { key: "dispatched", label: "Order Dispatched", icon: LuShip },
            { key: "delivered", label: "Order Delivered", icon: LuPackage },
            {
              key: "cancelled",
              label: "Order Cancelled",
              icon: AlertCircleIcon,
            },
          ];

          const getCompletedSteps = (status: string) => {
            if (status.toLowerCase() === "cancelled") {
              return [
                {
                  key: "cancelled",
                  label: "Order Cancelled",
                  icon: AlertCircleIcon,
                },
              ];
            }

            const index = TIMELINE_STEPS.findIndex(
              (step) => step.key.toLowerCase() === status.toLowerCase()
            );
            return index === -1 ? [] : TIMELINE_STEPS.slice(0, index + 1);
          };

          return (
            <Box
              key={order._id}
              borderWidth="1px"
              borderRadius="lg"
              p={5}
              boxShadow="sm"
              bg="white"
            >
              <Collapsible.Root
                open={isOpen}
                onOpenChange={() => setOpenOrderId(isOpen ? null : order._id)}
              >
                <Collapsible.Trigger asChild>
                  <Flex justify="space-between" align="center" cursor="pointer">
                    <Box>
                      <Text fontWeight="bold">Order ID: {order._id}</Text>
                      <Text fontSize="sm" color="gray.500">
                        Placed on: {new Date(order.createdAt).toLocaleString()}
                      </Text>
                    </Box>
                    <HStack>
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-black px-4 text-white hover:bg-gray-800 transition"
                      >
                        {isOpen ? "Hide" : "View"}
                      </Button>
                    </HStack>
                  </Flex>
                </Collapsible.Trigger>

                <Collapsible.Content>
                  <Separator my={3} />
                  <Stack gap={4}>
                    {order.products.map((item: any) =>
                      item.productId ? (
                        <HStack key={item._id} align="start">
                          <Image
                            boxSize="60px"
                            objectFit="cover"
                            src={
                              item.productId.image &&
                              item.productId.image !== "na"
                                ? item.productId.image
                                : undefined
                            }
                            alt={item.productId?.title || "Product image"}
                            borderRadius="md"
                          />
                          <Box flex="1">
                            <Text fontWeight="semibold">
                              {item.productId?.title || "Unknown Product"}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {item.quantity} × ₹{item.price} /{" "}
                              {item.productId?.units || "unit"}
                            </Text>
                          </Box>
                          <Text fontWeight="bold">₹{item.subtotal}</Text>
                        </HStack>
                      ) : null
                    )}
                  </Stack>
                  <Separator my={3} />
                  <Flex justify="space-between" align="center" mt={3}>
                    <Box w="120px">
                      {order.status !== "Cancelled" && (
                        <Button
                          className="w-full bg-black text-white hover:bg-gray-800 transition"
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </Box>
                    <HStack>
                      <Text fontWeight="bold">Total:</Text>
                      <Text fontWeight="bold" color="blue.600">
                        ₹ {order.totalAmount}
                      </Text>
                    </HStack>
                  </Flex>
                  <Collapsible.Root
                    open={openTimeline}
                    onOpenChange={() => setOpenTimeline(!openTimeline)}
                  >
                    <Box className="flex justify-end">
                      <Collapsible.Trigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 px-4 text-blue hover:bg-gray-300 transition"
                        >
                          {openTimeline ? "Hide Timeline" : "View Timeline"}
                        </Button>
                      </Collapsible.Trigger>
                    </Box>

                    <Collapsible.Content asChild>
                      <Box className="w-full max-w-md md:max-w-xl lg:max-w-2xl px-4 py-6 mx-auto">
                        <Timeline.Root className="space-y-6">
                          {getCompletedSteps(order.status).map(
                            (step, idx, arr) => {
                              const Icon = step.icon;
                              const isLast = idx === arr.length - 1;

                              return (
                                <Timeline.Item
                                  key={step.key}
                                  className="flex items-start gap-4"
                                >
                                  <Box className="flex flex-col items-center">
                                    {idx > 0 && (
                                      <Box className="bg-gray-200 w-0.5 flex-1" />
                                    )}
                                    <Box className="rounded-full bg-black text-white p-2">
                                      <Icon size={16} />
                                    </Box>
                                    {!isLast && (
                                      <Box className="bg-gray-200 w-0.5 flex-1" />
                                    )}
                                  </Box>
                                  <Timeline.Content>
                                    <Timeline.Title className="text-base md:text-lg font-semibold">
                                      {step.label}
                                    </Timeline.Title>
                                    <Timeline.Description className="text-sm text-gray-500">
                                      {new Date(
                                        order.updatedAt
                                      ).toLocaleString()}
                                    </Timeline.Description>
                                  </Timeline.Content>
                                </Timeline.Item>
                              );
                            }
                          )}
                        </Timeline.Root>
                      </Box>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Collapsible.Content>
              </Collapsible.Root>
            </Box>
          );
        })}
    </VStack>
  );
};

export default OrdersSection;
