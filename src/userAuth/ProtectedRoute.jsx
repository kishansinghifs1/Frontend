import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // Not authenticated
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(user.role)) {
        return <Navigate to="/" replace />;
      }
    } else if (user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
