import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { selectAddress } from "@/screens/auth/authSlice";
import {
  clearCart,
  closeCart,
  decrementQuantity,
  incrementQuantity,
  selectCartItems,
} from "@/screens/slices/cartSlice";
import { usePlaceOrderMutation } from "@/screens/user-profile/userProfileApiQueries";
import {
  Alert,
  Box,
  Button,
  CloseButton,
  Drawer,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const [showAddressError, setShowAddressError] = useState(false);

  const [placeOrder] = usePlaceOrderMutation();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state: RootState) => state.cartReducer.isOpen);
  const cartData = useAppSelector(selectCartItems);
  console.log(cartData);
  const address = useAppSelector(selectAddress);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const payload = {
    products: cartData.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    address,
  };

  const handleCheckout = async () => {
    dispatch(closeCart());
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const totalAmount = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const options = {
      key: "rzp_test_hk9MX26ZRJ6W3i",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Quick Cart",
      description: "Order Payment",

      handler: async function (response: any) {
        console.log("Payment success", response);
        try {
          const orderResponse = await placeOrder(payload).unwrap();
          console.log("Order placed successfully", orderResponse);
          dispatch(closeCart());
          dispatch(clearCart());
          alert("Order placed successfully!");
        } catch (error) {
          console.error("Order placement failed:", error);
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#000000",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <Drawer.Root open={isOpen}>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content className="w-full max-w-md bg-white rounded-l-2xl shadow-xl">
            <Drawer.Header className="flex items-center justify-between px-4 py-3 border-b">
              <Drawer.Title className="text-xl font-bold text-gray-800">
                Your Cart
              </Drawer.Title>
              <Drawer.CloseTrigger onClick={handleClose} asChild>
                <CloseButton size="sm" className="hover:bg-gray-100" />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body className="px-4 py-5 space-y-4 text-sm text-gray-700">
              {showAddressError && (
                <Alert.Root
                  status="warning"
                  flexDirection="column"
                  alignItems="flex-start"
                  borderRadius="md"
                  boxShadow="md"
                  className="mb-4 p-4"
                >
                  <Box fontWeight="semibold" fontSize="sm">
                    Address is missing
                  </Box>
                  <Text fontSize="xs" mt={1}>
                    Please add your address to proceed with the order.
                  </Text>
                  <Link to="/user-profile/addNewAddress" className="w-full">
                    <Button
                      onClick={() => {
                        handleClose();
                        setShowAddressError(false);
                      }}
                      size="sm"
                      mt={3}
                      className="bg-black text-white hover:bg-gray-800 w-full"
                    >
                      Go to Profile
                    </Button>
                  </Link>
                </Alert.Root>
              )}
              {isLoggedIn ? (
                cartData.map((item: any) => (
                  <Box
                    key={item.id}
                    className="flex items-center justify-between border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                  >
                    <Box className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <Box>
                        <Text className="font-semibold text-sm text-gray-800 line-clamp-1">
                          {item.name}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {item.units}
                        </Text>
                      </Box>
                    </Box>

                    <Box className="flex items-center gap-3">
                      <Box className="flex items-center border border-pink-200 text-pink-600 rounded-md px-2 py-1 text-sm font-medium">
                        <button
                          className="px-1"
                          onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                          −
                        </button>
                        <Text className="px-2">{item.quantity}</Text>
                        <button
                          className="px-1"
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          +
                        </button>
                      </Box>

                      <Box className="text-right">
                        <Text className="text-black font-semibold text-sm">
                          ₹{item.price}
                        </Text>
                        <Text className="text-xs text-gray-400 line-through">
                          ₹{Math.round(item.price * 1.5)}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box className="flex flex-col items-center justify-center space-y-4 py-8">
                  <Text className="text-gray-700 text-base font-medium">
                    Login to view your cart items
                  </Text>
                  <Link to="/login" style={{ width: "100%" }}>
                    <Button
                      onClick={handleClose}
                      className="w-full bg-black text-white hover:bg-gray-800 transition"
                      width="100%"
                    >
                      Login
                    </Button>
                  </Link>
                </Box>
              )}
            </Drawer.Body>

            {cartData.length > 0 && isLoggedIn && (
              <Drawer.Footer className="flex flex-col gap-3 px-4 py-4 border-t">
                {cartData.length !== 0 && (
                  <Box className="flex flex-col gap-1 w-full">
                    <Box className="flex justify-between w-full">
                      <Text className="text-gray-800 font-medium">
                        Total Items:
                      </Text>
                      <Text className="text-gray-800 font-semibold">
                        {cartData.reduce((acc, item) => acc + item.quantity, 0)}
                      </Text>
                    </Box>
                    <Box className="flex justify-between w-full">
                      <Text className="text-gray-800 font-medium">
                        Total Price:
                      </Text>
                      <Text className="text-gray-800 font-semibold">
                        ₹
                        {cartData.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )}
                      </Text>
                    </Box>
                  </Box>
                )}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white hover:bg-gray-800 transition"
                >
                  Checkout
                </Button>
              </Drawer.Footer>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CartDrawer;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
