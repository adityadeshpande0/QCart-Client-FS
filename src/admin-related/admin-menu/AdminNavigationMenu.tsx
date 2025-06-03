import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectAdminNavmenuIsOpen,
  toggleAdminNavmenu,
} from "@/screens/slices/cartSlice";
import {
  CloseButton,
  Drawer,
  Portal,
  Text,
  VStack,
  Separator as Divider,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  Boxes,
  ListOrdered,
  PackagePlus,
  ShoppingCart,
  User,
  MapPin,
  UserCircle,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AdminNavigationMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAdminNavbarOpen = useAppSelector(selectAdminNavmenuIsOpen);

  const handleAdmindrawrerClose = () => {
    dispatch(toggleAdminNavmenu());
  };

  const NavLink = ({
    to,
    children,
    icon: Icon,
    nested = false,
  }: {
    to: string;
    children: React.ReactNode;
    icon: React.ElementType;
    nested?: boolean;
  }) => (
    <Link
      to={to}
      onClick={handleAdmindrawrerClose}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition hover:bg-gray-100 ${
        nested ? "pl-8 text-gray-600" : "text-gray-800"
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Link>
  );

  return (
    <Drawer.Root placement="start" open={isAdminNavbarOpen}>
      <Portal>
        <Drawer.Backdrop className="bg-black/30 backdrop-blur-sm" />
        <Drawer.Positioner>
          <Drawer.Content className="w-full max-w-sm bg-white shadow-xl rounded-r-xl">
            <Drawer.Header className="flex items-center justify-between px-4 py-3 border-b">
              <Drawer.Title className="text-xl font-semibold text-gray-800">
                Admin Navigation
              </Drawer.Title>
              <Drawer.CloseTrigger asChild onClick={handleAdmindrawrerClose}>
                <CloseButton size="sm" className="hover:bg-gray-100" />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body className="px-2 py-4 text-sm text-gray-700">
              <VStack align="stretch" gap={1}>
                <Text className="px-4 text-xs text-gray-500 uppercase">
                  Dashboard
                </Text>
                <NavLink to="/admin-dashboard" icon={LayoutDashboard}>
                  Admin Dashboard
                </NavLink>

                <Divider my={2} />

                <Text className="px-4 text-xs text-gray-500 uppercase">
                  Product Management
                </Text>
                <NavLink to="/manage-products" icon={Boxes}>
                  Manage Products
                </NavLink>
                <NavLink
                  to="/manage-products/manage"
                  icon={ListOrdered}
                  nested
                >
                  Product List
                </NavLink>
                <NavLink to="/manage-products/add" icon={PackagePlus} nested>
                  Add Product
                </NavLink>

                <Divider my={2} />

                <Text className="px-4 text-xs text-gray-500 uppercase">
                  Orders
                </Text>
                <NavLink to="/manage-orders" icon={ShoppingCart}>
                  Manage Orders
                </NavLink>

                <Divider my={2} />

                <Text className="px-4 text-xs text-gray-500 uppercase">
                  User Section
                </Text>
                <NavLink to="/user-profile" icon={User}>
                  User Profile
                </NavLink>
                <NavLink to="/user-profile/orders" icon={ShoppingCart} nested>
                  Orders
                </NavLink>
                <NavLink to="/user-profile/addresses" icon={MapPin} nested>
                  Addresses
                </NavLink>
                <NavLink to="/user-profile/Profile" icon={UserCircle} nested>
                  Profile Info
                </NavLink>
              </VStack>
            </Drawer.Body>

            <Drawer.Footer className="px-4 py-3 border-t text-sm text-gray-400">
              <Text>© {new Date().getFullYear()} Quicko Admin Panel</Text>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default AdminNavigationMenu;
