// src/ProtectedRoutes/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminProtectedRoute;
