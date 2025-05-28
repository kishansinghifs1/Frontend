import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

export function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, error } = useAuth();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (error) {
        toast.error(error);
        setRedirect("/");
      } else if (!user) {
        toast.info("Please sign in to access this page");
        setRedirect("/");
      } else if (requiredRole) {
        const hasRequiredRole = Array.isArray(requiredRole)
          ? requiredRole.includes(user.role)
          : user.role === requiredRole;

        if (!hasRequiredRole) {
          toast.error("You don't have permission to access this page");
          setRedirect("/");
        }
      }
    }
  }, [user, loading, error, requiredRole]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}
