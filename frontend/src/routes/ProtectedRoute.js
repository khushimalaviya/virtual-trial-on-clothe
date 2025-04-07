// routes/ProtectedRoute.js

import { Navigate } from "react-router-dom";

// ✅ PrivateRoute Component
export function PrivateRoute({ element }) {
  const isAuthenticated = localStorage.getItem("user") !== null;
  return isAuthenticated ? element : <Navigate to="/login" />;
}

// ✅ RoleBasedRoute Component
export function RoleBasedRoute({ element, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return element;
}
