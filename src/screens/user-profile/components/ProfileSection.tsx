import React from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  Stack,
  Grid,
  GridItem,
  VStack,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/screens/auth/authSlice";

type Address = {
  _id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
};

type UserData = {
  name: string;
  email: string;
  phone: string;
  freeCashBalance?: number;
  isAdmin?: boolean;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  addresses?: Address[];
};

const ProfileSection: React.FC = () => {
  const userData = useAppSelector(selectUser) as UserData | null;

  if (!userData) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Loading user data...</Text>
      </Box>
    );
  }

  return (
    <Box
      className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10"
      bg="white"
      rounded="md"
      shadow="md"
    >
      <Heading size="lg" mb={6} className="text-center sm:text-left">
        User Profile
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        mb={8}
        className="divide-y md:divide-y-0 md:divide-x divide-gray-200"
      >
        <GridItem>
          <VStack align="start" gap={3}>
            <Text fontSize="xl" fontWeight="bold">
              {userData.name}
            </Text>
            <Text>
              <span className="font-semibold">Email:</span> {userData.email}
            </Text>
            <Text>
              <span className="font-semibold">Phone:</span> {userData.phone}
            </Text>
            <Text>
              <span className="font-semibold">Free Cash Balance:</span> ₹
              {userData.freeCashBalance ?? 0}
            </Text>
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="start" gap={3}>
            <HStack className="ml-3" gap={2}>
              {userData.isAdmin && (
                <Badge colorScheme="purple" className="uppercase">
                  Admin
                </Badge>
              )}
              {userData.isActive ? (
                <Badge colorScheme="green" className="uppercase">
                  Active
                </Badge>
              ) : (
                <Badge colorScheme="red" className="uppercase">
                  Inactive
                </Badge>
              )}
            </HStack>
            <Separator />
            <Text fontSize="sm" color="gray.500" className="ml-4">
              Created At:{" "}
              {new Date(userData?.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
            <Text fontSize="sm" color="gray.500" className="ml-4">
              Updated At:{" "}
              {new Date(userData?.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </VStack>
        </GridItem>
      </Grid>

      <Separator mb={6} />

      <Box>
        <Heading size="md" mb={4}>
          Addresses
        </Heading>
        {userData.addresses && userData.addresses.length > 0 ? (
          <Stack gap={5}>
            {userData.addresses.map((addr) => (
              <Box
                key={addr._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                shadow="sm"
                bg="gray.50"
                className="hover:bg-gray-100 transition cursor-default"
              >
                <HStack justifyContent="space-between" mb={2}>
                  <Text fontWeight="semibold" fontSize="lg">
                    {addr.label}
                  </Text>
                  {addr.isDefault && (
                    <Badge colorScheme="blue" fontSize="xs">
                      Default
                    </Badge>
                  )}
                </HStack>
                <Text>
                  {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                </Text>
                <Text>{addr.country}</Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <Text>No addresses found.</Text>
        )}
      </Box>
    </Box>
  );
};

export default ProfileSection;
