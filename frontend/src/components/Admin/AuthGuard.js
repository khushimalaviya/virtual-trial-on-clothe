import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuth");
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default AuthGuard;