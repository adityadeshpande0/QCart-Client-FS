import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { closeCart } from "@/screens/slices/cartSlice";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

export interface CartDrawerHandle {
  openDrawer: () => void;
}

const CartDrawer = forwardRef<CartDrawerHandle>((_, ref) => {
  const isOpen = useAppSelector((state: RootState) => state.cartReducer.isOpen);
  const dispatch = useAppDispatch();
  const { open, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openDrawer: onOpen,
  }));
  const handleClose = () => {
    dispatch(closeCart());
  };
  return (
    <Drawer.Root open={isOpen}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Your Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>Cart content goes here...</Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button>Checkout</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger onClick={handleClose} asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});

export default CartDrawer;
