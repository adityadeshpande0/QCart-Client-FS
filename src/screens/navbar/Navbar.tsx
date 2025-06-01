import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import CustomAvatar from "@/components/reusables/Avatar";
import { useGetUserProfileQueryQuery } from "@/app/commonApiQuery";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, selectUser } from "../auth/authSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetUserProfileQueryQuery({});
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserData(data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left section: Menu icon + Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Quick cart
            </Link>
          </div>

          {/* Right section: Auth buttons or avatar */}
          <div className="hidden md:flex space-x-4 items-center">
            {isLoggedIn && user ? (
              <Link to="/user-profile">
                <CustomAvatar
                  name={user.name}
                  src={user?.profilePicture || ""}
                />
              </Link>
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
            <ShoppingCart />
          </div>

          {/* Mobile toggle button */}
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
          {isLoggedIn && user ? (
            <Link
              to="/user-profile"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-xl text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition"
            >
              Profile
            </Link>
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
