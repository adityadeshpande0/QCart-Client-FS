import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import StoreLanding from "@/screens/landing-page/StoreLanding";
import Navbar from "@/screens/navbar/Navbar";
import LocationComponent from "@/screens/LocationComponent";

const AppRouter: React.FC = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

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
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AppRouter;
