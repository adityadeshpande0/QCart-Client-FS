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
            <Route
              path="/manage-products"
              Component={ManageProductsDashboard}
            />
              <Route
              path="/admin-dashboard"
              Component={AdminDashboard}
            />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AppRouter;
