import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Goal from "./pages/Goal";
import GoalSetPage from "./pages/GoalSetPage";
import TaskDetails from "./pages/TaskDetails";
import Teams from "./pages/Teams";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionTimeoutWarning from "./components/SessionTimeoutWarning";
import { ThemeProvider } from "./context/ThemeContext";
import sessionService from "./services/sessionService";
import UserProfile from "./pages/UserProfile";
import "./index.css";



const Settings = () => (
  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Settings Page</h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon!</p>
      </div>
    </div>
  </div>
);

const Help = () => (
  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Help & Support</h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon!</p>
      </div>
    </div>
  </div>
);

const Notifications = () => (
  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Notifications</h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon!</p>
      </div>
    </div>
  </div>
);

const Analytics = () => (
  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon!</p>
      </div>
    </div>
  </div>
);

const Calendar = () => (
  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Calendar</h1>
        <p className="text-gray-600 dark:text-gray-400">Coming soon!</p>
      </div>
    </div>
  </div>
);

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
            path="/goals"
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
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
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
