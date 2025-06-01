import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { LuGift, LuShoppingBag, LuMapPin, LuUser } from "react-icons/lu";
import { useGetUserProfileQueryQuery } from "@/app/commonApiQuery";
import CustomAvatar from "@/components/reusables/Avatar";
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserProfileQueryQuery({});

  if (isLoading || !user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={6}
        w="full"
      >
        <Spinner />
      </Box>
    );
  }
  const menuData = [
    { label: "Past Orders", icon: LuShoppingBag, path: "orders" },
    { label: "Saved Addresses", icon: LuMapPin, path: "addresses" },
    { label: "Profile", icon: LuUser, path: "profile" },
  ];
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      w="full"
      h="100vh"
      bg="gray.50"
    >
      {/* Sidebar */}
      <Box
        w={{ base: "100%", md: "360px", lg: "400px" }}
        bg="white"
        p={4}
        shadow="md"
        h={{ base: "auto", md: "100vh" }}
        overflowY="auto"
        borderRight={{ md: "1px solid #E2E8F0" }}
      >
        {/* Profile Section */}
        <VStack gap={4} align="stretch">
          <HStack gap={4}>
            <CustomAvatar name={user?.user?.name} src={""} />
            <Box>
              <Text fontWeight="bold">{user?.user?.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {user?.user?.phone}
              </Text>
            </Box>
          </HStack>

          {/* Free Cash Section */}
          <Flex
            w="full"
            bg="purple.100"
            rounded="lg"
            p={3}
            justify="space-between"
            align="center"
          >
            <HStack gap={1}>
              <Icon as={LuGift} color="purple.600" />
              <Text fontSize="sm" fontWeight="semibold">
                Free Cash
              </Text>
            </HStack>
            <Text color="purple.700" fontWeight="semibold">
              ₹{user?.user?.freeCashBalance}
            </Text>
          </Flex>
        </VStack>

        {/* Menu Items */}
        <VStack gap={1} mt={6} align="stretch">
          {menuData.map(({ label, icon: IconComponent, path }, i) => (
            <Link to={`/user-profile/${path}`} key={i}>
              <Flex
                align="center"
                gap={3}
                p={3}
                borderRadius="md"
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
              >
                <Icon as={IconComponent} color="gray.600" />
                <Text>{label}</Text>
              </Flex>
            </Link>
          ))}
        </VStack>

        {/* Footer */}
        <Box mt={6} textAlign="center">
          <Button
            variant="ghost"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            color="gray.600"
            _hover={{ textDecoration: "underline" }}
          >
            Log Out
          </Button>
          <Text fontWeight="bold" mt={4} color="gray.400">
            Quick Cart
          </Text>
        </Box>
      </Box>

      {/* Main Content Outlet */}
      <Box
        flex="1"
        p={{ base: 4, md: 8 }}
        overflowY="auto"
        h={{ base: "auto", md: "100vh" }}
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default UserProfile;
