import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@chakra-ui/react";
import CustomAvatar from "@/components/reusables/Avatar";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7lg mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Quick cart
          </Link>
          <div className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/user-profile">
                  <CustomAvatar name={""} src={""} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
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
          {isLoggedIn ? (
            <></>
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
