// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, name } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    // Not logged in → go to login
    return <Navigate to="/" replace />;
  }

  if (adminOnly && name !== "admin user") {
    // Logged in but not admin → redirect home
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;
