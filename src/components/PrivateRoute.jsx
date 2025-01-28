import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../custom/useAuth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    window.alert("You are not authorized to access this page. Redirecting to the home page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
