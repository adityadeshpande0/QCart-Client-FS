import React from "react";
import {
  Box,
  Text,
  Flex,
  Icon,
  Button,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { LuMapPin, LuPencil, LuTrash2 } from "react-icons/lu";
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
} from "../userProfileApiQueries";

const AdressesSection: React.FC = () => {
  const { data, refetch } = useGetAddressesQuery({});
  const [deleteSavedAddress] = useDeleteAddressMutation();

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteSavedAddress(addressId).unwrap();
      await refetch();
      // Optionally, you can show a success message or refresh the addresses
    } catch (error) {
      console.error("Failed to delete address:", error);
      // Optionally, show an error message
    }
  };

  const formatAddress = (address: any) => {
    const { street, city, state, zipCode, country } = address;
    return [street, city, state, zipCode, country].filter(Boolean).join(", ");
  };

  return (
    <Box p={4} className="space-y-6">
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">
          All Saved Addresses
        </Text>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {}}
          size="sm"
          variant="solid"
          boxShadow="md"
          _hover={{ boxShadow: "lg" }}
          fontSize="sm"
          px={4}
          py={2}
          fontWeight="semibold"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          loading={false}
          loadingText="Adding Address"
          disabled={false}
          width="auto"
          colorScheme="pink"
          borderRadius="md"
        >
          <Icon as={LuMapPin} /> Add New Address
        </Button>
      </Flex>

      <Separator />

      {/* Address Cards */}
      {data?.addresses?.map((address: any, idx: number) => (
        <Flex
          key={address._id || idx}
          bg="white"
          borderRadius="md"
          shadow="sm"
          p={4}
          justify="space-between"
          align="flex-start"
          className="hover:shadow-md transition-all"
        >
          {/* Left - Icon and Address */}
          <HStack align="flex-start" gap={3}>
            <Icon as={LuMapPin} boxSize={5} color="purple.500" mt={1} />
            <Box>
              <Text fontWeight="semibold" mb={1}>
                {address.label || "Other"}
              </Text>
              <Text
                fontSize="sm"
                color="gray.600"
                className="whitespace-pre-line"
              >
                {formatAddress(address)}
              </Text>
            </Box>
          </HStack>

          {/* Right - Actions */}
          <HStack gap={3}>
            <Icon
              as={LuPencil}
              boxSize={5}
              color="gray.500"
              cursor="pointer"
              _hover={{ color: "gray.700" }}
            />
            <Button onClick={() => handleDeleteAddress(address._id)}>
              <Icon
                as={LuTrash2}
                boxSize={5}
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "red.500" }}
              />
            </Button>
          </HStack>
        </Flex>
      ))}
    </Box>
  );
};

export default AdressesSection;
