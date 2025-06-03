import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, Menu, X, ShoppingCart } from "lucide-react";
import CustomAvatar from "@/components/reusables/Avatar";
import { useGetUserProfileQueryQuery } from "@/app/commonApiQuery";
import { useSelector } from "react-redux";
import { setUserData, selectUser, setUserAddress } from "../auth/authSlice";
import { Badge, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import {
  openCart,
  selectAdminNavmenuIsOpen,
  toggleAdminNavmenu,
} from "../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";

const Navbar: React.FC = () => {
  const { data, isSuccess } = useGetUserProfileQueryQuery({});
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(
    (state: RootState) => state.cartReducer.items
  );
  const toggleAdminNavMenu = useAppSelector(selectAdminNavmenuIsOpen);
  const user = useSelector(selectUser);

  const isLoggedIn = !!localStorage.getItem("token");
  const cartCount = cartItems.length;
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserData(data.user));
      dispatch(setUserAddress(data.user.addresses?.[0] || null));
    }
  }, [isSuccess, data, dispatch]);

  const handleNavbarOpen = () => dispatch(openCart());

  const address = (() => {
    const addresses = data?.user?.addresses || [];
    const addr =
      addresses.find((a: { isDefault: any }) => a.isDefault) || addresses[0];
    return addr
      ? `${addr.label ? addr.label + " - " : ""}${addr.street}, ${addr.city}, ${
          addr.state
        } ${addr.zipCode}`
      : "No address selected";
  })();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Flex align="center" gap={6}>
            {isAdmin && (
              <button
                onClick={() => dispatch(toggleAdminNavmenu())}
                className="text-gray-700"
              >
                {toggleAdminNavMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Quicko
            </Link>
            <VStack
              align="start"
              gap={0}
              display={{ base: "none", sm: "flex" }}
            >
              <Text fontWeight="semibold" fontSize="sm">
                Delivery in{" "}
                <Box as="span" color="pink.500" fontWeight="bold">
                  7 Mins
                </Box>
              </Text>
              <Flex align="center">
                <Text fontSize="xs" color="gray.600" truncate maxW="180px">
                  {address}
                </Text>
                <ChevronDownIcon className="ml-1 w-4 h-4 text-gray-500" />
              </Flex>
            </VStack>
          </Flex>

          <div className="flex space-x-4 items-center">
            <Link to="/user-profile">
              <CustomAvatar
                name={user?.name || "User"}
                src={user?.profilePicture || "profile image"}
              />
            </Link>

            <div className="relative">
              <Button onClick={handleNavbarOpen} className="!p-2">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              {cartCount > 0 && (
                <Badge
                  bg="red.500"
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="-1"
                  right="-1"
                  fontSize="0.7em"
                  px="2"
                >
                  {cartCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
