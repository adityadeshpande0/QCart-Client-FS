import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
        <Routes>
          <Route path="/location" Component={LocationComponent} />
          <Route path="/" element={<StoreLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRouter;
