import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import { Route, Routes } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Register} />
    </Routes>
  );
};

export default AppRouter;
