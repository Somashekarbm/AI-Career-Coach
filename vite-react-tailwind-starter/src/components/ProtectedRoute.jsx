// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import sessionService from "../services/sessionService";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionService.isLoggedIn();
  return isLoggedIn ? children : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
