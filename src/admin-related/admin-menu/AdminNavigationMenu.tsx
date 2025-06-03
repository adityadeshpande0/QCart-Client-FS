import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectAdminNavmenuIsOpen,
  toggleAdminNavmenu,
} from "@/screens/slices/cartSlice";
import { CloseButton, Drawer, Portal } from "@chakra-ui/react";
import React from "react";

const AdminNavigationMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleAdmindrawrerClose = () => {
    dispatch(toggleAdminNavmenu());
  };
  const isAdminNavbarOpen = useAppSelector(selectAdminNavmenuIsOpen);

  return (
    <Drawer.Root placement="start" open={isAdminNavbarOpen}>
      <Portal>
        <Drawer.Backdrop className="bg-black/30 backdrop-blur-sm" />
        <Drawer.Positioner>
          <Drawer.Content className="w-full max-w-md bg-white rounded-l-2xl shadow-xl">
            <Drawer.Header className="flex items-center justify-between px-4 py-3 border-b">
              <Drawer.Title className="text-xl font-bold text-gray-800">
                Admin Navigation Menu
              </Drawer.Title>
              <Drawer.CloseTrigger asChild onClick={handleAdmindrawrerClose}>
                <CloseButton size="sm" className="hover:bg-gray-100" />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body className="px-4 py-5 space-y-4 text-sm text-gray-700"></Drawer.Body>

            <Drawer.Footer className="flex justify-between items-center gap-4 px-4 py-4 border-t"></Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default AdminNavigationMenu;
