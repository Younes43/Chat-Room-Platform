// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Use the auth context
  console.log("Is Authenticated:", isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children; // Render children if authenticated
};

export default ProtectedRoute;
