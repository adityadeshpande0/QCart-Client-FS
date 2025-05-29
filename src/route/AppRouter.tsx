import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import StoreLanding from "@/screens/landing-page/StoreLanding";
import Navbar from "@/screens/navbar/Navbar";
import LocationComponent from "@/screens/LocationComponent";
import ManageProductsDashboard from "@/admin-related/manage-products/ManageProductsDashboard";
import AdminDashboard from "@/admin-related/AdminDashboard";
import UserProfile from "@/screens/user-profile/UserProfile";
import AddNewProducts from "@/admin-related/manage-products/AddNewProducts";
import ProtectedRoute from "./ProtectedRoute";
import OrdersSection from "@/screens/user-profile/components/OrdersSection";
import AdressesSection from "@/screens/user-profile/components/AdressesSection";
import ProfileSection from "@/screens/user-profile/components/ProfileSection";

const AppRouter: React.FC = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? "pt-[60px]" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/location" element={<LocationComponent />} />
            <Route path="/" element={<StoreLanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/manage-products"
                Component={ManageProductsDashboard}
              />
              <Route path="/manage-products/add" Component={AddNewProducts} />
              <Route path="/admin-dashboard" Component={AdminDashboard} />
              <Route path="/user-profile" Component={UserProfile}>
                <Route path="orders" element={<OrdersSection />} />
                <Route path="addresses" element={<AdressesSection />} />
                <Route path="Profile" element={<ProfileSection />} />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AppRouter;
