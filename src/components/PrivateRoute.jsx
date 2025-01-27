import React from "react";
import { Navigate } from "react-router-dom";
import useauth from "../custom/useauth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useauth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
