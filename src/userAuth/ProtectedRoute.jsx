import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

export function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    toast.error(error);
    return <Navigate to="/" replace />;
  }

  if (!user) {
    toast.info("Please sign in to access this page");
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    const hasRequiredRole = Array.isArray(requiredRole)
      ? requiredRole.includes(user.role)
      : user.role === requiredRole;

    if (!hasRequiredRole) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
