// components/ProtectedRoute.tsx
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/screens/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const AdminOnly = () => {
  const userData = useAppSelector(selectUser);
  const isAdmin = userData?.isAdmin;
  const isAuthenticated = () => {
    return isAdmin;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/user-profile/profile" replace />;
};

export default AdminOnly;
