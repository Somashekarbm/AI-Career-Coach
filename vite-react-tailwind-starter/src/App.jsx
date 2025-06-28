import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Goal from "./pages/Goal";
import GoalSetPage from "./pages/GoalSetPage";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

function App() {
  const token = Cookies.get("token");

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public Home Page */}
          <Route path="/home" element={!token ? <Home /> : <Navigate to="/landing" replace />} />

          {/* Auth Pages */}
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/landing" replace />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/landing" replace />} />

          {/* Protected Landing Page (only if logged in) */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/landing" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/landing"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goal-details"
            element={
              <ProtectedRoute>
                <Goal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goal-set"
            element={
              <ProtectedRoute>
                <GoalSetPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback to /home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
