import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, Menu, X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import CustomAvatar from "@/components/reusables/Avatar";
import { useGetUserProfileQueryQuery } from "@/app/commonApiQuery";
import { useSelector } from "react-redux";
import { setUserData, selectUser, setUserAddress } from "../auth/authSlice";
import { Badge, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { openCart } from "../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";

const Navbar: React.FC = () => {
  const { data, isSuccess } = useGetUserProfileQueryQuery({});
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(
    (state: RootState) => state.cartReducer.items
  );

  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const cartCount = cartItems.length;

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserData(data.user));
      dispatch(setUserAddress(data.user.addresses?.[0] || null));
    }
  }, [isSuccess, data, dispatch]);

  const handleNavbarOpen = () => {
    dispatch(openCart());
  };

  const filterAddressToOneLine = (addresses: any[] = []) => {
    if (!addresses.length) return "";
    const addr = addresses.find((a) => a.isDefault) || addresses[0];
    return `${addr.label ? addr.label + " - " : ""}${addr.street}, ${
      addr.city
    }, ${addr.state} ${addr.zipCode}`;
  };

  const address = filterAddressToOneLine(data?.user?.addresses);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <Flex align="center" gap={6}>
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Quicko
            </Link>
            <VStack gap={0} align="start">
              <Text fontWeight="semibold" fontSize="sm">
                Delivery in{" "}
                <Box as="span" color="pink.500" fontWeight="bold">
                  7 Mins
                </Box>
              </Text>
              <Flex align="center">
                <Text fontSize="xs" color="gray.600" truncate maxW="180px">
                  {address || "No address selected"}
                </Text>
                <ChevronDownIcon />
              </Flex>
            </VStack>
          </Flex>

          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/user-profile">
              <CustomAvatar
                name={user?.name || "User"}
                src={user?.profilePicture || "profile image"}
              />
            </Link>

            <Button onClick={handleNavbarOpen}>
              <ShoppingCart />
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
            </Button>
          </div>

          {/* Mobile toggle button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {isLoggedIn && user ? (
            <Link
              to="/user-profile"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-xl text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-100 transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
