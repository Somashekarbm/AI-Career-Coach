import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Goal from "./pages/Goal";
import GoalSetPage from "./pages/GoalSetPage";
import TaskDetails from "./pages/TaskDetails";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionTimeoutWarning from "./components/SessionTimeoutWarning";
import { ThemeProvider } from "./context/ThemeContext";
import sessionService from "./services/sessionService";
import "./index.css";

function App() {
  const isLoggedIn = sessionService.isLoggedIn();

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <SessionTimeoutWarning />
        <Routes>
          {/* Public Home Page */}
          <Route path="/home" element={!isLoggedIn ? <Home /> : <Navigate to="/landing" replace />} />

          {/* Auth Pages */}
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/landing" replace />} />
          <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/landing" replace />} />

          {/* Protected Landing Page (only if logged in) */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
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
          <Route
            path="/tasks/:goalId"
            element={
              <ProtectedRoute>
                <TaskDetails />
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
