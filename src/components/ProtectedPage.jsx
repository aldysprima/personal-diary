import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("userToken");
  return token;
};

const ProtectedPages = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedPages;
