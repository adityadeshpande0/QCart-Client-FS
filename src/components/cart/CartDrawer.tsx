import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { selectUser } from "@/screens/auth/authSlice";
import { closeCart, selectCartItems } from "@/screens/slices/cartSlice";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

export interface CartDrawerHandle {
  openDrawer: () => void;
}

const CartDrawer = forwardRef<CartDrawerHandle>((_, ref) => {
  const isOpen = useAppSelector((state: RootState) => state.cartReducer.isOpen);
  const dispatch = useAppDispatch();
  const { onOpen } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openDrawer: onOpen,
  }));

  const handleClose = () => {
    dispatch(closeCart());
  };

  const cartData = useAppSelector(selectCartItems);
  const userData = useAppSelector(selectUser);
  console.log(cartData);
  console.log(userData);

  return (
    <Drawer.Root open={isOpen}>
      <Portal>
        <Drawer.Backdrop className="bg-black/30 backdrop-blur-sm" />
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
              {cartData.length === 0 ? (
                <Box>
                  <Text textAlign="center" className="text-gray-500 text-md">
                    Your cart is currently empty.
                  </Text>
                  <Button
                    className="mt-4 w-full bg-black text-white hover:bg-gray-800 transition"
                    onClick={handleClose}
                  >
                    <Text className="text-white">Continue Shopping</Text>
                  </Button>
                </Box>
              ) : (
                <>some data</>
              )}
            </Drawer.Body>
            {cartData.length > 0 && (
              <Drawer.Footer className="flex justify-between items-center gap-4 px-4 py-4 border-t">
                <Button className="w-full bg-black text-white hover:bg-gray-800 transition">
                  Checkout
                </Button>
              </Drawer.Footer>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});

export default CartDrawer;
