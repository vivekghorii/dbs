import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";


const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role?: "ADMIN" | "USER";
}) => {
  const { token, role: userRole } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (role && role !== userRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
