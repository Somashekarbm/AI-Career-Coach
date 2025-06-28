import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Goal from "./pages/Goal";
import GoalSetPage from "./pages/GoalSetPage";


function App() {
  const isLoggedIn = sessionService.isLoggedIn();

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />


          {/* Protected Landing Page (only if logged in) */}
          <Route
            path="/"
            element={

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
