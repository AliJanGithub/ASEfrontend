import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../custom/useauth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
